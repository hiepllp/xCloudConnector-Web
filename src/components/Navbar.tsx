import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Cloud, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'Platforms', href: '/#platforms' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Pricing', href: '/#pricing' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2">
          <img 
            src="/xConnector_Logo.png" 
            alt="xCloudConnector Logo" 
            className="h-16 w-auto"
          />
        </a>
        {/* <Link to="/" className="flex items-center space-x-2">
          <Cloud className="h-8 w-8 text-primary-400" />
          <span className="text-xl font-bold text-white">
            <span className="text-primary-400">x</span>CloudConnector
          </span>
        </Link> */}
        

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="nav-link">
                {link.name}
              </a>
            ))}
          </div>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="nav-link flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>
              <button onClick={signOut} className="btn-secondary">
                Sign Out
              </button>
            </div>
          ) : (
            <Link to="/auth" className="btn-primary">
              Get Started
            </Link>
          )}
        </div>

        {/* Mobile Navigation Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-gray-900 shadow-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block py-2 nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5 inline mr-2" />
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }} 
                  className="btn-secondary text-center"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="btn-primary text-center"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;