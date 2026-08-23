// ContactCard.jsx — Reusable info card for Tab 1 (General Contact)
// Color-coded left border accent per card type.
// Includes clipboard copy with 2-second inline toast notification.

import { useState } from 'react';

export default function ContactCard({ icon: Icon, title, accentColor, children }) {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-300"
      style={{ borderLeft: `4px solid ${accentColor}` }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accentColor}18` }}
        >
          <Icon className="w-6 h-6" style={{ color: accentColor }} />
        </div>
        <h3 className="text-base font-bold text-[#011539]">{title}</h3>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

/** Single contact row inside a card: label + value + action buttons */
export function ContactRow({ label, value, buttons }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          {label}
        </span>
      )}
      <span className="text-sm font-semibold text-[#0F1D75]">{value}</span>
      {buttons && (
        <div className="flex flex-wrap gap-2 mt-0.5">
          {buttons}
        </div>
      )}
    </div>
  );
}

/** Primary action button (green) */
export function PrimaryBtn({ href, onClick, children }) {
  const cls = `
    inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold
    bg-[#017119] text-white hover:bg-[#015a14] active:scale-[0.98]
    transition-all duration-200 shadow-sm hover:shadow
  `;
  if (href) {
    return <a href={href} className={cls}>{children}</a>;
  }
  return <button type="button" onClick={onClick} className={cls}>{children}</button>;
}

/** Secondary copy button (blue outline) with 2-second toast */
export function CopyBtn({ textToCopy, toastLabel = 'Copied!' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement('textarea');
      el.value = textToCopy;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`
        inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold
        border transition-all duration-200 active:scale-[0.98]
        ${copied
          ? 'border-[#017119] text-[#017119] bg-[#E4F3E6]'
          : 'border-[#0F1D75] text-[#0F1D75] hover:bg-[#0F1D75]/5'
        }
      `}
    >
      {copied ? '✓ ' + toastLabel : '⎘ Copy'}
    </button>
  );
}
