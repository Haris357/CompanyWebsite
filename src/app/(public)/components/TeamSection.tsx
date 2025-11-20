'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { TeamSection as TeamType } from '@/types';
import { useRef } from 'react';

interface TeamSectionProps {
  data: TeamType;
}

export default function TeamSection({ data }: TeamSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 relative overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <motion.div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
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
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-flex mb-6"
          >
            <div className="glass px-5 py-2 rounded-full">
              <span className="text-sm font-semibold gradient-text">
                Our Team
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

        {/* Team Avatars - Small circles with hover names */}
        <div className="flex flex-wrap justify-center items-center gap-8">
          {data.members?.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative"
            >
              {/* Avatar Circle */}
              <motion.div
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="relative cursor-pointer"
              >
                {/* Avatar Image */}
                <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-white/10 group-hover:ring-white/30 transition-all">
                  <Image
                    src={member.avatar || '/placeholder-avatar.jpg'}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  {/* Gradient overlay on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                    }}
                  />
                </div>

                {/* Animated ring */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    border: '3px solid',
                    borderColor: 'var(--primary-color)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />

                {/* Hover Card */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  whileHover={{ opacity: 1, y: 0, scale: 1 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-20"
                >
                  <div className="glass-dark p-4 rounded-2xl min-w-[200px] text-center">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-semibold mb-2" style={{ color: 'var(--primary-color)' }}>
                      {member.position}
                    </p>
                    {member.bio && (
                      <p className="text-xs text-gray-400 mb-3 line-clamp-2">
                        {member.bio}
                      </p>
                    )}

                    {/* Social Links */}
                    {(member.socialMedia.linkedin || member.socialMedia.twitter || member.socialMedia.github) && (
                      <div className="flex items-center justify-center gap-2">
                        {member.socialMedia.linkedin && (
                          <a
                            href={member.socialMedia.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white transition-colors pointer-events-auto"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                          </a>
                        )}
                        {member.socialMedia.twitter && (
                          <a
                            href={member.socialMedia.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white transition-colors pointer-events-auto"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                          </a>
                        )}
                        {member.socialMedia.github && (
                          <a
                            href={member.socialMedia.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white transition-colors pointer-events-auto"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}

                    {/* Arrow pointing to avatar */}
                    <div
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-3 h-3 rotate-45"
                      style={{
                        background: 'rgba(0, 0, 0, 0.3)',
                        backdropFilter: 'blur(20px)',
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
