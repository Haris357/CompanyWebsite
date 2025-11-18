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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transform links: convert hashtag links to proper routes
  const transformLink = (href: string) => {
    // If link starts with #, convert to route (e.g., #about -> /about)
    if (href.startsWith('#')) {
      return href.replace('#', '/');
    }
    return href;
  };

  const sortedLinks = [...(data.links || [])].sort((a, b) => a.order - b.order);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={
        scrolled
          ? {
              backgroundColor: 'color-mix(in srgb, var(--background-color) 80%, transparent)',
              borderBottomColor: 'rgba(255, 255, 255, 0.1)'
            }
          : {
              backgroundColor: 'color-mix(in srgb, var(--background-color) 50%, transparent)',
              borderBottomColor: 'rgba(255, 255, 255, 0.05)'
            }
      }
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl border-b shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-Column Grid Layout */}
        <div className="grid grid-cols-3 items-center h-16 md:h-20 gap-4">
          {/* Column 1: Logo */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-3">
              {companyInfo.logo ? (
                <div className="relative h-10 w-10">
                  <Image
                    src={companyInfo.logo}
                    alt={companyInfo.name}
                    fill
                    className="object-contain"
                    priority
                    sizes="40px"
                  />
                </div>
              ) : (
                <div style={{
                  background: `linear-gradient(to bottom right, var(--primary-color), var(--secondary-color))`
                }} className="h-10 w-10 rounded-lg flex items-center justify-center">
                  <span style={{ color: 'white' }} className="font-bold text-xl">
                    {companyInfo.name.charAt(0)}
                  </span>
                </div>
              )}
              <span style={{ color: 'var(--text-color)' }} className="text-xl font-bold hidden lg:inline">
                {companyInfo.name}
              </span>
            </Link>
          </div>

          {/* Column 2: Centered Navigation Links */}
          <div className="hidden md:flex items-center justify-center space-x-6 lg:space-x-8">
            {sortedLinks.map((link) => (
              <Link
                key={link.id}
                href={transformLink(link.href)}
                target={link.openInNewTab ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                style={{ color: 'color-mix(in srgb, var(--text-color) 90%, transparent)' }}
                className="font-semibold text-sm lg:text-base transition-colors relative group"
              >
                {link.label}
                <span style={{
                  background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`
                }} className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Column 3: Book a Call Button */}
          <div className="flex justify-end items-center gap-3">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
              }}
              className="hidden md:inline-flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 rounded-xl text-white font-bold text-sm lg:text-base shadow-lg hover:shadow-xl transition-all"
            >
              <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Book a Call</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ color: 'color-mix(in srgb, var(--text-color) 90%, transparent)' }}
              className="md:hidden p-2 rounded-lg transition-colors"
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: 'color-mix(in srgb, var(--background-color) 95%, transparent)',
              borderTopColor: 'rgba(255, 255, 255, 0.1)'
            }}
            className="md:hidden backdrop-blur-xl border-t overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {sortedLinks.map((link) => (
                <Link
                  key={link.id}
                  href={transformLink(link.href)}
                  target={link.openInNewTab ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  onClick={() => setIsOpen(false)}
                  style={{ color: 'color-mix(in srgb, var(--text-color) 90%, transparent)' }}
                  className="block px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}

              {/* Book a Call Button for Mobile */}
              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-white font-bold text-base shadow-lg mt-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Book a Call</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
