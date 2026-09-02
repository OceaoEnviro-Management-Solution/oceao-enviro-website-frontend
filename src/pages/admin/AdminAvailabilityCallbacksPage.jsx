// AdminAvailabilityCallbacksPage.jsx — Callback slot capacity management.
// Select a date from Calendar → view capacity bars → block/cancel callbacks.
// Uses useAvailability hook for shared fetch logic.

import { useState, useCallback } from 'react';
import { adminApi } from '../../services/adminApi';
import { useAvailability } from '../../hooks/useAvailability';
import Calendar from '../../components/admin/Calendar';
import CallbackCapacityDisplay from '../../components/admin/CallbackCapacityDisplay';
import CancelCallbackModal from '../../components/admin/CancelCallbackModal';
import { RefreshCw } from 'lucide-react';

// Used for month-level calendar coloring
import { mockCallbackAvailability } from '../../constants/mockData';

export default function AdminAvailabilityCallbacksPage() {
  const { selectedDate, slotsData, loading, handleDateSelect, refresh } = useAvailability('callback');

  // Cancel/block callback modal
  const [cbModal, setCbModal] = useState({
    isOpen: false, slot: null, bookings: []
  });

  // ── Open modal (block a slot) ─────────────────────────────────────────────
  const openBlockSlot = useCallback(async (date, slotKey) => {
    // Fetch who is in this slot
    const result = await adminApi.getCallbacksForSlot(date, slotKey);
    setCbModal({ isOpen: true, slot: slotKey, bookings: result.bookings || [] });
  }, []);

  function closeCbModal() { setCbModal(m => ({ ...m, isOpen: false })); }

  // ── Unblock a slot ────────────────────────────────────────────────────────
  const handleUnblock = useCallback(async (date, slotKey) => {
    // For callbacks there is no separate unblock API yet; toggle via blockCallbackSlot
    // In Phase 2 this will be a real API call.
    if (mockCallbackAvailability[date]?.[slotKey]) {
      mockCallbackAvailability[date][slotKey].blocked = false;
    }
    refresh();
  }, [refresh]);

  // ── Block entire day ──────────────────────────────────────────────────────
  const handleBlockEntireDay = useCallback(async (date) => {
    // Show confirmation without bookings list (entire day block)
    setCbModal({ isOpen: true, slot: '__day__', bookings: [] });
  }, []);

  // ── Confirm from modal ────────────────────────────────────────────────────
  const handleConfirm = useCallback(async (selectedIds, employeeName, reason) => {
    if (cbModal.slot === '__day__') {
      await adminApi.blockCallbackEntireDay(selectedDate, employeeName, reason);
    } else if (selectedIds.length > 0) {
      await adminApi.cancelCallbacks(selectedIds, employeeName, reason);
      await adminApi.blockCallbackSlot(selectedDate, cbModal.slot, employeeName, reason);
    } else {
      await adminApi.blockCallbackSlot(selectedDate, cbModal.slot, employeeName, reason);
    }
    refresh();
  }, [cbModal, selectedDate, refresh]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#011539]">Availability — Callback Slots</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xs font-bold text-[#011539] uppercase tracking-wide mb-5">Select Date</h3>
          <Calendar
            callbackAvailability={mockCallbackAvailability}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            mode="callback"
          />
        </div>

        {/* Callback capacity display */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
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
