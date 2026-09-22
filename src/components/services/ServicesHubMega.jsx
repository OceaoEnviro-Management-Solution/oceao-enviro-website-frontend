// ServicesHubMega.jsx — Full interactive mega panel for the /services hub page
// Left sidebar: 4 category buttons (active = brand-green)
// Right: 3-column grid of service items for the active category + Explore link

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../constants/services';

export default function ServicesHubMega() {
  const [activeId, setActiveId] = useState(SERVICE_CATEGORIES[0].id);

  const activeCategory = SERVICE_CATEGORIES.find((cat) => cat.id === activeId);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex flex-col lg:flex-row min-h-[440px]">

        {/* ── Left sidebar — category list ── */}
        <aside className="lg:w-72 shrink-0 bg-[#F8FAF8] border-b lg:border-b-0 lg:border-r border-gray-200 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#017119] px-3 py-2 mb-2">
            Service Categories
          </p>
          <nav aria-label="Service categories" className="flex flex-col gap-1">
            {SERVICE_CATEGORIES.map((category) => {
              const isActive = activeId === category.id;
              return (
                <button
                  key={category.id}
                  id={`hub-tab-${category.slug}`}
                  onClick={() => setActiveId(category.id)}
                  aria-selected={isActive}
                  role="tab"
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 flex items-center justify-between group ${
                    isActive
                      ? 'bg-[#017119] text-white shadow-sm'
                      : 'text-[#0F1D75] hover:bg-[#E4F3E6] hover:text-[#017119]'
                  }`}
                >
                  <span>{category.name}</span>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                      isActive ? 'opacity-80' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ── Right panel — items grid ── */}
        {activeCategory && (
          <div className="flex-1 p-6 lg:p-8" role="tabpanel">
            {/* Panel header */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-[#0F1D75] mb-1">
                {activeCategory.name}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
                {activeCategory.intro}
              </p>
            </div>

            {/* Items grid — 3 columns desktop, 2 tablet, 1 mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-6">
              {activeCategory.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3.5 bg-[#F8FAF8] border border-gray-100 rounded-xl hover:border-[#017119]/30 hover:bg-[#E4F3E6]/30 transition-all duration-150"
                >
                  <span className="shrink-0 text-xs font-bold text-[#017119] bg-[#E4F3E6] px-2 py-0.5 rounded-full mt-0.5">
                    {item.number}
                  </span>
                  <p className="text-sm font-medium text-[#0F1D75] leading-snug">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            {/* Explore link */}
            <Link
              to={`/services/${activeCategory.slug}`}
              id={`hub-explore-${activeCategory.slug}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#017119] hover:text-[#014D11] transition-colors group"
            >
              Explore all {activeCategory.name}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
