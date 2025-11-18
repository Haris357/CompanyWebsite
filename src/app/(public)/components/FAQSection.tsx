'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FAQSection as FAQType } from '@/types';

interface FAQSectionProps {
  data: FAQType;
}

export default function FAQSection({ data }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div style={{ background: 'color-mix(in srgb, var(--primary-color) 10%, transparent)' }} className="absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl" />
        <div style={{ background: 'color-mix(in srgb, var(--secondary-color) 10%, transparent)' }} className="absolute bottom-1/4 right-10 w-72 h-72 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: 'var(--text-color)'
            }} className="px-4 py-2 backdrop-blur-sm border rounded-full text-sm font-medium">
              FAQ
            </span>
          </motion.div>
          <h2 style={{ color: 'var(--text-color)' }} className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            {data.title}
          </h2>
          <p style={{ color: 'var(--text-color)', opacity: 0.7 }} className="text-xl">{data.subtitle}</p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {data.faqs?.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: isOpen ? 'color-mix(in srgb, var(--primary-color) 50%, transparent)' : 'rgba(255, 255, 255, 0.1)'
                  }}
                  className="relative backdrop-blur-xl border rounded-2xl overflow-hidden transition-all duration-300"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-6 flex items-start justify-between text-left transition-colors"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <span style={
                        isOpen
                          ? {
                              background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
                              color: 'white'
                            }
                          : {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              color: 'color-mix(in srgb, var(--text-color) 70%, transparent)'
                            }
                      } className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors">
                        {index + 1}
                      </span>
                      <span style={{
                        color: isOpen ? 'var(--text-color)' : 'color-mix(in srgb, var(--text-color) 90%, transparent)'
                      }} className="text-lg font-semibold pr-8 transition-colors">
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={
                        isOpen
                          ? {
                              background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`
                            }
                          : {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }
                      }
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                    >
                      <svg style={{ color: 'white' }} className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pl-[72px]">
                          <div style={{
                            color: 'color-mix(in srgb, var(--text-color) 70%, transparent)',
                            borderLeftWidth: '2px',
                            borderLeftColor: 'color-mix(in srgb, var(--primary-color) 30%, transparent)'
                          }} className="leading-relaxed pl-6">
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p style={{ color: 'var(--text-color)', opacity: 0.7 }} className="mb-4">Still have questions?</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
              color: 'white'
            }}
            className="px-8 py-4 font-semibold rounded-xl shadow-lg transition-all"
          >
            Contact Support
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
