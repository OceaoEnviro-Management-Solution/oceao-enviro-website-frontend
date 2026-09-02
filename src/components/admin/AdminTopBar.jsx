// AdminTopBar.jsx — Top navigation bar for the admin panel.
// Contains: Logo/brand area (left), mobile hamburger button (left), logout (right).
// Extracted from the old AdminDashboard.jsx top bar section.

import { Menu, X, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';

export default function AdminTopBar({ mobileSidebarOpen, onToggleMobile }) {
  const navigate = useNavigate();

  function handleLogout() {
    adminApi.logout();
    navigate('/admin/login', { replace: true });
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
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors duration-150 px-3 py-2 rounded-lg hover:bg-red-50"
      >
        <LogOut className="w-4 h-4" />
        <span className="hidden sm:inline">Logout</span>
      </button>

    </div>
  );
}
