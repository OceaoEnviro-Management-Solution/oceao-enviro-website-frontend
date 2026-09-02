// bookingApi.js — Mock API service for the Virtual Meeting Booking System.
// Phase 1: All calls simulated with realistic delays.
// Phase 2: Replace each function with real fetch/axios calls. Nothing else changes.

import { mockAvailability, mockBookings } from '../constants/mockData';

// Simulate network latency
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const bookingApi = {

  // ── sendOtp ────────────────────────────────────────────────────────────────
  // Generates a 6-digit OTP, stores in sessionStorage, returns success.
  // In production: email service sends the code — server validates.
  sendOtp: async (email) => {
    await delay(800);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem(`otp_${email}`, otp);
    sessionStorage.setItem(`otp_timestamp_${email}`, Date.now().toString());

    // Dev helper — check browser console for OTP during testing
    console.log(`[DEV] Mock OTP for ${email}:`, otp);

    return {
      success: true,
      message: 'OTP sent to email',
      expiryMinutes: 5
    };
  },

  // ── verifyOtp ──────────────────────────────────────────────────────────────
  // Checks entered OTP against sessionStorage value. Enforces 5-minute expiry.
  verifyOtp: async (email, otp) => {
    await delay(600);

    const storedOtp = sessionStorage.getItem(`otp_${email}`);
    const timestamp = parseInt(sessionStorage.getItem(`otp_timestamp_${email}`), 10);
    const expiryMs = 5 * 60 * 1000; // 5 minutes

    if (!storedOtp) {
      return { success: false, error: 'OTP not found. Please request a new code.' };
    }

    if (Date.now() - timestamp > expiryMs) {
      sessionStorage.removeItem(`otp_${email}`);
      sessionStorage.removeItem(`otp_timestamp_${email}`);
      return { success: false, error: 'OTP expired', expired: true };
    }

    if (otp !== storedOtp) {
      return { success: false, error: 'Incorrect verification code. Please try again.' };
    }

    // Verification token (in production: JWT or session from backend)
    const token = btoa(`${email}:verified:${Date.now()}`);
    sessionStorage.setItem(`booking_token_${email}`, token);

    // Clean up OTP from storage
    sessionStorage.removeItem(`otp_${email}`);
    sessionStorage.removeItem(`otp_timestamp_${email}`);

    return { success: true, message: 'Email verified', token };
  },

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
