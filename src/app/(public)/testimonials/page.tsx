'use client';

import { useDocument } from '@/hooks/useFirestore';
import { COLLECTIONS, type TestimonialsSection as TestimonialsType } from '@/types';
import TestimonialsSection from '../components/TestimonialsSection';
import { motion } from 'framer-motion';

export default function TestimonialsPage() {
  const { data: testimonials, loading } = useDocument<TestimonialsType>(
    COLLECTIONS.TESTIMONIALS,
    'main'
  );

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--background-color)' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 rounded-full"
          style={{
            borderColor: 'var(--primary-color)',
            borderTopColor: 'transparent'
          }}
        />
      </div>
    );
  }

  if (!testimonials) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: 'var(--background-color)' }}
      >
        <p style={{ color: 'var(--text-color)' }} className="text-xl">
          No testimonials available
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <TestimonialsSection data={testimonials} />
    </div>
  );
}
