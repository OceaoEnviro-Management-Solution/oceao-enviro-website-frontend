import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, FileText } from 'lucide-react';
import { ctaButtons } from '../../constants/navigation';

export default function BottomMobileBar({ onOpenMobileDrawer }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-white rounded-t-2xl shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center pb-[max(8px,env(safe-area-inset-bottom))] pt-2 px-2 z-30">
      
      {/* Search Button */}
      <button className="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] text-gray-500 hover:text-brand-blue transition-colors rounded-xl active:bg-gray-50">
        <Search className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-medium">Search</span>
      </button>

      {/* Quote Button (Prominent) */}
      <Link 
        to={ctaButtons.quote.href}
        className="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] text-brand-green hover:text-green-700 transition-colors rounded-xl active:bg-gray-50 relative -top-2"
      >
        <div className="bg-brand-green text-white p-3 rounded-full shadow-lg mb-1 hover:bg-green-700 transition-colors">
          <FileText className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-medium">Quote</span>
      </Link>

      {/* Hamburger Button */}
      <button 
        onClick={onOpenMobileDrawer}
        className="flex flex-col items-center justify-center min-w-[64px] min-h-[44px] text-gray-500 hover:text-brand-blue transition-colors rounded-xl active:bg-gray-50"
      >
        <Menu className="w-5 h-5 mb-1" />
        <span className="text-[10px] font-medium">Menu</span>
      </button>

    </div>
  );
}
