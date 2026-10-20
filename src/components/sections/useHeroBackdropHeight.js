// useHeroBackdropHeight.js — The height of the picture behind the hero: the full screen (100vh), or
// down to the bottom of the hero text when that is lower. On a phone the hero text is taller than the
// screen; light text would run off the bottom of the picture onto the white page and disappear, so the
// picture has to reach the end of the text. On a large screen it stays 100vh.
// Returns a style object: { height }.

import { useEffect, useState } from 'react';

const HERO_ID = 'home-hero';

export function useHeroBackdropHeight() {
  const [bottom, setBottom] = useState(0);

  useEffect(() => {
    const measure = () => {
      const hero = document.getElementById(HERO_ID);
      const next = hero ? Math.ceil(hero.getBoundingClientRect().bottom + window.scrollY) : 0;
      setBottom((was) => (was === next ? was : next));
    };

    measure();
    window.addEventListener('resize', measure);

    // The hero moves when the header above it changes height (its logos load later), and changes
    // size when its text wraps differently.
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(document.body);
    const hero = document.getElementById(HERO_ID);
    if (hero) observer?.observe(hero);

    return () => {
      window.removeEventListener('resize', measure);
      observer?.disconnect();
    };
  }, []);

  return { height: `max(100vh, ${bottom}px)` };
}
