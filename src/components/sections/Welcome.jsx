import React from 'react';
import { Award, Calendar, MapPin, Leaf, Microscope, FlaskConical } from 'lucide-react';
import envEarth from '../../assets/images/homePage/AboutSection/EnviornmentEarth.png';
import envResearch from '../../assets/images/homePage/AboutSection/EnvironmentResearch.png';
import labTesting from '../../assets/images/homePage/AboutSection/LabTesting.jpg';

export default function Welcome() {
  return (
    <section className="py-12 lg:py-20 bg-white relative overflow-hidden min-h-[100vh] flex items-center">
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {/* Section 1: Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 overflow-hidden rounded-3xl">
                <img
                  src={envEarth}
                  alt="Environmental Earth"
                  className="w-full h-[200px] lg:h-[300px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={labTesting}
                  alt="Lab Testing"
                  className="w-full h-[200px] lg:h-[260px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={envResearch}
                  alt="Environmental Research"
                  className="w-full h-[200px] lg:h-[260px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Section 2: Highlights */}
            <div className="bg-brand-white shadow-xl shadow-gray-200/50 rounded-3xl p-6 border border-gray-50 mt-2">
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
            {/* Section 3: Quote */}
            <div className="bg-brand-green-light/50 border border-brand-green/20 rounded-2xl p-5 md:p-6 flex items-start sm:items-center gap-4 hover:bg-brand-green-light/80 transition-colors">
              <Leaf className="w-6 h-6 text-brand-green flex-shrink-0 mt-1 sm:mt-0" />
              <p className="text-brand-primary-blue font-bold text-base md:text-lg leading-snug">
                "Built on Science. Driven by Engineering. Trusted by Industry."
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            {/* Section 1: Intro */}
            <div className="mb-10">
              <span className="uppercase tracking-widest font-bold text-brand-green text-sm mb-4 block">
                ABOUT US
              </span>
              <h2 className="text-3xl md:text-3xl lg:text-[2.25rem] font-extrabold text-brand-primary-blue leading-[1.15] mb-6 tracking-tight">
                From Environmental Challenges To Engineered Solutions
              </h2>
              <p className="text-lg md:text-lg font-bold text-brand-green mb-6 leading-snug">
                Consultancy • Research • Laboratory <br />
                <p className="text-lg md:text-sm text-brand-green mb-6 leading-snug"><i>-All Under One Roof</i></p>
              </p>
              <div className="text-gray-600 space-y-5 text-base lg:text-lg leading-relaxed text-justify font-medium">
                <p>
                  OCEAO-ENVIRO Management Solutions (India) Pvt. Ltd. is a multidisciplinary organization specializing in environmental engineering, project consultancy, scientific research, and analytical laboratory services. Since 2015, we have partnered with industries, infrastructure developers, and government organizations to deliver technically sound, compliant, and data-driven environmental solutions.
                </p>
                <p>
                  From environmental assessments and statutory clearances to advanced research, accredited laboratory testing, and project implementation, our integrated approach ensures every decision is backed by expertise, precision, and measurable results. We don't just solve environmental challenges—we engineer practical solutions that create long-term value for our clients.
                </p>
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
                  <h3 className="font-bold text-brand-primary-blue text-sm md:text-base leading-tight">Environmental Engineering</h3>
                </div>
                <div className="w-full h-px bg-brand-green/20 mb-4"></div>
                <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed font-medium">
                  Environmental consultancy, impact assessment, statutory compliance, ESG, and project advisory.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-gray-100 rounded-3xl p-5 shadow-xl shadow-gray-200/30 hover:shadow-2xl transition-all flex flex-col items-start group">
                <div className="flex items-center gap-3 mb-4 w-full">
                  <div className="w-12 h-12 rounded-full bg-brand-green-light flex items-center justify-center text-brand-green flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-brand-primary-blue text-sm md:text-base leading-tight">Scientific<br />Research</h3>
                </div>
                <div className="w-full h-px bg-brand-green/20 mb-4"></div>
                <p className="text-gray-500 text-[13px] md:text-sm leading-relaxed font-medium">
                  Environmental studies, advanced analytics, hydrogeological investigations, and technical research.
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
                  NABL-accredited testing, environmental monitoring, sample analysis, and quality assurance.
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
      </div>
    </section>
  );
}
