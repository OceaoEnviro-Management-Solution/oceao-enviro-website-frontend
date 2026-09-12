// useBookingContext.js — Custom hook to access BookingContext.
// Throws a clear error if used outside <BookingProvider>.

import { useContext } from 'react';
import { BookingContext } from '../context/BookingContext';

export function useBookingContext() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookingContext must be used within a <BookingProvider>');
  }
  return context;
}
