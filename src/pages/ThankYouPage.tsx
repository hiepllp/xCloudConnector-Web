import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <div className="rounded-full bg-success-500/20 p-4 mx-auto w-fit mb-8">
          <CheckCircle className="h-12 w-12 text-success-400" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Thank You!
        </h2>
        
        <p className="text-gray-300 mb-8">
          We've received your information and will be in touch shortly.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="btn-primary block"
          >
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;