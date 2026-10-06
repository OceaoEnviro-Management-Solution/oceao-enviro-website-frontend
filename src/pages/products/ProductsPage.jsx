// ProductsPage.jsx — /products
// Layout: Hero → Intro → Category filter + product grid → Inquiry CTA

import { useState } from 'react';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../../constants/products';
import ServiceDetailHero from '../../components/services/ServiceDetailHero';
import ProductCard from '../../components/products/ProductCard';
import ProductCTA from '../../components/products/ProductCTA';

const PRODUCTS_HERO = {
  hero: {
    eyebrow: 'Our Products',
    title: 'Our Products',
    subtitle: 'High-Quality Environmental Monitoring & Sustainability Solutions',
  },
};

const INTRO =
  'Our carefully selected range of environmental monitoring and sustainability products are designed to support accurate data collection, effective site management, and sustainable operations. From air and water quality monitoring to renewable energy solutions, we provide reliable tools for environmental excellence.';

const FILTERS = ['All', ...PRODUCT_CATEGORIES];

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const visibleProducts =
    activeFilter === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.category === activeFilter);

  return (
    <main className="w-full bg-white">

      <ServiceDetailHero category={PRODUCTS_HERO} />

      {/* ── Intro ── */}
      <section aria-label="Products introduction" className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-700 leading-relaxed text-lg">{INTRO}</p>
        </div>
      </section>

      {/* ── Products ── */}
      <section aria-label="All products" className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#017119] mb-2">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1D75]">Products</h2>
          </div>

          {/* Category filter */}
          <div role="group" aria-label="Filter products by category" className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  id={`product-filter-${filter.toLowerCase().replace(/[^a-z]+/g, '-')}`}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#017119] text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-[#0F1D75] hover:bg-[#E4F3E6] hover:text-[#017119]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section aria-label="Product inquiry" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCTA />
        </div>
      </section>

    </main>
  );
}
