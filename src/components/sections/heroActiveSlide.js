// heroActiveSlide.js — The hero slide that is on show right now, shared between the slideshow
// background (HeroSlideshow, behind the header) and the phone info strip (HeroInfoStrip, under the
// hero text). null while there is no slide to show: no slides, an API error, or the first picture
// still loading.

import { useSyncExternalStore } from 'react';

let active = null;
const listeners = new Set();

export function setActiveHeroSlide(slide) {
  if ((slide?.id ?? null) === (active?.id ?? null)) return;
  active = slide;
  listeners.forEach((listener) => listener());
}

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useActiveHeroSlide() {
  return useSyncExternalStore(subscribe, () => active, () => null);
}
