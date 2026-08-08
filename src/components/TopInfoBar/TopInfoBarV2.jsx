import React from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../../assets/logos/company-logo.png';
import nablLogo from '../../assets/logos/nabl-logo.png';

// QCI and NABET logos are remote for now, as specified in the document
const qciLogo = 'https://qcin.org/wp-content/uploads/2026/02/QCI-Logo-with-Hindi-1.webp';
const nabetLogo = 'https://nabet.qci.org.in/wp-content/uploads/2026/06/NABET-logo.svg';

export default function TopInfoBarV2() {
  return (
    <div className="w-full bg-gradient-to-b from-white/100 to-white/40 py-4 hidden md:block relative z-50">
      <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-4 flex justify-between items-centre">

        {/* Left Side: Logo and Tagline */}
        <div className="flex items-start justify-start gap-2">
          <Link to="/">
            <img src={companyLogo} alt="Oceao-Enviro Logo" className="h-32 w-auto object-contain" />
          </Link>
          <div className="w-px h-24 bg-orange-400 mx-2 mt-3 hidden lg:block"></div>
          <div className="hidden pt-3 lg:flex flex-col items-center text-base font-bold tracking-wide">
            <span className="bg-gradient-to-r from-[#011539] to-[#017119] bg-clip-text text-transparent">
              Oceao Enviro Management Solutions Ind. Pvt. Ltd.
            </span>

            <span className="bg-gradient-to-r from-[#017119] to-[#011539] bg-clip-text text-transparent">
              Oceao Enviro Research & Analytics Laboratories Ind. Pvt. Ltd.
            </span>

            <div className="flex items-center w-full my-1">
              <div className="flex-grow h-[1px] bg-[#6B8E23]"></div>
              <div className="mx-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5 16C11.5 16 10 9 5.5 5.5C5.5 5.5 1.5 7.5 1.5 12.5C1.5 17.5 11.5 16 11.5 16Z" fill="#81C784" />
                  <path d="M12.5 16C12.5 16 14 9 18.5 5.5C18.5 5.5 22.5 7.5 22.5 12.5C22.5 17.5 12.5 16 12.5 16Z" fill="#2E7D32" />
                  <path d="M12 16L12 19" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div className="flex-grow h-[1px] bg-[#6B8E23]"></div>
            </div>

            <div className="text-sm font-bold tracking-wider mt-0.5">
              <span className="text-[#1b3664]">Science. </span>
              <span className="text-[#419445]">Sustainability. </span>
              <span className="text-[#e66c25]">Solutions.</span>
            </div>
          </div>

        </div>

        {/* Right Side: Accreditation Logos */}
        <div className="flex items-center gap-1.5">
          <div className="w-px h-24 bg-orange-400 mx-1 mb-1 hidden lg:block"></div>
          <img src={qciLogo} alt="Quality Council of India" className="h-12 w-auto object-contain" />
          <div className="w-px h-16 bg-orange-400 ml-1 hidden lg:block"></div>
          <img src={nabetLogo} alt="NABET Accredited" className="h-12 w-auto object-contain" />
          <div className="w-px h-16 bg-orange-400 mr-1 hidden lg:block"></div>
          <img src={nablLogo} alt="NABL Accredited" className="h-14 w-auto object-contain" />
        </div>

      </div>
    </div>
  );
}
