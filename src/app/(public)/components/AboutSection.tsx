'use client';

import { motion, useInView } from 'framer-motion';
import { AboutSection as AboutType } from '@/types';
import { useRef } from 'react';
import Image from 'next/image';

interface AboutSectionProps {
  data: AboutType;
}

// Default stats if none provided
const defaultStats = [
  { value: '10+', label: 'Years Experience' },
  { value: '500+', label: 'Projects Completed' },
  { value: '200+', label: 'Happy Clients' },
  { value: '30+', label: 'Countries Served' }
];

// Default features if none provided
const defaultFeatures = [
  {
    icon: '🎯',
    title: 'Strategic Planning',
    description: 'Data-driven strategies that align with your business goals and drive measurable results.'
  },
  {
    icon: '⚡',
    title: 'Rapid Execution',
    description: 'Agile methodology ensures quick delivery without compromising on quality or innovation.'
  },
  {
    icon: '🔒',
    title: 'Secure Solutions',
    description: 'Enterprise-grade security and compliance built into every solution we deliver.'
  },
  {
    icon: '💡',
    title: 'Innovation Driven',
    description: 'Cutting-edge technologies and creative approaches to solve complex challenges.'
  }
];

export default function AboutSection({ data }: AboutSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Use data from admin panel, fallback to defaults
  const title = data.title || 'Pioneering Digital Excellence';
  const subtitle = data.subtitle || 'Transforming ideas into innovative digital solutions that drive success';
  const content = data.content || 'We are a team of passionate professionals dedicated to delivering cutting-edge digital solutions. With years of experience and a commitment to excellence, we help businesses transform their ideas into reality through innovative technology and creative problem-solving.';
  const image = data.image || '';
  const featuresTitle = data.featuresTitle || 'Why Choose Us';
  const featuresSubtitle = data.featuresSubtitle || 'We combine expertise, innovation, and dedication to deliver exceptional results';
  const stats = data.stats && data.stats.length > 0 ? data.stats : defaultStats;
  const features = data.features && data.features.length > 0 ? data.features : defaultFeatures;

  return (
    <section ref={ref} className="py-20 relative overflow-hidden" style={{ background: 'var(--background-color)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 grid-bg opacity-5" />
      <motion.div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20"
        style={{ background: 'var(--primary-color)' }}
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-[120px] opacity-20"
        style={{ background: 'var(--secondary-color)' }}
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight max-w-4xl mx-auto"
            style={{ color: 'var(--text-color)' }}
          >
            {title}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-color)' }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Main Content Grid - Image + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
              {image ? (
                <>
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(135deg, var(--primary-color), transparent)`
                    }}
                  />
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl glass">
                  🏢
                </div>
              )}
            </div>

            {/* Floating stats decoration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{ color: 'var(--text-color)' }}
              className="absolute -bottom-6 -right-6 p-6 rounded-2xl glass-dark hidden lg:block"
            >
              <div className="text-center">
                <div
                  className="text-4xl font-bold mb-1"
                  style={{ color: 'var(--text-color)' }}
                >
                  {stats[0]?.value || '10+'}
                </div>
                <div className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>
                  {stats[0]?.label || 'Years Experience'}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="leading-relaxed text-base md:text-lg" style={{ color: 'var(--text-color)' }}>
                {content}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-8">
              {stats.slice(1, 4).map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="relative group"
                  style={{ color: 'var(--text-color)' }}
                >
                  <div className="glass p-6 rounded-2xl transition-all duration-300">
                    <div
                      className="text-3xl md:text-4xl font-bold mb-2"
                      style={{ color: 'var(--text-color)' }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium" style={{ color: 'var(--text-color)' }}>
                      {stat.label}
                    </div>

                    {/* Hover effect line */}
                    <div
                      className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                      style={{ background: 'var(--primary-color)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Feature Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: 'var(--text-color)' }}
            >
              {featuresTitle}
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="max-w-2xl mx-auto"
              style={{ color: 'var(--text-color)' }}
            >
              {featuresSubtitle}
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="glass relative p-6 rounded-2xl h-full transition-all duration-300 hover:shadow-2xl">
                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at top, var(--primary-color), transparent 70%)`
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon Container */}
                    <div className="mb-4">
                      <div className="glass w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                        {feature.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ color: 'var(--text-color)' }}
                    >
                      {feature.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-color)' }}>
                      {feature.description}
                    </p>

                    {/* Bottom accent indicator */}
                    <div
                      className="mt-4 h-0.5 w-0 rounded-full group-hover:w-12 transition-all duration-500"
                      style={{ background: 'var(--primary-color)' }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
