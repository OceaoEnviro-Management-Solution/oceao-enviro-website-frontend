// Calendar.jsx — Reusable admin calendar with 30-day window enforcement.
// Refactored from AdminCalendar.jsx. Key addition: past dates and dates
// beyond today+30 are rendered as disabled/view-only (no onClick, grayed out).
// Props: availability (mockAvailability map), callbackAvailability (optional),
//        selectedDate, onDateSelect, mode ('vm'|'callback')

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CALLBACK_SLOTS } from '../../constants/mockData';

// ── VM status from availability map ──────────────────────────────────────────
function getVMDayStatus(dateStr, availability) {
  const data = availability[dateStr];
  if (!data) return 'available';
  const slots = Object.values(data.meetings || {});
  if (!slots.length) return 'available';
  const allBlocked = slots.every(s => s === 'blocked');
  const allBooked  = slots.every(s => s === 'booked');
  const hasBooked  = slots.some(s => s === 'booked');
  const hasAvail   = slots.some(s => s === 'available');
  if (allBlocked) return 'blocked';
  if (allBooked)  return 'booked';
  if (hasBooked && hasAvail) return 'partial';
  return 'available';
}

// ── Callback status from callbackAvailability map ─────────────────────────────
function getCallbackDayStatus(dateStr, callbackAvailability) {
  const data = callbackAvailability[dateStr];
  if (!data) return 'available';
  const slots = Object.entries(data);
  const allBlocked = slots.every(([, v]) => v.blocked);
  if (allBlocked) return 'blocked';
  const totalCapacity = Object.values(CALLBACK_SLOTS).reduce((s, v) => s + v.capacity, 0);
  const totalBooked   = slots.reduce((s, [, v]) => s + (v.booked || 0), 0);
  if (totalBooked === 0) return 'available';
  if (totalBooked >= totalCapacity) return 'booked';
  return 'partial';
}

const STATUS_DOT = {
  available: 'bg-[#017119]',
  partial:   'bg-[#FFA500]',
  booked:    'bg-red-400',
  blocked:   'bg-gray-400',
};

const DAY_NAMES   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December'];

export default function Calendar({
  availability = {},
  callbackAvailability = {},
  selectedDate,
  onDateSelect,
  mode = 'vm'
}) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today); maxDate.setDate(today.getDate() + 30);

  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear,  setViewYear]  = useState(today.getFullYear());

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  // Build calendar grid (Monday-first)
  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay  = new Date(viewYear, viewMonth + 1, 0);
  let startDow = firstDay.getDay() - 1;
  if (startDow < 0) startDow = 6;

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(d);

  const isWeekend = (idx) => { const a = idx % 7; return a === 5 || a === 6; };

  const todayStr = today.toISOString().split('T')[0];

  function getDateStr(day) {
    if (!day) return '';
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function isDateDisabled(day, cellIdx) {
    if (!day) return true;
    if (isWeekend(cellIdx)) return true;
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    return d < today || d > maxDate;  // ← 30-day window enforcement
  }

  return (
    <div className="select-none">
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Previous month">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <h3 className="text-sm font-bold text-[#011539]">{MONTH_NAMES[viewMonth]} {viewYear}</h3>
        <button type="button" onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Next month">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map(dn => (
          <div key={dn} className="text-center text-xs font-semibold text-gray-400 py-1">{dn}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;

          const dateStr     = getDateStr(day);
          const disabled    = isDateDisabled(day, idx);
          const isToday     = dateStr === todayStr;
          const selDateStr  = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
          const isSelected  = dateStr === selDateStr;
          const status      = disabled ? null
            : mode === 'callback'
              ? getCallbackDayStatus(dateStr, callbackAvailability)
              : getVMDayStatus(dateStr, availability);

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => !disabled && onDateSelect(new Date(viewYear, viewMonth, day))}
              disabled={disabled}
              aria-label={`${day} ${MONTH_NAMES[viewMonth]} ${viewYear}${isToday ? ' (today)' : ''}${disabled ? ' (unavailable)' : ''}`}
              className={[
                'relative flex flex-col items-center justify-center py-1.5 rounded-lg text-sm transition-all duration-150',
                disabled    ? 'cursor-not-allowed opacity-25 text-gray-400' : 'cursor-pointer hover:bg-gray-50',
                isSelected  ? 'bg-[#017119] text-white font-bold hover:bg-[#017119]' : '',
                isToday && !isSelected ? 'border-2 border-[#017119] font-bold text-[#017119]' : '',
                !isSelected && !isToday && !disabled ? 'text-[#011539]' : '',
              ].join(' ')}
            >
              {day}
              {status && (
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${isSelected ? 'bg-white' : STATUS_DOT[status]}`} />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-4 pt-3 border-t border-gray-100">
        {[
          { status: 'available', label: 'Available' },
          { status: 'partial',   label: mode === 'callback' ? 'Partial' : 'Partial' },
          { status: 'booked',    label: mode === 'callback' ? 'Full'    : 'Booked' },
          { status: 'blocked',   label: 'Blocked' },
        ].map(({ status, label }) => (
          <span key={status} className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className={`w-2 h-2 rounded-full ${STATUS_DOT[status]}`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
