// SubmissionSuccess.jsx — Full success state shown after feedback is submitted.
// Displays: animated checkmark, thank-you message, SubmissionSummary, Back to Home button.
// Reads submissionData from FeedbackContext.

import { useNavigate } from 'react-router-dom';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import SubmissionSummary from './SubmissionSummary';

export default function SubmissionSuccess() {
  const navigate = useNavigate();
  const { submissionData, resetForm } = useFeedbackContext();

  function handleBackToHome() {
    resetForm(); // Clear form + localStorage
    navigate('/');
  }

  function handleSubmitAnother() {
    resetForm(); // Reset but stay on page
  }

  return (
    <section className="w-full bg-white py-12 px-4">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">

        {/* Success icon */}
        <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 rounded-full bg-[#E4F3E6] flex items-center justify-center shadow-sm">
            <span className="text-4xl text-[#017119]" aria-label="Success checkmark">✓</span>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#0F1D75] mb-2">Thank You!</h2>
            <p className="text-base text-[#011539]/65 leading-relaxed max-w-md">
              We have received your feedback. Your message has been sent successfully to the Oceao Enviro team.
            </p>
            <p className="text-sm text-[#011539]/45 mt-2">
              A confirmation has also been sent to your email address.
            </p>
          </div>
        </div>

        {/* Submission summary */}
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <SubmissionSummary submittedData={submissionData} />
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          <button
            type="button"
            onClick={handleBackToHome}
            className="flex-1 rounded-xl bg-[#017119] text-white text-sm font-semibold px-6 py-3.5 hover:bg-[#014D11] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#017119]/50"
          >
            Back to Home
          </button>

          <button
            type="button"
            onClick={handleSubmitAnother}
            className="flex-1 rounded-xl border-2 border-[#017119]/30 text-[#017119] text-sm font-semibold px-6 py-3.5 hover:border-[#017119] hover:bg-[#E4F3E6]/40 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#017119]/50"
          >
            Submit Another
          </button>
        </div>

      </div>
    </section>
  );
}
