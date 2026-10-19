// useMediaQuery.js — true while the media query matches, and follows it when it changes.
//
//   const isDesktop = useMediaQuery('(min-width: 1024px)');
//   const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
//
// false on the server and on the first render of a browser that has no matchMedia.

import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query) {
  const subscribe = useCallback((onChange) => {
    const list = window.matchMedia(query);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  }, [query]);

  const getSnapshot = () => window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
