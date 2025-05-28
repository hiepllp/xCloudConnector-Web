import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, MessageSquare, User, Building } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log('Form submitted:', formState);
    alert('Thank you for your message! We will get back to you soon.');
    setFormState({
      name: '',
      email: '',
      company: '',
      message: '',
    });
  };

  return (
    <section id="contact" className="section bg-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-title">
            Get <span className="text-primary-400">Started</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Ready to streamline your data integration? Contact us today to get started.
          </p>
        </div>

        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto card border border-gray-800 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-gray-800 p-8">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6 text-gray-300">
                <p>Fill out the form and our team will get back to you within 24 hours.</p>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary-400 mr-3" />
                    <span>info@xcloudconnector.com</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-5 w-5 text-primary-400 mr-3" />
                    <span>Live chat available 9am-5pm EST</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400 mb-2">Connect with us</p>
                  <div className="flex space-x-4">
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-500 hover:text-gray-900 transition-colors duration-200">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a href="#" className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary-500 hover:text-gray-900 transition-colors duration-200">
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 focus:ring-primary-500 focus:border-primary-500 text-white"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 focus:ring-primary-500 focus:border-primary-500 text-white"
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                      Company
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building className="h-5 w-5 text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-gray-800 focus:ring-primary-500 focus:border-primary-500 text-white"
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      rows={4}
                      className="block w-full px-3 py-3 border border-gray-700 rounded-lg bg-gray-800 focus:ring-primary-500 focus:border-primary-500 text-white"
                      placeholder="Tell us about your integration needs..."
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-primary w-full"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;