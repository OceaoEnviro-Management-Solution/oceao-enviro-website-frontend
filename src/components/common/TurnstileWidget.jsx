// TurnstileWidget.jsx — Cloudflare Turnstile CAPTCHA.
// Loads https://challenges.cloudflare.com/turnstile/v0/api.js once (render=explicit) and renders
// the widget with VITE_TURNSTILE_SITE_KEY.
//
// Props
//   onToken(token)  called when the visitor passes the check
//   onExpire()      called when the token is no longer usable (expired, errored, timed out,
//                   or reset()); the parent should drop its stored token
// Ref (useRef + ref={...})
//   reset()         asks for a fresh check and calls onExpire(). A token is single-use, so call
//                   it after every submit that reached the server.

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

const MISSING_KEY_MESSAGE = 'The security check is not configured. Please try again later.';
const LOAD_ERROR_MESSAGE = 'The security check could not be loaded. Please check your connection and reload the page.';

// One script load for the whole page, however many widgets mount.
let scriptPromise = null;

function loadTurnstileScript() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (scriptPromise) return scriptPromise;

  const promise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.turnstile) resolve(window.turnstile);
      else reject(new Error('Turnstile script loaded without window.turnstile'));
    };
    script.onerror = () => {
      script.remove();
      reject(new Error('Turnstile script failed to load'));
    };
    document.head.appendChild(script);
  });

  // Let the next mount try again after a failed load.
  promise.catch(() => {
    if (scriptPromise === promise) scriptPromise = null;
  });

  scriptPromise = promise;
  return promise;
}

const TurnstileWidget = forwardRef(function TurnstileWidget({ onToken, onExpire }, ref) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const onTokenRef = useRef(onToken);
  const onExpireRef = useRef(onExpire);
  const [loadFailed, setLoadFailed] = useState(false);

  // Always call the latest handlers without re-rendering the widget.
  useEffect(() => {
    onTokenRef.current = onToken;
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!SITE_KEY) {
      console.error(
        'VITE_TURNSTILE_SITE_KEY is not set. Copy .env.example to .env.local, set it, then restart the dev server.'
      );
      return undefined;
    }

    let cancelled = false;

    loadTurnstileScript()
      .then((turnstile) => {
        if (cancelled || !containerRef.current) return;

        const expire = () => {
          onExpireRef.current?.();
          return true; // tells Turnstile the error is handled
        };

        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          // The normal widget is 300px wide; use the compact one on very narrow screens.
          size: window.matchMedia('(max-width: 400px)').matches ? 'compact' : 'normal',
          callback: (token) => onTokenRef.current?.(token),
          'expired-callback': expire,
          'timeout-callback': expire,
          'error-callback': expire,
        });
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current !== null) {
        try {
          window.turnstile?.remove(widgetIdRef.current);
        } catch {
          // the widget is already gone
        }
        widgetIdRef.current = null;
      }
    };
  }, []);

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetIdRef.current !== null) {
        try {
          window.turnstile?.reset(widgetIdRef.current);
        } catch {
          // the widget is already gone
        }
      }
      onExpireRef.current?.();
    },
  }), []);

  const message = !SITE_KEY ? MISSING_KEY_MESSAGE : loadFailed ? LOAD_ERROR_MESSAGE : '';

  return (
    <div className="flex flex-col items-center gap-1">
      <div ref={containerRef} />
      {message && (
        <p className="text-xs text-red-500" role="alert">{message}</p>
      )}
    </div>
  );
});

export default TurnstileWidget;
