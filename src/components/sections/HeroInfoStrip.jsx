// HeroInfoStrip.jsx — The hero slide's info on phones (under 768px): a full-width strip at the bottom
// of the hero, directly under the hero text. On phones the hero text is taller than the screen, so a
// strip fixed to the bottom of the screen would sit on top of it; here it follows the text instead.
// From 768px the same information is the card in the bottom-right of the picture (HeroSlideshow).

import { HeroSlideInfo } from './HeroSlideshow';
import { useActiveHeroSlide } from './heroActiveSlide';

export default function HeroInfoStrip() {
  const slide = useActiveHeroSlide();
  if (!slide) return null;

  return (
    <div key={slide.id} className="relative z-10 bg-[#011539]/90 px-5 py-4 text-white animate-in fade-in duration-1000 motion-reduce:animate-none md:hidden">
      <HeroSlideInfo slide={slide} />
    </div>
  );
}
