// gallery.js — Image data for both the Gallery page AND the homepage Gallery section
// Exports:
//   galleryData        → Full nested structure (Gallery page)
//   galleryCategories  → Category list for sidebar (Gallery page)
//   getallImages()     → Flattened all-images array (Gallery page "ALL" section)
//   gallery            → Flat array for homepage section (backwards-compatible)
//   homepageGalleryCategories → Category filter list for homepage (backwards-compatible)

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 1: IMPORT ALL AVAILABLE IMAGES
// ─────────────────────────────────────────────────────────────────────────────

// Field Work — Visits (5 images; "Supreme Court.jpeg" is Visit-5)
import fwVisit1 from '../assets/images/gallery/Field Work/Visits/Visit-1.jpeg';
import fwVisit2 from '../assets/images/gallery/Field Work/Visits/Visit-2.jpeg';
import fwVisit3 from '../assets/images/gallery/Field Work/Visits/Visit-3.jpeg';
import fwVisit4 from '../assets/images/gallery/Field Work/Visits/Visit-4.jpeg';
import fwVisit5 from '../assets/images/gallery/Field Work/Visits/Supreme Court.jpeg';

// Field Work — Air Testing (5 images)
import fwAir1 from '../assets/images/gallery/Field Work/Air/Air-1.jpeg';
import fwAir2 from '../assets/images/gallery/Field Work/Air/Air-2.jpeg';
import fwAir3 from '../assets/images/gallery/Field Work/Air/Air-3.jpeg';
import fwAir4 from '../assets/images/gallery/Field Work/Air/Air-4.jpeg';
import fwAir5 from '../assets/images/gallery/Field Work/Air/Air-5.jpeg';

// Field Work — Water Testing (5 images)
import fwWater1 from '../assets/images/gallery/Field Work/Water/Water-1.jpeg';
import fwWater2 from '../assets/images/gallery/Field Work/Water/Water-2.jpeg';
import fwWater3 from '../assets/images/gallery/Field Work/Water/Water-3.jpeg';
import fwWater4 from '../assets/images/gallery/Field Work/Water/Water-4.jpeg';
import fwWater5 from '../assets/images/gallery/Field Work/Water/Water-5.jpeg';

// Field Work — Soil Testing (5 images)
import fwSoil1 from '../assets/images/gallery/Field Work/Soil/Soil-1.jpeg';
import fwSoil2 from '../assets/images/gallery/Field Work/Soil/Soil-2.jpeg';
import fwSoil3 from '../assets/images/gallery/Field Work/Soil/Soil-3.jpeg';
import fwSoil4 from '../assets/images/gallery/Field Work/Soil/Soil-4.jpeg';
import fwSoil5 from '../assets/images/gallery/Field Work/Soil/Soil-5.jpeg';

// Offices — Ghaziabad (3 images) ✅
import offGhz1 from '../assets/images/gallery/Offices/Ghaziabad/Office-G-1.jpeg';
import offGhz2 from '../assets/images/gallery/Offices/Ghaziabad/Office-G-2.jpeg';
import offGhz3 from '../assets/images/gallery/Offices/Ghaziabad/Office-G-3.jpeg';

// Laboratory (4 images) ✅
import lab1 from '../assets/images/gallery/Laboratory/Lab-1.jpeg';
import lab2 from '../assets/images/gallery/Laboratory/Lab-2.jpeg';
import lab3 from '../assets/images/gallery/Laboratory/Lab-3.jpeg';
import lab4 from '../assets/images/gallery/Laboratory/Lab-4.jpeg';

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 2: FULL NESTED STRUCTURE (Gallery page)
// ─────────────────────────────────────────────────────────────────────────────

