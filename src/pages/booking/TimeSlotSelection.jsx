// TimeSlotSelection.jsx — PAGE 3 of booking flow (/booking-vm/slots)
// Two-column: DateSelector (left) + TimeSlotGrid (right)
// Fetches slots on date change, shows skeleton loaders, allows one slot selection.

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingContext } from '../../hooks/useBookingContext';
import { bookingApi } from '../../services/bookingApi';
import { formatDateDisplay } from '../../utils/validation';
import BookingStepper from '../../components/booking/BookingStepper';
import DateSelector from '../../components/booking/DateSelector';
import TimeSlotGrid from '../../components/booking/TimeSlotGrid';
import { CalendarDays, AlertCircle, RefreshCw } from 'lucide-react';

export default function TimeSlotSelection() {
  const navigate = useNavigate();
  const {
    emailVerified,
    userDetails,
    selectedDate, setSelectedDate,
    selectedTime, setSelectedTime
  } = useBookingContext();

  const [slots, setSlots] = useState([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState(null);

  // Redirect guards
  useEffect(() => {
    if (!userDetails?.email) navigate('/booking-vm', { replace: true });
    else if (!emailVerified) navigate('/booking-vm/otp', { replace: true });
  }, [emailVerified, userDetails, navigate]);

  // Fetch slots whenever selected date changes
  useEffect(() => {
    if (!selectedDate) return;
    fetchSlots(selectedDate);
  }, [selectedDate]);

  const fetchSlots = async (date) => {
    setIsLoadingSlots(true);
    setSlotError(null);
    setSelectedTime(null); // Clear previous selection
    try {
      const result = await bookingApi.getAvailability(date);
      if (result.success) setSlots(result.slots);
      else setSlotError('Failed to load availability.');
    } catch {
      setSlotError('Unable to fetch availability. Please check your connection.');
    } finally {
      setIsLoadingSlots(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSlotSelect = (time) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    navigate('/booking-vm/confirmation');
  };

  const canContinue = !!selectedDate && !!selectedTime;

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
            <CalendarDays className="w-5 h-5 text-[#017119]" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#017119] mb-2">
            Oceao Enviro Group
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75] mb-2">
            Pick a Time Slot
          </h1>
          <p className="text-base md:text-lg text-[#011539]/70 font-medium max-w-md mx-auto">
            Choose your preferred date and time for the meeting
          </p>
        </div>
      </section>

      {/* ── CONTENT SECTION ───────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 py-20">
        <BookingStepper currentStep={3} />

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          {/* ── LEFT: Calendar ──────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 h-fit">
            <div className="flex items-center gap-2 mb-5">
              <CalendarDays className="w-5 h-5 text-[#017119]" />
              <h2 className="text-sm font-bold text-[#011539] uppercase tracking-wide">Select Date</h2>
            </div>

            <DateSelector
              selectedDate={selectedDate}
              onChange={handleDateChange}
            />

            {/* Helper text */}
            <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-gray-200 inline-block" />
                Weekends not available
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#017119] inline-block" />
                Selected
              </span>
            </div>
          </div>

          {/* ── RIGHT: Slots ─────────────────────────────────────────────── */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            {/* Header */}
            <div className="mb-5">
              <h2 className="text-sm font-bold text-[#011539] uppercase tracking-wide">Available Times</h2>
              {selectedDate && (
                <p className="text-gray-500 text-sm mt-1">{formatDateDisplay(selectedDate)}</p>
              )}
            </div>

            {/* No date selected prompt */}
            {!selectedDate && (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CalendarDays className="w-10 h-10 text-gray-300 mb-3" />
                <p className="text-sm text-gray-500 font-medium">Please select a date first</p>
                <p className="text-xs text-gray-400 mt-1">Available time slots will appear here</p>
              </div>
            )}

            {/* Error state */}
            {slotError && (
              <div className="flex flex-col items-center gap-3 py-8 text-center">
                <AlertCircle className="w-8 h-8 text-red-400" />
                <p className="text-sm text-red-600 font-medium">{slotError}</p>
                <button
                  type="button"
                  onClick={() => fetchSlots(selectedDate)}
                  className="flex items-center gap-2 text-sm text-[#017119] hover:underline font-semibold"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </button>
              </div>
            )}

            {/* Slot grid */}
            {selectedDate && !slotError && (
              <TimeSlotGrid
                slots={slots}
                selectedTime={selectedTime}
                onSelectSlot={handleSlotSelect}
                isLoading={isLoadingSlots}
              />
            )}

            {/* Continue button */}
            {selectedDate && !slotError && (
              <div className="mt-6 pt-5 border-t border-gray-100">
                <button
                  id="continue-to-confirmation-btn"
                  type="button"
                  onClick={handleContinue}
                  disabled={!canContinue}
                  className={`
                    w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl
                    font-semibold text-sm transition-all duration-200
                    ${canContinue
                      ? 'bg-[#017119] text-white hover:bg-[#014D11] active:scale-[0.98] shadow-lg shadow-[#017119]/25'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Continue
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
