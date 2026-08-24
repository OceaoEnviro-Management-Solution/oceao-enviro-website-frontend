// ContactTabs.jsx — Tab controller for the Quick Contact page
// Mirrors CompanyProfileTabs.jsx pattern exactly:
// sticky tab bar, 200ms fade transition, accessible role="tab" attributes.
// Top offset is measured dynamically so the tab bar always sits flush
// below the sticky navbar, regardless of its exact rendered height.

import { useState, useEffect, useRef } from 'react';
import { Phone, MessageSquare, PhoneIncoming } from 'lucide-react';
import GeneralContactSection from './GeneralContactSection';
import QueryFormSection from './QueryFormSection';
import CallbackFormSection from './CallbackFormSection';

const TAB_ICONS = {
  general: Phone,
  query: MessageSquare,
  callback: PhoneIncoming,
};

const TABS = [
  { id: 'general', label: 'General / Immediate', shortLabel: 'General' },
  { id: 'query', label: 'Send Us Your Query', shortLabel: 'Query' },
  { id: 'callback', label: 'Prefer a Call? / Request a Callback', shortLabel: 'Callback' },
];

/** Returns the bottom-edge y of the tallest sticky element currently pinned at viewport top */
function getStickyHeaderBottom() {
  let maxBottom = 0;
  document.querySelectorAll('*').forEach((el) => {
    const style = window.getComputedStyle(el);
    if (style.position !== 'sticky') return;
    const rect = el.getBoundingClientRect();
    // Only elements pinned to the top (within 2px tolerance) and visible
    if (rect.top <= 2 && rect.height > 0) {
      maxBottom = Math.max(maxBottom, rect.bottom);
    }
  });
  return maxBottom;
}

export default function ContactTabs() {
  const [activeTab, setActiveTab] = useState('general');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const tabBarRef = useRef(null);

  // Dynamically pin the tab bar just below all sticky headers
  useEffect(() => {
    const applyOffset = () => {
      if (!tabBarRef.current) return;
      const height = getStickyHeaderBottom();
      // Fallback to 64px (mobile navbar h-16) if measurement returns 0
      tabBarRef.current.style.top = `${height || 64}px`;
    };

    applyOffset();
    window.addEventListener('resize', applyOffset);
    return () => window.removeEventListener('resize', applyOffset);
  }, []);

  const handleTabChange = (id) => {
    if (id === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(id);
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <div>
      {/* ── Sticky Tab Bar ──────────────────────────────────────────── */}
      {/* top is overridden via inline style after mount (dynamic measurement) */}
      <div
        ref={tabBarRef}
        className="sticky z-30 bg-white border-b border-gray-200 shadow-sm"
        style={{ top: '64px' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex" role="tablist" aria-label="Contact options">
            {TABS.map(({ id, label, shortLabel }) => {
              const isActive = id === activeTab;
              const Icon = TAB_ICONS[id];

              return (
                <button
                  key={id}
                  id={`contact-tab-${id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`contact-panel-${id}`}
                  onClick={() => handleTabChange(id)}
                  className={`
                    relative flex items-center gap-2 px-4 sm:px-5 py-4 text-xs sm:text-sm font-semibold
                    transition-all duration-200 border-b-[3px] -mb-px flex-1 sm:flex-none justify-center
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#017119] focus-visible:ring-offset-2
                    ${isActive
                      ? 'border-[#017119] text-[#017119] bg-[#E4F3E6]/40'
                      : 'border-transparent text-gray-500 hover:text-[#0F1D75] hover:border-gray-300'
                    }
                  `}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#017119]' : 'text-gray-400'}`}
                  />
                  {/* Full label on medium+, short label on mobile */}
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Tab Panels ─────────────────────────────────────────────── */}
      <div
        id={`contact-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`contact-tab-${activeTab}`}
        className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {activeTab === 'general' && <GeneralContactSection />}
        {activeTab === 'query' && <QueryFormSection />}
        {activeTab === 'callback' && <CallbackFormSection />}
      </div>
    </div>
  );
}
