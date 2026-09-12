// mockData.js — Simulated backend database for frontend development.
// Pre-populated with 30 days of mixed availability states.
// Remove this file entirely when real API is integrated.

// ── Helpers ──────────────────────────────────────────────────────────────────
function dateStr(daysFromNow) {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
}

const ALL_SLOTS = ['10:00', '12:00', '14:00', '16:00'];

function allAvailable() {
  return Object.fromEntries(ALL_SLOTS.map(t => [t, 'available']));
}

// ── Main availability store ───────────────────────────────────────────────────
// Keys: 'YYYY-MM-DD', values: { meetings: { 'HH:MM': status } }
// status can be: 'available' | 'booked' | 'blocked'
export const mockAvailability = {
  // Today — mostly available
  [dateStr(0)]: {
    meetings: { '10:00': 'booked', '12:00': 'available', '14:00': 'available', '16:00': 'available' }
  },
  // Tomorrow — mix
  [dateStr(1)]: {
    meetings: { '10:00': 'available', '12:00': 'booked', '14:00': 'blocked', '16:00': 'available' }
  },
  // Day after — all booked (test full-booked state)
  [dateStr(2)]: {
    meetings: { '10:00': 'booked', '12:00': 'booked', '14:00': 'booked', '16:00': 'booked' }
  },
  // Day 3 — all available
  [dateStr(3)]: {
    meetings: allAvailable()
  },
  // Day 4 — all blocked (test fully blocked)
  [dateStr(4)]: {
    meetings: { '10:00': 'blocked', '12:00': 'blocked', '14:00': 'blocked', '16:00': 'blocked' }
  },
  // Day 5-7 — available
  [dateStr(5)]: { meetings: allAvailable() },
  [dateStr(6)]: { meetings: allAvailable() },
  [dateStr(7)]: { meetings: { '10:00': 'available', '12:00': 'booked', '14:00': 'available', '16:00': 'booked' } },
  // Days 8-14
  [dateStr(8)]:  { meetings: allAvailable() },
  [dateStr(9)]:  { meetings: { '10:00': 'booked', '12:00': 'available', '14:00': 'available', '16:00': 'blocked' } },
  [dateStr(10)]: { meetings: allAvailable() },
  [dateStr(11)]: { meetings: allAvailable() },
  [dateStr(12)]: { meetings: { '10:00': 'available', '12:00': 'available', '14:00': 'booked', '16:00': 'booked' } },
  [dateStr(13)]: { meetings: allAvailable() },
  [dateStr(14)]: { meetings: { '10:00': 'blocked', '12:00': 'available', '14:00': 'available', '16:00': 'available' } },
  // Days 15-21
  [dateStr(15)]: { meetings: allAvailable() },
  [dateStr(16)]: { meetings: allAvailable() },
  [dateStr(17)]: { meetings: { '10:00': 'booked', '12:00': 'booked', '14:00': 'available', '16:00': 'available' } },
  [dateStr(18)]: { meetings: allAvailable() },
  [dateStr(19)]: { meetings: allAvailable() },
  [dateStr(20)]: { meetings: { '10:00': 'available', '12:00': 'blocked', '14:00': 'blocked', '16:00': 'available' } },
  [dateStr(21)]: { meetings: allAvailable() },
  // Days 22-30
  [dateStr(22)]: { meetings: allAvailable() },
  [dateStr(23)]: { meetings: { '10:00': 'available', '12:00': 'booked', '14:00': 'available', '16:00': 'available' } },
  [dateStr(24)]: { meetings: allAvailable() },
  [dateStr(25)]: { meetings: allAvailable() },
  [dateStr(26)]: { meetings: { '10:00': 'blocked', '12:00': 'available', '14:00': 'booked', '16:00': 'available' } },
  [dateStr(27)]: { meetings: allAvailable() },
  [dateStr(28)]: { meetings: allAvailable() },
  [dateStr(29)]: { meetings: allAvailable() },
  [dateStr(30)]: { meetings: allAvailable() },
};

// ── Bookings store ────────────────────────────────────────────────────────────
// Populated as users create bookings during session.
export const mockBookings = {};

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN PANEL CONSTANTS & MOCK DATA
// Kept separate from booking-flow data above — admin-only concern.
// ─────────────────────────────────────────────────────────────────────────────

// ── VM slot times ─────────────────────────────────────────────────────────────
export const VM_SLOTS = ['10:00', '12:00', '14:00', '16:00'];

// ── Callback slot definitions with capacity ───────────────────────────────────
export const CALLBACK_SLOTS = {
  morning: {
    label: 'Morning',
    timeRange: '9 AM – 12 PM',
    capacity: 5
  },
  afternoon: {
    label: 'Afternoon',
    timeRange: '12 PM – 3 PM',
    capacity: 5
  },
  evening: {
    label: 'Evening',
    timeRange: '3 PM – 6 PM',
    capacity: 3
  }
};

