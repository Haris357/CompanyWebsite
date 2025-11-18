'use client';

import Link from 'next/link';
import { FooterSection, CompanyInfo } from '@/types';

interface FooterProps {
  footerData: FooterSection;
  companyData: CompanyInfo;
}

export default function Footer({ footerData, companyData }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--background-color)', color: 'color-mix(in srgb, var(--text-color) 70%, transparent)', borderTopColor: 'rgba(255, 255, 255, 0.1)' }} className="border-t relative overflow-hidden">
      {/* Background Glow */}
      <div style={{
        background: `linear-gradient(to right, transparent, var(--primary-color), transparent)`,
        opacity: 0.5
      }} className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px" />
      <div style={{
        background: `linear-gradient(to bottom, color-mix(in srgb, var(--primary-color) 5%, transparent), transparent)`
      }} className="absolute inset-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 style={{
              background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }} className="text-xl font-bold mb-4">
              {companyData.name}
            </h3>
            <p style={{ color: 'color-mix(in srgb, var(--text-color) 60%, transparent)' }} className="mb-4 leading-relaxed">
              {footerData.companyDescription || companyData.description}
            </p>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              {companyData.socialMedia.facebook && (
                <a
                  href={companyData.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'color-mix(in srgb, var(--text-color) 60%, transparent)' }}
                  className="transition-colors hover:scale-110 transform duration-200"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {companyData.socialMedia.twitter && (
                <a
                  href={companyData.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}
                  className="transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                  </svg>
                </a>
              )}
              {companyData.socialMedia.instagram && (
                <a
                  href={companyData.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}
                  className="transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {companyData.socialMedia.linkedin && (
                <a
                  href={companyData.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}
                  className="transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              )}
              {companyData.socialMedia.youtube && (
                <a
                  href={companyData.socialMedia.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}
                  className="transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
              {companyData.socialMedia.github && (
                <a
                  href={companyData.socialMedia.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}
                  className="transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Footer Columns */}
          {footerData.columns?.map((column) => (
            <div key={column.id}>
              <h4 style={{ color: 'var(--text-color)' }} className="font-bold mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      style={{ color: 'color-mix(in srgb, var(--text-color) 60%, transparent)' }}
                      className="transition-colors text-sm relative group inline-block"
                    >
                      {link.label}
                      <span style={{ backgroundColor: 'var(--primary-color)' }} className="absolute bottom-0 left-0 w-0 h-px group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTopColor: 'color-mix(in srgb, var(--text-color) 20%, transparent)' }} className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }} className="text-sm text-center md:text-left">
              {footerData.copyrightText.replace('{year}', currentYear.toString())}
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link
                href="/privacy"
                style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}
                className="text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }}
                className="text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
