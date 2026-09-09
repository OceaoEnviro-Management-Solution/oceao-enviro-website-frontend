// DirectorsGrid.jsx — Leadership grid for Company Profile
// Shows directors WITHOUT company attribution (as per client request)
// Uses dummy data — replace with real names/photos when available

import { UserCircle } from 'lucide-react';
import { directors } from '../../constants/directors';

function DirectorCard({ director }) {
  return (
    <div className="group flex flex-col items-center text-center p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      {/* Avatar placeholder */}
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#E4F3E6] to-[#EAEBF7] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200 shadow-sm">
        <UserCircle className="w-12 h-12 text-[#017119]" />
      </div>

      {/* Name */}
      <h3 className="text-sm font-bold text-[#0F1D75] leading-snug mb-1">
        {director.name}
      </h3>

      {/* Designation */}
      <p className="text-xs font-semibold text-[#017119] mb-2">
        {director.designation}
      </p>

      {/* Qualifications */}
      <p className="text-xs text-gray-500 leading-relaxed">
        {director.qualifications}
      </p>
    </div>
  );
}

export default function DirectorsGrid() {
  return (
    <section
      aria-label="Our Leadership"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      {/* Section header */}
      <div className="text-center mb-10">
        <span className="text-sm font-semibold uppercase tracking-widest text-[#017119]">
          Leadership
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75] mt-1">
          Our Leadership
        </h2>
        <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
          Guided by seasoned professionals committed to environmental excellence
        </p>
      </div>

      {/* Directors grid: 3 col desktop → 3 tablet → 1 mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5">
        {directors.map((director) => (
          <DirectorCard key={director.id} director={director} />
        ))}
      </div>
    </section>
  );
}
