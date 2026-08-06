import React from 'react';
import { virtualMeetingContent } from '../../constants/virtualMeeting';
import { Leaf, MapPin, Clock, MessageCircle, Calendar, Users, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const IconMap = {
  MapPin, Clock, MessageCircle, Leaf, Calendar, Users, Shield
};

export default function VirtualMeeting() {
  return (
    <section className="py-16 lg:py-24 bg-[#F8FAF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          
          {/* Left Side: Content */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8 text-brand-green" />
              <h2 className="text-brand-green font-bold text-4xl tracking-wider uppercase">
                {virtualMeetingContent.heading}
              </h2>
            </div>
            
            <h3 className="text-xl md:text-xl font-bold text-brand-blue mb-6 leading-tight">
              {virtualMeetingContent.tagline}
            </h3>
            
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {virtualMeetingContent.description}
            </p>
            
            {/* Features List */}
            <div className="space-y-6 mb-10">
              {virtualMeetingContent.features.map((feature, index) => {
                const Icon = IconMap[feature.icon];
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center shrink-0 text-brand-orange">
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-blue mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link 
                to={virtualMeetingContent.ctaButtonLink}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-white font-semibold text-base bg-brand-green hover:bg-brand-green-dark transition-colors shadow-md"
              >
                {virtualMeetingContent.ctaButtonText}
              </Link>
              <Link 
                to="/about"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full text-brand-blue font-semibold text-base border-2 border-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>

          {/* Right Side: Image Mockup */}
          <div className="relative">
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-gradient-to-tr from-brand-green/10 to-transparent rounded-full -z-10 blur-3xl"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="/src/assets/images/homePage/virtualMeeting.png" 
                alt="Virtual Meeting Mockup" 
                className="w-full h-auto object-cover"
              />
              {/* Optional: Add floating UI elements to match reference if needed */}
            </div>
          </div>

        </div>

        {/* Bottom Section: Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          {virtualMeetingContent.benefits.map((benefit, index) => {
            const Icon = IconMap[benefit.icon];
            return (
              <div key={index} className="flex flex-col items-center text-center p-4">
                <div className="w-14 h-14 rounded-full bg-brand-green-light text-brand-green flex items-center justify-center mb-4">
                  {Icon && <Icon className="w-7 h-7" />}
                </div>
                <h4 className="font-bold text-brand-blue mb-2 text-lg">{benefit.title}</h4>
                <p className="text-gray-500 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
