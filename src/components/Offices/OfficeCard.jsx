import { MapPin, Navigation } from 'lucide-react';

export default function OfficeCard({ office }) {
  const isHeadOffice = office.badge === 'Head Office';

  return (
    <div className="group relative bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Decorative background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E4F3E6]/0 to-[#FFE7B8]/0 group-hover:from-[#E4F3E6]/40 group-hover:to-[#FFE7B8]/40 transition-colors duration-500 pointer-events-none" />

      {/* Badge */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <span
          className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full 
            ${isHeadOffice 
              ? 'bg-[#FFE7B8] text-[#E69500]' 
              : 'bg-[#E4F3E6] text-[#017119]'
            }`}
        >
          {office.badge}
        </span>
      </div>

      {/* City */}
      <h3 className="relative z-10 text-2xl font-bold text-[#0F1D75] mb-4">
        {office.city}
      </h3>

      {/* Address */}
      <div className="relative z-10 flex items-start gap-3 text-gray-600 mb-8 flex-grow">
        <MapPin className="w-5 h-5 text-[#017119] flex-shrink-0 mt-0.5" strokeWidth={2} />
        <p className="text-sm leading-relaxed">
          {office.address}
        </p>
      </div>

      {/* Action Button */}
      <a
        href={office.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 inline-flex items-center justify-center w-full gap-2 px-6 py-3 bg-[#0F1D75] text-white rounded-xl font-medium shadow-md hover:bg-[#0A1350] hover:shadow-lg transition-all duration-200"
      >
        <Navigation className="w-4 h-4" />
        <span>Get Directions</span>
      </a>
    </div>
  );
}
