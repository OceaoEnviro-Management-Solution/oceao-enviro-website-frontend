// StatsCard.jsx — "At a Glance" stats section showing both companies side-by-side
// Always visible regardless of active tab

import * as Icons from 'lucide-react';
import { companies } from '../../constants/companies';

function DynamicIcon({ name, className }) {
  const Icon = Icons[name] ?? Icons.Circle;
  return <Icon className={className} />;
}

// Individual stat item
function StatItem({ stat, accentColor }) {
  return (
    <div className="flex flex-col items-center text-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <DynamicIcon name={stat.icon} className="w-5 h-5" style={{ color: accentColor }} />
      </div>
      <span className="text-xl md:text-2xl font-bold leading-tight" style={{ color: accentColor }}>
        {stat.value}
      </span>
      <span className="text-xs text-gray-500 font-medium mt-1 leading-snug">
        {stat.label}
      </span>
    </div>
  );
}

// Per-company stat panel
function CompanyStatPanel({ company, accentColor }) {
  return (
    <div className="flex-1 space-y-4">
      {/* Company name header */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-lg"
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
        <span className="text-sm font-bold" style={{ color: accentColor }}>
          {company.name}
        </span>
      </div>

      {/* Stats grid: 2×2 */}
      <div className="grid grid-cols-2 gap-3">
        {company.stats.map((stat, idx) => (
          <StatItem key={idx} stat={stat} accentColor={accentColor} />
        ))}
      </div>
    </div>
  );
}

export default function StatsCard() {
  const [managementCo, researchCo] = companies;

  return (
    <section
      aria-label="At a Glance"
      className="bg-gradient-to-br from-[#F8FAFB] to-[#EAEBF7]/30 py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="text-sm font-semibold uppercase tracking-widest text-[#017119]">
            Quick Facts
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75] mt-1">
            At a Glance
          </h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
            Key numbers across both Oceao Enviro companies
          </p>
        </div>

        {/* Two-column panels (stacked on mobile) */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          {/* Divider label visible only on desktop */}
          <CompanyStatPanel company={managementCo} accentColor="#017119" />

          <div className="hidden lg:flex items-center">
            <div className="w-px h-full bg-gray-200" />
          </div>

          <CompanyStatPanel company={researchCo} accentColor="#FFA500" />
        </div>
      </div>
    </section>
  );
}
