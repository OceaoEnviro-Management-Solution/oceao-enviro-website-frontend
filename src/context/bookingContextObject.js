// bookingContextObject.js — The BookingContext object, kept apart from BookingContext.jsx so that
// file only exports a component (React fast refresh needs that).

import { createContext } from 'react';

export const BookingContext = createContext();
