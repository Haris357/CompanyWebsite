/**
 * Script to update navigation data in Firestore
 *
 * This script updates the navigation links to include:
 * - Home
 * - About Us
 * - Portfolio (renamed from Projects)
 * - Services
 * - Testimonials (new page)
 *
 * Run this script with: npm run update-navigation
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Validate configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Error: Firebase configuration is missing!');
  console.error('Please make sure your .env.local file contains all required Firebase variables.');
  process.exit(1);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateNavigation() {
  try {
    console.log('🚀 Updating navigation data in Firestore...\n');

    const navigationData = {
      id: 'main',
      logo: '', // Will use company logo from CompanyInfo
      links: [
        {
          id: 'home',
          label: 'Home',
          href: '/',
          order: 1,
          isExternal: false,
          openInNewTab: false,
        },
        {
          id: 'about',
          label: 'About Us',
          href: '/#about',
          order: 2,
          isExternal: false,
          openInNewTab: false,
        },
        {
          id: 'portfolio',
          label: 'Portfolio',
          href: '/#projects',
          order: 3,
          isExternal: false,
          openInNewTab: false,
        },
        {
          id: 'services',
          label: 'Services',
          href: '/#services',
          order: 4,
          isExternal: false,
          openInNewTab: false,
        },
        {
          id: 'testimonials',
          label: 'Testimonials',
          href: '/#testimonials',
          order: 5,
          isExternal: false,
          openInNewTab: false,
        },
      ],
      updatedAt: serverTimestamp(),
    };

    // Update the navigation document in Firestore
    await setDoc(doc(db, 'navigation', 'main'), navigationData, { merge: true });

    console.log('✅ Navigation data updated successfully!\n');
    console.log('📋 Updated navigation links:');
    navigationData.links.forEach((link) => {
      console.log(`  ${link.order}. ${link.label} → ${link.href}`);
    });

    console.log('\n🎨 UI Updates Applied:');
    console.log('  ✓ 3-column grid navbar layout');
    console.log('  ✓ Centered navigation buttons (Home, About Us, Portfolio, Services, Testimonials)');
    console.log('  ✓ "Book a Call" button with gradient on the right');
    console.log('  ✓ "Portfolio" replaces "Projects" in navigation');
    console.log('  ✓ Separate /portfolio and /testimonials page routes');
    console.log('  ✓ Animated smooth scroll transitions');
    console.log('  ✓ Theme-colored page loader');
    console.log('  ✓ Enhanced development-verse globe animation');
    console.log('  ✓ Modern portfolio grid with bigger project cards');
    console.log('  ✓ Custom gradient scrollbar\n');

  } catch (error) {
    console.error('❌ Error updating navigation:', error);
    process.exit(1);
  }
}

// Run the update
updateNavigation()
  .then(() => {
    console.log('🎉 All done! Your navigation is now updated.');
    console.log('\n💡 Next steps:');
    console.log('  1. Run: npm run dev');
    console.log('  2. Visit: http://localhost:3000');
    console.log('  3. Test the new navigation layout and transitions\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
