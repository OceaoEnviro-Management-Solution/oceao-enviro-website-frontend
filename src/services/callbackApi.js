// callbackApi.js — API service for the Request a Callback form.
// Every call goes through request(). The form's field names (phone, preferredDate,
// preferredTime) are mapped to the backend's here, so the component keeps its own names.

import { request } from './http';
import { adaptFormError } from './formErrors';
import { toDateKey } from '../utils/dateKey';

// backend field -> form field (see formFields.callbackForm in constants/contact.js)
const CALLBACK_FIELD_MAP = {
  mobileNumber: 'phone',
  date: 'preferredDate',
  period: 'preferredTime',
};

// Form state -> POST /callback/requests body. An empty reason is left out.
const toRequestBody = (formData, turnstileToken) => {
  const body = {
    name: formData.name,
    email: formData.email,
    mobileNumber: formData.phone,
    date: toDateKey(formData.preferredDate),
    period: formData.preferredTime,
    turnstileToken,
  };
  if (typeof formData.reason === 'string' && formData.reason.trim() !== '') {
    body.reason = formData.reason.trim();
  }
  return body;
};

export const callbackApi = {

  // ── getCalendar ────────────────────────────────────────────────────────────
  // GET /callback/calendar?from&to (date keys, at most 62 dates).
  // data = { days: [{ date, bookable, reason }] }
  getCalendar: (fromKey, toKey) =>
    request(`/callback/calendar?from=${encodeURIComponent(fromKey)}&to=${encodeURIComponent(toKey)}`),

  // ── getAvailability ────────────────────────────────────────────────────────
  // GET /callback/availability?date (a date key).
  // data = { date, bookable, reason, periods: [{ key, label, timeRange, available }] }
  // A day that cannot be booked has periods: [].
  getAvailability: (dateKey) =>
    request(`/callback/availability?date=${encodeURIComponent(dateKey)}`),

  // ── createRequest ──────────────────────────────────────────────────────────
  // POST /callback/requests. formData = the form state { name, email, phone, preferredDate,
  // preferredTime, reason }. data = { requestId, date, period }.
  // Rejects with ApiRequestError whose fieldErrors are keyed by FORM field names:
  // VALIDATION_FAILED (400), CAPTCHA_FAILED (400), DATE_NOT_BOOKABLE (422),
  // PERIOD_FULL, PERIOD_BLOCKED and DUPLICATE_REQUEST (409), RATE_LIMITED (429).
  createRequest: async (formData, turnstileToken) => {
    try {
      return await request('/callback/requests', {
        method: 'POST',
        json: toRequestBody(formData, turnstileToken),
      });
    } catch (error) {
      throw adaptFormError(error, CALLBACK_FIELD_MAP);
    }
  },
};
