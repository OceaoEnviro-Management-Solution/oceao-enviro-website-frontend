// ScrollToTop.jsx — Resets scroll position to top on every route change.
// Placed inside <Router> in AppRoutes.jsx so it fires on every navigation.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null; // renders nothing, purely a side-effect component
}
