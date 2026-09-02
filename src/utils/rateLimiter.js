// rateLimiter.js — Frontend rate limiting for feedback form submissions.
// Uses localStorage timestamps to enforce a maximum of 1 submission per hour.
// Note: This is a UX-layer guard only. Real rate limiting must live on the backend.

import { MAX_SUBMISSIONS_PER_HOUR, RATE_LIMIT_WINDOW } from '../constants/feedbackTypes';

const STORAGE_KEY = 'feedbackSubmissions';

// ── checkRateLimit ─────────────────────────────────────────────────────────────
// Returns { allowed: true } or { allowed: false, waitMinutes, message }
export function checkRateLimit() {
  const now = Date.now();
  const raw = localStorage.getItem(STORAGE_KEY);
  const submissions = raw ? JSON.parse(raw) : [];

  // Keep only submissions within the rate limit window
  const recent = submissions.filter(time => now - time < RATE_LIMIT_WINDOW);

  if (recent.length >= MAX_SUBMISSIONS_PER_HOUR) {
    const oldest = Math.min(...recent);
    const waitMs = RATE_LIMIT_WINDOW - (now - oldest);
    const waitMinutes = Math.ceil(waitMs / 60000);
    return {
      allowed: false,
      waitMinutes,
      message: `You've already submitted feedback recently. Please wait ${waitMinutes} minute${waitMinutes !== 1 ? 's' : ''} before submitting again.`
    };
  }

  return { allowed: true };
}

// ── recordSubmission ───────────────────────────────────────────────────────────
// Appends current timestamp to the submissions log in localStorage.
export function recordSubmission() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const submissions = raw ? JSON.parse(raw) : [];
  submissions.push(Date.now());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
}
