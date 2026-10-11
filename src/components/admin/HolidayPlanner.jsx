// HolidayPlanner.jsx — Plan the year's holidays.
//   - a 12-month calendar of the selected year (Sundays and second Saturdays are closed by rule)
//   - click an open date to name it as a holiday; click a holiday to rename or remove it
//   - "Select multiple": tick several open dates, name them and save them in one go
//     (the start-of-year setup, through the bulk endpoint)
//   - a list of the year's holidays by date
// Nothing is cancelled when a holiday is added: if bookings already exist on the date the
// response says how many, and a notice tells staff to cancel them from the availability pages.

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ListChecks, X, RefreshCw } from 'lucide-react';
import { adminApi } from '../../services/adminApi';
import { useAdminContext } from '../../hooks/useAdminContext';
import { fromDateKey } from '../../utils/dateKey';
import { formatDateDisplay, FIELD_LIMITS } from '../../utils/validation';
import { getStoredAdminName, saveAdminName } from '../../utils/adminName';
import { modalErrorsFrom } from '../../utils/adminFormErrors';
import HolidayYearCalendar from './HolidayYearCalendar';
import HolidayModal from './HolidayModal';

const plural = (count, noun) => `${count} ${noun}${count === 1 ? '' : 's'}`;

// "2 meetings and 1 callback are already booked on this date. Cancel them from ... if needed."
function affectedMessage(affected, { many = false } = {}) {
  const meetings = affected?.vmBookings ?? 0;
  const callbacks = affected?.callbackRequests ?? 0;
  if (meetings + callbacks === 0) return null;

  return `${plural(meetings, 'meeting')} and ${plural(callbacks, 'callback')} are already booked on ` +
    `${many ? 'these dates' : 'this date'}. Cancel them from the availability pages if needed.`;
}

const SKIP_TEXT = { exists: 'already a holiday', closed_by_rule: 'closed by rule' };

