import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyCRQ1HoJZ7XgK3aVLZuUp2SL2m_MUnk_0k',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'companywebsite-bc68b.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'companywebsite-bc68b',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'companywebsite-bc68b.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '788830664695',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:788830664695:web:fec4c0b8b4412dc024e0f2',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-T2NV50P6BB',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Admin User UID
const ADMIN_UID = 'nXBCrzTBukUMirfaVbFFsWS2iAM2';

async function initializeFirestore() {
  try {
    console.log('🚀 Starting Firestore initialization...\n');

    // 1. Create Admin User
    console.log('👤 Creating admin user...');
    await setDoc(doc(db, 'users', ADMIN_UID), {
      uid: ADMIN_UID,
      email: 'admin@example.com', // Update this to your actual email
      displayName: 'Admin User',
      role: 'admin',
      emailVerified: true,
      photoURL: null,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
    });
    console.log('✅ Admin user created\n');

    // 2. Company Info
    console.log('🏢 Creating company information...');
    await setDoc(doc(db, 'companyInfo', 'main'), {
      name: 'Your Company Name',
      logo: '',
      tagline: 'Building the future, one solution at a time',
      description: 'We are a leading company providing innovative solutions to help businesses grow and succeed in the digital age.',
      email: 'contact@yourcompany.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, Suite 100, City, State 12345',
      socialMedia: {
        facebook: 'https://facebook.com/yourcompany',
        twitter: 'https://twitter.com/yourcompany',
        instagram: 'https://instagram.com/yourcompany',
        linkedin: 'https://linkedin.com/company/yourcompany',
        youtube: '',
        github: '',
      },
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Company information created\n');

    // 3. Theme Settings
    console.log('🎨 Creating theme settings...');
    await setDoc(doc(db, 'themeSettings', 'main'), {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      accentColor: '#f59e0b',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      headingFont: 'Geist',
      bodyFont: 'Geist',
      borderRadius: 'md',
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Theme settings created\n');

    // 4. Navigation
    console.log('🧭 Creating navigation...');
    await setDoc(doc(db, 'navigation', 'main'), {
      logo: '',
      links: [
        {
          id: 'home',
          label: 'Home',
          href: '/',
          order: 0,
          isExternal: false,
          openInNewTab: false,
        },
        {
          id: 'about',
          label: 'About',
          href: '#about',
          order: 1,
          isExternal: false,
          openInNewTab: false,
        },
        {
          id: 'services',
          label: 'Services',
          href: '#services',
          order: 2,
          isExternal: false,
          openInNewTab: false,
        },
        {
          id: 'projects',
          label: 'Projects',
          href: '#projects',
          order: 3,
          isExternal: false,
          openInNewTab: false,
        },
        {
          id: 'contact',
          label: 'Contact',
          href: '#contact',
          order: 4,
          isExternal: false,
          openInNewTab: false,
        },
      ],
      ctaButton: {
        label: 'Get Started',
        href: '#contact',
        style: 'primary',
      },
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Navigation created\n');

    // 5. Hero Section
    console.log('🎭 Creating hero section...');
    await setDoc(doc(db, 'hero', 'main'), {
      title: 'Welcome to Your Company',
      subtitle: 'We provide innovative solutions to help your business grow and succeed',
      backgroundType: 'gradient',
      backgroundImage: '',
      backgroundVideo: '',
      gradientFrom: '#3b82f6',
      gradientTo: '#8b5cf6',
      ctaButtons: {
        primary: {
          label: 'Get Started',
          href: '#contact',
        },
        secondary: {
          label: 'Learn More',
          href: '#about',
        },
      },
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Hero section created\n');

    // 6. Services
    console.log('💼 Creating services...');
    await setDoc(doc(db, 'services', 'main'), {
      title: 'Our Services',
      subtitle: 'Comprehensive solutions tailored to your business needs',
      services: [
        {
          id: 'service-1',
          title: 'Web Development',
          description: 'Custom web applications built with modern technologies',
          icon: 'code',
          order: 0,
          features: [
            'Responsive Design',
            'Modern Frameworks',
            'SEO Optimized',
            'Fast Performance',
          ],
        },
        {
          id: 'service-2',
          title: 'Mobile Development',
          description: 'Native and cross-platform mobile applications',
          icon: 'mobile',
          order: 1,
          features: [
            'iOS & Android',
            'Cross-platform',
            'Push Notifications',
            'Offline Support',
          ],
        },
        {
          id: 'service-3',
          title: 'UI/UX Design',
          description: 'Beautiful and intuitive user interfaces',
          icon: 'design',
          order: 2,
          features: [
            'User Research',
            'Wireframing',
            'Prototyping',
            'Design Systems',
          ],
        },
        {
          id: 'service-4',
          title: 'Cloud Solutions',
          description: 'Scalable cloud infrastructure and deployment',
          icon: 'cloud',
          order: 3,
          features: [
            'AWS & Azure',
            'Auto-scaling',
            'Load Balancing',
            'Monitoring',
          ],
        },
      ],
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Services created\n');

    // 7. Projects Section Config
    console.log('📁 Creating projects section config...');
    await setDoc(doc(db, 'projectSection', 'main'), {
      title: 'Our Projects',
      subtitle: 'Take a look at some of our recent work',
      categories: ['All', 'Web Development', 'Mobile Apps', 'Design', 'Cloud'],
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Projects section config created\n');

    // 8. Sample Projects
    console.log('🎨 Creating sample projects...');
    await setDoc(doc(db, 'projects', 'project-1'), {
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with real-time inventory',
      longDescription: 'Built a comprehensive e-commerce solution with real-time inventory management, payment processing, and customer analytics.',
      images: [],
      category: 'Web Development',
      tags: ['React', 'Next.js', 'Stripe', 'PostgreSQL'],
      liveUrl: 'https://example.com',
      githubUrl: '',
      order: 0,
      featured: true,
      createdAt: serverTimestamp(),
    });

    await setDoc(doc(db, 'projects', 'project-2'), {
      title: 'Mobile Fitness App',
      description: 'Cross-platform fitness tracking application',
      longDescription: 'Developed a comprehensive fitness tracking app with workout plans, nutrition tracking, and social features.',
      images: [],
      category: 'Mobile Apps',
      tags: ['React Native', 'Firebase', 'Node.js'],
      liveUrl: '',
      githubUrl: '',
      order: 1,
      featured: true,
      createdAt: serverTimestamp(),
    });

    await setDoc(doc(db, 'projects', 'project-3'), {
      title: 'Brand Identity Design',
      description: 'Complete brand identity for a tech startup',
      longDescription: 'Created a comprehensive brand identity including logo design, color palette, typography, and brand guidelines.',
      images: [],
      category: 'Design',
      tags: ['Branding', 'Logo Design', 'UI/UX'],
      liveUrl: '',
      githubUrl: '',
      order: 2,
      featured: false,
      createdAt: serverTimestamp(),
    });
    console.log('✅ Sample projects created\n');

    // 9. Testimonials
    console.log('💬 Creating testimonials...');
    await setDoc(doc(db, 'testimonials', 'testimonial-1'), {
      name: 'John Smith',
      company: 'Tech Startup Inc.',
      position: 'CEO',
      quote: 'Working with this team was an absolute pleasure. They delivered beyond our expectations and the results speak for themselves.',
      avatar: '',
      rating: 5,
      order: 0,
    });

    await setDoc(doc(db, 'testimonials', 'testimonial-2'), {
      name: 'Sarah Johnson',
      company: 'Digital Agency',
      position: 'Marketing Director',
      quote: 'Professional, responsive, and highly skilled. Our website traffic increased by 300% after the redesign!',
      avatar: '',
      rating: 5,
      order: 1,
    });

    await setDoc(doc(db, 'testimonials', 'testimonial-3'), {
      name: 'Michael Chen',
      company: 'E-commerce Store',
      position: 'Founder',
      quote: 'The mobile app they built has completely transformed our business. Highly recommended!',
      avatar: '',
      rating: 5,
      order: 2,
    });
    console.log('✅ Testimonials created\n');

    // 10. About Section
    console.log('ℹ️ Creating about section...');
    await setDoc(doc(db, 'about', 'main'), {
      title: 'About Us',
      subtitle: 'Building digital solutions since 2020',
      content: 'We are a passionate team of developers, designers, and strategists dedicated to creating exceptional digital experiences. With years of combined experience, we help businesses transform their ideas into reality.',
      image: '',
      stats: [
        { label: 'Projects Completed', value: '100+' },
        { label: 'Happy Clients', value: '50+' },
        { label: 'Years Experience', value: '5+' },
        { label: 'Team Members', value: '15+' },
      ],
      updatedAt: serverTimestamp(),
    });
    console.log('✅ About section created\n');

    // 11. Team Section
    console.log('👥 Creating team section...');
    await setDoc(doc(db, 'team', 'main'), {
      title: 'Our Team',
      subtitle: 'Meet the people behind our success',
      members: [],
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Team section created\n');

    // 12. FAQ Section
    console.log('❓ Creating FAQ section...');
    await setDoc(doc(db, 'faq', 'main'), {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions',
      faqs: [
        {
          id: 'faq-1',
          question: 'What services do you offer?',
          answer: 'We offer comprehensive web development, mobile app development, UI/UX design, and cloud solutions.',
          order: 0,
        },
        {
          id: 'faq-2',
          question: 'How long does a typical project take?',
          answer: 'Project timelines vary based on scope and complexity, but typically range from 4-12 weeks.',
          order: 1,
        },
        {
          id: 'faq-3',
          question: 'Do you provide ongoing support?',
          answer: 'Yes, we offer maintenance and support packages for all our projects.',
          order: 2,
        },
        {
          id: 'faq-4',
          question: 'What is your development process?',
          answer: 'We follow an agile methodology with regular client communication, iterative development, and thorough testing.',
          order: 3,
        },
      ],
      updatedAt: serverTimestamp(),
    });
    console.log('✅ FAQ section created\n');

    // 13. Contact Section
    console.log('📧 Creating contact section...');
    await setDoc(doc(db, 'contact', 'main'), {
      title: 'Get in Touch',
      subtitle: "Let's discuss your project",
      email: 'contact@yourcompany.com',
      phone: '+1 (555) 123-4567',
      address: '123 Main Street, Suite 100, City, State 12345',
      mapEmbedUrl: '',
      showContactForm: true,
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Contact section created\n');

    // 14. Footer
    console.log('🦶 Creating footer...');
    await setDoc(doc(db, 'footer', 'main'), {
      companyDescription: 'Building innovative digital solutions to help businesses grow and succeed in the modern world.',
      columns: [
        {
          id: 'company',
          title: 'Company',
          links: [
            { label: 'About Us', href: '#about' },
            { label: 'Services', href: '#services' },
            { label: 'Projects', href: '#projects' },
            { label: 'Contact', href: '#contact' },
          ],
        },
        {
          id: 'services',
          title: 'Services',
          links: [
            { label: 'Web Development', href: '#services' },
            { label: 'Mobile Apps', href: '#services' },
            { label: 'UI/UX Design', href: '#services' },
            { label: 'Cloud Solutions', href: '#services' },
          ],
        },
        {
          id: 'support',
          title: 'Support',
          links: [
            { label: 'FAQ', href: '#faq' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
          ],
        },
      ],
      copyrightText: '© 2025 Your Company. All rights reserved.',
      updatedAt: serverTimestamp(),
    });
    console.log('✅ Footer created\n');

    // 15. SEO Settings
    console.log('🔍 Creating SEO settings...');
    await setDoc(doc(db, 'seo', 'main'), {
      metaTitle: 'Your Company - Building Digital Solutions',
      metaDescription: 'We provide innovative web and mobile solutions to help businesses grow and succeed in the digital age.',
      metaKeywords: ['web development', 'mobile apps', 'UI/UX design', 'cloud solutions'],
      ogImage: '',
      favicon: '',
      updatedAt: serverTimestamp(),
    });
    console.log('✅ SEO settings created\n');

    // 16. Section Visibility
    console.log('👁️ Creating section visibility settings...');
    await setDoc(doc(db, 'sectionVisibility', 'main'), {
      hero: true,
      about: true,
      services: true,
      projects: true,
      testimonials: true,
      team: false,
      faq: true,
      contact: true,
    });
    console.log('✅ Section visibility created\n');

    console.log('🎉 Firestore initialization completed successfully!');
    console.log('\n✅ You can now:');
    console.log('   1. Login at http://localhost:3000/admin/login');
    console.log('   2. View the dashboard with real stats');
    console.log('   3. Edit company information, services, projects, etc.');
    console.log('\n📝 Note: Make sure to update the admin email in the users collection!');

  } catch (error) {
    console.error('❌ Error initializing Firestore:', error);
    throw error;
  }
}

// Run the initialization
initializeFirestore()
  .then(() => {
    console.log('\n✅ Done! You can now close this terminal.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error);
    process.exit(1);
  });
