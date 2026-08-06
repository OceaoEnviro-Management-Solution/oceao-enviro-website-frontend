import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocationCard({ city, badge, address, mapUrl }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <MapPin className="w-4 h-4 text-[#8ec63f] shrink-0" />
        <h4 className="font-semibold text-white text-base">{city}</h4>
        {badge && (
          <span className="px-1 text-[11px] font-medium text-[#8ec63f]">
            ({badge})
          </span>
        )}
      </div>
      <p className="text-xs text-gray-400 leading-relaxed pl-6">
        {address}
      </p>
      <a 
        href={mapUrl}
        target="_blank"
        rel="noreferrer"
        className="text-[11px] text-gray-500 hover:text-white transition-colors pl-6 mt-0.5 w-fit"
      >
        View on Google Maps →
      </a>
    </div>
  );
}
