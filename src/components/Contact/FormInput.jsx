// FormInput.jsx — Reusable form field renderer
// Renders: text, email, tel, textarea, dropdown (select), datepicker (react-datepicker)
// All styling is consistent; label is uppercase brand-green, focus turns border green.

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dropdownOptions } from '../../constants/contact';

const BASE_INPUT_CLASS = `
  w-full px-4 py-3 text-sm text-gray-800 bg-white
  border border-gray-200 rounded-lg
  placeholder-gray-400
  transition-all duration-200
  focus:outline-none focus:border-[#017119] focus:ring-2 focus:ring-[#017119]/10
`;

const ERROR_INPUT_CLASS = `
  border-red-400 focus:border-red-400 focus:ring-red-400/10
`;

export default function FormInput({ field, value, onChange, error }) {
  const { id, label, type, required, placeholder } = field;
  const inputClass = `${BASE_INPUT_CLASS} ${error ? ERROR_INPUT_CLASS : ''}`;

  // ── Date picker ──────────────────────────────────────────────────────────
  if (type === 'datepicker') {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 30);

    return (
      <div className="flex flex-col gap-1">
        <Label htmlFor={id} required={required}>{label}</Label>
        <DatePicker
          id={id}
          selected={value instanceof Date ? value : null}
          onChange={(date) => onChange(id, date)}
          minDate={today}
          maxDate={maxDate}
          placeholderText={placeholder}
          dateFormat="dd MMM yyyy"
          autoComplete="off"
          wrapperClassName="w-full"
          className={`${inputClass} cursor-pointer`}
        />
        <ErrorMsg>{error}</ErrorMsg>
      </div>
    );
  }

  // ── Dropdown (select) ─────────────────────────────────────────────────────
  if (type === 'dropdown') {
    const options = dropdownOptions[id] || [];
    return (
      <div className="flex flex-col gap-1">
        <Label htmlFor={id} required={required}>{label}</Label>
        <select
          id={id}
          value={value || ''}
          onChange={(e) => onChange(id, e.target.value)}
          className={`${inputClass} appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_14px_center] pr-10 cursor-pointer`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <ErrorMsg>{error}</ErrorMsg>
      </div>
    );
  }

  // ── Textarea ──────────────────────────────────────────────────────────────
  if (type === 'textarea') {
    return (
      <div className="flex flex-col gap-1">
        <Label htmlFor={id} required={required}>{label}</Label>
        <textarea
          id={id}
          value={value || ''}
          onChange={(e) => onChange(id, e.target.value)}
          placeholder={placeholder}
          rows={6}
          className={`${inputClass} resize-y min-h-[120px]`}
        />
        <ErrorMsg>{error}</ErrorMsg>
      </div>
    );
  }

  // ── Text / Email / Tel ────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id} required={required}>{label}</Label>
      <input
        id={id}
        type={type}
        value={value || ''}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={placeholder}
        autoComplete={type === 'email' ? 'email' : type === 'tel' ? 'tel' : 'off'}
        className={inputClass}
      />
      <ErrorMsg>{error}</ErrorMsg>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Label({ htmlFor, required, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[11px] font-bold uppercase tracking-wider text-[#017119]"
    >
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function ErrorMsg({ children }) {
  if (!children) return null;
  return (
    <p className="text-xs text-red-500 mt-0.5 flex items-center gap-1">
      <span>⚠</span> {children}
    </p>
  );
}
