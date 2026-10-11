// adminContextObject.js — The AdminContext object, kept apart from AdminContext.jsx so that
// file only exports a component (React fast refresh needs that).

import { createContext } from 'react';

export const AdminContext = createContext();
