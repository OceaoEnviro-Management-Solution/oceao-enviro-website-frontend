import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Placeholder for Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-gray-100 flex items-center justify-center">
            {/* The image will go here, currently a styled placeholder */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-green/20 to-brand-blue/10"></div>
            <p className="text-gray-400 font-medium z-10">Environmental Work Illustration Placeholder</p>
          </div>

          {/* Right Side: Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-blue leading-tight mb-4">
                Welcome to Oceao-Enviro Management Solutions
              </h2>
              <p className="text-xl text-brand-green font-medium mb-6">
                Leading Environmental Solutions Since 2015
              </p>
              <div className="text-gray-600 space-y-4 text-base md:text-lg leading-relaxed">
                <p>
                  Oceao-Enviro is a multi-disciplinary environmental engineering and project management consulting organization dedicated to sustainable development. Established in 2015, we're committed to the motto 'Be a Part of Sustainability'—promoting sustainable economic growth with environmental upgradation, leading to irreversible positive development for all.
                </p>
                <p>
                  With offices across India—New Delhi, Lucknow, Jaipur, Udaipur, Bhopal, Odisha, Chandigarh, Punjab, Dehradun, and Shimla—we integrate global environmental expertise with a single-minded focus on exceeding client expectations. Our work is characterized by unwavering commitment, utmost reliability, exceptional quality, and on-time delivery.
                </p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-brand-orange mb-1">10+</div>
                <div className="text-sm font-semibold text-brand-blue">Years of Experience</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-brand-orange mb-1">500+</div>
                <div className="text-sm font-semibold text-brand-blue">Successful Projects</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-brand-orange mb-1">50+</div>
                <div className="text-sm font-semibold text-brand-blue">Environmental Experts</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-3xl font-bold text-brand-orange mb-1">1000+</div>
                <div className="text-sm font-semibold text-brand-blue">Trusted Clients</div>
              </div>
            </div>

            <Link 
              to="/about"
              className="inline-flex items-center gap-2 text-brand-green font-semibold hover:text-green-800 transition-colors group"
            >
              Learn More About Us
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}
