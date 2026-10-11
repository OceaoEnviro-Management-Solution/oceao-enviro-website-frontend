// adminApi.js — Admin API service.
// Every function calls the real backend through request(); the session is an httpOnly cookie
// the browser sends. Grouped by what they serve:
//   session      login, logout, getSession
//   dashboard    getDashboardData, getBookings, retryMeet, setCallbackStatus
//   VM           getMonthAvailability, getDateSlots, getVMAvailability, blockSlot, unblockSlot,
//                blockEntireDay, unblockEntireDay, cancelVMMeeting
//   callbacks    getCallbackAvailability, getCallbacksForSlot, blockCallbackSlot,
//                unblockCallbackSlot, blockCallbackEntireDay, unblockCallbackEntireDay, cancelCallbacks
//   settings     getSettings, updateCallbackCapacity, getHolidays, addHoliday, addHolidays,
//                renameHoliday, removeHoliday
// Failed calls reject with ApiRequestError, whose message is fit to show to the user.

import { request, ApiRequestError } from './http';
import { toDateKey } from '../utils/dateKey';
import { formatTimeDisplay } from '../utils/validation';

const isUnauthorized = (error) => error instanceof ApiRequestError && error.status === 401;

// ── Adapters: backend (API_CONTRACT.md) shapes -> the props the admin components take ──────
// Times become "10:00 AM", the entry `kind` becomes the row `type`, and booking / request IDs
// become `id`. Backend field names stay available (email, topic, meetLink, meetStatus ...).

const VM_DURATION = '1 hour';

// Accepts a Date or an existing "YYYY-MM-DD" key; always sends a local-date key.
const asDateKey = (value) => (value instanceof Date ? toDateKey(value) : String(value));

// One VM booking as the lists show it.
const adaptVmBooking = (booking) => ({
  id: booking.bookingId,
  type: 'meeting',
  date: booking.date,
  time: formatTimeDisplay(booking.time),
  name: booking.name,
  company: booking.organisation || '',
  email: booking.email,
  phone: booking.mobileNumber,
  topic: booking.topic || '',
  meetLink: booking.meetLink || null,
  meetStatus: booking.meetStatus,
  status: booking.status,
  duration: VM_DURATION,
});

// One callback request as the lists show it. The reason fills the secondary line a company
// would (callback requests carry no company).
const adaptCallbackRequest = (request) => ({
  id: request.requestId,
  type: 'callback',
  date: request.date,
  slot: request.period,
  period: request.period,
  name: request.name,
  company: request.reason || '',
  email: request.email,
  phone: request.mobileNumber,
  status: request.status,
});

// One slot of GET /admin/vm/availability: booked slots carry the booking (adapted like the
// bookings list), blocked slots carry who blocked it and why.
const adaptSlot = (slot) => ({
  time: slot.time,
  status: slot.status,
  booking: slot.booking ? adaptVmBooking(slot.booking) : null,
  block: slot.block
    ? { blockedBy: slot.block.blockedBy, blockReason: slot.block.blockReason, blockedAt: slot.block.blockedAt }
    : null,
});

// One dashboard timeline entry (kind: meeting | callback | available | blocked).
const adaptTimelineEntry = (entry) => {
  const time = formatTimeDisplay(entry.time);

  switch (entry.kind) {
    case 'meeting':
      return {
        id: entry.bookingId,
        type: 'meeting',
        time,
        name: entry.name,
        company: entry.organisation || '',
        email: entry.email,
        phone: entry.mobileNumber,
        topic: entry.topic || '',
        meetLink: entry.meetLink || null,
        meetStatus: entry.meetStatus,
        status: 'confirmed',
        duration: VM_DURATION,
      };
    case 'callback':
      return {
        id: entry.requestId,
        type: 'callback',
        time,
        slot: entry.period,
        period: entry.period,
        name: entry.name,
        company: entry.reason || '',
        email: entry.email,
        phone: entry.mobileNumber,
        status: entry.status,
      };
    case 'blocked':
      return {
        id: `blocked-${entry.time}`,
        type: 'blocked',
        time,
        name: 'Blocked',
        company: [entry.blockedBy, entry.blockReason].filter(Boolean).join(' — '),
        duration: VM_DURATION,
      };
    default:
      return {
        id: `available-${entry.time}`,
        type: 'available',
        time,
        name: 'Open',
        company: '',
        duration: VM_DURATION,
      };
  }
};

