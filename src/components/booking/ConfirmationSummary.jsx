// ConfirmationSummary.jsx — Displays all collected booking data in structured sections.
// Props: userDetails, selectedDate, selectedTime, meetingTopic

import { formatDateDisplay, formatTimeDisplay } from '../../utils/validation';
import { User, Mail, Phone, Building2, Briefcase, CalendarDays, Clock } from 'lucide-react';

function SectionRow({ icon: Icon, label, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-none">
      <div className="w-8 h-8 rounded-lg bg-[#E4F3E6] flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-[#017119]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">{label}</p>
        <p className="text-sm font-semibold text-[#011539] truncate">{value}</p>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-0.5 bg-[#017119] rounded-full" />
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#017119]">{title}</h3>
      </div>
      <div className="bg-gray-50/60 rounded-2xl px-4 divide-y divide-gray-100">
        {children}
      </div>
    </div>
  );
}

export default function ConfirmationSummary({ userDetails, selectedDate, selectedTime }) {
  const { fullName, email, mobile, company, designation } = userDetails || {};

  return (
    <div>
      {/* Contact section */}
      <Section title="Contact">
        <SectionRow icon={User} label="Full Name" value={fullName} />
        <SectionRow icon={Mail} label="Email" value={email} />
        <SectionRow icon={Phone} label="Mobile" value={mobile} />
        {company && <SectionRow icon={Building2} label="Company" value={company} />}
        {designation && <SectionRow icon={Briefcase} label="Designation" value={designation} />}
      </Section>

      {/* Date section */}
      <Section title="Date">
        <SectionRow
          icon={CalendarDays}
          label="Selected Date"
          value={selectedDate ? formatDateDisplay(selectedDate) : '—'}
        />
      </Section>

      {/* Time section */}
      <Section title="Time">
        <SectionRow
          icon={Clock}
          label="Selected Time"
          value={selectedTime ? formatTimeDisplay(selectedTime) : '—'}
        />
      </Section>
    </div>
  );
}
