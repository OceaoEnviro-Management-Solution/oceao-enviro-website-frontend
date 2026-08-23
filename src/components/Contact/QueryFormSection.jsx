// QueryFormSection.jsx — Tab 2: Send Us Your Query (8-field form)
// Uses useFormValidation hook + FormInput renderer + SuccessPopup.
// On valid submit: shows success popup. On popup close: resets form.

import { useState } from 'react';
import { Send } from 'lucide-react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { formFields } from '../../constants/contact';
import FormInput from './FormInput';
import SuccessPopup from './SuccessPopup';

export default function QueryFormSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formData, handleChange, errors, handleSubmit, resetForm } =
    useFormValidation(formFields.queryForm);

  const onSuccess = (data) => {
    setIsSubmitting(true);
    // TODO Phase 2: POST to /api/contact/query
    console.log('Query form ready for backend:', {
      type: 'query',
      data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });
    // Simulate brief network delay for UX realism
    setTimeout(() => {
      setIsSubmitting(false);
      setShowPopup(true);
    }, 600);
  };

  const handleClose = () => {
    setShowPopup(false);
    resetForm();
  };

  const hasErrors = Object.values(errors).some(Boolean);

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-[#011539] mb-2">Send Us Your Query</h2>
        <p className="text-sm text-gray-500">
          Fill in the details below and we'll get back to you within 24–48 hours.
        </p>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e, onSuccess)}
        noValidate
        className="flex flex-col gap-6"
      >
        {/* Row 1: Full Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput
            field={formFields.queryForm[0]}
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <FormInput
            field={formFields.queryForm[1]}
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        {/* Row 2: Phone + Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput
            field={formFields.queryForm[2]}
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <FormInput
            field={formFields.queryForm[3]}
            value={formData.company}
            onChange={handleChange}
            error={errors.company}
          />
        </div>

        {/* Row 3: Industry + How did you hear */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput
            field={formFields.queryForm[4]}
            value={formData.industry}
            onChange={handleChange}
            error={errors.industry}
          />
          <FormInput
            field={formFields.queryForm[5]}
            value={formData.hearAbout}
            onChange={handleChange}
            error={errors.hearAbout}
          />
        </div>

        {/* Subject */}
        <FormInput
          field={formFields.queryForm[6]}
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
        />

        {/* Query textarea */}
        <FormInput
          field={formFields.queryForm[7]}
          value={formData.query}
          onChange={handleChange}
          error={errors.query}
        />

        {/* Validation summary (shows if user tried to submit with errors) */}
        {hasErrors && (
          <p className="text-xs text-red-500 text-center">
            Please correct the errors above before submitting.
          </p>
        )}

        {/* Submit */}
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-bold text-white
              transition-all duration-200 shadow-sm
              ${isSubmitting
                ? 'bg-gray-400 cursor-not-allowed opacity-70'
                : 'bg-[#017119] hover:bg-[#015a14] active:scale-[0.98] hover:shadow-md'
              }
              sm:w-auto w-full justify-center
            `}
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                </svg>
                Sending…
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Query
              </>
            )}
          </button>
        </div>
      </form>

      <SuccessPopup isOpen={showPopup} onClose={handleClose} />
    </section>
  );
}
