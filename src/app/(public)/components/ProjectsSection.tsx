'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
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

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--primary-color) 10%, transparent) 0%, transparent 50%)`,
          backgroundSize: '100px 100px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: 'color-mix(in srgb, var(--secondary-color) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--secondary-color) 20%, transparent)',
              color: 'var(--secondary-color)'
            }}
            className="inline-block px-4 py-2 border rounded-full text-sm font-medium mb-4"
          >
            💼 Portfolio
          </motion.span>
          <h2 style={{ color: 'var(--text-color)' }} className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            {title}
          </h2>
          <p style={{ color: 'var(--text-color)', opacity: 0.7 }} className="text-xl max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              style={
                selectedCategory === category
                  ? {
                      background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
                      color: 'white'
                    }
                  : {
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: 'color-mix(in srgb, var(--text-color) 70%, transparent)',
                      borderColor: 'rgba(255, 255, 255, 0.1)'
                    }
              }
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory !== category ? 'border' : ''
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Portfolio Grid - Modern Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(255, 255, 255, 0.08)'
                }}
                className="relative backdrop-blur-sm border-2 rounded-3xl overflow-hidden transition-all duration-700 shadow-2xl hover:shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
              >
                {/* Large Image with Overlay */}
                <div className="relative h-80 lg:h-96 overflow-hidden">
                  <Image
                    src={project.images[0] || '/placeholder.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0" style={{
                    background: `linear-gradient(to top, var(--background-color) 0%, color-mix(in srgb, var(--background-color) 80%, transparent) 40%, transparent 70%)`
                  }} />

                  {/* Animated Border Gradient */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, transparent, color-mix(in srgb, var(--primary-color) 20%, transparent), transparent)`
                    }}
                  />

                  {/* Featured Badge */}
                  {project.featured && (
                    <motion.div
                      initial={{ scale: 0, rotate: -12 }}
                      animate={{ scale: 1, rotate: -12 }}
                      style={{
                        background: `linear-gradient(135deg, var(--accent-color), var(--primary-color))`,
                        color: 'white'
                      }}
                      className="absolute top-6 right-6 px-5 py-2.5 rounded-full text-sm font-bold shadow-2xl backdrop-blur-sm border border-white/20"
                    >
                      ⭐ Featured
                    </motion.div>
                  )}

                  {/* Category Badge */}
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--secondary-color) 90%, transparent)',
                      color: 'white',
                      borderColor: 'var(--secondary-color)'
                    }}
                    className="absolute top-6 left-6 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border-2 shadow-lg"
                  >
                    {project.category}
                  </motion.div>

                  {/* View Project Overlay - Shows on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    <motion.div
                      initial={{ scale: 0.8, y: 20 }}
                      whileHover={{ scale: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-4"
                    >
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
                          }}
                          className="px-8 py-3 rounded-xl text-white font-bold text-lg flex items-center gap-3 hover:scale-105 transition-transform shadow-2xl"
                        >
                          <span>View Live</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </a>
                      )}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Content Section - Bigger and Cleaner */}
                <div className="p-8 lg:p-10">
                  {/* Project Title */}
                  <h3
                    style={{ color: 'var(--text-color)' }}
                    className="text-3xl lg:text-4xl font-black mb-4 transition-all group-hover:translate-x-2 duration-300"
                  >
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p
                    style={{ color: 'var(--text-color)', opacity: 0.8 }}
                    className="text-base lg:text-lg mb-6 leading-relaxed line-clamp-3"
                  >
                    {project.description}
                  </p>

                  {/* Tags with Better Spacing */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: 'color-mix(in srgb, var(--text-color) 80%, transparent)',
                          borderColor: 'rgba(255, 255, 255, 0.15)'
                        }}
                        className="text-sm px-4 py-2 rounded-full border font-medium transition-all cursor-default"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-6 pt-6" style={{ borderTop: '2px solid rgba(255, 255, 255, 0.08)' }}>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--primary-color)' }}
                        className="flex items-center gap-2 text-base font-bold transition-all hover:gap-4 group/link"
                      >
                        <span>Live Demo</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'color-mix(in srgb, var(--text-color) 80%, transparent)' }}
                        className="flex items-center gap-2 text-base font-bold transition-all hover:gap-4"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>Source Code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Corner Accent */}
                <div
                  className="absolute top-0 right-0 w-32 h-32 opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at top right, var(--primary-color), transparent)`,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }} className="inline-block p-8 border rounded-3xl">
              <div className="text-6xl mb-4">🔍</div>
              <p style={{ color: 'var(--text-color)', opacity: 0.7 }} className="text-lg">No projects found in this category</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
