// AdminAvailabilityVMPage.jsx — VM slot availability management.
// Select a date from Calendar → manage 4 time slots (block/unblock/cancel).
// Reads and writes real data: the calendar is coloured from /admin/vm/calendar, the slots come
// from /admin/vm/availability, and every change goes to the backend (and its activity log).
// Uses useAvailability hook for shared fetch logic.

import { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../../services/adminApi';
import { useAvailability } from '../../hooks/useAvailability';
import { useAdminContext } from '../../hooks/useAdminContext';
import Calendar from '../../components/admin/Calendar';
import AvailabilityGrid from '../../components/admin/AvailabilityGrid';
import BlockSlotModal from '../../components/admin/BlockSlotModal';
import CancelMeetingModal from '../../components/admin/CancelMeetingModal';
import { RefreshCw } from 'lucide-react';

// The unblock button has no form, but the backend requires a reason for every change.
const UNBLOCK_REASON = 'Unblocked from the VM availability page';

// The months the calendar can select from: today's, and today + 30 days' (often the next).
function getWindowMonths() {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const end = new Date(today); end.setDate(today.getDate() + 30);

  const months = new Map();
  for (const date of [today, end]) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    months.set(`${year}-${month}`, { year, month });
  }
  return [...months.values()];
}

export default function AdminAvailabilityVMPage() {
  const { selectedDate, slotsData, loading, error, handleDateSelect, refresh } = useAvailability('vm');
  const { refreshTrigger, triggerRefresh, requestName } = useAdminContext();

  // Calendar colours: date key -> { working, holidayName, booked, blocked, available }
  const [monthData, setMonthData] = useState({});

  // A failed one-click action (unblock), which has no modal to show it in
  const [actionError, setActionError] = useState('');

  // Block slot modal
  const [blockModal, setBlockModal] = useState({
    isOpen: false, mode: 'slot', slotTime: null, slot: null
  });

  // Cancel meeting modal
  const [cancelModal, setCancelModal] = useState({
    isOpen: false, booking: null, slotTime: null
  });

  // ── Month data for the calendar (reloaded after every change) ─────────────
  useEffect(() => {
    let cancelled = false;

    Promise.all(getWindowMonths().map(({ year, month }) => adminApi.getMonthAvailability(year, month)))
      .then((results) => {
        if (!cancelled) setMonthData(Object.assign({}, ...results.map((result) => result.availability)));
      })
      .catch((err) => {
        // The calendar stays uncoloured; picking a date still loads its slots.
        if (!cancelled) setActionError(err?.message || 'Could not load the calendar.');
      });

    return () => { cancelled = true; };
  }, [refreshTrigger]);

  // ── Open block modal ──────────────────────────────────────────────────────
  function openBlockSlot(date, time, slot) {
    setBlockModal({ isOpen: true, mode: 'slot', slotTime: time, slot });
  }
  function openBlockDay() {
    setBlockModal({ isOpen: true, mode: 'day', slotTime: null, slot: null });
  }
  function closeBlockModal() { setBlockModal(m => ({ ...m, isOpen: false })); }

  // ── Open cancel modal ─────────────────────────────────────────────────────
  function openCancelMeeting(slot) {
    setCancelModal({ isOpen: true, booking: slot.booking, slotTime: slot.time });
  }
  function closeCancelModal() { setCancelModal(m => ({ ...m, isOpen: false })); }

  // ── Confirm block ─────────────────────────────────────────────────────────
  // Resolves { blocked, skipped } so the modal can list what was left alone; a failure is
  // thrown and shown inside the modal, which stays open.
  const handleConfirmBlock = useCallback(async (employeeName, reason) => {
    let result;
    try {
      if (blockModal.mode === 'slot') {
        result = await adminApi.blockSlot(selectedDate, blockModal.slotTime, employeeName, reason);
      } else {
        result = await adminApi.blockEntireDay(selectedDate, employeeName, reason);
      }
    } finally {
      refresh();
      triggerRefresh();
    }
    return result;
  }, [blockModal, selectedDate, refresh, triggerRefresh]);

  // ── Unblock ───────────────────────────────────────────────────────────────
  const handleUnblock = useCallback(async (date, time) => {
    const name = await requestName();
    if (!name) return;
    setActionError('');
    try {
      await adminApi.unblockSlot(date, time, name, UNBLOCK_REASON);
    } catch (err) {
      setActionError(err?.message || 'Could not unblock the slot. Please try again.');
    } finally {
      refresh();
      triggerRefresh();
    }
  }, [requestName, refresh, triggerRefresh]);

  // ── Cancel meeting ────────────────────────────────────────────────────────
  // alsoBlock: true from the block modal's "cancel and block", false from the cancel modal.
  const handleConfirmCancel = useCallback(async (bookingId, employeeName, reason, alsoBlock = false) => {
    try {
      await adminApi.cancelVMMeeting(bookingId, employeeName, reason, alsoBlock);
    } finally {
      refresh();
      triggerRefresh();
    }
  }, [refresh, triggerRefresh]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#011539]">Availability — Virtual Meetings</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xs font-bold text-[#011539] uppercase tracking-wide mb-5">Select Date</h3>
          <Calendar
            availability={monthData}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            mode="vm"
          />
        </div>

        {/* Slot grid */}
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
            <AvailabilityGrid
              date={selectedDate}
              slots={slotsData}
              onBlockSlot={openBlockSlot}
              onUnblockSlot={handleUnblock}
              onBlockDay={openBlockDay}
              onCancelMeeting={openCancelMeeting}
            />
          )}
        </div>

      </div>

      {/* Block slot modal */}
      <BlockSlotModal
        isOpen={blockModal.isOpen}
        mode={blockModal.mode}
        slotTime={blockModal.slotTime}
        slot={blockModal.slot}
        date={selectedDate}
        onClose={closeBlockModal}
        onConfirm={handleConfirmBlock}
        onCancelMeeting={handleConfirmCancel}
      />

      {/* Cancel meeting modal */}
      <CancelMeetingModal
        isOpen={cancelModal.isOpen}
        booking={cancelModal.booking}
        date={selectedDate}
        slotTime={cancelModal.slotTime}
        onClose={closeCancelModal}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}
