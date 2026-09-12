// ConfirmationReview.jsx — PAGE 4 of booking flow (/booking-vm/confirmation)
// Displays all collected data. Confirm → creates booking → navigates to success.
// Edit → navigates back to form with data preserved in Context.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingContext } from '../../hooks/useBookingContext';
import { bookingApi } from '../../services/bookingApi';
import { formatDateDisplay, formatTimeDisplay } from '../../utils/validation';
import BookingStepper from '../../components/booking/BookingStepper';
import ConfirmationSummary from '../../components/booking/ConfirmationSummary';
import { AlertCircle, Edit2, CheckCircle, ClipboardList } from 'lucide-react';

export default function ConfirmationReview() {
  const navigate = useNavigate();
  const {
    userDetails,
    emailVerified,
    selectedDate,
    selectedTime,
    setBookingId,
    setMeetingLink
  } = useBookingContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Redirect guards
  if (!userDetails?.email) {
    navigate('/booking-vm', { replace: true });
    return null;
  }
  if (!emailVerified) {
    navigate('/booking-vm/otp', { replace: true });
    return null;
  }
  if (!selectedDate || !selectedTime) {
    navigate('/booking-vm/slots', { replace: true });
    return null;
  }

  // ── Confirm booking ────────────────────────────────────────────────────────
  const handleConfirm = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const bookingData = {
        ...userDetails,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        type: 'virtual-meeting'
      };

      const result = await bookingApi.createBooking(bookingData);

      if (result.success) {
        setBookingId(result.bookingId);
        setMeetingLink(result.meetingLink);
        navigate('/booking-vm/success');
      } else {
        setSubmitError('Booking failed. Please try again.');
      }
    } catch {
      setSubmitError('Unable to complete booking. Please check your connection and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = () => navigate('/booking-vm');

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative w-full h-[200px] md:h-[280px] bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-[#017119]/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#FFA500]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#0F1D75]/5 blur-3xl" />

        <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#017119]/15 mb-3">
            <ClipboardList className="w-5 h-5 text-[#017119]" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#017119] mb-2">
            Oceao Enviro Group
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75] mb-2">
            Review Your Booking
          </h1>
          <p className="text-base md:text-lg text-[#011539]/70 font-medium max-w-md mx-auto">
            Verify all details before confirming your meeting
          </p>
        </div>
      </section>

      {/* ── CONTENT SECTION ───────────────────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-4 py-10">
        <BookingStepper currentStep={4} />

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 mt-6">

          {/* Summary component */}
          <ConfirmationSummary
            userDetails={userDetails}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />

          {/* Error state */}
          {submitError && (
            <div className="mt-6 flex items-start gap-3 px-4 py-3.5 bg-red-50 border border-red-200 rounded-2xl">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-red-700 font-medium">{submitError}</p>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="text-xs text-red-600 underline mt-1"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {/* Edit */}
            <button
              id="edit-booking-btn"
              type="button"
              onClick={handleEdit}
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-gray-200
                text-sm font-semibold text-gray-600 hover:border-gray-300 hover:bg-gray-50
                transition-all duration-200 disabled:opacity-50 sm:w-auto"
            >
              <Edit2 className="w-4 h-4" />
              Edit Details
            </button>

            {/* Confirm */}
            <button
              id="confirm-booking-btn"
              type="button"
              onClick={handleConfirm}
              disabled={isSubmitting}
              className={`
                flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl
                font-semibold text-sm transition-all duration-200
                ${!isSubmitting
                  ? 'bg-[#017119] text-white hover:bg-[#014D11] active:scale-[0.98] shadow-lg shadow-[#017119]/25'
                  : 'bg-[#017119]/70 text-white cursor-wait'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                  </svg>
                  Confirming…
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Confirm Booking
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
