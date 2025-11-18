import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { setDocument } from './src/lib/firestore';
import { COLLECTIONS } from './src/types';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log('🔥 Firebase initialized, starting data migration...\n');

async function seedDatabase() {
  const now = Timestamp.now();

  try {
    // ==================== COMPANY INFO ====================
    console.log('📝 Seeding Company Info...');
    await setDocument(COLLECTIONS.COMPANY_INFO, 'main', {
      name: 'KubixxTech',
      logo: 'https://via.placeholder.com/200x50?text=Company+Logo',
      tagline: 'Innovative Solutions for Modern Businesses',
      description: 'We are a leading technology company providing cutting-edge solutions to help businesses thrive in the digital age.',
      email: 'contact@kubixxtech.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, Innovation City, CA 94000',
      socialMedia: {
        facebook: 'https://facebook.com/kubixxtech',
        twitter: 'https://twitter.com/kubixxtech',
        instagram: 'https://instagram.com/kubixxtech',
        linkedin: 'https://linkedin.com/company/kubixxtech',
        github: 'https://github.com/kubixxtech',
      },
      updatedAt: now,
    });
    console.log('✅ Company Info seeded\n');

    // ==================== THEME SETTINGS ====================
    console.log('🎨 Seeding Theme Settings...');
    await setDocument(COLLECTIONS.THEME_SETTINGS, 'main', {
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      accentColor: '#06b6d4',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      headingFont: 'Inter',
      bodyFont: 'Inter',
      borderRadius: 'md',
      updatedAt: now,
    });
    console.log('✅ Theme Settings seeded\n');

    // ==================== NAVIGATION ====================
    console.log('🧭 Seeding Navigation...');
    await setDocument(COLLECTIONS.NAVIGATION, 'main', {
      logo: 'https://via.placeholder.com/200x50?text=Logo',
      links: [
        { id: '1', label: 'Home', href: '/', order: 1, isExternal: false, openInNewTab: false },
        { id: '2', label: 'About', href: '#about', order: 2, isExternal: false, openInNewTab: false },
        { id: '3', label: 'Services', href: '#services', order: 3, isExternal: false, openInNewTab: false },
        { id: '4', label: 'Projects', href: '#projects', order: 4, isExternal: false, openInNewTab: false },
        { id: '5', label: 'Team', href: '#team', order: 5, isExternal: false, openInNewTab: false },
        { id: '6', label: 'Contact', href: '#contact', order: 6, isExternal: false, openInNewTab: false },
      ],
      ctaButton: {
        label: 'Get Started',
        href: '#contact',
        style: 'primary',
      },
      updatedAt: now,
    });
    console.log('✅ Navigation seeded\n');

    // ==================== HERO SECTION ====================
    console.log('🦸 Seeding Hero Section...');
    await setDocument(COLLECTIONS.HERO, 'main', {
      title: 'Transform Your Business with Innovative Technology',
      subtitle: 'We build scalable, secure, and modern solutions that drive growth and efficiency',
      backgroundType: 'gradient',
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
      updatedAt: now,
    });
    console.log('✅ Hero Section seeded\n');

    // ==================== SERVICES SECTION ====================
    console.log('⚙️ Seeding Services Section...');
    await setDocument(COLLECTIONS.SERVICES, 'main', {
      title: 'Our Services',
      subtitle: 'Comprehensive solutions tailored to your business needs',
      services: [
        {
          id: '1',
          title: 'Web Development',
          description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js',
          icon: '🌐',
          order: 1,
          features: ['Responsive Design', 'SEO Optimized', 'Fast Performance', 'Secure Infrastructure'],
        },
        {
          id: '2',
          title: 'Mobile Development',
          description: 'Native and cross-platform mobile apps for iOS and Android',
          icon: '📱',
          order: 2,
          features: ['iOS & Android', 'Cross-Platform', 'Push Notifications', 'Offline Support'],
        },
        {
          id: '3',
          title: 'Cloud Solutions',
          description: 'Scalable cloud infrastructure and DevOps services',
          icon: '☁️',
          order: 3,
          features: ['AWS & Azure', 'Auto-Scaling', 'CI/CD Pipeline', '24/7 Monitoring'],
        },
        {
          id: '4',
          title: 'UI/UX Design',
          description: 'Beautiful and intuitive user interfaces that delight users',
          icon: '🎨',
          order: 4,
          features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
        },
      ],
      updatedAt: now,
    });
    console.log('✅ Services Section seeded\n');

    // ==================== PROJECT SECTION ====================
    console.log('📁 Seeding Project Section...');
    await setDocument(COLLECTIONS.PROJECT_SECTION, 'main', {
      title: 'Our Projects',
      subtitle: 'Explore our latest work and success stories',
      categories: ['Web Apps', 'Mobile Apps', 'E-Commerce', 'Enterprise', 'Startups'],
      updatedAt: now,
    });
    console.log('✅ Project Section seeded\n');

    // ==================== PROJECTS ====================
    console.log('🚀 Seeding Projects...');
    await setDocument(COLLECTIONS.PROJECTS, 'project1', {
      title: 'E-Commerce Platform',
      description: 'Modern online shopping experience with AI-powered recommendations',
      longDescription: 'A comprehensive e-commerce platform built with Next.js and Stripe integration. Features include real-time inventory management, AI-powered product recommendations, and a seamless checkout experience.',
      images: [
        'https://via.placeholder.com/800x600?text=E-Commerce+Dashboard',
        'https://via.placeholder.com/800x600?text=Product+Page',
      ],
      category: 'E-Commerce',
      tags: ['Next.js', 'React', 'Stripe', 'AI/ML', 'TypeScript'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/ecommerce',
      order: 1,
      featured: true,
      createdAt: now,
    });

    await setDocument(COLLECTIONS.PROJECTS, 'project2', {
      title: 'Healthcare Management System',
      description: 'HIPAA-compliant patient management platform',
      longDescription: 'Enterprise healthcare solution for managing patient records, appointments, and billing. Built with security and compliance as top priorities.',
      images: [
        'https://via.placeholder.com/800x600?text=Healthcare+Dashboard',
      ],
      category: 'Enterprise',
      tags: ['React', 'Node.js', 'PostgreSQL', 'HIPAA'],
      order: 2,
      featured: true,
      createdAt: now,
    });

    await setDocument(COLLECTIONS.PROJECTS, 'project3', {
      title: 'Fitness Tracking App',
      description: 'Mobile app for tracking workouts and nutrition',
      longDescription: 'Cross-platform mobile app built with React Native. Features include workout tracking, meal planning, progress photos, and social features.',
      images: [
        'https://via.placeholder.com/800x600?text=Fitness+App',
      ],
      category: 'Mobile Apps',
      tags: ['React Native', 'Firebase', 'Redux'],
      liveUrl: 'https://apps.apple.com/example',
      order: 3,
      featured: false,
      createdAt: now,
    });
    console.log('✅ Projects seeded\n');

    // ==================== TESTIMONIALS SECTION ====================
    console.log('💬 Seeding Testimonials Section...');
    await setDocument(COLLECTIONS.TESTIMONIALS, 'main', {
      title: 'What Our Clients Say',
      subtitle: 'Trusted by leading companies worldwide',
      testimonials: [
        {
          id: '1',
          name: 'John Smith',
          company: 'TechCorp Inc.',
          position: 'CEO',
          quote: 'Working with KubixxTech was an absolute pleasure. They delivered a top-quality product on time and within budget.',
          avatar: 'https://via.placeholder.com/150?text=JS',
          rating: 5,
          order: 1,
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          company: 'StartupXYZ',
          position: 'Founder',
          quote: 'The team\'s expertise and professionalism exceeded our expectations. Highly recommend!',
          avatar: 'https://via.placeholder.com/150?text=SJ',
          rating: 5,
          order: 2,
        },
        {
          id: '3',
          name: 'Michael Chen',
          company: 'Global Enterprises',
          position: 'CTO',
          quote: 'Innovative solutions and excellent communication throughout the project. Will definitely work with them again.',
          avatar: 'https://via.placeholder.com/150?text=MC',
          rating: 5,
          order: 3,
        },
      ],
      updatedAt: now,
    });
    console.log('✅ Testimonials Section seeded\n');

    // ==================== ABOUT SECTION ====================
    console.log('ℹ️ Seeding About Section...');
    await setDocument(COLLECTIONS.ABOUT, 'main', {
      title: 'About Us',
      subtitle: 'Building the future, one project at a time',
      content: 'Founded in 2020, KubixxTech has grown to become a leading technology partner for businesses of all sizes. Our team of experienced developers, designers, and strategists work together to deliver innovative solutions that drive real business results.\n\nWe believe in the power of technology to transform businesses and improve lives. Our approach combines cutting-edge technology with user-centered design to create products that people love to use.',
      image: 'https://via.placeholder.com/600x400?text=Team+Photo',
      stats: [
        { label: 'Projects Completed', value: '150+' },
        { label: 'Happy Clients', value: '80+' },
        { label: 'Team Members', value: '25+' },
        { label: 'Years Experience', value: '5+' },
      ],
      updatedAt: now,
    });
    console.log('✅ About Section seeded\n');

    // ==================== TEAM SECTION ====================
    console.log('👥 Seeding Team Section...');
    await setDocument(COLLECTIONS.TEAM, 'main', {
      title: 'Meet Our Team',
      subtitle: 'The talented people behind our success',
      members: [
        {
          id: '1',
          name: 'Alex Thompson',
          position: 'CEO & Founder',
          bio: 'Visionary leader with 15+ years of experience in tech industry',
          avatar: 'https://via.placeholder.com/300?text=AT',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/alexthompson',
            twitter: 'https://twitter.com/alexthompson',
          },
          order: 1,
        },
        {
          id: '2',
          name: 'Emily Rodriguez',
          position: 'CTO',
          bio: 'Tech expert specializing in scalable architecture and cloud solutions',
          avatar: 'https://via.placeholder.com/300?text=ER',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/emilyrodriguez',
            github: 'https://github.com/emilyrodriguez',
          },
          order: 2,
        },
        {
          id: '3',
          name: 'David Kim',
          position: 'Lead Designer',
          bio: 'Creative designer passionate about user experience and visual storytelling',
          avatar: 'https://via.placeholder.com/300?text=DK',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/davidkim',
            twitter: 'https://twitter.com/davidkim',
          },
          order: 3,
        },
      ],
      updatedAt: now,
    });
    console.log('✅ Team Section seeded\n');

    // ==================== FAQ SECTION ====================
    console.log('❓ Seeding FAQ Section...');
    await setDocument(COLLECTIONS.FAQ, 'main', {
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our services',
      faqs: [
        {
          id: '1',
          question: 'What technologies do you specialize in?',
          answer: 'We specialize in modern web technologies including React, Next.js, Node.js, TypeScript, and cloud platforms like AWS and Firebase.',
          order: 1,
        },
        {
          id: '2',
          question: 'How long does a typical project take?',
          answer: 'Project timelines vary based on scope and complexity. A typical web application takes 8-12 weeks from kickoff to launch. We provide detailed timelines during the planning phase.',
          order: 2,
        },
        {
          id: '3',
          question: 'Do you provide ongoing support and maintenance?',
          answer: 'Yes! We offer comprehensive support and maintenance packages to ensure your application remains secure, up-to-date, and performing optimally.',
          order: 3,
        },
        {
          id: '4',
          question: 'What is your pricing model?',
          answer: 'We offer flexible pricing models including fixed-price projects, time and materials, and retainer arrangements. Contact us for a custom quote based on your specific needs.',
          order: 4,
        },
        {
          id: '5',
          question: 'Can you help with existing projects?',
          answer: 'Absolutely! We can help with bug fixes, feature additions, performance optimization, or complete redesigns of existing applications.',
          order: 5,
        },
      ],
      updatedAt: now,
    });
    console.log('✅ FAQ Section seeded\n');

    // ==================== CONTACT SECTION ====================
    console.log('📞 Seeding Contact Section...');
    await setDocument(COLLECTIONS.CONTACT, 'main', {
      title: 'Get In Touch',
      subtitle: 'Let\'s discuss your next project',
      email: 'contact@kubixxtech.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, Innovation City, CA 94000',
      showContactForm: true,
      updatedAt: now,
    });
    console.log('✅ Contact Section seeded\n');

    // ==================== FOOTER SECTION ====================
    console.log('🦶 Seeding Footer Section...');
    await setDocument(COLLECTIONS.FOOTER, 'main', {
      companyDescription: 'KubixxTech is a leading technology company providing innovative solutions for modern businesses.',
      columns: [
        {
          id: '1',
          title: 'Company',
          links: [
            { label: 'About Us', href: '#about' },
            { label: 'Our Team', href: '#team' },
            { label: 'Careers', href: '/careers' },
            { label: 'Contact', href: '#contact' },
          ],
        },
        {
          id: '2',
          title: 'Services',
          links: [
            { label: 'Web Development', href: '#services' },
            { label: 'Mobile Apps', href: '#services' },
            { label: 'Cloud Solutions', href: '#services' },
            { label: 'UI/UX Design', href: '#services' },
          ],
        },
        {
          id: '3',
          title: 'Resources',
          links: [
            { label: 'Blog', href: '/blog' },
            { label: 'Documentation', href: '/docs' },
            { label: 'Support', href: '/support' },
            { label: 'Privacy Policy', href: '/privacy' },
          ],
        },
      ],
      copyrightText: '© 2024 KubixxTech. All rights reserved.',
      updatedAt: now,
    });
    console.log('✅ Footer Section seeded\n');

    // ==================== SEO SETTINGS ====================
    console.log('🔍 Seeding SEO Settings...');
    await setDocument(COLLECTIONS.SEO, 'main', {
      metaTitle: 'KubixxTech - Innovative Technology Solutions',
      metaDescription: 'Leading technology company providing web development, mobile apps, cloud solutions, and UI/UX design services. Transform your business with our innovative solutions.',
      metaKeywords: ['web development', 'mobile apps', 'cloud solutions', 'ui ux design', 'technology company', 'software development'],
      ogImage: 'https://via.placeholder.com/1200x630?text=KubixxTech',
      favicon: 'https://via.placeholder.com/64x64?text=K',
      updatedAt: now,
    });
    console.log('✅ SEO Settings seeded\n');

    // ==================== SECTION VISIBILITY ====================
    console.log('👁️ Seeding Section Visibility...');
    await setDocument(COLLECTIONS.SECTION_VISIBILITY, 'main', {
      hero: true,
      about: true,
      services: true,
      projects: true,
      testimonials: true,
      team: true,
      faq: true,
      contact: true,
    });
    console.log('✅ Section Visibility seeded\n');

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   ✓ Company Info');
    console.log('   ✓ Theme Settings');
    console.log('   ✓ Navigation');
    console.log('   ✓ Hero Section');
    console.log('   ✓ Services Section');
    console.log('   ✓ Projects (3 items)');
    console.log('   ✓ Testimonials Section');
    console.log('   ✓ About Section');
    console.log('   ✓ Team Section');
    console.log('   ✓ FAQ Section');
    console.log('   ✓ Contact Section');
    console.log('   ✓ Footer Section');
    console.log('   ✓ SEO Settings');
    console.log('   ✓ Section Visibility');
    console.log('\n🚀 Your Firestore database is now ready to use!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase()
  .then(() => {
    console.log('\n✨ All done! You can now start your development server.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
