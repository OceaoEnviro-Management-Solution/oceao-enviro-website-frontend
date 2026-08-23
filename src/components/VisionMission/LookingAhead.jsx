// LookingAhead.jsx — Full-width closing banner with future-oriented content
// Inline SVG sunrise illustration, centered layout, gradient background

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { visionMission } from '../../constants/visionMission';

// ── Inline SVG: Sunrise / Horizon Illustration ────────────────────────────────
function SunriseIllustration() {
  return (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-28 h-28 md:w-36 md:h-36 drop-shadow-md mx-auto"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE7B8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#EAEBF7" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFA500" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFE7B8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sky backdrop */}
      <rect x="0" y="0" width="160" height="90" rx="8" fill="url(#skyFade)" />

      {/* Sun glow halo */}
      <circle cx="80" cy="70" r="40" fill="url(#sunGlow)" opacity="0.5" />

      {/* Sun body (half above horizon) */}
      <circle cx="80" cy="72" r="22" fill="#FFA500" opacity="0.9" />
      <circle cx="80" cy="72" r="16" fill="#FFD44A" />

      {/* Sun rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 80 + 26 * Math.cos(rad);
        const y1 = 72 + 26 * Math.sin(rad);
        const x2 = 80 + 36 * Math.cos(rad);
        const y2 = 72 + 36 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#FFA500"
            strokeWidth="2.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        );
      })}

      {/* Horizon line */}
      <line x1="4" y1="90" x2="156" y2="90" stroke="#017119" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

      {/* Ground strip */}
      <rect x="0" y="90" width="160" height="20" rx="4" fill="#E4F3E6" opacity="0.6" />

      {/* Silhouette trees (left) */}
      <rect x="18" y="78" width="5" height="16" rx="2" fill="#014D11" opacity="0.5" />
      <ellipse cx="20" cy="74" rx="9" ry="10" fill="#017119" opacity="0.5" />

      {/* Silhouette trees (right) */}
      <rect x="132" y="80" width="5" height="14" rx="2" fill="#014D11" opacity="0.5" />
      <ellipse cx="134" cy="76" rx="8" ry="9" fill="#017119" opacity="0.5" />

      {/* Birds (V shapes) */}
      <path d="M 44 38 Q 48 34 52 38" stroke="#0F1D75" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M 100 28 Q 105 23 110 28" stroke="#0F1D75" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
      <path d="M 58 18 Q 62 14 66 18" stroke="#0F1D75" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.35" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
const { lookingAhead } = visionMission;

export default function LookingAhead() {
  return (
    <section
      aria-label="Looking Ahead"
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#E4F3E6] via-white to-[#EAEBF7]/60"
    >
      {/* Decorative background blobs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#FFA500]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-[#017119]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-8 py-14 md:py-20 max-w-3xl mx-auto space-y-6">
        {/* Illustration */}
        <SunriseIllustration />

        {/* Label */}
        <div className="flex items-center justify-center gap-3">
          <span className="w-8 h-0.5 bg-[#017119]" />
          <p className="text-xs font-bold uppercase tracking-widest text-[#017119]">
            {lookingAhead.label}
          </p>
          <span className="w-8 h-0.5 bg-[#017119]" />
        </div>

        {/* Statement */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#0F1D75] leading-tight">
          {lookingAhead.statement}
        </h2>

        {/* Divider */}
        <div className="w-16 h-0.5 bg-[#017119]/30 rounded-full" />

        {/* Description */}
        <p className="text-gray-600 text-base leading-[1.8] max-w-2xl">
          {lookingAhead.description}
        </p>

        {/* CTA */}
        <Link
          to={lookingAhead.cta.link}
          id="looking-ahead-cta"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#69b821] to-[#0c591c] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg mt-2"
        >
          {lookingAhead.cta.text}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
