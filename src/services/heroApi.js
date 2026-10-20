// heroApi.js — The homepage hero endpoint (API_CONTRACT.md, "Homepage hero").
// Every call goes through request(), so a failure rejects with an ApiRequestError.

import { ApiRequestError, request } from './http';

// Only https pictures are ever put on the page: anything else in a slide is dropped.
const isHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

// ── getHeroSlides ────────────────────────────────────────────────────────────
// GET /hero. Resolves with the live slides, in the order to show them:
//   [{ id, imageUrl, name, location, description, textStyle, credit }]
// credit is null when the slide has none. textStyle is 'dark' or 'light': how to colour the hero text
// while this slide is on show ('dark' for a slide without one). An empty list means "show the static
// hero picture".
// The answer may be cached for 5 minutes.
export async function getHeroSlides({ signal } = {}) {
  const payload = await request('/hero', { signal });
  const slides = payload?.data?.slides;

  if (!Array.isArray(slides)) {
    throw new ApiRequestError({ message: 'Unexpected response from the server. Please try again.' });
  }

  return slides
    .filter((slide) => slide && slide.id && isHttpsUrl(slide.imageUrl))
    .map((slide) => ({
      id: String(slide.id),
      imageUrl: slide.imageUrl,
      name: String(slide.name ?? ''),
      location: String(slide.location ?? ''),
      description: String(slide.description ?? ''),
      textStyle: slide.textStyle === 'light' ? 'light' : 'dark',
      credit: slide.credit ? String(slide.credit) : null,
    }));
}
