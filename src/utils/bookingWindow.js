// bookingWindow.js — The dates a visitor can book: today to today + 30 days (the backend's
// horizon for both virtual meetings and callbacks). One place for the booking calendars.

export const BOOKING_WINDOW_DAYS = 30;

/** @returns {{ today: Date, maxDate: Date }} both at local midnight */
export function bookingWindow(now = new Date()) {
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + BOOKING_WINDOW_DAYS);

  return { today, maxDate };
}
