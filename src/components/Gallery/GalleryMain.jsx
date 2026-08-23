// GalleryMain.jsx — Main scrollable content area with all category/subsection sections

import { useMemo } from 'react';
import { galleryData, getAllImages, getScrollSectionIds } from '../../constants/gallery';
import { useScrollSpy } from '../../hooks/useScrollSpy';
import ImageGrid from './ImageGrid';

const categoryHeadingColor = {
  blue:   'text-[#0F1D75]',
  orange: 'text-[#E69500]',
  green:  'text-[#017119]',
};

const categoryBorderColor = {
  blue:   'border-[#0F1D75]/20',
  orange: 'border-[#FFA500]/20',
  green:  'border-[#017119]/20',
};

export default function GalleryMain({ openLightbox, onActiveIdChange }) {
  const allImages = useMemo(() => getAllImages(), []);

  // Build flat list of all section IDs for scroll-spy
  const sectionIds = useMemo(() => ['gallery-top', ...getScrollSectionIds()], []);
  const activeId = useScrollSpy(sectionIds, 150);

  // Bubble active ID up to parent (for sidebar highlight)
  if (onActiveIdChange) {
    onActiveIdChange(activeId);
  }

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 130;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex-1 md:pl-8 lg:pl-12 min-w-0">
      <div id="gallery-top" className="space-y-16">

        {/* ── ALL section ──────────────────────────────────────────────────── */}
        <section aria-label="All images">
          <div className="flex items-center gap-4 mb-6 pb-3 border-b border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75]">All</h2>
            <span className="text-sm text-gray-400 font-medium">{allImages.length} photos</span>
          </div>
          <ImageGrid
            images={allImages}
            category="All"
            subcategory="All"
            openLightbox={openLightbox}
          />
        </section>

        {/* ── Per-category sections ──────────────────────────────────────── */}
        {galleryData.map((cat) => (
          <section key={cat.id} id={cat.id} aria-label={cat.name}>
            {/* Category heading */}
            <div className={`flex items-center gap-4 mb-6 pb-3 border-b ${categoryBorderColor[cat.color] ?? 'border-gray-200'}`}>
              <h2 className={`text-2xl md:text-3xl font-bold ${categoryHeadingColor[cat.color] ?? 'text-[#0F1D75]'}`}>
                {cat.name}
              </h2>
              <span className="text-sm text-gray-400 font-medium">
                {cat.subsections.reduce((s, sub) => s + sub.images.length, 0)} photos
              </span>
            </div>

            <div className="space-y-10">
              {cat.subsections.map((sub) => (
                <div key={sub.id} id={sub.name ? sub.id : undefined}>
                  {/* Subsection heading (only if named) */}
                  {sub.name && (
                    <h3 className="text-lg font-semibold text-gray-500 mb-4">
                      {sub.name}
                    </h3>
                  )}

                  <ImageGrid
                    images={sub.images}
                    category={cat.name}
                    subcategory={sub.name || cat.name}
                    openLightbox={openLightbox}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}

      </div>
    </div>
  );
}
