// AdminDashboardPage.jsx — Admin dashboard overview: a day's meetings + callbacks.
// Shows stat cards + the day's schedule + "View All Bookings" CTA. Loads the real day from
// the backend; previous / next arrows and a "Today" button move between days.
// Replaces the 'dashboard' case from the old AdminDashboard.jsx god component.

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import { useAdminContext } from '../../hooks/useAdminContext';
import { toDateKey, fromDateKey } from '../../utils/dateKey';
import { formatDateDisplay } from '../../utils/validation';
import StatCard from '../../components/admin/StatCard';
import MeetingsList from '../../components/admin/MeetingsList';
import { Video, PhoneCall, RefreshCw, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// "YYYY-MM-DD" shifted by whole days, using local date parts (never UTC).
function shiftDateKey(dateKey, days) {
  const date = fromDateKey(dateKey);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { refreshTrigger, triggerRefresh, requestName } = useAdminContext();

  const todayKey = toDateKey(new Date());
  const [dateKey, setDateKey] = useState(todayKey);
  const isToday = dateKey === todayKey;

  // The loaded day, tagged with the date it answers, so a slow answer for a day we have since
  // left is ignored and a refresh of the same day updates the page without a spinner.
  const [loaded, setLoaded] = useState({ date: null, day: null, error: '' });
  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    adminApi.getDashboardData(dateKey)
      .then((result) => {
        if (!cancelled) setLoaded({ date: dateKey, day: result.day, error: '' });
      })
      .catch((error) => {
        if (!cancelled) {
          setLoaded({ date: dateKey, day: null, error: error?.message || 'Could not load the dashboard.' });
        }
      });

    return () => { cancelled = true; };
  }, [dateKey, refreshTrigger, retryTick]);

  const loading = loaded.date !== dateKey;
  const data = loaded.day;

  // ── Quick actions on a row ────────────────────────────────────────────────
  // Each asks who is acting (once per admin session), makes the change, then refreshes
  // whether it worked or not so the page shows what the server now says.
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

  // ── Header: title + day switcher ──────────────────────────────────────────
  const header = (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-bold text-[#011539]">Dashboard</h2>

      <div className="flex items-center gap-2">
        <button type="button"
          onClick={() => setDateKey((key) => shiftDateKey(key, -1))}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="Previous day">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>

        <p className="text-sm font-bold text-[#011539] text-center min-w-[11rem]">
          {formatDateDisplay(fromDateKey(dateKey))}
        </p>

        <button type="button"
          onClick={() => setDateKey((key) => shiftDateKey(key, 1))}
          className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          aria-label="Next day">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        <button type="button"
          onClick={() => setDateKey(todayKey)}
          disabled={isToday}
          className="px-3 h-9 rounded-xl bg-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
          Today
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="space-y-6">
        {header}
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 text-[#017119] animate-spin" />
            <p className="text-sm text-gray-500">Loading dashboard…</p>
          </div>
        </div>
      </div>
    );
  }

  if (loaded.error) {
    return (
      <div className="space-y-6">
        {header}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-10 text-center space-y-3">
          <p className="text-sm text-red-600" role="alert">{loaded.error}</p>
          <button type="button"
            onClick={() => { setLoaded({ date: null, day: null, error: '' }); setRetryTick((n) => n + 1); }}
            className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors">
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {header}

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard
          icon={<Video className="w-5 h-5" />}
          label={isToday ? "Today's Meetings" : 'Meetings'}
          value={data?.meetings}
          accentClass="bg-[#E4F3E6]"
          iconClass="text-[#017119]"
        />
        <StatCard
          icon={<PhoneCall className="w-5 h-5" />}
          label={isToday ? "Today's Callbacks" : 'Callbacks'}
          value={data?.callbacks}
          accentClass="bg-[#EAEBF7]"
          iconClass="text-[#0F1D75]"
        />
      </div>

      {/* The day's schedule */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#011539] uppercase tracking-wide">
            {isToday ? 'Upcoming Today' : 'Schedule'}
          </h3>
        </div>
        <MeetingsList
          meetings={data?.upcoming || []}
          grouped={false}
          onRetryMeet={handleRetryMeet}
          onStatusChange={handleStatusChange}
          emptyMessage={isToday ? undefined : 'Nothing scheduled for this day'}
        />
      </div>

      {/* View all bookings CTA */}
      <button
        type="button"
        onClick={() => navigate('/admin/bookings')}
        className="flex items-center gap-2 text-sm font-semibold text-[#017119] hover:gap-3 transition-all duration-200"
      >
        View All Bookings
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
