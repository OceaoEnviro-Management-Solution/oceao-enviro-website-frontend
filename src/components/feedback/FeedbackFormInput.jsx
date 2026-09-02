// FeedbackFormInput.jsx — Reusable labeled input/textarea for the Feedback form.
// Mirrors BookingFormInput.jsx pattern. Works for text, email, tel, textarea types.
// Designed for reuse in Callback system too (per prompt spec).

export default function FeedbackFormInput({
  id,
  label,
  type = 'text',
  required = false,
  value,
  error,
  onChange,
  onBlur,
  placeholder,
  rows = 4
}) {
  const baseInputClass = [
    'w-full rounded-xl border px-4 py-3 text-sm text-[#011539] placeholder-[#011539]/35',
    'transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#017119]/30',
    error
      ? 'border-red-400 bg-red-50/30 focus:border-red-400'
      : 'border-gray-200 bg-white focus:border-[#017119]'
  ].join(' ');

  return (
    <div className="flex flex-col gap-1.5">

      {/* Label */}
      <label
        htmlFor={id}
        className="text-sm font-medium text-[#011539]/80"
      >
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {/* Input or Textarea */}
      {type === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          className={`${baseInputClass} resize-y min-h-[110px]`}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={baseInputClass}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />
      )}

      {/* Inline error message */}
      {error && (
        <p
          id={`${id}-error`}
          className="text-xs text-red-500 flex items-center gap-1"
          role="alert"
        >
          <span aria-hidden="true">❌</span>
          {error}
        </p>
      )}

    </div>
  );
}
