// CancelMeetingModal.jsx — Modal for canceling a VM meeting.
// Shows booking details (name, date, time) and asks for employee name + reason.
// On confirm: calls onConfirm(bookingId, employeeName, reason).
// Props: isOpen, booking (full booking object), date, slotTime, onClose, onConfirm

import { useState, useEffect, useRef } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { formatDateDisplay, formatTimeDisplay } from '../../utils/validation';

const ANIM = `@keyframes modalPop { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;

export default function CancelMeetingModal({ isOpen, booking, date, slotTime, onClose, onConfirm }) {
  const [employeeName, setEmployeeName] = useState('');
  const [reason, setReason]             = useState('');
  const [errors, setErrors]             = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setEmployeeName(''); setReason(''); setErrors({});
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

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

  const handleConfirm = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await onConfirm(booking?.id, employeeName.trim(), reason.trim());
      onClose();
    } catch {
      setErrors({ _global: 'Failed to cancel meeting. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-labelledby="cancel-meeting-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-[modalPop_0.2s_ease-out]">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <h2 id="cancel-meeting-title" className="text-base font-bold text-[#011539]">Cancel Meeting</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {formatDateDisplay(date)} at {formatTimeDisplay(slotTime)}
              </p>
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

          {/* Booking details */}
          {booking && (
            <div className="bg-gray-50 rounded-xl p-4 space-y-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Meeting to Cancel</p>
              <p className="text-sm font-semibold text-[#011539]">{booking.name}</p>
              {booking.company && <p className="text-xs text-gray-400">{booking.company}</p>}
              {booking.email   && <p className="text-xs text-gray-400">{booking.email}</p>}
            </div>
          )}

          <div className="bg-amber-50 rounded-xl px-4 py-3">
            <p className="text-xs text-amber-700 font-medium">
              ⚠ The customer will be notified about this cancellation (Phase 2 — email integration).
            </p>
          </div>

          {/* Employee Name */}
          <div>
            <label htmlFor="cancel-emp-name" className="text-sm font-semibold text-[#011539] block mb-1.5">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <input
              id="cancel-emp-name" ref={firstInputRef} type="text"
              value={employeeName}
              onChange={(e) => { setEmployeeName(e.target.value); setErrors(p => ({ ...p, employeeName: '' })); }}
              placeholder="Who is canceling this meeting?"
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors
                ${errors.employeeName ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`}
            />
            {errors.employeeName && <p className="text-xs text-red-600 mt-1">{errors.employeeName}</p>}
          </div>

          {/* Reason */}
          <div>
            <label htmlFor="cancel-reason" className="text-sm font-semibold text-[#011539] block mb-1.5">
              Reason for Cancellation <span className="text-red-500">*</span>
            </label>
            <input
              id="cancel-reason" type="text"
              value={reason}
              onChange={(e) => { setReason(e.target.value); setErrors(p => ({ ...p, reason: '' })); }}
              placeholder="e.g. Customer requested reschedule"
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors
                ${errors.reason ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`}
            />
            {errors.reason && <p className="text-xs text-red-600 mt-1">{errors.reason}</p>}
          </div>

          {errors._global && <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{errors._global}</p>}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button type="button" onClick={onClose} disabled={isSubmitting}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
            Back
          </button>
          <button type="button" onClick={handleConfirm} disabled={isSubmitting}
            className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 active:scale-[0.98] transition-all disabled:opacity-60">
            {isSubmitting ? 'Canceling…' : 'Confirm Cancel'}
          </button>
        </div>

      </div>
      <style>{ANIM}</style>
    </div>
  );
}
