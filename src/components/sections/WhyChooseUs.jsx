import React from 'react';
import { Target, FlaskConical, ShieldCheck, Users, Leaf, ClipboardCheck, Microscope, TestTube2, FileBadge, HardHat, Award, Building2, UsersRound, MapPin, Globe2 } from 'lucide-react';
import { whyChooseUsFeatures, circularSectors, bottomStats } from '../../constants/whyChooseUs';

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

const circleImages = [imgRiver, imgResearch, imgTesting, imgConsultancy];

export default function WhyChooseUs() {

  const renderWedges = () => {
    const wedges = [];
    let textIndex = 0;
    let imageIndex = 0;

    for (let i = 0; i < 9; i++) {
      const rotation = i * 40;
      const isText = i % 2 === 0;

      wedges.push(
        <div
          key={`wedge-${i}`}
          className="absolute top-0 left-0 w-full h-full origin-center"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Background Wedge with Clip Path */}
          <div
            className="w-full h-full absolute top-0 left-0 transition-transform hover:scale-[1.02]"
            style={{
              clipPath: 'polygon(50% 50%, 31.8% 0%, 68.2% 0%)',
              backgroundColor: isText ? (i % 4 === 0 ? '#ffffff' : '#f0fdf4') : 'transparent'
            }}
          >
            {!isText && (
              <img
                src={circleImages[imageIndex++]}
                alt="Sector"
                className="absolute object-cover"
                style={{
                  width: '70%',
                  height: '70%',
                  top: '-10%',
                  left: '15%',
                  transformOrigin: '50% 85.7%',
                  transform: `rotate(${-rotation}deg)`
                }}
              />
            )}
          </div>

          {/* Text Content Layer (Not clipped, allows counter-rotation) */}
          {isText && (() => {
            const item = circularSectors[textIndex++];
            const Icon = IconMap[item.icon];
            return (
              <div
                className="absolute top-[5%] sm:top-[8%] left-1/2 flex flex-col items-center justify-center text-center w-[70px] sm:w-[100px]"
                style={{ transform: `translate(-50%, 0) rotate(${-rotation}deg)` }}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-green mb-1" />
                <h5 className="text-[9px] sm:text-[10px] font-bold text-brand-blue uppercase leading-tight">{item.title}</h5>
                <p className="hidden sm:block text-[8px] text-gray-500 leading-tight mt-1">{item.subtitle}</p>
              </div>
            );
          })()}
        </div>
      );
    }
    return wedges;
  };

  return (
    <section className="py-4 lg:pt-5 lg:pb-4 bg-[#e8f6eb87] relative overflow-hidden">
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

          {/* RIGHT SECTION: Circular Graphic */}
          <div className="lg:col-span-7 flex justify-center items-center relative min-h-[360px] sm:min-h-[450px] lg:min-h-[550px] overflow-hidden lg:overflow-visible">

            {/* Wheel Container */}
            <div className="relative w-[340px] h-[340px] sm:w-[450px] sm:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full shadow-2xl bg-white overflow-hidden border-[6px] border-white flex-shrink-0">
              {/* 9 Wedges */}
              {renderWedges()}
            </div>

            {/* Center Logo Circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] lg:w-[200px] lg:h-[200px] bg-white rounded-full shadow-2xl z-20 flex flex-col items-center justify-center border-4 border-gray-50 p-3 text-center">
              <img src={logo} alt="Oceao Enviro Logo" className="w-16 sm:w-24 lg:w-28 mb-2 object-contain" />
              <div className="h-px w-3/4 bg-gray-200 mb-2"></div>
              <p className="text-[7px] sm:text-[9px] lg:text-[10px] font-bold text-brand-blue tracking-[0.1em] sm:tracking-[0.15em] uppercase">
                Consultancy • Research<br />Laboratory
              </p>
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
