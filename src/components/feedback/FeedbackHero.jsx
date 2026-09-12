// FeedbackHero.jsx — Hero section for the Feedback & Complaint page.
// Uses the same gradient background as other pages (BookingSuccess, etc.).
// No image — gradient only, matching the uniform page hero style.

export default function FeedbackHero() {
  return (
    <section className="relative w-full h-[240px] md:h-[300px] bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] flex items-center justify-center overflow-hidden">

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute -top-10 -left-10 w-52 h-52 rounded-full bg-[#017119]/10 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 rounded-full bg-[#FFA500]/10 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#0F1D75]/5 blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Badge */}
        <p className="text-sm font-semibold uppercase tracking-widest text-[#017119] mb-3">
          Oceao Enviro Group
        </p>

        {/* Main heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75] mb-3">
          Your Feedback Matters
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-[#011539]/65 font-medium max-w-xl mx-auto leading-relaxed">
          Share your experience, suggestions, or concerns and help us improve our services.
        </p>

      </div>
    </section>
  );
}
