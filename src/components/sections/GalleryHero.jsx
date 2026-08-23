// GalleryHero.jsx — Hero banner for the Gallery page
// Mirrors the established gradient style of other About page heroes

export default function GalleryHero() {
  return (
    <section className="relative w-full h-[200px] md:h-[300px] bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] flex items-center justify-center overflow-hidden">
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />

      {/* Decorative blobs */}
      <div className="absolute -top-12 -left-12 w-56 h-56 rounded-full bg-[#017119]/10 blur-3xl" />
      <div className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full bg-[#FFA500]/10 blur-3xl" />

      <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#017119] mb-3">
          Oceao Enviro Group
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75] mb-3">
          Gallery
        </h1>
        <p className="text-base md:text-lg text-[#011539]/70 font-medium max-w-md mx-auto">
          Our Work, Our Presence
        </p>
      </div>
    </section>
  );
}
