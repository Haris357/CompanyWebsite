import { Timestamp } from 'firebase/firestore';

// ==================== COMPANY INFORMATION ====================
export interface CompanyInfo {
  id: string;
  name: string;
  logo: string; // Cloudinary URL
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
  };
  updatedAt: Timestamp;
}

// ==================== THEME/STYLING ====================
export interface ThemeSettings {
  id: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  updatedAt: Timestamp;
}

// ==================== NAVIGATION ====================
export interface NavigationLink {
  id: string;
  label: string;
  href: string;
  order: number;
  isExternal: boolean;
  openInNewTab: boolean;
}

export interface NavigationSettings {
  id: string;
  logo: string; // Cloudinary URL
  links: NavigationLink[];
  ctaButton?: {
    label: string;
    href: string;
    style: 'primary' | 'secondary' | 'outline';
  };
  updatedAt: Timestamp;
}

// ==================== HERO SECTION ====================
export interface HeroSection {
  id: string;
  title: string;
  subtitle: string;
  backgroundType: 'image' | 'gradient' | 'video' | 'animated';
  backgroundImage?: string; // Cloudinary URL
  backgroundVideo?: string; // Cloudinary URL
  gradientFrom?: string;
  gradientTo?: string;
  ctaButtons: {
    primary?: {
      label: string;
      href: string;
    };
    secondary?: {
      label: string;
      href: string;
    };
  };
  updatedAt: Timestamp;
}

// ==================== SERVICES ====================
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon name or Cloudinary URL
  order: number;
  features?: string[];
}

export interface ServicesSection {
  id: string;
  title: string;
  subtitle: string;
  services: Service[];
  updatedAt: Timestamp;
}

// ==================== PROJECTS/PORTFOLIO ====================
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  images: string[]; // Cloudinary URLs
  category: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  order: number;
  featured: boolean;
  createdAt: Timestamp;
}

export interface ProjectsSection {
  id: string;
  title: string;
  subtitle: string;
  categories: string[];
  updatedAt: Timestamp;
}

// ==================== TESTIMONIALS ====================
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  quote: string;
  avatar: string; // Cloudinary URL
  rating: number; // 1-5
  order: number;
}

export interface TestimonialsSection {
  id: string;
  title: string;
  subtitle: string;
  testimonials: Testimonial[];
  updatedAt: Timestamp;
}

// ==================== FOOTER ====================
export interface FooterSection {
  id: string;
  companyDescription: string;
  columns: {
    id: string;
    title: string;
    links: {
      label: string;
      href: string;
    }[];
  }[];
  copyrightText: string;
  updatedAt: Timestamp;
}

// ==================== CONTACT SECTION ====================
export interface ContactSection {
  id: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  address: string;
  mapEmbedUrl?: string;
  showContactForm: boolean;
  updatedAt: Timestamp;
}

// ==================== SOCIAL MEDIA POSTS ====================
export interface SocialMediaPost {
  id: string;
  platform: 'twitter' | 'x' | 'linkedin' | 'facebook';
  postUrl: string;
  order: number;
  isActive: boolean;
}

export interface SocialMediaSection {
  id: string;
  title: string;
  subtitle: string;
  posts: SocialMediaPost[];
  updatedAt: Timestamp;
}

// ==================== ABOUT SECTION ====================
export interface AboutSection {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string; // Cloudinary URL
  stats?: {
    label: string;
    value: string;
  }[];
  showGlobalMap?: boolean; // Toggle to show/hide the world map
  updatedAt: Timestamp;
}

// ==================== TEAM MEMBERS ====================
export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  avatar: string; // Cloudinary URL
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  order: number;
}

export interface TeamSection {
  id: string;
  title: string;
  subtitle: string;
  members: TeamMember[];
  updatedAt: Timestamp;
}

// ==================== FAQ ====================
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface FAQSection {
  id: string;
  title: string;
  subtitle: string;
  faqs: FAQ[];
  updatedAt: Timestamp;
}

// ==================== SEO SETTINGS ====================
export interface SEOSettings {
  id: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  ogImage: string; // Cloudinary URL
  favicon: string; // Cloudinary URL
  updatedAt: Timestamp;
}

// ==================== PRIVACY POLICY ====================
export interface PrivacyPolicySection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface PrivacyPolicy {
  id: string;
  title: string;
  lastUpdated: Timestamp;
  effectiveDate: Timestamp;
  sections: PrivacyPolicySection[];
  companyEmail: string;
  updatedAt: Timestamp;
}

// ==================== UTILITY TYPES ====================
export type SectionType =
  | 'hero'
  | 'about'
  | 'services'
  | 'projects'
  | 'testimonials'
  | 'team'
  | 'faq'
  | 'contact';

export interface SectionVisibility {
  id: string;
  [key: string]: boolean | string; // section name as key, boolean as value
}

// ==================== FIRESTORE COLLECTIONS ====================
export const COLLECTIONS = {
  COMPANY_INFO: 'companyInfo',
  THEME_SETTINGS: 'themeSettings',
  NAVIGATION: 'navigation',
  HERO: 'hero',
  SERVICES: 'services',
  PROJECTS: 'projects',
  PROJECT_SECTION: 'projectSection',
  TESTIMONIALS: 'testimonials',
  FOOTER: 'footer',
  CONTACT: 'contact',
  ABOUT: 'about',
  TEAM: 'team',
  FAQ: 'faq',
  SEO: 'seo',
  PRIVACY_POLICY: 'privacyPolicy',
  SOCIAL_MEDIA: 'socialMedia',
  SECTION_VISIBILITY: 'sectionVisibility',
  USERS: 'users',
} as const;

// ==================== FORM TYPES ====================
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
}
