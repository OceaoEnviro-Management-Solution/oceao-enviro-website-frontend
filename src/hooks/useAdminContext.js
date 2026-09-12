// useAdminContext.js — Custom hook to access AdminContext.
// Throws a clear error if used outside <AdminProvider>.
// Mirrors useBookingContext.js pattern.

import { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';

export function useAdminContext() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an <AdminProvider>');
  }
  return context;
}
