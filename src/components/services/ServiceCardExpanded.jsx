// ServiceCardExpanded.jsx — Expanded content with 70/30 desktop layout
// Desktop (≥768px): 70% description + key areas | 30% CTA buttons
// Mobile (<768px): stacked — description → key areas → buttons

import { Link } from 'react-router-dom';

export default function ServiceCardExpanded({ item }) {
  return (
    <div className="border-t border-gray-100 bg-[#F8FAF8] px-6 py-6 animate-in fade-in slide-in-from-top-2 duration-200">
      {/* ── Desktop: 70 / 30 grid ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_280px] gap-8">
        {/* Left 70% — description + key areas */}
        <div>
          <p className="text-gray-700 leading-relaxed mb-5">{item.description}</p>

          <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F1D75] mb-3">
            Key Areas
          </h4>
          <ul className="space-y-2">
            {item.keyAreas.map((area, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#017119] shrink-0" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        {/* Right 30% — CTA buttons */}
        <div className="flex flex-col gap-3 pt-1">
          <Link
            to="/contact/quick-contact"
            id={`cta-quick-contact-${item.id}`}
            className="w-full px-5 py-3 bg-[#017119] hover:bg-[#014D11] text-white text-sm font-semibold rounded-xl text-center transition-colors duration-200 shadow-sm hover:shadow"
          >
            Quick Contact
          </Link>
          <Link
            to="/booking-vm"
            id={`cta-book-meeting-${item.id}`}
            className="w-full px-5 py-3 bg-[#0F1D75] hover:bg-[#0A1350] text-white text-sm font-semibold rounded-xl text-center transition-colors duration-200 shadow-sm hover:shadow"
          >
            Book Virtual Meeting
          </Link>
        </div>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="md:hidden space-y-5">
        <p className="text-gray-700 leading-relaxed">{item.description}</p>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F1D75] mb-3">
            Key Areas
          </h4>
          <ul className="space-y-2">
            {item.keyAreas.map((area, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#017119] shrink-0" aria-hidden="true" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            to="/contact/quick-contact"
            className="w-full px-5 py-3 bg-[#017119] hover:bg-[#014D11] text-white text-sm font-semibold rounded-xl text-center transition-colors duration-200"
          >
            Quick Contact
          </Link>
          <Link
            to="/booking-vm"
            className="w-full px-5 py-3 bg-[#0F1D75] hover:bg-[#0A1350] text-white text-sm font-semibold rounded-xl text-center transition-colors duration-200"
          >
            Book Virtual Meeting
          </Link>
        </div>
      </div>
    </div>
  );
}
