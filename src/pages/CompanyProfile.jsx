// CompanyProfile.jsx — Main page for /about/Company-Profile
// Composes: Hero → Tabs (with CompanySection) → StatsCard → DirectorsGrid → Core Values → CTA

import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import CompanyProfileHero from '../components/sections/CompanyProfileHero';
import CompanyProfileTabs from '../components/CompanyProfile/CompanyProfileTabs';
import StatsCard from '../components/CompanyProfile/StatsCard';
import DirectorsGrid from '../components/CompanyProfile/DirectorsGrid';
import { coreValues, companyMotto } from '../constants/companies';

// ── Helper ────────────────────────────────────────────────────────────────────
function DynamicIcon({ name, className }) {
  const Icon = Icons[name] ?? Icons.Circle;
  return <Icon className={className} />;
}

// ── Core Values section ───────────────────────────────────────────────────────
function CoreValuesSection() {
  return (
    <section
      aria-label="Core Values"
      className="bg-[#011539] py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Company Motto */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#FFA500] mb-3">
            Our Motto
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            "{companyMotto}"
          </h2>
          <div className="mt-4 flex justify-center">
            <span className="w-16 h-0.5 bg-[#017119] rounded-full" />
          </div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="group flex flex-col items-center text-center p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-200"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-full bg-[#017119]/20 flex items-center justify-center mb-4 group-hover:bg-[#017119]/40 transition-colors duration-200">
                <DynamicIcon name={val.icon} className="w-6 h-6 text-[#69b821]" />
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-white mb-1">{val.title}</h3>

              {/* Description */}
              <p className="text-xs text-white/60 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section
      aria-label="Call to Action"
      className="py-16 bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75]">
          Ready to partner with us?
        </h2>
        <p className="text-[#011539]/70 text-base">
          Explore our full range of environmental services or reach out to our team directly.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/services"
            id="cta-explore-services"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#69b821] to-[#0c591c] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Explore Services
            <Icons.ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/contact"
            id="cta-get-in-touch"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-[#011539] text-[#011539] font-semibold hover:bg-[#011539] hover:text-white transition-all duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function CompanyProfile() {
  return (
    <main className="w-full bg-white">
      {/* Hero banner */}
      <CompanyProfileHero />

      {/* Tabbed company selector + per-company content */}
      <CompanyProfileTabs />

      {/* At a Glance stats — always visible, shows both companies */}
      <StatsCard />

      {/* Leadership grid — shared, no company attribution */}
      <DirectorsGrid />

      {/* Core Values + Company Motto — shared */}
      <CoreValuesSection />

      {/* CTA */}
      <CTASection />
    </main>
  );
}
