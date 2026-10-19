// PariveshSyncBanner.jsx — Admin dashboard warning for the PARIVESH sync.
// Shows nothing while the last successful sync is less than 24 hours old (or while the status
// cannot be read). When it is older, or there has never been one, an amber banner says so and
// "Sync now" runs a sync (GET/POST /admin/updates/..., see services/updatesApi.js).

import { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { getSyncStatus, runSync } from '../../services/updatesApi';
import { formatDateTimeIST } from '../../utils/updateFormat';

const STALE_AFTER_MS = 24 * 60 * 60 * 1000;

export default function PariveshSyncBanner() {
  // stale is worked out when the status arrives (not while rendering), against that moment
  const [status, setStatus] = useState(null);
  const [stale, setStale] = useState(false);
  const [run, setRun] = useState({ state: 'idle', error: '', result: null });

  const applyStatus = useCallback((next) => {
    setStatus(next);
    setStale(!next.lastSuccessAt || Date.now() - next.lastSuccessAt.getTime() > STALE_AFTER_MS);
  }, []);

  useEffect(() => {
    let cancelled = false;

    getSyncStatus()
      .then((next) => {
        if (!cancelled) applyStatus(next);
      })
      .catch(() => {
        // The banner is only a warning: if the status cannot be read it stays out of the way.
      });

    return () => { cancelled = true; };
  }, [applyStatus]);

  const syncNow = async () => {
    setRun({ state: 'running', error: '', result: null });
    try {
      const result = await runSync();
      setRun({ state: 'done', error: '', result });
      getSyncStatus().then(applyStatus).catch(() => {});
    } catch (error) {
      setRun({ state: 'failed', error: error?.message || 'The sync could not be run.', result: null });
    }
  };

  if (run.state === 'done' && !stale) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4" role="status">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#017119]" aria-hidden="true" />
        <p className="text-sm font-semibold text-green-900">
          PARIVESH synced: {run.result.saved} updates saved.
        </p>
      </div>
    );
  }

  if (!status || !stale) return null;

  const running = run.state === 'running';

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4" role="alert">
      <div className="flex min-w-0 items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden="true" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-amber-900">
            PARIVESH sync failed: last success {status.lastSuccessAt ? formatDateTimeIST(status.lastSuccessAt) : 'never'}
          </p>
          {status.lastError && <p className="mt-0.5 text-xs text-amber-800">{status.lastError}</p>}
          {run.state === 'failed' && <p className="mt-1 text-xs font-semibold text-red-700">{run.error}</p>}
        </div>
      </div>

      <button
        type="button"
        onClick={syncNow}
        disabled={running}
        className="inline-flex items-center gap-2 rounded-xl bg-[#017119] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#014D11] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${running ? 'animate-spin' : ''}`} aria-hidden="true" />
        {running ? 'Syncing…' : 'Sync now'}
      </button>
    </div>
  );
}
