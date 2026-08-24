// MissionSection.jsx — Mission block: text LEFT, illustration RIGHT (alternating from Vision)
// Desktop: text-left, icon-right | Mobile: stacked (text top, illustration bottom)

import { visionMission } from '../../constants/visionMission';

// ── Inline SVG: Winding Path / Journey Illustration ──────────────────────────
function PathIllustration() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-md"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="pathBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EAEBF7" />
          <stop offset="100%" stopColor="#E4F3E6" />
        </radialGradient>
        <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0F1D75" />
          <stop offset="100%" stopColor="#017119" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle cx="100" cy="100" r="96" fill="url(#pathBg)" />

      {/* Horizon / ground */}
      <ellipse cx="100" cy="155" rx="85" ry="12" fill="#E4F3E6" opacity="0.8" />

      {/* Winding road — main path */}
      <path
        d="M 20 175 Q 60 155 80 130 Q 100 105 100 80 Q 100 55 120 38"
        stroke="url(#roadGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.85"
      />

      {/* Road edges (dashed center line feel) */}
      <path
        d="M 26 170 Q 65 150 84 126 Q 103 102 103 78 Q 103 53 122 36"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 6"
        fill="none"
        opacity="0.5"
      />

      {/* Destination marker — circle at top of path */}
      <circle cx="120" cy="38" r="10" fill="#017119" />
      <circle cx="120" cy="38" r="6" fill="white" />
      <circle cx="120" cy="38" r="3" fill="#017119" />

      {/* Start point */}
      <circle cx="20" cy="175" r="7" fill="#0F1D75" opacity="0.5" />
      <circle cx="20" cy="175" r="4" fill="white" opacity="0.7" />

      {/* Milestone dots along path */}
      <circle cx="65" cy="142" r="4" fill="#69b821" opacity="0.7" />
      <circle cx="90" cy="108" r="4" fill="#FFA500" opacity="0.7" />

      {/* Trees / environment elements */}
      <circle cx="148" cy="120" r="16" fill="#69b821" opacity="0.25" />
      <rect x="146" y="132" width="4" height="18" rx="2" fill="#014D11" opacity="0.2" />

      <circle cx="40" cy="110" r="12" fill="#017119" opacity="0.2" />
      <rect x="38" y="120" width="4" height="14" rx="2" fill="#014D11" opacity="0.15" />

      {/* Sun / goal at top */}
      <circle cx="160" cy="40" r="18" fill="#FFE7B8" opacity="0.6" />
      <circle cx="160" cy="40" r="10" fill="#FFA500" opacity="0.5" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
const { mission } = visionMission;

export default function MissionSection() {
  return (
    <section
      aria-label="Our Mission"
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row-reverse items-center gap-0">

        {/* RIGHT (rendered last on desktop via flex-row-reverse) — Illustration */}
        <div className="w-full lg:w-[280px] xl:w-[320px] flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#EAEBF7]/60 to-[#FFE7B8]/40 p-10 lg:p-12 lg:self-stretch order-first lg:order-none">
          <div className="w-40 h-40 lg:w-48 lg:h-48">
            <PathIllustration />
          </div>
        </div>

        {/* LEFT — Text */}
        <div className="flex-1 p-8 lg:p-12 xl:p-14 space-y-5">
          {/* Section label */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-[#FFA500]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#E69500]">
              {mission.title}
            </span>
          </div>

          {/* Mission statement */}
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75] leading-snug">
            {mission.statement}
          </h2>

          {/* Divider */}
          <div className="w-12 h-0.5 bg-[#FFA500]/40 rounded-full" />

          {/* Description */}
          <p className="text-gray-600 text-base leading-[1.8]">
            {mission.description}
          </p>
        </div>
      </div>
    </section>
  );
}
