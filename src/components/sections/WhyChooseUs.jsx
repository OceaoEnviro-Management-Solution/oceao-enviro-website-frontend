import React from 'react';
import { whyChooseUs } from '../../constants/whyChooseUs';

export default function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-brand-blue mb-4">
            Why Choose Oceao Enviro?
          </h2>
          <p className="text-lg text-gray-600">
            Unwavering commitment, exceptional quality, and reliable solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {whyChooseUs.map((item, index) => {
            // Alternate text colors for stats to make it visually interesting
            const statColorClass = index % 2 === 0 ? 'text-brand-orange' : 'text-brand-green';

            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center group"
              >
                <div className={`text-4xl md:text-5xl font-extrabold ${statColorClass} mb-4 tracking-tight group-hover:scale-105 transition-transform`}>
                  {item.stat}
                </div>
                <h3 className="text-xl font-bold text-brand-blue mb-3">
                  {item.label}
                </h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
