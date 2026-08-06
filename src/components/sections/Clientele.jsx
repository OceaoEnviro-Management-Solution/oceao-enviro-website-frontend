import React from 'react';
import { clientele } from '../../constants/clientele';
import { Leaf } from 'lucide-react';

export default function Clientele() {
  // Double the array to create a seamless infinite loop effect
  const repeatedClientele = [...clientele, ...clientele];

  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

      <div className="flex w-[200%] sm:w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
        <div className="flex items-center gap-8 md:gap-12 px-4 md:px-6">
          {repeatedClientele.map((client, index) => (
            <div key={index} className="flex items-center gap-8 md:gap-12 shrink-0">
              <span className="text-gray-800 font-semibold text-sm md:text-base lg:text-lg whitespace-nowrap">
                {client}
              </span>
              {/* Divider Icon */}
              <Leaf className="w-5 h-5 text-brand-green/30 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
