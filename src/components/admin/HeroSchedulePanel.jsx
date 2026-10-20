// HeroSchedulePanel.jsx — The switch date of the "Next set": when it replaces "Live now".
// A date picker that only offers days after today (India time), "Save date", and — once a date is
// set — "Cancel schedule", which clears the date and keeps the Next set as a draft.
// Props: switchDate ('YYYY-MM-DD' | null), slideCount (slides in the Next set), busy,
//        onSave(date), onCancel(). The page does the saving and shows the backend's errors.

import { useState } from 'react';
import { CalendarClock } from 'lucide-react';
import { fromDateKey } from '../../utils/dateKey';
import { formatDateDisplay } from '../../utils/validation';

// "Tomorrow" as a YYYY-MM-DD key in India time: the earliest day the backend accepts.
const istDateKey = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' });
const tomorrowIST = () => istDateKey.format(new Date(Date.now() + 24 * 60 * 60 * 1000));

export default function HeroSchedulePanel({ switchDate, slideCount, busy, onSave, onCancel }) {
  // The page remounts this panel when the saved date changes, so the field starts from it.
  const [value, setValue] = useState(switchDate ?? '');
  const [problem, setProblem] = useState('');
  const earliest = tomorrowIST();

  const handleSave = () => {
    if (!value) { setProblem('Please pick a date.'); return; }
    if (value < earliest) { setProblem('The date must be after today.'); return; }
    setProblem('');
    onSave(value);
  };

  const unchanged = value === (switchDate ?? '');

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 shrink-0 bg-[#EAEBF7] rounded-xl flex items-center justify-center">
          <CalendarClock className="w-5 h-5 text-[#0F1D75]" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#011539] uppercase tracking-wide">Switch date</h3>
          <p className="mt-1 text-sm text-gray-600">
            {switchDate
              ? <>This set replaces <strong>Live now</strong> on <strong>{formatDateDisplay(fromDateKey(switchDate))}</strong>. The photos of the slides it replaces are then deleted permanently.</>
              : 'No date is set, so this set stays a draft and the homepage keeps showing Live now.'}
          </p>
          {switchDate && slideCount === 0 && (
            <p className="mt-2 rounded-xl bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
              This set has no slides yet. If it is still empty on that day nothing changes and the date is cleared.
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <div>
          <label htmlFor="hero-switch-date" className="mb-1.5 block text-sm font-semibold text-[#011539]">Switch on</label>
          <input
            id="hero-switch-date"
            type="date"
            value={value}
            min={earliest}
            disabled={busy}
            onChange={(e) => { setValue(e.target.value); setProblem(''); }}
            className={`rounded-xl border-2 px-4 py-2.5 text-sm outline-none transition-colors disabled:bg-gray-50
              ${problem ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`}
          />
        </div>

        <button type="button" onClick={handleSave} disabled={busy || unchanged || !value}
          className="rounded-xl bg-[#017119] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#014D11] disabled:cursor-not-allowed disabled:opacity-50">
          {busy ? 'Saving…' : 'Save date'}
        </button>

        {switchDate && (
          <button type="button" onClick={onCancel} disabled={busy}
            className="rounded-xl border-2 border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50">
            Cancel schedule
          </button>
        )}
      </div>

      {problem && <p className="mt-2 text-xs text-red-600" role="alert">{problem}</p>}
      {switchDate && <p className="mt-3 text-xs text-gray-400">Cancelling keeps these slides as a draft; nothing is deleted.</p>}
    </div>
  );
}
