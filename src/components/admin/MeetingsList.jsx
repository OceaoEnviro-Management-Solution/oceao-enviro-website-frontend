// MeetingsList.jsx — VM meetings list component.
// MODIFIED: Supports two display modes:
//   - grouped=false (default): simple flat list used on Dashboard today view
//   - grouped=true: date-header dividers between days, used on Bookings page
// Props: meetings (array), grouped (bool),
//        onRetryMeet(item)            optional: creates a missing Meet link (async)
//        onStatusChange(item, status) optional: sets a callback request's status (async)
//        emptyMessage                 optional: text shown when there is nothing to list
// A meeting with a Meet link shows a "Join Meet" button; one whose link failed shows a
// "Meet link missing" badge with a "Retry" button. Callback rows get a status select.

import { useState } from 'react';
import { Video, PhoneCall, Clock, CheckCircle, Ban } from 'lucide-react';
import CallbackStatusSelect from './CallbackStatusSelect';

const TYPE_CONFIG = {
  meeting:   { icon: Video,      label: 'Virtual Meeting', color: 'text-[#017119]', bg: 'bg-[#E4F3E6]' },
  callback:  { icon: PhoneCall,  label: 'Callback',        color: 'text-[#0F1D75]', bg: 'bg-[#EAEBF7]' },
  available: { icon: Clock,      label: 'Available',       color: 'text-gray-400',  bg: 'bg-gray-100'   },
  blocked:   { icon: Ban,        label: 'Blocked',         color: 'text-amber-600', bg: 'bg-amber-50'   },
};

const WEEKDAY = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS  = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function formatDateHeader(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${WEEKDAY[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function MeetingRow({ item, onRetryMeet, onStatusChange }) {
  const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.available;
  const Icon = config.icon;
  const isAvail = item.type === 'available';
  const isCancelled = item.status === 'cancelled';

  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState('');

  // Runs an async action from this row, showing its error (a user-ready backend message) inline.
  const run = async (action) => {
    setBusy(true);
    setProblem('');
    try {
      await action();
    } catch (error) {
      setProblem(error?.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const showMeet = item.type === 'meeting' && !isCancelled;
  const meetMissing = showMeet && !item.meetLink && item.meetStatus === 'failed';
  const showStatus = item.type === 'callback' && onStatusChange;
  const hasActions = showMeet && (item.meetLink || meetMissing) || showStatus || problem;

  return (
    <div className={`flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-none ${isAvail || isCancelled ? 'opacity-50' : ''}`}>
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

        {hasActions && (
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {showMeet && item.meetLink && (
              <a
                href={item.meetLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E4F3E6] text-[#017119] text-xs font-semibold hover:bg-[#d3ebd7] transition-colors"
              >
                <Video className="w-3 h-3" />
                Join Meet
              </a>
            )}

            {meetMissing && (
              <>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
                  Meet link missing
                </span>
                {onRetryMeet && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => run(() => onRetryMeet(item))}
                    className="px-2.5 py-1 rounded-lg border border-amber-200 text-amber-700 text-xs font-semibold hover:bg-amber-50 transition-colors disabled:opacity-60 disabled:cursor-wait"
                  >
                    {busy ? 'Retrying…' : 'Retry'}
                  </button>
                )}
              </>
            )}

            {showStatus && (
              <CallbackStatusSelect
                value={item.status}
                name={item.name}
                disabled={busy}
                onChange={(status) => run(() => onStatusChange(item, status))}
              />
            )}

            {problem && <p className="text-xs text-red-600" role="alert">{problem}</p>}
          </div>
        )}
      </div>

      {/* Type badge + duration */}
      <div className="flex-shrink-0 text-right">
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
          {config.label}
        </span>
        {isCancelled && item.type === 'meeting' && (
          <p className="mt-1">
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600">Cancelled</span>
          </p>
        )}
        {item.duration && <p className="text-xs text-gray-400 mt-0.5">{item.duration}</p>}
      </div>
    </div>
  );
}

export default function MeetingsList({
  meetings = [],
  grouped = false,
  onRetryMeet,
  onStatusChange,
  emptyMessage = 'No upcoming meetings today',
}) {
  if (!meetings.length) {
    return (
      <div className="py-12 text-center">
        <CheckCircle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
        <p className="text-sm text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  const renderRow = (item) => (
    <MeetingRow key={item.id} item={item} onRetryMeet={onRetryMeet} onStatusChange={onStatusChange} />
  );

  if (!grouped) {
    // Flat mode — dashboard
    return (
      <div className="divide-y divide-gray-50">
        {meetings.map(renderRow)}
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
            {items.map(renderRow)}
          </div>
        </div>
      ))}
    </div>
  );
}
