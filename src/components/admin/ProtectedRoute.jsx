// ProtectedRoute.jsx — Redirects unauthenticated users to /admin/login.
// Extracted from the inline definition in AppRoutes.jsx for reusability.
// Usage: <ProtectedRoute><SomeAdminPage /></ProtectedRoute>

import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuthenticated = !!sessionStorage.getItem('admin_token');
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}
