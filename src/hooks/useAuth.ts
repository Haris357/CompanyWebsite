'use client';

import { useState, useEffect, useCallback } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  signIn as authSignIn,
  signOut as authSignOut,
  resetPassword as authResetPassword,
  onAuthStateChange,
  getCurrentUser,
  getUserData,
  isUserAdmin,
} from '@/lib/auth';
import type { User, AuthState } from '@/types/firebase';

/**
 * Custom hook for authentication
 * Manages user state, login, logout, and authentication-related operations
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userData = await getUserData(firebaseUser.uid);
          setAuthState({
            user: userData,
            loading: false,
            error: null,
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setAuthState({
            user: null,
            loading: false,
            error: error as Error,
          });
        }
      } else {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  /**
   * Sign in with email and password
   */
  const signIn = useCallback(
    async (email: string, password: string, rememberMe: boolean = false) => {
      try {
        setAuthState((prev) => ({ ...prev, loading: true, error: null }));
        const user = await authSignIn(email, password, rememberMe);
        setAuthState({
          user,
          loading: false,
          error: null,
        });
        return user;
      } catch (error) {
        setAuthState((prev) => ({
          ...prev,
          loading: false,
          error: error as Error,
        }));
        throw error;
      }
    },
    []
  );

  /**
   * Sign out
   */
  const signOut = useCallback(async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));
      await authSignOut();
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error as Error,
      }));
      throw error;
    }
  }, []);

  /**
   * Send password reset email
   */
  const resetPassword = useCallback(async (email: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));
      await authResetPassword(email);
      setAuthState((prev) => ({ ...prev, loading: false }));
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error as Error,
      }));
      throw error;
    }
  }, []);

  /**
   * Check if current user is admin
   */
  const checkIsAdmin = useCallback(async (): Promise<boolean> => {
    if (!authState.user) return false;
    try {
      return await isUserAdmin(authState.user.uid);
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  }, [authState.user]);

  /**
   * Refresh user data
   */
  const refreshUser = useCallback(async () => {
    const firebaseUser = getCurrentUser();
    if (firebaseUser) {
      try {
        const userData = await getUserData(firebaseUser.uid);
        setAuthState((prev) => ({
          ...prev,
          user: userData,
        }));
      } catch (error) {
        console.error('Error refreshing user data:', error);
      }
    }
  }, []);

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    isAuthenticated: !!authState.user,
    isAdmin: authState.user?.role === 'admin',
    signIn,
    signOut,
    resetPassword,
    checkIsAdmin,
    refreshUser,
  };
}
