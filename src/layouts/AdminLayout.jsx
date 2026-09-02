// AdminLayout.jsx — Shared layout shell for all admin pages.
// Contains: TopInfoBarV2 + NavbarV2 + AdminSidebar (left) + AdminTopBar (top) + <Outlet /> + Footer.
// Intentionally separate from MainLayout.jsx — admin has its own layout structure.
// Handles: session check (redirects to /admin/login if unauthenticated),
//          mobile sidebar toggle, mobile nav drawer, and AdminProvider wrapping.

import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { adminApi } from '../services/adminApi';
import { AdminProvider } from '../context/AdminContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminTopBar from '../components/admin/AdminTopBar';
import TopInfoBarV2 from '../components/TopInfoBar/TopInfoBarV2.jsx';
import NavbarV2 from '../components/Navbar/NavbarV2.jsx';
import BottomMobileBar from '../components/Navbar/BottomMobileBar.jsx';
import MobileDrawer from '../components/Navbar/MobileDrawer.jsx';
import Footer from '../components/Footer/Footer.jsx';

function AdminLayoutInner() {
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // ── Session guard ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!adminApi.isAuthenticated()) {
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  if (!adminApi.isAuthenticated()) return null;

  return (
    <div className="flex flex-col min-h-screen relative pb-16 lg:pb-0">

      {/* ── Site-wide top bars ───────────────────────────────────────────── */}
      <TopInfoBarV2 />
      <NavbarV2 onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)} />

      {/* ── Admin panel body: sidebar + content ─────────────────────────── */}
      <div className="flex flex-1 bg-gray-50">

        {/* Desktop sidebar */}
        <div className="hidden lg:flex self-stretch">
          <AdminSidebar />
        </div>

        {/* Mobile overlay sidebar */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 flex lg:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-50">
              <AdminSidebar onNavigate={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Page content column: AdminTopBar (with hamburger) + Outlet */}
        <div className="flex-1 flex flex-col">
          <AdminTopBar
            mobileSidebarOpen={mobileSidebarOpen}
            onToggleMobile={() => setMobileSidebarOpen(o => !o)}
          />
          <main className="flex-1 p-6 lg:p-8">
            <Outlet />
          </main>
        </div>

      </div>

      {/* ── Site-wide footer ─────────────────────────────────────────────── */}
      <div className="relative z-20">
        <Footer />
      </div>

      {/* ── Mobile nav ───────────────────────────────────────────────────── */}
      <BottomMobileBar onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)} />
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />

    </div>
  );
}

// Wrap with AdminProvider so all admin pages share the context
export default function AdminLayout() {
  return (
    <AdminProvider>
      <AdminLayoutInner />
    </AdminProvider>
  );
}
