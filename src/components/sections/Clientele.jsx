import React from 'react';
import { clientele_1, clientele_2 } from '../../constants/clientele';

export default function Clientele() {
  // Use import.meta.glob to eagerly load all images in the clientele directory
  // const images = import.meta.glob('../../assets/logos/clientele/*.{png,jpg,jpeg,svg}', { eager: true });

  // const getImageUrl = (path) => {
  //   // path is something like "../../assets/logos/clientele/HclTech.jpg"
  //   // images[path] will contain the resolved module if it exists
  //   return images[path]?.default || path;
  // };

  // We duplicate the arrays to create a seamless infinite loop effect
  const repeatedClientele1 = [...clientele_1, ...clientele_1, ...clientele_1];
  const repeatedClientele2 = [...clientele_2, ...clientele_2, ...clientele_2];

  return (
    <section className="py-16 bg-[#f7fdf7] relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-12 bg-brand-green/30"></div>
          <span className="text-brand-green-dark uppercase tracking-widest text-sm font-bold flex items-center">
            TRUSTED BY LEADING ORGANIZATIONS
          </span>
          <div className="h-px w-12 bg-brand-green/30"></div>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-brand-blue mb-6">
          Our Esteemed Clients
        </h2>

        <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
          Trusted by organizations across government, infrastructure, industry and development.
        </p>
      </div>

      {/* Marquee Section */}
      <div className="relative max-w-[95vw] mx-auto">

        {/* Row 1 */}
        <div className="relative mt-8 mb-16">
          {/* Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-brand-green-dark text-white text-xs font-bold uppercase tracking-wider py-1.5 px-6 rounded-full shadow-lg">
            OUR CLIENTS
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] py-8 border border-gray-100 overflow-hidden relative group">
            {/* Gradient Mask for smooth fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white to-transparent z-10"></div>

            <div className="flex w-[200%] sm:w-[max-content] animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused]">
              <div className="flex items-center">
                {repeatedClientele1.map((client, index) => (
                  <div key={`${client.id}-${index}`} className="flex items-center justify-center shrink-0 border-r border-gray-100 last:border-0" style={{ width: '20vw', minWidth: '200px' }}>
                    <div className="h-24 w-3/4 flex items-center justify-center p-4">
                      <img
                        src={client.imageurl}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain filter transition-all duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      {/* Fallback text if image fails to load */}
                      <span className="hidden font-bold text-gray-700 text-center text-lg">{client.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="relative mt-8 mb-8">
          {/* Badge */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 bg-brand-green-dark text-white text-xs font-bold uppercase tracking-wider py-1.5 px-6 rounded-full shadow-lg">
            OUR CLIENTS
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] py-8 border border-gray-100 overflow-hidden relative group">
            {/* Gradient Mask for smooth fade on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white via-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white via-white to-transparent z-10"></div>

            <div className="flex w-[200%] sm:w-[max-content] animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused]">
              <div className="flex items-center">
                {repeatedClientele2.map((client, index) => (
                  <div key={`${client.id}-${index}`} className="flex items-center justify-center shrink-0 border-r border-gray-100 last:border-0" style={{ width: '20vw', minWidth: '200px' }}>
                    <div className="h-24 w-3/4 flex items-center justify-center p-4">
                      <img
                        src={client.imageurl}
                        alt={client.name}
                        className="max-h-full max-w-full object-contain filter transition-all duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      {/* Fallback text if image fails to load */}
                      <span className="hidden font-bold text-gray-700 text-center text-lg">{client.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
