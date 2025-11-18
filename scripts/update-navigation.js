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
 * Run this script with: node scripts/update-navigation.js
 */

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, serverTimestamp } = require('firebase/firestore');

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function updateNavigation() {
  try {
    console.log('🚀 Updating navigation data in Firestore...');

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
          href: '/testimonials',
          order: 5,
          isExternal: false,
          openInNewTab: false,
        },
      ],
      updatedAt: serverTimestamp(),
    };

    // Update the navigation document in Firestore
    await setDoc(doc(db, 'navigation', 'main'), navigationData, { merge: true });

    console.log('✅ Navigation data updated successfully!');
    console.log('\nUpdated navigation links:');
    navigationData.links.forEach(link => {
      console.log(`  ${link.order}. ${link.label} -> ${link.href}`);
    });

    console.log('\n📝 Note: The navigation now includes:');
    console.log('  - Centered navigation buttons in the navbar');
    console.log('  - "Book a Call" button on the right side');
    console.log('  - "Portfolio" label instead of "Projects"');
    console.log('  - New "Testimonials" page route\n');

  } catch (error) {
    console.error('❌ Error updating navigation:', error);
    process.exit(1);
  }
}

// Run the update
updateNavigation()
  .then(() => {
    console.log('🎉 Done! You can now test the updated navigation.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
