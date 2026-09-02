// BookingFormInput.jsx — Reusable form field with label, input, validation state.
// Props: id, label, type, value, onChange, onBlur, error, placeholder, required, disabled

export default function BookingFormInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  disabled = false,
  autoComplete,
}) {
  const hasError = !!error;
  const isValid = !hasError && value && value.trim() !== '';

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label */}
      <label
        htmlFor={id}
        className="text-sm font-semibold text-[#011539]"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {/* Input wrapper */}
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value || ''}
          onChange={(e) => onChange(id, e.target.value)}
          onBlur={onBlur ? () => onBlur(id, value) : undefined}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          className={`
            w-full px-4 py-3 rounded-xl text-sm text-[#011539] placeholder-gray-400
            border-2 outline-none transition-all duration-200
            ${disabled ? 'bg-gray-50 cursor-not-allowed text-gray-400' : 'bg-white'}
            ${hasError
              ? 'border-red-400 focus:border-red-500 bg-red-50/30'
              : isValid
              ? 'border-[#017119] focus:border-[#017119] bg-white'
              : 'border-gray-200 focus:border-[#017119] focus:bg-white hover:border-gray-300'
            }
          `}
        />

        {/* Success checkmark icon */}
        {isValid && !hasError && !disabled && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#017119]">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Error icon */}
        {hasError && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p id={`${id}-error`} className="text-xs text-red-600 flex items-center gap-1 mt-0.5">
          {error}
        </p>
      )}
    </div>
  );
}
