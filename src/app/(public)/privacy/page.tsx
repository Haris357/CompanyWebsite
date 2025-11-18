'use client';

import { motion } from 'framer-motion';
import { useDocument } from '@/hooks/useFirestore';
import { COLLECTIONS, type CompanyInfo } from '@/types';
import { Shield, Eye, Lock, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { data: companyInfo } = useDocument<CompanyInfo>(COLLECTIONS.COMPANY_INFO, 'main');

  const contactEmail = companyInfo?.email || 'privacy@company.com';

  const sections = [
    {
      icon: Eye,
      title: 'What We Collect',
      text: 'Name, email, payment info, and usage data.',
    },
    {
      icon: Shield,
      title: 'How We Use It',
      text: 'To provide services, process orders, and improve your experience.',
    },
    {
      icon: Lock,
      title: 'Security',
      text: 'We use encryption and security measures to protect your data.',
    },
    {
      icon: Mail,
      title: 'Contact',
      text: `Questions? Email us at ${contactEmail}`,
    },
  ];

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block p-4 rounded-full mb-6"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <Shield className="w-12 h-12" style={{ color: 'var(--primary-color)' }} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ color: 'var(--text-color)' }}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          Privacy Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: 'var(--text-color)', opacity: 0.7 }}
          className="text-sm"
        >
          We respect your privacy. Here's how we handle your data.
        </motion.p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl border backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(255, 255, 255, 0.1)'
                }}
              >
                <div
                  className="inline-flex p-3 rounded-lg mb-4"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 style={{ color: 'var(--text-color)' }} className="text-lg font-semibold mb-2">
                  {section.title}
                </h3>
                <p style={{ color: 'var(--text-color)', opacity: 0.7 }} className="text-sm leading-relaxed">
                  {section.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl border text-center"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <p style={{ color: 'var(--text-color)', opacity: 0.8 }} className="text-sm">
            Last updated: October 2025 · Contact:{' '}
            <a
              href={`mailto:${contactEmail}`}
              style={{ color: 'var(--primary-color)' }}
              className="underline hover:opacity-80"
            >
              {contactEmail}
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
