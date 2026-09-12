// SubmissionSummary.jsx — Read-only display of what the user submitted.
// Receives submittedData from FeedbackContext after successful submission.
// Used inside SubmissionSuccess.jsx.

import { FEEDBACK_TYPES } from '../../constants/feedbackTypes';

export default function SubmissionSummary({ submittedData }) {
  if (!submittedData) return null;

  const typeInfo = FEEDBACK_TYPES.find(t => t.id === submittedData.type);

  const rows = [
    { label: 'Type', value: typeInfo ? `${typeInfo.icon} ${typeInfo.label}` : submittedData.type },
    { label: 'Name', value: submittedData.name },
    { label: 'Email', value: submittedData.email },
    submittedData.phone ? { label: 'Phone', value: submittedData.phone } : null,
    { label: 'Subject', value: submittedData.subject },
    { label: 'Message', value: submittedData.message },
    submittedData.attachmentName ? { label: 'Attachment', value: submittedData.attachmentName } : null
  ].filter(Boolean);

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-[#F8FAF8] overflow-hidden">

      {/* Header */}
      <div className="px-5 py-3 bg-[#E4F3E6]/60 border-b border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#017119]">
          What You Submitted
        </p>
      </div>

      {/* Rows */}
      <dl className="divide-y divide-gray-100">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex gap-4 px-5 py-3.5">
            <dt className="w-24 shrink-0 text-xs font-medium text-[#011539]/50 pt-0.5">
              {label}
            </dt>
            <dd className="flex-1 text-sm text-[#011539] font-medium break-words">
              {value}
            </dd>
          </div>
        ))}
      </dl>

    </div>
  );
}
