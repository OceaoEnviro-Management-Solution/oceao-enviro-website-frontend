// useLightbox.js — State management hook for the Gallery lightbox viewer

import { useState, useEffect, useCallback } from 'react';

export function useLightbox() {
  const [isOpen, setIsOpen]                   = useState(false);
  const [currentImageIndex, setCurrentIndex]  = useState(0);
  const [currentImages, setCurrentImages]     = useState([]);
  const [currentMeta, setCurrentMeta]         = useState({ category: '', subcategory: '' });

  // Open lightbox with a set of images starting at a given index
  const openLightbox = useCallback((images, startIndex, meta = {}) => {
    setCurrentImages(images);
    setCurrentIndex(startIndex);
    setCurrentMeta(meta);
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setIsOpen(false), []);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % currentImages.length);
  }, [currentImages.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  }, [currentImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKey);
    // Prevent body scroll while lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, nextImage, prevImage, closeLightbox]);

  const currentImage = currentImages[currentImageIndex] ?? null;

  return {
    isOpen,
    currentImage,
    currentImageIndex,
    currentImages,
    currentMeta,
    openLightbox,
    closeLightbox,
    nextImage,
    prevImage,
  };
}
