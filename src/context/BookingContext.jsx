// BookingContext.jsx — Global state for the Virtual Meeting Booking flow.
// Wraps all booking pages so data persists across navigation steps.
// Usage: wrap booking routes with <BookingProvider> in AppRoutes.jsx

import React, { createContext, useState, useCallback } from 'react';

export const BookingContext = createContext();

export function BookingProvider({ children }) {
  // ── Step 1: User details from form ──────────────────────────────────────────
  const [userDetails, setUserDetails] = useState({
    fullName: '',
    email: '',
    mobile: '',
    company: '',
    designation: ''
  });

  // ── Step 2: OTP verification state ──────────────────────────────────────────
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // ── Booking token (issued by POST /vm/otp/verify, valid for 30 minutes) ─────
  // Kept in memory only: never written to localStorage or sessionStorage.
  const [bookingToken, setBookingToken] = useState(null);
  const [bookingTokenExpiresAt, setBookingTokenExpiresAt] = useState(null); // ms since epoch

  const storeBookingToken = useCallback((token, expiresInSec) => {
    setBookingToken(token);
    setBookingTokenExpiresAt(Date.now() + expiresInSec * 1000);
  }, []);

  const clearBookingToken = useCallback(() => {
    setBookingToken(null);
    setBookingTokenExpiresAt(null);
  }, []);

  // True while there is a token that has not expired.
  const hasValidBookingToken = useCallback(
    () => Boolean(bookingToken) && bookingTokenExpiresAt !== null && Date.now() < bookingTokenExpiresAt,
    [bookingToken, bookingTokenExpiresAt]
  );

  // ── Step 3: Slot selection ───────────────────────────────────────────────────
  const [selectedDate, setSelectedDate] = useState(null);   // JS Date object
  const [selectedTime, setSelectedTime] = useState(null);   // e.g. '10:00'

  // ── Step 4: Meeting details ──────────────────────────────────────────────────
  const [meetingTopic, setMeetingTopic] = useState('');

  // ── Booking result ───────────────────────────────────────────────────────────
  const [bookingId, setBookingId] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null);

  // ── Global error state ───────────────────────────────────────────────────────
  const [error, setError] = useState(null);

  // ── Reset helper — called after successful booking ───────────────────────────
  const resetBooking = () => {
    setUserDetails({ fullName: '', email: '', mobile: '', company: '', designation: '' });
    setEmailVerified(false);
    setOtpSent(false);
    setBookingToken(null);
    setBookingTokenExpiresAt(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setMeetingTopic('');
    setBookingId(null);
    setMeetingLink(null);
    setError(null);
  };

  return (
    <BookingContext.Provider value={{
      // User details
      userDetails, setUserDetails,
      // OTP
      emailVerified, setEmailVerified,
      otpSent, setOtpSent,
      // Booking token (memory only)
      bookingToken, bookingTokenExpiresAt,
      storeBookingToken, clearBookingToken, hasValidBookingToken,
      // Slot selection
      selectedDate, setSelectedDate,
      selectedTime, setSelectedTime,
      // Meeting
      meetingTopic, setMeetingTopic,
      // Booking result
      bookingId, setBookingId,
      meetingLink, setMeetingLink,
      // Error
      error, setError,
      // Reset
      resetBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
}
