// ServiceDetailHero.jsx — Hero banner for all 4 service detail pages
// Matches the light-gradient style of CompanyProfileHero and AccreditationsHero

export default function ServiceDetailHero({ category }) {
  return (
    <section
      aria-label={`${category.hero.title} hero`}
      className="relative w-full h-[220px] md:h-[310px] bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] flex items-center justify-center overflow-hidden"
    >
      {/* Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-[#017119]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#FFA500]/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Eyebrow */}
        <p className="text-sm font-semibold uppercase tracking-widest text-[#017119] mb-3">
          {category.hero.eyebrow}
        </p>

        {/* Main heading */}
        <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75] mb-3">
          {category.hero.title}
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-[#011539]/70 font-medium max-w-lg mx-auto">
          {category.hero.subtitle}
        </p>
      </div>
    </section>
  );
}
