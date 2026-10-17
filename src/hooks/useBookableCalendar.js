// useBookableCalendar.js — Loads the public booking calendar (today .. today + 30) once and
// again on demand. Shared by the virtual meeting and the callback date pickers.
//
//   const calendar = useBookableCalendar(bookingApi.getCalendar);   // or callbackApi.getCalendar
//   calendar.byDate   dateKey -> { date, bookable, reason, ... }
//   calendar.status   'loading' | 'ready' | 'error'
//   calendar.error    a readable message when status is 'error'
//   calendar.reload() asks again (for example after a conflict); the old answer stays until it arrives
//
// fetchCalendar(fromKey, toKey) must resolve with the API body ({ data: { days } }).

import { useCallback, useEffect, useState } from 'react';
import { toDateKey } from '../utils/dateKey';
import { bookingWindow } from '../utils/bookingWindow';

export function useBookableCalendar(fetchCalendar) {
  const [state, setState] = useState({ status: 'loading', byDate: {}, error: '' });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const { today, maxDate } = bookingWindow();

    fetchCalendar(toDateKey(today), toDateKey(maxDate))
      .then((result) => {
        if (cancelled) return;
        const byDate = {};
        for (const day of result.data.days) byDate[day.date] = day;
        setState({ status: 'ready', byDate, error: '' });
      })
      .catch((error) => {
        if (cancelled) return;
        setState({ status: 'error', byDate: {}, error: error?.message || 'Unable to load available dates.' });
      });

    return () => { cancelled = true; };
  }, [fetchCalendar, tick]);

  const reload = useCallback(() => setTick((n) => n + 1), []);

  return { ...state, reload };
}
