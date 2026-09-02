// BlockSlotModal.jsx — Modal for blocking a VM slot or entire day.
// MODIFIED: Multi-step flow when blocking a BOOKED slot.
//   Step 1 (booked slots only): "Do you want to cancel the existing meeting?" (radio)
//   Step 2a (no cancel): employee name + reason → block only
//   Step 2b (yes cancel): shows booking details, employee name + reason → cancel + block
//   Step 1 is skipped entirely for available/blocked slots.
// Props: isOpen, mode ('slot'|'day'), slotTime, date, slot (full slot obj), onClose, onConfirm, onCancelMeeting

import { useState, useEffect, useRef } from 'react';
import { X, ShieldAlert } from 'lucide-react';
import { formatDateDisplay, formatTimeDisplay } from '../../utils/validation';

const ANIM = `@keyframes modalPop { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;

export default function BlockSlotModal({ isOpen, mode = 'slot', slotTime, date, slot, onClose, onConfirm, onCancelMeeting }) {
  const isBooked    = slot?.status === 'booked';
  const [step, setStep]                 = useState(1); // 1=decision (if booked), 2=details
  const [cancelDecision, setCancelDecision] = useState('no'); // 'no' | 'yes'
  const [employeeName, setEmployeeName] = useState('');
  const [reason, setReason]             = useState('');
  const [errors, setErrors]             = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Skip step 1 for non-booked slots or day blocks
      setStep(isBooked && mode === 'slot' ? 1 : 2);
      setCancelDecision('no');
      setEmployeeName(''); setReason(''); setErrors({});
    }
  }, [isOpen, isBooked, mode]);

  useEffect(() => {
    if (isOpen && step === 2) setTimeout(() => firstInputRef.current?.focus(), 100);
  }, [isOpen, step]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const validate = () => {
    const e = {};
    if (!employeeName.trim()) e.employeeName = 'Employee name is required';
    if (!reason.trim())       e.reason       = 'Reason is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleContinue = () => {
    if (cancelDecision === 'yes') setStep(2); // go to confirm cancel details
    else setStep(2);                           // go to block only details
  };

  const handleConfirm = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      if (cancelDecision === 'yes' && slot?.booking) {
        await onCancelMeeting(slot.booking.id, employeeName.trim(), reason.trim());
      } else {
        await onConfirm(employeeName.trim(), reason.trim());
      }
      onClose();
    } catch {
      setErrors({ _global: 'Operation failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const title    = mode === 'day' ? 'Block Entire Day' : 'Block Slot';
  const subtitle = mode === 'day'
    ? formatDateDisplay(date)
    : `${formatDateDisplay(date)} at ${formatTimeDisplay(slotTime)}`;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-labelledby="block-modal-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-[modalPop_0.2s_ease-out]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-orange-50 rounded-xl flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h2 id="block-modal-title" className="text-base font-bold text-[#011539]">{title}</h2>
              <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
            </div>
          </div>
          <button type="button" onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Close modal">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* ── Step 1: Cancel decision (booked slots only) ──────────────────── */}
        {step === 1 && (
          <div className="px-6 py-5 space-y-4">
            {slot?.booking && (
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Existing Booking</p>
                <p className="text-sm font-semibold text-[#011539]">{slot.booking.name}</p>
                <p className="text-xs text-gray-400">{slot.booking.company}</p>
              </div>
            )}

            <p className="text-sm text-gray-700 font-medium">Do you want to cancel the existing meeting?</p>

            <div className="space-y-2.5">
              {[
                { val: 'no',  label: 'No — just block (meeting stays booked)' },
                { val: 'yes', label: 'Yes — cancel meeting and free the slot' },
              ].map(({ val, label }) => (
                <label key={val} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio" name="cancel-decision" value={val}
                    checked={cancelDecision === val}
                    onChange={() => setCancelDecision(val)}
                    className="w-4 h-4 accent-[#017119]"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-[#011539]">{label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                Back
              </button>
              <button type="button" onClick={handleContinue}
                className="flex-1 px-4 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-all">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Employee name + reason ──────────────────────────────── */}
        {step === 2 && (
          <div className="px-6 py-5 space-y-4">
            {cancelDecision === 'yes' && (
              <div className="bg-red-50 rounded-xl px-4 py-3">
                <p className="text-xs font-semibold text-red-600">⚠ This will cancel the existing meeting and notify the customer.</p>
              </div>
            )}

            {/* Employee Name */}
            <div>
              <label htmlFor="emp-name-block" className="text-sm font-semibold text-[#011539] block mb-1.5">
                Employee Name <span className="text-red-500">*</span>
              </label>
              <input
                id="emp-name-block" ref={firstInputRef} type="text"
                value={employeeName}
                onChange={(e) => { setEmployeeName(e.target.value); setErrors(p => ({ ...p, employeeName: '' })); }}
                placeholder="Who is performing this action?"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors
                  ${errors.employeeName ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`}
              />
              {errors.employeeName && <p className="text-xs text-red-600 mt-1">{errors.employeeName}</p>}
            </div>

            {/* Reason */}
            <div>
              <label htmlFor="reason-block" className="text-sm font-semibold text-[#011539] block mb-1.5">
                Reason <span className="text-red-500">*</span>
              </label>
              <input
                id="reason-block" type="text"
                value={reason}
                onChange={(e) => { setReason(e.target.value); setErrors(p => ({ ...p, reason: '' })); }}
                placeholder="e.g. System maintenance, Meeting with client"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors
                  ${errors.reason ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`}
              />
              {errors.reason && <p className="text-xs text-red-600 mt-1">{errors.reason}</p>}
            </div>

            {errors._global && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{errors._global}</p>}

            <div className="flex gap-3 pt-2">
              {isBooked && mode === 'slot' ? (
                <button type="button" onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                  Back
                </button>
              ) : (
                <button type="button" onClick={onClose} disabled={isSubmitting}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                  Cancel
                </button>
              )}
              <button type="button" onClick={handleConfirm} disabled={isSubmitting}
                className={`flex-1 px-4 py-3 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-60
                  ${cancelDecision === 'yes' ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'}`}>
                {isSubmitting ? 'Processing…' : cancelDecision === 'yes' ? 'Confirm Cancel' : 'Confirm Block'}
              </button>
            </div>
          </div>
        )}

      </div>
      <style>{ANIM}</style>
    </div>
  );
}
