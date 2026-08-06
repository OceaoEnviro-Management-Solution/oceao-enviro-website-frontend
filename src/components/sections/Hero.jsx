import React from 'react';
import { ArrowRight, Leaf } from 'lucide-react';
// Inline leaf icon for the small top label
const LeafIconSmall = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#3a912a]">
    <path d="M12 21C12 21 3 15 3 8C3 6.14348 3.7375 4.36301 5.05025 3.05025C6.36301 1.7375 8.14348 1 10 1C11.1944 1 12.3508 1.34114 13.3333 1.98C14.3158 1.34114 15.4722 1 16.6667 1C18.5232 1 20.3036 1.7375 21.6164 3.05025C22.9291 4.36301 23.6667 6.14348 23.6667 8C23.6667 15 14.6667 21 14.6667 21L12 21Z" fill="currentColor"/>
    <path d="M13.3333 20L11 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Inline leaf icon for the heading
// const LeafIconLarge = () => (
//   <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block text-[#3a912a] -ml-2 -mt-4 transform rotate-12">
//     <path d="M17 3C17 3 5 5 2 12C2 12 5 19 12 19C19 19 22 12 22 12C22 12 20 5 17 3Z" fill="currentColor"/>
//     <path d="M12 19L9 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

export default function Hero() {
  return (
    <section className="relative w-full min-h-[75vh] flex items-center pt-16 lg:pt-0 overflow-hidden">


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-center h-full mt-10 md:mt-0">
        
        <div className="max-w-3xl animate-in slide-in-from-bottom-8 duration-700 fade-in">
          {/* Top Tagline */}
          <div className="flex items-center gap-2 mb-6">
            <LeafIconSmall />
            <span className="text-[#011539] font-medium text-lg md:text-xl tracking-wide">
              Leading The Way To A Greener Tomorrow
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight mb-8">
            <span className="text-[#011539] block mb-2">For a Sustainable</span>
            <span className="text-[#2a8f20] flex items-end">
              Tomorrow 
              {/* <LeafIconLarge /> */}
            </span>
          </h1>

          {/* Intro Paragraph */}
          <p className="text-gray-800 text-lg md:text-xl md:leading-relaxed mb-10 max-w-2xl font-medium">
            Delivering reliable environmental solutions, scientific research and analytical services for a cleaner, healthier and greener world.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#services"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-medium text-lg bg-gradient-to-r from-[#69b821] to-[#0c591c] hover:opacity-90 transition-opacity shadow-lg"
            >
              Explore Solutions
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-[#011539] font-medium text-lg bg-white/80 backdrop-blur-sm border-2 border-[#011539] hover:bg-white transition-colors shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
