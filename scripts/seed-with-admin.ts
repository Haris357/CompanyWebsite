import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin SDK
// The service account key should be in the root directory as firebase-service-account.json
const serviceAccountPath = path.join(process.cwd(), 'firebase-service-account.json');

try {
  const serviceAccount = require(serviceAccountPath);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('✅ Firebase Admin SDK initialized successfully\n');
} catch (error) {
  console.error('❌ Error: firebase-service-account.json not found!');
  console.error('Please download your service account key from Firebase Console:');
  console.error('1. Go to: https://console.firebase.google.com/project/kubixxtech-daf71/settings/serviceaccounts/adminsdk');
  console.error('2. Click "Generate New Private Key"');
  console.error('3. Save the file as "firebase-service-account.json" in the project root');
  console.error('4. Run this script again\n');
  process.exit(1);
}

const db = admin.firestore();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

// Admin User UID
const ADMIN_UID = 'nXBCrzTBukUMirfaVbFFsWS2iAM2';

async function seedDatabase() {
  try {
    console.log('🚀 Starting Firestore data migration...\n');

    // 1. Create Admin User
    console.log('👤 Creating admin user...');
    await db.collection('users').doc(ADMIN_UID).set({
      uid: ADMIN_UID,
      email: 'admin@kubixxtech.com',
      displayName: 'Admin User',
      role: 'admin',
      emailVerified: true,
      photoURL: null,
      createdAt: timestamp,
      lastLogin: timestamp,
    });
    console.log('✅ Admin user created\n');

    // 2. Company Info
    console.log('🏢 Creating company information...');
    await db.collection('companyInfo').doc('main').set({
      name: 'KubixxTech',
      logo: '',
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
        youtube: '',
        github: 'https://github.com/kubixxtech',
      },
      updatedAt: timestamp,
    });
    console.log('✅ Company information created\n');

    // 3. Theme Settings
    console.log('🎨 Creating theme settings...');
    await db.collection('themeSettings').doc('main').set({
      primaryColor: '#3b82f6',
      secondaryColor: '#8b5cf6',
      accentColor: '#06b6d4',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      headingFont: 'Inter',
      bodyFont: 'Inter',
      borderRadius: 'md',
      updatedAt: timestamp,
    });
    console.log('✅ Theme settings created\n');

    // 4. Navigation
    console.log('🧭 Creating navigation...');
    await db.collection('navigation').doc('main').set({
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
          id: 'team',
          label: 'Team',
          href: '#team',
          order: 4,
          isExternal: false,
          openInNewTab: false,
        },
        {
          id: 'contact',
          label: 'Contact',
          href: '#contact',
          order: 5,
          isExternal: false,
          openInNewTab: false,
        },
      ],
      ctaButton: {
        label: 'Get Started',
        href: '#contact',
        style: 'primary',
      },
      updatedAt: timestamp,
    });
    console.log('✅ Navigation created\n');

    // 5. Hero Section
    console.log('🎭 Creating hero section...');
    await db.collection('hero').doc('main').set({
      title: 'Transform Your Business with Innovative Technology',
      subtitle: 'We build scalable, secure, and modern solutions that drive growth and efficiency',
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
      updatedAt: timestamp,
    });
    console.log('✅ Hero section created\n');

    // 6. Services
    console.log('💼 Creating services...');
    await db.collection('services').doc('main').set({
      title: 'Our Services',
      subtitle: 'Comprehensive solutions tailored to your business needs',
      services: [
        {
          id: 'service-1',
          title: 'Web Development',
          description: 'Custom web applications built with modern technologies like React, Next.js, and Node.js',
          icon: 'code',
          order: 0,
          features: [
            'Responsive Design',
            'SEO Optimized',
            'Fast Performance',
            'Secure Infrastructure',
          ],
        },
        {
          id: 'service-2',
          title: 'Mobile Development',
          description: 'Native and cross-platform mobile apps for iOS and Android',
          icon: 'mobile',
          order: 1,
          features: [
            'iOS & Android',
            'Cross-Platform',
            'Push Notifications',
            'Offline Support',
          ],
        },
        {
          id: 'service-3',
          title: 'Cloud Solutions',
          description: 'Scalable cloud infrastructure and DevOps services',
          icon: 'cloud',
          order: 2,
          features: [
            'AWS & Azure',
            'Auto-Scaling',
            'CI/CD Pipeline',
            '24/7 Monitoring',
          ],
        },
        {
          id: 'service-4',
          title: 'UI/UX Design',
          description: 'Beautiful and intuitive user interfaces that delight users',
          icon: 'design',
          order: 3,
          features: [
            'User Research',
            'Wireframing',
            'Prototyping',
            'Design Systems',
          ],
        },
      ],
      updatedAt: timestamp,
    });
    console.log('✅ Services created\n');

    // 7. Projects Section Config
    console.log('📁 Creating projects section config...');
    await db.collection('projectSection').doc('main').set({
      title: 'Our Projects',
      subtitle: 'Explore our latest work and success stories',
      categories: ['All', 'Web Development', 'Mobile Apps', 'E-Commerce', 'Enterprise'],
      updatedAt: timestamp,
    });
    console.log('✅ Projects section config created\n');

    // 8. Sample Projects
    console.log('🎨 Creating sample projects...');
    await db.collection('projects').doc('project-1').set({
      title: 'E-Commerce Platform',
      description: 'Modern online shopping experience with AI-powered recommendations',
      longDescription: 'A comprehensive e-commerce platform built with Next.js and Stripe integration. Features include real-time inventory management, AI-powered product recommendations, and a seamless checkout experience.',
      images: [],
      category: 'E-Commerce',
      tags: ['Next.js', 'React', 'Stripe', 'AI/ML', 'TypeScript'],
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example/ecommerce',
      order: 0,
      featured: true,
      createdAt: timestamp,
    });

    await db.collection('projects').doc('project-2').set({
      title: 'Healthcare Management System',
      description: 'HIPAA-compliant patient management platform',
      longDescription: 'Enterprise healthcare solution for managing patient records, appointments, and billing. Built with security and compliance as top priorities.',
      images: [],
      category: 'Enterprise',
      tags: ['React', 'Node.js', 'PostgreSQL', 'HIPAA'],
      order: 1,
      featured: true,
      createdAt: timestamp,
    });

    await db.collection('projects').doc('project-3').set({
      title: 'Fitness Tracking App',
      description: 'Mobile app for tracking workouts and nutrition',
      longDescription: 'Cross-platform mobile app built with React Native. Features include workout tracking, meal planning, progress photos, and social features.',
      images: [],
      category: 'Mobile Apps',
      tags: ['React Native', 'Firebase', 'Redux'],
      liveUrl: 'https://apps.apple.com/example',
      order: 2,
      featured: false,
      createdAt: timestamp,
    });
    console.log('✅ Sample projects created\n');

    // 9. Testimonials
    console.log('💬 Creating testimonials...');
    await db.collection('testimonials').doc('testimonial-1').set({
      name: 'John Smith',
      company: 'TechCorp Inc.',
      position: 'CEO',
      quote: 'Working with KubixxTech was an absolute pleasure. They delivered a top-quality product on time and within budget.',
      avatar: '',
      rating: 5,
      order: 0,
    });

    await db.collection('testimonials').doc('testimonial-2').set({
      name: 'Sarah Johnson',
      company: 'StartupXYZ',
      position: 'Founder',
      quote: 'The team\'s expertise and professionalism exceeded our expectations. Highly recommend!',
      avatar: '',
      rating: 5,
      order: 1,
    });

    await db.collection('testimonials').doc('testimonial-3').set({
      name: 'Michael Chen',
      company: 'Global Enterprises',
      position: 'CTO',
      quote: 'Innovative solutions and excellent communication throughout the project. Will definitely work with them again.',
      avatar: '',
      rating: 5,
      order: 2,
    });
    console.log('✅ Testimonials created\n');

    // 10. About Section
    console.log('ℹ️ Creating about section...');
    await db.collection('about').doc('main').set({
      title: 'About Us',
      subtitle: 'Building the future, one project at a time',
      content: 'Founded in 2020, KubixxTech has grown to become a leading technology partner for businesses of all sizes. Our team of experienced developers, designers, and strategists work together to deliver innovative solutions that drive real business results.\n\nWe believe in the power of technology to transform businesses and improve lives. Our approach combines cutting-edge technology with user-centered design to create products that people love to use.',
      image: '',
      stats: [
        { label: 'Projects Completed', value: '150+' },
        { label: 'Happy Clients', value: '80+' },
        { label: 'Team Members', value: '25+' },
        { label: 'Years Experience', value: '5+' },
      ],
      updatedAt: timestamp,
    });
    console.log('✅ About section created\n');

    // 11. Team Section
    console.log('👥 Creating team section...');
    await db.collection('team').doc('main').set({
      title: 'Meet Our Team',
      subtitle: 'The talented people behind our success',
      members: [
        {
          id: '1',
          name: 'Alex Thompson',
          position: 'CEO & Founder',
          bio: 'Visionary leader with 15+ years of experience in tech industry',
          avatar: '',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/alexthompson',
            twitter: 'https://twitter.com/alexthompson',
          },
          order: 0,
        },
        {
          id: '2',
          name: 'Emily Rodriguez',
          position: 'CTO',
          bio: 'Tech expert specializing in scalable architecture and cloud solutions',
          avatar: '',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/emilyrodriguez',
            github: 'https://github.com/emilyrodriguez',
          },
          order: 1,
        },
        {
          id: '3',
          name: 'David Kim',
          position: 'Lead Designer',
          bio: 'Creative designer passionate about user experience and visual storytelling',
          avatar: '',
          socialMedia: {
            linkedin: 'https://linkedin.com/in/davidkim',
            twitter: 'https://twitter.com/davidkim',
          },
          order: 2,
        },
      ],
      updatedAt: timestamp,
    });
    console.log('✅ Team section created\n');

    // 12. FAQ Section
    console.log('❓ Creating FAQ section...');
    await db.collection('faq').doc('main').set({
      title: 'Frequently Asked Questions',
      subtitle: 'Find answers to common questions about our services',
      faqs: [
        {
          id: 'faq-1',
          question: 'What technologies do you specialize in?',
          answer: 'We specialize in modern web technologies including React, Next.js, Node.js, TypeScript, and cloud platforms like AWS and Firebase.',
          order: 0,
        },
        {
          id: 'faq-2',
          question: 'How long does a typical project take?',
          answer: 'Project timelines vary based on scope and complexity. A typical web application takes 8-12 weeks from kickoff to launch. We provide detailed timelines during the planning phase.',
          order: 1,
        },
        {
          id: 'faq-3',
          question: 'Do you provide ongoing support and maintenance?',
          answer: 'Yes! We offer comprehensive support and maintenance packages to ensure your application remains secure, up-to-date, and performing optimally.',
          order: 2,
        },
        {
          id: 'faq-4',
          question: 'What is your pricing model?',
          answer: 'We offer flexible pricing models including fixed-price projects, time and materials, and retainer arrangements. Contact us for a custom quote based on your specific needs.',
          order: 3,
        },
        {
          id: 'faq-5',
          question: 'Can you help with existing projects?',
          answer: 'Absolutely! We can help with bug fixes, feature additions, performance optimization, or complete redesigns of existing applications.',
          order: 4,
        },
      ],
      updatedAt: timestamp,
    });
    console.log('✅ FAQ section created\n');

    // 13. Contact Section
    console.log('📧 Creating contact section...');
    await db.collection('contact').doc('main').set({
      title: 'Get In Touch',
      subtitle: 'Let\'s discuss your next project',
      email: 'contact@kubixxtech.com',
      phone: '+1 (555) 123-4567',
      address: '123 Tech Street, Innovation City, CA 94000',
      mapEmbedUrl: '',
      showContactForm: true,
      updatedAt: timestamp,
    });
    console.log('✅ Contact section created\n');

    // 14. Footer
    console.log('🦶 Creating footer...');
    await db.collection('footer').doc('main').set({
      companyDescription: 'KubixxTech is a leading technology company providing innovative solutions for modern businesses.',
      columns: [
        {
          id: 'company',
          title: 'Company',
          links: [
            { label: 'About Us', href: '#about' },
            { label: 'Our Team', href: '#team' },
            { label: 'Careers', href: '/careers' },
            { label: 'Contact', href: '#contact' },
          ],
        },
        {
          id: 'services',
          title: 'Services',
          links: [
            { label: 'Web Development', href: '#services' },
            { label: 'Mobile Apps', href: '#services' },
            { label: 'Cloud Solutions', href: '#services' },
            { label: 'UI/UX Design', href: '#services' },
          ],
        },
        {
          id: 'resources',
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
      updatedAt: timestamp,
    });
    console.log('✅ Footer created\n');

    // 15. SEO Settings
    console.log('🔍 Creating SEO settings...');
    await db.collection('seo').doc('main').set({
      metaTitle: 'KubixxTech - Innovative Technology Solutions',
      metaDescription: 'Leading technology company providing web development, mobile apps, cloud solutions, and UI/UX design services. Transform your business with our innovative solutions.',
      metaKeywords: ['web development', 'mobile apps', 'cloud solutions', 'ui ux design', 'technology company', 'software development'],
      ogImage: '',
      favicon: '',
      updatedAt: timestamp,
    });
    console.log('✅ SEO settings created\n');

    // 16. Section Visibility
    console.log('👁️ Creating section visibility settings...');
    await db.collection('sectionVisibility').doc('main').set({
      hero: true,
      about: true,
      services: true,
      projects: true,
      testimonials: true,
      team: true,
      faq: true,
      contact: true,
    });
    console.log('✅ Section visibility created\n');

    console.log('\n🎉 Database migration completed successfully!');
    console.log('\n📊 Summary:');
    console.log('   ✓ Admin User');
    console.log('   ✓ Company Info');
    console.log('   ✓ Theme Settings');
    console.log('   ✓ Navigation');
    console.log('   ✓ Hero Section');
    console.log('   ✓ Services Section');
    console.log('   ✓ Projects (3 items)');
    console.log('   ✓ Testimonials (3 items)');
    console.log('   ✓ About Section');
    console.log('   ✓ Team Section');
    console.log('   ✓ FAQ Section');
    console.log('   ✓ Contact Section');
    console.log('   ✓ Footer Section');
    console.log('   ✓ SEO Settings');
    console.log('   ✓ Section Visibility');
    console.log('\n🚀 Your Firestore database is now ready to use!');
    console.log('\n📝 Next steps:');
    console.log('   1. Login at http://localhost:3000/admin/login');
    console.log('   2. Use email: admin@kubixxtech.com');
    console.log('   3. Set up your password in Firebase Auth Console');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDatabase()
  .then(() => {
    console.log('\n✨ All done! Exiting...');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
