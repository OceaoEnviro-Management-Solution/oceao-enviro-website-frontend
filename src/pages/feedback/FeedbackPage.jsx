// FeedbackPage.jsx — Main page for the Feedback & Complaint flow.
// Route: /contact/feedback
//
// Structure:
//   FeedbackProvider (wraps entire page, provides Context)
//     ↓ FeedbackHero         — gradient hero (uniform with other pages)
//     ↓ FeedbackTypeSelector — 5 type cards, triggers scroll to form on select
//     ↓ FeedbackForm         — form fields + submit (hidden once submitted)
//     ↓ SubmissionSuccess    — shown after successful submission
//
// Note: FeedbackProvider is placed here (not in AppRoutes) because feedback
// is a single page — no multi-step navigation needs shared Context across routes.

import { useRef } from 'react';
import { FeedbackProvider } from '../../context/FeedbackContext';
import { useFeedbackContext } from '../../hooks/useFeedbackContext';
import FeedbackHero from '../../components/feedback/FeedbackHero';
import FeedbackTypeSelector from '../../components/feedback/FeedbackTypeSelector';
import FeedbackForm from '../../components/feedback/FeedbackForm';
import SubmissionSuccess from '../../components/feedback/SubmissionSuccess';

// ── Inner component — has access to FeedbackContext ───────────────────────────
function FeedbackPageInner() {
  const { submitted } = useFeedbackContext();
  const formRef = useRef(null);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero — always visible */}
      <FeedbackHero />

      {/* Type Selector — always visible (user can change type even after form is shown) */}
      {!submitted && (
        <FeedbackTypeSelector formRef={formRef} />
      )}

      {/* Form or Success — toggled by submitted state */}
      {submitted ? (
        <SubmissionSuccess />
      ) : (
        <FeedbackForm ref={formRef} />
      )}

    </div>
  );
}

// ── Page export — wraps inner component with Provider ─────────────────────────
export default function FeedbackPage() {
  return (
    <FeedbackProvider>
      <FeedbackPageInner />
    </FeedbackProvider>
  );
}
