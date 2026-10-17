// CalendarLegend.jsx — What the colours of the booking calendars mean.
// Colours match the day classes in styles/globals.css (oe-day-closed, oe-day-holiday).

const ITEMS = [
  { key: 'closed',   swatch: 'bg-brand-orange-light border border-[#E8C98A]', label: 'Closed: Sundays and 2nd Saturday' },
  { key: 'holiday',  swatch: 'bg-[#FDE4E4] border border-[#F2B8B5]',         label: 'Company / festival holiday' },
  { key: 'full',     swatch: 'bg-gray-100 border border-gray-300',            label: 'Not available (past, full or blocked)' },
  { key: 'selected', swatch: 'bg-brand-green',                                label: 'Selected' },
];

export default function CalendarLegend({ className = '' }) {
  return (
    <ul className={`flex flex-col gap-1.5 text-xs text-gray-600 ${className}`} aria-label="Calendar colours">
      {ITEMS.map((item) => (
        <li key={item.key} className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full inline-block flex-shrink-0 ${item.swatch}`} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
