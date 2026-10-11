// FeedbackContext.jsx — Global state for the Feedback & Complaint page.
// Manages form data, UI state, and localStorage persistence.
// Mirrors the pattern of BookingContext.jsx for consistency.
// Usage: FeedbackProvider wraps FeedbackPage directly (single page, no layout wrapper needed).

import { useState, useEffect } from 'react';
import { FeedbackContext } from './feedbackContextObject';

const STORAGE_KEY = 'feedbackFormData';

const INITIAL_FORM = {
  type: '',
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  attachment: null
};

// Restores the saved draft. Attachments can't be serialised, so only the fields come back.
function loadSavedForm() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...INITIAL_FORM, ...JSON.parse(saved), attachment: null };
  } catch {
    // Silently ignore corrupt data (or storage that is not available)
  }
  return INITIAL_FORM;
}

export function FeedbackProvider({ children }) {

  // ── Form data (restored from localStorage on first render) ───────────────────
  const [formData, setFormData] = useState(loadSavedForm);

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ── Persist form to localStorage on every change ─────────────────────────────
  // Exclude attachment (File objects aren't JSON-serialisable)
  useEffect(() => {
    const serialisable = { ...formData };
    delete serialisable.attachment;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialisable));
  }, [formData]);

  // ── resetForm — called after successful submission ────────────────────────────
  const resetForm = () => {
    setFormData(INITIAL_FORM);
    localStorage.removeItem(STORAGE_KEY);
    setSubmitted(false);
    setSubmissionData(null);
    setError(null);
  };

  return (
    <FeedbackContext.Provider value={{
      // Form data
      formData, setFormData,
      // UI state
      submitted, setSubmitted,
      submissionData, setSubmissionData,
      error, setError,
      loading, setLoading,
      // Helpers
      resetForm
    }}>
      {children}
    </FeedbackContext.Provider>
  );
}
