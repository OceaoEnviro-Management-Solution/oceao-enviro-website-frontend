// ServicesHub.jsx — Main services landing page (/services)
// Hero with CTA + full interactive mega panel showing all categories

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ServicesHubMega from '../../components/services/ServicesHubMega';

export default function ServicesHub() {
  return (
    <main className="w-full bg-white">

      {/* ── Hero ── */}
      <section
        aria-label="Services hero"
        className="relative w-full py-20 md:py-28 bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] overflow-hidden flex items-center justify-center"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[#017119]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full bg-[#FFA500]/10 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-black/3 pointer-events-none" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Eyebrow */}
          <p className="text-sm font-bold uppercase tracking-widest text-[#017119] mb-4">
            Oceao Enviro
          </p>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F1D75] mb-5 leading-tight">
            Have an Environmental<br className="hidden sm:block" /> Requirement?
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-[#011539]/70 max-w-xl mx-auto mb-8">
            Tell us about your project and our team can help you identify the relevant service and develop a tailored approach.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact/quick-contact"
              id="hub-hero-quick-contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#017119] hover:bg-[#014D11] text-white font-semibold text-sm transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Quick Contact
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/booking-vm"
              id="hub-hero-book-meeting"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-[#0F1D75] text-[#0F1D75] font-semibold text-sm hover:bg-[#0F1D75] hover:text-white transition-all duration-200"
            >
              Book a Virtual Meeting
            </Link>
          </div>
        </div>
      </section>

      {/* ── Mega Panel ── */}
      <section aria-label="All services" className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-[#017119] mb-2">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F1D75]">
              Our Services
            </h2>
          </div>

          <ServicesHubMega />
        </div>
      </section>

    </main>
  );
}
