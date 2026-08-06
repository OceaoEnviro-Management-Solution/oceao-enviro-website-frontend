import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from '../../constants/footerLinks';
import { locationsData } from '../../constants/locations';
import { quickLinks } from '../../constants/quickLinks';
import AnimatedTagline from './AnimatedTagline';
import LocationCard from './LocationCard';
import SocialLinks from './SocialLinks';
import companyLogo from '../../assets/logos/company-logo2.png';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#011539] pt-12 pb-6 border-t-[4px] border-[#FDB813] relative overflow-hidden text-sm font-sans">

      {/* Decorative leaf watermark (approximate with inline SVG shape) */}
      <div className="absolute -bottom-20 left-1/3 opacity-5 pointer-events-none transform -rotate-12">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 8C8 10 5 16 5 22C11 22 17 19 22 13C23 12 17 8 17 8Z" />
          <path d="M12 2C8 4 5 10 5 16C11 16 16 13 21 7C22 6 16 2 12 2Z" />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-0">

          {/* Column 1: Brand & Tagline & Contact & Socials */}
          <div className="flex flex-col lg:col-span-4 lg:pr-8">
            <Link to="/" className="inline-block mb-2">
              <img
                src={companyLogo}
                alt="Oceao-Enviro Logo"
                className="h-16 w-auto object-contain brightness-100"
              />
            </Link>
            <AnimatedTagline />

            <div className="mt-8">
              <h4 className="font-semibold text-[#8ec63f] text-sm mb-4 uppercase tracking-wider">Get in Touch</h4>
              <div className="flex flex-col gap-3 text-gray-300">
                <a href="tel:+919999999999" className="flex items-center gap-3 hover:text-brand-orange transition-colors">
                  <Phone className="w-4 h-4 text-[#8ec63f]" />
                  <span>+91 99999 99999</span>
                </a>
                <a href="mailto:info@oceaoenviro.com" className="flex items-center gap-3 hover:text-brand-orange transition-colors">
                  <Mail className="w-4 h-4 text-[#8ec63f]" />
                  <span>info@oceaoenviro.com</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#8ec63f] shrink-0 mt-0.5" />
                  <span>Ghaziabad | Bhopal | Jammu</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#8ec63f] shrink-0 mt-0.5" />
                  <span>Mon - Sat: 9:30 AM - 6:30 PM</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <SocialLinks />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col lg:col-span-2 lg:px-6 lg:border-r border-white/10">
            <h4 className="font-semibold text-[#8ec63f] text-sm mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-brand-orange transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="text-gray-500 text-xs group-hover:text-brand-orange transition-colors">&gt;</span>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal & Policy Links */}
          <div className="flex flex-col lg:col-span-3 lg:px-8 lg:border-r border-white/10">
            <h4 className="font-semibold text-[#8ec63f] text-sm mb-6 uppercase tracking-wider">Legal &amp; Policy</h4>
            <ul className="flex flex-col gap-4">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-brand-orange transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="text-gray-500 text-xs group-hover:text-brand-orange transition-colors">&gt;</span>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div className="flex flex-col gap-8 lg:col-span-3 lg:pl-8">
            <h4 className="font-semibold text-[#8ec63f] text-sm mb-0 uppercase tracking-wider">Our Locations</h4>
            <div className="flex flex-col gap-5 mt-1">
              {locationsData.map((loc, index) => (
                <LocationCard key={index} {...loc} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400 relative z-10">
        <p>
          &copy; {currentYear} Oceao-Enviro Management Solutions &amp; Research &amp; Analytics Laboratories.<br className="hidden md:block" /> All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/privacy" className="hover:text-brand-orange transition-colors">Privacy Policy</Link>
          <span className="text-gray-600">|</span>
          <Link to="/terms" className="hover:text-brand-orange transition-colors">Terms &amp; Conditions</Link>
          <span className="text-gray-600">|</span>
          <Link to="/cookie" className="hover:text-brand-orange transition-colors">Cookie Policy</Link>
          <span className="text-gray-600">|</span>
          <Link to="/sitemap" className="hover:text-brand-orange transition-colors">Sitemap</Link>
        </div>

        {/* Decorative star on the right */}
        {/* <div className="absolute right-0 -top-8 text-white/20 hidden md:block">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        </div> */}
      </div>
    </footer>
  );
}
