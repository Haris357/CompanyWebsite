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

  // Get first 4 projects for the grid
  const displayProjects = filteredProjects.slice(0, 4);

  return (
    <section ref={ref} className="py-20 relative overflow-hidden" style={{ background: 'var(--background-color)' }}>
      {/* Background Elements */}
      <div className="absolute inset-0 grid-bg opacity-5" />
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20"
        style={{ background: 'var(--primary-color)' }}
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
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: 'var(--text-color)' }}
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto"
            style={{ color: 'var(--text-color)' }}
          >
            {subtitle}
          </motion.p>
        </motion.div>

        {/* Projects Grid - 2x2 Staggered Layout */}
        {displayProjects.length > 0 && (
          <div className="space-y-4 max-w-6xl mx-auto">
            {/* First Row - Left 60%, Right 40% */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-6 group relative overflow-hidden rounded-3xl cursor-pointer"
                style={{ height: '500px' }}
              >
                <div className="glass h-full relative overflow-hidden">
                  {displayProjects[0] && (
                    <>
                      <Image
                        src={displayProjects[0].images[0] || '/placeholder.jpg'}
                        alt={displayProjects[0].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/40" />
                      {/* Project name */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {displayProjects[0].title}
                        </h3>
                        <p className="text-sm text-white/80 mt-2">
                          {displayProjects[0].category}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="lg:col-span-4 group relative overflow-hidden rounded-3xl cursor-pointer"
                style={{ height: '500px' }}
              >
                <div className="glass h-full relative overflow-hidden">
                  {displayProjects[1] && (
                    <>
                      <Image
                        src={displayProjects[1].images[0] || '/placeholder.jpg'}
                        alt={displayProjects[1].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/40" />
                      {/* Project name */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {displayProjects[1].title}
                        </h3>
                        <p className="text-sm text-white/80 mt-2">
                          {displayProjects[1].category}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Second Row - Left 40%, Right 60% */}
            <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="lg:col-span-4 group relative overflow-hidden rounded-3xl cursor-pointer"
                style={{ height: '500px' }}
              >
                <div className="glass h-full relative overflow-hidden">
                  {displayProjects[2] && (
                    <>
                      <Image
                        src={displayProjects[2].images[0] || '/placeholder.jpg'}
                        alt={displayProjects[2].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/40" />
                      {/* Project name */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {displayProjects[2].title}
                        </h3>
                        <p className="text-sm text-white/80 mt-2">
                          {displayProjects[2].category}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="lg:col-span-6 group relative overflow-hidden rounded-3xl cursor-pointer"
                style={{ height: '500px' }}
              >
                <div className="glass h-full relative overflow-hidden">
                  {displayProjects[3] && (
                    <>
                      <Image
                        src={displayProjects[3].images[0] || '/placeholder.jpg'}
                        alt={displayProjects[3].title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/40" />
                      {/* Project name */}
                      <div className="absolute bottom-0 left-0 right-0 p-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                          {displayProjects[3].title}
                        </h3>
                        <p className="text-sm text-white/80 mt-2">
                          {displayProjects[3].category}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="glass p-12 rounded-3xl inline-block">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl" style={{ color: 'var(--text-color)' }}>
                No projects found in this category
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
