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
    <section ref={ref} className="py-32 relative overflow-hidden bg-black">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Gradient Orbs */}
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20"
        style={{ background: 'var(--primary-color)' }}
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
        style={{ background: 'var(--accent-color)' }}
        animate={{
          y: [0, -50, 0],
          x: [0, -30, 0],
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
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex mb-6"
          >
            <div className="glass px-5 py-2 rounded-full">
              <span className="text-sm font-semibold gradient-text">
                Our Services
              </span>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services?.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full modern-card p-8 cursor-pointer">
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg,
                        var(--primary-color),
                        var(--secondary-color),
                        var(--accent-color)
                      )`,
                      padding: '2px',
                    }}
                  />
                </div>

                {/* Inner content */}
                <div className="relative h-full flex flex-col">
                  {/* Icon with animated background */}
                  <motion.div
                    className="mb-6 relative inline-flex"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative">
                      {/* Glowing background */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50"
                        style={{
                          background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                        }}
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      />

                      {/* Icon container */}
                      <div
                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                        style={{
                          background: `linear-gradient(135deg,
                            color-mix(in srgb, var(--primary-color) 20%, transparent),
                            color-mix(in srgb, var(--secondary-color) 20%, transparent)
                          )`
                        }}
                      >
                        {service.icon}
                      </div>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                    {service.description}
                  </p>

                  {/* Features List */}
                  {service.features && service.features.length > 0 && (
                    <div className="space-y-3">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 0.3 + index * 0.1 + idx * 0.05 }}
                          className="flex items-start gap-3"
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{
                              background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                            }}
                          >
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-sm text-gray-300">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Hover Arrow */}
                  <motion.div
                    className="mt-6 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--primary-color)' }}
                  >
                    <span>Learn more</span>
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </motion.svg>
                  </motion.div>
                </div>

                {/* Decorative corner gradient */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-bl-full blur-2xl"
                  style={{
                    background: `linear-gradient(to bottom left, var(--accent-color), transparent)`
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
