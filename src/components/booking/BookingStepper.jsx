// BookingStepper.jsx — Step indicator for the booking flow.
// Shows 4 steps: Details → Verify → Schedule → Confirm
// Props: currentStep (1-4)

const STEPS = [
  { number: 1, label: 'Details' },
  { number: 2, label: 'Verify' },
  { number: 3, label: 'Schedule' },
  { number: 4, label: 'Confirm' },
];

export default function BookingStepper({ currentStep }) {
  return (
    <div className="flex items-center justify-center mb-8 select-none" aria-label="Booking progress">
      {STEPS.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isInactive = step.number > currentStep;

        return (
          <div key={step.number} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1">
              {/* Circle */}
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                  ${isCompleted ? 'bg-[#017119] text-white' : ''}
                  ${isActive ? 'bg-[#017119] text-white ring-4 ring-[#017119]/20' : ''}
                  ${isInactive ? 'bg-gray-100 text-gray-400 border-2 border-gray-200' : ''}
                `}
                aria-current={isActive ? 'step' : undefined}
              >
                {isCompleted ? (
                  // Checkmark for completed steps
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>

              {/* Label */}
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  isActive ? 'text-[#017119]' :
                  isCompleted ? 'text-[#017119]' :
                  'text-gray-400'
                }`}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line (except after last step) */}
            {index < STEPS.length - 1 && (
              <div
                className={`
                  w-12 sm:w-16 h-0.5 mx-1 mb-5 transition-colors duration-300
                  ${step.number < currentStep ? 'bg-[#017119]' : 'bg-gray-200'}
                `}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
