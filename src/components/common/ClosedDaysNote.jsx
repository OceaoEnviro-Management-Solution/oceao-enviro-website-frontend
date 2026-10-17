// ClosedDaysNote.jsx — The "we are closed on ..." note shown with the booking calendars.
// Uses the brand-orange-light colour, the same colour the closed days have in the calendar.

import { CalendarOff } from 'lucide-react';

export default function ClosedDaysNote({ className = '' }) {
  return (
    <div className={`flex items-start gap-3 bg-brand-orange-light rounded-xl p-3 ${className}`}>
      <CalendarOff className="w-4 h-4 text-[#8A5A00] flex-shrink-0 mt-0.5" />
      <p className="text-xs text-[#5C3B00] leading-relaxed">
        We are closed on <strong>Sundays</strong> and on the <strong>2nd Saturday</strong> of every month.
      </p>
    </div>
  );
}
