// AdminLogin.jsx — Admin authentication page (/admin/login)
// Simple centered form with brand-green header.
// Mock credentials: admin@oceaoenviro.com / admin123

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (adminApi.isAuthenticated()) {
    navigate('/admin/dashboard', { replace: true });
    return null;
  }

  const isFormFilled = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormFilled) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await adminApi.login(email.trim(), password);
      if (result.success) {
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(result.error || 'Invalid credentials');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm">

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-br from-[#011539] to-[#0F1D75] px-8 py-8 text-center">
            <div className="w-14 h-14 bg-[#017119] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white mb-1">OCEAO ENVIRO</h1>
            <p className="text-white/60 text-sm">Admin Management</p>
          </div>

          {/* Form */}
          <div className="px-8 py-8">
            <form onSubmit={handleSubmit} noValidate id="admin-login-form">
              <div className="space-y-5">

                {/* Email */}
                <div>
                  <label htmlFor="admin-email" className="text-sm font-semibold text-[#011539] block mb-1.5">
                    Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    placeholder="admin@oceaoenviro.com"
                    autoComplete="email"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 text-sm outline-none
                      focus:border-[#017119] transition-colors duration-200"
                  />
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="admin-password" className="text-sm font-semibold text-[#011539] block mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); setError(''); }}
                      placeholder="Your password"
                      autoComplete="current-password"
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 text-sm outline-none
                        focus:border-[#017119] transition-colors duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(s => !s)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </div>
                )}

                {/* Login button */}
                <button
                  id="admin-login-btn"
                  type="submit"
                  disabled={!isFormFilled || isLoading}
                  className={`
                    w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl
                    font-semibold text-sm transition-all duration-200
                    ${isFormFilled && !isLoading
                      ? 'bg-[#017119] text-white hover:bg-[#014D11] active:scale-[0.98] shadow-lg shadow-[#017119]/25'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {isLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                      </svg>
                      Logging in…
                    </>
                  ) : 'Login'}
                </button>
              </div>
            </form>

            {/* Dev credentials hint */}
            <div className="mt-6 pt-5 border-t border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                <span className="font-medium">Dev:</span> admin@oceaoenviro.com / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
