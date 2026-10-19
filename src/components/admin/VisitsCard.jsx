// VisitsCard.jsx — "Website visits" card of the admin dashboard: the total and the last 30 days
// as simple CSS bars (no chart library). Hover a bar for its date and count.
// Loads GET /admin/visits?days=30 once (see services/visitsApi.js).

import { useEffect, useState } from 'react';
import { Eye, RefreshCw } from 'lucide-react';
import { getAdminVisits } from '../../services/visitsApi';
import { fromDateKey } from '../../utils/dateKey';
import { formatDateDisplay } from '../../utils/validation';

const DAYS = 30;
const BAR_AREA_HEIGHT = 'h-28';

const formatCount = (value) => value.toLocaleString('en-IN');

const barTitle = ({ date, count }) =>
  `${formatDateDisplay(fromDateKey(date))}: ${formatCount(count)} ${count === 1 ? 'visit' : 'visits'}`;

export default function VisitsCard() {
  const [state, setState] = useState({ status: 'loading', data: null, error: '' });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;

    getAdminVisits(DAYS)
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', data, error: '' });
      })
      .catch((error) => {
        if (!cancelled) {
          setState({ status: 'error', data: null, error: error?.message || 'Could not load the visits.' });
        }
      });

    return () => { cancelled = true; };
  }, [tick]);

  const retry = () => {
    setState({ status: 'loading', data: null, error: '' });
    setTick((n) => n + 1);
  };

  const daily = state.data?.daily ?? [];
  const peak = Math.max(1, ...daily.map((day) => day.count));

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#EAEBF7] flex items-center justify-center">
            <Eye className="w-4 h-4 text-[#0F1D75]" />
          </div>
          <h3 className="text-sm font-bold text-[#011539] uppercase tracking-wide">Website visits</h3>
        </div>

        {state.status === 'ready' && (
          <p className="text-right">
            <span className="block text-2xl font-bold text-[#011539] leading-none">{formatCount(state.data.total)}</span>
            <span className="text-xs text-gray-400">total visits</span>
          </p>
        )}
      </div>

      <div className="px-5 py-4">
        {state.status === 'loading' && (
          <div className={`flex items-center justify-center gap-3 ${BAR_AREA_HEIGHT}`}>
            <RefreshCw className="w-5 h-5 text-[#017119] animate-spin" />
            <p className="text-sm text-gray-500">Loading visits…</p>
          </div>
        )}

        {state.status === 'error' && (
          <div className={`flex flex-col items-center justify-center gap-3 text-center ${BAR_AREA_HEIGHT}`}>
            <p className="text-sm text-red-600" role="alert">{state.error}</p>
            <button type="button" onClick={retry}
              className="px-4 py-2 rounded-xl bg-gray-100 text-xs font-semibold text-gray-600 hover:bg-gray-200 transition-colors">
              Try again
            </button>
          </div>
        )}

        {state.status === 'ready' && (
          <>
            <div
              className={`flex items-end gap-1 ${BAR_AREA_HEIGHT}`}
              role="img"
              aria-label={`Visits per day, last ${daily.length} days`}
            >
              {daily.map((day) => (
                <div key={day.date} title={barTitle(day)} className="flex-1 h-full flex items-end">
                  <div
                    className={`w-full rounded-t ${day.count > 0 ? 'bg-[#017119]' : 'bg-gray-200'}`}
                    style={{ height: `${day.count > 0 ? Math.max(6, (day.count / peak) * 100) : 2}%` }}
                  />
                </div>
              ))}
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <span>{daily.length > 0 ? formatDateDisplay(fromDateKey(daily[0].date)) : ''}</span>
              <span>Last {daily.length} days · most in a day: {formatCount(Math.max(0, ...daily.map((day) => day.count)))}</span>
              <span>{daily.length > 0 ? formatDateDisplay(fromDateKey(daily[daily.length - 1].date)) : ''}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
