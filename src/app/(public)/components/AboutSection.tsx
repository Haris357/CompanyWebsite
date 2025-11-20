'use client';

import { motion, useInView } from 'framer-motion';
import { AboutSection as AboutType } from '@/types';
import { useRef } from 'react';
import Globe from './Globe';

interface AboutSectionProps {
  data: AboutType;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
        style={{ background: 'var(--secondary-color)' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex mb-6"
          >
            <div className="glass px-5 py-2 rounded-full">
              <span className="text-sm font-semibold gradient-text">
                About Us
              </span>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Stats Cards - Clean and Simple */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {data.stats && data.stats.length > 0 ? (
            data.stats.slice(0, 3).map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="modern-card p-10 text-center group cursor-pointer"
              >
                {/* Value - Large and Bold */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-6xl md:text-7xl font-bold gradient-text mb-4"
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <div className="text-lg font-semibold text-gray-300">
                  {stat.label}
                </div>

                {/* Subtle bottom border on hover */}
                <motion.div
                  className="mt-6 h-1 w-0 mx-auto rounded-full group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color))`
                  }}
                />
              </motion.div>
            ))
          ) : (
            // Default cards
            [
              { value: '500+', label: 'Projects Completed' },
              { value: '200+', label: 'Happy Clients' },
              { value: '50+', label: 'Countries Reached' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="modern-card p-10 text-center group cursor-pointer"
              >
                {/* Value - Large and Bold */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-6xl md:text-7xl font-bold gradient-text mb-4"
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <div className="text-lg font-semibold text-gray-300">
                  {stat.label}
                </div>

                {/* Subtle bottom border on hover */}
                <motion.div
                  className="mt-6 h-1 w-0 mx-auto rounded-full group-hover:w-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color))`
                  }}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* World Map Visualization */}
        {data.showGlobalMap !== false && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20"
          >
            <div className="relative modern-card p-8 lg:p-12 overflow-hidden">
              {/* Background gradient */}
              <div
                className="absolute inset-0 opacity-10 blur-3xl"
                style={{
                  background: `radial-gradient(circle at center, var(--primary-color), transparent 70%)`
                }}
              />

              {/* Map Container */}
              <div className="relative z-10">
                <div className="w-full h-[400px] lg:h-[500px]">
                  <Globe />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
