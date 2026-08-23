// CompanyProfileTabs.jsx — Tab switcher controller for Company Profile
// Manages active tab state and passes company data to CompanySection
// Supports optional URL query param: ?company=management-solutions | research-labs

import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { companies } from '../../constants/companies';
import CompanySection from './CompanySection';

export default function CompanyProfileTabs() {
  // Read initial tab from URL query param, default to first company
  const getInitialTab = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const companyParam = params.get('company');
      if (companyParam && companies.find((c) => c.id === companyParam)) {
        return companyParam;
      }
    }
    return companies[0].id;
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const activeCompany = companies.find((c) => c.id === activeTab);

  // Sync tab state with URL query param
  const handleTabChange = (companyId) => {
    if (companyId === activeTab) return;

    // Fade out, switch, fade in
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(companyId);
      setIsTransitioning(false);

      // Update URL without page reload
      const url = new URL(window.location.href);
      url.searchParams.set('company', companyId);
      window.history.replaceState(null, '', url.toString());
    }, 200);
  };

  const tabIcons = {
    'management-solutions': Icons.Building2,
    'research-labs': Icons.FlaskConical,
  };

  return (
    <div>
      {/* ── Tab Bar ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex" role="tablist" aria-label="Company selector">
            {companies.map((company) => {
              const isActive = company.id === activeTab;
              const TabIcon = tabIcons[company.id] ?? Icons.Building2;

              return (
                <button
                  key={company.id}
                  id={`tab-${company.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`tabpanel-${company.id}`}
                  onClick={() => handleTabChange(company.id)}
                  className={`
                    relative flex items-center gap-2 px-5 py-4 text-sm font-semibold
                    transition-all duration-200 border-b-2 -mb-px
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-[#017119] focus-visible:ring-offset-2
                    ${
                      isActive
                        ? 'border-[#017119] text-[#017119] bg-[#E4F3E6]/40'
                        : 'border-transparent text-gray-500 hover:text-[#0F1D75] hover:border-gray-300'
                    }
                  `}
                >
                  <TabIcon
                    className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#017119]' : 'text-gray-400'}`}
                  />
                  <span className="hidden sm:inline">{company.name}</span>
                  <span className="sm:hidden">
                    {company.id === 'management-solutions' ? 'Management' : 'Research & Labs'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Tab Panel ───────────────────────────────────────────────────── */}
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        {activeCompany && <CompanySection company={activeCompany} />}
      </div>
    </div>
  );
}
