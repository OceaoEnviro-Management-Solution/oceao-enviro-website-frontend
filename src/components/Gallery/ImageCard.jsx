// ImageCard.jsx — Single clickable image thumbnail for the gallery grid

export default function ImageCard({ image, index, images, category, subcategory, openLightbox }) {
  const handleClick = () => {
    openLightbox(images, index, { category, subcategory });
  };

  return (
    <button
      onClick={handleClick}
      className="group relative aspect-square w-full rounded-lg overflow-hidden bg-gray-100 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#017119] focus-visible:ring-offset-2"
      aria-label={`View ${image.alt}`}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-90"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-white/0 group-hover:bg-white/25 backdrop-blur-sm transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </button>
  );
}
