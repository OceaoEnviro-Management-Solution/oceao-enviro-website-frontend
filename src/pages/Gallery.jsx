// Gallery.jsx — Main page for /about/gallery
// Layout mirrors Accreditations: Hero → [Sidebar | Main Content]

import { useState, useCallback } from 'react';
import GalleryHero from '../components/sections/GalleryHero';
import GallerySidebar from '../components/Gallery/GallerySidebar';
import GalleryMain from '../components/Gallery/GalleryMain';
import LightboxViewer from '../components/Gallery/LightboxViewer';
import { useLightbox } from '../hooks/useLightbox';

export default function GalleryPage() {
  const [activeId, setActiveId] = useState('gallery-top');

  // Lightbox state — lifted to page so it's shared across all image grids
  const {
    isOpen,
    currentImage,
    currentImageIndex,
    currentImages,
    currentMeta,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
  } = useLightbox();

  // Scroll handler shared by sidebar
  const handleScrollTo = useCallback((id) => {
    if (id === 'gallery-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offset = 130;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
    }
  }, []);

  return (
    <main className="w-full bg-white pb-20">
      {/* Hero */}
      <GalleryHero />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12 relative">
        <div className="flex flex-col md:flex-row md:items-start">

          {/* Sidebar */}
          <GallerySidebar
            activeId={activeId}
            onScrollTo={handleScrollTo}
          />

          {/* Main content */}
          <GalleryMain
            openLightbox={openLightbox}
            onActiveIdChange={setActiveId}
          />

        </div>
      </div>

      {/* Lightbox (portal-like, rendered at page root) */}
      <LightboxViewer
        isOpen={isOpen}
        currentImage={currentImage}
        currentImageIndex={currentImageIndex}
        currentImages={currentImages}
        currentMeta={currentMeta}
        closeLightbox={closeLightbox}
        nextImage={nextImage}
        prevImage={prevImage}
      />
    </main>
  );
}
