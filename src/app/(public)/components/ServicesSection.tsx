'use client';

import { motion } from 'framer-motion';
import { ServicesSection as ServicesType } from '@/types';

interface ServicesSectionProps {
  data: ServicesType;
}

export default function ServicesSection({ data }: ServicesSectionProps) {
  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
          style={{ backgroundColor: 'var(--primary-color)', opacity: 0.2 }}
          className="absolute top-20 -left-20 w-80 h-80 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
          }}
          style={{ backgroundColor: 'var(--secondary-color)', opacity: 0.2 }}
          className="absolute bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: 'rgba(var(--primary-color-rgb, 139, 92, 246), 0.1)',
              borderColor: 'rgba(var(--primary-color-rgb, 139, 92, 246), 0.2)',
              color: 'var(--primary-color)'
            }}
            className="inline-block px-4 py-2 border rounded-full text-sm font-medium mb-4"
          >
            💼 What We Offer
          </motion.span>
          <h2 style={{ color: 'var(--text-color)' }} className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            {data.title}
          </h2>
          <p style={{ color: 'var(--text-color)', opacity: 0.8 }} className="text-xl max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Services Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.services?.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
              className="group relative bg-gradient-to-br from-white/[0.07] to-white/[0.03] backdrop-blur-2xl border rounded-3xl p-8 hover:border-opacity-50 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl" style={{
                background: `linear-gradient(to bottom right,
                  color-mix(in srgb, var(--primary-color) 10%, transparent),
                  color-mix(in srgb, var(--secondary-color) 10%, transparent))`
              }} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl mb-6 inline-block"
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 style={{ color: 'var(--text-color)' }} className="text-2xl font-bold mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p style={{ color: 'var(--text-color)', opacity: 0.8 }} className="mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.05 }}
                        className="flex items-start text-sm"
                      >
                        <span style={{ color: 'var(--primary-color)' }} className="mr-2">✓</span>
                        <span style={{ color: 'var(--text-color)', opacity: 0.8 }}>{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: `linear-gradient(to bottom right, color-mix(in srgb, var(--primary-color) 20%, transparent), transparent)`
              }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
