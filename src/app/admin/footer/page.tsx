'use client';

import { useState, useEffect } from 'react';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type FooterSection } from '@/types';

export default function FooterPage() {
  const { data: footer, loading } = useDocument<FooterSection>(COLLECTIONS.FOOTER, 'main');
  const { update, create } = useFirestore<FooterSection>(COLLECTIONS.FOOTER);

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<FooterSection>>({
    companyDescription: '',
    columns: [],
    copyrightText: '',
  });

  useEffect(() => {
    if (footer) {
      setFormData(footer);
    }
  }, [footer]);

  const handleAddColumn = () => {
    setFormData((prev) => ({
      ...prev,
      columns: [
        ...(prev.columns || []),
        {
          id: Date.now().toString(),
          title: '',
          links: [],
        },
      ],
    }));
  };

  const handleRemoveColumn = (columnId: string) => {
    setFormData((prev) => ({
      ...prev,
      columns: (prev.columns || []).filter((col) => col.id !== columnId),
    }));
  };

  const handleColumnChange = (columnId: string, field: 'title', value: string) => {
    setFormData((prev) => ({
      ...prev,
      columns: (prev.columns || []).map((col) =>
        col.id === columnId ? { ...col, [field]: value } : col
      ),
    }));
  };

  const handleAddLink = (columnId: string) => {
    setFormData((prev) => ({
      ...prev,
      columns: (prev.columns || []).map((col) =>
        col.id === columnId
          ? { ...col, links: [...col.links, { label: '', href: '' }] }
          : col
      ),
    }));
  };

  const handleRemoveLink = (columnId: string, linkIndex: number) => {
    setFormData((prev) => ({
      ...prev,
      columns: (prev.columns || []).map((col) =>
        col.id === columnId
          ? { ...col, links: col.links.filter((_, i) => i !== linkIndex) }
          : col
      ),
    }));
  };

  const handleLinkChange = (
    columnId: string,
    linkIndex: number,
    field: 'label' | 'href',
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      columns: (prev.columns || []).map((col) =>
        col.id === columnId
          ? {
              ...col,
              links: col.links.map((link, i) =>
                i === linkIndex ? { ...link, [field]: value } : link
              ),
            }
          : col
      ),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (footer) {
        await update('main', formData);
      } else {
        await create({ id: 'main', ...formData } as FooterSection);
      }
      alert('Footer updated successfully!');
    } catch (error) {
      console.error('Error saving footer:', error);
      alert('Failed to save footer');
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
    <div className="max-w-6xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Footer Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Description */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Description</h2>
          <textarea
            value={formData.companyDescription}
            onChange={(e) =>
              setFormData({ ...formData, companyDescription: e.target.value })
            }
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of your company..."
          />
        </div>

        {/* Footer Columns */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Footer Columns</h2>
            <button
              type="button"
              onClick={handleAddColumn}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              Add Column
            </button>
          </div>

          <div className="space-y-6">
            {formData.columns?.map((column, columnIndex) => (
              <div key={column.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <input
                    type="text"
                    value={column.title}
                    onChange={(e) =>
                      handleColumnChange(column.id, 'title', e.target.value)
                    }
                    placeholder="Column Title (e.g., Quick Links)"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveColumn(column.id)}
                    className="ml-3 px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors"
                  >
                    Remove Column
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700">Links</label>
                    <button
                      type="button"
                      onClick={() => handleAddLink(column.id)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                    >
                      Add Link
                    </button>
                  </div>

                  {column.links.map((link, linkIndex) => (
                    <div key={linkIndex} className="flex gap-3">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) =>
                          handleLinkChange(column.id, linkIndex, 'label', e.target.value)
                        }
                        placeholder="Link Label"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <input
                        type="text"
                        value={link.href}
                        onChange={(e) =>
                          handleLinkChange(column.id, linkIndex, 'href', e.target.value)
                        }
                        placeholder="Link URL (e.g., /about)"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveLink(column.id, linkIndex)}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}

                  {column.links.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-2">
                      No links yet. Click "Add Link" to create one.
                    </p>
                  )}
                </div>
              </div>
            ))}

            {formData.columns?.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No columns yet. Click "Add Column" to create one.
              </p>
            )}
          </div>
        </div>

        {/* Copyright Text */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Copyright Text</h2>
          <input
            type="text"
            value={formData.copyrightText}
            onChange={(e) =>
              setFormData({ ...formData, copyrightText: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="© 2024 Company Name. All rights reserved."
          />
          <p className="text-xs text-gray-500 mt-1">
            Use {'{year}'} to automatically insert the current year
          </p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {saving ? 'Saving...' : 'Save Footer'}
          </button>
        </div>
      </form>
    </div>
  );
}
