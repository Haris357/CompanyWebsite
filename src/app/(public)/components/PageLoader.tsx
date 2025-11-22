'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
          style={{ background: 'var(--background-color)' }}
        >
          {/* Animated loader */}
          <div className="relative">
            {/* Outer ring */}
            <motion.div
              className="w-20 h-20 rounded-full border-4 border-transparent"
              style={{
                borderTopColor: 'var(--primary-color)',
                borderRightColor: 'var(--secondary-color)',
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Inner ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-4 border-transparent"
              style={{
                borderBottomColor: 'var(--primary-color)',
                borderLeftColor: 'var(--secondary-color)',
              }}
              animate={{ rotate: -360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Center dot */}
            <motion.div
              className="absolute inset-0 m-auto w-3 h-3 rounded-full"
              style={{ background: 'var(--primary-color)' }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.5, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Loading text */}
          <motion.div
            className="absolute mt-32 text-sm font-medium tracking-wider"
            style={{ color: 'var(--text-color)' }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Loading...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
