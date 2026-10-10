// dateKey.js — "YYYY-MM-DD" date keys built from LOCAL date parts.
// Never use date.toISOString().split('T')[0]: it converts to UTC first, so in IST
// (UTC+05:30) any time before 05:30 local gives the previous day.

const KEY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

const pad = (value) => String(value).padStart(2, '0');

/** Date -> "YYYY-MM-DD" using local year, month and day. Returns '' for an invalid Date. */
export function toDateKey(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** "YYYY-MM-DD" -> Date at local midnight. Returns null for malformed or impossible dates. */
export function fromDateKey(key) {
  const match = KEY_PATTERN.exec(typeof key === 'string' ? key : '');
  if (!match) return null;

  const [year, month, day] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(year, month - 1, day);

  // Reject roll-overs such as 2026-02-31
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    return null;
  }
  return date;
}

/** True when both values are the same calendar day. Accepts date keys or Date objects. */
export function isSameDateKey(a, b) {
  const keyA = a instanceof Date ? toDateKey(a) : a;
  const keyB = b instanceof Date ? toDateKey(b) : b;
  return Boolean(keyA) && keyA === keyB;
}
