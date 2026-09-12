// DateSelector.jsx — Calendar date picker using react-datepicker.
// Disables: weekends, past dates, and any fully-blocked dates from availability.
// Props: selectedDate, onChange, blockedDates (array of date strings 'YYYY-MM-DD')

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDays } from 'lucide-react';

export default function DateSelector({ selectedDate, onChange, blockedDates = [] }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  // Convert blocked date strings to Date objects for comparison
  const blockedDateSet = new Set(blockedDates);

  // Filter function — returns false for dates that should be disabled
  const filterDate = (date) => {
    const day = date.getDay();
    // Disable weekends
    if (day === 0 || day === 6) return false;
    // Disable past dates
    if (date < today) return false;
    // Disable fully blocked dates
    const dateStr = date.toISOString().split('T')[0];
    if (blockedDateSet.has(dateStr)) return false;
    return true;
  };

  // Custom input — shows calendar icon + selected date
  const CustomInput = ({ value, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 border-gray-200
        hover:border-[#017119] focus:border-[#017119] focus:outline-none transition-colors duration-200
        bg-white text-left text-sm"
      aria-label="Select a date"
    >
      <CalendarDays className="w-5 h-5 text-[#017119] flex-shrink-0" />
      <span className={value ? 'text-[#011539] font-medium' : 'text-gray-400'}>
        {value || 'Select a date'}
      </span>
    </button>
  );

  return (
    <div className="date-selector-wrapper">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        filterDate={filterDate}
        minDate={today}
        maxDate={maxDate}
        customInput={<CustomInput />}
        dateFormat="EEEE, d MMMM yyyy"
        placeholderText="Select a date"
        showPopperArrow={false}
        calendarStartDay={1}  // Monday first
        inline={false}
        popperProps={{ strategy: 'fixed' }}
        portalId="datepicker-portal"
      />

      <style>{`
        /* ── Popper z-index — must sit above navbar (z-50), hero, footer ── */
        #datepicker-portal {
          position: fixed;
          z-index: 9999;
        }
        .react-datepicker-popper {
          z-index: 9999 !important;
        }

        /* react-datepicker brand overrides */
        .react-datepicker {
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          font-family: inherit;
          overflow: hidden;
        }
        .react-datepicker__header {
          background: #017119;
          border: none;
          padding: 14px;
        }
        .react-datepicker__current-month {
          color: white;
          font-size: 15px;
          font-weight: 700;
        }
        .react-datepicker__day-name {
          color: rgba(255,255,255,0.75);
          font-size: 12px;
          font-weight: 600;
          width: 36px;
          line-height: 36px;
        }
        .react-datepicker__navigation-icon::before {
          border-color: white;
        }
        .react-datepicker__day {
          width: 36px;
          height: 36px;
          line-height: 36px;
          border-radius: 50%;
          margin: 2px;
          font-size: 13px;
          transition: all 0.15s;
        }
        .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
          background-color: #E4F3E6;
          color: #017119;
        }
        .react-datepicker__day--selected,
        .react-datepicker__day--keyboard-selected {
          background-color: #017119 !important;
          color: white !important;
          font-weight: 700;
        }
        .react-datepicker__day--today {
          font-weight: 700;
          border: 2px solid #017119;
        }
        .react-datepicker__day--disabled {
          color: #d1d5db !important;
          cursor: not-allowed;
        }
        .react-datepicker__navigation {
          top: 14px;
        }
      `}</style>
    </div>
  );
}
