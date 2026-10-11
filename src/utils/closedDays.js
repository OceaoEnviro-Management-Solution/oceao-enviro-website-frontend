// closedDays.js — Days that are closed by rule: every Sunday and the second Saturday of each
// month. The backend never stores them as holidays (adding one is 422 ALREADY_CLOSED), so the
// holiday planner shows them greyed and unselectable.
// Same rule as the backend: a Saturday is the "second" one on days 8 to 14 of its month.

import { fromDateKey } from './dateKey';

/** True for a Sunday. */
export function isSunday(dateKey) {
  return fromDateKey(dateKey)?.getDay() === 0;
}

/** True for the second Saturday of its month. */
export function isSecondSaturday(dateKey) {
  const date = fromDateKey(dateKey);
  return Boolean(date) && date.getDay() === 6 && Math.ceil(date.getDate() / 7) === 2;
}

/** True for a day closed by rule (Sunday or second Saturday). */
export function isClosedByRule(dateKey) {
  return isSunday(dateKey) || isSecondSaturday(dateKey);
}
