// adminApi.js — Admin API service.
// Real backend calls (through request(); the session is an httpOnly cookie the browser sends):
//   login, logout, getSession, getDashboardData, getBookings, retryMeet, setCallbackStatus,
//   and the VM availability set: getMonthAvailability, getDateSlots, getVMAvailability,
//   blockSlot, unblockSlot, blockEntireDay, unblockEntireDay, cancelVMMeeting.
// Every other function below is still a mock until a later stage replaces it.

import {
  mockBookings,
  mockCallbackBookings, mockCallbackAvailability,
  CALLBACK_SLOTS
} from '../constants/mockData';
import { request, ApiRequestError } from './http';
import { toDateKey } from '../utils/dateKey';
import { formatTimeDisplay } from '../utils/validation';


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

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
  // Returns callback slot capacity data for a specific date.
  getCallbackAvailability: async (date) => {
    await delay(300);

    const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;
    const dayData = mockCallbackAvailability[dateStr] || Object.fromEntries(
      Object.keys(CALLBACK_SLOTS).map(slot => [slot, { booked: 0, blocked: false }])
    );

    const slots = Object.entries(CALLBACK_SLOTS).map(([key, config]) => ({
      key,
      label: config.label,
      timeRange: config.timeRange,
      capacity: config.capacity,
      booked: dayData[key]?.booked ?? 0,
      blocked: dayData[key]?.blocked ?? false,
    }));

    return { success: true, date: dateStr, slots };
  },

  // ── getCallbacksForSlot ────────────────────────────────────────────────────
  // Returns list of people booked in a specific callback slot on a date.
  getCallbacksForSlot: async (date, slot) => {
    await delay(300);

    const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;
    const bookings = Object.values(mockCallbackBookings).filter(
      b => b.date === dateStr && b.slot === slot && b.status !== 'cancelled'
    );

    return { success: true, bookings };
  },

  // ── blockCallbackSlot ──────────────────────────────────────────────────────
  // Blocks a callback slot (no cancellations — existing bookings remain).
  blockCallbackSlot: async (date, slot, employeeName, reason) => {
    await delay(400);

    const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;
    if (!mockCallbackAvailability[dateStr]) {
      mockCallbackAvailability[dateStr] = Object.fromEntries(
        Object.keys(CALLBACK_SLOTS).map(s => [s, { booked: 0, blocked: false }])
      );
    }
    mockCallbackAvailability[dateStr][slot] = {
      ...mockCallbackAvailability[dateStr][slot],
      blocked: true
    };

    return { success: true, message: `Callback slot ${slot} on ${dateStr} blocked by ${employeeName}` };
  },

  // ── cancelCallbacks ────────────────────────────────────────────────────────
  // Cancels specific callback bookings by ID.
  cancelCallbacks: async (bookingIds, employeeName, reason) => {
    await delay(500);

    bookingIds.forEach(id => {
      if (mockCallbackBookings[id]) {
        mockCallbackBookings[id] = {
          ...mockCallbackBookings[id],
          status: 'cancelled',
          cancelledBy: employeeName,
          cancelReason: reason
        };
        // Decrement booked count
        const b = mockCallbackBookings[id];
        const dayData = mockCallbackAvailability[b.date];
        if (dayData?.[b.slot]) {
          dayData[b.slot].booked = Math.max(0, dayData[b.slot].booked - 1);
        }
      }
    });

    console.log(`[DEV] ${bookingIds.length} callback(s) cancelled by ${employeeName}. Reason: ${reason}`);
    return { success: true, message: `${bookingIds.length} callback(s) cancelled` };
  },

  // ── blockCallbackEntireDay ─────────────────────────────────────────────────
  // Blocks all callback slots for a day.
  blockCallbackEntireDay: async (date, employeeName, reason) => {
    await delay(400);

    const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;
    const existing = mockCallbackAvailability[dateStr] || {};
    mockCallbackAvailability[dateStr] = Object.fromEntries(
      Object.keys(CALLBACK_SLOTS).map(slot => [slot, {
        booked: existing[slot]?.booked ?? 0,
        blocked: true
      }])
    );

    return { success: true, message: `All callback slots on ${dateStr} blocked by ${employeeName}` };
  }
};
