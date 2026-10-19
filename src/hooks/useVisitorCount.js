// useVisitorCount.js — Counts this browser session's visit once and returns the site total.
//
//   const total = useVisitorCount();   // null while loading, on an error, and on /admin pages
//
// First load of a tab: sessionStorage "oe_visit_counted" is not set, so the flag is set FIRST and
// then recordVisit() is called (POST /visits), which answers the total. Any later load of the
// same tab (a reload, another page) finds the flag and only calls getTotal(). A new tab has its
// own sessionStorage, so it counts again.
//
// The flag is set before the request so a second call in the same moment (React StrictMode runs
// effects twice in development) cannot count the visit twice. The request is shared: one
// request per page load, however many components ask.
//
// Admin routes (/admin/...) never record a visit: there the total is only read.

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { recordVisit, getTotal } from '../services/visitsApi';

const COUNTED_KEY = 'oe_visit_counted';

let countedInMemory = false;   // used when sessionStorage is not available
let totalRequest = null;       // the one request of this page load

function wasCounted() {
  if (countedInMemory) return true;
  try {
    return window.sessionStorage.getItem(COUNTED_KEY) !== null;
  } catch {
    return false;
  }
}

function markCounted() {
  countedInMemory = true;
  try {
    window.sessionStorage.setItem(COUNTED_KEY, '1');
  } catch {
    // storage blocked: the in-memory flag still keeps this page load from counting twice
  }
}

function loadTotal(mayRecord) {
  if (mayRecord && !wasCounted()) {
    markCounted();                       // FIRST, then the request
    totalRequest = recordVisit();
  } else if (!totalRequest) {
    totalRequest = getTotal();
  }
  return totalRequest;
}

export function useVisitorCount() {
  const { pathname } = useLocation();
  const onAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/');
  const [total, setTotal] = useState(null);

  useEffect(() => {
    let cancelled = false;

    loadTotal(!onAdminRoute)
      .then((value) => {
        if (!cancelled && Number.isFinite(value)) setTotal(value);
      })
      .catch(() => {
        // Nothing to show on an error: the footer simply leaves the count out.
      });

    return () => { cancelled = true; };
  }, [onAdminRoute]);

  return total;
}
