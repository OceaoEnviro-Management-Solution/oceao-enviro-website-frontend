// TimeSlotCard.jsx — Single meeting slot card (BookMyShow-style).
// Props: time (string '10:00'), status ('available'|'booked'|'blocked'|'loading'), isSelected, onClick
// Displays formatted time + status badge. Click selects if available.

import { formatTimeDisplay } from '../../utils/validation';
import { CheckCircle, Clock, Ban, Loader2 } from 'lucide-react';

export default function TimeSlotCard({ time, status, isSelected, onClick }) {
  const isAvailable = status === 'available';
  const isBooked = status === 'booked';
  const isBlocked = status === 'blocked';
  const isLoading = status === 'loading';
  const isDisabled = isBooked || isBlocked || isLoading;

  const displayTime = isLoading ? '' : formatTimeDisplay(time);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="h-[72px] rounded-2xl bg-gray-100 animate-pulse" aria-label="Loading slot" />
    );
  }

  return (
    <button
      type="button"
      onClick={isAvailable ? onClick : undefined}
      disabled={isDisabled}
      aria-label={`${displayTime} — ${status}`}
      aria-pressed={isSelected}
      className={`
        w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2
        transition-all duration-200 select-none text-left
        ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
        ${isSelected
          ? 'border-[#017119] bg-[#017119] shadow-lg shadow-[#017119]/20 scale-[1.01]'
          : isAvailable
          ? 'border-[#017119]/40 bg-white hover:border-[#017119] hover:shadow-md hover:scale-[1.01]'
          : 'border-gray-200 bg-gray-50/50'
        }
      `}
    >
      {/* Left — Time + Duration */}
      <div>
        <p className={`text-base font-bold ${isSelected ? 'text-white' : isDisabled ? 'text-gray-400' : 'text-[#011539]'}`}>
          {displayTime}
        </p>
        <p className={`text-xs mt-0.5 ${isSelected ? 'text-white/80' : isDisabled ? 'text-gray-400' : 'text-gray-500'}`}>
          1 hour session
        </p>
      </div>

      {/* Right — Status badge + icon */}
      <div className="flex items-center gap-2">
        {/* Status label */}
        <span className={`
          text-xs font-semibold px-2.5 py-1 rounded-full
          ${isSelected ? 'bg-white/20 text-white' :
            isAvailable ? 'bg-[#E4F3E6] text-[#017119]' :
            isBooked ? 'bg-gray-100 text-gray-500' :
            'bg-orange-50 text-orange-600'
          }
        `}>
          {isSelected ? 'Selected' : isAvailable ? 'Available' : isBooked ? 'Booked' : 'Blocked'}
        </span>

        {/* Icon */}
        {isSelected && <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />}
        {isAvailable && !isSelected && <Clock className="w-5 h-5 text-[#017119] flex-shrink-0" />}
        {(isBooked || isBlocked) && <Ban className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </div>
    </button>
  );
}
