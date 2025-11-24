import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { CompanyInfo, SEOSettings } from "@/types";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  fallback: ["Inter Placeholder", "sans-serif"],
});

// Dynamic metadata from Firestore
export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch company info
    const companyQuery = query(collection(db, "companyInfo"), limit(1));
    const companySnapshot = await getDocs(companyQuery);
    const companyData = companySnapshot.docs[0]?.data() as CompanyInfo;

    // Fetch SEO settings
    const seoQuery = query(collection(db, "seo"), limit(1));
    const seoSnapshot = await getDocs(seoQuery);
    const seoData = seoSnapshot.docs[0]?.data() as SEOSettings;

    const title = seoData?.title || companyData?.name || "Company Website";
    const description = seoData?.description || companyData?.description || "A fully customizable company showcase website";
    const logo = companyData?.logo;

    return {
      title,
      description,
      keywords: seoData?.keywords || [],
      authors: seoData?.author ? [{ name: seoData.author }] : undefined,
      openGraph: {
        title,
        description,
        images: logo ? [logo] : undefined,
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: logo ? [logo] : undefined,
      },
      icons: logo ? {
        icon: logo,
        shortcut: logo,
        apple: logo,
      } : undefined,
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "Company Website",
      description: "A fully customizable company showcase website",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
