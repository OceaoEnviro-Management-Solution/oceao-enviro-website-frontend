// LabCategoryNav.jsx — Left sidebar / mobile tab row for lab service categories
// Desktop: vertical stack of buttons
// Mobile (<md): horizontal scrollable tab row (Option B)

import { ChevronRight } from 'lucide-react';

export default function LabCategoryNav({ categories, activeCategory, onSelectCategory }) {
  return (
    <>
      {/* ── Mobile: horizontal scrollable tabs ─────────────────────────────── */}
      <div className="md:hidden flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              id={`lab-tab-mobile-${category.id}`}
              onClick={() => onSelectCategory(category.id)}
              aria-selected={isActive}
              role="tab"
              className={`shrink-0 snap-start flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                isActive
                  ? 'bg-[#017119] text-white shadow-sm'
                  : 'bg-white border border-gray-200 text-[#0F1D75] hover:border-[#017119] hover:text-[#017119]'
              }`}
            >
              <span aria-hidden="true">{category.icon}</span>
              {category.name}
            </button>
          );
        })}
      </div>

      {/* ── Desktop: vertical sidebar stack ────────────────────────────────── */}
      <nav
        aria-label="Laboratory service categories"
        className="hidden md:flex flex-col gap-2"
      >
        <p className="text-xs font-bold uppercase tracking-widest text-[#017119] px-3 py-1 mb-1">
          Categories
        </p>
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              id={`lab-tab-${category.id}`}
              onClick={() => onSelectCategory(category.id)}
              aria-selected={isActive}
              role="tab"
              className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center justify-between group ${
                isActive
                  ? 'bg-[#017119] text-white shadow-sm'
                  : 'bg-[#F8FAF8] text-[#0F1D75] hover:bg-[#E4F3E6] hover:text-[#017119]'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span aria-hidden="true" className="text-base">{category.icon}</span>
                {category.name}
              </span>
              <ChevronRight
                className={`w-4 h-4 shrink-0 transition-all duration-150 ${
                  isActive
                    ? 'opacity-70'
                    : 'opacity-0 group-hover:opacity-50 -translate-x-1 group-hover:translate-x-0'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
