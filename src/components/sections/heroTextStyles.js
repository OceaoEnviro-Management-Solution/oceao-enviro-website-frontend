// heroTextStyles.js — The two looks of the hero text (tagline, heading, paragraph, outline button),
// chosen per slide in the admin ("Text style"). The slide on show decides which one the homepage
// uses; with no slide (or an unknown name) the dark look, which is the original one, is used.
//
//   dark   dark navy / green text, for LIGHT photos
//   light  white / light-green text with a soft shadow, for DARK photos (the slideshow also lays a
//          soft dark shade behind the text, see HeroShade in HeroSlideshow.jsx)
//
// Every value is a set of Tailwind classes (written out in full so Tailwind can see them).

export const HERO_TEXT_STYLE_NAMES = Object.freeze(['dark', 'light']);

export const HERO_TEXT_STYLE_LABELS = Object.freeze({ dark: 'Dark text', light: 'Light text' });

const STYLES = Object.freeze({
  dark: Object.freeze({
    leaf: 'text-[#3a912a]',
    tagline: 'text-[#011539]',
    heading: 'text-[#011539]',
    accent: 'text-[#2a8f20]',
    paragraph: 'text-gray-800',
    outlineButton: 'text-[#011539] bg-white/80 border-[#011539] hover:bg-white',
    shadow: '',
  }),
  light: Object.freeze({
    leaf: 'text-[#9be15d]',
    tagline: 'text-white',
    heading: 'text-white',
    accent: 'text-[#a6e86a]',
    paragraph: 'text-white/95',
    outlineButton: 'text-white bg-white/10 border-white hover:bg-white/25',
    shadow: '[text-shadow:0_1px_6px_rgba(0,0,0,0.45)]',
  }),
});

export const heroTextStyle = (name) => STYLES[name] ?? STYLES.dark;

/** 'dark' or 'light': anything else is read as 'dark'. */
export const normalizeTextStyle = (value) => (value === 'light' ? 'light' : 'dark');
