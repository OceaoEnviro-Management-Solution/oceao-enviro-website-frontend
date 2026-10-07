// EmployeeCard.jsx — Simple employee card: initials, name, qualifications, designation (no photo)

import Avatar from './Avatar';

export default function EmployeeCard({ employee }) {
  return (
    <article className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col items-center text-center gap-3">
      <Avatar name={employee.name} />
      <h4 className="text-base font-bold text-[#0F1D75] leading-snug">{employee.name}</h4>
      <p className="text-sm text-gray-600 leading-relaxed">{employee.qualifications}</p>
      <p className="mt-auto text-sm font-semibold text-[#017119]">{employee.designation}</p>
    </article>
  );
}
