// AdminContext.jsx — Lightweight shared state for the admin panel.
// Holds: auth state and a refreshTrigger for cross-page data invalidation.
// Each page manages its own local data state — this context is intentionally thin.
// Mirrors BookingContext.jsx pattern for consistency.

import React, { createContext, useState, useCallback } from 'react';
import { adminApi } from '../services/adminApi';

export const AdminContext = createContext();

export function AdminProvider({ children }) {

  // ── Refresh trigger ───────────────────────────────────────────────────────
  // Increment to signal all subscribed pages to re-fetch their data.
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(n => n + 1);
  }, []);

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    adminApi.logout();
  }, []);

  return (
    <AdminContext.Provider value={{
      refreshTrigger,
      triggerRefresh,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  );
}
