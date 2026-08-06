import React from 'react';
import { Link } from 'react-router-dom';
import companyLogo from '../../assets/logos/company-logo.png';
import nablLogo from '../../assets/logos/nabl-logo.png';

// QCI and NABET logos are remote for now, as specified in the document
const qciLogo = 'https://qcin.org/wp-content/uploads/2026/02/QCI-Logo-with-Hindi-1.webp';
const nabetLogo = 'https://nabet.qci.org.in/wp-content/uploads/2026/06/NABET-logo.svg';

export default function TopInfoBarV2() {
  return (
    <div className="w-full bg-gradient-to-b from-white/100 to-transparent py-4 hidden md:block relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">

        {/* Left Side: Logo and Tagline */}
        <div className="flex items-center gap-4">
          <Link to="/">
            <img src={companyLogo} alt="Oceao-Enviro Logo" className="h-20 w-auto object-contain" />
          </Link>
          <div className="w-px h-20 bg-orange-400 mx-2 hidden lg:block"></div>
          <div className="hidden lg:flex flex-col text-base font-bold tracking-wide">
            <span className="bg-gradient-to-r from-[#011539] to-[#017119] bg-clip-text text-transparent">
              Oceao Enviro Management Solutions Ind. Pvt. Ltd.
            </span>

            <span className="bg-gradient-to-r from-[#017119] to-[#011539] bg-clip-text text-transparent">
              Oceao Enviro Research & Analytics Laboratories Ind. Pvt. Ltd.
            </span>
          </div>

        </div>

        {/* Right Side: Accreditation Logos */}
        <div className="flex items-center gap-1.5">
          <div className="w-px h-16 bg-orange-400 mx-2 hidden lg:block"></div>
          <img src={qciLogo} alt="Quality Council of India" className="h-16 w-auto object-contain" />
          <div className="w-px h-16 bg-orange-400 mx-2 hidden lg:block"></div>
          <img src={nabetLogo} alt="NABET Accredited" className="h-16 w-auto object-contain" />
          <div className="w-px h-16 bg-orange-400 mx-2 hidden lg:block"></div>
          <img src={nablLogo} alt="NABL Accredited" className="h-16 w-auto object-contain" />
        </div>

      </div>
    </div>
  );
}
