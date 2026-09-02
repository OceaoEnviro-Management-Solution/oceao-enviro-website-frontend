// BookingSuccess.jsx — PAGE 5 of booking flow (/booking-vm/success)
// Shows animated success card with booking ID + details.
// Clears Context after render so the system is ready for a new booking.

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingContext } from '../../hooks/useBookingContext';
import BookingSuccessCard from '../../components/booking/BookingSuccessCard';
import { PartyPopper } from 'lucide-react';

export default function BookingSuccess() {
  const navigate = useNavigate();
  const {
    bookingId,
    meetingLink,
    selectedDate,
    selectedTime,
    userDetails,
    resetBooking
  } = useBookingContext();

  // Redirect if no booking ID (user navigated directly)
  useEffect(() => {
    if (!bookingId) navigate('/booking-vm', { replace: true });
  }, [bookingId, navigate]);

  const handleBackToHome = () => {
    resetBooking(); // Clear Context for next booking
    navigate('/');
  };

  if (!bookingId) return null;

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
            <PartyPopper className="w-5 h-5 text-[#017119]" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#017119] mb-2">
            Oceao Enviro Group
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75] mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-base md:text-lg text-[#011539]/70 font-medium max-w-md mx-auto">
            Your virtual meeting has been successfully scheduled
          </p>
        </div>
      </section>

      {/* ── CONTENT SECTION ───────────────────────────────────────────────── */}
      <div className="flex items-start justify-center py-10 px-4">
        <div className="w-full max-w-md">
          <BookingSuccessCard
            bookingId={bookingId}
            meetingLink={meetingLink}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            email={userDetails?.email}
            onBackToHome={handleBackToHome}
          />
        </div>
      </div>
    </div>
  );
}
