// AppRoutes.jsx — Central routing for Oceao Enviro Website.
// Booking pages: all nested under a shared BookingLayout wrapper that holds BookingProvider.
// This ensures Context (and form data) persists as user navigates between /booking-vm steps.
// Admin pages: nested under AdminLayout (handles auth guard + sidebar + topbar).
// All public routes render inside MainLayout (Navbar + Footer visible).
// Admin routes render outside MainLayout — they have their own layout.

import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import AdminLayout from '../layouts/AdminLayout.jsx';
import { BookingProvider } from '../context/BookingContext.jsx';
import ScrollToTop from '../components/common/ScrollToTop.jsx';

// ── Existing pages ─────────────────────────────────────────────────────────
import Home from '../pages/Home.jsx';
import Accreditations from '../pages/Accreditations.jsx';
import CompanyProfile from '../pages/CompanyProfile.jsx';
import VisionMission from '../pages/VisionMission.jsx';
import Gallery from '../pages/Gallery.jsx';
import ContactUs from '../pages/ContactUs.jsx';
import Offices from '../pages/Offices.jsx'
import Team from '../pages/Team.jsx';

// ── Service pages ───────────────────────────────────────────────────────────
import ServicesHub from '../pages/services/ServicesHub.jsx';
import EnvironmentalServices from '../pages/services/EnvironmentalServices.jsx';
import SocialAssessmentStudies from '../pages/services/SocialAssessmentStudies.jsx';
import StatutoryNOC from '../pages/services/StatutoryNOC.jsx';
import WaterResourceManagement from '../pages/services/WaterResourceManagement.jsx';
import LaboratoryServices from '../pages/services/LaboratoryServices.jsx';

// ── Products page ──────────────────────────────────────────────────────────
import ProductsPage from '../pages/products/ProductsPage.jsx';

// ── Feedback page ──────────────────────────────────────────────────────────
import FeedbackPage from '../pages/feedback/FeedbackPage.jsx';

// ── Booking pages ──────────────────────────────────────────────────────────
import VirtualMeetingForm from '../pages/booking/VirtualMeetingForm.jsx';
import OTPVerification from '../pages/booking/OTPVerification.jsx';
import TimeSlotSelection from '../pages/booking/TimeSlotSelection.jsx';
import ConfirmationReview from '../pages/booking/ConfirmationReview.jsx';
import BookingSuccess from '../pages/booking/BookingSuccess.jsx';

// ── Admin pages ────────────────────────────────────────────────────────────
import AdminLogin from '../pages/admin/AdminLogin.jsx';
import AdminDashboardPage from '../pages/admin/AdminDashboardPage.jsx';
import AdminBookingsPage from '../pages/admin/AdminBookingsPage.jsx';
import AdminAvailabilityVMPage from '../pages/admin/AdminAvailabilityVMPage.jsx';
import AdminAvailabilityCallbacksPage from '../pages/admin/AdminAvailabilityCallbacksPage.jsx';

// ── BookingLayout — shared parent that holds BookingProvider ───────────────
// All /booking-vm/* routes nest under this. Context persists across all steps.
function BookingLayout() {
  return (
    <BookingProvider>
      <Outlet />
    </BookingProvider>
  );
}

export default function AppRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* ── Main Layout (Navbar + Footer wraps everything) ─────────────── */}
        <Route path="/" element={<MainLayout />}>

          {/* ── Existing public routes ──────────────────────────────────── */}
          <Route index element={<Home />} />
          <Route path="about/accreditations" element={<Accreditations />} />
          <Route path="about/Company-Profile" element={<CompanyProfile />} />
          <Route path="about/Vision-Mission" element={<VisionMission />} />
          <Route path="about/team" element={<Team />} />
          <Route path="about/gallery" element={<Gallery />} />
          <Route path="contact/quick-contact" element={<ContactUs />} />
          <Route path="contact/feedback" element={<FeedbackPage />} />
          <Route path="contact/offices" element={<Offices />} />

          {/* ── Service pages ─────────────────────────────────────────────── */}
          <Route path="services" element={<ServicesHub />} />
          <Route path="services/environmental-services" element={<EnvironmentalServices />} />
          <Route path="services/social-assessment-studies" element={<SocialAssessmentStudies />} />
          <Route path="services/statutory-noc" element={<StatutoryNOC />} />
          <Route path="services/water-resource-management" element={<WaterResourceManagement />} />
          <Route path="services/laboratory-services" element={<LaboratoryServices />} />

          <Route path="products" element={<ProductsPage />} />

          {/* ── Booking flow — single BookingProvider for all steps ─────── */}
          <Route path="booking-vm" element={<BookingLayout />}>
            <Route index element={<VirtualMeetingForm />} />
            <Route path="otp" element={<OTPVerification />} />
            <Route path="slots" element={<TimeSlotSelection />} />
            <Route path="confirmation" element={<ConfirmationReview />} />
            <Route path="success" element={<BookingSuccess />} />
          </Route>

          {/* Admin login — inside MainLayout so Navbar/Footer still render */}
          <Route path="admin/login" element={<AdminLogin />} />

        </Route>

        {/* ── Admin panel — outside MainLayout, has its own AdminLayout ─── */}
        {/* AdminLayout handles: session guard, sidebar, topbar, Outlet      */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="availability-vm" element={<AdminAvailabilityVMPage />} />
          <Route path="availability-callbacks" element={<AdminAvailabilityCallbacksPage />} />
        </Route>

      </Routes>
    </Router>
  );
}
