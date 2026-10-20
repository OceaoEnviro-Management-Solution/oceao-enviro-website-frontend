import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import TopInfoBarV2 from '../components/TopInfoBar/TopInfoBarV2.jsx'
import NavbarV2 from '../components/Navbar/NavbarV2.jsx'
import BottomMobileBar from '../components/Navbar/BottomMobileBar.jsx'
import MobileDrawer from '../components/Navbar/MobileDrawer.jsx'
import Footer from '../components/Footer/Footer.jsx'
import HeroSlideshow from '../components/sections/HeroSlideshow.jsx'

export default function MainLayout() {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen relative pb-16 lg:pb-0">
      
      {/* Shared Hero Background for Header + Hero on Home Page: the live hero slides (or the static picture) */}
      {isHome && <HeroSlideshow />}

      <TopInfoBarV2 />
      <NavbarV2 onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)} />
      
      <main className="flex-grow relative z-10">
        <Outlet />
      </main>
      
      <div className="relative z-20">
        <Footer />
      </div>

      <BottomMobileBar onOpenMobileDrawer={() => setIsMobileDrawerOpen(true)} />
      <MobileDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />
    </div>
  )
}
