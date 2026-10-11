// ProtectedRoute.jsx — Renders its children only for a signed-in admin.
// The session is checked with the server on mount (GET /admin/auth/me): a spinner shows
// while waiting, and anyone without a session is sent to /admin/login.
// Usage: <ProtectedRoute><SomeAdminPage /></ProtectedRoute>

import { Navigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { useAdminSession } from '../../hooks/useAdminSession';

export default function ProtectedRoute({ children }) {
  const status = useAdminSession();

  if (status === 'checking') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#017119] animate-spin" />
          <p className="text-sm text-gray-500">Checking your session…</p>
        </div>
      </div>
    );
  }

  return status === 'authenticated' ? children : <Navigate to="/admin/login" replace />;
}
