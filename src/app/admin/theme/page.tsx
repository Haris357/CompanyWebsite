'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type ThemeSettings } from '@/types';

// Available font options
const FONT_OPTIONS = [
  { label: 'Inter', value: 'Inter, sans-serif' },
  { label: 'Roboto', value: 'Roboto, sans-serif' },
  { label: 'Poppins', value: 'Poppins, sans-serif' },
  { label: 'Montserrat', value: 'Montserrat, sans-serif' },
  { label: 'Open Sans', value: 'Open Sans, sans-serif' },
  { label: 'Lato', value: 'Lato, sans-serif' },
  { label: 'Source Sans Pro', value: 'Source Sans Pro, sans-serif' },
  { label: 'Raleway', value: 'Raleway, sans-serif' },
  { label: 'PT Sans', value: 'PT Sans, sans-serif' },
  { label: 'Nunito', value: 'Nunito, sans-serif' },
  { label: 'Playfair Display', value: 'Playfair Display, serif' },
  { label: 'Merriweather', value: 'Merriweather, serif' },
  { label: 'Ubuntu', value: 'Ubuntu, sans-serif' },
  { label: 'Work Sans', value: 'Work Sans, sans-serif' },
  { label: 'Manrope', value: 'Manrope, sans-serif' },
];

// Border radius options
const BORDER_RADIUS_OPTIONS = [
  { label: 'None', value: 'none' as const, description: 'Sharp corners' },
  { label: 'Small', value: 'sm' as const, description: 'Subtle rounded' },
  { label: 'Medium', value: 'md' as const, description: 'Moderately rounded' },
  { label: 'Large', value: 'lg' as const, description: 'Very rounded' },
  { label: 'Extra Large', value: 'xl' as const, description: 'Heavily rounded' },
  { label: 'Full', value: 'full' as const, description: 'Fully rounded' },
];

// Validation schema
const themeSettingsSchema = z.object({
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
  accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
  textColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Invalid color format'),
  headingFont: z.string().min(1, 'Heading font is required'),
  bodyFont: z.string().min(1, 'Body font is required'),
  borderRadius: z.enum(['none', 'sm', 'md', 'lg', 'xl', 'full']),
});

type ThemeSettingsForm = z.infer<typeof themeSettingsSchema>;

