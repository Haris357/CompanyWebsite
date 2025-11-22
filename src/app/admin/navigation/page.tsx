'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type NavigationSettings, type NavigationLink } from '@/types';
import Image from 'next/image';

export default function NavigationAdminPage() {
  const router = useRouter();
  const { data: navData, loading } = useDocument<NavigationSettings>(
    COLLECTIONS.NAVIGATION,
    'main'
  );
  const { update } = useFirestore<NavigationSettings>(COLLECTIONS.NAVIGATION);

  const [logo, setLogo] = useState('');
  const [links, setLinks] = useState<NavigationLink[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (navData) {
      setLogo(navData.logo || '');
      setLinks(navData.links || []);
    }
  }, [navData]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
      );
      formData.append('folder', 'company-website/logo');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setLogo(data.secure_url);
      setMessage('Logo uploaded successfully! Click Save to apply changes.');
    } catch (error) {
      console.error('Error uploading image:', error);
      setMessage('Failed to upload logo. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleAddLink = () => {
    const newLink: NavigationLink = {
      id: `link-${Date.now()}`,
      label: '',
      href: '',
      order: links.length,
      isExternal: false,
      openInNewTab: false,
    };
    setLinks([...links, newLink]);
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter(link => link.id !== id));
  };

  const handleLinkChange = (id: string, field: keyof NavigationLink, value: any) => {
    setLinks(links.map(link =>
      link.id === id ? { ...link, [field]: value } : link
    ));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      await update('main', { logo, links });
      setMessage('Navigation settings saved successfully!');
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 1500);
    } catch (error) {
      console.error('Error saving:', error);
      setMessage('Failed to save navigation. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/admin/dashboard')}
            className="text-blue-600 hover:text-blue-700 mb-4 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Navigation Settings</h1>
          <p className="text-gray-600 mt-2">Manage your website logo and navigation</p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.includes('success')
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message}
          </div>
        )}

        {/* Logo Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Website Logo</h2>

          {/* Current Logo */}
          {logo && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Logo
              </label>
              <div className="relative h-20 w-64 bg-gray-100 rounded-lg border-2 border-gray-200 p-2">
                <Image
                  src={logo}
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          )}

          {/* Upload New Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload New Logo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="mt-2 text-sm text-gray-500">
              Recommended: PNG or SVG with transparent background, max 200px height
            </p>
          </div>

          {uploading && (
            <div className="mt-4 flex items-center text-blue-600">
              <svg
                className="animate-spin h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Uploading logo...
            </div>
          )}
        </div>

        {/* Logo URL (Manual Input) */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Or Enter Logo URL Manually
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo URL
            </label>
            <input
              type="url"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              placeholder="https://res.cloudinary.com/..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="mt-2 text-sm text-gray-500">
              Paste your Cloudinary or Firebase Storage URL here
            </p>
          </div>
        </div>

        {/* Navigation Links Management */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Navigation Links</h2>
              <p className="text-sm text-gray-600 mt-1">Manage your website navigation menu</p>
            </div>
            <button
              onClick={handleAddLink}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              + Add Link
            </button>
          </div>

          <div className="space-y-4">
            {links.map((link, index) => (
              <div key={link.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-700">Link {index + 1}</span>
                  <button
                    onClick={() => handleRemoveLink(link.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Label *
                    </label>
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => handleLinkChange(link.id, 'label', e.target.value)}
                      placeholder="Home, About, Services..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Link / URL *
                    </label>
                    <input
                      type="text"
                      value={link.href}
                      onChange={(e) => handleLinkChange(link.id, 'href', e.target.value)}
                      placeholder="/about or https://..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Order
                    </label>
                    <input
                      type="number"
                      value={link.order}
                      onChange={(e) => handleLinkChange(link.id, 'order', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={link.isExternal}
                        onChange={(e) => handleLinkChange(link.id, 'isExternal', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">External Link</span>
                    </label>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={link.openInNewTab}
                        onChange={(e) => handleLinkChange(link.id, 'openInNewTab', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Open in New Tab</span>
                    </label>
                  </div>
                </div>
              </div>
            ))}

            {links.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No navigation links yet. Click "Add Link" to create one.
              </div>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving || !logo}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
