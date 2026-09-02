// validation.js — Standalone form validation helpers.
// Used by BookingFormInput and OTP pages.

// ── Email ──────────────────────────────────────────────────────────────────────
export function validateEmail(value) {
  if (!value || !value.trim()) return 'Business email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
  return null; // no error
}

// ── Phone ──────────────────────────────────────────────────────────────────────
export function validatePhone(value) {
  if (!value || !value.trim()) return 'Mobile number is required';
  const phoneRegex = /^[\d\-\+\s]{10,}$/;
  if (!phoneRegex.test(value.trim())) return 'Please enter a valid phone number (min. 10 digits)';
  return null;
}

// ── Min length ────────────────────────────────────────────────────────────────
export function validateMinLength(value, min, fieldLabel) {
  if (!value || !value.trim()) return `${fieldLabel} is required`;
  if (value.trim().length < min) return `${fieldLabel} must be at least ${min} characters`;
  return null;
}

// ── Required ──────────────────────────────────────────────────────────────────
export function validateRequired(value, fieldLabel) {
  if (!value || !value.toString().trim()) return `${fieldLabel} is required`;
  return null;
}

// ── Validate a full booking form field ────────────────────────────────────────
// Returns error string or null (no error).
export function validateField(field, value) {
  const v = typeof value === 'string' ? value.trim() : value;

  // Required check
  if (field.required && (!v || v === '')) {
    return `${field.label} is required`;
  }

  // Skip format checks if field is empty and not required
  if (!v) return null;

  // Email format
  if (field.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(v)) return 'Please enter a valid email address';
  }

  // Phone format
  if (field.type === 'tel') {
    const phoneRegex = /^[\d\-\+\s]{10,}$/;
    if (!phoneRegex.test(v)) return 'Please enter a valid phone number (min. 10 digits)';
  }

  // Min length
  if (field.validation?.startsWith('minLength:')) {
    const min = parseInt(field.validation.split(':')[1], 10);
    if (v.length < min) return `${field.label} must be at least ${min} characters`;
  }

  return null; // valid
}

// ── Format date for display ────────────────────────────────────────────────────
// e.g. Date object → "Friday, 28 August 2026"
export function formatDateDisplay(date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

// ── Format time for display ────────────────────────────────────────────────────
// e.g. '10:00' → '10:00 AM', '14:00' → '2:00 PM'
export function formatTimeDisplay(time24) {
  if (!time24) return '';
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
}

// ── Mask email for OTP display ─────────────────────────────────────────────────
// e.g. 'rahul@gmail.com' → 'r*****@gmail.com'
export function maskEmail(email) {
  if (!email || !email.includes('@')) return email;
  const [local, domain] = email.split('@');
  const masked = local[0] + '*'.repeat(Math.max(local.length - 1, 3));
  return `${masked}@${domain}`;
}

// ── validateFeedbackForm ────────────────────────────────────────────────────────
// Validates the full feedback form. Reuses existing validators where possible.
// Returns an errors object: { field: 'error message' } — empty means valid.
export function validateFeedbackForm(formData) {
  const errors = {};

  // Type required (custom — no existing helper for this)
  if (!formData.type || formData.type.trim() === '') {
    errors.type = 'Please select a feedback type';
  }

  // Name — reuse validateMinLength
  const nameErr = validateMinLength(formData.name, 2, 'Name');
  if (nameErr) errors.name = nameErr;

  // Email — reuse validateEmail
  const emailErr = validateEmail(formData.email);
  if (emailErr) errors.email = emailErr;

  // Phone — optional, no validation

  // Subject — reuse validateMinLength
  const subjectErr = validateMinLength(formData.subject, 3, 'Subject');
  if (subjectErr) errors.subject = subjectErr;

  // Message — reuse validateMinLength
  const messageErr = validateMinLength(formData.message, 10, 'Message');
  if (messageErr) errors.message = messageErr;

  return errors;
}
