import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "xCloudConnector has transformed how our business operates. We've eliminated manual data entry and the errors that came with it.",
    author: "Sarah Johnson",
    position: "CFO, TechSolutions Inc.",
    rating: 5,
    platforms: "Salesforce + Xero"
  },
  {
    quote: "The setup was incredibly easy, and the support team was there to help with any questions. Now our systems work together seamlessly.",
    author: "Michael Chen",
    position: "Operations Director, Retail Express",
    rating: 5,
    platforms: "Shopify + MYOB"
  },
  {
    quote: "We've reduced our administrative overhead by 70% since implementing xCloudConnector. The ROI is outstanding.",
    author: "Emily Rodriguez",
    position: "CEO, GrowthGurus",
    rating: 5,
    platforms: "Zoho + Certinia"
  }
];

const Testimonials = () => {
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
    <section id="testimonials" className="section bg-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">
            What Our <span className="text-primary-400">Clients Say</span>
          </h2>
          <p className="text-gray-300 text-lg">
            See how xCloudConnector is helping businesses streamline their operations
          </p>
        </div>

        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="card-hover p-6 flex flex-col h-full"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-primary-400 fill-primary-400" />
                ))}
              </div>
              
              <blockquote className="text-gray-300 italic mb-6 flex-grow">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="mt-auto">
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-sm text-gray-400">{testimonial.position}</p>
                <div className="mt-2 inline-block px-3 py-1 rounded-full bg-gray-800 text-primary-400 text-xs">
                  {testimonial.platforms}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;