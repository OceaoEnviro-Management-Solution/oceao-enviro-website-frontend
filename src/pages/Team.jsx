// Team.jsx — /about/team
// Layout: Hero → Intro → Leadership (3 directors) → Professional Team (filter + groups) → CTA

import { useState } from 'react';
import { DIRECTORS, EMPLOYEE_GROUPS } from '../constants/team';
import ServiceDetailHero from '../components/services/ServiceDetailHero';
import TeamIntro from '../components/team/TeamIntro';
import DirectorCard from '../components/team/DirectorCard';
import EmployeeGrid from '../components/team/EmployeeGrid';
import TeamCTA from '../components/team/TeamCTA';

const TEAM_HERO = {
  hero: {
    eyebrow: 'About Us',
    title: 'Our Team',
    subtitle: 'Meet the professionals behind OCEAO ENVIRO — expertise across environmental management, engineering, laboratory services, research and project support.',
  },
};

const ALL = 'all';

export default function Team() {
  const [activeGroup, setActiveGroup] = useState(ALL);

  const groups = EMPLOYEE_GROUPS.filter((group) => group.employees.length > 0);
  const visibleGroups = activeGroup === ALL ? groups : groups.filter((group) => group.id === activeGroup);

  const filters = [{ id: ALL, name: 'All' }, ...groups.map(({ id, name }) => ({ id, name }))];

  return (
    <main className="w-full bg-white">

      <ServiceDetailHero category={TEAM_HERO} />

      <TeamIntro />

      {/* ── Leadership ── */}
      <section aria-label="Our leadership" className="pb-14 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#017119] mb-2">Leadership</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1D75] mb-2">Our Leadership</h2>
            <p className="text-gray-600">Leadership that guides our expertise, commitment and approach.</p>
          </div>
          <div className="flex flex-col gap-8">
            {DIRECTORS.map((director) => (
              <DirectorCard key={director.id} director={director} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Professional team ── */}
      <section aria-label="Our professional team" className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#017119] mb-2">Our People</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1D75]">Our Professional Team</h2>
          </div>

          <div role="group" aria-label="Filter team by function" className="flex flex-wrap gap-2 mb-10">
            {filters.map((filter) => {
              const isActive = activeGroup === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  id={`team-filter-${filter.id}`}
                  onClick={() => setActiveGroup(filter.id)}
                  aria-pressed={isActive}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'bg-[#017119] text-white shadow-sm'
                      : 'bg-white border border-gray-200 text-[#0F1D75] hover:bg-[#E4F3E6] hover:text-[#017119]'
                  }`}
                >
                  {filter.name}
                </button>
              );
            })}
          </div>

          {visibleGroups.map((group) => (
            <EmployeeGrid key={group.id} group={group} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section aria-label="Work with us" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TeamCTA />
        </div>
      </section>

    </main>
  );
}
