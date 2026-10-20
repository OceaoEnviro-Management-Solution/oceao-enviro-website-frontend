// HeroSlideshow.jsx — The homepage hero background: the live hero slides one after another, with
// an info card (and slideshow controls) for the picture on show. MainLayout puts the picture
// behind the header and the hero text (z-0, 100vh tall), where the single static picture used to be.
//
// - The static hero picture is always underneath. With 0 slides, an API error, or while the first
//   picture is still loading, that is all the visitor sees: no blank, no error text.
// - Every 3 seconds the next slide fades in over the current one for 1 second, then wraps round.
//   The next and the previous picture are downloaded ahead of their turn, and a slide never starts
//   before its picture has loaded. A picture that fails to load is dropped from the rotation.
// - Nothing pauses it by itself (not the mouse either). The visitor has Previous, Pause / Play and
//   Next (HeroControls) to look at the pictures at their own pace.
// - A slide with the "Light text" style lays a soft dark shade over the picture (HeroShade) and the
//   hero text turns light (Hero.jsx reads the style from the slide on show); "Dark text" has no shade.
//   The shade fades in and out together with the text colour.
// - One slide: no timer, no fade, no controls. prefers-reduced-motion: slides still change, without
//   the fade.
// - The info card is in the bottom-right of the picture from 768px. It sits in a layer above the
//   hero text (the text would otherwise take its clicks), with no pointer events except on the card
//   itself. Under 768px the hero text is taller than the screen, so there the info and the controls
//   are a strip under the hero text (HeroInfoStrip).

import { useCallback, useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import heroBg from '../../assets/images/Hero_Background.png';
import { getHeroSlides } from '../../services/heroApi';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import HeroControls from './HeroControls';
import { clearHeroState, publishHeroState, registerHeroActions } from './heroActiveSlide';
import { useHeroBackdropHeight } from './useHeroBackdropHeight';

const SLIDE_MS = 3000;
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

// A soft dark shade behind the hero text, for light text on a photo. It is always there and fades
// in or out (1 second, like the text colour) so a change of style is not abrupt.
export function HeroShade({ light }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 z-30 bg-black/35 transition-opacity duration-1000 motion-reduce:transition-none md:bg-gradient-to-r md:from-black/55 md:via-black/25 md:to-transparent ${light ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}

// The card in the bottom-right quadrant of the picture (from 768px). On tablets and phones the
// fixed bottom bar takes the last 4rem of the screen, so the card stays above it.
export function InfoCard({ slide }) {
  return (
    <div className="pointer-events-auto absolute z-40 hidden rounded-2xl bg-[#011539]/75 px-6 py-5 text-white backdrop-blur-sm md:block md:right-4 md:top-[calc(100svh-5rem)] md:w-[19rem] md:-translate-y-full lg:right-10 lg:top-auto lg:bottom-10 lg:w-[24rem] lg:translate-y-0">
      <div key={slide.id} className="animate-in fade-in duration-1000 motion-reduce:animate-none">
        <HeroSlideInfo slide={slide} />
      </div>
      <HeroControls />
    </div>
  );
}

export default function HeroSlideshow() {
  const [slides, setSlides] = useState([]);
  const [loadedIds, setLoadedIds] = useState(() => new Set());
  const [current, setCurrent] = useState(0);
  const [previous, setPrevious] = useState(null);   // the slide that is fading out underneath
  const [paused, setPaused] = useState(false);      // the visitor pressed Pause
  const requested = useRef(new Set());

  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const backdrop = useHeroBackdropHeight();

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
  const previousIndex = count > 0 ? (index - 1 + count) % count : 0;

  // Download ahead: the slide on show, the one after it and the one before it.
  useEffect(() => {
    if (count === 0) return;

    for (const slide of [slides[index], slides[nextIndex], slides[previousIndex]]) {
      if (requested.current.has(slide.id)) continue;
      requested.current.add(slide.id);

      const picture = new Image();
      picture.onload = () => setLoadedIds((ids) => new Set(ids).add(slide.id));
      picture.onerror = () => setSlides((list) => list.filter((item) => item.id !== slide.id));
      picture.src = slide.imageUrl;
    }
  }, [slides, count, index, nextIndex, previousIndex]);

  const fade = count > 1 && !reduceMotion;
  const switching = fade && previous !== null;                   // a fade is running: no new move yet
  const onShow = count > 0 && loadedIds.has(slides[index].id);
  const nextReady = count > 1 && onShow && loadedIds.has(slides[nextIndex].id);
  const canNext = nextReady && !switching;                       // the buttons rest during a fade
  const canPrevious = count > 1 && onShow && !switching && loadedIds.has(slides[previousIndex].id);

  const moveTo = useCallback((target) => {
    setPrevious(index);
    setCurrent(target);
  }, [index]);

  // The timer: a slide moves on 3 seconds after it appeared, unless the visitor paused it. It counts
  // from the moment the slide appears (the fade does not delay it), and waits for the next picture.
  useEffect(() => {
    if (!nextReady || paused) return undefined;

    const timer = setTimeout(() => moveTo(nextIndex), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [nextReady, paused, nextIndex, moveTo]);

  // The slide that faded out is taken away once the new one fully covers it.
  useEffect(() => {
    if (previous === null) return undefined;

    const timer = setTimeout(() => setPrevious(null), FADE_MS + 100);
    return () => clearTimeout(timer);
  }, [previous]);

  // Share what is on show, and what the controls do, with the card and the phone strip.
  const active = count > 0 ? slides[index] : null;
  const showing = Boolean(active) && onShow;

  useEffect(() => {
    publishHeroState({ slide: showing ? active : null, position: index + 1, count, paused, canPrevious, canNext });
  }, [showing, active, index, count, paused, canPrevious, canNext]);

  useEffect(() => registerHeroActions({
    previous: () => { if (canPrevious) moveTo(previousIndex); },
    next: () => { if (canNext) moveTo(nextIndex); },
    toggle: () => setPaused((was) => !was),
  }), [canPrevious, canNext, moveTo, previousIndex, nextIndex]);

  useEffect(() => clearHeroState, []);

  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-0 overflow-hidden" style={backdrop}>
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

        <HeroShade light={showing && active.textStyle === 'light'} />

        <div className="absolute inset-0 z-30 bg-gradient-to-b from-white/40 via-transparent to-transparent"></div>
      </div>

      {/* Above the hero text (z-10) so the controls can be clicked; only the card takes the mouse */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 z-20" style={backdrop}>
        {showing && <InfoCard slide={active} />}
      </div>
    </>
  );
}
