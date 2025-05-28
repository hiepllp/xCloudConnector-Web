import React, { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const email = location.state?.email;
  const [resetSent, setResetSent] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [view, setView] = useState<'sign_in' | 'forgot_password'>('sign_in');

  useEffect(() => {
    if (user) {
      // If user is already authenticated, redirect to checkout
      navigate('/checkout');
    }
  }, [user, navigate]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth?view=update_password`,
      });

      if (error) {
        throw error;
      }

      setResetSent(true);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-gray-800 p-8 rounded-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            {view === 'sign_in' ? 'Welcome Back!' : 'Reset Password'}
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            {view === 'sign_in'
              ? 'Please sign in to continue with your purchase'
              : 'Enter your email to receive reset instructions'}
          </p>
        </div>

        {view === 'sign_in' ? (
          <>
            <Auth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#00e6e6',
                      brandAccent: '#00b3b3',
                    }
                  }
                }
              }}
              theme="dark"
              providers={[]}
              redirectTo={`${window.location.origin}/checkout`}
              onlyThirdPartyProviders={false}
              magicLink={false}
              socialLayout="horizontal"
              view="sign_in"
              defaultEmail={email}
            />
            <div className="text-center mt-4">
              <button
                onClick={() => setView('forgot_password')}
                className="text-primary-400 hover:text-primary-300 text-sm"
              >
                Forgot your password?
              </button>
            </div>
          </>
        ) : (
          <div className="mt-8">
            {resetSent ? (
              <div className="text-center">
                <p className="text-green-400 mb-4">
                  Password reset instructions have been sent to your email.
                </p>
                <button
                  onClick={() => {
                    setView('sign_in');
                    setResetSent(false);
                  }}
                  className="text-primary-400 hover:text-primary-300"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm bg-gray-900 text-white focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full btn-primary"
                  >
                    Send Reset Instructions
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setView('sign_in')}
                    className="text-primary-400 hover:text-primary-300 text-sm"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;