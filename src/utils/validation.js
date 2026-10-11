// validation.js — Standalone form validation helpers.
// Used by BookingFormInput and OTP pages.
//
// Field rules follow docs/API_CONTRACT.md ("Common field rules" and each endpoint), so a form
// refuses what the backend would answer with 400 VALIDATION_FAILED.

// Limits the contract states for the fields the website sends.
export const FIELD_LIMITS = Object.freeze({
  name:        { min: 2, max: 100 },
  employeeName: { min: 2, max: 60 },     // performedBy
  adminReason: { min: 3, max: 300 },
  holidayName: { min: 2, max: 100 },
  holidayBatch: 60,                       // dates in one bulk request
});

// ── Mobile number ──────────────────────────────────────────────────────────────
// Contract: spaces and hyphens are stripped, an optional +91 or 0 prefix is dropped, then the
// number must match ^[6-9]\d{9}$.
export const normalizeMobile = (value) =>
  String(value ?? '').trim().replace(/[\s-]/g, '').replace(/^(\+91|0)/, '');

export const isValidMobile = (value) => /^[6-9]\d{9}$/.test(normalizeMobile(value));

export const MOBILE_ERROR = 'Please enter a valid 10-digit Indian mobile number';

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
  if (!isValidMobile(value)) return MOBILE_ERROR;
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
    if (!isValidMobile(v)) return MOBILE_ERROR;
  }

  // Length limits (minLength / maxLength on the field, or the older 'minLength:N' string)
  const min = field.minLength
    ?? (field.validation?.startsWith('minLength:') ? parseInt(field.validation.split(':')[1], 10) : undefined);
  if (typeof v === 'string' && min && v.length < min) return `${field.label} must be at least ${min} characters`;
  if (typeof v === 'string' && field.maxLength && v.length > field.maxLength) {
    return `${field.label} cannot exceed ${field.maxLength} characters`;
  }

  return null; // valid
}

// ── Admin write fields (performedBy 2-60, reason 3-300) ───────────────────────
// Return an error message, or null when the value is fine.
export function validateEmployeeName(value) {
  const { min, max } = FIELD_LIMITS.employeeName;
  const v = (value || '').trim();
  if (!v) return 'Employee name is required';
  if (v.length < min) return `Employee name must be at least ${min} characters`;
  if (v.length > max) return `Employee name cannot exceed ${max} characters`;
  return null;
}

export function validateAdminReason(value) {
  const { min, max } = FIELD_LIMITS.adminReason;
  const v = (value || '').trim();
  if (!v) return 'Reason is required';
  if (v.length < min) return `Reason must be at least ${min} characters`;
  if (v.length > max) return `Reason cannot exceed ${max} characters`;
  return null;
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
  else if (formData.name.trim().length > FIELD_LIMITS.name.max) {
    errors.name = `Name cannot exceed ${FIELD_LIMITS.name.max} characters`;
  }

  // Email — reuse validateEmail
  const emailErr = validateEmail(formData.email);
  if (emailErr) errors.email = emailErr;

  // Phone — optional; when given it must be a valid Indian mobile number
  if (formData.phone && formData.phone.trim() && !isValidMobile(formData.phone)) {
    errors.phone = MOBILE_ERROR;
  }

  // Subject — 10 to 100 characters (API_CONTRACT.md)
  const subjectErr = validateMinLength(formData.subject, 10, 'Subject');
  if (subjectErr) errors.subject = subjectErr;
  else if (formData.subject.trim().length > 100) errors.subject = 'Subject cannot exceed 100 characters';

  // Message — 10 to 5000 characters
  const messageErr = validateMinLength(formData.message, 10, 'Message');
  if (messageErr) errors.message = messageErr;
  else if (formData.message.trim().length > 5000) errors.message = 'Message cannot exceed 5000 characters';

  return errors;
}
