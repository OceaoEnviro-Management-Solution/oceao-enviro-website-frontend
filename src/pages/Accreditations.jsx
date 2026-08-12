import { useState, useMemo } from 'react';
import AccreditationsHero from '../components/Accreditations/AccreditationsHero';
import AccreditationsSidebar from '../components/Accreditations/AccreditationsSidebar.jsx';
import AccreditationsMain from '../components/Accreditations/AccreditationsMain.jsx';
import { certifications, certificateCategories } from '../constants/certifications.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';

export default function Accreditations() {
  const [searchQuery, setSearchQuery] = useState('');

  // Get array of section IDs for scroll spy
  const sectionIds = useMemo(() => certificateCategories.map(c => c.id), []);
  const activeId = useScrollSpy(sectionIds, 150); // 150px offset

  // Filter and group certificates based on search query
  const { filteredCategories, groupedCertificates } = useMemo(() => {

    // 1. Filter certifications by search query
    const filteredCerts = certifications.filter(cert => {
      if (!searchQuery) return true;
      const lowerQuery = searchQuery.toLowerCase();
      return (
        cert.name.toLowerCase().includes(lowerQuery) ||
        cert.category.toLowerCase().includes(lowerQuery) ||
        cert.description.toLowerCase().includes(lowerQuery)
      );
    });

    // 2. Group the filtered certificates by category
    const grouped = certificateCategories.map(cat => ({
      ...cat,
      certificates: filteredCerts.filter(c => c.category === cat.label)
    })).filter(cat => cat.certificates.length > 0); // Only keep categories that have matching certs

    // 3. Update category counts for sidebar to reflect filtered results
    const categoriesWithUpdatedCounts = certificateCategories.map(cat => {
      const matchCount = filteredCerts.filter(c => c.category === cat.label).length;
      return { ...cat, count: matchCount };
    });

    return {
      filteredCategories: categoriesWithUpdatedCounts,
      groupedCertificates: grouped
    };

  }, [searchQuery]);

  return (
    <main className="w-full bg-white pb-20">
      <AccreditationsHero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 relative">
        <div className="flex flex-col md:flex-row md:items-start">

          {/* Sidebar */}
          <AccreditationsSidebar
            categories={filteredCategories}
            activeId={activeId}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Main Content Area */}
          <div className="flex-1 md:pl-8 lg:pl-12 mt-6 md:mt-0">
            <AccreditationsMain
              groupedCertificates={groupedCertificates}
              searchQuery={searchQuery}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
