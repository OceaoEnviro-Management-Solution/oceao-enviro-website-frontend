// CapacitySettingsCard.jsx — How many callback requests each period takes.
// Three number inputs (Morning / Afternoon / Evening, 0 to 50) and Save. Saving needs the
// employee name and a reason; the change applies to the very next request, and lowering a
// number never cancels anyone who is already booked.

import { useState, useEffect } from 'react';
import { PhoneCall, RefreshCw } from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { useAdminContext } from '../../hooks/useAdminContext';
import { CALLBACK_PERIODS } from '../../constants/callbackPeriods';
import { FIELD_LIMITS } from '../../utils/validation';
import { getStoredAdminName, saveAdminName } from '../../utils/adminName';
import { modalErrorsFrom } from '../../utils/adminFormErrors';

const PERIOD_KEYS = ['morning', 'afternoon', 'evening'];
const MIN = 0;
const MAX = 50;

// The inputs hold text, so an empty or half-typed value can be told apart from a number.
const toInputs = (capacity) => Object.fromEntries(PERIOD_KEYS.map((key) => [key, String(capacity[key])]));

export default function CapacitySettingsCard() {
  const { triggerRefresh } = useAdminContext();

  const [state, setState] = useState({ status: 'loading', saved: null, error: '' });
  const [values, setValues] = useState(null);                       // input texts
  const [employeeName, setEmployeeName] = useState(getStoredAdminName());
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState('');

  // ── Load the saved capacity once ──────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    adminApi.getSettings()
      .then((result) => {
        if (cancelled) return;
        setState({ status: 'ready', saved: result.callbackCapacity, error: '' });
        setValues(toInputs(result.callbackCapacity));
      })
      .catch((error) => {
        if (!cancelled) setState({ status: 'error', saved: null, error: error?.message || 'Could not load the settings.' });
      });

    return () => { cancelled = true; };
  }, []);

  function validate() {
    const e = {};
    for (const key of PERIOD_KEYS) {
      const text = values[key].trim();
      const number = Number(text);
      if (text === '' || !Number.isInteger(number) || number < MIN || number > MAX) {
        e[key] = `Enter a whole number from ${MIN} to ${MAX}`;
      }
    }
    if (employeeName.trim().length < 2) e.employeeName = 'Employee name is required';
    else if (employeeName.trim().length > FIELD_LIMITS.employeeName.max) {
      e.employeeName = `Employee name cannot exceed ${FIELD_LIMITS.employeeName.max} characters`;
    }
    if (reason.trim().length < 3)       e.reason = 'Please give a reason (at least 3 characters)';
    else if (reason.trim().length > FIELD_LIMITS.adminReason.max) {
      e.reason = `Reason cannot exceed ${FIELD_LIMITS.adminReason.max} characters`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    setDone('');
    if (!validate()) return;

    saveAdminName(employeeName);
    setBusy(true);
    try {
      const capacity = Object.fromEntries(PERIOD_KEYS.map((key) => [key, Number(values[key])]));
      const saved = await adminApi.updateCallbackCapacity(capacity, employeeName.trim(), reason.trim());
      setState({ status: 'ready', saved, error: '' });
      setValues(toInputs(saved));
      setReason('');
      setErrors({});
      setDone('Capacity saved. It applies to the next callback request.');
      triggerRefresh();
    } catch (error) {
      const next = modalErrorsFrom(error);
      // The backend names a bad period (morning, afternoon, evening): show it under that input
      if (error?.code === 'VALIDATION_FAILED') {
        for (const key of PERIOD_KEYS) {
          const problem = error.fieldErrors?.[key];
          if (problem) {
            delete next._global;
            next[key] = Array.isArray(problem) ? problem[0] : String(problem);
          }
        }
      }
      setErrors(next);
    } finally {
      setBusy(false);
    }
  }

  const fieldClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors
     ${hasError ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <div>
        <h3 className="text-xs font-bold text-[#011539] uppercase tracking-wide">Callback Capacity</h3>
        <p className="text-xs text-gray-500 mt-0.5">
          How many callback requests each period takes. Lowering a number never cancels anyone already booked.
        </p>
      </div>

      {state.status === 'loading' && (
        <div className="flex items-center justify-center py-10">
          <RefreshCw className="w-6 h-6 text-[#017119] animate-spin" />
        </div>
      )}

      {state.status === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg" role="alert">{state.error}</p>
      )}

      {state.status === 'ready' && values && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PERIOD_KEYS.map((key) => (
              <div key={key}>
                <label htmlFor={`capacity-${key}`} className="flex items-center gap-2 text-sm font-semibold text-[#011539] mb-1.5">
                  <span className="w-6 h-6 rounded-lg bg-[#EAEBF7] flex items-center justify-center">
                    <PhoneCall className="w-3 h-3 text-[#0F1D75]" />
                  </span>
                  {CALLBACK_PERIODS[key].label}
                </label>
                <input
                  id={`capacity-${key}`} type="number" inputMode="numeric" min={MIN} max={MAX} step={1}
                  value={values[key]}
                  onChange={(e) => {
                    setValues((v) => ({ ...v, [key]: e.target.value }));
                    setErrors((p) => ({ ...p, [key]: '' }));
                    setDone('');
                  }}
                  className={fieldClass(errors[key])}
                />
                <p className="text-xs text-gray-400 mt-1">{CALLBACK_PERIODS[key].timeRange}</p>
                {errors[key] && <p className="text-xs text-red-600 mt-1">{errors[key]}</p>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="capacity-employee" className="text-sm font-semibold text-[#011539] block mb-1.5">
                Employee Name <span className="text-red-500">*</span>
              </label>
              <input id="capacity-employee" type="text" value={employeeName}
                onChange={(e) => { setEmployeeName(e.target.value); setErrors((p) => ({ ...p, employeeName: '' })); }}
                placeholder="Who is making this change?"
                className={fieldClass(errors.employeeName)} />
              {errors.employeeName && <p className="text-xs text-red-600 mt-1">{errors.employeeName}</p>}
            </div>
            <div>
              <label htmlFor="capacity-reason" className="text-sm font-semibold text-[#011539] block mb-1.5">
                Reason <span className="text-red-500">*</span>
              </label>
              <input id="capacity-reason" type="text" value={reason}
                onChange={(e) => { setReason(e.target.value); setErrors((p) => ({ ...p, reason: '' })); }}
                placeholder="e.g. Fewer staff this month"
                className={fieldClass(errors.reason)} />
              {errors.reason && <p className="text-xs text-red-600 mt-1">{errors.reason}</p>}
            </div>
          </div>

          {errors._global && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg" role="alert">{errors._global}</p>
          )}
          {done && (
            <p className="text-sm text-[#017119] bg-[#E4F3E6] px-3 py-2 rounded-lg" role="status">{done}</p>
          )}

          <button type="button" onClick={handleSave} disabled={busy}
            className="px-6 py-3 rounded-xl bg-[#017119] text-white text-sm font-semibold hover:bg-[#014D11] active:scale-[0.98] transition-all disabled:opacity-60">
            {busy ? 'Saving…' : 'Save capacity'}
          </button>
        </>
      )}
    </div>
  );
}
