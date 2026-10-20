// HeroPreviewFrame.jsx — /hero-preview-frame: the homepage hero with a photo and texts handed to it by
// the admin screen (HeroPreviewModal), so a slide can be looked at BEFORE it is uploaded.
// It is meant to be shown in an <iframe> of the size of a desktop or a phone screen, which is why it
// is a page of its own: inside the frame the real screen-size rules (md:, lg: ...) apply, so the
// hero looks exactly as it will on that device. It is built from the same pieces as the homepage
// (header, Hero, the shade, the info card or strip), only the photo is the one it was sent.
//
// The admin screen sends { type: 'hero-preview', photoUrl, textStyle, name, location, description,
// credit } with postMessage (same origin only) and this page answers { type: 'hero-preview-ready' }
// once it is listening. It shows nothing until the first message, and it never loads or stores
// anything itself.

import { useEffect, useState } from 'react';
import TopInfoBarV2 from '../components/TopInfoBar/TopInfoBarV2.jsx';
import NavbarV2 from '../components/Navbar/NavbarV2.jsx';
import BottomMobileBar from '../components/Navbar/BottomMobileBar.jsx';
import Hero from '../components/sections/Hero';
import { HeroShade, InfoCard } from '../components/sections/HeroSlideshow';
import { HeroInfoStripView } from '../components/sections/HeroInfoStrip';
import { normalizeTextStyle } from '../components/sections/heroTextStyles';
import { useHeroBackdropHeight } from '../components/sections/useHeroBackdropHeight';

const noop = () => {};

// Links in the frame must not take the visitor anywhere.
const blockLinks = (event) => {
  if (event.target.closest?.('a')) event.preventDefault();
};

export default function HeroPreviewFrame() {
  const [preview, setPreview] = useState(null);
  const backdrop = useHeroBackdropHeight();

  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== window.location.origin || event.data?.type !== 'hero-preview') return;
      const { photoUrl, textStyle, name, location, description, credit } = event.data;
      setPreview({
        photoUrl: typeof photoUrl === 'string' ? photoUrl : '',
        textStyle: normalizeTextStyle(textStyle),
        slide: {
          id: 'preview',
          name: String(name || 'Photo name'),
          location: String(location || 'Location'),
          description: String(description || 'A short description of the photo.'),
          credit: credit ? String(credit) : null,
        },
      });
    };

    window.addEventListener('message', onMessage);
    window.parent?.postMessage({ type: 'hero-preview-ready' }, window.location.origin);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  if (!preview) return <div className="min-h-screen bg-white" />;

  return (
    <div className="flex flex-col min-h-screen relative pb-16 lg:pb-0" onClickCapture={blockLinks}>
      <div className="absolute top-0 left-0 right-0 z-0 overflow-hidden" style={backdrop}>
        {preview.photoUrl && <img src={preview.photoUrl} alt="" className="h-full w-full object-cover object-center" />}
        <HeroShade light={preview.textStyle === 'light'} />
        <div className="absolute inset-0 z-30 bg-gradient-to-b from-white/40 via-transparent to-transparent"></div>
      </div>

      <div className="pointer-events-none absolute top-0 left-0 right-0 z-20" style={backdrop}>
        <InfoCard slide={preview.slide} />
      </div>

      <TopInfoBarV2 />
      <NavbarV2 onOpenMobileDrawer={noop} />

      <main className="flex-grow relative z-10">
        <Hero textStyle={preview.textStyle} />
      </main>

      <HeroInfoStripView slide={preview.slide} />

      <BottomMobileBar onOpenMobileDrawer={noop} />
    </div>
  );
}
