'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TestimonialsSection as TestimonialsType } from '@/types';

interface TestimonialsSectionProps {
  data: TestimonialsType;
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl" style={{
          background: `linear-gradient(to right,
            color-mix(in srgb, var(--primary-color) 10%, transparent),
            color-mix(in srgb, var(--secondary-color) 10%, transparent))`
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              backgroundColor: 'color-mix(in srgb, var(--accent-color) 10%, transparent)',
              borderColor: 'color-mix(in srgb, var(--accent-color) 20%, transparent)',
              color: 'var(--accent-color)'
            }}
            className="inline-block px-4 py-2 border rounded-full text-sm font-medium mb-4"
          >
            ⭐ Testimonials
          </motion.span>
          <h2 style={{ color: 'var(--text-color)' }} className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            {data.title}
          </h2>
          <p style={{ color: 'var(--text-color)', opacity: 0.7 }} className="text-xl max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.testimonials?.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
              className="group relative backdrop-blur-sm border rounded-3xl p-8 transition-all duration-500"
            >
              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    style={{
                      color: i < testimonial.rating ? 'var(--accent-color)' : 'color-mix(in srgb, var(--text-color) 30%, transparent)'
                    }}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>

              {/* Quote */}
              <p style={{ color: 'var(--text-color)', opacity: 0.9 }} className="mb-8 leading-relaxed text-lg">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2" style={{
                  ringColor: 'color-mix(in srgb, var(--primary-color) 30%, transparent)'
                }}>
                  <Image
                    src={testimonial.avatar || '/placeholder-avatar.jpg'}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div style={{ color: 'var(--text-color)' }} className="font-bold text-lg">
                    {testimonial.name}
                  </div>
                  <div style={{ color: 'var(--text-color)', opacity: 0.7 }} className="text-sm">
                    {testimonial.position} at <span style={{ color: 'var(--primary-color)' }}>{testimonial.company}</span>
                  </div>
                </div>
              </div>

              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-6xl font-serif" style={{
                color: 'color-mix(in srgb, var(--primary-color) 20%, transparent)'
              }}>
                "
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
