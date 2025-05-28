import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Platforms from '../components/Platforms';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <>
      <Hero />
      <Features />
      <Platforms />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <Contact />
    </>
  );
};

export default HomePage;