import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, User, Mail, Building } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { createCheckoutSession } from '../lib/stripe';
import { products } from '../stripe-config';
import { useAuth } from '../hooks/useAuth';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
        fullName: user.user_metadata?.full_name || '',
        company: user.user_metadata?.company || '',
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!user) {
        const password = Array(20)
          .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*')
          .map(x => x[Math.floor(Math.random() * x.length)])
          .join('');
        
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password,
          options: {
            data: {
              full_name: formData.fullName,
              company: formData.company,
            },
          },
        });

        if (signUpError) {
          // Check for user already exists error and redirect to auth page
          if (signUpError.message === 'User already registered' || 
              signUpError.message.includes('already registered') ||
              signUpError.message.includes('already exists')) {
            navigate('/auth', { 
              state: { email: formData.email }
            });
            return;
          }
          throw signUpError;
        }

        if (!data?.user) {
          throw new Error('Failed to create account: No user data returned');
        }
      }

      const { priceId, mode } = products.integrationConnection;
      
      if (!priceId) {
        throw new Error('Invalid price ID configuration');
      }

      await createCheckoutSession(priceId, mode, 1);
    } catch (error: any) {
      console.error('Checkout error:', error);
      // Only show alert for non-redirect errors
      if (!error.message?.includes('already registered') && 
          !error.message?.includes('already exists')) {
        alert(error.message || 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Complete Your Purchase</h1>
          <p className="mt-2 text-gray-300">
            Integration Connection Point - $250/month
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                Full Name *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900 focus:ring-primary-500 focus:border-primary-500 text-white"
                  placeholder="John Doe"
                  readOnly={!!user}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address *
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900 focus:ring-primary-500 focus:border-primary-500 text-white"
                  placeholder="john@example.com"
                  readOnly={!!user}
                />
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-300">
                Company (Optional)
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-900 focus:ring-primary-500 focus:border-primary-500 text-white"
                  placeholder="Your Company"
                  readOnly={!!user}
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5 mr-2" />
                    Proceed to Payment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CheckoutPage;