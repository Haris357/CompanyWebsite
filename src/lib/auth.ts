import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { User } from '@/types/firebase';
import { COLLECTIONS } from '@/types';

// ==================== AUTHENTICATION ====================

/**
 * Sign in with email and password
 */
export async function signIn(
  email: string,
  password: string,
  rememberMe: boolean = false
): Promise<User> {
  try {
    // Set persistence based on rememberMe
    await setPersistence(
      auth,
      rememberMe ? browserLocalPersistence : browserSessionPersistence
    );

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    // Update last login in Firestore
    await updateUserLastLogin(firebaseUser.uid);

    // Get user data from Firestore
    const userData = await getUserData(firebaseUser.uid);

    return userData;
  } catch (error: any) {
    console.error('Error signing in:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
}

/**
 * Sign out
 */
export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('Error sending password reset email:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  displayName?: string,
  photoURL?: string
): Promise<void> {
  try {
    if (!auth.currentUser) {
      throw new Error('No user is currently signed in');
    }

    await updateProfile(auth.currentUser, {
      displayName,
      photoURL,
    });

    // Update Firestore user document
    await setDoc(
      doc(db, COLLECTIONS.USERS, auth.currentUser.uid),
      {
        displayName,
        photoURL,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Update user email
 */
export async function updateUserEmail(
  newEmail: string,
  currentPassword: string
): Promise<void> {
  try {
    if (!auth.currentUser || !auth.currentUser.email) {
      throw new Error('No user is currently signed in');
    }

    // Reauthenticate user before updating email
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);

    // Update email
    await updateEmail(auth.currentUser, newEmail);

    // Update Firestore user document
    await setDoc(
      doc(db, COLLECTIONS.USERS, auth.currentUser.uid),
      {
        email: newEmail,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error: any) {
    console.error('Error updating user email:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
}

/**
 * Update user password
 */
export async function updateUserPassword(
  currentPassword: string,
  newPassword: string
): Promise<void> {
  try {
    if (!auth.currentUser || !auth.currentUser.email) {
      throw new Error('No user is currently signed in');
    }

    // Reauthenticate user before updating password
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      currentPassword
    );
    await reauthenticateWithCredential(auth.currentUser, credential);

    // Update password
    await updatePassword(auth.currentUser, newPassword);
  } catch (error: any) {
    console.error('Error updating user password:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
}

// ==================== USER DATA ====================

/**
 * Get user data from Firestore or create if doesn't exist
 */
export async function getUserData(uid: string): Promise<User> {
  try {
    const userDocRef = doc(db, COLLECTIONS.USERS, uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Auto-create user document if it doesn't exist
      const firebaseUser = auth.currentUser;
      if (!firebaseUser) {
        throw new Error('No authenticated user found');
      }

      const newUserData: Omit<User, 'createdAt' | 'lastLogin'> & { createdAt: any; lastLogin: any } = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName || 'Admin User',
        photoURL: firebaseUser.photoURL,
        emailVerified: firebaseUser.emailVerified,
        role: 'admin', // Default to admin for first user
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      };

      await setDoc(userDocRef, newUserData);

      console.log('✅ User document created automatically');

      // Return the created user data (with Timestamp.now() for client-side)
      return {
        ...newUserData,
        createdAt: { toDate: () => new Date() } as any,
        lastLogin: { toDate: () => new Date() } as any,
      } as User;
    }

    return userDoc.data() as User;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
}

/**
 * Update user's last login timestamp
 */
async function updateUserLastLogin(uid: string): Promise<void> {
  try {
    await setDoc(
      doc(db, COLLECTIONS.USERS, uid),
      {
        lastLogin: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating last login:', error);
    // Don't throw error here, as this is not critical
  }
}

/**
 * Check if user is admin
 */
export async function isUserAdmin(uid: string): Promise<boolean> {
  try {
    const userData = await getUserData(uid);
    return userData.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// ==================== AUTH STATE OBSERVER ====================

/**
 * Listen to auth state changes
 */
export function onAuthStateChange(
  callback: (user: FirebaseUser | null) => void
): () => void {
  return onAuthStateChanged(auth, callback);
}

/**
 * Get current user
 */
export function getCurrentUser(): FirebaseUser | null {
  return auth.currentUser;
}

// ==================== ERROR HANDLING ====================

/**
 * Convert Firebase auth error codes to user-friendly messages
 */
function getAuthErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/user-disabled':
      return 'This user account has been disabled.';
    case 'auth/user-not-found':
      return 'No user found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/too-many-requests':
      return 'Too many failed login attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/requires-recent-login':
      return 'This operation requires recent authentication. Please sign in again.';
    default:
      return 'An error occurred during authentication. Please try again.';
  }
}
