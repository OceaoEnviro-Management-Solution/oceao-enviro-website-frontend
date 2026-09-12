// feedbackTypes.js — Static data and config constants for the Feedback & Complaint page.
// All 5 feedback types, file validation constraints, and rate limiting config live here.
// Easy to modify without touching component logic.

export const FEEDBACK_TYPES = [
  {
    id: 'feedback',
    label: 'Feedback',
    icon: '💬',
    description: 'General feedback'
  },
  {
    id: 'complaint',
    label: 'Complaint',
    icon: '⚠️',
    description: 'Report an issue'
  },
  {
    id: 'suggestion',
    label: 'Suggestion',
    icon: '💡',
    description: 'Suggest an improvement'
  },
  {
    id: 'appreciation',
    label: 'Appreciation',
    icon: '⭐',
    description: 'Praise our service'
  },
  {
    id: 'other',
    label: 'Other',
    icon: '❓',
    description: 'Something else'
  }
];

// ── File upload constraints ────────────────────────────────────────────────────
export const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png'];
export const ALLOWED_FILE_EXTENSIONS = ['PDF', 'JPG', 'PNG'];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

// ── Rate limiting ─────────────────────────────────────────────────────────────
export const RATE_LIMIT_WINDOW = 60 * 60 * 1000;  // 1 hour in ms
export const MAX_SUBMISSIONS_PER_HOUR = 1;
