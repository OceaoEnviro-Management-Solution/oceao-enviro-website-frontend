// aqiApi.js — The air quality endpoint (API_CONTRACT.md, "Air quality").
// Every call goes through request(), so a failure rejects with an ApiRequestError.

import { ApiRequestError, request } from './http';

// ── getAqi ───────────────────────────────────────────────────────────────────
// GET /aqi. Resolves with the four stations, in the order the backend answers them:
//   [{ city, station, aqi, category, sourceLastUpdate, stale }]
// aqi and category are null when a station has no AQI. sourceLastUpdate is a Date (or null);
// stale is true when it is more than 3 hours old. The answer may be cached for 5 minutes.
export async function getAqi({ signal } = {}) {
  const payload = await request('/aqi', { signal });
  const stations = payload?.data?.stations;

  if (!Array.isArray(stations)) {
    throw new ApiRequestError({ message: 'Unexpected response from the server. Please try again.' });
  }

  return stations.map((item) => {
    const updatedAt = item.sourceLastUpdate ? new Date(item.sourceLastUpdate) : null;
    return {
      city: item.city,
      station: item.station,
      aqi: Number.isFinite(item.aqi) ? item.aqi : null,
      category: item.category ?? null,
      sourceLastUpdate: updatedAt && !Number.isNaN(updatedAt.getTime()) ? updatedAt : null,
      stale: item.stale === true,
    };
  });
}
