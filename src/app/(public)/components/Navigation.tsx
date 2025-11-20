'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { NavigationSettings, CompanyInfo } from '@/types';

interface NavigationProps {
  data: NavigationSettings;
  companyInfo: CompanyInfo;
}

export default function Navigation({ data, companyInfo }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'about', 'services', 'projects', 'team', 'testimonials', 'faq', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transform links: convert hashtag links to proper routes
  const transformLink = (href: string) => {
    if (href.startsWith('#')) {
      return href.replace('#', '/');
    }
    return href;
  };

  const sortedLinks = [...(data.links || [])].sort((a, b) => a.order - b.order);

  return (
    <>
      {/* Modern Glass Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative transition-all duration-500 rounded-2xl ${
              scrolled ? 'glass shadow-2xl' : 'glass-dark'
            }`}
            style={{
              boxShadow: scrolled ? '0 8px 32px rgba(139, 92, 246, 0.15)' : 'none'
            }}
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(90deg,
                    var(--primary-color),
                    var(--secondary-color),
                    var(--accent-color),
                    var(--primary-color)
                  )`,
                  backgroundSize: '300% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '100% 0%', '0% 0%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div
                className="absolute inset-[1px] rounded-2xl"
                style={{
                  background: scrolled
                    ? 'rgba(0, 0, 0, 0.85)'
                    : 'rgba(0, 0, 0, 0.6)'
                }}
              />
            </div>

            {/* Content */}
            <div className="relative grid grid-cols-3 items-center px-6 h-16 md:h-18 gap-4">
              {/* Logo */}
              <div className="flex justify-start">
                <Link href="/" className="flex items-center gap-3 group">
                  {companyInfo.logo ? (
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative h-10 w-10 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={companyInfo.logo}
                        alt={companyInfo.name}
                        fill
                        className="object-contain"
                        priority
                        sizes="40px"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      className="h-10 w-10 rounded-xl flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                      }}
                    >
                      <span className="font-bold text-xl text-white z-10">
                        {companyInfo.name.charAt(0)}
                      </span>
                      <motion.div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(135deg, var(--accent-color), var(--primary-color))`
                        }}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  )}
                  <span className="text-xl font-bold hidden lg:inline gradient-text">
                    {companyInfo.name}
                  </span>
                </Link>
              </div>

              {/* Centered Navigation Links */}
              <div className="hidden md:flex items-center justify-center gap-1">
                {sortedLinks.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '').replace('/', '');
                  return (
                    <Link
                      key={link.id}
                      href={transformLink(link.href)}
                      target={link.openInNewTab ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="relative px-4 py-2 rounded-lg font-medium text-sm transition-all group"
                    >
                      <span
                        className={`relative z-10 transition-colors ${
                          isActive ? 'text-white' : 'text-gray-300'
                        } group-hover:text-white`}
                      >
                        {link.label}
                      </span>

                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeSection"
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                          }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}

                      {/* Hover effect */}
                      <motion.div
                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)'
                        }}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="flex justify-end items-center gap-3">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-white relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, var(--secondary-color), var(--accent-color))`
                    }}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="relative z-10">Get Started</span>
                </motion.a>

                {/* Mobile Menu Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden p-2 rounded-xl text-white relative overflow-hidden"
                  style={{
                    background: isOpen
                      ? `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                      : 'rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {isOpen ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    )}
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-80 glass z-50 md:hidden overflow-y-auto"
              style={{
                borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <div className="p-6 space-y-6">
                {/* Close Button */}
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold gradient-text">Menu</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-xl text-white"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Links */}
                <div className="space-y-2">
                  {sortedLinks.map((link, index) => (
                    <motion.div
                      key={link.id}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={transformLink(link.href)}
                        target={link.openInNewTab ? '_blank' : undefined}
                        rel={link.isExternal ? 'noopener noreferrer' : undefined}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-xl font-medium text-white transition-all group relative overflow-hidden"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          style={{
                            background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                          }}
                          initial={{ x: '-100%' }}
                          whileHover={{ x: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.a
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: sortedLinks.length * 0.05 }}
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-white relative overflow-hidden group"
                  style={{
                    background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                  }}
                >
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, var(--secondary-color), var(--accent-color))`
                    }}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="relative z-10">Get Started</span>
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
