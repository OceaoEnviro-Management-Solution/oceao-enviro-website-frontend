// useFormValidation.js — Reusable form validation hook
// Used by QueryFormSection and CallbackFormSection.
// Handles formData state, per-field error messages, validation logic, and form reset.

import { useState } from 'react';

export function useFormValidation(fields) {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  /** Update a single field value and clear its error immediately */
  const handleChange = (id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: '' }));
    }
  };

  /** Run all validation rules; returns true if form is valid */
  const validateForm = () => {
    const newErrors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);

    fields.forEach((field) => {
      const value = formData[field.id];
      const strVal = typeof value === 'string' ? value.trim() : value;

      // Required check
      if (field.required && (value === undefined || value === null || value === '' || strVal === '')) {
        newErrors[field.id] = `${field.label} is required`;
        return;
      }

      // Email format
      if (field.type === 'email' && strVal) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(strVal)) {
          newErrors[field.id] = 'Please enter a valid email address';
        }
      }

      // Phone format (10+ digits, allows +, -, spaces)
      if (field.type === 'tel' && strVal) {
        const phoneRegex = /^[\d\-\+\s]{10,}$/;
        if (!phoneRegex.test(strVal)) {
          newErrors[field.id] = 'Please enter a valid phone number (min. 10 digits)';
        }
      }

      // Date range validation
      if (field.type === 'datepicker' && value) {
        const selected = new Date(value);
        selected.setHours(0, 0, 0, 0);
        if (selected < today) {
          newErrors[field.id] = 'Please select today or a future date';
        } else if (selected > maxDate) {
          newErrors[field.id] = 'Please select a date within the next 30 days';
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Validate then call onSuccess(formData) if valid */
  const handleSubmit = (e, onSuccess) => {
    e.preventDefault();
    if (validateForm()) {
      onSuccess && onSuccess({ ...formData });
    }
  };

  /** Clear all fields and errors (call after popup closes) */
  const resetForm = () => {
    setFormData({});
    setErrors({});
  };

  return { formData, handleChange, errors, handleSubmit, resetForm };
}
