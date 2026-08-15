import React from 'react';
import { Award, Calendar, MapPin, Leaf, Microscope, FlaskConical } from 'lucide-react';
import envEarth from '../../assets/images/homePage/AboutSection/EnviornmentEarth.png';
import envResearch from '../../assets/images/homePage/AboutSection/EnvironmentResearch.png';
import labTesting from '../../assets/images/homePage/AboutSection/LabTesting.jpg';

export default function Welcome() {
  return (
    <section className="py-8 lg:py-12 bg-white relative overflow-hidden min-h-[120vh] flex items-center">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">

          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Section 1: Images */}
            <div className="grid grid-cols-2 gap-1 pt-11">
              <div className="col-span-2 overflow-hidden rounded-xl">
                <img
                  src={envEarth}
                  alt="Environmental Earth"
                  className="w-full h-[220px] lg:h-[253px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-xl">
                <img
                  src={labTesting}
                  alt="Lab Testing"
                  className="w-full h-[140px] lg:h-[195px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-xl">
                <img
                  src={envResearch}
                  alt="Environmental Research"
                  className="w-full h-[140px] lg:h-[195px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Section 2: Highlights */}
            <div className="bg-brand-white shadow-lg shadow-gray-200/50 rounded-3xl p-4 border border-gray-50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-x divide-gray-100">
                <div className="flex flex-col items-center justify-center space-y-3 px-2">
                  <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center text-brand-green">
                    <Award className="w-6 h-6" />
                  </div>
                  <p className="text-[13px] lg:text-sm font-bold text-brand-primary-blue leading-snug">QCI – NABET<br />Accredited</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-3 px-2">
                  <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center text-brand-green">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <p className="text-[13px] lg:text-sm font-bold text-brand-primary-blue leading-snug">Established<br />in 2015</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-3 px-2">
                  <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center text-brand-green">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="text-[13px] lg:text-sm font-bold text-brand-primary-blue leading-snug">Pan India<br />Presence</p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-3 px-2">
                  <div className="w-12 h-12 bg-brand-green-light rounded-full flex items-center justify-center text-brand-green">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <p className="text-[13px] lg:text-sm font-bold text-brand-primary-blue leading-snug">Committed to<br />Sustainability</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {/* Section 1: Intro */}
            <div className="mb-6">
              <span className="uppercase tracking-widest font-bold text-brand-green text-sm mb-3 block">
                ABOUT US
              </span>
              <h2 className="text-3xl md:text-3xl lg:text-[2 rem] font-extrabold text-brand-primary-blue leading-[1.15] mb-3 tracking-tight">
                From Environmental Challenges To Engineered Solutions
              </h2>
              <p className="text-md md:text-md font-bold text-brand-green mb-6 leading-snug">
                Consultancy • Research • Laboratory <i> - ONE STOP SOLUTION</i><br />
              </p>
              <div className="text-gray-600 space-y-5 text-base lg:text-s leading-relaxed text-justify font-medium">
                <p>
                  OCEAO-ENVIRO Management Solutions (India) Pvt. Ltd. is a multidisciplinary environmental organization specializing in engineering consultancy, scientific research, analytical laboratory services, and project management. Since 2015, we have delivered innovative, data-driven, and regulatory-compliant solutions, combining technical expertise, accredited testing, and engineering excellence to help industries and government organizations address complex environmental challenges with confidence.                </p>
              </div>
            </div>

            {/* Section 2: Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {/* Card 1 */}
              <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xl shadow-gray-200/30 hover:shadow-2xl transition-all flex flex-col items-start group">
                <div className="flex items-center gap-3 mb-4 w-full">
                  <div className="w-12 h-12 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Leaf className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-brand-primary-blue text-sm md:text-base leading-tight">Environmental Solutions</h3>
                </div>
                <div className="w-full h-px bg-brand-green/20 mb-4"></div>
                <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed font-medium">
                  Expert environmental consultancy, impact assessments, statutory compliance, ESG advisory, renewable energy, and sustainable project management.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xl shadow-gray-200/30 hover:shadow-2xl transition-all flex flex-col items-start group">
                <div className="flex items-center gap-3 mb-4 w-full">
                  <div className="w-12 h-12 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-brand-primary-blue text-sm md:text-base leading-tight">Sustainable<br />Research</h3>
                </div>
                <div className="w-full h-px bg-brand-green/20 mb-4"></div>
                <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed font-medium">
                  Advanced environmental research, pollution studies, hydrogeological investigations, monitoring, and scientific analysis for informed decision-making.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xl shadow-gray-200/30 hover:shadow-2xl transition-all flex flex-col items-start group">
                <div className="flex items-center gap-3 mb-4 w-full">
                  <div className="w-12 h-12 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-brand-primary-blue text-sm md:text-base leading-tight">Laboratory<br />Services</h3>
                </div>
                <div className="w-full h-px bg-brand-green/20 mb-4"></div>
                <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed font-medium">
                  NABL-accredited testing for air, water, soil, emissions, noise, and environmental quality monitoring.
                </p>
              </div>
            </div>

            {/* Section 3: Quote
            <div className="bg-brand-green-light/50 border border-brand-green/20 rounded-2xl p-5 md:p-6 flex items-start sm:items-center gap-4 hover:bg-brand-green-light/80 transition-colors">
              <Leaf className="w-6 h-6 text-brand-green flex-shrink-0 mt-1 sm:mt-0" />
              <p className="text-brand-primary-blue font-bold text-base md:text-lg leading-snug">
                "Built on Science. Driven by Engineering. Trusted by Industry."
              </p>
            </div> */}
          </div>

        </div>
        {/* Section 3: Quote */}
        <div className="bg-brand-green-light/50 border border-brand-green/20 rounded-2xl p-5 md:p-6 flex items-center justify-center sm:items-center gap-4 hover:bg-brand-green-light/80 transition-colors w-full">
          <Leaf className="w-6 h-6 text-brand-green flex-shrink-0 mt-1 sm:mt-0" />
          <p className="text-brand-primary-blue font-bold text-base md:text-lg leading-snug">
            "Built on Science. Driven by Engineering. Trusted by Industry."
          </p>
        </div>
      </div>
    </section>
  );
}