export default function ThemeSettingsPage() {
  const { data: themeSettings, loading: loadingData } = useDocument<ThemeSettings>(
    COLLECTIONS.THEME_SETTINGS,
    'main'
  );
  const { set, loading: saving } = useFirestore<ThemeSettings>(COLLECTIONS.THEME_SETTINGS);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ThemeSettingsForm>({
    resolver: zodResolver(themeSettingsSchema),
    defaultValues: {
      primaryColor: '#8b5cf6',
      secondaryColor: '#3b82f6',
      accentColor: '#06b6d4',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      headingFont: 'Inter, sans-serif',
      bodyFont: 'Inter, sans-serif',
      borderRadius: 'md',
    },
  });

  // Watch all form values for live preview
  const primaryColor = watch('primaryColor');
  const secondaryColor = watch('secondaryColor');
  const accentColor = watch('accentColor');
  const backgroundColor = watch('backgroundColor');
  const textColor = watch('textColor');
  const headingFont = watch('headingFont');
  const bodyFont = watch('bodyFont');
  const borderRadius = watch('borderRadius');

  // Load existing data
  useEffect(() => {
    if (themeSettings) {
      reset({
        primaryColor: themeSettings.primaryColor || '#8b5cf6',
        secondaryColor: themeSettings.secondaryColor || '#3b82f6',
        accentColor: themeSettings.accentColor || '#06b6d4',
        backgroundColor: themeSettings.backgroundColor || '#000000',
        textColor: themeSettings.textColor || '#ffffff',
        headingFont: themeSettings.headingFont || 'Inter, sans-serif',
        bodyFont: themeSettings.bodyFont || 'Inter, sans-serif',
        borderRadius: themeSettings.borderRadius || 'md',
      });
    }
  }, [themeSettings, reset]);

  const onSubmit = async (data: ThemeSettingsForm) => {
    try {
      setSaveSuccess(false);
      await set('main', data, true);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving theme settings:', error);
    }
  };

  // Get border radius CSS value
  const getBorderRadiusValue = (radius: string) => {
    const radiusMap = {
      none: '0px',
      sm: '0.125rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    };
    return radiusMap[radius as keyof typeof radiusMap] || '0.375rem';
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Theme Settings</h1>
        <p className="text-gray-600 mt-1">
          Customize colors, fonts, and styling for your website
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Colors Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Color Palette</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Primary Color */}
                <div>
                  <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      {...register('primaryColor')}
                      type="color"
                      id="primaryColor"
                      className="h-12 w-20 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={primaryColor}
                      onChange={(e) => setValue('primaryColor', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      placeholder="#3B82F6"
                    />
                  </div>
                  {errors.primaryColor && (
                    <p className="mt-1 text-sm text-red-600">{errors.primaryColor.message}</p>
                  )}
                </div>

                {/* Secondary Color */}
                <div>
                  <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      {...register('secondaryColor')}
                      type="color"
                      id="secondaryColor"
                      className="h-12 w-20 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={secondaryColor}
                      onChange={(e) => setValue('secondaryColor', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      placeholder="#8B5CF6"
                    />
                  </div>
                  {errors.secondaryColor && (
                    <p className="mt-1 text-sm text-red-600">{errors.secondaryColor.message}</p>
                  )}
                </div>

                {/* Accent Color */}
                <div>
                  <label htmlFor="accentColor" className="block text-sm font-medium text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      {...register('accentColor')}
                      type="color"
                      id="accentColor"
                      className="h-12 w-20 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setValue('accentColor', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      placeholder="#F59E0B"
                    />
                  </div>
                  {errors.accentColor && (
                    <p className="mt-1 text-sm text-red-600">{errors.accentColor.message}</p>
                  )}
                </div>

                {/* Background Color */}
                <div>
                  <label htmlFor="backgroundColor" className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      {...register('backgroundColor')}
                      type="color"
                      id="backgroundColor"
                      className="h-12 w-20 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setValue('backgroundColor', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      placeholder="#FFFFFF"
                    />
                  </div>
                  {errors.backgroundColor && (
                    <p className="mt-1 text-sm text-red-600">{errors.backgroundColor.message}</p>
                  )}
                </div>

                {/* Text Color */}
                <div className="sm:col-span-2">
                  <label htmlFor="textColor" className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      {...register('textColor')}
                      type="color"
                      id="textColor"
                      className="h-12 w-20 rounded-lg border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setValue('textColor', e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                      placeholder="#1F2937"
                    />
                  </div>
                  {errors.textColor && (
                    <p className="mt-1 text-sm text-red-600">{errors.textColor.message}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Typography Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Typography</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Heading Font */}
                <div>
                  <label htmlFor="headingFont" className="block text-sm font-medium text-gray-700 mb-2">
                    Heading Font
                  </label>
                  <select
                    {...register('headingFont')}
                    id="headingFont"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {FONT_OPTIONS.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                  {errors.headingFont && (
                    <p className="mt-1 text-sm text-red-600">{errors.headingFont.message}</p>
                  )}
                </div>

                {/* Body Font */}
                <div>
                  <label htmlFor="bodyFont" className="block text-sm font-medium text-gray-700 mb-2">
                    Body Font
                  </label>
                  <select
                    {...register('bodyFont')}
                    id="bodyFont"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {FONT_OPTIONS.map((font) => (
                      <option key={font.value} value={font.value}>
                        {font.label}
                      </option>
                    ))}
                  </select>
                  {errors.bodyFont && (
                    <p className="mt-1 text-sm text-red-600">{errors.bodyFont.message}</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Border Radius Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Border Radius</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {BORDER_RADIUS_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className={`relative flex flex-col items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      borderRadius === option.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      {...register('borderRadius')}
                      value={option.value}
                      className="sr-only"
                    />
                    <div
                      className="w-12 h-12 bg-blue-600 mb-2"
                      style={{ borderRadius: getBorderRadiusValue(option.value) }}
                    />
                    <span className="text-sm font-medium text-gray-900">{option.label}</span>
                    <span className="text-xs text-gray-500 text-center mt-1">
                      {option.description}
                    </span>
                  </label>
                ))}
              </div>
              {errors.borderRadius && (
                <p className="mt-2 text-sm text-red-600">{errors.borderRadius.message}</p>
              )}
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div>
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center space-x-2 text-green-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-medium">Theme saved successfully!</span>
                  </motion.div>
                )}
              </div>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save Theme
                  </>
                )}
              </button>
            </motion.div>
          </form>
        </div>

        {/* Live Preview Section */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-6"
          >
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h2>

              {/* Preview Container */}
              <div
                className="border-2 border-gray-200 rounded-lg p-6 space-y-4"
                style={{ backgroundColor }}
              >
                {/* Heading Preview */}
                <div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: textColor, fontFamily: headingFont }}
                  >
                    Heading Example
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: textColor, fontFamily: bodyFont }}
                  >
                    This is how your body text will look with the selected font and colors.
                  </p>
                </div>

                {/* Button Previews */}
                <div className="space-y-2">
                  <button
                    className="w-full px-4 py-2 text-white font-medium transition-colors"
                    style={{
                      backgroundColor: primaryColor,
                      borderRadius: getBorderRadiusValue(borderRadius),
                    }}
                  >
                    Primary Button
                  </button>

                  <button
                    className="w-full px-4 py-2 text-white font-medium transition-colors"
                    style={{
                      backgroundColor: secondaryColor,
                      borderRadius: getBorderRadiusValue(borderRadius),
                    }}
                  >
                    Secondary Button
                  </button>

                  <button
                    className="w-full px-4 py-2 text-white font-medium transition-colors"
                    style={{
                      backgroundColor: accentColor,
                      borderRadius: getBorderRadiusValue(borderRadius),
                    }}
                  >
                    Accent Button
                  </button>
                </div>

                {/* Card Preview */}
                <div
                  className="p-4 border-2"
                  style={{
                    borderColor: primaryColor,
                    borderRadius: getBorderRadiusValue(borderRadius),
                  }}
                >
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: primaryColor, fontFamily: headingFont }}
                  >
                    Card Title
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: textColor, fontFamily: bodyFont }}
                  >
                    Sample card content with border using primary color.
                  </p>
                </div>

                {/* Color Swatches */}
                <div>
                  <p
                    className="text-xs font-medium mb-2"
                    style={{ color: textColor, fontFamily: bodyFont }}
                  >
                    Color Palette
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    <div>
                      <div
                        className="w-full h-10 border border-gray-300"
                        style={{
                          backgroundColor: primaryColor,
                          borderRadius: getBorderRadiusValue(borderRadius),
                        }}
                      />
                      <p className="text-xs text-center mt-1" style={{ color: textColor }}>
                        Primary
                      </p>
                    </div>
                    <div>
                      <div
                        className="w-full h-10 border border-gray-300"
                        style={{
                          backgroundColor: secondaryColor,
                          borderRadius: getBorderRadiusValue(borderRadius),
                        }}
                      />
                      <p className="text-xs text-center mt-1" style={{ color: textColor }}>
                        Secondary
                      </p>
                    </div>
                    <div>
                      <div
                        className="w-full h-10 border border-gray-300"
                        style={{
                          backgroundColor: accentColor,
                          borderRadius: getBorderRadiusValue(borderRadius),
                        }}
                      />
                      <p className="text-xs text-center mt-1" style={{ color: textColor }}>
                        Accent
                      </p>
                    </div>
                    <div>
                      <div
                        className="w-full h-10 border border-gray-300"
                        style={{
                          backgroundColor: backgroundColor,
                          borderRadius: getBorderRadiusValue(borderRadius),
                        }}
                      />
                      <p className="text-xs text-center mt-1" style={{ color: textColor }}>
                        BG
                      </p>
                    </div>
                    <div>
                      <div
                        className="w-full h-10 border border-gray-300"
                        style={{
                          backgroundColor: textColor,
                          borderRadius: getBorderRadiusValue(borderRadius),
                        }}
                      />
                      <p className="text-xs text-center mt-1" style={{ color: textColor }}>
                        Text
                      </p>
                    </div>
                  </div>
                </div>

                {/* Typography Sample */}
                <div className="pt-4 border-t border-gray-300">
                  <p
                    className="text-xs mb-2"
                    style={{ color: textColor, fontFamily: headingFont }}
                  >
                    <strong>Heading Font:</strong> {headingFont.split(',')[0]}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: textColor, fontFamily: bodyFont }}
                  >
                    <strong>Body Font:</strong> {bodyFont.split(',')[0]}
                  </p>
                </div>
              </div>

              {/* Info Text */}
              <p className="text-xs text-gray-500 mt-4 text-center">
                Changes are previewed in real-time. Click Save to apply.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
