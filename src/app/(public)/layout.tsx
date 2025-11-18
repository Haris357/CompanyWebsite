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
      {navigation && companyInfo && (
        <Navigation data={navigation} companyInfo={companyInfo} />
      )}
      <main>{children}</main>
      {footer && companyInfo && (
        <Footer footerData={footer} companyData={companyInfo} />
      )}
    </ThemeProvider>
  );
}
