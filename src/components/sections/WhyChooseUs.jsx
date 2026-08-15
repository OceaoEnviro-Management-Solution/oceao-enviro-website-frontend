import React from 'react';
import { Target, FlaskConical, ShieldCheck, Users, Leaf, ClipboardCheck, Microscope, TestTube2, FileBadge, HardHat, Award, Building2, UsersRound, MapPin, Globe2 } from 'lucide-react';
import { whyChooseUsFeatures, wedgeData, imageWedges, bottomStats } from '../../constants/whyChooseUs';

import imgConsultancy from '../../assets/images/homePage/Consultancy.jpeg';
import imgRiver from '../../assets/images/homePage/whyUsSection/River.jpeg';
import imgResearch from '../../assets/images/homePage/whyUsSection/Research.jpeg';
import imgTesting from '../../assets/images/homePage/whyUsSection/testing.jpg';
import logo from '../../assets/logos/company-logo2.png';

const IconMap = {
  Target, FlaskConical, ShieldCheck, Users, Leaf,
  ClipboardCheck, Microscope, TestTube2, FileBadge, HardHat,
  Award, Building2, UsersRound, MapPin, Globe2
};

export default function WhyChooseUs() {

  return (
    <section className="py-4 lg:pt-5 lg:pb-4 bg-[#e9eef1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Grid: Left (Text) and Right (Circle) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">

          {/* LEFT SECTION */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-blue mb-3 uppercase tracking-tight">
              WHY TO CHOOSE US?
            </h2>
            <h3 className="text-xl md:text-lg font-bold text-brand-green mb-4 ">
              <i> One Partner - Every Environmental Solution.</i>
            </h3>
            <p className="text-sm text-gray-700 mb-6 leading-relaxed max-w-xl">
              We combine consultancy, research and laboratory excellence to deliver end-to-end environmental solutions that ensure compliance, drive sustainability and create long term value of products and communities.
            </p>

            <div className="space-y-2">
              {whyChooseUsFeatures.map(feature => {
                const Icon = IconMap[feature.icon];
                return (
                  <div key={feature.id} className="flex gap-4 group ">
                    <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-brand-green border border-gray-100 group-hover:scale-110 group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-bold text-brand-blue">{feature.title}</h4>
                      <p className="text-xs md:text-sm text-gray-700">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT SECTION: 8-Wedge Pie Graphic */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[450px] sm:min-h-[550px] lg:min-h-[650px] overflow-visible">

            {/* Main Outer Container (for badges) */}
            <div className="relative w-[360px] h-[360px] sm:w-[480px] sm:h-[480px] lg:w-[540px] lg:h-[540px] flex-shrink-0">

              {/* The Inner Circle (Clips everything inside) */}
              <div className="absolute inset-0 rounded-full shadow-[0_0_40px_rgba(0,0,0,0.1)] overflow-hidden border-[8px] border-white bg-white">

                {/* 1. Base Layer: Images in their 4 quadrants */}
                {imageWedges.map((wedge) => {
                  let bgImage = null;
                  if (wedge.imageRef === 'imgRiver') bgImage = imgRiver;
                  if (wedge.imageRef === 'imgResearch') bgImage = imgResearch;
                  if (wedge.imageRef === 'imgConsultancy') bgImage = imgConsultancy;
                  if (wedge.imageRef === 'imgTesting') bgImage = imgTesting;

                  return (
                    <div
                      key={wedge.id}
                      className="absolute inset-0 group overflow-hidden"
                      style={{ clipPath: wedge.clipPath }}
                    >
                      <img src={bgImage} alt={wedge.id} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    </div>
                  );
                })}

                {/* 2. SVG Overlay: Creates the beautiful curved boundaries and text background colors */}
                <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none z-10" preserveAspectRatio="none">
                  <defs>
                    {/* Base Text Wedge (Top, points UP) */}
                    <path id="wedge-text" d="M 50 50 Q 35 20, 30.87 3.81 A 50 50 0 0 1 69.13 3.81 Q 65 20, 50 50 Z" />
                    {/* Base Image Wedge (Top Right) */}
                    <path id="wedge-image" d="M 50 50 Q 65 20, 69.13 3.81 A 50 50 0 0 1 96.19 30.87 Q 80 35, 50 50 Z" />
                  </defs>

                  {/* Draw Text Wedges (with opaque colors to cover the straight image edges) */}
                  <use href="#wedge-text" fill="#f1f8f5" stroke="#ffffff" strokeWidth="1.2" />
                  <use href="#wedge-text" transform="rotate(90 50 50)" fill="#f4f7fb" stroke="#ffffff" strokeWidth="1.2" />
                  <use href="#wedge-text" transform="rotate(180 50 50)" fill="#f2f9f8" stroke="#ffffff" strokeWidth="1.2" />
                  <use href="#wedge-text" transform="rotate(270 50 50)" fill="#fff9f0" stroke="#ffffff" strokeWidth="1.2" />

                  {/* Draw Image Wedges (transparent fill, just for the thick white borders) */}
                  <use href="#wedge-image" fill="none" stroke="#ffffff" strokeWidth="1.2" />
                  <use href="#wedge-image" transform="rotate(90 50 50)" fill="none" stroke="#ffffff" strokeWidth="1.2" />
                  <use href="#wedge-image" transform="rotate(180 50 50)" fill="none" stroke="#ffffff" strokeWidth="1.2" />
                  <use href="#wedge-image" transform="rotate(270 50 50)" fill="none" stroke="#ffffff" strokeWidth="1.2" />
                </svg>

                {/* 3. Text Content HTML (Positioned over the SVG text wedges) */}
                {wedgeData.map((wedge) => {
                  const Icon = IconMap[wedge.icon];
                  return (
                    <div key={`text-${wedge.id}`} className={`absolute z-20 ${wedge.textContainer}`}>
                      <Icon className={`w-5 h-5 sm:w-7 sm:h-7 mb-1.5 sm:mb-2 ${wedge.iconColor}`} />
                      <h4 className={`text-[9px] sm:text-[11px] lg:text-xs font-extrabold uppercase leading-snug mb-1.5 sm:mb-2 whitespace-pre-line ${wedge.titleColor}`}>
                        {wedge.title}
                      </h4>
                      <p className="text-[7.5px] sm:text-[9px] lg:text-[10px] text-gray-700 leading-snug hidden sm:block">
                        {wedge.description}
                      </p>
                    </div>
                  );
                })}

                {/* 4. Center Logo Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px] bg-white rounded-full shadow-2xl z-30 flex flex-col items-center justify-center p-2 text-center border-[2px] border-brand-blue/20">
                  <div className="w-full h-full rounded-full flex flex-col items-center justify-center bg-white shadow-inner">
                    <img src={logo} alt="Oceao Enviro Logo" className="w-16 sm:w-24 lg:w-28 mb-1.5 sm:mb-2 object-contain" />
                    <div className="h-[1px] w-3/4 bg-gray-200 mb-1.5 sm:mb-2"></div>
                    <p className="text-[5px] sm:text-[6px] lg:text-[7px] font-bold text-brand-blue tracking-[0.1em] sm:tracking-[0.15em] uppercase leading-tight">
                      Consultancy • Research<br />Laboratory
                    </p>
                  </div>
                </div>
              </div>

              {/* 5. Outer Number Badges */}
              {wedgeData.map((wedge) => (
                <div
                  key={`badge-${wedge.id}`}
                  className={`absolute w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-[11px] sm:text-sm font-bold text-white shadow-lg z-40 ${wedge.badgeBg} ${wedge.badgePos}`}
                >
                  {wedge.number}
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Stats Grid */}
        <div className="mt-4 lg:mt-4 py-2 bg-[#b8d9d7c9] border-t border-[#b8d4c0] shadow-xl rounded-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {bottomStats.map((stat) => {
            const Icon = IconMap[stat.icon];
            // // Highlight 'Pan India Presence'
            // const isHighlighted = stat.label.includes("Presence");

            return (
              <div key={stat.id} className="flex flex-row items-center group px-2 border-r border-[#b8d4c0]">
                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:-translate-y-1 bg-white text-brand-green shadow-sm group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-md">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex flex-col px-2">
                  <h4 className="text-lg sm:text-xl font-bold text-brand-blue mb-1">{stat.stat}</h4>
                  <p className="text-xs text-gray-700 font-medium max-w-[120px]">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
