// ProductCarousel.jsx — Image area for a product card.
// Single image: static. Multiple images: arrows, dots, counter, swipe and keyboard arrows.
// Clicking an image opens the full image in a new tab (like the certificates).

import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SWIPE_THRESHOLD = 40;

export default function ProductCarousel({ images, alt }) {
  const [index, setIndex] = useState(0);
  const touchStartX = useRef(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-sm text-gray-400">
        No image available
      </div>
    );
  }

  const imgClass =
    'w-full h-full object-cover transition-transform duration-500 group-hover:scale-105';

  if (images.length === 1) {
    return (
      <div className="w-full h-64 overflow-hidden bg-gray-100">
        <a
          href={images[0]}
          target="_blank"
          rel="noopener noreferrer"
          title="View full image"
          className="block w-full h-full cursor-zoom-in"
        >
          <img src={images[0]} alt={alt} loading="lazy" className={imgClass} />
        </a>
      </div>
    );
  }

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    if (delta > 0) prev();
    else next();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  const arrowClass =
    'absolute top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0F1D75] p-2 rounded-full shadow-sm transition-opacity lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#017119]';

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={`${alt} images`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-64 overflow-hidden bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#017119]"
    >
      <a
        href={images[index]}
        target="_blank"
        rel="noopener noreferrer"
        title="View full image"
        className="block w-full h-full cursor-zoom-in"
      >
        <img
          src={images[index]}
          alt={`${alt} — image ${index + 1} of ${images.length}`}
          className={imgClass}
        />
      </a>

      <button type="button" onClick={prev} aria-label="Previous image" className={`${arrowClass} left-2`}>
        <ChevronLeft size={20} />
      </button>
      <button type="button" onClick={next} aria-label="Next image" className={`${arrowClass} right-2`}>
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'bg-white w-8' : 'bg-white/60 hover:bg-white/80 w-2'
            }`}
          />
        ))}
      </div>

      <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs">
        {index + 1} / {images.length}
      </div>
    </div>
  );
}
