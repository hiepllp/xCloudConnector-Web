import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Building, Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Redirect to auth page if not logged in
  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-primary-400">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Back to Home
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center p-4 bg-gray-900 rounded-lg">
              <User className="h-6 w-6 text-primary-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Full Name</p>
                <p className="text-lg text-white">{user.user_metadata?.full_name || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-900 rounded-lg">
              <Mail className="h-6 w-6 text-primary-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-lg text-white">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-900 rounded-lg">
              <Building className="h-6 w-6 text-primary-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Company</p>
                <p className="text-lg text-white">{user.user_metadata?.company || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-900 rounded-lg">
              <Calendar className="h-6 w-6 text-primary-400 mr-3" />
              <div>
                <p className="text-sm text-gray-400">Member Since</p>
                <p className="text-lg text-white">
                  {new Date(user.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/auth?view=update_password')}
                className="btn-secondary w-full"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;