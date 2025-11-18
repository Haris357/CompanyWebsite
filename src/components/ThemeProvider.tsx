'use client';

import { useEffect } from 'react';
import { useDocument } from '@/hooks/useFirestore';
import { COLLECTIONS, type ThemeSettings } from '@/types';

// Default theme values
const DEFAULT_THEME = {
  primaryColor: '#8b5cf6',
  secondaryColor: '#3b82f6',
  accentColor: '#06b6d4',
  backgroundColor: '#000000',
  textColor: '#ffffff',
  headingFont: 'Inter',
  bodyFont: 'Inter',
  borderRadius: 'md' as const,
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { data: theme } = useDocument<ThemeSettings>(COLLECTIONS.THEME_SETTINGS, 'main');

  useEffect(() => {
    // Use theme from Firestore or fall back to defaults
    const activeTheme = theme || DEFAULT_THEME;

    // Apply theme colors to CSS variables
    document.documentElement.style.setProperty('--primary-color', activeTheme.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', activeTheme.secondaryColor);
    document.documentElement.style.setProperty('--accent-color', activeTheme.accentColor);
    document.documentElement.style.setProperty('--background-color', activeTheme.backgroundColor);
    document.documentElement.style.setProperty('--text-color', activeTheme.textColor);

    // Apply fonts
    if (activeTheme.headingFont) {
      document.documentElement.style.setProperty('--heading-font', activeTheme.headingFont);
    }
    if (activeTheme.bodyFont) {
      document.documentElement.style.setProperty('--body-font', activeTheme.bodyFont);
    }

    // Apply border radius
    const radiusMap = {
      none: '0px',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    };
    document.documentElement.style.setProperty('--border-radius', radiusMap[activeTheme.borderRadius] || radiusMap.md);
  }, [theme]);

  return <>{children}</>;
}
