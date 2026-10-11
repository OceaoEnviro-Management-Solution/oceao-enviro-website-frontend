// AdminAvailabilityCallbacksPage.jsx — Callback slot capacity management.
// Select a date from Calendar → view capacity bars → block / unblock periods or cancel callbacks.
// Reads and writes real data: capacity and booked counts come from /admin/callback/availability,
// and every change goes to the backend (and its activity log).
// Uses useAvailability hook for shared fetch logic.

import { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../../services/adminApi';
import { callbackApi } from '../../services/callbackApi';
import { useAvailability } from '../../hooks/useAvailability';
import { useAdminContext } from '../../hooks/useAdminContext';
import { toDateKey } from '../../utils/dateKey';
import Calendar from '../../components/admin/Calendar';
import CallbackCapacityDisplay from '../../components/admin/CallbackCapacityDisplay';
import CancelCallbackModal from '../../components/admin/CancelCallbackModal';
import { RefreshCw } from 'lucide-react';

// The unblock button has no form, but the backend requires a reason for every change.
const UNBLOCK_REASON = 'Unblocked from the callback availability page';

export default function AdminAvailabilityCallbacksPage() {
  const { selectedDate, slotsData, loading, error, handleDateSelect, refresh } = useAvailability('callback');
  const { refreshTrigger, triggerRefresh, requestName } = useAdminContext();

  // Calendar colours: date key -> { bookable, reason } (the next 30 days)
  const [calendarDays, setCalendarDays] = useState({});

  // A failed one-click action (unblock), which has no modal to show it in
  const [actionError, setActionError] = useState('');

  // Cancel/block callback modal
  const [cbModal, setCbModal] = useState({
    isOpen: false, slot: null, bookings: []
  });

  // ── Day colours for the calendar (reloaded after every change) ────────────
  useEffect(() => {
    let cancelled = false;

    const start = new Date(); start.setHours(0, 0, 0, 0);
    const end = new Date(start); end.setDate(start.getDate() + 30);

    callbackApi.getCalendar(toDateKey(start), toDateKey(end))
      .then((result) => {
        if (cancelled) return;
        const byDate = {};
        for (const day of result.data.days) byDate[day.date] = day;
        setCalendarDays(byDate);
      })
      .catch(() => {
        // The calendar simply stays uncoloured; picking a date still loads its periods.
      });

    return () => { cancelled = true; };
  }, [refreshTrigger]);

  // ── Open modal (block a slot) ─────────────────────────────────────────────
  const openBlockSlot = useCallback(async (date, slotKey) => {
    setActionError('');
    try {
      // Fetch who is in this slot
      const result = await adminApi.getCallbacksForSlot(date, slotKey);
      setCbModal({ isOpen: true, slot: slotKey, bookings: result.bookings || [] });
    } catch (err) {
      setActionError(err?.message || 'Could not load the requests for this period.');
    }
  }, []);

  function closeCbModal() { setCbModal(m => ({ ...m, isOpen: false })); }

  // ── Unblock a slot ────────────────────────────────────────────────────────
  const handleUnblock = useCallback(async (date, slotKey) => {
    const name = await requestName();
    if (!name) return;
    setActionError('');
    try {
      await adminApi.unblockCallbackSlot(date, slotKey, name, UNBLOCK_REASON);
    } catch (err) {
      setActionError(err?.message || 'Could not unblock the period. Please try again.');
    } finally {
      refresh();
      triggerRefresh();
    }
  }, [requestName, refresh, triggerRefresh]);

  // ── Block entire day ──────────────────────────────────────────────────────
  const handleBlockEntireDay = useCallback(async () => {
    // Show confirmation without bookings list (entire day block)
    setCbModal({ isOpen: true, slot: '__day__', bookings: [] });
  }, []);

  // ── Confirm from modal ────────────────────────────────────────────────────
  // A failure is thrown and shown inside the modal, which stays open.
  const handleConfirm = useCallback(async (selectedIds, employeeName, reason) => {
    try {
      if (cbModal.slot === '__day__') {
        await adminApi.blockCallbackEntireDay(selectedDate, employeeName, reason);
      } else if (selectedIds.length > 0) {
        await adminApi.cancelCallbacks(selectedIds, employeeName, reason);
        await adminApi.blockCallbackSlot(selectedDate, cbModal.slot, employeeName, reason);
      } else {
        await adminApi.blockCallbackSlot(selectedDate, cbModal.slot, employeeName, reason);
      }
    } finally {
      refresh();
      triggerRefresh();
    }
  }, [cbModal, selectedDate, refresh, triggerRefresh]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#011539]">Availability — Callback Slots</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xs font-bold text-[#011539] uppercase tracking-wide mb-5">Select Date</h3>
          <Calendar
            callbackAvailability={calendarDays}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            mode="callback"
          />
        </div>

        {/* Callback capacity display */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          {(error || actionError) && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg mb-4" role="alert">
              {actionError || error}
            </p>
          )}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <RefreshCw className="w-6 h-6 text-[#017119] animate-spin" />
            </div>
          ) : (
            <CallbackCapacityDisplay
              date={selectedDate}
              slots={slotsData}
              onBlockSlot={openBlockSlot}
              onUnblockSlot={handleUnblock}
              onBlockDay={handleBlockEntireDay}
            />
          )}
        </div>

      </div>

      {/* Cancel/Block modal */}
      <CancelCallbackModal
        isOpen={cbModal.isOpen}
        slot={cbModal.slot === '__day__' ? 'morning' : cbModal.slot}
        date={selectedDate}
        bookings={cbModal.bookings}
        onClose={closeCbModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
