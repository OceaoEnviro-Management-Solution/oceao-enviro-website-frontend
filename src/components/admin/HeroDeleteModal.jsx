// HeroDeleteModal.jsx — Asks for confirmation before a hero slide is deleted.
// Deleting removes the slide from the website AND its photo from Cloudinary for good, so the
// warning says so. Asks for the employee name (prefilled from sessionStorage "oe_admin_name"),
// which goes to the activity log. A failed request shows the backend's message here.
// Props: isOpen, slide, onClose, onDeleted() called after a successful delete

import { useState, useEffect } from 'react';
import { X, AlertTriangle, RefreshCw } from 'lucide-react';
import { deleteSlide } from '../../services/heroAdminApi';
import { getStoredAdminName, saveAdminName } from '../../utils/adminName';
import { validateEmployeeName } from '../../utils/validation';
import { thumbnailUrl } from '../../utils/heroForm';

const ANIM = `@keyframes modalPop { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;

function DeleteDialog({ slide, onClose, onDeleted }) {
  const [employeeName, setEmployeeName] = useState(getStoredAdminName());
  const [error, setError]               = useState('');
  const [nameError, setNameError]       = useState('');
  const [busy, setBusy]                 = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && !busy) onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose, busy]);

  const handleDelete = async () => {
    const problem = validateEmployeeName(employeeName);
    if (problem) { setNameError(problem); return; }

    saveAdminName(employeeName);
    setBusy(true);
    setError('');
    try {
      await deleteSlide(slide.id, employeeName.trim());
      onDeleted();
      onClose();
    } catch (failure) {
      const fromField = failure?.code === 'VALIDATION_FAILED' ? failure.fieldErrors?.performedBy : null;
      if (fromField) setNameError(Array.isArray(fromField) ? fromField[0] : String(fromField));
      else setError(failure?.message || 'Something went wrong. Please try again.');
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget && !busy) onClose(); }}
      role="dialog" aria-modal="true" aria-labelledby="hero-delete-title"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-[modalPop_0.2s_ease-out]">

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 id="hero-delete-title" className="text-base font-bold text-[#011539]">Delete this slide?</h2>
          </div>
          <button type="button" onClick={onClose} disabled={busy}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors disabled:opacity-40"
            aria-label="Close modal">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
            <img src={thumbnailUrl(slide.imageUrl)} alt="" className="h-14 w-20 shrink-0 rounded-lg object-cover" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[#011539]">{slide.name}</p>
              <p className="truncate text-xs text-gray-500">{slide.location}</p>
            </div>
          </div>

          <p className="text-sm font-medium text-red-700">This also deletes the photo permanently.</p>

          <div>
            <label htmlFor="hero-delete-employee" className="text-sm font-semibold text-[#011539] block mb-1.5">
              Employee Name <span className="text-red-500">*</span>
            </label>
            <input id="hero-delete-employee" type="text" value={employeeName} disabled={busy} autoComplete="name"
              onChange={(e) => { setEmployeeName(e.target.value); setNameError(''); setError(''); }}
              placeholder="Your full name"
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors disabled:bg-gray-50
                ${nameError ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`} />
            {nameError && <p className="text-xs text-red-600 mt-1">{nameError}</p>}
          </div>

          {error && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">{error}</p>}
        </div>

        <div className="flex gap-3 px-6 pb-6">
          <button type="button" onClick={onClose} disabled={busy}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all disabled:opacity-40">
            Keep it
          </button>
          <button type="button" onClick={handleDelete} disabled={busy}
            className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
            {busy && <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />}
            {busy ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
      <style>{ANIM}</style>
    </div>
  );
}

export default function HeroDeleteModal({ isOpen, slide, ...props }) {
  if (!isOpen || !slide) return null;
  return <DeleteDialog slide={slide} {...props} />;
}
