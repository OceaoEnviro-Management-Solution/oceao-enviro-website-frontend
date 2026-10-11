// AdminBookingsPage.jsx — All bookings (VM + Callbacks) with week pagination.
// Shows 7 days per page (4 weeks = 4 pages), loaded from the backend for each week.
// VM and Callback bookings are displayed in separate grouped sections per week.
// Cancelled items are hidden unless "Show cancelled" is on.

import { useState, useEffect, useCallback } from 'react';
import { adminApi } from '../../services/adminApi';
import { useAdminContext } from '../../hooks/useAdminContext';
import { toDateKey } from '../../utils/dateKey';
import MeetingsList from '../../components/admin/MeetingsList';
import CallbacksList from '../../components/admin/CallbacksList';
import { RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function getWeekRange(weekOffset) {
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(today.getDate() + weekOffset * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  return { start, end };
}

function formatWeekLabel(start, end) {
  const s = `${MONTH_SHORT[start.getMonth()]} ${start.getDate()}`;
  const e = `${MONTH_SHORT[end.getMonth()]} ${end.getDate()}, ${end.getFullYear()}`;
  return `${s} – ${e}`;
}

export default function AdminBookingsPage() {
  const { refreshTrigger, triggerRefresh, requestName } = useAdminContext();

  const [weekOffset, setWeekOffset] = useState(0); // 0 = current week, max 3
  const [showCancelled, setShowCancelled] = useState(false);

  const { start, end } = getWeekRange(weekOffset);
  const fromKey = toDateKey(start);
  const toKey = toDateKey(end);

  // The loaded week, tagged with the query it answers, so a slow answer for a week we have
  // left is ignored and a refresh of the same week updates the page without a spinner.
  const queryId = `${fromKey}|${toKey}|${showCancelled}`;
  const [loaded, setLoaded] = useState({ id: null, vmBookings: [], cbBookings: [], error: '' });

  useEffect(() => {
    let cancelled = false;

    adminApi.getBookings(fromKey, toKey, { includeCancelled: showCancelled })
      .then((result) => {
        if (!cancelled) {
          setLoaded({ id: queryId, vmBookings: result.vmBookings, cbBookings: result.callbackBookings, error: '' });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setLoaded({ id: queryId, vmBookings: [], cbBookings: [], error: error?.message || 'Could not load bookings.' });
        }
      });

    return () => { cancelled = true; };
  }, [fromKey, toKey, showCancelled, queryId, refreshTrigger]);

  const loading = loaded.id !== queryId;
  const { vmBookings, cbBookings } = loaded;

  // ── Quick actions on a row (same flow as the dashboard) ───────────────────
  const handleRetryMeet = useCallback(async (item) => {
    const name = await requestName();
    if (!name) return;
    try {
      await adminApi.retryMeet(item.id, name);
    } finally {
      triggerRefresh();
    }
  }, [requestName, triggerRefresh]);

  const handleStatusChange = useCallback(async (item, status) => {
    const name = await requestName();
    if (!name) return;
    try {
      await adminApi.setCallbackStatus(item.id, status, name);
    } finally {
      triggerRefresh();
    }
  }, [requestName, triggerRefresh]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-[#011539]">Bookings</h2>

        <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={showCancelled}
            onChange={(e) => setShowCancelled(e.target.checked)}
            className="w-4 h-4 accent-[#017119] cursor-pointer"
          />
          Show cancelled
        </label>
      </div>

      {/* Week navigation */}
      <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
        <button type="button"
          onClick={() => setWeekOffset(w => Math.max(0, w - 1))}
          disabled={weekOffset === 0}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Previous week">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>

        <div className="text-center">
          <p className="text-sm font-bold text-[#011539]">Week {weekOffset + 1} of 4</p>
          <p className="text-xs text-gray-400">{formatWeekLabel(start, end)}</p>
        </div>

        <button type="button"
          onClick={() => setWeekOffset(w => Math.min(3, w + 1))}
          disabled={weekOffset === 3}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Next week">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <RefreshCw className="w-6 h-6 text-[#017119] animate-spin" />
        </div>
      ) : loaded.error ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-10 text-center">
          <p className="text-sm text-red-600" role="alert">{loaded.error}</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* VM Bookings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h3 className="text-sm font-bold text-[#011539] uppercase tracking-wide">Virtual Meetings</h3>
            </div>
            {vmBookings.length > 0
              ? <MeetingsList meetings={vmBookings} grouped={true} onRetryMeet={handleRetryMeet} />
              : <p className="px-5 py-8 text-sm text-gray-400 text-center">No VM bookings this week</p>
            }
          </div>

          {/* Callback Bookings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-50">
              <h3 className="text-sm font-bold text-[#011539] uppercase tracking-wide">Callback Requests</h3>
            </div>
            {cbBookings.length > 0
              ? <CallbacksList callbacks={cbBookings} grouped={true} onStatusChange={handleStatusChange} />
              : <p className="px-5 py-8 text-sm text-gray-400 text-center">No callbacks this week</p>
            }
          </div>

          {/* Week pagination dots */}
          <div className="flex justify-center gap-2">
            {[0, 1, 2, 3].map(w => (
              <button key={w} type="button" onClick={() => setWeekOffset(w)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${weekOffset === w ? 'bg-[#017119] w-6' : 'bg-gray-200 hover:bg-gray-300'}`}
                aria-label={`Go to week ${w + 1}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
