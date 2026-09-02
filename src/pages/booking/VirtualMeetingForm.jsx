// VirtualMeetingForm.jsx — PAGE 1 of booking flow (/booking-vm)
// Layout: Gradient hero + centered form (single-column)
// Validates all fields, stores to Context, navigates to /booking-vm/otp

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingContext } from '../../hooks/useBookingContext';
import { validateField } from '../../utils/validation';
import { bookingApi } from '../../services/bookingApi';
import BookingStepper from '../../components/booking/BookingStepper';
import BookingFormInput from '../../components/booking/BookingFormInput';
import { Video } from 'lucide-react';

// ── Field definitions ────────────────────────────────────────────────────────
const FIELDS = [
  {
    id: 'fullName',
    label: 'Full Name',
    type: 'text',
    required: true,
    placeholder: 'Your full name',
    validation: 'minLength:3',
    autoComplete: 'name'
  },
  {
    id: 'email',
    label: 'Business Email',
    type: 'email',
    required: true,
    placeholder: 'you@company.com',
    autoComplete: 'email'
  },
  {
    id: 'mobile',
    label: 'Mobile Number',
    type: 'tel',
    required: true,
    placeholder: '+91 XXXXX XXXXX',
    autoComplete: 'tel'
  },
  {
    id: 'company',
    label: 'Company / Organisation',
    type: 'text',
    required: false,
    placeholder: 'Your company name',
    autoComplete: 'organization'
  },
  {
    id: 'designation',
    label: 'Designation',
    type: 'text',
    required: false,
    placeholder: 'Your job title',
    autoComplete: 'organization-title'
  }
];

// ── Component ────────────────────────────────────────────────────────────────
export default function VirtualMeetingForm() {
  const navigate = useNavigate();
  const { userDetails, setUserDetails, setOtpSent } = useBookingContext();

  const [formData, setFormData] = useState({
    fullName: userDetails.fullName || '',
    email: userDetails.email || '',
    mobile: userDetails.mobile || '',
    company: userDetails.company || '',
    designation: userDetails.designation || ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleChange = (id, value) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors(prev => ({ ...prev, [id]: '' }));
  };

  const handleBlur = (id, value) => {
    const field = FIELDS.find(f => f.id === id);
    if (!field) return;
    const error = validateField(field, value);
    if (error) setErrors(prev => ({ ...prev, [id]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    FIELDS.forEach(field => {
      const error = validateField(field, formData[field.id]);
      if (error) newErrors[field.id] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = FIELDS.filter(f => f.required).every(f => {
    const val = formData[f.id];
    return val && val.trim() !== '' && !validateField(f, val);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);
    try {
      await bookingApi.sendOtp(formData.email);
      setUserDetails({ ...formData });
      setOtpSent(true);
      navigate('/booking-vm/otp');
    } catch {
      setErrors({ _global: 'Failed to send OTP. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative w-full h-[200px] md:h-[280px] bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] flex items-center justify-center overflow-hidden">
        {/* Subtle dark overlay */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />

        {/* Decorative blobs */}
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-[#017119]/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#FFA500]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#0F1D75]/5 blur-3xl" />

        <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#017119]/15 mb-3">
            <Video className="w-5 h-5 text-[#017119]" />
          </div>

          {/* Eyebrow label */}
          <p className="text-sm font-semibold uppercase tracking-widest text-[#017119] mb-2">
            Oceao Enviro Group
          </p>

          {/* Main heading */}
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75] mb-2">
            Book a Virtual Meeting
          </h1>

          {/* Subheading */}
          <p className="text-base md:text-lg text-[#011539]/70 font-medium max-w-md mx-auto">
            Connect one-on-one with our environmental experts
          </p>
        </div>
      </section>

      {/* ── FORM SECTION ──────────────────────────────────────────────────── */}
      <div className="max-w-xl mx-auto px-6 py-10 sm:px-8">

        {/* Stepper */}
        <BookingStepper currentStep={1} />

        {/* Subtext */}
        <p className="text-gray-500 text-sm mt-6 mb-8">
          Fill in your details to get started. We'll verify your email next.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate id="virtual-meeting-form">
          <div className="space-y-5">
            {FIELDS.map(field => (
              <BookingFormInput
                key={field.id}
                id={field.id}
                label={field.label}
                type={field.type}
                value={formData[field.id]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors[field.id]}
                placeholder={field.placeholder}
                required={field.required}
                autoComplete={field.autoComplete}
              />
            ))}

            {/* Global error */}
            {errors._global && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errors._global}
              </div>
            )}

            {/* Submit button */}
            <button
              id="continue-verify-email-btn"
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`
                w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl
                font-semibold text-sm transition-all duration-200
                ${isFormValid && !isSubmitting
                  ? 'bg-[#017119] text-white hover:bg-[#014D11] active:scale-[0.98] shadow-lg shadow-[#017119]/25'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                  </svg>
                  Sending OTP...
                </>
              ) : (
                <>
                  Continue &amp; Verify Email
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