export const adminApi = {

  // ── login ──────────────────────────────────────────────────────────────────
  // POST /admin/auth/login. Resolves with { email }; the backend sets the session cookie.
  // Rejects with ApiRequestError: INVALID_CREDENTIALS (401), RATE_LIMITED (429) ...
  // The message is the backend's and is fit to show to the user.
  login: async (email, password) => {
    const payload = await request('/admin/auth/login', {
      method: 'POST',
      json: { email, password },
    });
    return payload.data;
  },

  // ── logout ─────────────────────────────────────────────────────────────────
  // POST /admin/auth/logout. The backend clears the cookie. A 401 means there was no
  // session left to end, which is the state we wanted, so it is not an error.
  logout: async () => {
    try {
      await request('/admin/auth/logout', { method: 'POST', json: {} });
    } catch (error) {
      if (isUnauthorized(error)) return;
      throw error;
    }
  },

  // ── getSession ─────────────────────────────────────────────────────────────
  // GET /admin/auth/me. Resolves with { email, expiresAt } for a signed-in admin, or null on 401.
  // Any other failure (network, 5xx) rejects.
  getSession: async () => {
    try {
      const payload = await request('/admin/auth/me');
      return payload.data;
    } catch (error) {
      if (isUnauthorized(error)) return null;
      throw error;
    }
  },

  // ── getDashboardData ───────────────────────────────────────────────────────
  // GET /admin/dashboard?date. `date` is a Date or a date key (default: today).
  // Resolves { success, day: { date, meetings, callbacks, openVmSlots, blockedVmSlots, upcoming } }
  // where `upcoming` is the whole day's timeline, sorted by time, adapted for MeetingsList.
  getDashboardData: async (date = new Date()) => {
    const payload = await request(`/admin/dashboard?date=${encodeURIComponent(asDateKey(date))}`);
    const { date: day, counts, timeline } = payload.data;

    return {
      success: true,
      day: {
        date: day,
        meetings: counts.meetings,
        callbacks: counts.callbacks,
        openVmSlots: counts.openVmSlots,
        blockedVmSlots: counts.blockedVmSlots,
        upcoming: timeline.map(adaptTimelineEntry),
      },
    };
  },

  // ── retryMeet ──────────────────────────────────────────────────────────────
  // POST /admin/vm/bookings/:bookingId/retry-meet. Resolves { bookingId, meetLink, meetStatus }.
  // Rejects with ApiRequestError: MEET_ALREADY_CREATED (409), MEET_CREATE_FAILED (502) ...
  retryMeet: async (bookingId, performedBy) => {
    const payload = await request(`/admin/vm/bookings/${encodeURIComponent(bookingId)}/retry-meet`, {
      method: 'POST',
      json: { performedBy },
    });
    return payload.data;
  },

  // ── setCallbackStatus ──────────────────────────────────────────────────────
  // PATCH /admin/callback/requests/:requestId. status: pending | completed | no_answer.
  // Resolves { requestId, status }.
  setCallbackStatus: async (requestId, status, performedBy) => {
    const payload = await request(`/admin/callback/requests/${encodeURIComponent(requestId)}`, {
      method: 'PATCH',
      json: { status, performedBy },
    });
    return payload.data;
  },

  // ── getMonthAvailability ───────────────────────────────────────────────────
  // GET /admin/vm/calendar?month=YYYY-MM. `month` is 1-12.
  // Resolves { success, month, availability } where availability maps a date key to
  // { working, holidayName, booked, blocked, available } for the admin calendar.
  getMonthAvailability: async (year, month) => {
    const key = `${year}-${String(month).padStart(2, '0')}`;
    const payload = await request(`/admin/vm/calendar?month=${encodeURIComponent(key)}`);

    const availability = {};
    for (const day of payload.data.days) {
      availability[day.date] = {
        working: day.working,
        holidayName: day.holidayName,
        booked: day.booked,
        blocked: day.blocked,
        available: day.available,
      };
    }
    return { success: true, month: payload.data.month, availability };
  },

  // ── getDateSlots ───────────────────────────────────────────────────────────
  // The slot list of one date (same data as getVMAvailability).
  getDateSlots: async (date) => adminApi.getVMAvailability(date),

  // ── blockSlot ──────────────────────────────────────────────────────────────
  // POST /admin/vm/blocks { date, time, performedBy, reason }.
  // Resolves { blocked: ['10:00'], skipped: [{ time, reason: 'booked' | 'already_blocked' }] }.
  // Rejects with ApiRequestError: DATE_NOT_BOOKABLE (422), VALIDATION_FAILED (400) ...
  blockSlot: async (date, time, performedBy, reason) => {
    const payload = await request('/admin/vm/blocks', {
      method: 'POST',
      json: { date: asDateKey(date), time, performedBy, reason },
    });
    return payload.data;
  },

  // ── unblockSlot ────────────────────────────────────────────────────────────
  // POST /admin/vm/blocks/remove { date, time, performedBy, reason }. Resolves { unblocked }.
  unblockSlot: async (date, time, performedBy, reason) => {
    const payload = await request('/admin/vm/blocks/remove', {
      method: 'POST',
      json: { date: asDateKey(date), time, performedBy, reason },
    });
    return payload.data;
  },

  // ── blockEntireDay ─────────────────────────────────────────────────────────
  // POST /admin/vm/blocks { date, allDay: true, performedBy, reason }.
  // Resolves { blocked, skipped } (a booked slot is skipped, never overwritten).
  blockEntireDay: async (date, performedBy, reason) => {
    const payload = await request('/admin/vm/blocks', {
      method: 'POST',
      json: { date: asDateKey(date), allDay: true, performedBy, reason },
    });
    return payload.data;
  },

  // ── unblockEntireDay ───────────────────────────────────────────────────────
  // POST /admin/vm/blocks/remove { date, allDay: true, performedBy, reason }.
  // Resolves { unblocked } (only blocks are removed, never bookings).
  unblockEntireDay: async (date, performedBy, reason) => {
    const payload = await request('/admin/vm/blocks/remove', {
      method: 'POST',
      json: { date: asDateKey(date), allDay: true, performedBy, reason },
    });
    return payload.data;
  },

  // ── getBookings ────────────────────────────────────────────────────────────
  // GET /admin/bookings?from&to&type&includeCancelled (at most 62 dates).
  // from / to: a Date or a date key. options: { type: 'all' | 'vm' | 'callback',
  // includeCancelled: boolean } (defaults 'all' and false).
  // Resolves { success, vmBookings, callbackBookings }, adapted for MeetingsList / CallbacksList.
  getBookings: async (from, to, { type = 'all', includeCancelled = false } = {}) => {
    const query = new URLSearchParams({
      from: asDateKey(from),
      to: asDateKey(to),
      type,
      includeCancelled: String(Boolean(includeCancelled)),
    });
    const payload = await request(`/admin/bookings?${query.toString()}`);

    return {
      success: true,
      vmBookings: payload.data.vmBookings.map(adaptVmBooking),
      callbackBookings: payload.data.callbackRequests.map(adaptCallbackRequest),
    };
  },

  // ── getVMAvailability ──────────────────────────────────────────────────────
  // GET /admin/vm/availability?date. `date` is a Date or a date key.
  // Resolves { success, date, working, holidayName, slots: [{ time, status, booking, block }] }
  // with status 'available' | 'booked' | 'blocked'.
  getVMAvailability: async (date) => {
    const payload = await request(`/admin/vm/availability?date=${encodeURIComponent(asDateKey(date))}`);
    const { date: day, working, holidayName, slots } = payload.data;

    return { success: true, date: day, working, holidayName, slots: slots.map(adaptSlot) };
  },

  // ── cancelVMMeeting ────────────────────────────────────────────────────────
  // POST /admin/vm/bookings/:bookingId/cancel { performedBy, reason, alsoBlock }.
  // alsoBlock false frees the slot; true turns it into a block. The customer is emailed.
  // Resolves { bookingId, status: 'cancelled', slot: 'released' | 'blocked' }.
  // Rejects with ApiRequestError: NOT_CANCELLABLE (409), NOT_FOUND (404) ...
  cancelVMMeeting: async (bookingId, performedBy, reason, alsoBlock = false) => {
    const payload = await request(`/admin/vm/bookings/${encodeURIComponent(bookingId)}/cancel`, {
      method: 'POST',
      json: { performedBy, reason, alsoBlock: Boolean(alsoBlock) },
    });
    return payload.data;
  },

  // ── getCallbackAvailability ────────────────────────────────────────────────
  // GET /admin/callback/availability?date. `date` is a Date or a date key.
  // Resolves { success, date, working, holidayName, slots: [{ key, label, timeRange,
  // capacity, booked, blocked, block }] } with the saved capacity and the real booked count.
  getCallbackAvailability: async (date) => {
    const payload = await request(`/admin/callback/availability?date=${encodeURIComponent(asDateKey(date))}`);
    const { date: day, working, holidayName, periods } = payload.data;

    return {
      success: true,
      date: day,
      working,
      holidayName,
      slots: periods.map((period) => ({
        key: period.key,
        label: period.label,
        timeRange: period.timeRange,
        capacity: period.capacity,
        booked: period.booked,
        blocked: period.blocked,
        block: period.block,
      })),
    };
  },

  // ── getCallbacksForSlot ────────────────────────────────────────────────────
  // GET /admin/callback/requests?date&period. Resolves { success, bookings } with the
  // non-cancelled requests of that period (id, name, phone, company = the reason, status).
  getCallbacksForSlot: async (date, slot) => {
    const query = new URLSearchParams({ date: asDateKey(date), period: slot });
    const payload = await request(`/admin/callback/requests?${query.toString()}`);

    return { success: true, bookings: payload.data.requests.map(adaptCallbackRequest) };
  },

  // ── blockCallbackSlot ──────────────────────────────────────────────────────
  // POST /admin/callback/blocks { date, period, performedBy, reason }. Requests already in the
  // period stay. Resolves { blocked: ['morning'] }.
  blockCallbackSlot: async (date, slot, performedBy, reason) => {
    const payload = await request('/admin/callback/blocks', {
      method: 'POST',
      json: { date: asDateKey(date), period: slot, performedBy, reason },
    });
    return payload.data;
  },

  // ── unblockCallbackSlot ────────────────────────────────────────────────────
  // POST /admin/callback/blocks/remove { date, period, performedBy, reason }.
  // Resolves { unblocked: ['morning'] }.
  unblockCallbackSlot: async (date, slot, performedBy, reason) => {
    const payload = await request('/admin/callback/blocks/remove', {
      method: 'POST',
      json: { date: asDateKey(date), period: slot, performedBy, reason },
    });
    return payload.data;
  },

  // ── blockCallbackEntireDay ─────────────────────────────────────────────────
  // POST /admin/callback/blocks { date, allDay: true, performedBy, reason }.
  blockCallbackEntireDay: async (date, performedBy, reason) => {
    const payload = await request('/admin/callback/blocks', {
      method: 'POST',
      json: { date: asDateKey(date), allDay: true, performedBy, reason },
    });
    return payload.data;
  },

  // ── unblockCallbackEntireDay ───────────────────────────────────────────────
  // POST /admin/callback/blocks/remove { date, allDay: true, performedBy, reason }.
  unblockCallbackEntireDay: async (date, performedBy, reason) => {
    const payload = await request('/admin/callback/blocks/remove', {
      method: 'POST',
      json: { date: asDateKey(date), allDay: true, performedBy, reason },
    });
    return payload.data;
  },

  // ── cancelCallbacks ────────────────────────────────────────────────────────
  // POST /admin/callback/requests/cancel { requestIds (1-50), performedBy, reason }.
  // Resolves { cancelled: [ids], skipped: [{ id, reason }] }. Each customer is emailed.
  cancelCallbacks: async (requestIds, performedBy, reason) => {
    const payload = await request('/admin/callback/requests/cancel', {
      method: 'POST',
      json: { requestIds, performedBy, reason },
    });
    return payload.data;
  },

  // ── getSettings ────────────────────────────────────────────────────────────
  // GET /admin/settings. Resolves { success, callbackCapacity: { morning, afternoon, evening } }.
  getSettings: async () => {
    const payload = await request('/admin/settings');
    return { success: true, callbackCapacity: payload.data.callbackCapacity };
  },

  // ── updateCallbackCapacity ─────────────────────────────────────────────────
  // PUT /admin/settings/callback-capacity. capacity: { morning, afternoon, evening } (0-50).
  // Takes effect at once; lowering it never cancels anyone. Resolves the saved capacity.
  updateCallbackCapacity: async (capacity, performedBy, reason) => {
    const { morning, afternoon, evening } = capacity;
    const payload = await request('/admin/settings/callback-capacity', {
      method: 'PUT',
      json: { morning, afternoon, evening, performedBy, reason },
    });
    return payload.data.callbackCapacity;
  },

  // ── getHolidays ────────────────────────────────────────────────────────────
  // GET /admin/holidays?year. Resolves { success, holidays: [{ date, name }] } sorted by date.
  getHolidays: async (year) => {
    const payload = await request(`/admin/holidays?year=${encodeURIComponent(year)}`);
    return { success: true, holidays: payload.data.holidays };
  },

  // ── addHoliday ─────────────────────────────────────────────────────────────
  // POST /admin/holidays. Succeeds even when bookings exist on the date.
  // Resolves { holiday, affected: { vmBookings, callbackRequests } }.
  // Rejects with ApiRequestError: ALREADY_CLOSED (422), CONFLICT (409: already a holiday).
  addHoliday: async (date, name, performedBy, reason) => {
    const payload = await request('/admin/holidays', {
      method: 'POST',
      json: { date: asDateKey(date), name, performedBy, reason },
    });
    return payload.data;
  },

  // ── addHolidays ────────────────────────────────────────────────────────────
  // POST /admin/holidays/bulk { holidays: [{ date, name }] (1-60) }.
  // Resolves { added: [dates], skipped: [{ date, reason: 'exists' | 'closed_by_rule' }],
  // affected: { vmBookings, callbackRequests } }.
  addHolidays: async (holidays, performedBy, reason) => {
    const payload = await request('/admin/holidays/bulk', {
      method: 'POST',
      json: {
        holidays: holidays.map(({ date, name }) => ({ date: asDateKey(date), name })),
        performedBy,
        reason,
      },
    });
    return payload.data;
  },

  // ── renameHoliday ──────────────────────────────────────────────────────────
  // PATCH /admin/holidays/:date { name, performedBy, reason }. Resolves { holiday }.
  renameHoliday: async (date, name, performedBy, reason) => {
    const payload = await request(`/admin/holidays/${encodeURIComponent(asDateKey(date))}`, {
      method: 'PATCH',
      json: { name, performedBy, reason },
    });
    return payload.data;
  },

  // ── removeHoliday ──────────────────────────────────────────────────────────
  // DELETE /admin/holidays/:date with { performedBy, reason } in the body. Resolves { date }.
  removeHoliday: async (date, performedBy, reason) => {
    const payload = await request(`/admin/holidays/${encodeURIComponent(asDateKey(date))}`, {
      method: 'DELETE',
      json: { performedBy, reason },
    });
    return payload.data;
  },
};
