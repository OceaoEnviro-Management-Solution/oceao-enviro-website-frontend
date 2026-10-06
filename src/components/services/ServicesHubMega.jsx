// ServicesHubMega.jsx — Full interactive mega panel for the /services hub page
// Left sidebar: 5 category buttons (4 service categories + Laboratory Services; active = brand-green)
// Right: 3-column grid of clickable service cards for the active category + Explore link
// Laboratory Services is grouped into Air / Water / Soil / Noise sections

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { SERVICE_CATEGORIES } from '../../constants/services';
import { LAB_SERVICES_DATA } from '../../constants/labServices';

const LAB_CATEGORY = {
  id: 'laboratory-services',
  name: 'Laboratory Services',
  slug: 'laboratory-services',
  intro:
    'Our Laboratory Services provide comprehensive testing and analysis across air quality, water quality, soil conditions, and noise levels. We deliver accurate, reliable results to support environmental compliance, occupational health standards, and project requirements.',
  isLab: true,
};

const CATEGORIES = [...SERVICE_CATEGORIES, LAB_CATEGORY];

const GRID_CLASSES = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3';

// Clickable card — goes to the category's service page
function ServiceItemCard({ item, slug }) {
  return (
    <Link
      to={`/services/${slug}`}
      className="flex items-start gap-3 p-3.5 bg-[#F8FAF8] border border-gray-100 rounded-xl hover:border-[#017119]/30 hover:bg-[#E4F3E6]/30 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#017119]"
    >
      <span className="shrink-0 text-xs font-bold text-[#017119] bg-[#E4F3E6] px-2 py-0.5 rounded-full mt-0.5">
        {item.number}
      </span>
      <p className="text-sm font-medium text-[#0F1D75] leading-snug">
        {item.title}
      </p>
    </Link>
  );
}

export default function ServicesHubMega() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);

  const activeCategory = CATEGORIES.find((cat) => cat.id === activeId);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex flex-col lg:flex-row min-h-[440px]">

        {/* ── Left sidebar — category list ── */}
        <aside className="lg:w-72 shrink-0 bg-[#F8FAF8] border-b lg:border-b-0 lg:border-r border-gray-200 p-4">
          <p className="text-xs font-bold uppercase tracking-widest text-[#017119] px-3 py-2 mb-2">
            Service Categories
          </p>
          <nav aria-label="Service categories" className="flex flex-col gap-1">
            {CATEGORIES.map((category) => {
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

            {activeCategory.isLab ? (
              <div className="flex flex-col gap-6 mb-6">
                {Object.values(LAB_SERVICES_DATA).map((group) => (
                  <div key={group.id}>
                    <h4 className="flex items-center gap-2 text-sm font-bold text-[#017119] mb-3">
                      <span aria-hidden="true">{group.icon}</span>
                      {group.name}
                      <span className="text-xs font-semibold text-gray-400">
                        ({group.items.length} tests)
                      </span>
                    </h4>
                    <div className={GRID_CLASSES}>
                      {group.items.map((item) => (
                        <ServiceItemCard key={item.id} item={item} slug={activeCategory.slug} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`${GRID_CLASSES} mb-6`}>
                {activeCategory.items.map((item) => (
                  <ServiceItemCard key={item.id} item={item} slug={activeCategory.slug} />
                ))}
              </div>
            )}

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
