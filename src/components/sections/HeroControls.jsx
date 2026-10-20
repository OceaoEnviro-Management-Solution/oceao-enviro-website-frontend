// HeroControls.jsx — Previous / Pause-Play / Next for the hero slideshow, with "2 / 5".
// For a visitor who wants to look at all the pictures at their own pace. Shown on the info card
// (from 768px) and in the phone strip under the hero text; hidden when there is only one slide.

import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { heroActions, useHeroState } from './heroActiveSlide';

const BUTTON =
  'flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/15';

export default function HeroControls() {
  const { count, position, paused, canPrevious, canNext } = useHeroState();
  if (count < 2) return null;

  return (
    <div className="mt-3 flex items-center gap-2 border-t border-white/15 pt-3" role="group" aria-label="Slideshow controls">
      <button type="button" className={BUTTON} onClick={heroActions.previous} disabled={!canPrevious} aria-label="Previous photo">
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button type="button" className={BUTTON} onClick={heroActions.toggle} aria-label={paused ? 'Play slideshow' : 'Pause slideshow'} aria-pressed={paused}>
        {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
      </button>
      <button type="button" className={BUTTON} onClick={heroActions.next} disabled={!canNext} aria-label="Next photo">
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
      <span className="ml-auto text-xs font-medium text-white/70" aria-live="polite">
        {position} / {count}
      </span>
    </div>
  );
}
