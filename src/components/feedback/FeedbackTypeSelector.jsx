// FeedbackTypeSelector.jsx — 5-card type selector for the Feedback page.
// Renders type cards from FEEDBACK_TYPES constant.
// Only one card can be selected at a time (radio-button behaviour).
// On selection: updates Context + smooth-scrolls to form section via ref.

import { FEEDBACK_TYPES } from '../../constants/feedbackTypes';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';

export default function FeedbackTypeSelector({ formRef }) {
  const { formData, setFormData } = useFeedbackContext();

  function handleSelect(typeId) {
    setFormData(prev => ({ ...prev, type: typeId }));

    // Smooth scroll to form section after a brief delay (let React re-render first)
    setTimeout(() => {
      formRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#017119] mb-2">
            Step 1
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1D75]">
            How Can We Help?
          </h2>
          <p className="text-sm text-[#011539]/55 mt-2">
            Select a category that best describes your message
          </p>
        </div>

        {/* Type card grid — 3 cols desktop, 1 col mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FEEDBACK_TYPES.map((type) => {
            const isSelected = formData.type === type.id;

            return (
              <button
                key={type.id}
                type="button"
                onClick={() => handleSelect(type.id)}
                className={[
                  'relative flex flex-col items-center gap-2 rounded-2xl border-2 px-5 py-6 cursor-pointer transition-all duration-200 text-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#017119]',
                  isSelected
                    ? 'border-[#017119] bg-[#017119] text-white shadow-lg scale-[1.02]'
                    : 'border-gray-200 bg-white text-[#011539] hover:border-[#017119]/40 hover:shadow-md hover:scale-[1.01]'
                ].join(' ')}
                aria-pressed={isSelected}
              >
                {/* Checkmark badge — visible when selected */}
                {isSelected && (
                  <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-white flex items-center justify-center">
                    <span className="text-[#017119] text-xs font-bold">✓</span>
                  </span>
                )}

                {/* Icon */}
                <span className="text-4xl leading-none" role="img" aria-label={type.label}>
                  {type.icon}
                </span>

                {/* Label */}
                <span className={`text-base font-semibold ${isSelected ? 'text-white' : 'text-[#0F1D75]'}`}>
                  {type.label}
                </span>

                {/* Description */}
                <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-[#011539]/50'}`}>
                  {type.description}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
