// DateSelector.jsx — The date picker of the virtual meeting booking (step 3).
// A thin wrapper: it loads GET /vm/calendar and hands the answer to the website's one date
// picker (components/common/BookingDatePicker.jsx), which holds every rule and the colours.
// Props: selectedDate, onChange

import BookingDatePicker from '../common/BookingDatePicker';
import ClosedDaysNote from '../common/ClosedDaysNote';
import { useBookableCalendar } from '../../hooks/useBookableCalendar';
import { bookingApi } from '../../services/bookingApi';

export default function DateSelector({ selectedDate, onChange }) {
  const calendar = useBookableCalendar(bookingApi.getCalendar);

  return (
    <div className="flex flex-col gap-3">
      <ClosedDaysNote />

      <BookingDatePicker
        selected={selectedDate}
        onChange={onChange}
        calendarDays={calendar.byDate}
        loading={calendar.status === 'loading'}
        placeholder="Select a date"
      />

      {calendar.status === 'error' && (
        <p className="text-xs text-red-500" role="alert">{calendar.error}</p>
      )}
    </div>
  );
}
