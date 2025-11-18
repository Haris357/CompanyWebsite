import * as admin from 'firebase-admin';
import * as path from 'path';

// Initialize Firebase Admin SDK
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

// User details
const ADMIN_EMAIL = 'harisimran7857@gmail.com';

async function createAdminUser() {
  try {
    console.log('🔍 Looking up user in Firebase Authentication...\n');

    // Get user by email from Firebase Auth
    let userRecord;
    try {
      userRecord = await admin.auth().getUserByEmail(ADMIN_EMAIL);
      console.log(`✅ Found user: ${userRecord.email}`);
      console.log(`   UID: ${userRecord.uid}\n`);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        console.log('❌ User not found in Firebase Authentication');
        console.log('Please create the user first in Firebase Console:');
        console.log(`1. Go to: https://console.firebase.google.com/project/kubixxtech-daf71/authentication/users`);
        console.log('2. Click "Add user"');
        console.log(`3. Email: ${ADMIN_EMAIL}`);
        console.log('4. Password: (your chosen password)');
        console.log('5. Run this script again\n');
        process.exit(1);
      }
      throw error;
    }

    // Check if user document already exists
    const userDocRef = db.collection('users').doc(userRecord.uid);
    const userDoc = await userDocRef.get();

    if (userDoc.exists()) {
      console.log('⚠️  User document already exists in Firestore');
      console.log('   Updating with admin role...\n');
    } else {
      console.log('📝 Creating user document in Firestore...\n');
    }

    // Create or update user document
    await userDocRef.set({
      uid: userRecord.uid,
      email: userRecord.email,
      displayName: userRecord.displayName || 'Admin User',
      photoURL: userRecord.photoURL || null,
      emailVerified: userRecord.emailVerified,
      role: 'admin',
      createdAt: timestamp,
      lastLogin: timestamp,
    }, { merge: true });

    console.log('✅ Admin user document created/updated successfully!\n');
    console.log('📋 User Details:');
    console.log(`   Email: ${userRecord.email}`);
    console.log(`   UID: ${userRecord.uid}`);
    console.log(`   Role: admin`);
    console.log(`   Email Verified: ${userRecord.emailVerified}`);
    console.log('\n🎉 You can now login to the admin panel!');
    console.log('   URL: http://localhost:3000/admin/login');
    console.log(`   Email: ${userRecord.email}`);
    console.log('   Password: (the password you set in Firebase Auth)\n');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

// Run the script
createAdminUser()
  .then(() => {
    console.log('✨ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  });
