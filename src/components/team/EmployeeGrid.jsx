// EmployeeGrid.jsx — One employee group: title + count, description, responsive card grid

import EmployeeCard from './EmployeeCard';

export default function EmployeeGrid({ group }) {
  if (!group.employees.length) return null;

  return (
    <section id={`team-group-${group.id}`} aria-label={group.name} className="mb-14 last:mb-0">
      <h3 className="flex items-center gap-3 text-2xl font-bold text-[#0F1D75] mb-2">
        <span className="w-8 h-1 bg-[#FFA500] rounded-full" aria-hidden="true" />
        {group.name}
        <span
          className="px-2.5 py-0.5 rounded-full bg-[#FFA500] text-[#011539] text-xs font-bold"
          aria-label={`${group.employees.length} members`}
        >
          {group.employees.length}
        </span>
      </h3>
      <p className="text-gray-600 mb-6 max-w-3xl">{group.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {group.employees.map((employee) => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
      </div>
    </section>
  );
}
