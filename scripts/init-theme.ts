import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration from .env
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function initTheme() {
  try {
    console.log('🎨 Creating theme settings...\n');

    await setDoc(doc(db, 'themeSettings', 'main'), {
      primaryColor: '#8b5cf6',
      secondaryColor: '#3b82f6',
      accentColor: '#06b6d4',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      headingFont: 'Inter, sans-serif',
      bodyFont: 'Inter, sans-serif',
      borderRadius: 'md',
      updatedAt: serverTimestamp(),
    });

    console.log('✅ Theme settings created successfully!\n');
    console.log('Colors:');
    console.log('  Primary:    #8b5cf6 (Purple)');
    console.log('  Secondary:  #3b82f6 (Blue)');
    console.log('  Accent:     #06b6d4 (Cyan)');
    console.log('  Background: #000000 (Black)');
    console.log('  Text:       #ffffff (White)\n');
    console.log('Font: Inter\n');
    console.log('🎉 Your website should now display correctly!');
  } catch (error: any) {
    console.error('❌ Error:', error.message);

    if (error.code === 'permission-denied') {
      console.log('\n⚠️  Permission denied. Please update Firestore rules:');
      console.log('   Go to: https://console.firebase.google.com/project/kubixxtech-daf71/firestore/rules');
      console.log('   Add this rule temporarily:\n');
      console.log('   match /themeSettings/{document} {');
      console.log('     allow write: if true;');
      console.log('   }\n');
    }

    process.exit(1);
  }
}

initTheme()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