export default function HolidayPlanner() {
  const { refreshTrigger, triggerRefresh } = useAdminContext();

  const [year, setYear] = useState(new Date().getFullYear());

  // The year's holidays, tagged with the year they answer (a stale answer is never shown)
  const [loaded, setLoaded] = useState({ year: null, holidays: [], error: '' });
  const [reloadTick, setReloadTick] = useState(0);

  // Select-multiple: date key -> the name typed for it
  const [selectMode, setSelectMode] = useState(false);
  const [picked, setPicked] = useState({});
  const [bulk, setBulk] = useState({ employeeName: getStoredAdminName(), reason: '', errors: {}, busy: false });

  // The single-date modal: { mode: 'add' | 'edit', date, holidayName }
  const [modal, setModal] = useState(null);

  // What the last change did: { tone: 'ok' | 'warn', lines: [] }
  const [notice, setNotice] = useState(null);

  // ── Load the year ─────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    adminApi.getHolidays(year)
      .then((result) => {
        if (!cancelled) setLoaded({ year, holidays: result.holidays, error: '' });
      })
      .catch((error) => {
        if (!cancelled) setLoaded({ year, holidays: [], error: error?.message || 'Could not load the holidays.' });
      });

    return () => { cancelled = true; };
  }, [year, reloadTick, refreshTrigger]);

  const loading = loaded.year !== year;
  const holidayMap = new Map(loaded.holidays.map((holiday) => [holiday.date, holiday.name]));
  const pickedDates = Object.keys(picked).sort();

  const reload = useCallback(() => {
    setReloadTick((n) => n + 1);
    triggerRefresh();
  }, [triggerRefresh]);

  // ── Year navigation ───────────────────────────────────────────────────────
  function changeYear(delta) {
    setYear((y) => y + delta);
    setPicked({});
    setNotice(null);
  }

  // ── Select multiple ───────────────────────────────────────────────────────
  function toggleSelectMode() {
    setSelectMode((on) => !on);
    setPicked({});
    // Prefill with the latest saved name (another form on this page may have changed it)
    setBulk((b) => ({ ...b, employeeName: getStoredAdminName() || b.employeeName, errors: {} }));
  }

  function handleDayClick(dateKey) {
    const holidayName = holidayMap.get(dateKey);

    if (selectMode) {
      if (holidayName !== undefined) return;     // already a holiday
      setPicked((prev) => {
        const next = { ...prev };
        if (dateKey in next) delete next[dateKey];
        else next[dateKey] = '';
        return next;
      });
      return;
    }

    setModal(holidayName !== undefined
      ? { mode: 'edit', date: dateKey, holidayName }
      : { mode: 'add', date: dateKey, holidayName: '' });
  }

  // ── Single-date actions (the modal shows any failure and stays open) ──────
  async function addOne(name, employeeName, reason) {
    const result = await adminApi.addHoliday(modal.date, name, employeeName, reason);
    const warning = affectedMessage(result.affected);
    setNotice(warning
      ? { tone: 'warn', lines: [`${name} added on ${modal.date}.`, warning] }
      : { tone: 'ok', lines: [`${name} added on ${modal.date}.`] });
    reload();
  }

  async function renameOne(name, employeeName, reason) {
    await adminApi.renameHoliday(modal.date, name, employeeName, reason);
    setNotice({ tone: 'ok', lines: [`${modal.date} renamed to ${name}.`] });
    reload();
  }

  async function removeOne(employeeName, reason) {
    await adminApi.removeHoliday(modal.date, employeeName, reason);
    setNotice({ tone: 'ok', lines: [`${modal.holidayName} on ${modal.date} removed. The date is open for bookings again.`] });
    reload();
  }

  // ── Bulk save ─────────────────────────────────────────────────────────────
  async function saveBulk() {
    const errors = {};
    const unnamed = pickedDates.filter((date) => picked[date].trim().length < 2);
    const tooLong = pickedDates.filter((date) => picked[date].trim().length > FIELD_LIMITS.holidayName.max);
    if (unnamed.length) errors.names = 'Give every selected date a name (at least 2 characters).';
    else if (tooLong.length) errors.names = `Holiday names cannot exceed ${FIELD_LIMITS.holidayName.max} characters.`;
    else if (pickedDates.length > FIELD_LIMITS.holidayBatch) {
      errors.names = `Select at most ${FIELD_LIMITS.holidayBatch} dates at a time.`;
    }
    if (bulk.employeeName.trim().length < 2) errors.employeeName = 'Employee name is required';
    else if (bulk.employeeName.trim().length > FIELD_LIMITS.employeeName.max) {
      errors.employeeName = `Employee name cannot exceed ${FIELD_LIMITS.employeeName.max} characters`;
    }
    if (bulk.reason.trim().length < 3) errors.reason = 'Please give a reason (at least 3 characters)';
    else if (bulk.reason.trim().length > FIELD_LIMITS.adminReason.max) {
      errors.reason = `Reason cannot exceed ${FIELD_LIMITS.adminReason.max} characters`;
    }
    if (Object.keys(errors).length) {
      setBulk((b) => ({ ...b, errors }));
      return;
    }

    saveAdminName(bulk.employeeName);
    setBulk((b) => ({ ...b, busy: true, errors: {} }));
    try {
      const result = await adminApi.addHolidays(
        pickedDates.map((date) => ({ date, name: picked[date].trim() })),
        bulk.employeeName.trim(),
        bulk.reason.trim()
      );

      const lines = [`Added ${plural(result.added.length, 'holiday')}.`];
      for (const { date, reason } of result.skipped) {
        lines.push(`${date} skipped: ${SKIP_TEXT[reason] || reason}`);
      }
      const warning = affectedMessage(result.affected, { many: true });
      if (warning) lines.push(warning);

      setNotice({ tone: warning || result.skipped.length ? 'warn' : 'ok', lines });
      setPicked({});
      setBulk((b) => ({ ...b, reason: '', busy: false }));
      reload();
    } catch (error) {
      setBulk((b) => ({ ...b, busy: false, errors: modalErrorsFrom(error) }));
    }
  }

  const fieldClass = (hasError) =>
    `w-full px-3 py-2 rounded-xl border-2 text-sm outline-none transition-colors
     ${hasError ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">

      {/* Header: title, year switcher, select-multiple toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xs font-bold text-[#011539] uppercase tracking-wide">Holiday Planner</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            A holiday closes the date for virtual meetings and callbacks. Existing bookings are not cancelled.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={() => changeYear(-1)}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Previous year">
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <p className="text-sm font-bold text-[#011539] min-w-[3.5rem] text-center">{year}</p>
          <button type="button" onClick={() => changeYear(1)}
            className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Next year">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>

          <button type="button" onClick={toggleSelectMode} aria-pressed={selectMode}
            className={`flex items-center gap-1.5 px-3 h-9 rounded-xl text-xs font-semibold transition-colors
              ${selectMode ? 'bg-orange-500 text-white hover:bg-orange-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            <ListChecks className="w-3.5 h-3.5" />
            Select multiple
          </button>
        </div>
      </div>

      {/* What the last change did */}
      {notice && (
        <div className={`rounded-xl px-4 py-3 flex items-start justify-between gap-3
          ${notice.tone === 'warn' ? 'bg-amber-50' : 'bg-[#E4F3E6]'}`} role="status">
          <div className="space-y-1">
            {notice.lines.map((line) => (
              <p key={line} className={`text-xs font-medium ${notice.tone === 'warn' ? 'text-amber-700' : 'text-[#017119]'}`}>
                {line}
              </p>
            ))}
          </div>
          <button type="button" onClick={() => setNotice(null)} aria-label="Dismiss"
            className="w-6 h-6 rounded-full hover:bg-black/5 flex items-center justify-center flex-shrink-0">
            <X className="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      )}

      {/* The year */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <RefreshCw className="w-6 h-6 text-[#017119] animate-spin" />
        </div>
      ) : loaded.error ? (
        <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg" role="alert">{loaded.error}</p>
      ) : (
        <HolidayYearCalendar
          year={year}
          holidays={holidayMap}
          selected={new Set(pickedDates)}
          selectMode={selectMode}
          onDayClick={handleDayClick}
        />
      )}

      {/* Select multiple: name the ticked dates and save them together */}
      {selectMode && (
        <div className="rounded-2xl border border-orange-200 bg-orange-50/40 p-4 space-y-3">
          <p className="text-sm font-semibold text-[#011539]">
            {pickedDates.length === 0
              ? 'Tick the dates on the calendar to add them as holidays.'
              : `${plural(pickedDates.length, 'date')} selected`}
          </p>

          {pickedDates.length > 0 && (
            <>
              <div className="space-y-2">
                {pickedDates.map((date) => (
                  <div key={date} className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-gray-600 w-40 flex-shrink-0">
                      {formatDateDisplay(fromDateKey(date))}
                    </span>
                    <input type="text" value={picked[date]}
                      aria-label={`Holiday name for ${date}`}
                      onChange={(e) => { setPicked((p) => ({ ...p, [date]: e.target.value })); setBulk((b) => ({ ...b, errors: { ...b.errors, names: '' } })); }}
                      placeholder="Holiday name"
                      className={fieldClass(false)} />
                    <button type="button" aria-label={`Remove ${date} from the selection`}
                      onClick={() => handleDayClick(date)}
                      className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
              {bulk.errors.names && <p className="text-xs text-red-600">{bulk.errors.names}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="bulk-employee" className="text-xs font-semibold text-[#011539] block mb-1">
                    Employee Name <span className="text-red-500">*</span>
                  </label>
                  <input id="bulk-employee" type="text" value={bulk.employeeName}
                    onChange={(e) => setBulk((b) => ({ ...b, employeeName: e.target.value, errors: { ...b.errors, employeeName: '' } }))}
                    placeholder="Who is making this change?"
                    className={fieldClass(bulk.errors.employeeName)} />
                  {bulk.errors.employeeName && <p className="text-xs text-red-600 mt-1">{bulk.errors.employeeName}</p>}
                </div>
                <div>
                  <label htmlFor="bulk-reason" className="text-xs font-semibold text-[#011539] block mb-1">
                    Reason <span className="text-red-500">*</span>
                  </label>
                  <input id="bulk-reason" type="text" value={bulk.reason}
                    onChange={(e) => setBulk((b) => ({ ...b, reason: e.target.value, errors: { ...b.errors, reason: '' } }))}
                    placeholder="e.g. Holiday list for the year"
                    className={fieldClass(bulk.errors.reason)} />
                  {bulk.errors.reason && <p className="text-xs text-red-600 mt-1">{bulk.errors.reason}</p>}
                </div>
              </div>

              {bulk.errors._global && (
                <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg" role="alert">{bulk.errors._global}</p>
              )}

              <button type="button" onClick={saveBulk} disabled={bulk.busy}
                className="px-5 py-2.5 rounded-xl bg-[#017119] text-white text-sm font-semibold hover:bg-[#014D11] active:scale-[0.98] transition-all disabled:opacity-60">
                {bulk.busy ? 'Saving…' : `Save ${plural(pickedDates.length, 'holiday')}`}
              </button>
            </>
          )}
        </div>
      )}

      {/* The year's holidays by date */}
      <div>
        <h4 className="text-xs font-bold text-[#011539] uppercase tracking-wide mb-2">Holidays in {year}</h4>
        {!loading && loaded.holidays.length === 0 ? (
          <p className="text-sm text-gray-400">No holidays added for {year} yet.</p>
        ) : (
          <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50">
            {loaded.holidays.map((holiday) => (
              <div key={holiday.date} className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#011539] truncate">{holiday.name}</p>
                  <p className="text-xs text-gray-400">{formatDateDisplay(fromDateKey(holiday.date))}</p>
                </div>
                <button type="button"
                  onClick={() => setModal({ mode: 'edit', date: holiday.date, holidayName: holiday.name })}
                  aria-label={`Edit ${holiday.name}`}
                  className="text-xs font-semibold px-3 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors flex-shrink-0">
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <HolidayModal
        isOpen={Boolean(modal)}
        mode={modal?.mode}
        date={modal?.date}
        holidayName={modal?.holidayName}
        onClose={() => setModal(null)}
        onAdd={addOne}
        onRename={renameOne}
        onRemove={removeOne}
      />
    </div>
  );
}
