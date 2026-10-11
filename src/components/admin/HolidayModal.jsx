// HolidayModal.jsx — Small modal for one holiday date.
//   mode 'add'  : name the date as a holiday (Employee Name + Reason required)
//   mode 'edit' : rename it ("Save name") or take it off the calendar ("Remove holiday")
// The employee name is prefilled from sessionStorage ("oe_admin_name") and saved back on submit.
// A failed request shows the backend's message inside the modal, which stays open.
// Props: isOpen, mode ('add'|'edit'), date (date key), holidayName (for edit),
//        onClose, onAdd(name, employeeName, reason), onRename(name, employeeName, reason),
//        onRemove(employeeName, reason). Each returns a promise; a rejection is shown here.

import { useState, useEffect } from 'react';
import { X, CalendarDays } from 'lucide-react';
import { fromDateKey } from '../../utils/dateKey';
import { formatDateDisplay, FIELD_LIMITS } from '../../utils/validation';
import { getStoredAdminName, saveAdminName } from '../../utils/adminName';
import { modalErrorsFrom } from '../../utils/adminFormErrors';

const ANIM = `@keyframes modalPop { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;

// Mounted only while open, so its fields start fresh every time.
function HolidayDialog({ mode, date, holidayName, onClose, onAdd, onRename, onRemove }) {
  const [name, setName]                 = useState(holidayName || '');
  const [employeeName, setEmployeeName] = useState(getStoredAdminName());
  const [reason, setReason]             = useState('');
  const [errors, setErrors]             = useState({});
  const [busy, setBusy]                 = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const isEdit = mode === 'edit';

  const validate = ({ needsName }) => {
    const e = {};
    if (needsName && name.trim().length < 2) e.name = 'Holiday name must be at least 2 characters';
    else if (needsName && name.trim().length > FIELD_LIMITS.holidayName.max) {
      e.name = `Holiday name cannot exceed ${FIELD_LIMITS.holidayName.max} characters`;
    }
    if (employeeName.trim().length < 2)      e.employeeName = 'Employee name is required';
    else if (employeeName.trim().length > FIELD_LIMITS.employeeName.max) {
      e.employeeName = `Employee name cannot exceed ${FIELD_LIMITS.employeeName.max} characters`;
    }
    if (reason.trim().length < 3)            e.reason = 'Please give a reason (at least 3 characters)';
    else if (reason.trim().length > FIELD_LIMITS.adminReason.max) {
      e.reason = `Reason cannot exceed ${FIELD_LIMITS.adminReason.max} characters`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const run = async (needsName, action) => {
    if (!validate({ needsName })) return;
    saveAdminName(employeeName);
    setBusy(true);
    setErrors({});
    try {
      await action();
      onClose();
    } catch (error) {
      const next = modalErrorsFrom(error);
      // A rejected holiday name belongs under the name field, not in the general area
      const nameProblem = error?.code === 'VALIDATION_FAILED' ? error.fieldErrors?.name : null;
      if (nameProblem) {
        delete next._global;
        next.name = Array.isArray(nameProblem) ? nameProblem[0] : String(nameProblem);
      }
      setErrors(next);
    } finally {
      setBusy(false);
    }
  };

  const fieldClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors
     ${hasError ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-labelledby="holiday-modal-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-[modalPop_0.2s_ease-out]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E4F3E6] rounded-xl flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-[#017119]" />
            </div>
            <div>
              <h2 id="holiday-modal-title" className="text-base font-bold text-[#011539]">
                {isEdit ? 'Edit Holiday' : 'Add Holiday'}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">{formatDateDisplay(fromDateKey(date))}</p>
            </div>
          </div>
          <button type="button" onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Close modal">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <label htmlFor="holiday-name" className="text-sm font-semibold text-[#011539] block mb-1.5">
              Holiday Name <span className="text-red-500">*</span>
            </label>
            <input id="holiday-name" type="text" value={name} autoFocus
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }}
              placeholder="e.g. Diwali"
              className={fieldClass(errors.name)} />
            {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="holiday-employee" className="text-sm font-semibold text-[#011539] block mb-1.5">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <input id="holiday-employee" type="text" value={employeeName}
              onChange={(e) => { setEmployeeName(e.target.value); setErrors((p) => ({ ...p, employeeName: '' })); }}
              placeholder="Who is making this change?"
              className={fieldClass(errors.employeeName)} />
            {errors.employeeName && <p className="text-xs text-red-600 mt-1">{errors.employeeName}</p>}
          </div>

          <div>
            <label htmlFor="holiday-reason" className="text-sm font-semibold text-[#011539] block mb-1.5">
              Reason <span className="text-red-500">*</span>
            </label>
            <input id="holiday-reason" type="text" value={reason}
              onChange={(e) => { setReason(e.target.value); setErrors((p) => ({ ...p, reason: '' })); }}
              placeholder="e.g. Company holiday list for the year"
              className={fieldClass(errors.reason)} />
            {errors.reason && <p className="text-xs text-red-600 mt-1">{errors.reason}</p>}
          </div>

          {errors._global && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg" role="alert">{errors._global}</p>
          )}
        </div>

        {/* Footer */}
        {isEdit ? (
          <div className="flex flex-wrap gap-3 px-6 pb-6">
            <button type="button" disabled={busy}
              onClick={() => run(false, () => onRemove(employeeName.trim(), reason.trim()))}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-red-200 text-sm font-semibold text-red-600 hover:bg-red-50 transition-all disabled:opacity-60">
              Remove holiday
            </button>
            <button type="button" disabled={busy}
              onClick={() => run(true, () => onRename(name.trim(), employeeName.trim(), reason.trim()))}
              className="flex-1 px-4 py-3 rounded-xl bg-[#017119] text-white text-sm font-semibold hover:bg-[#014D11] active:scale-[0.98] transition-all disabled:opacity-60">
              {busy ? 'Saving…' : 'Save name'}
            </button>
          </div>
        ) : (
          <div className="flex gap-3 px-6 pb-6">
            <button type="button" onClick={onClose} disabled={busy}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
              Cancel
            </button>
            <button type="button" disabled={busy}
              onClick={() => run(true, () => onAdd(name.trim(), employeeName.trim(), reason.trim()))}
              className="flex-1 px-4 py-3 rounded-xl bg-[#017119] text-white text-sm font-semibold hover:bg-[#014D11] active:scale-[0.98] transition-all disabled:opacity-60">
              {busy ? 'Saving…' : 'Add holiday'}
            </button>
          </div>
        )}
      </div>
      <style>{ANIM}</style>
    </div>
  );
}

export default function HolidayModal({ isOpen, ...props }) {
  if (!isOpen) return null;
  return <HolidayDialog {...props} />;
}
