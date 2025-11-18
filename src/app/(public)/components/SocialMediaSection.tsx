'use client';

import { motion } from 'framer-motion';
import { SocialMediaSection as SocialMediaType } from '@/types';

interface SocialMediaSectionProps {
  data: SocialMediaType;
}

export default function SocialMediaSection({ data }: SocialMediaSectionProps) {
  const activePosts = data.posts?.filter(post => post.isActive) || [];

  if (activePosts.length === 0) {
    return null;
  }

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
          style={{ background: 'color-mix(in srgb, var(--secondary-color) 20%, transparent)' }}
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
          style={{ background: 'color-mix(in srgb, var(--primary-color) 20%, transparent)' }}
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
              Stay Connected
            </span>
          </motion.div>
          <h2 style={{ color: 'var(--text-color)' }} className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            {data.title}
          </h2>
          <p style={{ color: 'var(--text-color)', opacity: 0.7 }} className="text-xl max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </motion.div>

        {/* Social Media Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.1)'
              }}
              className="backdrop-blur-xl border rounded-2xl p-6 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                {/* Platform Icon */}
                <div style={{
                  background: `linear-gradient(to bottom right, var(--secondary-color), var(--primary-color))`
                }} className="w-10 h-10 rounded-lg flex items-center justify-center">
                  {post.platform === 'twitter' || post.platform === 'x' ? (
                    <svg style={{ color: 'white' }} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ) : post.platform === 'linkedin' ? (
                    <svg style={{ color: 'white' }} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ) : (
                    <svg style={{ color: 'white' }} className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                </div>
                <span style={{ color: 'color-mix(in srgb, var(--text-color) 70%, transparent)' }} className="text-sm font-medium capitalize">
                  {post.platform === 'x' ? 'X (Twitter)' : post.platform}
                </span>
              </div>

              {/* Embedded Post Preview */}
              <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }} className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <iframe
                  src={getEmbedUrl(post.postUrl, post.platform)}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                />
              </div>

              {/* View Original Button */}
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-color)'
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-all group"
              >
                View Original Post
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function to generate embed URLs
function getEmbedUrl(postUrl: string, platform: string): string {
  try {
    if (platform === 'twitter' || platform === 'x') {
      // Twitter/X embed
      return `https://platform.twitter.com/embed/Tweet.html?url=${encodeURIComponent(postUrl)}`;
    } else if (platform === 'linkedin') {
      // LinkedIn embed
      return `https://www.linkedin.com/embed/feed/update/${encodeURIComponent(postUrl)}`;
    } else if (platform === 'facebook') {
      // Facebook embed
      return `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(postUrl)}&width=500`;
    }
    return postUrl;
  } catch (error) {
    console.error('Error generating embed URL:', error);
    return postUrl;
  }
}
