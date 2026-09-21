'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Toast from '@/components/Toast';

function getPasswordStrength(password: string): { label: string; color: string } {
  if (password.length === 0) return { label: '', color: '' };
  if (password.length < 6) return { label: 'Weak', color: 'text-red-400' };
  if (password.length < 10) return { label: 'Medium', color: 'text-amber-400' };
  return { label: 'Strong', color: 'text-green-400' };
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const strength = getPasswordStrength(password);

  function validate() {
    const errors: Record<string, string> = {};
    if (!name.trim()) errors.name = 'Full name is required.';
    if (!email.trim()) {
      errors.email = 'Email is required.';
    } else if (!isValidEmail(email)) {
      errors.email = 'Enter a valid email address.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, passwordConfirm: confirmPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setToast({ message: 'Account created! Please sign in.', type: 'success' });
        setTimeout(() => router.push('/login'), 2500);
      } else {
        setServerError(data.message ?? 'Registration failed. Please try again.');
      }
    } catch {
      setServerError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const eyeHide = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" /></svg>
  );
  const eyeShow = (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
  );

  return (
    <>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
      <div className="max-w-md mx-auto mt-16 bg-card rounded-xl p-8">
        <h1 className="text-3xl font-bold text-amber-400 text-center mb-1">Book Worm</h1>
        <p className="text-slate-400 text-center mb-8">Create your account</p>

        {serverError && (
          <div className="mb-4 rounded-lg bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full rounded-lg bg-main border text-slate-200 px-3 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ${fieldErrors.name ? 'border-red-600' : 'border-slate-700'}`}
              placeholder="Jane Doe"
            />
            {fieldErrors.name && <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full rounded-lg bg-main border text-slate-200 px-3 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ${fieldErrors.email ? 'border-red-600' : 'border-slate-700'}`}
              placeholder="you@example.com"
            />
            {fieldErrors.email && <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full rounded-lg bg-main border text-slate-200 px-3 py-2.5 pr-10 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ${fieldErrors.password ? 'border-red-600' : 'border-slate-700'}`}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                {showPassword ? eyeHide : eyeShow}
              </button>
            </div>
            {password && (
              <p className={`mt-1 text-xs font-medium ${strength.color}`}>Strength: {strength.label}</p>
            )}
            {fieldErrors.password && <p className="mt-1 text-xs text-red-400">{fieldErrors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full rounded-lg bg-main border text-slate-200 px-3 py-2.5 pr-10 text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent ${fieldErrors.confirmPassword ? 'border-red-600' : 'border-slate-700'}`}
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowConfirm((v) => !v)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-200" aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                {showConfirm ? eyeHide : eyeShow}
              </button>
            </div>
            {fieldErrors.confirmPassword && <p className="mt-1 text-xs text-red-400">{fieldErrors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 text-sm transition-colors"
          >
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-amber-400 hover:text-amber-300 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}
