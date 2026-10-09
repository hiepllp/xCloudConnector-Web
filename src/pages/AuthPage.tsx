import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

type AuthView = 'sign_in' | 'sign_up' | 'forgot_password';

const getAuthErrorMessage = (authError: unknown) => {
  if (authError instanceof TypeError && authError.message.toLowerCase().includes('fetch')) {
    return 'We could not connect to the account service. Check your internet connection and try again.';
  }

  return authError instanceof Error ? authError.message : 'Unable to complete this request.';
};

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn, signUp } = useAuth();
  const [view, setView] = useState<AuthView>('sign_in');
  const [email, setEmail] = useState(location.state?.email ?? '');
  const [password, setPassword] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/checkout', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (view === 'sign_up') {
        const { session } = await signUp(email.trim(), password);
        if (!session) {
          setMessage('Your account was created. Check your email to confirm it before signing in.');
        }
      } else {
        await signIn(email.trim(), password);
      }
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth?view=update_password`,
      });

      if (resetError) {
        throw resetError;
      }

      setResetSent(true);
      setMessage('Password reset instructions have been sent to your email.');
    } catch (resetError) {
      setError(getAuthErrorMessage(resetError));
    } finally {
      setLoading(false);
    }
  };

  const switchView = (nextView: AuthView) => {
    setView(nextView);
    setError('');
    setMessage('');
    setResetSent(false);
    setPassword('');
  };

  const isResetView = view === 'forgot_password';
  const isSignUpView = view === 'sign_up';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            {isResetView ? 'Reset Password' : isSignUpView ? 'Create Your Account' : 'Welcome Back!'}
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            {isResetView
              ? 'Enter your email to receive reset instructions'
              : isSignUpView
                ? 'Sign up to continue with your purchase'
                : 'Please sign in to continue with your purchase'}
          </p>
        </div>

        {isResetView ? (
          resetSent ? (
            <div className="text-center space-y-4">
              <p className="text-green-400">{message}</p>
              <button type="button" onClick={() => switchView('sign_in')} className="text-primary-400 hover:text-primary-300">
                Return to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <label htmlFor="reset-email" className="block text-sm font-medium text-gray-300">
                Email address
                <input
                  id="reset-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 block w-full px-3 py-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="you@example.com"
                />
              </label>
              <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-60">
                {loading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
              <button type="button" onClick={() => switchView('sign_in')} className="w-full text-primary-400 hover:text-primary-300 text-sm">
                Back to Sign In
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <label htmlFor="auth-email" className="block text-sm font-medium text-gray-300">
              Email address
              <input
                id="auth-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 block w-full px-3 py-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="you@example.com"
              />
            </label>

            <label htmlFor="auth-password" className="block text-sm font-medium text-gray-300">
              {isSignUpView ? 'Create a Password' : 'Password'}
              <input
                id="auth-password"
                type="password"
                required
                minLength={6}
                autoComplete={isSignUpView ? 'new-password' : 'current-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 block w-full px-3 py-3 border border-gray-700 rounded-md bg-gray-900 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Your password"
              />
            </label>

            {error && <p className="text-sm text-red-400" role="alert">{error}</p>}
            {message && <p className="text-sm text-green-400" role="status">{message}</p>}

            <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-60">
              {loading ? 'Please wait...' : isSignUpView ? 'Sign Up' : 'Sign In'}
            </button>

            <div className="flex flex-col items-center gap-3 text-sm">
              <button type="button" onClick={() => switchView(isSignUpView ? 'sign_in' : 'sign_up')} className="text-gray-300 hover:text-white underline">
                {isSignUpView ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
              </button>
              {!isSignUpView && (
                <button type="button" onClick={() => switchView('forgot_password')} className="text-primary-400 hover:text-primary-300">
                  Forgot your password?
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
