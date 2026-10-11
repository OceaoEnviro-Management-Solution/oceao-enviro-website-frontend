// useAdminSession.js — Asks the backend, once on mount, whether the admin is signed in.
// Returns 'checking' | 'authenticated' | 'unauthenticated'.
// Used by AdminLayout and ProtectedRoute so the decision always comes from the server
// (GET /admin/auth/me), never from anything stored in the browser.
// A failed check (network error, 5xx) counts as unauthenticated: admin pages never show
// without a confirmed session.

import { useEffect, useState } from 'react';
import { adminApi } from '../services/adminApi';

export function useAdminSession() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let cancelled = false;

    adminApi.getSession()
      .then((session) => {
        if (!cancelled) setStatus(session ? 'authenticated' : 'unauthenticated');
      })
      .catch(() => {
        if (!cancelled) setStatus('unauthenticated');
      });

    return () => { cancelled = true; };
  }, []);

  return status;
}
