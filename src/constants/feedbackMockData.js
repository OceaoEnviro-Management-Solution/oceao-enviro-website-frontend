// feedbackMockData.js — Mock in-memory store for feedback submissions (Phase 1).
// Kept separate from mockData.js which is owned by the booking system.
// Remove this file entirely when real email API is integrated.

// ── Feedback submissions store ────────────────────────────────────────────────
// Keys: submission ID (e.g. 'FB1234567890')
// Values: full submission object with type, name, email, subject, message, etc.
export const mockFeedbackSubmissions = {};
