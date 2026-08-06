import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, ArrowRight } from 'lucide-react';
import { navItems, ctaButtons } from '../../constants/navigation';
import NavDropdown from './NavDropdown';
import companyLogo from '../../assets/logos/company-logo2.png';

export default function NavbarV2({ onOpenMobileDrawer }) {
  const [isSticky, setIsSticky] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const timeoutRef = React.useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Small threshold to add sticky effects like shadow
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownToggle = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleMouseEnter = (id) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 250);
  };

  return (
    <>
      {/* 
        Desktop Navbar Wrapper
        Takes up full width but the inner pill is constrained and centered.
      */}
      <div className={`hidden lg:block sticky top-0 z-40 w-full transition-all duration-300 ${isSticky ? 'pt-0 pb-2 px-0' : 'pt-3 pb-2 px-4 sm:px-6'}`}>
        <nav
          className={`mx-auto max-w-7xl bg-white flex items-center justify-between px-6 py-3 transition-all duration-300 border border-gray-100 ${isSticky ? 'rounded-none shadow-md' : 'rounded-full shadow-sm'
            }`}
        >
          {/* Nav Items */}
          <div className="flex items-center space-x-2 relative">
            {navItems.map((item) => {
              const isOpen = openDropdown === item.id;

              return (
                <div
                  key={item.id}
                  className="relative group"
                  onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.id)}
                  onMouseLeave={() => item.hasDropdown && handleMouseLeave()}
                >
                  {item.hasDropdown ? (
                    <button
                      className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold transition-colors ${isOpen
                          ? 'bg-brand-blue text-white'
                          : 'text-brand-blue hover:bg-brand-blue hover:text-white'
                        }`}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() => handleDropdownToggle(item.id)}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className="block px-4 py-2 rounded-full text-sm font-semibold transition-colors text-brand-blue hover:bg-brand-blue hover:text-white"
                    >
                      {item.label}
                    </Link>
                  )}

                  {item.hasDropdown && (
                    <NavDropdown
                      item={item}
                      isOpen={isOpen}
                      onClose={() => setOpenDropdown(null)}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-gray-400 hover:text-brand-blue transition-colors rounded-full hover:bg-gray-50"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <Link
              to={ctaButtons.quote.href}
              className="flex items-center gap-2 bg-brand-green hover:bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm hover:shadow"
            >
              {ctaButtons.quote.text}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </nav>
      </div>

      {/* 
        Mobile Top Navbar
        Simplified, sticky at the top, visible only below lg breakpoint.
      */}
      <div className={`lg:hidden sticky top-0 z-40 w-full bg-white transition-shadow duration-300 ${isSticky ? 'shadow-sm' : ''}`}>
        <div className="px-4 h-16 flex items-center justify-between">
          <Link to="/">
            <img src={companyLogo} alt="Oceao-Enviro Logo" className="h-10 w-auto object-contain" />
          </Link>

          <div className="flex items-center gap-2">
            <button
              className="p-2 text-gray-500 hover:text-brand-blue transition-colors rounded-full"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>
            <button
              onClick={onOpenMobileDrawer}
              className="p-2 text-gray-500 hover:text-brand-blue transition-colors rounded-full"
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
