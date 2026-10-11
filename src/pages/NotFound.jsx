// NotFound.jsx — Catch-all page for any address no route matches (rendered inside MainLayout,
// so the navbar and footer stay). Same hero as the booking pages.

import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-white">

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative w-full h-[200px] md:h-[280px] bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-[#017119]/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#FFA500]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#0F1D75]/5 blur-3xl" />

        <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#017119]/15 mb-3">
            <Compass className="w-5 h-5 text-[#017119]" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#017119] mb-2">
            Oceao Enviro Group
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75] mb-2">
            Page Not Found
          </h1>
          <p className="text-base md:text-lg text-[#011539]/70 font-medium max-w-md mx-auto">
            The page you are looking for does not exist or has moved
          </p>
        </div>
      </section>

      {/* ── CONTENT SECTION ───────────────────────────────────────────────── */}
      <div className="flex justify-center py-10 px-4">
        <Link
          to="/"
          className="px-5 py-3.5 bg-[#017119] text-white font-semibold text-sm rounded-xl
            hover:bg-[#014D11] active:scale-[0.98] transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
