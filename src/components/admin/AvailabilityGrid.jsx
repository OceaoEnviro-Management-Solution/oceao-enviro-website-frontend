// AvailabilityGrid.jsx — VM slot management for a selected date.
// Refactored from AvailabilityEditor.jsx.
// Key addition: booked slots now show a [Cancel Meeting] button (instead of "Cannot modify").
// Props: date, slots (array with { time, status, booking? }), onBlockSlot,
//        onUnblockSlot, onBlockDay, onCancelMeeting

import { formatDateDisplay, formatTimeDisplay } from '../../utils/validation';
import { Shield, ShieldOff, CheckCircle, XCircle, Minus, X } from 'lucide-react';

const STATUS_CONFIG = {
  available: {
    label: 'Available',
    textColor: 'text-[#017119]', bgColor: 'bg-[#E4F3E6]',
    icon: CheckCircle, iconColor: 'text-[#017119]'
  },
  booked: {
    label: 'Booked',
    textColor: 'text-gray-700', bgColor: 'bg-gray-100',
    icon: XCircle, iconColor: 'text-gray-500'
  },
  blocked: {
    label: 'Blocked',
    textColor: 'text-orange-600', bgColor: 'bg-orange-50',
    icon: Minus, iconColor: 'text-orange-500'
  }
};

function SlotRow({ slot, onBlock, onUnblock, onCancel }) {
  const config    = STATUS_CONFIG[slot.status] || STATUS_CONFIG.available;
  const Icon      = config.icon;
  const isAvail   = slot.status === 'available';
  const isBlocked = slot.status === 'blocked';
  const isBooked  = slot.status === 'booked';

  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-none">
      {/* Time + status */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-[#011539] w-20">{formatTimeDisplay(slot.time)}</span>
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${config.bgColor} ${config.textColor}`}>
          <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
          {config.label}
        </span>
        {isBooked && slot.booking && (
          <span className="text-xs text-gray-400 truncate hidden sm:block max-w-[120px]">
            {slot.booking.name}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {isAvail && (
          <button type="button" onClick={() => onBlock(slot.time)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg
              bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors duration-150">
            <Shield className="w-3.5 h-3.5" /> Block
          </button>
        )}
        {isBlocked && (
          <button type="button" onClick={() => onUnblock(slot.time)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg
              bg-[#E4F3E6] text-[#017119] hover:bg-[#c8e8cc] transition-colors duration-150">
            <ShieldOff className="w-3.5 h-3.5" /> Unblock
          </button>
        )}
        {isBooked && (
          <>
            <button type="button" onClick={() => onBlock(slot.time)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg
                bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors duration-150">
              <Shield className="w-3.5 h-3.5" /> Block
            </button>
            <button type="button" onClick={() => onCancel(slot)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg
                bg-red-50 text-red-600 hover:bg-red-100 transition-colors duration-150">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function AvailabilityGrid({ date, slots, onBlockSlot, onUnblockSlot, onBlockDay, onCancelMeeting }) {
  if (!date) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-gray-400">Select a date from the calendar to manage slots</p>
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-bold text-[#011539] uppercase tracking-wide">VM Slots</h3>
          <p className="text-xs text-gray-500 mt-0.5">{formatDateDisplay(date)}</p>
        </div>
      </div>

      {/* Slots */}
      {!slots.length ? (
        <div className="py-10 text-center">
          <p className="text-sm text-gray-400">No slots for this date</p>
        </div>
      ) : (
        <div className="bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-100 mb-5">
          {slots.map(slot => (
            <SlotRow
              key={slot.time}
              slot={slot}
              onBlock={(time) => onBlockSlot(date, time, slot)}
              onUnblock={(time) => onUnblockSlot(date, time)}
              onCancel={(s) => onCancelMeeting(s)}
            />
          ))}
        </div>
      )}

      {/* Block entire day */}
      <button
        id="vm-block-entire-day-btn"
        type="button"
        onClick={() => onBlockDay(date)}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2
          border-orange-200 text-orange-600 text-sm font-semibold hover:bg-orange-50
          transition-all duration-200"
      >
        <Shield className="w-4 h-4" />
        Block Entire Day
      </button>
    </div>
  );
}
