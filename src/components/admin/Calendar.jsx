// Calendar.jsx — Reusable admin calendar with 30-day window enforcement.
// Refactored from AdminCalendar.jsx. Key addition: past dates and dates
// beyond today+30 are rendered as disabled/view-only (no onClick, grayed out).
// Props: availability (VM mode: a map from date key to { working, holidayName, booked,
//        blocked, available }, as returned by adminApi.getMonthAvailability),
//        callbackAvailability (callback mode: a map from date key to { bookable, reason }, the
//        days of GET /callback/calendar), selectedDate, onDateSelect, mode ('vm'|'callback')
// A day the backend says is not a working day (a holiday, a weekend) is shown unavailable;
// in VM mode a holiday has its name as a tooltip. In callback mode a day with nothing left to
// book is "Full" (that includes a day staff blocked completely).

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { toDateKey } from '../../utils/dateKey';

// ── VM status from the month's slot counts ───────────────────────────────────
function getVMDayStatus(dateStr, availability) {
  const data = availability[dateStr];
  if (!data) return 'available';
  const total = (data.booked || 0) + (data.blocked || 0) + (data.available || 0);
  if (!total) return 'available';
  if (data.blocked === total) return 'blocked';
  if (!data.available)        return 'booked';     // nothing left to book
  if (data.booked > 0)        return 'partial';
  return 'available';
}

// ── Callback status from the public callback calendar ─────────────────────────
// { bookable, reason }: bookable -> available; reason 'full' -> every period is full, blocked
// or closed. (The exact split per period is shown for the selected day.)
function getCallbackDayStatus(dateStr, callbackAvailability) {
  const data = callbackAvailability[dateStr];
  if (!data || data.bookable) return 'available';
  return data.reason === 'full' ? 'booked' : 'available';
}

// Days callbacks do not run (a holiday, a closed Sunday or second Saturday)
const CALLBACK_CLOSED_REASONS = ['holiday', 'non_working_day'];

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

  const todayStr = toDateKey(today);

  function getDateStr(day) {
    if (!day) return '';
    return `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function isDateDisabled(day, cellIdx) {
    if (!day) return true;
    if (isWeekend(cellIdx)) return true;
    // Holidays and other days VM does not run (from /admin/vm/calendar)
    if (mode === 'vm' && availability[getDateStr(day)]?.working === false) return true;
    if (mode === 'callback' && CALLBACK_CLOSED_REASONS.includes(callbackAvailability[getDateStr(day)]?.reason)) return true;
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
          const selDateStr  = selectedDate ? toDateKey(selectedDate) : null;
          const isSelected  = dateStr === selDateStr;
          const status      = disabled ? null
            : mode === 'callback'
              ? getCallbackDayStatus(dateStr, callbackAvailability)
              : getVMDayStatus(dateStr, availability);
          const holidayName = mode === 'vm' ? availability[dateStr]?.holidayName : null;

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => !disabled && onDateSelect(new Date(viewYear, viewMonth, day))}
              aria-disabled={disabled || undefined}
              tabIndex={disabled ? -1 : undefined}
              title={holidayName || undefined}
              aria-label={`${day} ${MONTH_NAMES[viewMonth]} ${viewYear}${isToday ? ' (today)' : ''}${holidayName ? ` (holiday: ${holidayName})` : ''}${disabled ? ' (unavailable)' : ''}`}
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
