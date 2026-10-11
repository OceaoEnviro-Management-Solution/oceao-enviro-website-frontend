// CallbacksList.jsx — Callback bookings list for the admin panel.
// Similar to MeetingsList but tailored for callback records.
// Supports grouped mode (date headers) for the Bookings page.
// Props: callbacks (array), grouped (bool),
//        onStatusChange(item, status) optional: sets the request's status (async); each row
//        then shows a compact Pending / Completed / No answer select.

import { useState } from 'react';
import { PhoneCall, CheckCircle } from 'lucide-react';
import { CALLBACK_SLOTS } from '../../constants/mockData';
import CallbackStatusSelect from './CallbackStatusSelect';

const WEEKDAY = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS  = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function formatDateHeader(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${WEEKDAY[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function CallbackRow({ item, onStatusChange }) {
  const slotConfig = CALLBACK_SLOTS[item.slot] || { label: item.slot, timeRange: '' };
  const isCancelled = item.status === 'cancelled';

  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState('');

  const changeStatus = async (status) => {
    setBusy(true);
    setProblem('');
    try {
      await onStatusChange(item, status);
    } catch (error) {
      setProblem(error?.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`flex items-center gap-4 px-5 py-4 border-b border-gray-50 last:border-none ${isCancelled ? 'opacity-50' : ''}`}>
      {/* Time slot label */}
      <div className="w-24 flex-shrink-0">
        <p className="text-sm font-bold text-[#011539]">{slotConfig.label}</p>
        <p className="text-xs text-gray-400">{slotConfig.timeRange}</p>
      </div>

      {/* Icon */}
      <div className="w-9 h-9 rounded-xl bg-[#EAEBF7] flex items-center justify-center flex-shrink-0">
        <PhoneCall className="w-4 h-4 text-[#0F1D75]" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#011539] truncate">{item.name}</p>
        {item.company && <p className="text-xs text-gray-400 truncate">{item.company}</p>}
        {item.phone   && <p className="text-xs text-gray-400">{item.phone}</p>}

        {(onStatusChange || problem) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {onStatusChange && (
              <CallbackStatusSelect
                value={item.status}
                name={item.name}
                disabled={busy}
                onChange={changeStatus}
              />
            )}
            {problem && <p className="text-xs text-red-600" role="alert">{problem}</p>}
          </div>
        )}
      </div>

      {/* Type badge */}
      <div className="flex-shrink-0">
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-[#EAEBF7] text-[#0F1D75]">
          Callback
        </span>
      </div>
    </div>
  );
}

export default function CallbacksList({ callbacks = [], grouped = false, onStatusChange }) {
  if (!callbacks.length) {
    return (
      <div className="py-12 text-center">
        <CheckCircle className="w-10 h-10 text-gray-200 mx-auto mb-3" />
        <p className="text-sm text-gray-400">No callbacks booked</p>
      </div>
    );
  }

  const renderRow = (item) => (
    <CallbackRow key={item.id} item={item} onStatusChange={onStatusChange} />
  );

  if (!grouped) {
    return (
      <div className="divide-y divide-gray-50">
        {callbacks.map(renderRow)}
      </div>
    );
  }

  // Grouped by date
  const byDate = callbacks.reduce((acc, item) => {
    const key = item.date || 'unknown';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(byDate).sort(([a], [b]) => a.localeCompare(b)).map(([date, items]) => (
        <div key={date}>
          <div className="px-5 py-3 bg-purple-50/50 border-b border-purple-100/50">
            <p className="text-xs font-bold text-[#0F1D75] uppercase tracking-wide">
              {date !== 'unknown' ? formatDateHeader(date) : 'Date Unknown'} — Callbacks
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
