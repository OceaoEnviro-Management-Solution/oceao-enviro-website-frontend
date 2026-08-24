// GallerySidebar.jsx — Left sidebar with expandable categories and subsection links
// Pattern mirrors AccreditationsSidebar (sticky, mobile-collapsible)

import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { galleryCategories } from '../../constants/gallery';

// Color maps for active subsection highlight
const activeColorMap = {
  blue:   { bg: 'bg-[#EAEBF7]', text: 'text-[#0F1D75]', border: 'border-[#0F1D75]' },
  orange: { bg: 'bg-[#FFE7B8]', text: 'text-[#E69500]', border: 'border-[#FFA500]' },
  green:  { bg: 'bg-[#E4F3E6]', text: 'text-[#017119]', border: 'border-[#017119]' },
};

export default function GallerySidebar({ activeId, onScrollTo }) {
  const [mobileOpen, setMobileOpen]   = useState(false);
  // Track which categories are expanded; default all open
  const [expanded, setExpanded]       = useState(
    () => Object.fromEntries(galleryCategories.map((c) => [c.id, true]))
  );

  const toggleCategory = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleClick = (id) => {
    onScrollTo(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Mobile toggle button ──────────────────────────────────────────── */}
      <div className="md:hidden sticky top-[80px] z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <span className="font-semibold text-[#0F1D75]">Browse Gallery</span>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          aria-label={mobileOpen ? 'Close category menu' : 'Open category menu'}
        >
          {mobileOpen ? <X size={20} /> : <SlidersHorizontal size={18} />}
        </button>
      </div>

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside
        className={`
          ${mobileOpen ? 'block' : 'hidden'}
          md:block
          fixed md:sticky
          top-[122px] md:top-[120px]
          left-0 md:left-auto
          w-full md:w-[280px] lg:w-[300px]
          h-auto md:h-[calc(100vh-120px)]
          bg-white md:bg-transparent
          z-30 md:z-auto
          border-b md:border-b-0 md:border-r border-gray-200
          overflow-y-auto
          pb-6 md:pb-0
          shadow-md md:shadow-none
          flex-shrink-0
        `}
      >
        <div className="p-4 md:pr-6 space-y-1">

          {/* ALL — scrolls to top of page */}
          <button
            onClick={() => handleClick('gallery-top')}
            className={`
              w-full text-left px-4 py-3 rounded-md font-bold text-sm transition-all duration-200
              ${activeId === 'gallery-top'
                ? 'bg-[#E4F3E6] border-l-4 border-[#017119] text-[#017119]'
                : 'border-l-4 border-transparent text-[#0F1D75] hover:bg-[#EAEBF7]'}
            `}
          >
            ALL
          </button>

          {/* Categories */}
          {galleryCategories.map((cat) => {
            const colors = activeColorMap[cat.color] ?? activeColorMap.blue;
            const isExpanded = expanded[cat.id];
            const hasSubsections = cat.subsections.some((s) => s.name);

            return (
              <div key={cat.id}>
                {/* Category row */}
                <div className="flex items-center">
                  <button
                    onClick={() => handleClick(cat.id)}
                    className={`
                      flex-1 text-left px-4 py-3 rounded-l-md font-bold text-sm transition-all duration-200
                      ${activeId === cat.id
                        ? `${colors.bg} border-l-4 ${colors.border} ${colors.text}`
                        : 'border-l-4 border-transparent text-[#0F1D75] hover:bg-[#EAEBF7]'}
                    `}
                  >
                    {cat.name}
                    <span className="ml-1 text-xs font-normal opacity-60">
                      ({cat.totalImages})
                    </span>
                  </button>

                  {/* Expand/collapse arrow — only if has named subsections */}
                  {hasSubsections && (
                    <button
                      onClick={() => toggleCategory(cat.id)}
                      aria-expanded={isExpanded}
                      aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${cat.name}`}
                      className="px-2 py-3 text-gray-400 hover:text-[#0F1D75] transition-colors"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isExpanded ? 'rotate-0' : '-rotate-90'}`}
                      />
                    </button>
                  )}
                </div>

                {/* Subsections */}
                {hasSubsections && isExpanded && (
                  <div className="ml-4 border-l border-gray-100 pl-2 space-y-0.5 mt-0.5">
                    {cat.subsections
                      .filter((sub) => sub.name)
                      .map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleClick(sub.id)}
                          className={`
                            w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200
                            ${activeId === sub.id
                              ? `${colors.bg} ${colors.text} font-semibold`
                              : 'text-gray-600 hover:bg-gray-50'}
                          `}
                        >
                          {sub.name}
                          <span className="ml-1 text-xs opacity-50">
                            {sub.imageCount > 0 ? `(${sub.imageCount})` : ''}
                          </span>
                        </button>
                      ))}
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
