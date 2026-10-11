// CallbackStatusSelect.jsx — Compact status picker for one callback request.
// Options: Pending, Completed, No answer. A cancelled request shows a "Cancelled" badge
// instead (its status can no longer be changed).
// Props: value, name (for the accessible label), disabled, onChange(newStatus)

const OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'no_answer', label: 'No answer' },
];

export default function CallbackStatusSelect({ value, name = '', disabled = false, onChange }) {
  if (value === 'cancelled') {
    return (
      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-600">
        Cancelled
      </span>
    );
  }

  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      aria-label={name ? `Status for ${name}` : 'Callback status'}
      className="text-xs font-semibold text-[#011539] bg-white border border-gray-200 rounded-lg px-2 py-1
        cursor-pointer focus:outline-none focus:border-[#017119] disabled:opacity-60 disabled:cursor-wait"
    >
      {OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}
