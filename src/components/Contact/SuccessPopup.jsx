// SuccessPopup.jsx — Success modal after form submission
// Portal-rendered (like LightboxViewer) — appended directly to document.body
// so it sits above all stacking contexts (navbar, etc.).
// Dismissible via: X button, backdrop click, Escape key.
// On close: calls onClose() which triggers form reset in parent.

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle2 } from 'lucide-react';

export default function SuccessPopup({ isOpen, onClose }) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Submission successful"
    >
      {/* Modal panel — stop click propagation */}
      <div
        className="relative w-full max-w-sm bg-[#E4F3E6] border-2 border-[#017119] rounded-2xl p-8
                   shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300
                   flex flex-col items-center text-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center
                     text-gray-400 hover:text-[#017119] hover:bg-[#017119]/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Checkmark icon */}
        <div className="w-16 h-16 rounded-full bg-[#017119]/10 flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9 text-[#017119]" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-[#017119]">Thank You!</h2>

        {/* Message */}
        <p className="text-base text-[#011539] font-medium leading-relaxed">
          Thank you! We'll be in touch.
        </p>

        {/* Subtext */}
        <p className="text-sm text-[#011539]/60 leading-relaxed">
          We've received your message and will respond shortly.
        </p>

        {/* Dismiss button */}
        <button
          onClick={onClose}
          className="mt-2 px-6 py-2.5 bg-[#017119] text-white text-sm font-bold rounded-lg
                     hover:bg-[#015a14] active:scale-[0.98] transition-all duration-200 shadow-sm"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}
