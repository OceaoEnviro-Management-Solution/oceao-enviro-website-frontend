// heroForm.js — Rules of the hero slide forms (the same limits the backend enforces), the picture
// check done before anything is uploaded, and how a failed request is shown in the modals.

export const HERO_SET_MAX = 5;                       // slides in one set
export const MAX_IMAGE_BYTES = 10 * 1024 * 1024;     // 10 MB
export const IMAGE_TYPES = Object.freeze(['image/jpeg', 'image/png', 'image/webp']);

export const HERO_LIMITS = Object.freeze({
  name: { min: 2, max: 80 },
  location: { min: 2, max: 80 },
  description: { max: 120 },
  credit: { max: 80 },
});

/** A problem with the chosen picture (shown before uploading), or null when it is fine. */
export function validateImageFile(file) {
  if (!file) return 'Please choose a photo.';
  if (!IMAGE_TYPES.includes(file.type)) return 'Only JPG, PNG or WebP photos can be used.';
  if (file.size > MAX_IMAGE_BYTES) return 'This photo is larger than 10 MB. Please choose a smaller one.';
  if (file.size === 0) return 'This file is empty.';
  return null;
}

/** Problems with the four texts, by field: { name?, location?, description?, credit? }. */
export function validateHeroTexts({ name, location, description, credit }) {
  const errors = {};
  const text = (value) => (value ?? '').trim();

  if (text(name).length < HERO_LIMITS.name.min) errors.name = `Name must be at least ${HERO_LIMITS.name.min} characters`;
  else if (text(name).length > HERO_LIMITS.name.max) errors.name = `Name cannot exceed ${HERO_LIMITS.name.max} characters`;

  if (text(location).length < HERO_LIMITS.location.min) errors.location = `Location must be at least ${HERO_LIMITS.location.min} characters`;
  else if (text(location).length > HERO_LIMITS.location.max) errors.location = `Location cannot exceed ${HERO_LIMITS.location.max} characters`;

  if (text(description).length < 1) errors.description = 'Description is required';
  else if (text(description).length > HERO_LIMITS.description.max) errors.description = `Description cannot exceed ${HERO_LIMITS.description.max} characters`;

  if (text(credit).length > HERO_LIMITS.credit.max) errors.credit = `Credit cannot exceed ${HERO_LIMITS.credit.max} characters`;

  return errors;
}

// The backend's field names -> the form's.
const FIELD_MAP = {
  name: 'name',
  location: 'location',
  description: 'description',
  credit: 'credit',
  image: 'image',
  performedBy: 'employeeName',
  set: '_global',
};

const firstMessage = (value) => {
  if (Array.isArray(value)) return typeof value[0] === 'string' ? value[0] : '';
  return typeof value === 'string' ? value : '';
};

/**
 * A failed request as the modals show it: field messages under their fields, anything else
 * (SET_FULL, FILE_TOO_LARGE, a network failure ...) as `_global`. Backend messages are user-ready.
 */
export function heroErrorsFrom(error, fallback = 'Something went wrong. Please try again.') {
  const result = {};

  if (error?.code === 'VALIDATION_FAILED') {
    for (const [backendField, formField] of Object.entries(FIELD_MAP)) {
      const message = firstMessage(error.fieldErrors?.[backendField]);
      if (message) result[formField] = result[formField] ?? message;
    }
  }

  if (Object.keys(result).length === 0) result._global = error?.message || fallback;
  return result;
}

// The delivery link of a photo is 1920 px wide: the cards show a small crop of it instead.
// (If the backend ever changes its link format the full photo is used, which still works.)
const FULL_SIZE = '/f_auto,q_auto,w_1920,c_limit/';
const THUMBNAIL = '/f_auto,q_auto,w_480,h_300,c_fill/';

export const thumbnailUrl = (imageUrl) => (typeof imageUrl === 'string' ? imageUrl.replace(FULL_SIZE, THUMBNAIL) : imageUrl);
