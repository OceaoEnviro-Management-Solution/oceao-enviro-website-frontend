// visitsApi.js — The visitor counter endpoints (API_CONTRACT.md, "Visit counter").
// Every call goes through request(), so a failure rejects with an ApiRequestError.

import { request } from './http';

// ── recordVisit ──────────────────────────────────────────────────────────────
// POST /visits. Counts one visit and resolves with the total. The backend answers the total
// without counting for bots and for visitors over its limit (10 per hour per IP), never an error.
export async function recordVisit() {
  const payload = await request('/visits', { method: 'POST' });
  return payload.data.total;
}

// ── getTotal ─────────────────────────────────────────────────────────────────
// GET /visits/total. Resolves with the total; the answer may be cached for a minute.
export async function getTotal() {
  const payload = await request('/visits/total');
  return payload.data.total;
}

// ── getAdminVisits ───────────────────────────────────────────────────────────
// GET /admin/visits?days (admin session needed, days 1 to 90).
// Resolves { total, daily: [{ date: 'YYYY-MM-DD', count }] }, oldest first, every date present.
export async function getAdminVisits(days = 30) {
  const payload = await request(`/admin/visits?days=${encodeURIComponent(days)}`);
  return payload.data;
}
