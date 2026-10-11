// AdminLayout.jsx — Shared layout shell for all admin pages.
// Contains: TopInfoBarV2 + NavbarV2 + AdminSidebar (left) + AdminTopBar (top) + <Outlet /> + Footer.
// Intentionally separate from MainLayout.jsx — admin has its own layout structure.
// Handles: session check with the server on mount (spinner while waiting, redirect to
//          /admin/login without a session), redirect to /admin/login?expired=1 when a later
//          request reports the session is gone, mobile sidebar toggle, mobile nav drawer,
//          and AdminProvider wrapping.

import { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { useAdminSession } from '../hooks/useAdminSession';
import { ADMIN_UNAUTHORIZED_EVENT } from '../services/http';
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
  // Asked of the server on mount (GET /admin/auth/me).
  const sessionStatus = useAdminSession();

  // ── Session expired while the panel is open ───────────────────────────────
  // http.js dispatches this when an /admin request comes back 401. Listening only once the
  // session has been confirmed keeps the first check's own 401 from being read as "expired".
  useEffect(() => {
    if (sessionStatus !== 'authenticated') return undefined;

    const onUnauthorized = () => navigate('/admin/login?expired=1', { replace: true });
    window.addEventListener(ADMIN_UNAUTHORIZED_EVENT, onUnauthorized);
    return () => window.removeEventListener(ADMIN_UNAUTHORIZED_EVENT, onUnauthorized);
  }, [sessionStatus, navigate]);

  if (sessionStatus === 'checking') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#017119] animate-spin" />
          <p className="text-sm text-gray-500">Checking your session…</p>
        </div>
      </div>
    );
  }

  if (sessionStatus === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />;
  }

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
