export default function AccreditationsHero() {
  return (
    <section className="relative w-full h-[200px] md:h-[300px] bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] flex items-center justify-center">
      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75]">
          Accreditations & Certifications
        </h1>
      </div>
    </section>
  );
}
