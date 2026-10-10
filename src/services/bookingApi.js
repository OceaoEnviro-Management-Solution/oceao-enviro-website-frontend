// bookingApi.js — API service for the Virtual Meeting Booking System.
// sendOtp and verifyOtp call the real backend through request().
// getAvailability and createBooking are still simulated with realistic delays and are
// replaced in later stages.

import { mockAvailability, mockBookings } from '../constants/mockData';
import { request } from './http';

// Simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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

  // ── getAvailability ────────────────────────────────────────────────────────
  // Returns slot status array for a given date.
  // Weekends always return empty slots (no meetings on Sat/Sun).
  getAvailability: async (date) => {
    await delay(500);

    const dateStr = date.toISOString().split('T')[0];

    // Weekends — no slots
    const day = date.getDay();
    if (day === 0 || day === 6) {
      return { success: true, date: dateStr, slots: [] };
    }

    // Default slots if date not in mock data
    const dayData = mockAvailability[dateStr] || {
      meetings: {
        '10:00': 'available',
        '12:00': 'available',
        '14:00': 'available',
        '16:00': 'available'
      }
    };

    const slots = Object.entries(dayData.meetings).map(([time, status]) => ({
      time,
      status
    }));

    return { success: true, date: dateStr, slots };
  },

  // ── createBooking ──────────────────────────────────────────────────────────
  // Creates a booking record, marks the slot as booked in mock data.
  createBooking: async (bookingData) => {
    await delay(1000);

    const bookingId = 'OE-' + Date.now().toString().slice(-8);

    // Store in mock bookings
    mockBookings[bookingId] = {
      id: bookingId,
      ...bookingData,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    // Mark slot as booked in availability
    const { date, time } = bookingData;
    if (!mockAvailability[date]) {
      mockAvailability[date] = { meetings: {} };
    }
    mockAvailability[date].meetings[time] = 'booked';

    return {
      success: true,
      bookingId,
      message: 'Booking confirmed',
      meetingLink: 'https://zoom.us/j/mock-meeting-' + bookingId
    };
  }
};
