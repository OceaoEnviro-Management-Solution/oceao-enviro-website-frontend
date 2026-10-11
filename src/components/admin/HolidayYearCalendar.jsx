// HolidayYearCalendar.jsx — A 12-month calendar of one year for planning holidays.
// Styled like the admin Calendar component (Monday-first grid, same day buttons).
//   - Sundays and second Saturdays: greyed as "Closed by rule", not selectable
//   - Holidays: highlighted; the holiday name is the tooltip
//   - Select-multiple mode: ticked dates are shown as selected
// Props: year, holidays (Map of date key -> name), selected (Set of date keys),
//        selectMode (bool), onDayClick(dateKey)

import { toDateKey } from '../../utils/dateKey';
import { isClosedByRule } from '../../utils/closedDays';

const DAY_NAMES   = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH_NAMES = ['January','February','March','April','May','June',
                     'July','August','September','October','November','December'];

const pad = (n) => String(n).padStart(2, '0');

function MonthBlock({ year, monthIndex, holidays, selected, selectMode, todayKey, onDayClick }) {
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const startDow = (new Date(year, monthIndex, 1).getDay() + 6) % 7;   // Monday = 0

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="select-none">
      <h4 className="text-sm font-bold text-[#011539] mb-2">{MONTH_NAMES[monthIndex]}</h4>

      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map(dn => (
          <div key={dn} className="text-center text-xs font-semibold text-gray-400 py-0.5">{dn.slice(0, 2)}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={`e-${idx}`} />;

          const dateKey     = `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
          const closed      = isClosedByRule(dateKey);
          const holidayName = holidays.get(dateKey);
          const isHoliday   = holidayName !== undefined;
          const isSelected  = selected.has(dateKey);
          const isToday     = dateKey === todayKey;
          // In select-multiple mode a holiday cannot be ticked (it is one already)
          const inert       = closed || (selectMode && isHoliday);

          const label = `${day} ${MONTH_NAMES[monthIndex]} ${year}`;
          const state = closed ? ' — Closed by rule'
            : isHoliday ? ` — Holiday: ${holidayName}`
            : isSelected ? ' — Selected' : '';

          return (
            <button
              key={dateKey}
              type="button"
              onClick={() => !closed && onDayClick(dateKey)}
              aria-disabled={inert || undefined}
              tabIndex={closed ? -1 : undefined}
              title={closed ? 'Closed by rule' : isHoliday ? holidayName : undefined}
              aria-label={`${label}${state}`}
              aria-pressed={selectMode && !isHoliday && !closed ? isSelected : undefined}
              className={[
                'relative flex items-center justify-center py-1.5 rounded-lg text-sm transition-all duration-150',
                closed
                  ? 'cursor-not-allowed opacity-25 text-gray-400'
                  : isSelected
                    ? 'bg-orange-500 text-white font-bold cursor-pointer'
                    : isHoliday
                      ? 'bg-[#E4F3E6] text-[#017119] font-bold cursor-pointer hover:bg-[#c8e8cc]'
                      : 'text-[#011539] cursor-pointer hover:bg-gray-50',
                isToday && !isSelected && !isHoliday ? 'border-2 border-[#017119] font-bold text-[#017119]' : '',
              ].join(' ')}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HolidayYearCalendar({ year, holidays, selected, selectMode, onDayClick }) {
  const todayKey = toDateKey(new Date());

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6">
        {MONTH_NAMES.map((_, monthIndex) => (
          <MonthBlock
            key={monthIndex}
            year={year}
            monthIndex={monthIndex}
            holidays={holidays}
            selected={selected}
            selectMode={selectMode}
            todayKey={todayKey}
            onDayClick={onDayClick}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-5 pt-3 border-t border-gray-100">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-gray-300" /> Closed by rule (Sundays, second Saturdays)
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-[#017119]" /> Holiday
        </span>
        {selectMode && (
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-orange-500" /> Selected to add
          </span>
        )}
      </div>
    </div>
  );
}
