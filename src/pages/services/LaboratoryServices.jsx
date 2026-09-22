// LaboratoryServices.jsx — /services/laboratory-services
// Layout: Hero → Intro → Two-panel (sidebar + accordion) → CTA → Explore Other Services

import { useState } from 'react';
import { getAllLabCategories, getLabCategoryById } from '../../constants/labServices';
import { getOtherCategories } from '../../constants/services';
import ServiceDetailHero from '../../components/services/ServiceDetailHero';
import ServiceCTA from '../../components/services/ServiceCTA';
import ExploreOtherServices from '../../components/services/ExploreOtherServices';
import LabCategoryNav from '../../components/services/LabCategoryNav';
import LabServicesList from '../../components/services/LabServicesList';

// Synthetic hero object — matches ServiceDetailHero's expected shape
const LAB_HERO = {
  hero: {
    title: 'Laboratory Services',
    subtitle: 'Testing & Analysis Support',
    eyebrow: 'Our Services',
  },
};

const INTRO =
  'Our Laboratory Services provide comprehensive testing and analysis across air quality, water quality, soil conditions, and noise levels. We deliver accurate, reliable results to support environmental compliance, occupational health standards, and project requirements.';

export default function LaboratoryServices() {
  const categories = getAllLabCategories();
  const [activeCategory, setActiveCategory] = useState('air');

  const currentCategory = getLabCategoryById(activeCategory);
  // 'laboratory-services' is not in SERVICE_CATEGORIES so getOtherCategories returns all 4
  const otherCategories = getOtherCategories('laboratory-services');

  return (
    <main className="w-full bg-white">

      {/* ── Hero ── */}
      <ServiceDetailHero category={LAB_HERO} />

      {/* ── Intro ── */}
      <section aria-label="Laboratory services introduction" className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 leading-relaxed text-lg">{INTRO}</p>
        </div>
      </section>

      {/* ── Two-panel layout ── */}
      <section aria-label="Laboratory service categories and tests" className="py-10 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#017119] mb-2">
              Our Services
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75]">
              Our Laboratory Services
            </h2>
          </div>

          {/* Mobile: horizontal tab row above accordion */}
          <div className="mb-5 md:hidden">
            <LabCategoryNav
              categories={categories}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
          </div>

          {/* Desktop: sidebar left + accordion right */}
          <div className="flex flex-col md:flex-row gap-6 lg:gap-8">

            {/* Left sidebar — desktop only */}
            <aside className="hidden md:block md:w-52 lg:w-60 shrink-0">
              <LabCategoryNav
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />
            </aside>

            {/* Right accordion */}
            <div className="flex-1 min-w-0">
              {/* Active category description */}
              {currentCategory && (
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {currentCategory.description}
                </p>
              )}

              {currentCategory && (
                <LabServicesList items={currentCategory.items} />
              )}
            </div>

          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceCTA categoryName="Laboratory Services" />
      </section>

      {/* ── Explore Other Services ── */}
      <ExploreOtherServices otherCategories={otherCategories} />

    </main>
  );
}
