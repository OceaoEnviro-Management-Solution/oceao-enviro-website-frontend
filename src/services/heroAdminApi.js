// heroAdminApi.js — Admin API for the homepage hero slides (API_CONTRACT.md, "Admin: Homepage hero").
// Every call goes through request(); the session is the httpOnly cookie the browser sends. Failed
// calls reject with ApiRequestError, whose message is fit to show to the user.
//
//   getHeroAdmin()                                  GET    /admin/hero
//   addSlide({ set, file, name, ... })              POST   /admin/hero/slides   (multipart)
//   updateSlide(id, { name, ..., performedBy })     PATCH  /admin/hero/slides/:id
//   deleteSlide(id, performedBy)                    DELETE /admin/hero/slides/:id
//   reorder(set, ids, performedBy)                  PUT    /admin/hero/order
//   setSchedule(switchDate, performedBy)            PUT    /admin/hero/schedule
//   clearSchedule(performedBy)                      DELETE /admin/hero/schedule
//
// Two sets: "live" (on the homepage now) and "scheduled" (the next set, shown from switchDate).
// Every write needs performedBy: the employee's name, kept in the activity log.

import { ApiRequestError, request } from './http';

const UNEXPECTED = 'Unexpected response from the server. Please try again.';

// One slide as the admin screen uses it. credit is '' when there is none (an empty text field).
const adaptSlide = (slide) => ({
  id: String(slide.id),
  set: slide.set,
  order: slide.order,
  publicId: slide.publicId,
  imageUrl: slide.imageUrl,
  name: String(slide.name ?? ''),
  location: String(slide.location ?? ''),
  description: String(slide.description ?? ''),
  credit: slide.credit ? String(slide.credit) : '',
  textStyle: slide.textStyle === 'light' ? 'light' : 'dark',
});

const adaptList = (list) => (Array.isArray(list) ? list.map(adaptSlide) : []);

// ── getHeroAdmin ─────────────────────────────────────────────────────────────
// Resolves { live: [slide], scheduled: { switchDate: 'YYYY-MM-DD' | null, slides: [slide] } }, each
// list in show order. The backend does the planned switch first when its day has come, so a page
// opened after the switch date already shows the promoted set under "live".
export async function getHeroAdmin({ signal } = {}) {
  const payload = await request('/admin/hero', { signal });
  const data = payload?.data;
  if (!data || !Array.isArray(data.live) || !data.scheduled) {
    throw new ApiRequestError({ message: UNEXPECTED });
  }

  return {
    live: adaptList(data.live),
    scheduled: {
      switchDate: typeof data.scheduled.switchDate === 'string' ? data.scheduled.switchDate : null,
      slides: adaptList(data.scheduled.slides),
    },
  };
}

// ── addSlide ─────────────────────────────────────────────────────────────────
// Uploads the picture with its texts as multipart form data (the browser sets the boundary).
// credit is optional; textStyle is 'dark' (default) or 'light'. Resolves with the new slide.
export async function addSlide({ set, file, name, location, description, credit, textStyle = 'dark', performedBy }) {
  const form = new FormData();
  form.append('set', set);
  form.append('name', name);
  form.append('location', location);
  form.append('description', description);
  if (credit) form.append('credit', credit);
  form.append('textStyle', textStyle);
  form.append('performedBy', performedBy);
  form.append('image', file);   // last: the texts are validated before the picture is touched

  const payload = await request('/admin/hero/slides', { method: 'POST', formData: form });
  return adaptSlide(payload.data.slide);
}

// ── updateSlide ──────────────────────────────────────────────────────────────
// Texts and text style only: any of name, location, description, credit ('' or null removes the
// credit), textStyle ('dark' | 'light'). The picture cannot be changed. Resolves with the updated slide.
export async function updateSlide(id, { performedBy, ...texts }) {
  const payload = await request(`/admin/hero/slides/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    json: { ...texts, performedBy },
  });
  return adaptSlide(payload.data.slide);
}

// ── deleteSlide ──────────────────────────────────────────────────────────────
// Deletes the slide and its photo; the rest of its set is renumbered.
export async function deleteSlide(id, performedBy) {
  const payload = await request(`/admin/hero/slides/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    json: { performedBy },
  });
  return payload.data;
}

// ── reorder ──────────────────────────────────────────────────────────────────
// ids: exactly the ids of that set's slides, in the new order. Resolves with the set's slides.
export async function reorder(set, ids, performedBy) {
  const payload = await request('/admin/hero/order', { method: 'PUT', json: { set, ids, performedBy } });
  return adaptList(payload.data.slides);
}

// ── setSchedule / clearSchedule ──────────────────────────────────────────────
// switchDate: 'YYYY-MM-DD', after today in India time (otherwise 422). clearSchedule keeps the
// scheduled slides as a draft.
export async function setSchedule(switchDate, performedBy) {
  const payload = await request('/admin/hero/schedule', { method: 'PUT', json: { switchDate, performedBy } });
  return payload.data;
}

export async function clearSchedule(performedBy) {
  const payload = await request('/admin/hero/schedule', { method: 'DELETE', json: { performedBy } });
  return payload.data;
}
