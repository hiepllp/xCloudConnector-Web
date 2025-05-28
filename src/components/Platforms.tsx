import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const platforms = [
  { 
    name: 'Salesforce', 
    category: 'CRM',
    logo: 'https://images.pexels.com/photos/5583203/pexels-photo-5583203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: '#0099e5'
  },
  { 
    name: 'Xero', 
    category: 'Accounting',
    logo: 'https://images.pexels.com/photos/5583203/pexels-photo-5583203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: '#13b5ea'
  },
  { 
    name: 'MYOB', 
    category: 'Accounting',
    logo: 'https://images.pexels.com/photos/5583203/pexels-photo-5583203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: '#8e43e7'
  },
  { 
    name: 'Shopify', 
    category: 'E-commerce',
    logo: 'https://images.pexels.com/photos/5583203/pexels-photo-5583203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: '#7ab55c'
  },
  { 
    name: 'Zoho', 
    category: 'Business Suite',
    logo: 'https://images.pexels.com/photos/5583203/pexels-photo-5583203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: '#f88c00'
  },
  { 
    name: 'Certinia', 
    category: 'PSA',
    logo: 'https://images.pexels.com/photos/5583203/pexels-photo-5583203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: '#ffffff'
  },
  { 
    name: 'NetSuite', 
    category: 'ERP',
    logo: 'https://images.pexels.com/photos/5583203/pexels-photo-5583203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: '#4678bc'
  },
  { 
    name: 'QuickBooks', 
    category: 'Accounting',
    logo: 'https://images.pexels.com/photos/5583203/pexels-photo-5583203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    color: '#2ca01c'
  },
];

const Platforms = () => {
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

  const imageVariants = {
    hover: {
      scale: 1.05,
      filter: "brightness(1.2)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="platforms" className="section bg-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">
            Connect Your <span className="text-primary-400">Platforms</span>
          </h2>
          <p className="text-gray-300 text-lg">
            xCloudConnector seamlessly integrates with all your essential business systems
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="flex flex-col items-center gap-16"
        >
          <motion.div
            className="w-full max-w-3xl mx-auto"
            whileHover="hover"
            variants={imageVariants}
          >
            <img 
              src="/x_Connector_glassy.png" 
              alt="Platform Integration Diagram"
              className="w-full h-auto rounded-xl shadow-neon transition-all duration-300"
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {platforms.map((platform, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-hover group"
              >
                <div 
                  className="h-32 flex items-center justify-center border-b border-gray-800 group-hover:border-gray-700 transition-colors"
                  style={{ backgroundColor: `${platform.color}10` }}
                >
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${platform.color}20`,
                      boxShadow: `0 0 15px ${platform.color}40`
                    }}
                  >
                    <span 
                      className="text-xl font-bold"
                      style={{ color: platform.color }}
                    >
                      {platform.name.substring(0, 1)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    {platform.category}
                  </p>
                  <h3 className="text-lg font-semibold group-hover:text-primary-400 transition-colors">
                    {platform.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="text-center mt-12">
          <a href="#contact" className="btn-secondary">
            See All Integrations
          </a>
        </div>
      </div>
    </section>
  );
};

export default Platforms;