'use client';

import { useState, useEffect } from 'react';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type SocialMediaSection, type SocialMediaPost } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

export default function SocialMediaPage() {
  const { data: socialMedia, loading } = useDocument<SocialMediaSection>(COLLECTIONS.SOCIAL_MEDIA, 'main');
  const { update, create } = useFirestore<SocialMediaSection>(COLLECTIONS.SOCIAL_MEDIA);

  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<SocialMediaPost | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [formData, setFormData] = useState<Partial<SocialMediaSection>>({
    title: '',
    subtitle: '',
    posts: [],
  });

  const [postForm, setPostForm] = useState<Omit<SocialMediaPost, 'id'>>({
    platform: 'twitter',
    postUrl: '',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    if (socialMedia) {
      setFormData(socialMedia);
    }
  }, [socialMedia]);

  const handleOpenModal = (post?: SocialMediaPost, index?: number) => {
    if (post && index !== undefined) {
      setEditingPost(post);
      setEditingIndex(index);
      setPostForm({
        platform: post.platform,
        postUrl: post.postUrl,
        order: post.order,
        isActive: post.isActive,
      });
    } else {
      setEditingPost(null);
      setEditingIndex(null);
      setPostForm({
        platform: 'twitter',
        postUrl: '',
        order: formData.posts?.length || 0,
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
    setEditingIndex(null);
    setPostForm({
      platform: 'twitter',
      postUrl: '',
      order: 0,
      isActive: true,
    });
  };

  const handleSavePost = () => {
    const newPost: SocialMediaPost = {
      id: editingPost?.id || `post-${Date.now()}`,
      ...postForm,
    };

    let updatedPosts = [...(formData.posts || [])];

    if (editingIndex !== null) {
      updatedPosts[editingIndex] = newPost;
    } else {
      updatedPosts.push(newPost);
    }

    setFormData({ ...formData, posts: updatedPosts });
    handleCloseModal();
  };

  const handleDeletePost = (index: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const updatedPosts = formData.posts?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, posts: updatedPosts });
  };

  const handleToggleActive = (index: number) => {
    const updatedPosts = [...(formData.posts || [])];
    updatedPosts[index] = {
      ...updatedPosts[index],
      isActive: !updatedPosts[index].isActive,
    };
    setFormData({ ...formData, posts: updatedPosts });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (socialMedia) {
        await update('main', formData);
      } else {
        await create({ id: 'main', ...formData } as SocialMediaSection);
      }
      alert('Social media settings updated successfully!');
    } catch (error) {
      console.error('Error saving social media settings:', error);
      alert('Failed to save social media settings');
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
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Social Media Posts</h1>
      <p className="text-gray-600 mb-6">Manage social media posts displayed on your website</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section Info */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Section Settings</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Follow Our Journey"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Section Subtitle *
            </label>
            <textarea
              required
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Stay updated with our latest news and insights"
            />
          </div>
        </div>

        {/* Social Media Posts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Social Media Posts</h2>
            <button
              type="button"
              onClick={() => handleOpenModal()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Add Post
            </button>
          </div>

          {formData.posts && formData.posts.length > 0 ? (
            <div className="space-y-3">
              {formData.posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`border rounded-lg p-4 ${
                    post.isActive ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded capitalize">
                          {post.platform === 'x' ? 'X (Twitter)' : post.platform}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          post.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <a
                        href={post.postUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline break-all"
                      >
                        {post.postUrl}
                      </a>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        type="button"
                        onClick={() => handleToggleActive(index)}
                        className={`px-3 py-1 text-sm rounded transition-colors ${
                          post.isActive
                            ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
                            : 'bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                      >
                        {post.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenModal(post, index)}
                        className="px-3 py-1 text-sm bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeletePost(index)}
                        className="px-3 py-1 text-sm bg-red-50 text-red-700 rounded hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No social media posts added yet. Click "Add Post" to get started.
            </p>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {saving ? 'Saving...' : 'Save Social Media Settings'}
          </button>
        </div>
      </form>

      {/* Add/Edit Post Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {editingPost ? 'Edit Post' : 'Add Post'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Platform *
                  </label>
                  <select
                    required
                    value={postForm.platform}
                    onChange={(e) => setPostForm({ ...postForm, platform: e.target.value as any })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="twitter">Twitter</option>
                    <option value="x">X (formerly Twitter)</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="facebook">Facebook</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Post URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={postForm.postUrl}
                    onChange={(e) => setPostForm({ ...postForm, postUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://twitter.com/username/status/123456789"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Paste the full URL of the social media post
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={postForm.order}
                    onChange={(e) => setPostForm({ ...postForm, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={postForm.isActive}
                    onChange={(e) => setPostForm({ ...postForm, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                    Display this post on the website
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSavePost}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingPost ? 'Update' : 'Add'} Post
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
