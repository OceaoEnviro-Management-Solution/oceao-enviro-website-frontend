// WaterResourceManagement.jsx — /services/water-resource-management
// 3 service items with accordion cards

import { getCategoryBySlug, getOtherCategories } from '../../constants/services';
import ServicesList from '../../components/services/ServicesList';
import ServiceCTA from '../../components/services/ServiceCTA';
import ExploreOtherServices from '../../components/services/ExploreOtherServices';
import ServiceDetailHero from '../../components/services/ServiceDetailHero';

const SLUG = 'water-resource-management';

export default function WaterResourceManagement() {
  const category = getCategoryBySlug(SLUG);
  const otherCategories = getOtherCategories(SLUG);

  if (!category) return <div className="p-8 text-center text-gray-500">Service not found.</div>;

  return (
    <main className="w-full bg-white">

      {/* ── Hero ── */}
      <ServiceDetailHero category={category} />

      {/* ── Intro ── */}
      <section aria-label="Service introduction" className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 leading-relaxed text-lg">{category.intro}</p>
        </div>
      </section>

      {/* ── Accordion list ── */}
      <section aria-label="Our water resource services" className="py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#017119] mb-2">
              {category.hero.eyebrow}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75]">
              Our {category.name}
            </h2>
          </div>

          <ServicesList items={category.items} />
        </div>
      </section>

      {/* ── Explore other services ── */}
      <ExploreOtherServices otherCategories={otherCategories} showLabCard />

      {/* ── CTA ── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServiceCTA categoryName={category.name} />
      </section>

    </main>
  );
}
