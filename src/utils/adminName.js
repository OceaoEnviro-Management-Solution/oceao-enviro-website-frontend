// adminName.js — The employee name typed in the admin panel, kept for the browser tab session.
// The backend records it as `performedBy` in the activity log. It only PREFILLS name fields:
// it is not an identity and the server never trusts it for access.

const STORAGE_KEY = 'oe_admin_name';

/** The saved name, or '' (also when storage is unavailable). */
export function getStoredAdminName() {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

/** Saves the name for the rest of this tab session. Silently does nothing if storage is blocked. */
export function saveAdminName(name) {
  const trimmed = typeof name === 'string' ? name.trim() : '';
  if (!trimmed) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, trimmed);
  } catch {
    // storage unavailable (private mode ...): fields just start empty next time
  }
}
