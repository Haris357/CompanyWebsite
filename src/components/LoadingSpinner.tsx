'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ backgroundColor: 'var(--background-color)' }}
    >
      <div className="relative w-32 h-32">
        {/* Outer ring - rotating clockwise */}
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: 'var(--primary-color)',
            borderRightColor: 'var(--primary-color)',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Middle ring - rotating counter-clockwise */}
        <motion.div
          className="absolute inset-3 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: 'var(--secondary-color)',
            borderLeftColor: 'var(--secondary-color)',
          }}
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Inner ring - rotating clockwise fast */}
        <motion.div
          className="absolute inset-6 rounded-full border-4 border-transparent"
          style={{
            borderTopColor: 'var(--accent-color)',
            borderBottomColor: 'var(--accent-color)',
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 0.75,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Center pulsing dot */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
        >
          <motion.div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: 'var(--accent-color)' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Orbiting particles */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: 'var(--primary-color)',
              top: '50%',
              left: '50%',
              marginLeft: '-4px',
              marginTop: '-4px',
            }}
            animate={{
              x: [
                0,
                Math.cos((i * Math.PI * 2) / 6) * 50,
              ],
              y: [
                0,
                Math.sin((i * Math.PI * 2) / 6) * 50,
              ],
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Loading text with animated gradient */}
      <motion.div
        className="mt-12 text-xl font-semibold"
        style={{
          background: `linear-gradient(to right, var(--primary-color), var(--secondary-color), var(--accent-color))`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          backgroundSize: '200% 100%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        Loading...
      </motion.div>

      {/* Animated dots */}
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--primary-color)' }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Expanding circles effect */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute rounded-full border-2"
          style={{
            borderColor: 'var(--secondary-color)',
            width: '100px',
            height: '100px',
          }}
          animate={{
            scale: [1, 3],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
