// VisionSection.jsx — Vision block: illustration LEFT, text RIGHT
// Desktop: side-by-side | Mobile: stacked (illustration top, text bottom)

import { visionMission } from '../../constants/visionMission';

// ── Inline SVG: Mountain Peak Illustration ────────────────────────────────────
function MountainIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-md"
      aria-hidden="true"
    >
      {/* Sky gradient background circle */}
      <defs>
        <radialGradient id="skyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E4F3E6" />
          <stop offset="100%" stopColor="#EAEBF7" />
        </radialGradient>
        <linearGradient id="peakGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#017119" />
          <stop offset="100%" stopColor="#014D11" />
        </linearGradient>
        <linearGradient id="midGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#69b821" />
          <stop offset="100%" stopColor="#017119" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="100" cy="100" r="96" fill="url(#skyGrad)" />

      {/* Far mountain (light) */}
      <polygon points="140,150 175,85 210,150" fill="#EAEBF7" opacity="0.8" />

      {/* Mid mountain */}
      <polygon points="70,155 120,70 170,155" fill="url(#midGrad)" />

      {/* Main peak (front, tallest) */}
      <polygon points="30,155 100,45 140,155" fill="url(#peakGrad)" />

      {/* Snow cap on main peak */}
      <polygon points="88,75 100,45 112,75" fill="white" opacity="0.85" />

      {/* Ground line */}
      <rect x="4" y="150" width="192" height="10" rx="4" fill="#014D11" opacity="0.15" />

      {/* Stars / dots */}
      <circle cx="55" cy="55" r="2.5" fill="#017119" opacity="0.4" />
      <circle cx="148" cy="42" r="1.8" fill="#017119" opacity="0.3" />
      <circle cx="165" cy="62" r="1.5" fill="#0F1D75" opacity="0.3" />
      <circle cx="38" cy="72" r="1.5" fill="#0F1D75" opacity="0.25" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
const { vision } = visionMission;

export default function VisionSection() {
  return (
    <section
      aria-label="Our Vision"
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-center gap-0">

        {/* LEFT — Illustration */}
        <div className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#E4F3E6]/60 to-[#EAEBF7]/40 p-10 lg:p-12 lg:self-stretch">
          <div className="w-40 h-40 lg:w-48 lg:h-48">
            <MountainIllustration />
          </div>
        </div>

        {/* RIGHT — Text */}
        <div className="flex-1 p-8 lg:p-12 xl:p-14 space-y-5">
          {/* Section label */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-[#017119]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#017119]">
              {vision.title}
            </span>
          </div>

          {/* Vision statement */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75] leading-snug">
            {vision.statement}
          </h2>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-[#017119]/30 rounded-full" />

          {/* Description */}
          <p className="text-gray-600 text-base leading-[1.8]">
            {vision.description}
          </p>
        </div>
      </div>
    </section>
  );
}
