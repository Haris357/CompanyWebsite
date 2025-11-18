'use client';

import { useState, useEffect } from 'react';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type SEOSettings } from '@/types';
import { uploadImageClient } from '@/lib/cloudinary';

export default function SEOPage() {
  const { data: seo, loading } = useDocument<SEOSettings>(COLLECTIONS.SEO, 'main');
  const { update, create } = useFirestore<SEOSettings>(COLLECTIONS.SEO);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SEOSettings>>({
    metaTitle: '',
    metaDescription: '',
    metaKeywords: [],
    ogImage: '',
    favicon: '',
  });

  useEffect(() => {
    if (seo) {
      setFormData(seo);
    }
  }, [seo]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'ogImage' | 'favicon') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(field);
      const result = await uploadImageClient(file, 'seo');
      setFormData((prev) => ({ ...prev, [field]: result.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (seo) {
        await update('main', formData);
      } else {
        await create({ id: 'main', ...formData } as SEOSettings);
      }
      alert('SEO settings updated successfully!');
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      alert('Failed to save SEO settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">SEO Settings</h1>
      <p className="text-gray-600 mb-6">Optimize your website for search engines and social sharing</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meta Tags */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Meta Tags</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Title *
            </label>
            <input
              type="text"
              required
              value={formData.metaTitle}
              onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your Company Name - Tagline"
              maxLength={60}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.metaTitle?.length || 0}/60 characters (Recommended: 50-60)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Description *
            </label>
            <textarea
              required
              value={formData.metaDescription}
              onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description of your company and services..."
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.metaDescription?.length || 0}/160 characters (Recommended: 150-160)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meta Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={formData.metaKeywords?.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  metaKeywords: e.target.value.split(',').map((k) => k.trim()).filter(Boolean),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="web development, design, digital agency"
            />
            <p className="text-xs text-gray-500 mt-1">
              Separate keywords with commas (5-10 keywords recommended)
            </p>
          </div>
        </div>

        {/* Open Graph / Social Media */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media Preview</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              OG Image (Social Media Preview)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, 'ogImage')}
              disabled={uploading === 'ogImage'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {uploading === 'ogImage' && (
              <p className="text-sm text-blue-600 mt-1">Uploading...</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 1200x630px. This image appears when sharing on Facebook, Twitter, LinkedIn, etc.
            </p>
            {formData.ogImage && (
              <img
                src={formData.ogImage}
                alt="OG Image Preview"
                className="mt-3 w-full max-w-md h-48 object-cover rounded-lg border border-gray-200"
              />
            )}
          </div>
        </div>

        {/* Favicon */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Browser Icon</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Favicon
            </label>
            <input
              type="file"
              accept="image/x-icon,image/png"
              onChange={(e) => handleImageUpload(e, 'favicon')}
              disabled={uploading === 'favicon'}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {uploading === 'favicon' && (
              <p className="text-sm text-blue-600 mt-1">Uploading...</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Recommended: 32x32px or 16x16px. Appears in browser tabs and bookmarks.
            </p>
            {formData.favicon && (
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={formData.favicon}
                  alt="Favicon Preview"
                  className="w-8 h-8 object-contain"
                />
                <span className="text-sm text-gray-600">Favicon preview</span>
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving || uploading !== null}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {saving ? 'Saving...' : 'Save SEO Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
