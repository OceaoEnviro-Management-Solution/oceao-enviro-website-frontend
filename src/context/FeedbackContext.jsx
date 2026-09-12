// FeedbackContext.jsx — Global state for the Feedback & Complaint page.
// Manages form data, UI state, and localStorage persistence.
// Mirrors the pattern of BookingContext.jsx for consistency.
// Usage: FeedbackProvider wraps FeedbackPage directly (single page, no layout wrapper needed).

import React, { createContext, useState, useEffect } from 'react';

export const FeedbackContext = createContext();

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

export function FeedbackProvider({ children }) {

  // ── Form data ────────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState(INITIAL_FORM);

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [submitted, setSubmitted] = useState(false);
  const [submissionData, setSubmissionData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ── Load from localStorage on mount ──────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Attachments can't be serialised — restore fields only (not file object)
        setFormData({ ...INITIAL_FORM, ...parsed, attachment: null });
      } catch {
        // Silently ignore corrupt data
      }
    }
  }, []);

  // ── Persist form to localStorage on every change ─────────────────────────────
  // Exclude attachment (File objects aren't JSON-serialisable)
  useEffect(() => {
    const { attachment, ...serialisable } = formData;
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
