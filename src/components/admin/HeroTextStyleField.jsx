// HeroTextStyleField.jsx — "Text style" of a hero slide: Dark text (for light photos) or Light text
// (for dark photos). The colour of the hero heading, paragraph and buttons follows it while this
// slide is on show. A "Preview" button shows the result on the photo before anything is saved.
// Props: value ('dark' | 'light'), onChange(style), onPreview(), previewDisabled, previewHint, disabled

import { Eye } from 'lucide-react';
import { HERO_TEXT_STYLE_LABELS, HERO_TEXT_STYLE_NAMES } from '../sections/heroTextStyles';

const OPTIONS = {
  dark: { hint: 'For light photos', swatch: 'bg-gradient-to-br from-white to-gray-300', sample: 'text-[#011539]' },
  light: { hint: 'For dark photos', swatch: 'bg-gradient-to-br from-gray-600 to-gray-900', sample: 'text-white' },
};

export default function HeroTextStyleField({ value, onChange, onPreview, previewDisabled, previewHint, disabled }) {
  return (
    <fieldset disabled={disabled}>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <legend className="text-sm font-semibold text-[#011539]">Text style on the homepage</legend>
        <button
          type="button"
          onClick={onPreview}
          disabled={previewDisabled || disabled}
          title={previewDisabled ? previewHint : 'See how the hero will look with this photo'}
          className="flex items-center gap-1.5 rounded-xl bg-[#EAEBF7] px-3.5 py-2 text-xs font-semibold text-[#0F1D75] transition-colors hover:bg-[#dcdff2] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          Preview
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {HERO_TEXT_STYLE_NAMES.map((name) => {
          const option = OPTIONS[name];
          const selected = value === name;
          return (
            <label
              key={name}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-3 transition-colors focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#017119]
                ${selected ? 'border-[#017119] bg-[#E4F3E6]/50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <input type="radio" name="hero-text-style" value={name} checked={selected} onChange={() => onChange(name)} className="sr-only" />
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-bold ${option.swatch} ${option.sample}`} aria-hidden="true">Aa</span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-[#011539]">{HERO_TEXT_STYLE_LABELS[name]}</span>
                <span className="block text-xs text-gray-500">{option.hint}</span>
              </span>
            </label>
          );
        })}
      </div>
      <p className="mt-1.5 text-xs text-gray-400">Pick the style that stays easy to read on this photo, behind the heading on the left.</p>
    </fieldset>
  );
}
