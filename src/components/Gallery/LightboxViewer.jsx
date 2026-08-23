// LightboxViewer.jsx — Full-screen lightbox modal with navigation
// Uses ReactDOM.createPortal so the overlay renders directly on <body>,
// completely escaping any parent stacking-context (e.g. <main z-10>)
// that would otherwise let the sticky Navbar/Header paint on top.

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxViewer({
  isOpen,
  currentImage,
  currentImageIndex,
  currentImages,
  currentMeta,
  closeLightbox,
  nextImage,
  prevImage,
}) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeLightbox, nextImage, prevImage]);

  if (!isOpen || !currentImage) return null;

  const total = currentImages.length;
  const { category = '', subcategory = '' } = currentMeta;
  const label = [category, subcategory !== category ? subcategory : null, `Image ${currentImageIndex + 1}`]
    .filter(Boolean)
    .join(' • ');

  return createPortal(
    /* Backdrop — rendered directly on document.body via portal */
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
      onClick={closeLightbox}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Modal content — stop click propagation so clicking the image doesn't close */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeLightbox}
          aria-label="Close lightbox"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Previous arrow */}
        {total > 1 && (
          <button
            onClick={prevImage}
            aria-label="Previous image"
            className="absolute left-3 md:left-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </button>
        )}

        {/* Main image */}
        <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center px-16">
          <img
            key={currentImage.src}  // re-mount on src change for fade feel
            src={currentImage.src}
            alt={currentImage.alt}
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in fade-in duration-200"
          />
        </div>

        {/* Next arrow */}
        {total > 1 && (
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-3 md:right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </button>
        )}

        {/* Bottom bar: counter + label */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 py-4 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
          {/* Counter */}
          <span className="text-white/80 text-xs font-medium tabular-nums">
            {currentImageIndex + 1} of {total}
          </span>

          {/* Label */}
          <span className="text-white/90 text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
            {label}
          </span>
        </div>
      </div>
    </div>,
    document.body   // ← portal target: renders outside all stacking contexts
  );
}
