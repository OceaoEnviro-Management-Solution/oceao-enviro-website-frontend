import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import Home from '../pages/Home.jsx'
import Accreditations from '../pages/Accreditations.jsx'
import CompanyProfile from '../pages/CompanyProfile.jsx'
import VisionMission from '../pages/VisionMission.jsx'
import Gallery from '../pages/Gallery.jsx'
import ContactUs from '../pages/ContactUs.jsx'
import Offices from '../pages/Offices.jsx'
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about/accreditations" element={<Accreditations />} />
          <Route path="about/Company-Profile" element={<CompanyProfile />} />
          <Route path="about/Vision-Mission" element={<VisionMission />} />
          <Route path="about/gallery" element={<Gallery />} />
          <Route path="contact/quick-contact" element={<ContactUs />} />
          <Route path="contact/offices" element={<Offices />} />
        </Route>
      </Routes>
    </Router>
  )
}
