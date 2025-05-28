import React, { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Only redirect to auth if there's no session_id (meaning they didn't come from Stripe)
    if (!user && !sessionId) {
      navigate('/auth');
    }
  }, [user, navigate, sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-500/30 via-secondary-500/30 to-accent-500/30 animate-pulse-slow"></div>
      </div>

      {/* Glowing orbs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-500/20 rounded-full filter blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full text-center px-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="rounded-full bg-success-500/20 p-4 mx-auto w-fit mb-8"
        >
          <CheckCircle className="h-12 w-12 text-success-400" />
        </motion.div>
        
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-6xl font-bold text-white mb-6 glow-text"
        >
          Thank You!
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-2xl text-gray-300 mb-12"
        >
          Enjoy integrating!
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="space-y-4"
        >
          <Link
            to="/profile"
            className="btn-primary block sm:inline-block sm:mr-4"
          >
            View Your Profile <ArrowRight className="inline-block ml-2 h-5 w-5" />
          </Link>
          
          <Link
            to="/"
            className="btn-secondary block sm:inline-block"
          >
            Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;