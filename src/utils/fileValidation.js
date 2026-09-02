// fileValidation.js — File type and size validation for feedback attachments.
// Used by FileUploadField component.

import { ALLOWED_FILE_TYPES, ALLOWED_FILE_EXTENSIONS, MAX_FILE_SIZE } from '../constants/feedbackTypes';

// ── validateFile ──────────────────────────────────────────────────────────────
// Returns an error string if the file is invalid, or null if valid.
export function validateFile(file) {
  if (!file) return null;

  // Check MIME type
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return `Only ${ALLOWED_FILE_EXTENSIONS.join(', ')} files are allowed`;
  }

  // Check size
  if (file.size > MAX_FILE_SIZE) {
    return `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`;
  }

  return null; // valid
}
