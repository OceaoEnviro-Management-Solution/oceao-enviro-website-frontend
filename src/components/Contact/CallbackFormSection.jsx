// CallbackFormSection.jsx — Tab 3: Request a Callback (5-field form)
// Uses react-datepicker (via FormInput) with min=today, max=today+30.
// Same pattern as QueryFormSection.

import { useState } from 'react';
import { PhoneIncoming } from 'lucide-react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { formFields } from '../../constants/contact';
import FormInput from './FormInput';
import SuccessPopup from './SuccessPopup';

export default function CallbackFormSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formData, handleChange, errors, handleSubmit, resetForm } =
    useFormValidation(formFields.callbackForm);

  const onSuccess = (data) => {
    setIsSubmitting(true);
    // TODO Phase 2: POST to /api/contact/callback
    console.log('Callback request ready for backend:', {
      type: 'callback',
      data: {
        ...data,
        preferredDate: data.preferredDate instanceof Date
          ? data.preferredDate.toISOString().split('T')[0]
          : data.preferredDate,
      },
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    });
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
        <h2 className="text-xl font-bold text-[#011539] mb-2">Request a Callback</h2>
        <p className="text-sm text-gray-500">
          Tell us when to call — we'll reach out at your preferred time.
        </p>
      </div>

      {/* Info banner */}
      <div className="mb-6 flex items-start gap-3 bg-[#0F1D75]/5 border border-[#0F1D75]/10 rounded-xl p-4">
        <PhoneIncoming className="w-5 h-5 text-[#0F1D75] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-[#0F1D75]/80 leading-relaxed">
          Callbacks are scheduled within <strong>30 days</strong> from today. Our team calls between
          9 AM and 8 PM IST, Monday to Saturday.
        </p>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e, onSuccess)}
        noValidate
        className="flex flex-col gap-6"
      >
        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput
            field={formFields.callbackForm[0]}
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
          <FormInput
            field={formFields.callbackForm[1]}
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
        </div>

        {/* Row 2: Preferred Date + Preferred Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput
            field={formFields.callbackForm[2]}
            value={formData.preferredDate}
            onChange={handleChange}
            error={errors.preferredDate}
          />
          <FormInput
            field={formFields.callbackForm[3]}
            value={formData.preferredTime}
            onChange={handleChange}
            error={errors.preferredTime}
          />
        </div>

        {/* Reason textarea */}
        <FormInput
          field={formFields.callbackForm[4]}
          value={formData.reason}
          onChange={handleChange}
          error={errors.reason}
        />

        {/* Validation summary */}
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
                Submitting…
              </>
            ) : (
              <>
                <PhoneIncoming className="w-4 h-4" />
                Request Callback
              </>
            )}
          </button>
        </div>
      </form>

      <SuccessPopup isOpen={showPopup} onClose={handleClose} />
    </section>
  );
}
