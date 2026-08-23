// WhatDrivesUs.jsx — 4-column pillar grid with section heading
// Desktop: 4 columns | Tablet: 2×2 | Mobile: 1 column

import { pillars } from '../../constants/visionMission';
import PillarCard from './PillarCard';

export default function WhatDrivesUs() {
  return (
    <section aria-label="What Drives Us" className="space-y-10">
      {/* Section heading */}
      <div className="text-center space-y-2">
        <p className="text-xs font-bold uppercase tracking-widest text-[#017119]">
          Our Principles
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F1D75]">
          What Drives Us
        </h2>
        <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
          Four core principles that guide every project, every partnership, and every decision we make.
        </p>
      </div>

      {/* Pillars grid: 4 col → 2 col → 1 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {pillars.map((pillar) => (
          <PillarCard
            key={pillar.id}
            lucideIcon={pillar.lucideIcon}
            title={pillar.title}
            description={pillar.description}
            accentColor={pillar.accentColor}
            bgColor={pillar.bgColor}
          />
        ))}
      </div>
    </section>
  );
}
