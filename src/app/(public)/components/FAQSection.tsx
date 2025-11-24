'use client';

import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import { FAQSection as FAQType } from '@/types';

interface FAQSectionProps {
  data: FAQType;
}

export default function FAQSection({ data }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="py-12 sm:py-16 md:py-24 lg:py-32 relative overflow-hidden bg-black">
      {/* Background Decoration */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-15"
        style={{ background: 'var(--accent-color)' }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 px-4 sm:px-0">
            {data.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto px-4 sm:px-0">
            {data.subtitle}
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {data.faqs?.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div
                  className={`relative modern-card overflow-hidden transition-all duration-300 ${
                    isOpen ? 'ring-2 ring-primary/50' : ''
                  }`}
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between text-left gap-2 sm:gap-4"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 flex-1 min-w-0">
                      <motion.div
                        animate={{
                          scale: isOpen ? 1.1 : 1,
                        }}
                        className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm sm:text-base text-white"
                        style={{
                          background: isOpen
                            ? `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                            : 'rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        {index + 1}
                      </motion.div>
                      <span className={`text-sm sm:text-base md:text-lg lg:text-xl font-semibold transition-colors ${
                        isOpen ? 'text-white' : 'text-gray-300'
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center"
                      style={{
                        background: isOpen
                          ? `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                          : 'rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                        <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-5 md:pb-6 pl-12 sm:pl-16 md:pl-[88px] lg:pl-[104px]">
                          <div className="text-gray-400 text-sm sm:text-base leading-relaxed pl-3 sm:pl-4 md:pl-6 border-l-2"
                            style={{
                              borderColor: 'var(--primary-color)'
                            }}
                          >
                            {faq.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Gradient glow on hover */}
                  {isOpen && (
                    <div
                      className="absolute inset-0 opacity-5 pointer-events-none"
                      style={{
                        background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
                      }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-12 sm:mt-16 text-center px-4"
        >
          <p className="text-gray-400 mb-4 sm:mb-6 text-base sm:text-lg">Still have questions?</p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base text-white"
            style={{
              background: `linear-gradient(135deg, var(--primary-color), var(--secondary-color))`
            }}
          >
            <span>Contact Support</span>
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
