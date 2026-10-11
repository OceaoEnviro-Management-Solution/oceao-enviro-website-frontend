// feedbackContextObject.js — The FeedbackContext object, kept apart from FeedbackContext.jsx so that
// file only exports a component (React fast refresh needs that).

import { createContext } from 'react';

export const FeedbackContext = createContext();
