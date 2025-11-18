import { Timestamp } from 'firebase/firestore';

// Firebase Configuration Types
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// User Types
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: Timestamp;
  lastLogin: Timestamp;
  role: 'admin' | 'user';
}

// Auth State
export interface AuthState {
  user: User | null;
  loading: boolean;
  error: Error | null;
}
