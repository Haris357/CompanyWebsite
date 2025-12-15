/**
 * Site-wide configuration
 * This file contains default values and constants used throughout the application
 */

export const siteConfig = {
  name: 'Kubixx.Tech',
  description: 'A fully customizable company showcase website',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',

  // Default theme colors (can be overridden by Firebase settings)
  defaultTheme: {
    primaryColor: '#3b82f6', // blue-500
    secondaryColor: '#8b5cf6', // violet-500
    accentColor: '#f59e0b', // amber-500
    backgroundColor: '#ffffff',
    textColor: '#1f2937', // gray-800
  },

  // Social media platforms
  socialPlatforms: [
    { name: 'Facebook', icon: 'facebook', key: 'facebook' },
    { name: 'Twitter', icon: 'twitter', key: 'twitter' },
    { name: 'Instagram', icon: 'instagram', key: 'instagram' },
    { name: 'LinkedIn', icon: 'linkedin', key: 'linkedin' },
    { name: 'YouTube', icon: 'youtube', key: 'youtube' },
    { name: 'GitHub', icon: 'github', key: 'github' },
  ] as const,

  // Default section visibility
  defaultSections: {
    hero: true,
    about: true,
    services: true,
    projects: true,
    testimonials: true,
    team: false,
    faq: false,
    contact: true,
  },

  // Admin configuration
  admin: {
    maxUploadSize: 10 * 1024 * 1024, // 10MB for images
    maxVideoSize: 100 * 1024 * 1024, // 100MB for videos
    allowedImageFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
    allowedVideoFormats: ['video/mp4', 'video/webm', 'video/ogg'],
  },

  // Pagination
  pagination: {
    projectsPerPage: 9,
    testimonialsPerPage: 6,
    teamMembersPerPage: 8,
    faqsPerPage: 10,
  },

  // Animation defaults (for Framer Motion)
  animation: {
    duration: 0.5,
    ease: 'easeInOut',
    staggerChildren: 0.1,
  },

  // Contact form configuration
  contactForm: {
    maxMessageLength: 1000,
    requiredFields: ['name', 'email', 'message'],
  },

  // SEO defaults
  seo: {
    defaultTitle: 'Kubixx Tech',
    defaultDescription: 'A fully customizable company showcase website',
    titleTemplate: '%s | Company Website',
    twitterHandle: '@company',
  },
} as const;

export type SiteConfig = typeof siteConfig;
