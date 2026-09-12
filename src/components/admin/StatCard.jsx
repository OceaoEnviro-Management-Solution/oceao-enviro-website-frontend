// StatCard.jsx — Reusable stat card for the admin dashboard.
// Shows: icon, label, and a large number.
// Used on AdminDashboardPage for Today's Meetings + Today's Callbacks.

export default function StatCard({ icon, label, value, accentClass = 'bg-[#E4F3E6]', iconClass = 'text-[#017119]' }) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 ${accentClass} rounded-xl flex items-center justify-center flex-shrink-0`}>
          <span className={`w-5 h-5 ${iconClass}`}>{icon}</span>
        </div>
        <p className="text-sm font-semibold text-gray-600">{label}</p>
      </div>
      <p className="text-3xl font-bold text-[#011539]">
        {value ?? '—'}
      </p>
    </div>
  );
}
