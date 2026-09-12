// BookingSuccessCard.jsx — Success confirmation after booking is confirmed.
// Props: bookingId, selectedDate, selectedTime, email, meetingLink, onBackToHome

import { formatDateDisplay, formatTimeDisplay } from '../../utils/validation';
import { CheckCircle, CalendarDays, Clock, Mail, ExternalLink } from 'lucide-react';

export default function BookingSuccessCard({
  bookingId,
  selectedDate,
  selectedTime,
  email,
  meetingLink,
  onBackToHome
}) {
  return (
    <div className="flex flex-col items-center text-center max-w-md mx-auto">
      {/* Animated success icon */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-[#E4F3E6] flex items-center justify-center animate-[successPop_0.5s_ease-out]">
          <CheckCircle className="w-12 h-12 text-[#017119]" strokeWidth={1.5} />
        </div>
        {/* Pulse ring */}
        <div className="absolute inset-0 rounded-full bg-[#017119]/10 animate-ping" style={{ animationDuration: '2s' }} />
      </div>

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#011539] mb-2">
        Booking Confirmed!
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Your virtual meeting has been successfully scheduled.
      </p>

      {/* Booking details card */}
      <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 text-left space-y-4">

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#E4F3E6] rounded-xl flex items-center justify-center flex-shrink-0">
            <CalendarDays className="w-5 h-5 text-[#017119]" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Date</p>
            <p className="text-sm font-semibold text-[#011539]">
              {selectedDate ? formatDateDisplay(selectedDate) : '—'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#E4F3E6] rounded-xl flex items-center justify-center flex-shrink-0">
            <Clock className="w-5 h-5 text-[#017119]" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Time</p>
            <p className="text-sm font-semibold text-[#011539]">
              {selectedTime ? formatTimeDisplay(selectedTime) : '—'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#E4F3E6] rounded-xl flex items-center justify-center flex-shrink-0">
            <Mail className="w-5 h-5 text-[#017119]" />
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">Confirmation sent to</p>
            <p className="text-sm font-semibold text-[#011539]">{email}</p>
          </div>
        </div>

        {/* Booking ID */}
        <div className="pt-3 border-t border-dashed border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Booking ID</p>
          <p className="text-sm font-mono font-bold text-[#0F1D75] bg-[#EAEBF7] px-3 py-1.5 rounded-lg inline-block">
            {bookingId}
          </p>
        </div>
      </div>

      {/* Meeting link */}
      {meetingLink && (
        <a
          href={meetingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-2 border-[#017119] text-[#017119] font-semibold text-sm hover:bg-[#E4F3E6] transition-colors duration-200 mb-4"
        >
          <ExternalLink className="w-4 h-4" />
          Join Meeting Link
        </a>
      )}

      {/* Back to home */}
      <button
        id="back-to-home-btn"
        type="button"
        onClick={onBackToHome}
        className="w-full px-5 py-3.5 bg-[#017119] text-white font-semibold text-sm rounded-xl
          hover:bg-[#014D11] active:scale-[0.98] transition-all duration-200"
      >
        Back to Home
      </button>

      <style>{`
        @keyframes successPop {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
