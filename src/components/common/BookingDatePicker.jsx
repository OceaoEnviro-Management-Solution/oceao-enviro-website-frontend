// BookingDatePicker.jsx — THE date picker of the public website (virtual meeting booking and
// callback request). One component, one look, one set of rules:
//   - the window is today .. today + 30 days (utils/bookingWindow.js)
//   - Sundays and the 2nd Saturday of the month are always closed, whatever the backend answered
//   - every day the backend calendar reports as not bookable (a holiday, a full day ...) is closed
//   - closed days are coloured (oe-day-closed / oe-day-holiday in styles/globals.css) and the
//     calendar carries a legend that says what the colours mean
//
// Props:
//   id, selected (Date | null), onChange(date), placeholder
//   calendarDays  dateKey -> { bookable, reason } from GET /vm/calendar or /callback/calendar
//   loading       the calendar answer is still on its way: the picker is locked and says so
//   disabled, hasError

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDays, Loader2 } from 'lucide-react';
import CalendarLegend from './CalendarLegend';
import { toDateKey } from '../../utils/dateKey';
import { bookingWindow } from '../../utils/bookingWindow';
import { closedDayKind, isClosedByRule } from '../../utils/closedDays';

const DAY_CLASSES = { closed: 'oe-day-closed', holiday: 'oe-day-holiday' };

// The field the visitor clicks. react-datepicker adds `value`, `onClick` and `id`.
function PickerField({ value, onClick, id, loading, disabled, hasError, placeholder }) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 bg-white text-left text-sm
        focus:outline-none transition-colors duration-200 disabled:cursor-wait disabled:opacity-70
        ${hasError ? 'border-red-400' : 'border-gray-200 hover:border-[#017119] focus:border-[#017119]'}`}
      aria-label="Select a date"
      aria-busy={loading}
    >
      {loading
        ? <Loader2 className="w-5 h-5 text-[#017119] flex-shrink-0 animate-spin" />
        : <CalendarDays className="w-5 h-5 text-[#017119] flex-shrink-0" />}
      <span className={value ? 'text-[#011539] font-medium' : 'text-gray-400'}>
        {loading ? 'Loading available dates…' : (value || placeholder)}
      </span>
    </button>
  );
}

export default function BookingDatePicker({
  id,
  selected = null,
  onChange,
  calendarDays = {},
  loading = false,
  disabled = false,
  hasError = false,
  placeholder = 'Select a date',
}) {
  const { today, maxDate } = bookingWindow();

  const filterDate = (date) => {
    const key = toDateKey(date);
    if (isClosedByRule(key)) return false;
    const day = calendarDays[key];
    return !day || day.bookable;
  };

  const dayClassName = (date) => {
    const key = toDateKey(date);
    return DAY_CLASSES[closedDayKind(key, calendarDays[key])] || undefined;
  };

  return (
    <div className="date-selector-wrapper">
      <DatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        filterDate={filterDate}
        dayClassName={dayClassName}
        minDate={today}
        maxDate={maxDate}
        disabled={disabled}
        customInput={<PickerField loading={loading} disabled={disabled} hasError={hasError} placeholder={placeholder} />}
        dateFormat="EEEE, d MMMM yyyy"
        placeholderText={placeholder}
        showPopperArrow={false}
        calendarStartDay={1}  // Monday first
        formatWeekDay={(dayName) => dayName.slice(0, 3)}  // Mon, Tue, Wed ...
        popperProps={{ strategy: 'fixed' }}
        portalId="datepicker-portal"
      >
        <CalendarLegend />
      </DatePicker>
    </div>
  );
}
