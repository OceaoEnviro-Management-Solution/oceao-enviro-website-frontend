// heroActiveSlide.js — What the hero slideshow is showing right now, shared between the slideshow
// itself (HeroSlideshow: the picture behind the header, and the info card with the controls) and
// the phone strip under the hero text (HeroInfoStrip). The slideshow publishes its state here and
// registers the three things a visitor can do; both places read the state and call the actions.
//
//   slide       the slide on show, or null while there is none (no slides, an API error, or the
//               first picture still loading)
//   position    1-based place of that slide, count: how many slides there are
//   paused      the visitor pressed Pause
//   canPrevious / canNext   whether stepping is possible right now (the picture is loaded and no
//               fade is running)

import { useSyncExternalStore } from 'react';

const EMPTY = Object.freeze({ slide: null, position: 0, count: 0, paused: false, canPrevious: false, canNext: false });

let state = EMPTY;
const listeners = new Set();

const same = (a, b) =>
  (a.slide?.id ?? null) === (b.slide?.id ?? null)
  && a.position === b.position && a.count === b.count && a.paused === b.paused
  && a.canPrevious === b.canPrevious && a.canNext === b.canNext;

/** Called by the slideshow whenever what it shows changes. */
export function publishHeroState(next) {
  if (same(state, next)) return;
  state = next;
  listeners.forEach((listener) => listener());
}

export function clearHeroState() {
  publishHeroState(EMPTY);
}

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

export function useHeroState() {
  return useSyncExternalStore(subscribe, () => state, () => EMPTY);
}

// ── The visitor's controls ───────────────────────────────────────────────────
const idle = { previous: () => {}, next: () => {}, toggle: () => {} };
let actions = idle;

/** Called by the slideshow: what Previous, Next and Pause / Play do right now. Returns the undo. */
export function registerHeroActions(next) {
  actions = next;
  return () => { if (actions === next) actions = idle; };
}

export const heroActions = {
  previous: () => actions.previous(),
  next: () => actions.next(),
  toggle: () => actions.toggle(),
};
