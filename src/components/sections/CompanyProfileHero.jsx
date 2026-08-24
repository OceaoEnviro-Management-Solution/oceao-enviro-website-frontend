// CompanyProfileHero.jsx — Hero banner for the Company Profile page
// Mirrors the AccreditationsHero gradient style with additional subheading

export default function CompanyProfileHero() {
  return (
    <section className="relative w-full h-[200px] md:h-[300px] bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] flex items-center justify-center overflow-hidden">
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-[#017119]/10 blur-3xl" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#FFA500]/10 blur-3xl" />

      <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Eyebrow label */}
        <p className="text-sm font-semibold uppercase tracking-widest text-[#017119] mb-3">
          Oceao Enviro Group
        </p>

        {/* Main heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75] mb-3">
          Company Profile
        </h1>

        {/* Subheading */}
        <p className="text-base md:text-lg text-[#011539]/70 font-medium max-w-md mx-auto">
          Two Leading Companies, One Shared Vision
        </p>
      </div>
    </section>
  );
}
