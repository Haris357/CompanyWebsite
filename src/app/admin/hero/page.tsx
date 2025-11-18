'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type HeroSection } from '@/types';
import ImageUpload from '@/components/admin/ImageUpload';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import SaveButton from '@/components/admin/SaveButton';
import SuccessMessage from '@/components/admin/SuccessMessage';

const heroSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  backgroundType: z.enum(['image', 'gradient', 'video', 'animated']),
  backgroundImage: z.string().optional(),
  backgroundVideo: z.string().optional(),
  gradientFrom: z.string().optional(),
  gradientTo: z.string().optional(),
  ctaButtons: z.object({
    primary: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
    secondary: z
      .object({
        label: z.string(),
        href: z.string(),
      })
      .optional(),
  }),
});

type HeroForm = z.infer<typeof heroSchema>;

export default function HeroPage() {
  const { data: heroData, loading: loadingData } = useDocument<HeroSection>(
    COLLECTIONS.HERO,
    'main'
  );
  const { set, loading: saving } = useFirestore<HeroSection>(COLLECTIONS.HERO);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<HeroForm>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      backgroundType: 'gradient',
      gradientFrom: '#667eea',
      gradientTo: '#764ba2',
      ctaButtons: {
        primary: { label: '', href: '' },
        secondary: { label: '', href: '' },
      },
    },
  });

  const backgroundType = watch('backgroundType');
  const backgroundImage = watch('backgroundImage');
  const backgroundVideo = watch('backgroundVideo');

  useEffect(() => {
    if (heroData) {
      reset({
        title: heroData.title || '',
        subtitle: heroData.subtitle || '',
        backgroundType: heroData.backgroundType || 'gradient',
        backgroundImage: heroData.backgroundImage || '',
        backgroundVideo: heroData.backgroundVideo || '',
        gradientFrom: heroData.gradientFrom || '#667eea',
        gradientTo: heroData.gradientTo || '#764ba2',
        ctaButtons: {
          primary: heroData.ctaButtons?.primary || { label: '', href: '' },
          secondary: heroData.ctaButtons?.secondary || { label: '', href: '' },
        },
      });
    }
  }, [heroData, reset]);

  const onSubmit = async (data: HeroForm) => {
    try {
      setSaveSuccess(false);
      await set('main', data, true);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving hero:', error);
    }
  };

  if (loadingData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Hero Section</h1>
        <p className="text-gray-600 mt-1">
          Customize your homepage hero section
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Main Title *
              </label>
              <input
                {...register('title')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Build Your Dream Website"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subtitle *
              </label>
              <textarea
                {...register('subtitle')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="We create stunning, high-performance websites..."
              />
              {errors.subtitle && (
                <p className="mt-1 text-sm text-red-600">{errors.subtitle.message}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Background</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Background Type *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['image', 'gradient', 'video', 'animated'].map((type) => (
                  <label
                    key={type}
                    className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      backgroundType === type
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      {...register('backgroundType')}
                      type="radio"
                      value={type}
                      className="sr-only"
                    />
                    <span className="font-medium capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {backgroundType === 'image' && (
              <ImageUpload
                value={backgroundImage}
                onChange={(url) => setValue('backgroundImage', url)}
                folder="company-website/hero"
                label="Background Image"
                helperText="Recommended: 1920x1080px or larger"
              />
            )}

            {backgroundType === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Background Video URL
                </label>
                <input
                  {...register('backgroundVideo')}
                  type="url"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://example.com/video.mp4"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Use Cloudinary or similar service for video hosting
                </p>
              </div>
            )}

            {backgroundType === 'gradient' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gradient From
                  </label>
                  <input
                    {...register('gradientFrom')}
                    type="color"
                    className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gradient To
                  </label>
                  <input
                    {...register('gradientTo')}
                    type="color"
                    className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Call-to-Action Buttons
          </h2>
          <div className="space-y-6">
            {/* Primary Button */}
            <div className="border-l-4 border-blue-600 pl-4">
              <h3 className="font-medium text-gray-900 mb-3">Primary Button</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label
                  </label>
                  <input
                    {...register('ctaButtons.primary.label')}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Get Started"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link URL
                  </label>
                  <input
                    {...register('ctaButtons.primary.href')}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="/contact"
                  />
                </div>
              </div>
            </div>

            {/* Secondary Button */}
            <div className="border-l-4 border-gray-400 pl-4">
              <h3 className="font-medium text-gray-900 mb-3">Secondary Button</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Label
                  </label>
                  <input
                    {...register('ctaButtons.secondary.label')}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Learn More"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link URL
                  </label>
                  <input
                    {...register('ctaButtons.secondary.href')}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="/about"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <SuccessMessage show={saveSuccess} />
          <SaveButton saving={saving} />
        </div>
      </form>
    </div>
  );
}
