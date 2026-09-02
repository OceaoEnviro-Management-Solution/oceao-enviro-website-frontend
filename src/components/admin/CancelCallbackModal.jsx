// CancelCallbackModal.jsx — 3-step modal for canceling callback bookings.
// Step 1: "Cancel specific callbacks" or "Keep all (just block)"
// Step 2: Checkbox list of people booked in the slot (only if step 1 chose cancel)
// Step 3: Employee name + reason → confirm
// Props: isOpen, slot (key: 'morning'|'afternoon'|'evening'), date, bookings (array),
//        onClose, onConfirm (selectedIds, employeeName, reason)

import { useState, useEffect, useRef } from 'react';
import { X, PhoneCall } from 'lucide-react';
import { formatDateDisplay } from '../../utils/validation';
import { CALLBACK_SLOTS } from '../../constants/mockData';

const ANIM = `@keyframes modalPop { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;

export default function CancelCallbackModal({ isOpen, slot, date, bookings = [], onClose, onConfirm }) {
  const [step, setStep]                     = useState(1);
  const [cancelDecision, setCancelDecision] = useState('keep'); // 'keep' | 'cancel'
  const [selectedIds, setSelectedIds]       = useState(new Set());
  const [employeeName, setEmployeeName]     = useState('');
  const [reason, setReason]                 = useState('');
  const [errors, setErrors]                 = useState({});
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1); setCancelDecision('keep'); setSelectedIds(new Set());
      setEmployeeName(''); setReason(''); setErrors({});
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && step === 3) setTimeout(() => firstInputRef.current?.focus(), 100);
  }, [isOpen, step]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slotConfig = CALLBACK_SLOTS[slot] || { label: slot, timeRange: '' };

  function toggleId(id) {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }
  function selectAll() { setSelectedIds(new Set(bookings.map(b => b.id))); }
  function deselectAll() { setSelectedIds(new Set()); }

  function validateStep3() {
    const e = {};
    if (!employeeName.trim()) e.employeeName = 'Employee name is required';
    if (!reason.trim())       e.reason       = 'Reason is required';
    setErrors(e);
    return !Object.keys(e).length;
  }

  const handleConfirm = async () => {
    if (!validateStep3()) return;
    setIsSubmitting(true);
    try {
      const ids = cancelDecision === 'cancel' ? [...selectedIds] : [];
      await onConfirm(ids, employeeName.trim(), reason.trim());
      onClose();
    } catch {
      setErrors({ _global: 'Operation failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const titleMap = {
    1: 'Block Callback Slot',
    2: 'Select Callbacks to Cancel',
    3: cancelDecision === 'cancel' ? 'Confirm Cancellation' : 'Confirm Block',
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-labelledby="cancel-cb-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-[modalPop_0.2s_ease-out]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#EAEBF7] rounded-xl flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-[#0F1D75]" />
            </div>
            <div>
              <h2 id="cancel-cb-title" className="text-base font-bold text-[#011539]">{titleMap[step]}</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {slotConfig.label} — {formatDateDisplay(date)}
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors" aria-label="Close">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* ── Step 1: Cancel decision ─────────────────────────────────────── */}
        {step === 1 && (
          <div className="px-6 py-5 space-y-4">
            {bookings.length > 0 && (
              <div className="bg-amber-50 rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-amber-800">
                  ⚠ {bookings.length} callback{bookings.length > 1 ? 's are' : ' is'} booked for this slot.
                </p>
              </div>
            )}

            <p className="text-sm font-medium text-gray-700">What would you like to do?</p>

            {[
              { val: 'keep',   label: 'Keep all bookings (just block future ones)' },
              { val: 'cancel', label: 'Cancel specific callbacks' },
            ].map(({ val, label }) => (
              <label key={val} className="flex items-center gap-3 cursor-pointer group">
                <input type="radio" name="cb-decision" value={val}
                  checked={cancelDecision === val}
                  onChange={() => setCancelDecision(val)}
                  className="w-4 h-4 accent-[#017119]" />
                <span className="text-sm text-gray-700 group-hover:text-[#011539]">{label}</span>
              </label>
            ))}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                Back
              </button>
              <button type="button"
                onClick={() => cancelDecision === 'cancel' ? setStep(2) : setStep(3)}
                className="flex-1 px-4 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-all">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2: Select callbacks to cancel ─────────────────────────── */}
        {step === 2 && (
          <div className="px-6 py-5 space-y-4">
            <div className="flex gap-2">
              <button type="button" onClick={selectAll}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                Select All
              </button>
              <button type="button" onClick={deselectAll}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                Deselect All
              </button>
            </div>

            <div className="max-h-52 overflow-y-auto space-y-2 border border-gray-100 rounded-xl p-3">
              {bookings.map(b => (
                <label key={b.id} className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1.5">
                  <input type="checkbox"
                    checked={selectedIds.has(b.id)}
                    onChange={() => toggleId(b.id)}
                    className="w-4 h-4 accent-[#017119] rounded" />
                  <div>
                    <p className="text-sm font-medium text-[#011539]">{b.name}</p>
                    <p className="text-xs text-gray-400">{b.phone} · {b.company}</p>
                  </div>
                </label>
              ))}
            </div>

            {selectedIds.size > 0 && (
              <p className="text-xs text-gray-500">{selectedIds.size} selected for cancellation</p>
            )}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(1)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                Back
              </button>
              <button type="button"
                disabled={selectedIds.size === 0}
                onClick={() => setStep(3)}
                className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all disabled:opacity-50">
                Continue ({selectedIds.size} selected)
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Employee name + reason ─────────────────────────────── */}
        {step === 3 && (
          <div className="px-6 py-5 space-y-4">
            {cancelDecision === 'cancel' && selectedIds.size > 0 && (
              <div className="bg-red-50 rounded-xl px-4 py-3">
                <p className="text-xs text-red-700 font-semibold">
                  ⚠ You are canceling {selectedIds.size} callback{selectedIds.size > 1 ? 's' : ''}.
                </p>
              </div>
            )}

            <div>
              <label htmlFor="cb-emp-name" className="text-sm font-semibold text-[#011539] block mb-1.5">
                Employee Name <span className="text-red-500">*</span>
              </label>
              <input id="cb-emp-name" ref={firstInputRef} type="text"
                value={employeeName}
                onChange={(e) => { setEmployeeName(e.target.value); setErrors(p => ({ ...p, employeeName: '' })); }}
                placeholder="Who is performing this action?"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors
                  ${errors.employeeName ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`} />
              {errors.employeeName && <p className="text-xs text-red-600 mt-1">{errors.employeeName}</p>}
            </div>

            <div>
              <label htmlFor="cb-reason" className="text-sm font-semibold text-[#011539] block mb-1.5">
                Reason <span className="text-red-500">*</span>
              </label>
              <input id="cb-reason" type="text"
                value={reason}
                onChange={(e) => { setReason(e.target.value); setErrors(p => ({ ...p, reason: '' })); }}
                placeholder="e.g. Holiday, Staff unavailable"
                className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors
                  ${errors.reason ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`} />
              {errors.reason && <p className="text-xs text-red-600 mt-1">{errors.reason}</p>}
            </div>

            {errors._global && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{errors._global}</p>}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(cancelDecision === 'cancel' ? 2 : 1)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
                Back
              </button>
              <button type="button" onClick={handleConfirm} disabled={isSubmitting}
                className={`flex-1 px-4 py-3 rounded-xl text-white text-sm font-semibold transition-all disabled:opacity-60
                  ${cancelDecision === 'cancel' ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'}`}>
                {isSubmitting ? 'Processing…' : 'Confirm'}
              </button>
            </div>
          </div>
        )}

      </div>
      <style>{ANIM}</style>
    </div>
  );
}
