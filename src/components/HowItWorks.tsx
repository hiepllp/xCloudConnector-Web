import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Settings, Database, RefreshCw, CheckCircle } from 'lucide-react';
import VideoCarousel from './VideoCarousel';

const steps = [
  {
    title: 'Connect',
    description: 'Securely connect your platforms with our simple authorization flow.',
    icon: Database,
    color: 'bg-secondary-500/20 text-secondary-400'
  },
  {
    title: 'Configure',
    description: 'Set up your data mappings and synchronization rules through our intuitive interface.',
    icon: Settings,
    color: 'bg-primary-500/20 text-primary-400'
  },
  {
    title: 'Synchronize',
    description: 'Let xCloudConnector automatically keep your data in sync across all platforms.',
    icon: RefreshCw,
    color: 'bg-accent-500/20 text-accent-400'
  },
  {
    title: 'Monitor',
    description: 'Track your integration performance and receive alerts for any issues.',
    icon: CheckCircle,
    color: 'bg-success-500/20 text-success-400'
  }
];

const HowItWorks = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="how-it-works" className="section bg-gray-950 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900 to-transparent opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">
            How It <span className="text-primary-400">Works</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Get your platforms connected in minutes with our simple four-step process
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="relative"
        >
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-800 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative z-10"
              >
                <div className="feature-card flex flex-col items-center text-center h-full">
                  <div className={`rounded-full w-16 h-16 flex items-center justify-center mb-5 ${step.color}`}>
                    <step.icon className="h-8 w-8" />
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex justify-center items-center w-8 h-8 rounded-full bg-primary-500 text-gray-900 font-bold text-sm">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block ml-2">
                        <ArrowRight className="h-5 w-5 text-gray-600" />
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-400 mb-4">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 mb-12"
        >
          <VideoCarousel />
        </motion.div>

        <div className="text-center">
          <a href="#contact" className="btn-primary">
            Start Connecting
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;