// ── Helper: remaining capacity for a callback slot ────────────────────────────
export function getRemainingCapacity(slot, booked) {
  const capacity = CALLBACK_SLOTS[slot]?.capacity ?? 0;
  return Math.max(0, capacity - booked);
}

export function isCallbackSlotFull(slot, booked) {
  return booked >= (CALLBACK_SLOTS[slot]?.capacity ?? 0);
}

// ── Mock VM bookings store ────────────────────────────────────────────────────
// Keys: booking ID, values: full booking record.
export const mockVMBookings = {
  'BK001': {
    id: 'BK001', name: 'Rahul Kumar', email: 'rahul@example.com',
    phone: '+91-9876543210', company: 'ABC Industries',
    date: dateStr(0), time: '10:00', status: 'booked', createdAt: dateStr(-3)
  },
  'BK002': {
    id: 'BK002', name: 'Priya Sharma', email: 'priya@example.com',
    phone: '+91-8765432109', company: 'GreenTech Pvt Ltd',
    date: dateStr(0), time: '12:00', status: 'booked', createdAt: dateStr(-3)
  },
  'BK003': {
    id: 'BK003', name: 'Sarah Johnson', email: 'sarah@example.com',
    phone: '+91-7654321098', company: 'SustainTech',
    date: dateStr(1), time: '10:00', status: 'booked', createdAt: dateStr(-2)
  },
  'BK004': {
    id: 'BK004', name: 'Mike Smith', email: 'mike@example.com',
    phone: '+91-6543210987', company: 'EcoSolutions',
    date: dateStr(2), time: '14:00', status: 'booked', createdAt: dateStr(-1)
  },
};

// ── Mock callback bookings store ──────────────────────────────────────────────
// Keys: callback ID, values: full callback record.
export const mockCallbackBookings = {
  'CB001': {
    id: 'CB001', name: 'John Doe', email: 'john@example.com',
    phone: '+91-7654321098', company: 'EcoCorp',
    date: dateStr(0), slot: 'morning', status: 'booked', createdAt: dateStr(-3)
  },
  'CB002': {
    id: 'CB002', name: 'Sarah J', email: 'sarah@example.com',
    phone: '+91-6543210987', company: 'SustainTech',
    date: dateStr(0), slot: 'morning', status: 'booked', createdAt: dateStr(-3)
  },
  'CB003': {
    id: 'CB003', name: 'Mike Smith', email: 'mike@example.com',
    phone: '+91-5432109876', company: 'GreenBuild',
    date: dateStr(0), slot: 'afternoon', status: 'booked', createdAt: dateStr(-2)
  },
  'CB004': {
    id: 'CB004', name: 'Lisa Patel', email: 'lisa@example.com',
    phone: '+91-4321098765', company: 'EnviroTech',
    date: dateStr(0), slot: 'afternoon', status: 'booked', createdAt: dateStr(-2)
  },
  'CB005': {
    id: 'CB005', name: 'Arjun Mehta', email: 'arjun@example.com',
    phone: '+91-3210987654', company: 'CleanAir Ltd',
    date: dateStr(0), slot: 'afternoon', status: 'booked', createdAt: dateStr(-1)
  },
  'CB006': {
    id: 'CB006', name: 'Neha Gupta', email: 'neha@example.com',
    phone: '+91-2109876543', company: 'WaterPure',
    date: dateStr(0), slot: 'evening', status: 'booked', createdAt: dateStr(-1)
  },
  'CB007': {
    id: 'CB007', name: 'Raj Verma', email: 'raj@example.com',
    phone: '+91-1098765432', company: 'SoilSafe',
    date: dateStr(1), slot: 'morning', status: 'booked', createdAt: dateStr(-1)
  },
};

// ── Mock callback availability ────────────────────────────────────────────────
// Separate from mockAvailability (which is VM-only) — Option B, clean separation.
// Keys: 'YYYY-MM-DD', values: { slot: { booked: N, blocked: bool } }
export const mockCallbackAvailability = {
  [dateStr(0)]: {
    morning:   { booked: 2, blocked: false },
    afternoon: { booked: 3, blocked: false },
    evening:   { booked: 1, blocked: false },
  },
  [dateStr(1)]: {
    morning:   { booked: 1, blocked: false },
    afternoon: { booked: 0, blocked: false },
    evening:   { booked: 0, blocked: false },
  },
  [dateStr(2)]: {
    morning:   { booked: 5, blocked: false }, // full
    afternoon: { booked: 4, blocked: false },
    evening:   { booked: 3, blocked: false }, // full
  },
  [dateStr(3)]: {
    morning:   { booked: 0, blocked: true },  // admin blocked
    afternoon: { booked: 2, blocked: false },
    evening:   { booked: 0, blocked: false },
  },
};

