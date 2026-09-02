// AdminSidebar.jsx — Left navigation for the admin panel.
// REFACTORED: Uses useLocation() to detect active route instead of activeSection prop.
// Supports nested "Availability" group that auto-expands when either sub-route is active.
// Props: onNavigate (optional callback for mobile — closes overlay after navigation).

import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Calendar, Video, PhoneCall, ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const ROUTES = {
  dashboard:    '/admin/dashboard',
  bookings:     '/admin/bookings',
  availVm:      '/admin/availability-vm',
  availCb:      '/admin/availability-callbacks',
};

export default function AdminSidebar({ onNavigate }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-expand Availability group if either sub-route is active
  const isAvailActive =
    location.pathname === ROUTES.availVm ||
    location.pathname === ROUTES.availCb;

  const [availOpen, setAvailOpen] = useState(isAvailActive);

  // Keep expanded when navigating to an availability sub-route
  useEffect(() => {
    if (isAvailActive) setAvailOpen(true);
  }, [isAvailActive]);

  function go(path) {
    navigate(path);
    onNavigate?.(); // close mobile overlay if provided
  }

  function isActive(path) {
    return location.pathname === path;
  }

  const navBtnBase =
    'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left';
  const activeStyle = 'bg-[#017119] text-white shadow-lg shadow-[#017119]/25';
  const inactiveStyle = 'text-white/60 hover:bg-white/10 hover:text-white';

  return (
    <aside className="w-56 flex-shrink-0 bg-[#011539] flex flex-col min-h-full">

      {/* ── Logo area ──────────────────────────────────────────────────────── */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 bg-[#017119] rounded-full" />
          <div>
            <p className="text-white font-bold text-sm leading-tight">OCEAO ENVIRO</p>
            <p className="text-white/50 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className="flex-1 py-4 px-3 space-y-1">

        {/* Dashboard */}
        <button
          id="admin-nav-dashboard"
          type="button"
          onClick={() => go(ROUTES.dashboard)}
          className={`${navBtnBase} ${isActive(ROUTES.dashboard) ? activeStyle : inactiveStyle}`}
        >
          <LayoutDashboard className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1">Dashboard</span>
          {isActive(ROUTES.dashboard) && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
        </button>

        {/* Bookings */}
        <button
          id="admin-nav-bookings"
          type="button"
          onClick={() => go(ROUTES.bookings)}
          className={`${navBtnBase} ${isActive(ROUTES.bookings) ? activeStyle : inactiveStyle}`}
        >
          <BookOpen className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1">Bookings</span>
          {isActive(ROUTES.bookings) && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
        </button>

        {/* Availability — collapsible group */}
        <div>
          <button
            id="admin-nav-availability"
            type="button"
            onClick={() => setAvailOpen(o => !o)}
            className={`${navBtnBase} ${isAvailActive ? 'text-white' : inactiveStyle}`}
          >
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">Availability</span>
            {availOpen
              ? <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              : <ChevronRight className="w-3.5 h-3.5 opacity-70" />
            }
          </button>

          {/* Sub-items */}
          {availOpen && (
            <div className="ml-4 mt-1 space-y-1 pl-3 border-l border-white/10">

              <button
                id="admin-nav-avail-vm"
                type="button"
                onClick={() => go(ROUTES.availVm)}
                className={`${navBtnBase} py-2 text-xs ${isActive(ROUTES.availVm) ? 'bg-[#017119]/80 text-white' : inactiveStyle}`}
              >
                <Video className="w-3.5 h-3.5 flex-shrink-0" />
                Virtual Meetings
              </button>

              <button
                id="admin-nav-avail-cb"
                type="button"
                onClick={() => go(ROUTES.availCb)}
                className={`${navBtnBase} py-2 text-xs ${isActive(ROUTES.availCb) ? 'bg-[#017119]/80 text-white' : inactiveStyle}`}
              >
                <PhoneCall className="w-3.5 h-3.5 flex-shrink-0" />
                Callback Slots
              </button>

            </div>
          )}
        </div>

      </nav>

    </aside>
  );
}
