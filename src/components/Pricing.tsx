import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../stripe-config';

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '30 days trial',
    description: 'Perfect for small businesses looking to connect their essential platforms.',
    features: [
      'Connect 1 platform',
      'Basic field mapping',
      'Daily synchronization',
      'Email support',
      'Basic alerts'
    ],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Each Connector',
    price: '$250',
    period: 'per month',
    description: 'For growing businesses that need more powerful integration capabilities.',
    features: [
      'Connect your selected platforms',
      'Advanced field mapping',
      'Hourly synchronization',
      'Priority email support',
      'Enhanced analytics',
      'Custom workflows',
      'Data transformation'
    ],
    cta: 'Start Free Trial',
    popular: true,
    priceId: products.integrationConnection.priceId
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    description: 'Tailored solutions for organizations with complex integration needs.',
    features: [
      'Unlimited platform connections',
      'Custom field mapping',
      'Real-time synchronization',
      'Dedicated account manager',
      'Advanced analytics & reporting',
      'Custom API development',
      'On-premises deployment option',
      'SLA guarantee'
    ],
    cta: 'Contact Sales',
    popular: false
  }
];

const Pricing = () => {
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
    <section id="pricing" className="section bg-gray-950 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900 to-transparent opacity-50"></div>
      
      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">
            Simple, Transparent <span className="text-primary-400">Pricing</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Experience the power of xCloudConnector with our straightforward pricing model. 
            Start integrating your business applications today.
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`card-hover relative ${plan.popular ? 'border-primary-500 shadow-neon' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary-500 text-gray-900 text-xs font-bold px-4 py-1 rounded-full flex items-center">
                    <Zap className="h-3 w-3 mr-1" />
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-400">{plan.description}</p>
              </div>
              
              <div className="p-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.name === 'Enterprise' ? (
                  <a href="#contact" className="btn-secondary w-full">
                    {plan.cta}
                  </a>
                ) : (
                  <Link
                    to="/checkout"
                    className={plan.popular ? 'btn-primary w-full' : 'btn-secondary w-full'}
                  >
                    {plan.cta}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="bg-gray-900 p-8 rounded-xl mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact our team to discuss your specific integration needs and get a tailored solution for your business.
          </p>
          <a href="#contact" className="btn-secondary">
            Contact Sales
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;