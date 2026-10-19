// UpdatesCarousel.jsx — "Latest from notification PARIVESH": the 5 newest PARIVESH updates, newest leftmost,
// 3 cards in view on desktop (from 1024px) and 1 on mobile. It sits between the hero and About Us.
//
// Autoplay moves one card every 5 seconds and wraps from the last position to the first. It
// pauses while the mouse is over the carousel and while keyboard focus is inside it, and it is
// off when the visitor prefers reduced motion. The arrows work at all times (and restart the
// 5 seconds). A failed request only shows a message here: the rest of the page is not affected.

import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { getLatest } from '../../services/updatesApi';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { UpdateCard, UpdateCardSkeleton } from '../updates/UpdateCard';

const AUTOPLAY_MS = 5000;
const SKELETON_COUNT = 3;

const ARROW_BUTTON =
  'flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-brand-blue shadow-sm transition-colors hover:bg-brand-blue hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green';

export default function UpdatesCarousel() {
  const [state, setState] = useState({ status: 'loading', items: [] });
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [keyboardFocus, setKeyboardFocus] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    const controller = new AbortController();

    getLatest({ signal: controller.signal })
      .then((items) => setState({ status: 'ready', items }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error', items: [] });
      });

    return () => controller.abort();
  }, []);

  const { status, items } = state;
  const inView = Math.min(isDesktop ? 3 : 1, Math.max(items.length, 1));
  const lastIndex = Math.max(0, items.length - inView);
  const current = Math.min(index, lastIndex);   // a resize can leave the old index too far right
  const paused = hovered || keyboardFocus;

  const move = useCallback((step) => {
    setIndex((previous) => {
      const next = Math.min(previous, lastIndex) + step;
      if (next > lastIndex) return 0;
      if (next < 0) return lastIndex;
      return next;
    });
  }, [lastIndex]);

  // One timer per position: any move (autoplay or an arrow) starts the 5 seconds again.
  useEffect(() => {
    if (reduceMotion || paused || lastIndex === 0) return undefined;

    const timer = setTimeout(() => move(1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [current, paused, reduceMotion, lastIndex, move]);

  // Only keyboard focus pauses: a mouse click on an arrow must not leave autoplay stopped.
  const handleFocus = (event) => {
    let fromKeyboard = true;
    try {
      fromKeyboard = event.target.matches(':focus-visible');
    } catch {
      // a browser without :focus-visible: treat every focus as keyboard focus
    }
    if (fromKeyboard) setKeyboardFocus(true);
  };

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false);
  };

  const canMove = lastIndex > 0;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Latest from notification PARIVESH"
      className="bg-[#e8f6eb87] py-10 lg:py-16"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white shadow-sm">
            <AlertTriangle className="h-3.5 w-3.5 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
            Important
          </span>
          <h2 className="text-3xl font-bold text-brand-blue md:text-4xl lg:text-[40px]">Latest from notification PARIVESH</h2>
        </div>

        {status === 'error' && (
          <p className="py-10 text-center text-base font-medium text-gray-500" role="status">
            Updates are unavailable right now.
          </p>
        )}

        {status === 'ready' && items.length === 0 && (
          <p className="py-10 text-center text-base font-medium text-gray-500">No updates to show yet.</p>
        )}

        {status === 'loading' && (
          <div className="-mx-3 flex py-4" aria-busy="true">
            {Array.from({ length: isDesktop ? SKELETON_COUNT : 1 }, (_, position) => (
              <div key={position} className="shrink-0 basis-full px-3 lg:basis-1/3">
                <UpdateCardSkeleton />
              </div>
            ))}
          </div>
        )}

        {status === 'ready' && items.length > 0 && (
          <div className="overflow-hidden">
            <ul
              className="-mx-3 flex py-4 transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${current * (100 / inView)}%)` }}
              aria-live={paused || reduceMotion ? 'polite' : 'off'}
            >
              {items.map((item, position) => {
                const visible = position >= current && position < current + inView;
                return (
                  <li
                    key={item.id}
                    className="shrink-0 basis-full px-3 lg:basis-1/3"
                    aria-hidden={visible ? undefined : true}
                  >
                    <UpdateCard item={item} focusable={visible} />
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-4">
          {canMove && (
            <button type="button" className={ARROW_BUTTON} onClick={() => move(-1)} aria-label="Previous updates">
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          )}

          <Link
            to="/updates"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-blue px-8 py-3.5 text-base font-semibold text-white shadow-md transition-colors hover:bg-brand-blue-dark"
          >
            View more
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>

          {canMove && (
            <button type="button" className={ARROW_BUTTON} onClick={() => move(1)} aria-label="Next updates">
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
