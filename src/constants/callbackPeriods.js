// callbackPeriods.js — Display labels for the three callback periods.
// Used to show a request's period (the backend sends only the key: morning | afternoon | evening).
// These are labels only: capacity and availability always come from the backend.

export const CALLBACK_PERIODS = {
  morning:   { label: 'Morning',   timeRange: '9 AM – 12 PM' },
  afternoon: { label: 'Afternoon', timeRange: '12 PM – 3 PM' },
  evening:   { label: 'Evening',   timeRange: '3 PM – 6 PM' },
};
