import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import IntegrationVisual from './IntegrationVisual';

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-500/20 rounded-full filter blur-3xl"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-800 mb-6">
              <Zap className="w-4 h-4 text-primary-400 mr-2" />
              <span className="text-sm font-medium text-primary-300">Next-Gen Integration</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Seamless <span className="glow-text">Integration</span> for Your Business Systems
            </h1>
            
            <p className="text-gray-300 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              xCloudConnector is a powerful, configurable platform that synchronizes data between 
              Salesforce, Xero, MYOB, Shopify, Zoho, Certinia and more - all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#contact" className="btn-primary w-full sm:w-auto">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#features" className="btn-secondary w-full sm:w-auto">
                Explore Features
              </a>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:pl-8"
          >
            <IntegrationVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;