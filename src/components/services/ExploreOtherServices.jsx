// ExploreOtherServices.jsx — Bottom "Explore Other Services" navigation
// Shows the sibling service categories + optional Lab Services card as clickable cards

import { Link } from 'react-router-dom';
import { ChevronRight, FlaskConical } from 'lucide-react';

export default function ExploreOtherServices({ otherCategories, showLabCard = false }) {
  const totalCols = otherCategories.length + (showLabCard ? 1 : 0);
  const gridClass =
    totalCols <= 3 ? 'grid md:grid-cols-3 gap-5' :
    totalCols === 4 ? 'grid md:grid-cols-4 gap-5' :
    'grid md:grid-cols-3 lg:grid-cols-5 gap-5';

  return (
    <section aria-label="Explore other services" className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[#017119] mb-2">
            Keep Exploring
          </p>
          <h3 className="text-2xl md:text-3xl font-bold text-[#0F1D75]">
            Explore Other Services
          </h3>
        </div>

        {/* Cards grid */}
        <div className={gridClass}>
          {otherCategories.map((category) => (
            <Link
              key={category.id}
              to={`/services/${category.slug}`}
              id={`explore-${category.slug}`}
              className="group flex flex-col justify-between p-6 bg-white border border-gray-200 rounded-2xl hover:border-[#017119] hover:shadow-lg transition-all duration-200"
            >
              <div>
                <h4 className="text-base font-semibold text-[#0F1D75] group-hover:text-[#017119] transition-colors mb-2 pr-4">
                  {category.name}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#017119] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Explore
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}

          {/* Laboratory Services card */}
          {showLabCard && (
            <Link
              to="/services/laboratory-services"
              id="explore-laboratory-services"
              className="group flex flex-col justify-between p-6 bg-white border border-[#017119]/20 rounded-2xl hover:border-[#017119] hover:shadow-lg transition-all duration-200 relative overflow-hidden"
            >
              {/* Subtle accent badge */}
              <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest text-[#017119] bg-[#017119]/10 px-2 py-0.5 rounded-full">
                NABL Accredited
              </span>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FlaskConical className="w-5 h-5 text-[#017119] shrink-0" />
                  <h4 className="text-base font-semibold text-[#0F1D75] group-hover:text-[#017119] transition-colors pr-4">
                    Laboratory Services
                  </h4>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  NABL-accredited testing for air, water, soil &amp; noise — accurate, compliant results for every industry.
                </p>
              </div>

              <div className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#017119] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Explore
                <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
