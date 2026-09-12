// adminApi.js — Mock Admin API service.
// Phase 1: Simulated with sessionStorage auth token.
// Phase 2: Replace with real API calls — nothing else changes.

import {
  mockAvailability, mockBookings,
  mockVMBookings, mockCallbackBookings, mockCallbackAvailability,
  VM_SLOTS, CALLBACK_SLOTS
} from '../constants/mockData';


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ── Mock admin credentials (Phase 1 only) ─────────────────────────────────
const MOCK_EMAIL = 'admin@oceaoenviro.com';
const MOCK_PASSWORD = 'admin123';

export const adminApi = {

  // ── login ──────────────────────────────────────────────────────────────────
  login: async (email, password) => {
    await delay(600);

    if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
      const token = btoa(`${email}:${Date.now()}`);
      sessionStorage.setItem('admin_token', token);
      return { success: true, token };
    }

    return { success: false, error: 'Invalid credentials. Please check your email and password.' };
  },

  // ── logout ─────────────────────────────────────────────────────────────────
  logout: () => {
    sessionStorage.removeItem('admin_token');
    return { success: true };
  },

  // ── isAuthenticated ────────────────────────────────────────────────────────
  isAuthenticated: () => {
    return !!sessionStorage.getItem('admin_token');
  },

  // ── getDashboardData ───────────────────────────────────────────────────────
  // Returns today's summary stats + upcoming events list.
  getDashboardData: async () => {
    await delay(500);

    return {
      success: true,
      today: {
        meetings: 4,
        callbacks: 6,
        upcoming: [
          { id: 1, time: '10:00 AM', type: 'meeting', name: 'Rahul Kumar', company: 'ABC Industries', email: 'rahul@example.com', duration: '1 hour' },
          { id: 2, time: '12:00 PM', type: 'meeting', name: 'Priya Sharma', company: 'GreenTech Pvt Ltd', email: 'priya@greentech.com', duration: '1 hour' },
          { id: 3, time: '02:00 PM', type: 'callback', name: 'John Doe', company: 'EcoCorp', email: 'john@ecocorp.com', duration: '30 min' },
          { id: 4, time: '04:00 PM', type: 'available', name: 'Open', company: '', email: '', duration: '1 hour' },
        ]
      }
    };
  },

  // ── getMonthAvailability ───────────────────────────────────────────────────
  // Returns full availability map for admin calendar view.
  getMonthAvailability: async (year, month) => {
    await delay(400);
    return { success: true, availability: mockAvailability };
  },

  // ── getDateSlots ───────────────────────────────────────────────────────────
  // Returns slot list for a specific date for the AvailabilityEditor.
  getDateSlots: async (date) => {
    await delay(300);

    const dateStr = date.toISOString().split('T')[0];
    const dayData = mockAvailability[dateStr] || {
      meetings: {
        '10:00': 'available',
        '12:00': 'available',
        '14:00': 'available',
        '16:00': 'available'
      }
    };

    const slots = Object.entries(dayData.meetings).map(([time, status]) => ({ time, status }));
    return { success: true, date: dateStr, slots };
  },

  // ── blockSlot ──────────────────────────────────────────────────────────────
  blockSlot: async (date, time, employeeName, reason) => {
    await delay(400);

    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    if (!mockAvailability[dateStr]) {
      mockAvailability[dateStr] = { meetings: {} };
    }
    mockAvailability[dateStr].meetings[time] = 'blocked';

    return { success: true, message: `Slot ${time} on ${dateStr} blocked by ${employeeName}` };
  },

  // ── unblockSlot ────────────────────────────────────────────────────────────
  unblockSlot: async (date, time) => {
    await delay(300);

    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    if (mockAvailability[dateStr]?.meetings[time] === 'blocked') {
      mockAvailability[dateStr].meetings[time] = 'available';
    }

    return { success: true, message: `Slot ${time} on ${dateStr} unblocked` };
  },

  // ── blockEntireDay ─────────────────────────────────────────────────────────
  blockEntireDay: async (date, employeeName, reason) => {
    await delay(400);

    const dateStr = typeof date === 'string' ? date : date.toISOString().split('T')[0];
    mockAvailability[dateStr] = {
      meetings: {
        '10:00': 'blocked',
        '12:00': 'blocked',
        '14:00': 'blocked',
        '16:00': 'blocked'
      }
    };

    return { success: true, message: `Entire day ${dateStr} blocked by ${employeeName}` };
  },

  // ── getBookings ────────────────────────────────────────────────────────────
  // Returns all VM + Callback bookings for a date range (week pagination).
  getBookings: async (startDate, endDate) => {
    await delay(400);

    const start = new Date(startDate); start.setHours(0, 0, 0, 0);
    const end   = new Date(endDate);   end.setHours(23, 59, 59, 999);

    const vmBookings = Object.values(mockVMBookings).filter(b => {
      const d = new Date(b.date);
      return d >= start && d <= end && b.status !== 'cancelled';
    });

    const callbackBookings = Object.values(mockCallbackBookings).filter(b => {
      const d = new Date(b.date);
      return d >= start && d <= end && b.status !== 'cancelled';
    });

    return { success: true, vmBookings, callbackBookings };
  },

  // ── getVMAvailability ──────────────────────────────────────────────────────
  // Returns VM slots for a specific date (cleaner alias of getDateSlots).
  getVMAvailability: async (date) => {
    await delay(300);

    const dateStr = date instanceof Date ? date.toISOString().split('T')[0] : date;
    const dayData = mockAvailability[dateStr] || { meetings: Object.fromEntries(VM_SLOTS.map(t => [t, 'available'])) };

    const slots = Object.entries(dayData.meetings).map(([time, status]) => {
      const booking = Object.values(mockVMBookings).find(b => b.date === dateStr && b.time === time && b.status === 'booked');
      return { time, status, booking: booking || null };
    });

    return { success: true, date: dateStr, slots };
  },

  // ── cancelVMMeeting ────────────────────────────────────────────────────────
  // Cancels a VM booking, frees the slot back to available.
  cancelVMMeeting: async (bookingId, employeeName, reason) => {
    await delay(500);

    const booking = mockVMBookings[bookingId];
    if (!booking) return { success: false, error: 'Booking not found' };

    // Mark cancelled
    mockVMBookings[bookingId] = { ...booking, status: 'cancelled', cancelledBy: employeeName, cancelReason: reason };
    // Free the slot
    if (mockAvailability[booking.date]?.meetings) {
      mockAvailability[booking.date].meetings[booking.time] = 'available';
    }

    console.log(`[DEV] VM meeting ${bookingId} cancelled by ${employeeName}. Reason: ${reason}`);
    return { success: true, message: 'Meeting cancelled' };
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
