// FeedbackSubmitButton.jsx — Submit button with loading and disabled states.
// Reusable — designed for Callback system too (per prompt spec).

export default function FeedbackSubmitButton({
  onClick,
  disabled = false,
  loading = false,
  text = 'Submit Feedback'
}) {
  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={[
        'w-full flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold',
        'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#017119]/50',
        isDisabled
          ? 'bg-[#017119]/40 text-white cursor-not-allowed opacity-70'
          : 'bg-[#017119] text-white hover:bg-[#014D11] active:scale-[0.98] shadow-sm hover:shadow-md'
      ].join(' ')}
      aria-busy={loading}
    >
      {loading ? (
        <>
          {/* Spinner */}
          <span
            className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
            aria-hidden="true"
          />
          Sending...
        </>
      ) : (
        <>
          <span aria-hidden="true">📤</span>
          {text}
        </>
      )}
    </button>
  );
}
