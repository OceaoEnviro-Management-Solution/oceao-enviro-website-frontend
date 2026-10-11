// AdminContext.jsx — Lightweight shared state for the admin panel.
// Holds: a refreshTrigger for cross-page data invalidation, logout, and requestName(),
// which asks which employee is making a change (once per admin session).
// Each page manages its own local data state — this context is intentionally thin.
// Mirrors BookingContext.jsx pattern for consistency.

import React, { createContext, useState, useCallback, useRef } from 'react';
import { adminApi } from '../services/adminApi';
import AdminNameModal from '../components/admin/AdminNameModal';

export const AdminContext = createContext();

// The name typed in the prompt, kept for the browser tab session. It only PREFILLS the
// prompt next time; it is not an identity and the server never trusts it for access.
const NAME_STORAGE_KEY = 'oe_admin_name';

const readStoredName = () => {
  try {
    return window.sessionStorage.getItem(NAME_STORAGE_KEY) || '';
  } catch {
    return '';
  }
};

const storeName = (name) => {
  try {
    window.sessionStorage.setItem(NAME_STORAGE_KEY, name);
  } catch {
    // storage unavailable (private mode ...): the prompt just starts empty next time
  }
};

export function AdminProvider({ children }) {

  // ── Refresh trigger ───────────────────────────────────────────────────────
  // Increment to signal all subscribed pages to re-fetch their data.
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = useCallback(() => {
    setRefreshTrigger(n => n + 1);
  }, []);

  // ── Employee name ─────────────────────────────────────────────────────────
  // requestName() resolves with the employee's name, or null if the prompt was dismissed.
  // The prompt opens the first time it is needed; afterwards the confirmed name is reused
  // until the admin session ends (reload or logout), when it asks again, prefilled.
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [prefill, setPrefill] = useState('');
  const confirmedNameRef = useRef('');
  const waitersRef = useRef([]);

  const requestName = useCallback(() => new Promise((resolve) => {
    if (confirmedNameRef.current) {
      resolve(confirmedNameRef.current);
      return;
    }
    waitersRef.current.push(resolve);
    setPrefill(readStoredName());
    setNameModalOpen(true);
  }), []);

  const settleName = (name) => {
    const waiters = waitersRef.current;
    waitersRef.current = [];
    setNameModalOpen(false);
    waiters.forEach((resolve) => resolve(name));
  };

  const handleNameConfirm = (name) => {
    confirmedNameRef.current = name;
    storeName(name);
    settleName(name);
  };

  // ── Logout ────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    adminApi.logout();
  }, []);

  return (
    <AdminContext.Provider value={{
      refreshTrigger,
      triggerRefresh,
      requestName,
      logout
    }}>
      {children}
      <AdminNameModal
        isOpen={nameModalOpen}
        initialName={prefill}
        onConfirm={handleNameConfirm}
        onClose={() => settleName(null)}
      />
    </AdminContext.Provider>
  );
}
