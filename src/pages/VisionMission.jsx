// VisionMission.jsx — Main page for /about/Vision-Mission
// Static, scroll-based reading page — no tabs, no sidebars, no interactions

import VisionMissionHero from '../components/sections/VisionMissionHero';
import VisionSection from '../components/VisionMission/VisionSection';
import MissionSection from '../components/VisionMission/MissionSection';
import WhatDrivesUs from '../components/VisionMission/WhatDrivesUs';
import LookingAhead from '../components/VisionMission/LookingAhead';

export default function VisionMission() {
  return (
    <main className="w-full bg-white pb-20">
      {/* Section 1 — Hero banner */}
      <VisionMissionHero />

      {/* Main content wrapper */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14 space-y-12 md:space-y-16">

        {/* Section 2 — Vision (illustration left, text right) */}
        <VisionSection />

        {/* Section 3 — Mission (text left, illustration right) ← alternating */}
        <MissionSection />

        {/* Section 4 — "What Drives Us" pillar grid */}
        <WhatDrivesUs />

        {/* Section 5 — Looking Ahead full-width banner */}
        <LookingAhead />

      </div>
    </main>
  );
}
