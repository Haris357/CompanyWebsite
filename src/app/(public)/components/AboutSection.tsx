'use client';

import { motion } from 'framer-motion';
import { AboutSection as AboutType } from '@/types';

interface AboutSectionProps {
  data: AboutType;
}

export default function AboutSection({ data }: AboutSectionProps) {
  // Generate random positions for global presence markers
  const markers = [
    { x: 15, y: 25 }, { x: 30, y: 35 }, { x: 45, y: 20 },
    { x: 60, y: 40 }, { x: 75, y: 30 }, { x: 85, y: 45 },
    { x: 20, y: 60 }, { x: 50, y: 55 }, { x: 80, y: 65 },
    { x: 35, y: 70 }, { x: 65, y: 75 }, { x: 40, y: 45 },
  ];

  return (
    <section className="py-24 relative overflow-hidden" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl" style={{
          background: `radial-gradient(circle, var(--primary-color), transparent)`
        }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl" style={{
          background: `radial-gradient(circle, var(--secondary-color), transparent)`
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--text-color)'
            }} className="px-5 py-2 backdrop-blur-sm border rounded-full text-sm font-semibold tracking-wide">
              ABOUT US
            </span>
          </motion.div>

          {/* Heading Placeholder */}
          <h2 style={{ color: 'var(--text-color)' }} className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
            {data.title}
          </h2>

          {/* Subtitle Placeholder */}
          <p style={{ color: 'var(--text-color)', opacity: 0.7 }} className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </motion.div>

        {/* World Map / Global Network Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-20"
        >
          {/* Main Visual Container */}
          <div
            className="relative w-full aspect-[2/1] rounded-3xl backdrop-blur-sm border-2 overflow-hidden shadow-2xl"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Abstract World Map Grid */}
            <div className="absolute inset-0">
              {/* Horizontal Lines */}
              {[20, 35, 50, 65, 80].map((y, i) => (
                <motion.div
                  key={`h-${i}`}
                  className="absolute w-full h-px"
                  style={{
                    top: `${y}%`,
                    backgroundColor: 'rgba(255, 255, 255, 0.06)'
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              ))}

              {/* Vertical Lines */}
              {[15, 30, 45, 60, 75, 90].map((x, i) => (
                <motion.div
                  key={`v-${i}`}
                  className="absolute h-full w-px"
                  style={{
                    left: `${x}%`,
                    backgroundColor: 'rgba(255, 255, 255, 0.06)'
                  }}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                />
              ))}

              {/* Abstract Continents/Regions */}
              <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 400">
                {/* Simplified continent shapes */}
                <motion.path
                  d="M100,150 Q150,120 200,140 T300,150 L320,180 Q300,200 250,190 L200,200 Q150,180 100,150Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: 'var(--primary-color)' }}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2 }}
                />
                <motion.path
                  d="M400,180 Q450,160 500,170 L550,190 Q520,220 480,210 L450,230 Q420,200 400,180Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: 'var(--secondary-color)' }}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.3 }}
                />
                <motion.path
                  d="M600,140 Q650,120 700,145 L720,170 Q700,190 650,180 L620,195 Q600,170 600,140Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ color: 'var(--accent-color)' }}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.6 }}
                />
              </svg>
            </div>

            {/* Glowing Dots/Markers for Global Presence */}
            {markers.map((marker, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
              >
                {/* Dot */}
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: i % 3 === 0 ? 'var(--primary-color)' : i % 3 === 1 ? 'var(--secondary-color)' : 'var(--accent-color)',
                      boxShadow: `0 0 20px ${i % 3 === 0 ? 'var(--primary-color)' : i % 3 === 1 ? 'var(--secondary-color)' : 'var(--accent-color)'}`
                    }}
                  />
                  {/* Pulse Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      border: `2px solid ${i % 3 === 0 ? 'var(--primary-color)' : i % 3 === 1 ? 'var(--secondary-color)' : 'var(--accent-color)'}`,
                    }}
                    animate={{
                      scale: [1, 2.5, 2.5],
                      opacity: [0.8, 0, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}

            {/* Connection Lines between markers */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {markers.slice(0, 6).map((marker, i) => {
                const nextMarker = markers[(i + 3) % markers.length];
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1={`${marker.x}%`}
                    y1={`${marker.y}%`}
                    x2={`${nextMarker.x}%`}
                    y2={`${nextMarker.y}%`}
                    stroke="url(#gradient)"
                    strokeWidth="1"
                    opacity="0.3"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 1.5 + i * 0.2 }}
                  />
                );
              })}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: 'var(--primary-color)', stopOpacity: 0.6 }} />
                  <stop offset="100%" style={{ stopColor: 'var(--secondary-color)', stopOpacity: 0.6 }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </motion.div>

        {/* Three Icon Cards Below Map */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.stats && data.stats.length > 0 ? (
            data.stats.slice(0, 3).map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(255, 255, 255, 0.08)'
                }}
                className="relative backdrop-blur-sm border-2 rounded-2xl p-8 text-center group transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                {/* Icon Placeholder */}
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
                  }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20" />
                </motion.div>

                {/* Value */}
                <div
                  style={{
                    background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  className="text-4xl font-black mb-3"
                >
                  {stat.value}
                </div>

                {/* Label */}
                <div style={{ color: 'var(--text-color)', opacity: 0.8 }} className="text-sm font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>

                {/* Hover Glow Effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at center, color-mix(in srgb, var(--primary-color) 15%, transparent), transparent 70%)`
                  }}
                />
              </motion.div>
            ))
          ) : (
            // Default cards if no stats
            [1, 2, 3].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(255, 255, 255, 0.08)'
                }}
                className="relative backdrop-blur-sm border-2 rounded-2xl p-8 text-center group transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                {/* Icon Placeholder */}
                <motion.div
                  className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`,
                  }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/20" />
                </motion.div>

                {/* Text Placeholder */}
                <div className="space-y-3">
                  <div className="h-3 w-3/4 mx-auto rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                  <div className="h-2 w-1/2 mx-auto rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
