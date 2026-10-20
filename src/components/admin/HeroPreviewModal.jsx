// HeroPreviewModal.jsx — "Preview": how the homepage hero will look with this photo, this text style
// and these texts, on a desktop or on a phone, BEFORE anything is uploaded. The photo is the file
// from the admin's own computer (or, when editing, the one already on the website).
// The look comes from the real homepage pieces, shown in an iframe of /hero-preview-frame (see
// pages/HeroPreviewFrame.jsx): the admin only hands it the photo and the texts.
// The text style can be switched here, and the choice goes back to the form.
// Props: photoUrl, textStyle, texts ({ name, location, description, credit }), onTextStyleChange(style),
//        onClose()

import { useCallback, useEffect, useRef, useState } from 'react';
import { X, Monitor, Smartphone, Eye } from 'lucide-react';
import { HERO_TEXT_STYLE_LABELS, HERO_TEXT_STYLE_NAMES } from '../sections/heroTextStyles';

const ANIM = `@keyframes modalPop { from { transform: scale(0.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }`;

const DEVICES = {
  desktop: { label: 'Desktop', icon: Monitor, width: 1280, height: 720 },
  phone: { label: 'Phone', icon: Smartphone, width: 390, height: 844 },
};

const segment = (active) =>
  `flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${active ? 'bg-white text-[#011539] shadow-sm' : 'text-gray-500 hover:text-[#011539]'}`;

export default function HeroPreviewModal({ photoUrl, textStyle, texts, onTextStyleChange, onClose }) {
  const [device, setDevice] = useState('desktop');
  const [boxWidth, setBoxWidth] = useState(900);
  const stageRef = useRef(null);
  const frameRef = useRef(null);

  // Escape closes only the preview, not the form behind it.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      event.stopPropagation();
      onClose();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [onClose]);

  // How wide the frame may be: the desktop screen is scaled to fit it.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === 'undefined') return undefined;

    const observer = new ResizeObserver(() => setBoxWidth(stage.clientWidth));
    observer.observe(stage);
    setBoxWidth(stage.clientWidth);
    return () => observer.disconnect();
  }, []);

  const send = useCallback(() => {
    frameRef.current?.contentWindow?.postMessage(
      { type: 'hero-preview', photoUrl, textStyle, ...texts },
      window.location.origin
    );
  }, [photoUrl, textStyle, texts]);

  // Hand the frame the photo and texts: when it says it is ready, and whenever they change.
  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin === window.location.origin && event.data?.type === 'hero-preview-ready') send();
    };
    window.addEventListener('message', onMessage);
    send();
    return () => window.removeEventListener('message', onMessage);
  }, [send, device]);

  const { width, height } = DEVICES[device];
  const scale = device === 'desktop' ? Math.min(1, (boxWidth - 8) / width) : Math.min(0.72, 560 / height);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-3 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog" aria-modal="true" aria-labelledby="hero-preview-title"
    >
      <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl animate-[modalPop_0.2s_ease-out]">

        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E4F3E6]">
              <Eye className="h-5 w-5 text-[#017119]" />
            </div>
            <div>
              <h2 id="hero-preview-title" className="text-base font-bold text-[#011539]">Preview on the homepage</h2>
              <p className="mt-0.5 text-xs text-gray-500">Nothing is uploaded or saved by looking at this.</p>
            </div>
          </div>
          <button type="button" onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            aria-label="Close preview">
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-gray-100 bg-gray-50 px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Screen</span>
            <div role="group" aria-label="Screen" className="inline-flex rounded-2xl bg-gray-200/70 p-1">
              {Object.entries(DEVICES).map(([key, { label, icon: Icon }]) => (
                <button key={key} type="button" className={segment(device === key)} aria-pressed={device === key} onClick={() => setDevice(key)}>
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" /> {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Text style</span>
            <div role="group" aria-label="Text style" className="inline-flex rounded-2xl bg-gray-200/70 p-1">
              {HERO_TEXT_STYLE_NAMES.map((name) => (
                <button key={name} type="button" className={segment(textStyle === name)} aria-pressed={textStyle === name} onClick={() => onTextStyleChange(name)}>
                  {HERO_TEXT_STYLE_LABELS[name]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div ref={stageRef} className="flex-1 overflow-auto bg-gray-100 p-4">
          <div
            className="mx-auto overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/10"
            style={{ width: width * scale, height: height * scale }}
          >
            <iframe
              key={device}
              ref={frameRef}
              src="/hero-preview-frame"
              title={`Homepage preview, ${DEVICES[device].label.toLowerCase()}`}
              onLoad={send}
              style={{ width, height, border: 0, transform: `scale(${scale})`, transformOrigin: 'top left' }}
            />
          </div>
          {device === 'phone' && (
            <p className="mt-3 text-center text-xs text-gray-500">On a phone the photo is cropped to its middle: keep the main subject in the centre. Scroll inside the preview to see the info strip.</p>
          )}
        </div>

        <div className="flex justify-end border-t border-gray-100 px-5 py-4">
          <button type="button" onClick={onClose}
            className="rounded-xl bg-[#017119] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#014D11]">
            Close preview
          </button>
        </div>
      </div>
      <style>{ANIM}</style>
    </div>
  );
}
