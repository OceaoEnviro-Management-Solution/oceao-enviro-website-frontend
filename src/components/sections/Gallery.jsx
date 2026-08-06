import React, { useState } from 'react';
import { gallery, galleryCategories } from '../../constants/gallery';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter gallery based on active category
  const filteredGallery = activeCategory === 'All' 
    ? gallery 
    : gallery.filter(item => item.category === activeCategory);

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-brand-blue mb-4">
            Gallery
          </h2>
          <p className="text-lg text-gray-600">
            A glimpse into our facilities and field work
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === 'All'
                ? 'bg-brand-orange text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {galleryCategories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-brand-orange text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredGallery.map((item) => (
            <div 
              key={item.id} 
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm bg-gray-100"
            >
              <img 
                src={item.image} 
                alt={item.alt} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Category Label */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="bg-brand-blue/90 text-white text-xs font-bold px-3 py-1.5 rounded-md backdrop-blur-sm shadow-sm">
                  {item.category}
                </span>
              </div>
              
              {/* View Icon (appears on hover) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                  <ImageIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link 
            to="/gallery"
            className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full text-white font-semibold text-base bg-brand-orange hover:bg-brand-orange-dark transition-colors shadow-md"
          >
            View More Gallery
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
