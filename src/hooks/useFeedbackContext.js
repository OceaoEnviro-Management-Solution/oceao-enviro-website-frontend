// useFeedbackContext.js — Custom hook to access FeedbackContext.
// Throws a clear error if used outside <FeedbackProvider>.
// Mirrors the pattern of useBookingContext.js.

import { useContext } from 'react';
import { FeedbackContext } from '../context/FeedbackContext';

export function useFeedbackContext() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedbackContext must be used within a <FeedbackProvider>');
  }
  return context;
}
