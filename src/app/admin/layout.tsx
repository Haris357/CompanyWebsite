'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { motion } from 'framer-motion';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import './admin-globals.css';

// Create a custom Joy UI theme with fixed light colors for admin panel
const adminTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        background: {
          body: '#ffffff',
          surface: '#ffffff',
          level1: '#f9fafb',
          level2: '#f3f4f6',
          level3: '#e5e7eb',
        },
        text: {
          primary: '#111827',
          secondary: '#6b7280',
          tertiary: '#9ca3af',
        },
      },
    },
  },
  fontFamily: {
    display: 'Inter, var(--font-geist-sans), sans-serif',
    body: 'Inter, var(--font-geist-sans), sans-serif',
  },
  components: {
    JoyInput: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          '&:hover': {
            borderColor: '#d1d5db',
          },
          '&:focus-within': {
            borderColor: '#3b82f6',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
          },
        },
      },
    },
    JoyTextarea: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          '&:hover': {
            borderColor: '#d1d5db',
          },
          '&:focus-within': {
            borderColor: '#3b82f6',
            boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
          },
        },
      },
    },
    JoyButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
    JoyCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        },
      },
    },
    JoyModal: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(4px)',
        },
      },
    },
    JoyModalDialog: {
      styleOverrides: {
        root: {
          borderRadius: '0.75rem',
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        },
      },
    },
  },
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/admin/login') {
      return;
    }

    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    // Redirect to home if not admin
    if (!loading && user && !isAdmin) {
      router.push('/');
    }
  }, [user, loading, isAdmin, router, pathname]);

  // Show loading state
  if (loading) {
    return (
      <CssVarsProvider theme={adminTheme} defaultMode="light">
        <CssBaseline />
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <motion.div
              className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-blue-500 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            <p className="text-lg font-medium text-gray-700">Loading...</p>
          </div>
        </div>
      </CssVarsProvider>
    );
  }

  // Show login page if on login route
  if (pathname === '/admin/login') {
    return (
      <CssVarsProvider theme={adminTheme} defaultMode="light">
        <CssBaseline />
        {children}
      </CssVarsProvider>
    );
  }

  // Show admin content if authenticated and admin
  if (user && isAdmin) {
    return (
      <CssVarsProvider theme={adminTheme} defaultMode="light">
        <CssBaseline />
        <div className="min-h-screen bg-gray-50">
          {/* Sidebar */}
          <Sidebar />

          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="pl-64 pt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="p-6"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </CssVarsProvider>
    );
  }

  // Return null while redirecting
  return null;
}
