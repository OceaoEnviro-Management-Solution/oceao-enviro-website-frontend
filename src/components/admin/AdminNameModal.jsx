// AdminNameModal.jsx — Asks which employee is making an admin change.
// The backend records the name in the activity log (performedBy, 2-60 characters).
// Shown by AdminProvider's requestName() the first time a quick action needs a name in an
// admin session; `initialName` prefills it from sessionStorage ("oe_admin_name").
// Props: isOpen, initialName, onConfirm(name), onClose()

import { useState, useEffect } from 'react';
import { X, User } from 'lucide-react';

const ANIM = `@keyframes modalPop { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;
const MIN_LENGTH = 2;
const MAX_LENGTH = 60;

// Mounted only while open, so its fields start fresh (prefilled) every time.
function NameDialog({ initialName, onConfirm, onClose }) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < MIN_LENGTH) {
      setError(`Please enter your name (at least ${MIN_LENGTH} characters).`);
      return;
    }
    if (trimmed.length > MAX_LENGTH) {
      setError(`Name cannot exceed ${MAX_LENGTH} characters.`);
      return;
    }
    onConfirm(trimmed);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-labelledby="admin-name-title"
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-[modalPop_0.2s_ease-out]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#E4F3E6] rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-[#017119]" />
            </div>
            <div>
              <h2 id="admin-name-title" className="text-base font-bold text-[#011539]">Who is making this change?</h2>
              <p className="text-xs text-gray-500 mt-0.5">Your name is saved in the activity log.</p>
            </div>
          </div>
          <button type="button" onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Close">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <label htmlFor="admin-actor-name" className="text-sm font-semibold text-[#011539] block mb-1.5">
            Employee Name <span className="text-red-500">*</span>
          </label>
          <input
            id="admin-actor-name" type="text" autoFocus
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            placeholder="Your full name"
            autoComplete="name"
            className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-colors
              ${error ? 'border-red-400 bg-red-50/30' : 'border-gray-200 focus:border-[#017119]'}`}
          />
          {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-6">
          <button type="button" onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button type="submit"
            className="flex-1 px-4 py-3 rounded-xl bg-[#017119] text-white text-sm font-semibold hover:bg-[#014D11] active:scale-[0.98] transition-all">
            Continue
          </button>
        </div>
      </form>
      <style>{ANIM}</style>
    </div>
  );
}

export default function AdminNameModal({ isOpen, initialName = '', onConfirm, onClose }) {
  if (!isOpen) return null;
  return <NameDialog initialName={initialName} onConfirm={onConfirm} onClose={onClose} />;
}
