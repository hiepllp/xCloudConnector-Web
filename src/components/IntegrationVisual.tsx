import React from 'react';
import { motion } from 'framer-motion';

const platformLogos = [
  { name: 'Salesforce', color: '#0099e5', position: { x: 0, y: -160 } },
  { name: 'Shopify', color: '#7ab55c', position: { x: 138.6, y: -80 } },
  { name: 'Xero', color: '#13b5ea', position: { x: -138.6, y: -80 } },
  { name: 'MYOB', color: '#8e43e7', position: { x: 138.6, y: 80 } },
  { name: 'Certinia', color: '#8a8a8a', position: { x: -138.6, y: 80 } },
  { name: 'Zoho', color: '#f88c00', position: { x: 0, y: 160 } },
];

const IntegrationVisual = () => {
  return (
    <div className="relative h-[500px] w-full max-w-lg mx-auto" style={{marginLeft:`-58px`}}>
      {/* Central hub */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.5,
          delay: 0.3
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center border-2 border-primary-500 shadow-neon animate-pulse-">
          <span className="text-sm font-bold text-center">
            <span className="text-primary-400">xCloudConnector</span>
          </span>
        </div>
        
        {/* Connection lines */}
        <svg className="absolute top-1/2 left-1/2 w-[400px] h-[400px] -translate-x-1/2 -translate-y-1/2 -z-10" viewBox="-200 -200 400 400">
          {platformLogos.map((platform, index) => (
            <motion.path
              key={index}
              d={`M0,0 L${platform.position.x},${platform.position.y}`}
              stroke={platform.color}
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              className="connection-line"
            />
          ))}
        </svg>
      </motion.div>

      {/* Platform nodes */}
      {platformLogos.map((platform, index) => (
        <motion.div
          key={index}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.7 + index * 0.1
          }}
          className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2"
          style={{ 
            left: `calc(55% + ${platform.position.x}px)`, 
            top: `calc(55% + ${platform.position.y}px)`,
            zIndex: 15
          }}
        >
          <div 
            className="w-full h-full rounded-full flex items-center justify-center neon-border animate-float"
            style={{ 
              backgroundColor: `${platform.color}`,
              borderColor: platform.color,
              animationDelay: `${index * 0.5}s`
            }}
          >
            <span className="text-sm font-medium text-white">{platform.name}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default IntegrationVisual;