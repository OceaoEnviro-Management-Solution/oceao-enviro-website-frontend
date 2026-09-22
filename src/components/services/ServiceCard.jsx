// ServiceCard.jsx — Individual collapsed service card row
// Shows: numbered badge + title + animated + icon
// Renders ServiceCardExpanded inline when isExpanded is true

import ServiceCardExpanded from './ServiceCardExpanded';

export default function ServiceCard({ item, isExpanded, onToggle }) {
  return (
    <div className="bg-white transition-colors">
      {/* ── Collapsed header ── */}
      <button
        id={`service-card-${item.id}`}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`service-expanded-${item.id}`}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 hover:bg-[#E4F3E6]/40 transition-colors text-left group"
      >
        {/* Number + Title */}
        <div className="flex items-center gap-5">
          <span className="shrink-0 text-xs font-bold tracking-widest text-[#017119] bg-[#E4F3E6] px-2.5 py-1 rounded-full">
            {item.number}
          </span>
          <span className="text-base md:text-lg font-semibold text-[#0F1D75] group-hover:text-[#017119] transition-colors">
            {item.title}
          </span>
        </div>

        {/* + icon — rotates 45° when expanded */}
        <span
          className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${
            isExpanded
              ? 'border-[#017119] bg-[#017119] text-white rotate-45'
              : 'border-gray-300 text-gray-400 group-hover:border-[#017119] group-hover:text-[#017119]'
          }`}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      {/* ── Expanded content ── */}
      {isExpanded && (
        <div id={`service-expanded-${item.id}`} role="region" aria-labelledby={`service-card-${item.id}`}>
          <ServiceCardExpanded item={item} />
        </div>
      )}
    </div>
  );
}
