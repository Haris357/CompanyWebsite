'use client';

import { motion, useInView } from 'framer-motion';
import { ServicesSection as ServicesType } from '@/types';
import { useRef } from 'react';

interface ServicesSectionProps {
  data: ServicesType;
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: 'var(--background-color)' }}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-5" />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
        style={{ background: 'var(--primary-color)' }}
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-10"
        style={{ background: 'var(--secondary-color)' }}
        animate={{
          y: [0, -30, 0],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: 'var(--text-color)' }}
          >
            {data.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--text-color)', opacity: 0.8 }}
          >
            {data.subtitle}
          </motion.p>
        </motion.div>

        {/* Services - Full Width Rows with Dividers */}
        <div className="w-full">
          {data.services?.map((service, index) => (
            <div key={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative w-full"
              >
              {/* Card */}
              <div className="relative overflow-hidden cursor-pointer group/card">
                {/* Gradient background */}
                <div
                  className="absolute inset-0 opacity-5 group-hover/card:opacity-10 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, var(--primary-color), transparent 70%)`
                  }}
                />

                {/* Arrow icon - top right */}
                <motion.div
                  className="absolute top-8 right-8 opacity-30 group-hover/card:opacity-100 transition-all duration-300 text-white"
                  whileHover={{ scale: 1.1, x: 2, y: -2 }}
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 17L17 7M17 7H7M17 7V17"
                    />
                  </svg>
                </motion.div>

                {/* Content wrapper */}
                <div className="relative p-8 flex items-center gap-8">
                  {/* Left side - Icon */}
                  <div className="flex-shrink-0">
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 blur-2xl opacity-0 group-hover/card:opacity-60"
                        style={{
                          background: `radial-gradient(circle, var(--primary-color), transparent 70%)`
                        }}
                        animate={{
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />

                      {/* Icon container */}
                      <div
                        className="relative w-20 h-20 flex items-center justify-center text-4xl backdrop-blur-sm transition-all duration-300 group-hover/card:scale-110"
                        style={{
                          background: `linear-gradient(135deg,
                            color-mix(in srgb, var(--primary-color) 15%, transparent),
                            color-mix(in srgb, var(--secondary-color) 15%, transparent)
                          )`,
                        }}
                      >
                        {service.icon}
                      </div>

                      {/* Decorative corner accent */}
                      <div
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                        style={{ background: 'var(--primary-color)' }}
                      />
                    </motion.div>
                  </div>

                  {/* Right side - Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title with gradient on hover */}
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-3 transition-all duration-300"
                      style={{
                        color: 'var(--text-color)',
                      }}
                    >
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-base md:text-lg leading-relaxed mb-4"
                      style={{
                        color: 'var(--text-color)',
                        opacity: 0.8,
                      }}
                    >
                      {service.description}
                    </p>

                    {/* Features tags if available */}
                    {service.features && service.features.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.4 + index * 0.1 + idx * 0.05 }}
                            className="px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm"
                            style={{
                              background: 'rgba(255, 255, 255, 0.05)',
                              borderColor: 'rgba(255, 255, 255, 0.1)',
                              color: 'var(--text-color)',
                            }}
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Arrow indicator */}
                  <motion.div
                    className="flex-shrink-0 opacity-0 group-hover/card:opacity-100 transition-all duration-300"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--primary-color)' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </motion.div>
                </div>

                {/* Decorative corner gradient */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-2xl"
                  style={{
                    background: `linear-gradient(to bottom left, var(--primary-color), transparent)`
                  }}
                />
              </div>

              {/* Floating particles on hover */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: i % 2 === 0 ? 'var(--primary-color)' : 'var(--secondary-color)',
                    top: `${20 + i * 30}%`,
                    right: `${10 + i * 5}%`,
                  }}
                  animate={{
                    y: [-20, -40, -20],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* Divider - only show if not last item */}
            {index < (data.services?.length || 0) - 1 && (
              <div className="relative py-0">
                <div
                  className="h-px w-full"
                  style={{
                    background: `linear-gradient(90deg, transparent, var(--primary-color) 50%, transparent)`,
                    opacity: 0.2,
                  }}
                />
              </div>
            )}
          </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-6">Need something custom?</p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 glass px-8 py-4 rounded-2xl font-semibold text-white group"
          >
            <span>Let's talk about your project</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
