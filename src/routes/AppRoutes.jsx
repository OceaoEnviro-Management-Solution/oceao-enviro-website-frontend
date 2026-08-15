import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout.jsx'
import Home from '../pages/Home.jsx'
import Accreditations from '../pages/Accreditations.jsx'
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about/accreditations" element={<Accreditations />} />
        </Route>
      </Routes>
    </Router>
  )
}
