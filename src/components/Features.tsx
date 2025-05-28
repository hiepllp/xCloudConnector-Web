import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LayoutGrid, Lock, Zap, Cog, BarChart, Clock, Globe, Database } from 'lucide-react';

const featuresList = [
  {
    title: 'Quick Setup',
    description: 'Get up and running in minutes with our intuitive setup process and pre-built connectors.',
    icon: Zap,
    color: 'text-primary-400'
  },
  {
    title: 'Secure & Reliable',
    description: 'Enterprise-grade security with end-to-end encryption and 99.9% uptime guarantee.',
    icon: Lock,
    color: 'text-success-400'
  },
  {
    title: 'Highly Configurable',
    description: 'Tailor the integration to your exact needs with our powerful configuration options.',
    icon: Cog,
    color: 'text-secondary-400'
  },
  {
    title: 'Real-time Sync',
    description: 'Keep your data synchronized across platforms in real-time with intelligent change detection.',
    icon: Clock,
    color: 'text-warning-400'
  },
  {
    title: 'Advanced Analytics',
    description: 'Track the performance of your integrations with comprehensive analytics and reporting.',
    icon: BarChart,
    color: 'text-accent-400'
  },
  {
    title: 'Multi-platform Support',
    description: 'Connect with all major platforms including Salesforce, Xero, MYOB, Shopify, and more.',
    icon: Globe,
    color: 'text-error-400'
  },
  {
    title: 'Custom Mappings',
    description: 'Create custom field mappings between your different platforms with our visual mapper.',
    icon: LayoutGrid,
    color: 'text-secondary-400'
  },
  {
    title: 'Data Transformation',
    description: 'Transform data between systems with powerful rules and automated workflows.',
    icon: Database,
    color: 'text-primary-400'
  }
];

const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="features" className="section bg-gray-950 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900 to-transparent opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">
            Powerful <span className="text-primary-400">Features</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Everything you need to connect and synchronize your business platforms effortlessly
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="feature-card group"
            >
              <div className={`rounded-full w-12 h-12 flex items-center justify-center mb-4 bg-gray-800 ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-400 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;