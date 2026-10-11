// AdminTopBar.jsx — Top navigation bar for the admin panel.
// Contains: Logo/brand area (left), mobile hamburger button (left), logout (right).
// Extracted from the old AdminDashboard.jsx top bar section.

import { useState } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';

export default function AdminTopBar({ mobileSidebarOpen, onToggleMobile }) {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  async function handleLogout() {
    setLoggingOut(true);
    setLogoutError('');
    try {
      await adminApi.logout();
      navigate('/admin/login', { replace: true });
    } catch (error) {
      // The cookie could not be cleared (e.g. the server was unreachable): stay signed in
      // and say so, rather than looking logged out while the session is still open.
      setLogoutError(error?.message || 'Could not log out. Please try again.');
      setLoggingOut(false);
    }
  }

  return (
    <div className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3.5 flex items-center justify-between flex-shrink-0 z-30 sticky top-0">

      {/* Left: mobile hamburger + brand */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          onClick={onToggleMobile}
          aria-label={mobileSidebarOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileSidebarOpen
            ? <X className="w-4 h-4 text-gray-600" />
            : <Menu className="w-4 h-4 text-gray-600" />
          }
        </button>

        {/* Brand — visible on mobile, hidden on desktop (sidebar shows it there) */}
        <div className="lg:hidden">
          <p className="text-sm font-bold text-[#011539] leading-tight">OCEAO ENVIRO</p>
          <p className="text-xs text-gray-400">Admin Panel</p>
        </div>
      </div>

      {/* Right: logout */}
      <button
        id="admin-topbar-logout"
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        aria-busy={loggingOut}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors duration-150 px-3 py-2 rounded-lg hover:bg-red-50 disabled:opacity-60 disabled:cursor-wait"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">{loggingOut ? 'Logging out…' : 'Logout'}</span>
      </button>

      {logoutError && (
        <p
          role="alert"
          className="absolute right-4 top-full mt-1 max-w-xs text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg shadow-sm"
        >
          {logoutError}
        </p>
      )}

    </div>
  );
}
