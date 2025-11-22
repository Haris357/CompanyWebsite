'use client';

import { useState, useEffect } from 'react';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type AboutSection } from '@/types';
import { uploadImageClient } from '@/lib/cloudinary';

export default function AboutPage() {
  const { data: about, loading } = useDocument<AboutSection>(COLLECTIONS.ABOUT, 'main');
  const { update, create } = useFirestore<AboutSection>(COLLECTIONS.ABOUT);

  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<AboutSection>>({
    title: '',
    subtitle: '',
    content: '',
    image: '',
    stats: [],
    featuresTitle: '',
    featuresSubtitle: '',
    features: [],
  });

  useEffect(() => {
    if (about) {
      setFormData(about);
    }
  }, [about]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadImageClient(file, 'about');
      setFormData((prev) => ({ ...prev, image: result.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleAddStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...(prev.stats || []), { label: '', value: '' }],
    }));
  };

  const handleRemoveStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: (prev.stats || []).filter((_, i) => i !== index),
    }));
  };

  const handleStatChange = (index: number, field: 'label' | 'value', value: string) => {
    setFormData((prev) => ({
      ...prev,
      stats: (prev.stats || []).map((stat, i) =>
        i === index ? { ...stat, [field]: value } : stat
      ),
    }));
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), { icon: '', title: '', description: '' }],
    }));
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index),
    }));
  };

  const handleFeatureChange = (index: number, field: 'icon' | 'title' | 'description', value: string) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).map((feature, i) =>
        i === index ? { ...feature, [field]: value } : feature
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (about) {
        await update('main', formData);
      } else {
        await create({ id: 'main', ...formData } as AboutSection);
      }
      alert('About section updated successfully!');
    } catch (error) {
      console.error('Error saving about section:', error);
      alert('Failed to save about section');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About Section</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtitle
          </label>
          <input
            type="text"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
          {formData.image && (
            <img
              src={formData.image}
              alt="About"
              className="mt-3 w-full max-w-md h-64 object-cover rounded-lg"
            />
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Stats (Show on About section)</label>
            <button
              type="button"
              onClick={handleAddStat}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Stat
            </button>
          </div>
          <div className="space-y-3">
            {formData.stats?.map((stat, index) => (
              <div key={index} className="flex gap-3 items-start">
                <input
                  type="text"
                  placeholder="Value (e.g., 10+)"
                  value={stat.value}
                  onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Label (e.g., Years Experience)"
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveStat(index)}
                  className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section Header */}
        <div className="border-t pt-6 mt-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose Us Section</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title
              </label>
              <input
                type="text"
                placeholder="Why Choose Us"
                value={formData.featuresTitle || ''}
                onChange={(e) => setFormData({ ...formData, featuresTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Subtitle
              </label>
              <input
                type="text"
                placeholder="We combine expertise, innovation, and dedication..."
                value={formData.featuresSubtitle || ''}
                onChange={(e) => setFormData({ ...formData, featuresSubtitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Features Cards */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">Feature Cards (4 recommended)</label>
            <button
              type="button"
              onClick={handleAddFeature}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add Feature
            </button>
          </div>
          <div className="space-y-4">
            {formData.features?.map((feature, index) => (
              <div key={index} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-700">Feature {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="px-3 py-1 bg-red-50 text-red-600 text-sm rounded hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Icon (emoji like 🎯 or text)"
                    value={feature.icon}
                    onChange={(e) => handleFeatureChange(index, 'icon', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Title (e.g., Strategic Planning)"
                    value={feature.title}
                    onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <textarea
                    placeholder="Description"
                    value={feature.description}
                    onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          Save About Section
        </button>
      </form>
    </div>
  );
}
