// AqiPanel.jsx — "Live Air Quality Index": four CPCB stations in a 2x2 grid of tiles.
// It sits in the About Us section where the first image used to be, and has that box's size
// (height 250px, 300px from the lg breakpoint) and rounded corners.
//
// One request per page load (GET /aqi). While it runs the four tiles are skeletons of the same
// size; if it fails the four tiles say "Data unavailable". The tiles are not interactive.

import { useEffect, useState } from 'react';
import { getAqi } from '../../services/aqiApi';

// The four stations, in the order the backend lists them. Used when the request fails, so the
// tiles still show their cities.
const CITIES = ['Delhi', 'Ghaziabad', 'Chandigarh', 'Gurugram'];

// CPCB National AQI colours. Dark text on the light ones, white on the dark ones.
const DARK_TEXT = '#011539';
const CATEGORY_STYLE = {
  Good: { background: '#00B050', color: DARK_TEXT },
  Satisfactory: { background: '#92D050', color: DARK_TEXT },
  Moderate: { background: '#FFFF00', color: DARK_TEXT },
  Poor: { background: '#FF9900', color: DARK_TEXT },
  'Very Poor': { background: '#FF0000', color: '#FFFFFF' },
  Severe: { background: '#C00000', color: '#FFFFFF' },
};
const UNKNOWN_CATEGORY_STYLE = { background: '#E5E7EB', color: DARK_TEXT };

// ── Times (the source reports Indian time) ───────────────────────────────────
const IST = 'Asia/Kolkata';
const timeFormat = new Intl.DateTimeFormat('en-US', { timeZone: IST, hour: 'numeric', minute: '2-digit', hour12: true });
const dayFormat = new Intl.DateTimeFormat('en-GB', { timeZone: IST, day: 'numeric', month: 'short' });
const dayKeyFormat = new Intl.DateTimeFormat('en-CA', { timeZone: IST });

// "2:00 PM", or "19 Oct, 2:00 PM" when the reading is not from today.
function formatUpdated(date, now = new Date()) {
  const time = timeFormat.format(date).replace(/\s/g, ' ');   // newer ICU puts a narrow no-break space before PM
  return dayKeyFormat.format(date) === dayKeyFormat.format(now) ? time : `${dayFormat.format(date)}, ${time}`;
}

function newestUpdate(stations) {
  return stations.reduce((newest, station) => {
    const at = station.sourceLastUpdate;
    return at && (!newest || at > newest) ? at : newest;
  }, null);
}

// ── Tiles ────────────────────────────────────────────────────────────────────
const TILE = 'rounded-lg border border-gray-100 bg-white overflow-hidden flex flex-col min-h-0';

function SkeletonTile() {
  return (
    <div className={`${TILE} animate-pulse`} aria-hidden="true">
      <div className="flex-1 flex flex-col items-center justify-center gap-2 px-2">
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-7 w-14 rounded bg-gray-200" />
      </div>
      <div className="h-6 bg-gray-200" />
    </div>
  );
}

function Tile({ city, aqi, category, updatedAt }) {
  const available = Number.isFinite(aqi);
  const band = CATEGORY_STYLE[category] ?? UNKNOWN_CATEGORY_STYLE;

  return (
    <div className={TILE}>
      <div className="flex-1 min-h-0 flex flex-col px-2 pt-1.5">
        <div className="flex items-baseline justify-between gap-1">
          <span className="shrink-0 text-xs lg:text-sm font-semibold text-gray-700">{city}</span>
          {updatedAt && (
            <span className="min-w-0 truncate text-[10px] text-gray-400" title={`Reading from ${updatedAt}`}>
              {updatedAt}
            </span>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center">
          {available ? (
            <span className="text-3xl lg:text-4xl font-extrabold leading-none tabular-nums text-brand-primary-blue">{aqi}</span>
          ) : (
            <span className="text-xs lg:text-sm font-medium text-gray-400">Data unavailable</span>
          )}
        </div>
      </div>
      {available && (
        <div className="py-1 text-center text-[11px] lg:text-xs font-bold leading-tight" style={band}>
          {category}
        </div>
      )}
    </div>
  );
}

// ── Panel ────────────────────────────────────────────────────────────────────
export default function AqiPanel() {
  const [state, setState] = useState({ status: 'loading', stations: [] });

  useEffect(() => {
    const controller = new AbortController();

    getAqi({ signal: controller.signal })
      .then((stations) => setState({ status: 'ready', stations }))
      .catch(() => {
        if (!controller.signal.aborted) setState({ status: 'error', stations: [] });
      });

    return () => controller.abort();
  }, []);

  const { status, stations } = state;
  const updated = status === 'ready' ? newestUpdate(stations) : null;

  return (
    <section
      aria-label="Live Air Quality Index"
      aria-busy={status === 'loading'}
      className="h-[250px] lg:h-[300px] w-full rounded-xl overflow-hidden bg-white border border-gray-100 shadow-xl shadow-gray-200/30 p-3 flex flex-col gap-2"
    >
      <h3 className="text-sm lg:text-base font-bold text-brand-primary-blue leading-tight">Live Air Quality Index</h3>

      <div className="grid grid-cols-2 grid-rows-2 gap-2 flex-1 min-h-0">
        {status === 'loading' && CITIES.map((city) => <SkeletonTile key={city} />)}

        {status === 'error' && CITIES.map((city) => <Tile key={city} city={city} aqi={null} category={null} />)}

        {status === 'ready' && stations.map((station) => (
          <Tile
            key={station.station}
            city={station.city}
            aqi={station.aqi}
            category={station.category}
            updatedAt={station.stale && station.sourceLastUpdate ? formatUpdated(station.sourceLastUpdate) : null}
          />
        ))}
      </div>

      <p className="text-[10px] lg:text-[11px] text-gray-500 leading-tight">
        Source: CPCB via data.gov.in{updated && ` · Updated ${formatUpdated(updated)}`}
      </p>
    </section>
  );
}
