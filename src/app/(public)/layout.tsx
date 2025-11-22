'use client';

import { useDocument } from '@/hooks/useFirestore';
import {
  COLLECTIONS,
  type CompanyInfo,
  type NavigationSettings,
  type FooterSection,
} from '@/types';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import ThemeProvider from '@/components/ThemeProvider';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: companyInfo } = useDocument<CompanyInfo>(
    COLLECTIONS.COMPANY_INFO,
    'main'
  );
  const { data: navigation } = useDocument<NavigationSettings>(
    COLLECTIONS.NAVIGATION,
    'main'
  );
  const { data: footer } = useDocument<FooterSection>(
    COLLECTIONS.FOOTER,
    'main'
  );

  return (
    <ThemeProvider>
      <div className="min-h-screen cursor-none" style={{
        background: 'var(--background-color)',
        color: 'var(--text-color)'
      }}>
        <PageLoader />
        <CustomCursor />
        {navigation && companyInfo && (
          <Navigation data={navigation} companyInfo={companyInfo} />
        )}
        <main>{children}</main>
        {footer && companyInfo && (
          <Footer footerData={footer} companyData={companyInfo} />
        )}
      </div>
    </ThemeProvider>
  );
}
