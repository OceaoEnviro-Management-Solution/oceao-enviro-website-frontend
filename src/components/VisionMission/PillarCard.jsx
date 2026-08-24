// PillarCard.jsx — Reusable card for the "What Drives Us" pillar grid
// Accepts: icon (Lucide name), title, description, accentColor, bgColor

import * as Icons from 'lucide-react';

export default function PillarCard({ lucideIcon, title, description, accentColor, bgColor }) {
  const Icon = Icons[lucideIcon] ?? Icons.Circle;

  return (
    <div className="group flex flex-col items-center text-center p-6 bg-[#F9F9F9] border border-[#E8E8E8] rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      {/* Icon circle */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200"
        style={{ backgroundColor: bgColor }}
      >
        <Icon className="w-7 h-7" style={{ color: accentColor }} />
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-[#0F1D75] mb-3 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
