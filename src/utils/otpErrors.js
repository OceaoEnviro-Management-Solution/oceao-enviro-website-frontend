// otpErrors.js — turns a failed OTP request into what the booking pages should show.
// Keeps backend error codes out of the presentational components.

const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;

/**
 * @param {unknown} error an ApiRequestError (or anything else that was thrown)
 * @returns {{ kind: string, message: string, attemptsLeft?: number, retryAfterSec?: number }}
 *   kind: 'invalid' | 'expired' | 'locked' | 'not_found' | 'cooldown' | 'send_limit' | 'other'
 *   message: ready to show to the user (the backend message, plus attempts left for 'invalid')
 */
export function describeOtpError(error) {
  const fallback = 'Something went wrong. Please try again.';
  const message = (error && error.message) || fallback;
  const details = (error && error.fieldErrors) || {};

  const retryAfterSec = Number.isFinite(details.retryAfterSec) ? details.retryAfterSec : undefined;

  switch (error && error.code) {
    case 'OTP_INVALID': {
      const attemptsLeft = Number.isFinite(details.attemptsLeft) ? details.attemptsLeft : undefined;
      return {
        kind: 'invalid',
        attemptsLeft,
        message: attemptsLeft === undefined
          ? message
          : `${message} ${plural(attemptsLeft, 'attempt')} left.`,
      };
    }
    case 'OTP_EXPIRED':
      return { kind: 'expired', message };
    case 'OTP_LOCKED':
      return { kind: 'locked', message };
    case 'OTP_NOT_FOUND':
      return { kind: 'not_found', message };
    case 'OTP_COOLDOWN':
      return { kind: 'cooldown', message, retryAfterSec };
    case 'OTP_SEND_LIMIT':
      return { kind: 'send_limit', message, retryAfterSec };
    default:
      return { kind: 'other', message };
  }
}
