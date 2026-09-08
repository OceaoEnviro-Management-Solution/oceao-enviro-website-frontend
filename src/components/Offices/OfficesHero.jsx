// OfficesHero.jsx — Hero banner for the Our Offices page
// Mirrors ContactHero.jsx exactly: same gradient, blobs, animate-in pattern.

import { MapPin } from 'lucide-react';

export default function OfficesHero() {
  return (
    <section
      className="relative w-full h-[200px] md:h-[300px] bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8]
                 flex items-center justify-center overflow-hidden"
    >
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full bg-[#017119]/10 blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full bg-[#FFA500]/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-[#0F1D75]/5 blur-2xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#017119]/10 flex items-center justify-center shadow-sm">
            <MapPin className="w-8 h-8 md:w-10 md:h-10 text-[#017119]" strokeWidth={1.5} />
          </div>
        </div>

        {/* Eye-brow label */}
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#017119] mb-3">
          Oceao Enviro Group
        </p>

        {/* Main heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75] mb-3">
          Our Offices
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-[#011539]/70 font-medium max-w-md mx-auto">
          Find us across India
        </p>
      </div>
    </section>
  );
}
