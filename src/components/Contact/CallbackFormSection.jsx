// CallbackFormSection.jsx — Tab 3: Request a Callback (6-field form)
// Uses react-datepicker (via FormInput) with min=today, max=today+30.
// Same pattern as QueryFormSection, plus live availability from the backend:
//   - the date picker disables every day GET /callback/calendar reports as not bookable
//   - picking a date loads GET /callback/availability and fills Preferred Time
//   - a Cloudflare Turnstile token is required to submit

import { useEffect, useMemo, useRef, useState } from 'react';
import { PhoneIncoming } from 'lucide-react';
import { useFormValidation } from '../../hooks/useFormValidation';
import { formFields } from '../../constants/contact';
import FormInput from './FormInput';
import SuccessPopup from './SuccessPopup';
import TurnstileWidget from '../common/TurnstileWidget';
import { callbackApi } from '../../services/callbackApi';
import { toDateKey } from '../../utils/dateKey';

const PERIOD_FILLED_MESSAGE = 'That time just filled up. Please choose another.';
const SLOTS_LOADING_PLACEHOLDER = 'Loading time slots…';
const NO_SLOTS_PLACEHOLDER = 'No time slots available';
const DATES_LOADING_PLACEHOLDER = 'Loading available dates…';

export default function CallbackFormSection() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Form-level message (duplicate request, CAPTCHA failure, network error ...)
  const [submitError, setSubmitError] = useState('');
  // Turnstile token: empty until the visitor passes the check; single-use.
  const [captchaToken, setCaptchaToken] = useState('');
  const captchaRef = useRef(null);

  // dateKey -> { date, bookable, reason } from GET /callback/calendar
  const [calendar, setCalendar] = useState({ status: 'loading', byDate: {}, error: '' });
  const [calendarTick, setCalendarTick] = useState(0);

  // Periods for the chosen date from GET /callback/availability, tagged with the request they
  // answer so a stale or in-flight answer is never mistaken for the current one.
  const [availability, setAvailability] = useState({ key: '', tick: -1, periods: [], error: '' });
  const [availabilityTick, setAvailabilityTick] = useState(0);

  const { formData, handleChange, errors, setErrors, handleSubmit, resetForm } =
    useFormValidation(formFields.callbackForm);

  const dateKey = toDateKey(formData.preferredDate);

  // ── Calendar: today .. today + 30, loaded on mount and after a conflict ─────
  useEffect(() => {
    let cancelled = false;

    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 30);

    callbackApi.getCalendar(toDateKey(start), toDateKey(end))
      .then((result) => {
        if (cancelled) return;
        const byDate = {};
        for (const day of result.data.days) byDate[day.date] = day;
        setCalendar({ status: 'ready', byDate, error: '' });
      })
      .catch((error) => {
        if (cancelled) return;
        setCalendar({
          status: 'error',
          byDate: {},
          error: error?.message || 'Unable to load available dates.',
        });
      });

    return () => { cancelled = true; };
  }, [calendarTick]);

  // ── Availability: periods for the chosen date ───────────────────────────────
  useEffect(() => {
    if (!dateKey) return undefined;
    let cancelled = false;

    callbackApi.getAvailability(dateKey)
      .then((result) => {
        if (cancelled) return;
        setAvailability({ key: dateKey, tick: availabilityTick, periods: result.data.periods, error: '' });
      })
      .catch((error) => {
        if (cancelled) return;
        setAvailability({
          key: dateKey,
          tick: availabilityTick,
          periods: [],
          error: error?.message || 'Unable to load time slots.',
        });
      });

    return () => { cancelled = true; };
  }, [dateKey, availabilityTick]);

  const calendarLoading = calendar.status === 'loading';
  const availabilityLoading = Boolean(dateKey)
    && !(availability.key === dateKey && availability.tick === availabilityTick);
  const availabilityError = !availabilityLoading && dateKey ? availability.error : '';

  // Disable days the backend says cannot be booked. A day missing from the answer (or the
  // whole answer, when the calendar failed to load) stays selectable; the backend still
  // enforces every rule when the request is submitted.
  const filterDate = (date) => {
    const day = calendar.byDate[toDateKey(date)];
    return !day || day.bookable;
  };

  // Preferred Time options: every period, unavailable ones disabled.
  const timeOptions = useMemo(() => {
    if (!dateKey || availabilityLoading) return [];
    return availability.periods.map((period) => ({
      value: period.key,
      label: `${period.label} (${period.timeRange})`,
      disabled: !period.available,
    }));
  }, [dateKey, availabilityLoading, availability.periods]);

  let timeField = formFields.callbackForm[4];
  if (availabilityLoading) {
    timeField = { ...timeField, placeholder: SLOTS_LOADING_PLACEHOLDER };
  } else if (dateKey && !availabilityError && timeOptions.length === 0) {
    timeField = { ...timeField, placeholder: NO_SLOTS_PLACEHOLDER };
  }

  let dateField = formFields.callbackForm[3];
  if (calendarLoading) {
    dateField = { ...dateField, placeholder: DATES_LOADING_PLACEHOLDER };
  }

  // Changing the date clears the chosen time: the periods belong to the old date.
  const handleFieldChange = (id, value) => {
    handleChange(id, value);
    setSubmitError('');
    if (id === 'preferredDate' && toDateKey(value) !== dateKey) {
      handleChange('preferredTime', '');
    }
  };

  const onSuccess = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await callbackApi.createRequest(data, captchaToken);
      setShowPopup(true);
      // A unit of capacity was just used; refresh what the calendar shows.
      setCalendarTick((tick) => tick + 1);
    } catch (error) {
      console.error('Callback request failed:', error?.code);

      if (error.code === 'PERIOD_FULL' || error.code === 'PERIOD_BLOCKED') {
        // Someone else took it first: ask again and make the visitor choose another.
        handleChange('preferredTime', '');
        setErrors((prev) => ({ ...prev, preferredTime: PERIOD_FILLED_MESSAGE }));
        setAvailabilityTick((tick) => tick + 1);
        setCalendarTick((tick) => tick + 1);
      } else {
        // Backend field errors (already keyed by form field) show under the fields;
        // anything else (DUPLICATE_REQUEST, CAPTCHA_FAILED ...) is shown as a message.
        const fieldErrors = error.fieldErrors || {};
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
        } else {
          setSubmitError(error.message || 'Something went wrong. Please try again.');
        }
      }
    } finally {
      setIsSubmitting(false);
      // The token is single-use: get a new one after every request, pass or fail.
      captchaRef.current?.reset();
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    resetForm();
    setSubmitError('');
  };

  const hasErrors = Object.values(errors).some(Boolean);
  const submitDisabled = isSubmitting || !captchaToken;

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full">
      <div className="mb-8 text-center">
        <h2 className="text-xl font-bold text-[#011539] mb-2">Request a Callback</h2>
        <p className="text-sm text-gray-500">
          Tell us when to call — we'll reach out at your preferred time.
        </p>
      </div>

      {/* Info banner */}
      <div className="mb-6 flex items-start gap-3 bg-[#0F1D75]/5 border border-[#0F1D75]/10 rounded-xl p-4">
        <PhoneIncoming className="w-5 h-5 text-[#0F1D75] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-[#0F1D75]/80 leading-relaxed">
          Callbacks are scheduled within <strong>30 days</strong> from today. Our team calls between
          9 AM and 6 PM IST, Monday to Saturday.
        </p>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e, onSuccess)}
        noValidate
        className="flex flex-col gap-6"
      >
        {/* Row 1: Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput
            field={formFields.callbackForm[0]}
            value={formData.name}
            onChange={handleFieldChange}
            error={errors.name}
          />
          <FormInput
            field={formFields.callbackForm[1]}
            value={formData.phone}
            onChange={handleFieldChange}
            error={errors.phone}
          />
        </div>

        {/* Row 2: Email */}
        <FormInput
          field={formFields.callbackForm[2]}
          value={formData.email}
          onChange={handleFieldChange}
          error={errors.email}
        />

        {/* Row 3: Preferred Date + Preferred Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <FormInput
            field={dateField}
            value={formData.preferredDate}
            onChange={handleFieldChange}
            error={errors.preferredDate}
            filterDate={filterDate}
            disabled={calendarLoading}
          />
          <FormInput
            field={timeField}
            value={formData.preferredTime}
            onChange={handleFieldChange}
            error={errors.preferredTime || availabilityError}
            options={timeOptions}
            disabled={!dateKey || availabilityLoading}
          />
        </div>

        {/* Reason textarea */}
        <FormInput
          field={formFields.callbackForm[5]}
          value={formData.reason}
          onChange={handleFieldChange}
          error={errors.reason}
        />

        {/* Calendar could not be loaded */}
        {calendar.status === 'error' && (
          <p className="text-xs text-red-500 text-center" role="alert">{calendar.error}</p>
        )}

        {/* Validation summary */}
        {hasErrors && (
          <p className="text-xs text-red-500 text-center">
            Please correct the errors above before submitting.
          </p>
        )}

        {/* Submit-time failure that belongs to no single field */}
        {submitError && (
          <p className="text-xs text-red-500 text-center" role="alert">{submitError}</p>
        )}

        {/* CAPTCHA */}
        <TurnstileWidget
          ref={captchaRef}
          onToken={setCaptchaToken}
          onExpire={() => setCaptchaToken('')}
        />

        {/* Submit */}
        <div className="flex justify-center mt-2">
          <button
            type="submit"
            disabled={submitDisabled}
            className={`
              flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-bold text-white
              transition-all duration-200 shadow-sm
              ${submitDisabled
                ? 'bg-gray-400 cursor-not-allowed opacity-70'
                : 'bg-[#017119] hover:bg-[#015a14] active:scale-[0.98] hover:shadow-md'
              }
              sm:w-auto w-full justify-center
            `}
          >
            {isSubmitting ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
                </svg>
                Submitting…
              </>
            ) : (
              <>
                <PhoneIncoming className="w-4 h-4" />
                Request Callback
              </>
            )}
          </button>
        </div>
      </form>

      <SuccessPopup isOpen={showPopup} onClose={handleClose} />
    </section>
  );
}
