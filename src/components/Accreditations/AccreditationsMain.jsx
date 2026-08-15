import CertificateCard from './CertificateCard';

export default function AccreditationsMain({ groupedCertificates, searchQuery }) {
  if (groupedCertificates.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-lg border border-gray-200 mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No certificates found</h3>
        <p className="text-gray-500">
          Try adjusting your search query "{searchQuery}" to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {groupedCertificates.map((group) => (
        <div key={group.id} id={group.id} className="mb-12 pt-4">
          
          {/* Section Heading */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75]">
              {group.label} {group.label.includes('Accreditation') || group.label.includes('India') ? '' : 'Certifications'}
            </h2>
            <hr className="mt-4 border-gray-200" />
          </div>

          {/* Cards Grid - 1 column layout as cards are wide (horizontal) */}
          <div className="flex flex-col gap-6">
            {group.certificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
