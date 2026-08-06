import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
import { navItems, ctaButtons } from '../../constants/navigation';
import companyLogo from '../../assets/logos/company-logo2.png';

export default function MobileDrawer({ isOpen, onClose }) {
  const [expandedItems, setExpandedItems] = useState({});
  const location = useLocation();

  const toggleAccordion = (id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-[300px] max-w-[85vw] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link to="/" onClick={onClose}>
            <img src={companyLogo} alt="Oceao-Enviro" className="h-8 w-auto object-contain" />
          </Link>
          <button 
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-gray-500 hover:text-brand-orange transition-colors rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const isExpanded = expandedItems[item.id];

              return (
                <li key={item.id} className="border-b border-gray-50 last:border-none">
                  {item.hasDropdown ? (
                    <div>
                      <button 
                        className={`w-full flex items-center justify-between px-6 py-4 text-left font-semibold transition-colors ${
                          isExpanded || isActive ? 'text-brand-blue bg-blue-50/50' : 'text-gray-700 hover:text-brand-blue'
                        }`}
                        onClick={() => toggleAccordion(item.id)}
                      >
                        {item.label}
                        <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isExpanded && (
                        <ul className="bg-gray-50 px-6 py-2 pb-4 space-y-1 animate-in slide-in-from-top-1 fade-in duration-200">
                          {item.children.map((child, childIdx) => (
                            <li key={childIdx}>
                              <Link 
                                to={child.href}
                                className="flex items-center gap-2 py-2.5 text-sm font-medium text-gray-600 hover:text-brand-green"
                                onClick={onClose}
                              >
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link 
                      to={item.href}
                      className={`block px-6 py-4 font-semibold transition-colors ${
                        isActive ? 'text-brand-blue bg-blue-50/50' : 'text-gray-700 hover:text-brand-blue'
                      }`}
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <Link 
            to={ctaButtons.quote.href}
            onClick={onClose}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-brand-green text-white font-semibold rounded-full hover:bg-green-700 transition-colors shadow-sm"
          >
            {ctaButtons.quote.text}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
