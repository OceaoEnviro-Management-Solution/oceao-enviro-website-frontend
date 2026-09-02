// MeetingsList.jsx — VM meetings list component.
// MODIFIED: Supports two display modes:
//   - grouped=false (default): simple flat list used on Dashboard today view
//   - grouped=true: date-header dividers between days, used on Bookings page
// Props: meetings (array), grouped (bool)

import { Video, PhoneCall, Clock, CheckCircle } from 'lucide-react';

const TYPE_CONFIG = {
  meeting:   { icon: Video,      label: 'Virtual Meeting', color: 'text-[#017119]', bg: 'bg-[#E4F3E6]' },
  callback:  { icon: PhoneCall,  label: 'Callback',        color: 'text-[#0F1D75]', bg: 'bg-[#EAEBF7]' },
  available: { icon: Clock,      label: 'Available',       color: 'text-gray-400',  bg: 'bg-gray-100'   },
};

const WEEKDAY = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS  = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function formatDateHeader(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${WEEKDAY[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function MeetingRow({ item }) {
  const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.available;
  const Icon = config.icon;
  const isAvail = item.type === 'available';

  return (
    <div className={`flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-none ${isAvail ? 'opacity-50' : ''}`}>
      {/* Time */}
      <div className="w-20 flex-shrink-0">
        <p className="text-sm font-bold text-[#011539]">{item.time}</p>
      </div>

      {/* Icon */}
      <div className={`w-9 h-9 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${config.color}`} />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${isAvail ? 'text-gray-400' : 'text-[#011539]'}`}>
          {isAvail ? 'Open Slot' : item.name}
        </p>
        {!isAvail && item.company && (
          <p className="text-xs text-gray-400 truncate">{item.company}</p>
        )}
      </div>

      {/* Type badge + duration */}
      <div className="flex-shrink-0 text-right">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
          {config.label}
        </span>
        {item.duration && <p className="text-xs text-gray-400 mt-0.5">{item.duration}</p>}
      </div>
    </div>
  );
}

export default function MeetingsList({ meetings = [], grouped = false }) {
  if (!meetings.length) {
    return (
      <div className="py-12 text-center">
        <CheckCircle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
        <p className="text-sm text-gray-400">No upcoming meetings today</p>
      </div>
    );
  }

  if (!grouped) {
    // Flat mode — dashboard
    return (
      <div className="divide-y divide-gray-50">
        {meetings.map(item => <MeetingRow key={item.id} item={item} />)}
      </div>
    );
  }

  // Grouped mode — bookings page
  const byDate = meetings.reduce((acc, item) => {
    const key = item.date || 'unknown';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(byDate).sort(([a], [b]) => a.localeCompare(b)).map(([date, items]) => (
        <div key={date}>
          {/* Date header */}
          <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-bold text-[#011539] uppercase tracking-wide">
              {date !== 'unknown' ? formatDateHeader(date) : 'Date Unknown'}
            </p>
          </div>
          <div className="divide-y divide-gray-50">
            {items.map(item => <MeetingRow key={item.id} item={item} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
