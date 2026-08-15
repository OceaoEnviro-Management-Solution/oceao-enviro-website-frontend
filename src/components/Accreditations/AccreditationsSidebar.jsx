import { useState } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';

export default function AccreditationsSidebar({ 
  categories, 
  activeId, 
  searchQuery, 
  setSearchQuery 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Get offset to account for sticky navbar (approx 80-100px depending on design)
      const offset = 120; 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false); // Close mobile menu on click
    }
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden sticky top-[80px] z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <span className="font-semibold text-[#0F1D75]">Filter Certificates</span>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {/* Sidebar Container */}
      <aside className={`
        ${mobileMenuOpen ? 'block' : 'hidden'} 
        md:block
        fixed md:sticky 
        top-[125px] md:top-[120px] 
        left-0 md:left-auto
        w-full md:w-[280px] lg:w-[300px] 
        h-auto md:h-[calc(100vh-120px)]
        bg-white md:bg-transparent
        z-30 md:z-auto
        border-b md:border-b-0 md:border-r border-gray-200 
        overflow-y-auto
        pb-6 md:pb-0
        shadow-md md:shadow-none
      `}>
        <div className="p-4 md:pr-6">
          
          {/* Search Box */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#017119] focus:border-[#017119]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Categories List */}
          <nav className="flex flex-col space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleScrollTo(cat.id)}
                className={`
                  w-full text-left px-4 py-3 rounded-md transition-all duration-200
                  ${activeId === cat.id && !searchQuery
                    ? 'bg-[#E4F3E6] border-l-4 border-[#017119] text-[#017119] font-semibold' 
                    : 'text-[#0F1D75] font-semibold border-l-4 border-transparent hover:bg-[#EAEBF7]'}
                `}
              >
                {cat.label} <span className="opacity-70 font-normal">({cat.count})</span>
              </button>
            ))}
          </nav>
          
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
