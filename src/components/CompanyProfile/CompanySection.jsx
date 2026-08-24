// CompanySection.jsx — Renders all content for the active company tab
// Sections: Who We Are → Key Capabilities → Certifications (conditional)
//           → Our Presence → Industries We Serve

import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { sharedPresence, industriesServed } from '../../constants/companies';

// ── Helper: resolve a Lucide icon by string name ─────────────────────────────
function DynamicIcon({ name, className }) {
  const Icon = Icons[name] ?? Icons.Circle;
  return <Icon className={className} />;
}

// ── Tag color map ─────────────────────────────────────────────────────────────
const tagColors = {
  blue: 'bg-[#EAEBF7] text-[#0F1D75] hover:bg-[#0F1D75] hover:text-white',
  orange: 'bg-[#FFE7B8] text-[#8B5C00] hover:bg-[#FFA500] hover:text-white',
  green: 'bg-[#E4F3E6] text-[#017119] hover:bg-[#017119] hover:text-white',
};

export default function CompanySection({ company }) {
  const {
    fullName,
    tagline,
    whoWeAre,
    founded,
    keyBadge,
    keyBadgeIcon,
    illustration,
    illustrationSide,
    capabilities,
    certifications,
    certificationsList,
    ctaText,
    ctaLink,
  } = company;

  const illustrationLeft = illustrationSide === 'left';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* ── Section 1: Who We Are ─────────────────────────────────────────── */}
      <section
        aria-label="Who We Are"
        className={`flex flex-col ${illustrationLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16`}
      >
        {/* Illustration / Icon */}
        <div className="flex-shrink-0 flex items-center justify-center w-40 h-40 lg:w-48 lg:h-48 rounded-2xl bg-gradient-to-br from-[#E4F3E6] to-[#EAEBF7] shadow-md">
          <DynamicIcon name={illustration} className="w-20 h-20 text-[#017119]" />
        </div>

        {/* Text content */}
        <div className="flex-1 space-y-5">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-[#017119]" />
            <span className="text-sm font-semibold uppercase tracking-widest text-[#017119]">
              Who We Are
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75] leading-tight">
            {fullName}
          </h2>
          <p className="text-[#011539]/60 text-sm font-medium uppercase tracking-wide">
            {tagline}
          </p>

          <p className="text-[#011539] text-base leading-relaxed md:leading-[1.8]">
            {whoWeAre}
          </p>

          {/* Badges row */}
          <div className="flex flex-wrap gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E4F3E6] text-[#017119] text-sm font-semibold">
              <Icons.Calendar className="w-3.5 h-3.5" />
              Founded {founded}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAEBF7] text-[#0F1D75] text-sm font-semibold">
              <DynamicIcon name={keyBadgeIcon} className="w-3.5 h-3.5" />
              {keyBadge}
            </span>
          </div>

          {/* CTA */}
          <Link
            to={ctaLink}
            className="inline-flex items-center gap-2 mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#69b821] to-[#0c591c] text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-md"
          >
            {ctaText}
            <Icons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Section 2: Key Capabilities ──────────────────────────────────── */}
      <section aria-label="Key Capabilities">
        <div className="text-center mb-8">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#017119]">
            What We Do
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75] mt-1">
            Our Key Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {capabilities.map((cap) => (
            <div
              key={cap.id}
              className="group flex gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#E4F3E6] flex items-center justify-center group-hover:bg-[#017119] transition-colors duration-200">
                <DynamicIcon
                  name={cap.icon}
                  className="w-6 h-6 text-[#017119] group-hover:text-white transition-colors duration-200"
                />
              </div>

              {/* Text */}
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#0F1D75] leading-snug">
                  {cap.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Certifications (Research & Labs only) ─────────────── */}
      {certifications && certificationsList && (
        <section
          aria-label="Certifications and Accreditations"
          className="rounded-2xl border border-[#E4F3E6] bg-gradient-to-br from-[#E4F3E6]/60 to-[#EAEBF7]/40 p-6 md:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <span className="text-sm font-semibold uppercase tracking-widest text-[#017119]">
                Quality Assurance
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-[#0F1D75] mt-1">
                Certifications & Accreditations
              </h2>
            </div>
            <Link
              to="/about/accreditations"
              id="view-all-certifications"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#017119] text-[#017119] text-sm font-semibold hover:bg-[#017119] hover:text-white transition-all duration-200 whitespace-nowrap"
            >
              View All Certifications
              <Icons.ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {certificationsList.map((cert, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-sm border border-[#E4F3E6]"
              >
                <DynamicIcon
                  name={cert.icon}
                  className="w-5 h-5 text-[#017119] flex-shrink-0"
                />
                <span className="text-sm font-medium text-[#011539]">
                  {cert.name}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Section 4: Our Presence ──────────────────────────────────────── */}
      <section aria-label="Our Presence">
        <div className="rounded-2xl bg-[#011539] text-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Icons.Globe className="w-5 h-5 text-[#FFA500]" />
              <span className="text-sm font-semibold uppercase tracking-widest text-[#FFA500]">
                Our Presence
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold">Pan-India Coverage</h2>
            <p className="text-white/70 text-sm leading-relaxed max-w-lg">
              {sharedPresence.description}
            </p>

            {/* Location chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {sharedPresence.locations.slice(0, 6).map((loc) => (
                <span
                  key={loc}
                  className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium"
                >
                  {loc}
                </span>
              ))}
              {sharedPresence.locations.length > 6 && (
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium">
                  +{sharedPresence.locations.length - 6} more
                </span>
              )}
            </div>
          </div>

          <Link
            to="/contact"
            id="learn-more-offices"
            className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFA500] text-[#011539] text-sm font-bold hover:bg-[#E69500] transition-colors shadow-lg"
          >
            Our Offices
            <Icons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Section 5: Industries We Serve ───────────────────────────────── */}
      <section aria-label="Industries We Serve">
        <div className="text-center mb-6">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#017119]">
            Sectors
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75] mt-1">
            Industries We Serve
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {industriesServed.map((industry) => (
            <span
              key={industry.label}
              className={`cursor-default px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${tagColors[industry.color] ?? tagColors.green}`}
            >
              {industry.label}
            </span>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/our-work/projects"
            id="explore-our-work"
            className="inline-flex items-center gap-2 text-[#017119] font-semibold text-sm hover:gap-3 transition-all duration-200"
          >
            Explore Our Work
            <Icons.ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

    </div>
  );
}
