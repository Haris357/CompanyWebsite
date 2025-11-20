'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Project } from '@/types';

interface ProjectsSectionProps {
  title: string;
  subtitle: string;
  categories: string[];
  projects: Project[];
}

export default function ProjectsSection({
  title,
  subtitle,
  categories,
  projects,
}: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <motion.div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
        style={{ background: 'var(--secondary-color)' }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
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
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex mb-6"
          >
            <div className="glass px-5 py-2 rounded-full">
              <span className="text-sm font-semibold gradient-text">
                Our Work
              </span>
            </div>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all relative overflow-hidden ${
                selectedCategory === category ? 'text-white' : 'text-gray-400'
              }`}
              style={{
                background: selectedCategory === category
                  ? `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                  : 'rgba(255, 255, 255, 0.05)'
              }}
            >
              {selectedCategory === category && (
                <motion.div
                  layoutId="categoryBg"
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects - Full Row Cards */}
        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative modern-card overflow-hidden cursor-pointer">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative h-80 lg:h-96 overflow-hidden">
                    <Image
                      src={project.images[0] || '/placeholder.jpg'}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.8) 100%)'
                      }}
                    />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div
                        className="absolute top-6 left-6 px-4 py-2 rounded-full font-bold text-sm text-white"
                        style={{
                          background: `linear-gradient(135deg, var(--accent-color), var(--primary-color))`
                        }}
                      >
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Content Side */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    {/* Category */}
                    <div className="mb-4">
                      <span
                        className="px-4 py-2 rounded-full text-sm font-semibold"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--primary-color)'
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:gradient-text transition-all duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* View Project Button */}
                    {project.liveUrl && (
                      <div>
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-white group/link"
                          style={{
                            background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                          }}
                        >
                          <span>View Project</span>
                          <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </motion.a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative gradient on hover */}
                <div
                  className="absolute top-0 right-0 w-full h-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, transparent, var(--primary-color), transparent)`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="glass-dark p-12 rounded-3xl inline-block">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-400">No projects found in this category</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
