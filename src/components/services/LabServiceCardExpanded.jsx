// LabServiceCardExpanded.jsx — Expanded lab test card content
// Shows: Description + Parameters as 2-column bullet list | CTA buttons
// Desktop: 70/30 grid | Mobile: stacked
// Parameters: split by comma → 2 balanced columns of bullet points
// Placeholder: parameters null → row hidden entirely (no broken look on collapsed state)

import { Link } from 'react-router-dom';

/** Split array into two columns of equal (or near-equal) height */
function splitIntoTwoColumns(arr) {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

/** Renders parameters as 2-column bullet list */
function ParametersList({ parametersString }) {
  const items = parametersString.split(',').map((p) => p.trim()).filter(Boolean);
  const [colA, colB] = splitIntoTwoColumns(items);

  return (
    <div>
      <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#0F1D75] mb-3">
        Parameters Tested
        <span
          className="px-2.5 py-0.5 rounded-full bg-brand-orange text-brand-primary-blue text-xs font-bold normal-case tracking-normal"
          aria-label={`${items.length} parameters`}
        >
          {items.length}
        </span>
      </h4>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 bg-white border border-gray-100 rounded-lg px-4 py-3">
        {/* Column A */}
        <ul className="space-y-1.5">
          {colA.map((param, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#017119] shrink-0" aria-hidden="true" />
              {param}
            </li>
          ))}
        </ul>
        {/* Column B */}
        <ul className="space-y-1.5">
          {colB.map((param, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#017119] shrink-0" aria-hidden="true" />
              {param}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function LabServiceCardExpanded({ item }) {
  const hasParameters = Boolean(item.parameters);

  return (
    <div className="border-t border-gray-100 bg-[#F8FAF8] px-6 py-6 animate-in fade-in slide-in-from-top-2 duration-200">

      {/* ── Desktop: 70 / 30 grid ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_280px] gap-8">

        {/* Left 70% — description + parameters */}
        <div className="space-y-5">
          <p className="text-gray-700 leading-relaxed">{item.description}</p>
          {hasParameters && <ParametersList parametersString={item.parameters} />}
        </div>

        {/* Right 30% — CTA buttons */}
        <div className="flex flex-col gap-3 pt-1">
          <Link
            to="/contact/quick-contact"
            id={`lab-cta-quick-contact-${item.id}`}
            className="w-full px-5 py-3 bg-[#017119] hover:bg-[#014D11] text-white text-sm font-semibold rounded-xl text-center transition-colors duration-200 shadow-sm hover:shadow"
          >
            Quick Contact
          </Link>
          <Link
            to="/booking-vm"
            id={`lab-cta-book-meeting-${item.id}`}
            className="w-full px-5 py-3 bg-[#0F1D75] hover:bg-[#0A1350] text-white text-sm font-semibold rounded-xl text-center transition-colors duration-200 shadow-sm hover:shadow"
          >
            Book Virtual Meeting
          </Link>
        </div>
      </div>

      {/* ── Mobile: stacked layout ── */}
      <div className="md:hidden space-y-5">
        <p className="text-gray-700 leading-relaxed">{item.description}</p>
        {hasParameters && <ParametersList parametersString={item.parameters} />}
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
