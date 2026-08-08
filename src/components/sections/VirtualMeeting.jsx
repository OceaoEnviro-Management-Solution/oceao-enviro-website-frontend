import React from 'react';
import { virtualMeetingContent } from '../../constants/virtualMeeting';
import { Leaf, Globe2, Clock, MessageSquare, Calendar, Users, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const IconMap = {
  Globe2, Clock, MessageSquare, Leaf, Calendar, Users, Shield
};

export default function VirtualMeeting() {
  return (
    <section className="py-12 lg:py-16 bg-[#F8FAF9] relative overflow-hidden">
      <div className="max-w-7xl mx-auto pt-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-8">

          {/* Left Side: Content */}
          <div className="flex flex-col justify-center">

            {/* Heading Section */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#e8f3ea] flex items-center justify-center shrink-0">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 text-brand-green" strokeWidth={2} />
              </div>
              <div className="relative">
                <h2 className="text-brand-green font-extrabold text-4xl md:text-5xl lg:text-[54px] tracking-tight uppercase leading-none">
                  {virtualMeetingContent.heading1} <br /> {virtualMeetingContent.heading2}
                </h2>
                {/* Decorative leaves on top right */}
                <div className="absolute top-0 -right-12 text-brand-green hidden sm:block">
                  <Leaf className="w-8 h-8 md:w-10 md:h-10 -rotate-12 opacity-80" />
                  <Leaf className="w-5 h-5 md:w-6 md:h-6 rotate-45 opacity-60 absolute top-6 right-8" />
                </div>
              </div>
            </div>

            <div className="w-16 h-[2px] bg-brand-green mb-6"></div>

            <h3 className="text-xl md:text-2xl font-bold text-brand-blue mb-3 leading-tight">
              {virtualMeetingContent.tagline}
            </h3>

            <p className="text-gray-600 text-[13px] md:text-sm mb-8 leading-relaxed max-w-lg">
              {virtualMeetingContent.description}
            </p>

            {/* Benefits List (Left Section) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {virtualMeetingContent.benefits.map((benefit, index) => {
                const Icon = IconMap[benefit.icon];
                return (
                  <div key={index} className="flex flex-row items-start gap-2">
                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#e8f3ea] flex items-center justify-center shrink-0 text-brand-green">
                      {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-blue text-xs md:text-[13px] leading-tight mb-1">{benefit.title}</h4>
                      <p className="text-[10px] md:text-[11px] text-gray-500 leading-tight pr-2">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link
                to={virtualMeetingContent.ctaButtonLink}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-md text-white font-semibold text-sm bg-gradient-to-r from-brand-green to-brand-blue hover:scale-105 hover:text-black transition-colors shadow-sm"
              >
                <Calendar className="w-4 h-4" />
                {virtualMeetingContent.ctaButtonText}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-md text-brand-blue font-semibold text-sm hover:text-brand-green transition-colors"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Side: Image Mockup */}
          <div className="relative flex justify-center lg:justify-end items-center h-full">
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] aspect-square bg-gradient-to-tr from-brand-green/10 to-transparent rounded-full -z-10 blur-3xl"></div>

            <div className="relative w-full rounded-2xl overflow-hidden flex justify-center">
              <img
                src="/src/assets/images/homePage/virtualMeeting.png"
                alt="Virtual Meeting Mockup"
                className="w-full h-auto max-h-[450px] lg:max-h-[500px] object-contain drop-shadow-lg"
              />
            </div>
          </div>

        </div>

        {/* Bottom Section: Features Grid */}
        <div className=" bg-white rounded-2xl p-3 sm:p-4 shadow-lg border border-gray-100 relative">

          {/* Header "Why Book a Virtual Meeting?" */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[2px] bg-brand-green/30 flex-1 max-w-[100px] md:max-w-[150px]"></div>
            <div className="flex items-center gap-2 text-brand-green font-bold text-base md:text-xl">
              <Leaf className="w-5 h-5 fill-current" />
              Why Book a Virtual Meeting?
            </div>
            <div className="h-[2px] bg-brand-green/30 flex-1 max-w-[100px] md:max-w-[150px]"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-gray-200">
            {virtualMeetingContent.features.map((feature, index) => {
              const Icon = IconMap[feature.icon];
              const isBlue = index === 0 || index === 2;
              const iconBgClass = isBlue
                ? 'bg-blue-50 text-brand-blue group-hover:bg-brand-blue group-hover:text-white'
                : 'bg-[#f0f6f1] text-brand-green group-hover:bg-brand-green group-hover:text-white';

              return (
                <div key={index} className={`flex items-center gap-3 group ${index !== 0 ? 'lg:pl-6' : 'lg:pr-2'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${iconBgClass}`}>
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-blue text-[13px] mb-1">{feature.title}</h4>
                    <p className="text-gray-500 text-[11px] leading-tight">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
