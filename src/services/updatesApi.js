// updatesApi.js — PARIVESH "What's New" endpoints (API_CONTRACT.md, "Updates").
// Every call goes through request(), so a failure rejects with an ApiRequestError.
//
//   getLatest()        GET /updates/latest              the 5 newest (homepage carousel)
//   getPage(page)      GET /updates?page=N              10 per page (Updates page)
//   getSyncStatus()    GET /admin/updates/sync-status   admin session needed
//   runSync()          POST /admin/updates/sync         admin session needed; once per 5 minutes

import { request, ApiRequestError } from './http';

const UNEXPECTED_RESPONSE = 'Unexpected response from the server. Please try again.';

// Only https links are ever put in a link: anything else in an item is dropped.
const isHttpsUrl = (value) => {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
};

// One item: { id, title, category, date: 'YYYY-MM-DD' | null, sizeLabel, pdfUrl, isNew }.
const adaptItem = (item) => ({
  id: item.id,
  title: String(item.title ?? ''),
  category: String(item.category ?? ''),
  date: typeof item.date === 'string' ? item.date : null,
  sizeLabel: item.sizeLabel ? String(item.sizeLabel) : null,
  pdfUrl: item.pdfUrl,
  isNew: item.isNew === true,
});

const adaptItems = (items) => {
  if (!Array.isArray(items)) throw new ApiRequestError({ message: UNEXPECTED_RESPONSE });
  return items.filter((item) => item && isHttpsUrl(item.pdfUrl)).map(adaptItem);
};

// ── getLatest ────────────────────────────────────────────────────────────────
// Resolves with the 5 newest items, newest first.
export async function getLatest({ signal } = {}) {
  const payload = await request('/updates/latest', { signal });
  return adaptItems(payload?.data?.items);
}

// ── getPage ──────────────────────────────────────────────────────────────────
// Resolves { items, page, pageSize, total, totalPages }. A page past the last one has no items.
export async function getPage(page = 1, { signal } = {}) {
  const payload = await request(`/updates?page=${encodeURIComponent(page)}`, { signal });
  const data = payload?.data;
  if (!data || !Number.isInteger(data.total) || !Number.isInteger(data.totalPages)) {
    throw new ApiRequestError({ message: UNEXPECTED_RESPONSE });
  }

  return {
    items: adaptItems(data.items),
    page: data.page,
    pageSize: data.pageSize,
    total: data.total,
    totalPages: data.totalPages,
  };
}

// ── getSyncStatus (admin) ────────────────────────────────────────────────────
// Resolves { lastSuccessAt: Date | null, lastAttemptAt: Date | null, lastError: string | null,
//            itemsReceived, itemsSkipped }.
const toDate = (value) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
};

export async function getSyncStatus({ signal } = {}) {
  const payload = await request('/admin/updates/sync-status', { signal });
  const data = payload?.data;
  if (!data || typeof data !== 'object') throw new ApiRequestError({ message: UNEXPECTED_RESPONSE });

  return {
    lastSuccessAt: toDate(data.lastSuccessAt),
    lastAttemptAt: toDate(data.lastAttemptAt),
    lastError: data.lastError ? String(data.lastError) : null,
    itemsReceived: data.itemsReceived ?? null,
    itemsSkipped: data.itemsSkipped ?? null,
  };
}

// ── runSync (admin) ──────────────────────────────────────────────────────────
// Runs a sync now. Resolves { received, saved, inserted, updated, skipped }.
// Rejects with the backend's message: 429 when one ran in the last 5 minutes, 502 when PARIVESH
// could not be read. The body is an empty object because admin writes must be JSON.
export async function runSync() {
  const payload = await request('/admin/updates/sync', { method: 'POST', json: {} });
  return payload.data;
}