export const galleryData = [
  {
    id: 'field-work',
    name: 'Field Work',
    color: 'blue',          // brand-blue accent for sidebar active state
    subsections: [
      {
        id: 'field-work-visits',
        name: 'Visits',
        images: [
          { id: 1, src: fwVisit1, alt: 'Field Visit — 1' },
          { id: 2, src: fwVisit2, alt: 'Field Visit — 2' },
          { id: 3, src: fwVisit3, alt: 'Field Visit — 3' },
          { id: 4, src: fwVisit4, alt: 'Field Visit — 4' },
          { id: 5, src: fwVisit5, alt: 'Field Visit — Supreme Court' },
        ],
      },
      {
        id: 'field-work-air-testing',
        name: 'Air Testing',
        images: [
          { id: 1, src: fwAir1, alt: 'Air Testing — 1' },
          { id: 2, src: fwAir2, alt: 'Air Testing — 2' },
          { id: 3, src: fwAir3, alt: 'Air Testing — 3' },
          { id: 4, src: fwAir4, alt: 'Air Testing — 4' },
          { id: 5, src: fwAir5, alt: 'Air Testing — 5' },
        ],
      },
      {
        id: 'field-work-water-testing',
        name: 'Water Testing',
        images: [
          { id: 1, src: fwWater1, alt: 'Water Testing — 1' },
          { id: 2, src: fwWater2, alt: 'Water Testing — 2' },
          { id: 3, src: fwWater3, alt: 'Water Testing — 3' },
          { id: 4, src: fwWater4, alt: 'Water Testing — 4' },
          { id: 5, src: fwWater5, alt: 'Water Testing — 5' },
        ],
      },
      {
        id: 'field-work-soil-testing',
        name: 'Soil Testing',
        images: [
          { id: 1, src: fwSoil1, alt: 'Soil Testing — 1' },
          { id: 2, src: fwSoil2, alt: 'Soil Testing — 2' },
          { id: 3, src: fwSoil3, alt: 'Soil Testing — 3' },
          { id: 4, src: fwSoil4, alt: 'Soil Testing — 4' },
          { id: 5, src: fwSoil5, alt: 'Soil Testing — 5' },
        ],
      },
    ],
  },

  {
    id: 'offices',
    name: 'Offices',
    color: 'orange',        // brand-orange accent
    subsections: [
      {
        id: 'office-ghaziabad',
        name: 'Ghaziabad',
        images: [
          { id: 1, src: offGhz1, alt: 'Ghaziabad Office — 1' },
          { id: 2, src: offGhz2, alt: 'Ghaziabad Office — 2' },
          { id: 3, src: offGhz3, alt: 'Ghaziabad Office — 3' },
        ],
      },
      {
        id: 'office-bhopal',
        name: 'Bhopal',
        images: [],           // No images yet → shows "Coming Soon"
      },
      {
        id: 'office-jammu',
        name: 'Jammu',
        images: [],           // No images yet → shows "Coming Soon"
      },
    ],
  },

  {
    id: 'laboratory',
    name: 'Laboratory',
    color: 'green',         // brand-green accent
    subsections: [
      {
        id: 'laboratory-main',
        name: null,           // null = no subsection heading, show images directly
        images: [
          { id: 1, src: lab1, alt: 'Laboratory — 1' },
          { id: 2, src: lab2, alt: 'Laboratory — 2' },
          { id: 3, src: lab3, alt: 'Laboratory — 3' },
          { id: 4, src: lab4, alt: 'Laboratory — 4' },
        ],
      },
    ],
  },

  {
    id: 'events',
    name: 'Events',
    color: 'blue',          // brand-blue accent
    subsections: [
      {
        id: 'events-main',
        name: null,
        images: [],           // No images yet → shows "Coming Soon"
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 3: HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Flatten all images from all categories in round-robin order.
 * Used for the "ALL" section in the Gallery page.
 */
export function getAllImages() {
  const allImages = [];
  const allSubsections = galleryData.flatMap((cat) =>
    cat.subsections.map((sub) => ({
      ...sub,
      categoryName: cat.name,
      categoryId: cat.id,
    }))
  );

  const maxLen = Math.max(...allSubsections.map((s) => s.images.length), 0);

  for (let i = 0; i < maxLen; i++) {
    allSubsections.forEach((sub) => {
      if (sub.images[i]) {
        allImages.push({
          ...sub.images[i],
          category: sub.categoryName,
          subcategory: sub.name || sub.categoryName,
        });
      }
    });
  }

  return allImages;
}

/**
 * Get a flat list of all images from a specific category ID.
 * Useful for "show only this category" filtering.
 */
export function getImagesByCategory(categoryId) {
  const cat = galleryData.find((c) => c.id === categoryId);
  if (!cat) return [];
  return cat.subsections.flatMap((sub) =>
    sub.images.map((img) => ({
      ...img,
      category: cat.name,
      subcategory: sub.name || cat.name,
    }))
  );
}

/**
 * Get all section IDs (category + subsection) for scroll-spy.
 */
export function getScrollSectionIds() {
  const ids = [];
  galleryData.forEach((cat) => {
    ids.push(cat.id); // category section id
    cat.subsections.forEach((sub) => {
      if (sub.name) ids.push(sub.id); // subsection id (only if named)
    });
  });
  return ids;
}

/**
 * Get total image count across all categories.
 */
export function getTotalImageCount() {
  return galleryData.reduce(
    (total, cat) =>
      total + cat.subsections.reduce((s, sub) => s + sub.images.length, 0),
    0
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 4: SIDEBAR METADATA
// ─────────────────────────────────────────────────────────────────────────────

export const galleryCategories = galleryData.map((cat) => ({
  id: cat.id,
  name: cat.name,
  color: cat.color,
  subsections: cat.subsections.map((sub) => ({
    id: sub.id,
    name: sub.name,
    imageCount: sub.images.length,
  })),
  totalImages: cat.subsections.reduce((s, sub) => s + sub.images.length, 0),
}));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION 5: HOMEPAGE GALLERY SECTION (backwards-compatible)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Flat array used by the homepage Gallery section component.
 * Shows one representative image per category, plus a couple extra.
 */
export const gallery = [
  { id: 1, category: 'Field Work', image: fwVisit1,  alt: 'Environmental Field Visit' },
  { id: 2, category: 'Laboratory', image: lab1,       alt: 'State-of-the-art Laboratory' },
  { id: 3, category: 'Field Work', image: fwAir1,    alt: 'Air Quality Testing' },
  { id: 4, category: 'Offices',    image: offGhz1,   alt: 'Ghaziabad Office' },
  { id: 5, category: 'Field Work', image: fwWater1,  alt: 'Water Quality Testing' },
  { id: 6, category: 'Laboratory', image: lab2,       alt: 'Laboratory Equipment' },
  { id: 7, category: 'Field Work', image: fwSoil1,   alt: 'Soil Testing' },
  { id: 8, category: 'Offices',    image: offGhz2,   alt: 'Office Interior' },
];

/**
 * Category filter list for the homepage Gallery section.
 */
export const homepageGalleryCategories = ['Field Work', 'Laboratory', 'Offices'];
