// AdminAvailabilityVMPage.jsx — VM slot availability management.
// Select a date from Calendar → manage 4 time slots (block/unblock/cancel).
// Uses useAvailability hook for shared fetch logic.

import { useState, useCallback } from 'react';
import { adminApi } from '../../services/adminApi';
import { useAvailability } from '../../hooks/useAvailability';
import Calendar from '../../components/admin/Calendar';
import AvailabilityGrid from '../../components/admin/AvailabilityGrid';
import BlockSlotModal from '../../components/admin/BlockSlotModal';
import CancelMeetingModal from '../../components/admin/CancelMeetingModal';
import { RefreshCw } from 'lucide-react';

// Used for month-level calendar coloring
import { mockAvailability } from '../../constants/mockData';

export default function AdminAvailabilityVMPage() {
  const { selectedDate, slotsData, loading, handleDateSelect, refresh } = useAvailability('vm');

  // Block slot modal
  const [blockModal, setBlockModal] = useState({
    isOpen: false, mode: 'slot', slotTime: null, slot: null
  });

  // Cancel meeting modal
  const [cancelModal, setCancelModal] = useState({
    isOpen: false, booking: null, slotTime: null
  });

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
  const handleConfirmBlock = useCallback(async (employeeName, reason) => {
    if (blockModal.mode === 'slot') {
      await adminApi.blockSlot(selectedDate, blockModal.slotTime, employeeName, reason);
    } else {
      await adminApi.blockEntireDay(selectedDate, employeeName, reason);
    }
    refresh();
  }, [blockModal, selectedDate, refresh]);

  // ── Unblock ───────────────────────────────────────────────────────────────
  const handleUnblock = useCallback(async (date, time) => {
    await adminApi.unblockSlot(date, time);
    refresh();
  }, [refresh]);

  // ── Cancel meeting ────────────────────────────────────────────────────────
  const handleConfirmCancel = useCallback(async (bookingId, employeeName, reason) => {
    await adminApi.cancelVMMeeting(bookingId, employeeName, reason);
    refresh();
  }, [refresh]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-[#011539]">Availability — Virtual Meetings</h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Calendar */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-xs font-bold text-[#011539] uppercase tracking-wide mb-5">Select Date</h3>
          <Calendar
            availability={mockAvailability}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            mode="vm"
          />
        </div>

        {/* Slot grid */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
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
