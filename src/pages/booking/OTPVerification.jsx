// OTPVerification.jsx — PAGE 2 of booking flow (/booking-vm/otp)
// 6-box OTP input, 60-second resend countdown, 5 states (normal/loading/error/expired/success)
// On mount: OTP already sent from Page 1. Verifies against sessionStorage mock.

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingContext } from '../../hooks/useBookingContext';
import { bookingApi } from '../../services/bookingApi';
import { maskEmail } from '../../utils/validation';
import BookingStepper from '../../components/booking/BookingStepper';
import OTPInputField from '../../components/booking/OTPInputField';
import { Mail, RefreshCw, ArrowLeft, CheckCircle, Clock, ShieldCheck } from 'lucide-react';

const OTP_LENGTH = 6;
const RESEND_COUNTDOWN = 60;

export default function OTPVerification() {
  const navigate = useNavigate();
  const { userDetails, setEmailVerified, otpSent, setOtpSent } = useBookingContext();

  const email = userDetails?.email || '';

  // OTP state
  const [otpDigits, setOtpDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [verifyStatus, setVerifyStatus] = useState('idle'); // idle | loading | error | expired | success
  const [errorMsg, setErrorMsg] = useState('');

  // Resend countdown
  const [countdown, setCountdown] = useState(RESEND_COUNTDOWN);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Redirect to form if no email in context
  useEffect(() => {
    if (!email) navigate('/booking-vm', { replace: true });
  }, [email, navigate]);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) { setCanResend(true); return; }
    const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Format countdown display
  const formatCountdown = (s) => {
    const mm = Math.floor(s / 60).toString().padStart(2, '0');
    const ss = (s % 60).toString().padStart(2, '0');
    return `${mm}:${ss}`;
  };

  // Auto-verify when all 6 digits are entered
  const handleOtpChange = useCallback(async (digits) => {
    setOtpDigits(digits);
    const code = digits.join('');
    if (code.length !== OTP_LENGTH) return;

    // Auto-verify
    setVerifyStatus('loading');
    setErrorMsg('');

    try {
      const result = await bookingApi.verifyOtp(email, code);
      if (result.success) {
        setVerifyStatus('success');
        setEmailVerified(true);
        // Navigate after brief success display
        setTimeout(() => navigate('/booking-vm/slots'), 1200);
      } else if (result.expired) {
        setVerifyStatus('expired');
        setErrorMsg('');
      } else {
        setVerifyStatus('error');
        setErrorMsg(result.error || 'Incorrect verification code. Please try again.');
        // Clear OTP boxes after short delay
        setTimeout(() => setOtpDigits(Array(OTP_LENGTH).fill('')), 600);
      }
    } catch {
      setVerifyStatus('error');
      setErrorMsg('Verification failed. Please try again.');
    }
  }, [email, setEmailVerified, navigate]);

  // Resend OTP
  const handleResend = async () => {
    setIsResending(true);
    setVerifyStatus('idle');
    setErrorMsg('');
    setOtpDigits(Array(OTP_LENGTH).fill(''));
    try {
      await bookingApi.sendOtp(email);
      setOtpSent(true);
      setCountdown(RESEND_COUNTDOWN);
      setCanResend(false);
    } catch {
      setErrorMsg('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  // Change email — go back
  const handleChangeEmail = () => navigate('/booking-vm');

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO SECTION ──────────────────────────────────────────────────── */}
      <section className="relative w-full h-[200px] md:h-[280px] bg-gradient-to-br from-[#E4F3E6] via-[#EAEBF7] to-[#FFE7B8] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-48 h-48 rounded-full bg-[#017119]/10 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-64 h-64 rounded-full bg-[#FFA500]/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#0F1D75]/5 blur-3xl" />

        <div className="relative z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#017119]/15 mb-3">
            <ShieldCheck className="w-5 h-5 text-[#017119]" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#017119] mb-2">
            Oceao Enviro Group
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#0F1D75] mb-2">
            Verify Your Email
          </h1>
          <p className="text-base md:text-lg text-[#011539]/70 font-medium max-w-md mx-auto">
            Enter the 6-digit code sent to your inbox
          </p>
        </div>
      </section>

      {/* ── FORM SECTION ──────────────────────────────────────────────────── */}
      <div className="max-w-lg mx-auto px-4 py-10">
        <BookingStepper currentStep={2} />

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-10 mt-6">

          {/* Email hint */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[#E4F3E6] flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-[#017119]" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              We sent a 6-digit code to<br />
              <span className="font-semibold text-[#011539]">{maskEmail(email)}</span>
            </p>
          </div>

          {/* ── SUCCESS state ────────────────────────────────────────────── */}
          {verifyStatus === 'success' && (
            <div className="flex flex-col items-center py-6">
              <div className="w-16 h-16 rounded-full bg-[#E4F3E6] flex items-center justify-center mb-3 animate-bounce">
                <CheckCircle className="w-10 h-10 text-[#017119]" />
              </div>
              <p className="text-[#017119] font-bold text-lg">Email Verified!</p>
              <p className="text-gray-500 text-sm mt-1">Redirecting to slot selection…</p>
            </div>
          )}

          {/* ── EXPIRED state ────────────────────────────────────────────── */}
          {verifyStatus === 'expired' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-orange-600 font-semibold mb-1">This code has expired</p>
              <p className="text-gray-500 text-sm mb-6">Request a new code to continue.</p>
              <button
                id="send-new-code-btn"
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="px-6 py-3 bg-[#017119] text-white font-semibold rounded-xl hover:bg-[#014D11] transition-colors"
              >
                {isResending ? 'Sending…' : 'Send New Code'}
              </button>
            </div>
          )}

          {/* ── OTP input (normal/loading/error states) ─────────────────── */}
          {verifyStatus !== 'success' && verifyStatus !== 'expired' && (
            <>
              <OTPInputField
                value={otpDigits}
                onChange={handleOtpChange}
                disabled={verifyStatus === 'loading'}
                hasError={verifyStatus === 'error'}
              />

              {/* Loading */}
              {verifyStatus === 'loading' && (
                <div className="flex items-center justify-center gap-2 mt-5 text-[#017119]">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                  </svg>
                  <span className="text-sm font-medium">Verifying…</span>
                </div>
              )}

              {/* Error message */}
              {verifyStatus === 'error' && errorMsg && (
                <div className="mt-4 flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                  <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-700">{errorMsg}</p>
                </div>
              )}

              {/* Resend section */}
              <div className="mt-8 text-center">
                {!canResend ? (
                  <p className="text-sm text-gray-500">
                    Resend in{' '}
                    <span className="font-semibold text-[#011539] font-mono">
                      {formatCountdown(countdown)}
                    </span>
                  </p>
                ) : (
                  <button
                    id="resend-otp-btn"
                    type="button"
                    onClick={handleResend}
                    disabled={isResending}
                    className="flex items-center gap-2 text-sm text-[#017119] font-semibold mx-auto hover:underline disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                    {isResending ? 'Sending new code…' : 'Resend Code'}
                  </button>
                )}
              </div>
            </>
          )}

          {/* Change email link */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <button
              id="change-email-btn"
              type="button"
              onClick={handleChangeEmail}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#011539] mx-auto transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Change Email
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
