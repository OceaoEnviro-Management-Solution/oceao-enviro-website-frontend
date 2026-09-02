// FeedbackForm.jsx — Main form container for the Feedback & Complaint page.
// Reads/writes form data via FeedbackContext.
// Handles: validation → rate limiting → API submission → success state transition.

import { useState, forwardRef } from 'react';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import { feedbackApi } from '../../services/feedbackApi';
import { validateFeedbackForm } from '../../utils/validation';
import { checkRateLimit, recordSubmission } from '../../utils/rateLimiter';
import { FEEDBACK_TYPES } from '../../constants/feedbackTypes';
import FeedbackFormInput from './FeedbackFormInput';
import FileUploadField from './FileUploadField';
import FeedbackSubmitButton from './FeedbackSubmitButton';

const FeedbackForm = forwardRef(function FeedbackForm(_, ref) {
  const {
    formData, setFormData,
    loading, setLoading,
    setSubmitted, setSubmissionData,
    setError
  } = useFeedbackContext();

  // Local validation errors — shown inline under each field
  const [fieldErrors, setFieldErrors] = useState({});
  // Local file error — separate from field errors
  const [fileError, setFileError] = useState(null);
  // Rate limit message — shown above submit button
  const [rateLimitMsg, setRateLimitMsg] = useState(null);

  // ── Field change handler ────────────────────────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear the error for this field as user types
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
    setRateLimitMsg(null);
  }

  // ── Blur handler — validate single field on blur ────────────────────────────
  function handleBlur(e) {
    const { name } = e.target;
    const errors = validateFeedbackForm(formData);
    if (errors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: errors[name] }));
    }
  }

  // ── File change handler ─────────────────────────────────────────────────────
  function handleFileChange(file, error) {
    setFormData(prev => ({ ...prev, attachment: file }));
    setFileError(error);
  }

  // ── Submit handler ──────────────────────────────────────────────────────────
  async function handleSubmit() {
    // 1. Validate all fields
    const errors = validateFeedbackForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Scroll to first error field
      const firstErrorId = Object.keys(errors)[0];
      document.getElementById(firstErrorId)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // 2. Check file error
    if (fileError) return;

    // 3. Check rate limit
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      setRateLimitMsg(rateCheck.message);
      return;
    }

    // 4. Submit
    setLoading(true);
    setError(null);

    try {
      const result = await feedbackApi.submitFeedback({
        ...formData,
        attachment: formData.attachment
          ? { name: formData.attachment.name, size: formData.attachment.size }
          : null
      });

      if (result.success) {
        recordSubmission(); // Log timestamp for rate limiting
        setSubmissionData(result.submittedData);
        setSubmitted(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('[FeedbackForm] submitFeedback error:', err);
    } finally {
      setLoading(false);
    }
  }

  // ── Selected type label for read-only display ────────────────────────────────
  const selectedType = FEEDBACK_TYPES.find(t => t.id === formData.type);

  return (
    <section ref={ref} className="w-full bg-[#F8FAF8] py-12 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#017119] mb-2">
            Step 2
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75]">
            Tell Us More
          </h2>
          <p className="text-sm text-[#011539]/50 mt-2">
            All fields marked <span className="text-red-500">*</span> are required
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 flex flex-col gap-5">

          {/* Read-only: selected feedback type */}
          {selectedType && (
            <div className="flex items-center gap-3 rounded-xl bg-[#E4F3E6]/60 border border-[#017119]/20 px-4 py-3">
              <span className="text-xl" aria-hidden="true">{selectedType.icon}</span>
              <div>
                <p className="text-xs text-[#017119]/70 font-medium uppercase tracking-wider">
                  Feedback Type
                </p>
                <p className="text-sm font-semibold text-[#0F1D75]">{selectedType.label}</p>
              </div>
            </div>
          )}

          {/* Type error — shown when user tries to submit without selecting */}
          {fieldErrors.type && (
            <p className="text-xs text-red-500 flex items-center gap-1 -mt-2" role="alert">
              <span aria-hidden="true">❌</span>
              {fieldErrors.type}
            </p>
          )}

          {/* Name */}
          <FeedbackFormInput
            id="name"
            label="Name"
            type="text"
            required
            value={formData.name}
            error={fieldErrors.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Your full name"
          />

          {/* Email */}
          <FeedbackFormInput
            id="email"
            label="Email Address"
            type="email"
            required
            value={formData.email}
            error={fieldErrors.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="your@email.com"
          />

          {/* Phone */}
          <FeedbackFormInput
            id="phone"
            label="Phone"
            type="tel"
            required={false}
            value={formData.phone}
            error={fieldErrors.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+91 XXXXX XXXXX"
          />

          {/* Subject */}
          <FeedbackFormInput
            id="subject"
            label="Subject"
            type="text"
            required
            value={formData.subject}
            error={fieldErrors.subject}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Brief subject"
          />

          {/* Message */}
          <FeedbackFormInput
            id="message"
            label="Message"
            type="textarea"
            required
            value={formData.message}
            error={fieldErrors.message}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Share your feedback, concern, or suggestion..."
            rows={5}
          />

          {/* File upload */}
          <FileUploadField
            file={formData.attachment}
            onChange={handleFileChange}
            error={fileError}
          />

          {/* Rate limit warning */}
          {rateLimitMsg && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-700 flex items-start gap-2" role="alert">
              <span aria-hidden="true">⏳</span>
              <span>{rateLimitMsg}</span>
            </div>
          )}

          {/* Global error */}
          {/* (from context setError — e.g. network failure) */}

          {/* Submit button */}
          <FeedbackSubmitButton
            onClick={handleSubmit}
            loading={loading}
            disabled={!!rateLimitMsg}
          />

        </div>
      </div>
    </section>
  );
});

export default FeedbackForm;
