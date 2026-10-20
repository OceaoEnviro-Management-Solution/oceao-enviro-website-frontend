// HeroSlideshow.jsx — The homepage hero background: the live hero slides one after another, with
// an info card for the picture on show. MainLayout puts it behind the header and the hero text
// (z-0, 100vh tall), where the single static picture used to be.
//
// - The static hero picture is always underneath. With 0 slides, an API error, or while the first
//   picture is still loading, that is all the visitor sees: no blank, no error text.
// - Every 6 seconds the next slide fades in over the current one for 1 second, then wraps round.
//   Only the NEXT picture is downloaded ahead of its turn, and a slide never starts before its
//   picture has loaded. A picture that fails to load is dropped from the rotation.
// - It pauses while the mouse is over the hero area. The pointer is tracked on the window,
//   because the hero text sits above this layer and takes the mouse events itself.
// - One slide: no timer, no fade. prefers-reduced-motion: slides still change, without the fade.
// - The info card is in the bottom-right of the picture from 768px. Under 768px the hero text is
//   taller than the screen, so there the info is a strip under the hero text (HeroInfoStrip).

import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import heroBg from '../../assets/images/Hero_Background.png';
import { getHeroSlides } from '../../services/heroApi';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { setActiveHeroSlide } from './heroActiveSlide';

const SLIDE_MS = 6000;
const FADE_MS = 1000;

// What the card (and the phone strip) says about a slide.
export function HeroSlideInfo({ slide }) {
  return (
    <>
      <p className="text-lg font-bold leading-tight md:text-xl">{slide.name}</p>
      <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-white/90">
        <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
        {slide.location}
      </p>
      <p className="mt-2 text-sm leading-snug text-white/90">{slide.description}</p>
      {slide.credit && <p className="mt-2 text-xs italic text-white/70">Photo: {slide.credit}</p>}
    </>
  );
}

// The card in the bottom-right quadrant of the picture (from 768px). On tablets and phones the
// fixed bottom bar takes the last 4rem of the screen, so the card stays above it.
function InfoCard({ slide }) {
  return (
    <div
      key={slide.id}
      className="absolute z-40 hidden rounded-2xl bg-[#011539]/75 px-6 py-5 text-white backdrop-blur-sm animate-in fade-in duration-1000 motion-reduce:animate-none md:block md:right-4 md:top-[calc(100svh-5rem)] md:w-[19rem] md:-translate-y-full lg:right-10 lg:top-auto lg:bottom-10 lg:w-[24rem] lg:translate-y-0"
    >
      <HeroSlideInfo slide={slide} />
    </div>
  );
}

export default function HeroSlideshow() {
  const [slides, setSlides] = useState([]);
  const [loadedIds, setLoadedIds] = useState(() => new Set());
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);   // the slide that is fading out underneath
  const [hovered, setHovered] = useState(false);
  const rootRef = useRef(null);
  const requested = useRef(new Set());

  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // The slides. On any error the list stays empty and the static picture stays.
  useEffect(() => {
    const controller = new AbortController();

    getHeroSlides({ signal: controller.signal })
      .then(setSlides)
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const count = slides.length;
  const index = count > 0 ? Math.min(current, count - 1) : 0;   // a dropped slide can leave current too far
  const nextIndex = count > 0 ? (index + 1) % count : 0;

  // Download ahead: the first slide, and always the one after the one on show.
  useEffect(() => {
    if (count === 0) return;

    for (const slide of [slides[index], slides[nextIndex]]) {
      if (requested.current.has(slide.id)) continue;
      requested.current.add(slide.id);

      const picture = new Image();
      picture.onload = () => setLoadedIds((ids) => new Set(ids).add(slide.id));
      picture.onerror = () => setSlides((list) => list.filter((item) => item.id !== slide.id));
      picture.src = slide.imageUrl;
    }
  }, [slides, count, index, nextIndex]);

  // Only a slide that is on show AND has its next picture ready can move on.
  const canAdvance = count > 1 && loadedIds.has(slides[index].id) && loadedIds.has(slides[nextIndex].id);

  useEffect(() => {
    if (!canAdvance || hovered) return undefined;

    const timer = setTimeout(() => {
      setPrevious(index);
      setCurrent(nextIndex);
    }, SLIDE_MS);

    return () => clearTimeout(timer);
  }, [canAdvance, hovered, index, nextIndex]);

  // The slide that faded out is taken away once the new one fully covers it.
  useEffect(() => {
    if (previous === null) return undefined;

    const timer = setTimeout(() => setPrevious(null), FADE_MS + 100);
    return () => clearTimeout(timer);
  }, [previous]);

  // Pause while the pointer is over the hero area.
  useEffect(() => {
    const onMove = (event) => {
      const box = rootRef.current?.getBoundingClientRect();
      const inside = Boolean(box)
        && event.clientX >= box.left && event.clientX <= box.right
        && event.clientY >= box.top && event.clientY <= box.bottom;
      setHovered((was) => (was === inside ? was : inside));
    };
    const onLeave = () => setHovered(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const active = count > 0 ? slides[index] : null;
  const showing = Boolean(active) && loadedIds.has(active.id);

  // Tell the phone strip which slide is on show (nothing, while there is none).
  useEffect(() => {
    setActiveHeroSlide(showing ? active : null);
  }, [showing, active]);
  useEffect(() => () => setActiveHeroSlide(null), []);
  const fade = count > 1 && !reduceMotion;

  return (
    <div ref={rootRef} className="absolute top-0 left-0 right-0 h-[100vh] z-0 overflow-hidden">
      {/* Always there: what the visitor sees with no slides, and until the first one has loaded */}
      <img src={heroBg} alt="" className="w-full h-full object-cover object-center" />

      {slides.map((slide, position) => {
        if (!loadedIds.has(slide.id)) return null;

        const isActive = position === index;
        const isLeaving = position === previous && !isActive;
        // Only the slide coming in fades; the one leaving stays solid underneath until it is covered.
        const state = isActive ? 'z-20 opacity-100' : isLeaving ? 'z-10 opacity-100' : 'z-0 opacity-0';

        return (
          <img
            key={slide.id}
            src={slide.imageUrl}
            alt={`${slide.name}, ${slide.location}`}
            fetchPriority={position === 0 ? 'high' : undefined}
            className={`absolute inset-0 h-full w-full object-cover object-center ${state} ${isActive && fade ? 'transition-opacity duration-1000 ease-linear' : ''}`}
          />
        );
      })}

      {/* A light wash on the text side keeps the dark hero text readable on any photo */}
      {showing && <div className="absolute inset-0 z-30 bg-white/50 md:bg-gradient-to-r md:from-white/80 md:via-white/40 md:to-transparent" />}

      <div className="absolute inset-0 z-30 bg-gradient-to-b from-white/40 via-transparent to-transparent"></div>

      {showing && <InfoCard slide={active} />}
    </div>
  );
}
