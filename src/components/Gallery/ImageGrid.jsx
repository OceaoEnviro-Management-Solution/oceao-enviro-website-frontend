// ImageGrid.jsx — Responsive grid of ImageCards, with Coming Soon empty state

import { ImageOff } from 'lucide-react';
import ImageCard from './ImageCard';

export default function ImageGrid({ images, category, subcategory, openLightbox }) {
  // Empty state — one large "Coming Soon" card
  if (!images || images.length === 0) {
    return (
      <div className="w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center py-16 px-8 text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <ImageOff className="w-8 h-8 text-gray-300" />
        </div>
        <p className="text-xl font-semibold text-gray-400">Coming Soon...</p>
        <p className="text-sm text-gray-400 max-w-xs">
          Images for this section will be added shortly. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          index={index}
          images={images}
          category={category}
          subcategory={subcategory}
          openLightbox={openLightbox}
        />
      ))}
    </div>
  );
}
