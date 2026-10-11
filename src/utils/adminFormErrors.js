// adminFormErrors.js — Turns a failed admin request into the error state the admin modals show.
// Field errors of a 400 VALIDATION_FAILED go under their fields (the backend's performedBy is
// the modal's "Employee Name"); anything else (NOT_CANCELLABLE, DATE_NOT_BOOKABLE, a network
// failure ...) is a message for the modal's inline error area. Backend messages are user-ready.

const FIELD_MAP = {
  performedBy: 'employeeName',
  reason: 'reason',
};

const firstMessage = (value) => {
  if (Array.isArray(value)) return typeof value[0] === 'string' ? value[0] : '';
  return typeof value === 'string' ? value : '';
};

/**
 * @param {unknown} error the thrown ApiRequestError (or anything else)
 * @returns {{ employeeName?: string, reason?: string, _global?: string }}
 */
export function modalErrorsFrom(error, fallback = 'Something went wrong. Please try again.') {
  const result = {};

  if (error?.code === 'VALIDATION_FAILED') {
    for (const [backendField, formField] of Object.entries(FIELD_MAP)) {
      const message = firstMessage(error.fieldErrors?.[backendField]);
      if (message) result[formField] = message;
    }
  }

  if (Object.keys(result).length === 0) {
    result._global = error?.message || fallback;
  }
  return result;
}
