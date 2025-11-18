'use client';

import { motion } from 'framer-motion';

export default function RootLoading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      <div className="relative">
        {/* Animated gradient circle loader */}
        <motion.div
          className="w-20 h-20 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, var(--primary-color), var(--secondary-color), var(--accent-color), var(--primary-color))`,
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Center circle to create ring effect */}
        <div
          className="absolute inset-2 rounded-full"
          style={{ backgroundColor: 'var(--background-color)' }}
        />

        {/* Pulsing dot in center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: 'var(--primary-color)' }}
          />
        </motion.div>
      </div>

      {/* Loading text */}
      <motion.p
        className="absolute mt-32 text-sm font-medium tracking-wider"
        style={{ color: 'var(--text-color)', opacity: 0.7 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        Loading...
      </motion.p>
    </div>
  );
}
