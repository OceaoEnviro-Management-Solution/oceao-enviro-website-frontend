// bookingApi.js — API service for the Virtual Meeting Booking System.
// Every call goes through request(). Field names are mapped to the backend's here, so the
// pages keep their own names (fullName, mobile, company ...).

import { request } from './http';

// Page field names -> POST /vm/bookings body. The email is never sent: the backend takes
// it from the booking token. Optional fields that are empty are left out.
const toBookingBody = (payload) => {
  const body = {
    name: payload.fullName,
    mobileNumber: payload.mobile,
    date: payload.date,
    time: payload.time,
  };
  const optional = {
    organisation: payload.company,
    designation: payload.designation,
    topic: payload.meetingTopic,
  };
  for (const [key, value] of Object.entries(optional)) {
    if (typeof value === 'string' && value.trim() !== '') body[key] = value.trim();
  }
  return body;
};

export const bookingApi = {

  // ── sendOtp ────────────────────────────────────────────────────────────────
  // POST /vm/otp/send. Resolves with the response body; data = { expiresInSec, resendAfterSec }.
  // Rejects with ApiRequestError (OTP_COOLDOWN and OTP_SEND_LIMIT carry
  // fieldErrors.retryAfterSec; EMAIL_SEND_FAILED, RATE_LIMITED, VALIDATION_FAILED ...).
  sendOtp: (email) =>
    request('/vm/otp/send', { method: 'POST', json: { email } }),

  // ── verifyOtp ──────────────────────────────────────────────────────────────
  // POST /vm/otp/verify. Resolves with the response body; data = { bookingToken, expiresInSec }.
  // Rejects with ApiRequestError (OTP_INVALID carries fieldErrors.attemptsLeft;
  // OTP_NOT_FOUND, OTP_EXPIRED, OTP_LOCKED, RATE_LIMITED ...).
  verifyOtp: (email, otp) =>
    request('/vm/otp/verify', { method: 'POST', json: { email, otp } }),

  // ── getCalendar ────────────────────────────────────────────────────────────
  // GET /vm/calendar?from&to (date keys, at most 62 dates).
  // data = { days: [{ date, bookable, reason, availableCount }] }
  getCalendar: (fromKey, toKey) =>
    request(`/vm/calendar?from=${encodeURIComponent(fromKey)}&to=${encodeURIComponent(toKey)}`),

  // ── getAvailability ────────────────────────────────────────────────────────
  // GET /vm/availability?date (a date key).
  // data = { date, bookable, reason, slots: [{ time, status: 'available' | 'booked' }] }
  // A day that cannot be booked has slots: [].
  getAvailability: (dateKey) =>
    request(`/vm/availability?date=${encodeURIComponent(dateKey)}`),

  // ── createBooking ──────────────────────────────────────────────────────────
  // POST /vm/bookings with the booking token.
  // payload = { fullName, mobile, company, designation, meetingTopic, date, time }
  // data = { bookingId, date, time, durationMinutes, meetLink, meetStatus }
  // Rejects with ApiRequestError: SLOT_TAKEN and ACTIVE_BOOKING_EXISTS (409),
  // DATE_NOT_BOOKABLE (422), BOOKING_TOKEN_INVALID (401), VALIDATION_FAILED (400).
  createBooking: (payload, token) =>
    request('/vm/bookings', { method: 'POST', json: toBookingBody(payload), token }),
};
