// formErrors.js — adapts backend errors for the Query and Feedback forms.
// Keeps backend field names out of the presentational components.

import { ApiRequestError } from './http';

export const RATE_LIMITED_MESSAGE = 'Too many submissions. Please try again in a few minutes.';

/**
 * Returns an ApiRequestError whose fieldErrors are keyed by FORM field names and
 * whose message is user-ready. Non-API errors (e.g. a missing config) pass through.
 *
 * @param {unknown} error
 * @param {Record<string, string>} fieldMap backend field name -> form field name
 */
export function adaptFormError(error, fieldMap = {}) {
  if (!(error instanceof ApiRequestError)) return error;

  const fieldErrors = {};
  for (const [backendField, messages] of Object.entries(error.fieldErrors || {})) {
    const message = Array.isArray(messages) ? messages[0] : messages;
    if (typeof message === 'string' && message) {
      fieldErrors[fieldMap[backendField] || backendField] = message;
    }
  }

  return new ApiRequestError({
    status: error.status,
    code: error.code,
    message: error.status === 429 ? RATE_LIMITED_MESSAGE : error.message,
    fieldErrors,
  });
}
