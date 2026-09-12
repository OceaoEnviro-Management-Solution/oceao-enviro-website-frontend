// OTPInputField.jsx — 6-box OTP input with auto-focus, backspace, and paste support.
// Props: value (string[6]), onChange (fn), disabled (bool), hasError (bool)

import { useRef } from 'react';

const OTP_LENGTH = 6;

export default function OTPInputField({ value = [], onChange, disabled = false, hasError = false }) {
  const refs = useRef([]);

  // Ensure refs array has correct length
  if (refs.current.length !== OTP_LENGTH) {
    refs.current = Array(OTP_LENGTH).fill(null);
  }

  // Handle single digit input
  const handleChange = (index, e) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1); // digits only, last char
    const newValue = [...value];
    newValue[index] = char;
    onChange(newValue);

    // Auto-focus next box if digit entered
    if (char && index < OTP_LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  // Handle backspace — move to previous box
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (value[index]) {
        // Clear current box
        const newValue = [...value];
        newValue[index] = '';
        onChange(newValue);
      } else if (index > 0) {
        // Move to previous box
        refs.current[index - 1]?.focus();
        const newValue = [...value];
        newValue[index - 1] = '';
        onChange(newValue);
      }
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      refs.current[index - 1]?.focus();
    }
    if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  // Handle paste — split across all boxes
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;

    const newValue = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((char, i) => {
      newValue[i] = char;
    });
    onChange(newValue);

    // Focus the box after last pasted digit
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    refs.current[focusIndex]?.focus();
  };

  return (
    <div className="flex items-center gap-3 justify-center" role="group" aria-label="One-time password input">
      {Array.from({ length: OTP_LENGTH }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (refs.current[index] = el)}
          id={`otp-box-${index}`}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
          className={`
            w-12 h-14 text-center text-xl font-bold rounded-xl border-2 outline-none
            transition-all duration-200 select-none
            ${disabled ? 'bg-gray-50 cursor-not-allowed text-gray-400 border-gray-200' : 'bg-white'}
            ${hasError
              ? 'border-red-400 text-red-600 bg-red-50/30 animate-shake'
              : value[index]
              ? 'border-[#017119] text-[#017119]'
              : 'border-gray-200 text-[#011539] focus:border-[#017119] focus:ring-4 focus:ring-[#017119]/10'
            }
          `}
        />
      ))}
    </div>
  );
}
