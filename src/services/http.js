// http.js — the single HTTP client for the backend API.
// All network calls go through request(); never call fetch directly elsewhere.
//
// request(path, { method, json, formData, token, signal })
//   path      "/query/new-query" (prefixed with VITE_API_BASE_URL, which includes /api/v1)
//   json      object sent as a JSON body (sets Content-Type)
//   formData  FormData sent as multipart (the browser sets Content-Type and boundary)
//   token     optional bearer token, sent as Authorization: Bearer <token>
//   signal    optional AbortSignal
// Resolves with the parsed response body ({ statusCode, success, message, data }).
// Rejects with ApiRequestError for any failed or unreadable response.

const NETWORK_ERROR_MESSAGE = 'Unable to reach the server. Please check your connection and try again.';
const INVALID_RESPONSE_MESSAGE = 'Unexpected response from the server. Please try again.';
const GENERIC_ERROR_MESSAGE = 'Something went wrong. Please try again.';

export class ApiRequestError extends Error {
  constructor({ status = 0, code = 'UNKNOWN_ERROR', message = GENERIC_ERROR_MESSAGE, fieldErrors = {} } = {}) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

const buildUrl = (path) => {
  const base = import.meta.env.VITE_API_BASE_URL;
  if (!base) {
    throw new Error(
      'VITE_API_BASE_URL is not set. Copy .env.example to .env.local and set it to the backend API URL, then restart the dev server.'
    );
  }
  return `${base.replace(/\/+$/, '')}/${String(path).replace(/^\/+/, '')}`;
};

const parseJson = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    return undefined;
  }
};

export async function request(path, { method = 'GET', json, formData, token, signal } = {}) {
  const url = buildUrl(path);

  const headers = {};
  let body;
  if (json !== undefined) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(json);
  } else if (formData !== undefined) {
    body = formData;
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(url, { method, headers, body, credentials: 'include', signal });
  } catch (error) {
    if (error?.name === 'AbortError') throw error;
    throw new ApiRequestError({ status: 0, code: 'NETWORK_ERROR', message: NETWORK_ERROR_MESSAGE });
  }

  const text = await response.text();

  if (response.status === 204 && response.ok) return null;

  const payload = parseJson(text);
  const isObject = payload !== null && typeof payload === 'object';

  if (!isObject) {
    throw new ApiRequestError({
      status: response.status,
      code: 'INVALID_RESPONSE',
      message: INVALID_RESPONSE_MESSAGE,
    });
  }

  if (!response.ok) {
    throw new ApiRequestError({
      status: response.status,
      code: payload.code || 'UNKNOWN_ERROR',
      message: payload.message || GENERIC_ERROR_MESSAGE,
      fieldErrors: payload.errors && typeof payload.errors === 'object' ? payload.errors : {},
    });
  }

  return payload;
}
