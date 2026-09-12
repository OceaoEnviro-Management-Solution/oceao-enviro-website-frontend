// CallbackCapacityDisplay.jsx — Callback slot capacity view for a selected date.
// Shows 3 slots (Morning / Afternoon / Evening) with:
//   - Booked count vs capacity (X / Y booked)
//   - Animated progress bar (green → orange → red as capacity fills)
//   - [Block] / [Unblock] button per slot
// Props: date, slots (from adminApi.getCallbackAvailability), onBlockSlot, onUnblockSlot, onBlockDay

import { formatDateDisplay } from '../../utils/validation';
import { Shield, ShieldOff, PhoneCall } from 'lucide-react';

function getProgressColor(booked, capacity, blocked) {
  if (blocked) return 'bg-gray-400';
  const pct = booked / capacity;
  if (pct >= 1)   return 'bg-red-500';
  if (pct >= 0.6) return 'bg-orange-400';
  return 'bg-[#017119]';
}

function SlotCapacityRow({ slot, onBlock, onUnblock }) {
  const { key, label, timeRange, capacity, booked, blocked } = slot;
  const pct          = Math.min(1, booked / capacity);
  const progressColor = getProgressColor(booked, capacity, blocked);
  const remaining    = Math.max(0, capacity - booked);

  return (
    <div className={`px-5 py-4 border-b border-gray-50 last:border-none ${blocked ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between gap-4">
        {/* Left: icon + label */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#EAEBF7] flex items-center justify-center flex-shrink-0">
            <PhoneCall className="w-4 h-4 text-[#0F1D75]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-[#011539]">{label}</p>
            <p className="text-xs text-gray-400">{timeRange}</p>
          </div>
        </div>

        {/* Right: count + action */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <p className={`text-sm font-bold ${booked >= capacity ? 'text-red-500' : 'text-[#011539]'}`}>
              {booked} / {capacity}
            </p>
            <p className="text-xs text-gray-400">{remaining} left</p>
          </div>

          {blocked ? (
            <button type="button" onClick={() => onUnblock(key)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg
                bg-[#E4F3E6] text-[#017119] hover:bg-[#c8e8cc] transition-colors duration-150">
              <ShieldOff className="w-3.5 h-3.5" /> Unblock
            </button>
          ) : (
            <button type="button" onClick={() => onBlock(key)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg
                bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors duration-150">
              <Shield className="w-3.5 h-3.5" /> Block
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${pct * 100}%` }}
        />
      </div>

      {blocked && (
        <p className="text-xs text-orange-500 font-medium mt-2">⚠ This slot is blocked for new bookings</p>
      )}
    </div>
  );
}

export default function CallbackCapacityDisplay({ date, slots, onBlockSlot, onUnblockSlot, onBlockDay }) {
  if (!date) {
    return (
      <div className="py-16 text-center">
        <p className="text-sm text-gray-400">Select a date from the calendar to manage callback slots</p>
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-4">
        <h3 className="text-xs font-bold text-[#011539] uppercase tracking-wide">Callback Slots</h3>
        <p className="text-xs text-gray-500 mt-0.5">{formatDateDisplay(date)}</p>
      </div>

      {/* Slot rows */}
      {!slots.length ? (
        <div className="py-10 text-center">
          <p className="text-sm text-gray-400">No slot data for this date</p>
        </div>
      ) : (
        <div className="bg-gray-50/50 rounded-2xl overflow-hidden border border-gray-100 mb-5">
          {slots.map(slot => (
            <SlotCapacityRow
              key={slot.key}
              slot={slot}
              onBlock={(key) => onBlockSlot(date, key)}
              onUnblock={(key) => onUnblockSlot(date, key)}
            />
          ))}
        </div>
      )}

      {/* Block entire day */}
      <button
        id="cb-block-entire-day-btn"
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
