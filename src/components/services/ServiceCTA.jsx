// ServiceCTA.jsx — "Have a Requirement?" mid-page CTA section
// Appears between the accordion list and Explore Other Services

import { Link } from 'react-router-dom';

export default function ServiceCTA({ categoryName }) {
  return (
    <section
      aria-label="Service call to action"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] py-14 px-6 md:px-12 my-10"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full bg-[#017119]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -right-8 w-56 h-56 rounded-full bg-[#FFA500]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[#017119] mb-3">
          Get in Touch
        </p>
        <h3 className="text-2xl md:text-3xl font-bold text-[#0F1D75] mb-4 leading-snug">
          Have a {categoryName} Requirement?
        </h3>
        <p className="text-[#011539]/70 text-base mb-8 max-w-lg mx-auto">
          Tell us about your project and our team can help you identify the relevant service and develop a tailored approach.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/contact/quick-contact"
            id="service-cta-quick-contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#017119] hover:bg-[#014D11] text-white font-semibold text-sm transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Quick Contact
          </Link>
          <Link
            to="/booking-vm"
            id="service-cta-book-meeting"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-[#0F1D75] text-[#0F1D75] font-semibold text-sm hover:bg-[#0F1D75] hover:text-white transition-all duration-200"
          >
            Book a Virtual Meeting
          </Link>
        </div>
      </div>
    </section>
  );
}
