// updateFormat.js — How the PARIVESH updates show their dates.

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// "2026-10-19" -> "19 Oct 2026". The key is a calendar day, so no Date (and no time zone) is
// involved. Anything that is not a valid key gives ''.
export function formatUpdateDate(dateKey) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey ?? '');
  if (!match) return '';

  const [, year, month, day] = match;
  const monthName = MONTHS[Number(month) - 1];
  return monthName ? `${Number(day)} ${monthName} ${year}` : '';
}

const istParts = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

// A moment in Indian time: "19 Oct 2026, 2:30 PM".
export function formatDateTimeIST(date) {
  const parts = Object.fromEntries(istParts.formatToParts(date).map(({ type, value }) => [type, value]));
  return `${parts.day} ${parts.month} ${parts.year}, ${parts.hour}:${parts.minute} ${parts.dayPeriod}`;
}
