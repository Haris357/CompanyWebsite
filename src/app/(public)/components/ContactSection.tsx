'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ContactSection as ContactType } from '@/types';

interface ContactSectionProps {
  data: ContactType;
}

export default function ContactSection({ data }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', phone: '', address: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundColor: 'var(--background-color)' }}>
      {/* Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          style={{ background: 'color-mix(in srgb, var(--primary-color) 20%, transparent)' }}
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
          style={{ background: 'color-mix(in srgb, var(--secondary-color) 20%, transparent)' }}
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
              Get In Touch
            </span>
          </motion.div>
          <h2 style={{ color: 'var(--text-color)' }} className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            {data.title}
          </h2>
          <p style={{ color: 'var(--text-color)', opacity: 0.7 }} className="text-xl max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Email Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
              className="backdrop-blur-xl border rounded-2xl p-6 transition-all group"
            >
              <div style={{
                background: `linear-gradient(to bottom right, var(--primary-color), var(--secondary-color))`
              }} className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg style={{ color: 'white' }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 style={{ color: 'var(--text-color)' }} className="text-lg font-semibold mb-2">Email</h4>
              <a href={`mailto:${data.email}`} style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }} className="transition-colors">
                {data.email}
              </a>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
              className="backdrop-blur-xl border rounded-2xl p-6 transition-all group"
            >
              <div style={{
                background: `linear-gradient(to bottom right, var(--secondary-color), var(--accent-color))`
              }} className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg style={{ color: 'white' }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 style={{ color: 'var(--text-color)' }} className="text-lg font-semibold mb-2">Phone</h4>
              <a href={`tel:${data.phone}`} style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }} className="transition-colors">
                {data.phone}
              </a>
            </motion.div>

            {/* Address Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
              className="backdrop-blur-xl border rounded-2xl p-6 transition-all group"
            >
              <div style={{
                background: `linear-gradient(to bottom right, var(--accent-color), var(--primary-color))`
              }} className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg style={{ color: 'white' }} className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 style={{ color: 'var(--text-color)' }} className="text-lg font-semibold mb-2">Location</h4>
              <p style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }} className="text-sm leading-relaxed">{data.address}</p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          {data.showContactForm && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-8"
            >
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }} className="backdrop-blur-xl border rounded-3xl p-8 transition-all">
                <h3 style={{ color: 'var(--text-color)' }} className="text-2xl font-bold mb-6">Send us a Message</h3>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      backgroundColor: 'color-mix(in srgb, green 10%, transparent)',
                      borderColor: 'color-mix(in srgb, green 20%, transparent)',
                      color: 'green'
                    }}
                    className="mb-6 p-4 border rounded-xl flex items-center"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Thanks! We'll get back to you soon.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label style={{ color: 'var(--text-color)' }} className="block text-sm font-medium mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          color: 'var(--text-color)'
                        }}
                        className="w-full px-4 py-3 border rounded-xl transition-all outline-none focus:border-[color-mix(in_srgb,var(--primary-color),transparent)]"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ color: 'var(--text-color)' }} className="block text-sm font-medium mb-2">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          color: 'var(--text-color)'
                        }}
                        className="w-full px-4 py-3 border rounded-xl transition-all outline-none focus:border-[color-mix(in_srgb,var(--primary-color),transparent)]"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label style={{ color: 'var(--text-color)' }} className="block text-sm font-medium mb-2">Your Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          color: 'var(--text-color)'
                        }}
                        className="w-full px-4 py-3 border rounded-xl transition-all outline-none focus:border-[color-mix(in_srgb,var(--primary-color),transparent)]"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label style={{ color: 'var(--text-color)' }} className="block text-sm font-medium mb-2">Your Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          borderColor: 'rgba(255, 255, 255, 0.1)',
                          color: 'var(--text-color)'
                        }}
                        className="w-full px-4 py-3 border rounded-xl transition-all outline-none focus:border-[color-mix(in_srgb,var(--primary-color),transparent)]"
                        placeholder="123 Main St, City, State"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label style={{ color: 'var(--text-color)' }} className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'var(--text-color)'
                      }}
                      className="w-full px-4 py-3 border rounded-xl transition-all outline-none focus:border-[color-mix(in_srgb,var(--primary-color),transparent)]"
                      placeholder="How can we help?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ color: 'var(--text-color)' }} className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        color: 'var(--text-color)'
                      }}
                      className="w-full px-4 py-3 border rounded-xl transition-all outline-none resize-none focus:border-[color-mix(in_srgb,var(--primary-color),transparent)]"
                      placeholder="Tell us more about your project..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      background: `linear-gradient(to right, var(--primary-color), var(--secondary-color))`,
                      color: 'white'
                    }}
                    className="w-full px-8 py-4 font-semibold rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center">
                        <svg style={{ color: 'white' }} className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Google Map */}
              {data.mapEmbedUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  }}
                  className="backdrop-blur-xl border rounded-3xl overflow-hidden transition-all"
                >
                  <div className="p-6 pb-4">
                    <h3 style={{ color: 'var(--text-color)' }} className="text-2xl font-bold mb-2">Find Us Here</h3>
                    <p style={{ color: 'var(--text-color)', opacity: 0.7 }} className="text-sm">
                      Visit our location or drop by anytime
                    </p>
                  </div>
                  <div className="px-2 pb-2">
                    <iframe
                      src={data.mapEmbedUrl}
                      width="100%"
                      height="400"
                      style={{ border: 0, borderRadius: '1.5rem' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full"
                      title="Google Maps Location"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
