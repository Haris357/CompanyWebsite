'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeroSection as HeroType } from '@/types';

interface HeroSectionProps {
  data: HeroType;
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Animated Gradient Orbs - using theme colors */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ backgroundColor: 'var(--primary-color)' }}
        className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ backgroundColor: 'var(--secondary-color)' }}
        className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ backgroundColor: 'var(--accent-color)' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: 'var(--text-color)' }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              {data.title.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ color: 'var(--text-color)', opacity: 0.9 }}
              className="text-xl md:text-2xl mb-10 leading-relaxed"
            >
              {data.subtitle}
            </motion.p>

            {data.ctaButtons.secondary && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link
                  href={data.ctaButtons.secondary.href}
                  style={{
                    color: 'var(--text-color)',
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }}
                  className="inline-flex items-center group px-8 py-4 bg-white/5 backdrop-blur-sm border font-semibold rounded-xl hover:bg-white/10 transition-all"
                >
                  {data.ctaButtons.secondary.label}
                  <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Right Side - Development Verse Globe */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative w-full h-[500px]"
            >
              {/* Main Rotating Globe Container */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-[400px] h-[400px]">
                  {/* Outer Gradient Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      borderColor: 'var(--primary-color)',
                      boxShadow: `0 0 30px color-mix(in srgb, var(--primary-color) 40%, transparent)`
                    }}
                    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />

                  {/* Middle Ring */}
                  <motion.div
                    className="absolute inset-8 rounded-full border-2"
                    style={{
                      borderColor: 'var(--secondary-color)',
                      boxShadow: `0 0 20px color-mix(in srgb, var(--secondary-color) 30%, transparent)`
                    }}
                    animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />

                  {/* Inner Core Sphere */}
                  <motion.div
                    className="absolute inset-16 rounded-full backdrop-blur-sm border-2"
                    style={{
                      background: `radial-gradient(circle, color-mix(in srgb, var(--accent-color) 20%, transparent), color-mix(in srgb, var(--primary-color) 10%, transparent))`,
                      borderColor: 'var(--accent-color)',
                      boxShadow: `0 0 40px color-mix(in srgb, var(--accent-color) 30%, transparent), inset 0 0 30px color-mix(in srgb, var(--primary-color) 20%, transparent)`
                    }}
                    animate={{
                      scale: [1, 1.05, 1],
                      boxShadow: [
                        `0 0 40px color-mix(in srgb, var(--accent-color) 30%, transparent)`,
                        `0 0 60px color-mix(in srgb, var(--accent-color) 50%, transparent)`,
                        `0 0 40px color-mix(in srgb, var(--accent-color) 30%, transparent)`
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Latitude Lines */}
                  {[30, 50, 70].map((inset, idx) => (
                    <motion.div
                      key={`lat-${idx}`}
                      className="absolute rounded-full border"
                      style={{
                        inset: `${inset}px`,
                        borderColor: 'rgba(255, 255, 255, 0.15)',
                        transform: 'rotateX(60deg)'
                      }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 4 + idx, repeat: Infinity, delay: idx * 0.5 }}
                    />
                  ))}

                  {/* Orbiting Data Nodes - Primary Color */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={`node-${i}`}
                      className="absolute w-4 h-4 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        marginLeft: '-8px',
                        marginTop: '-8px',
                        backgroundColor: 'var(--primary-color)',
                        boxShadow: `0 0 15px var(--primary-color)`
                      }}
                      animate={{
                        x: [
                          0,
                          Math.cos((i * Math.PI * 2) / 6) * 180,
                          0,
                          Math.cos(((i + 3) * Math.PI * 2) / 6) * 180,
                          0,
                        ],
                        y: [
                          0,
                          Math.sin((i * Math.PI * 2) / 6) * 180,
                          0,
                          Math.sin(((i + 3) * Math.PI * 2) / 6) * 180,
                          0,
                        ],
                        scale: [1, 1.3, 1, 1.3, 1],
                      }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        delay: i * 0.4,
                        ease: "easeInOut",
                      }}
                    />
                  ))}

                  {/* Tech Icons Orbiting - Secondary Layer */}
                  {['</>', 'AI', 'DB', 'API'].map((label, i) => (
                    <motion.div
                      key={`tech-${i}`}
                      className="absolute w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        top: '50%',
                        left: '50%',
                        marginLeft: '-16px',
                        marginTop: '-16px',
                        backgroundColor: 'color-mix(in srgb, var(--secondary-color) 80%, transparent)',
                        borderWidth: '2px',
                        borderColor: 'var(--secondary-color)',
                        color: 'white',
                        boxShadow: `0 0 20px color-mix(in srgb, var(--secondary-color) 50%, transparent)`
                      }}
                      animate={{
                        x: [
                          Math.cos((i * Math.PI * 2) / 4 + Math.PI/4) * 220,
                          Math.cos((i * Math.PI * 2) / 4 + Math.PI/4 + Math.PI) * 220,
                          Math.cos((i * Math.PI * 2) / 4 + Math.PI/4) * 220,
                        ],
                        y: [
                          Math.sin((i * Math.PI * 2) / 4 + Math.PI/4) * 220,
                          Math.sin((i * Math.PI * 2) / 4 + Math.PI/4 + Math.PI) * 220,
                          Math.sin((i * Math.PI * 2) / 4 + Math.PI/4) * 220,
                        ],
                        rotate: [0, 360, 720],
                      }}
                      transition={{
                        duration: 15,
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "linear",
                      }}
                    >
                      {label}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Counter-rotating Background Effect */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center opacity-30"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`bg-ring-${i}`}
                    className="absolute rounded-full border"
                    style={{
                      width: `${300 + i * 80}px`,
                      height: `${300 + i * 80}px`,
                      borderColor: i % 2 === 0 ? 'var(--accent-color)' : 'var(--primary-color)',
                      borderStyle: 'dashed',
                    }}
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 6 + i * 2,
                      repeat: Infinity,
                      delay: i * 0.5
                    }}
                  />
                ))}
              </motion.div>

              {/* Floating Code Particles */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`float-${i}`}
                  className="absolute text-xs font-mono opacity-40"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    color: i % 3 === 0 ? 'var(--primary-color)' : i % 3 === 1 ? 'var(--secondary-color)' : 'var(--accent-color)',
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.6, 0.2],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  {['{ }', '< >', '[ ]', '( )', '01', '10', '//'][i % 7]}
                </motion.div>
              ))}

              {/* Energy Beams */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={`beam-${i}`}
                  className="absolute w-0.5 h-20 origin-bottom"
                  style={{
                    left: '50%',
                    top: '50%',
                    background: `linear-gradient(to top, transparent, var(--accent-color))`,
                    transform: `rotate(${i * 90}deg)`,
                    transformOrigin: 'bottom center',
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scaleY: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ color: 'var(--text-color)', opacity: 0.5 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
