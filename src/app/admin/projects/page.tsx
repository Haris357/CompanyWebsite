'use client';

import { useState } from 'react';
import { useCollection, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type Project } from '@/types';
import { orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { uploadImageClient } from '@/lib/cloudinary';
import LoadingSpinner from '@/components/admin/LoadingSpinner';

export default function ProjectsPage() {
  const { data: projects = [], loading } = useCollection<Project>(
    COLLECTIONS.PROJECTS,
    [orderBy('order', 'asc')]
  );
  const { create, update, remove } = useFirestore<Project>(COLLECTIONS.PROJECTS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    longDescription: '',
    images: [],
    category: '',
    tags: [],
    liveUrl: '',
    githubUrl: '',
    order: 0,
    featured: false,
  });

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData(project);
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        longDescription: '',
        images: [],
        category: '',
        tags: [],
        liveUrl: '',
        githubUrl: '',
        order: projects.length,
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      longDescription: '',
      images: [],
      category: '',
      tags: [],
      liveUrl: '',
      githubUrl: '',
      order: 0,
      featured: false,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const result = await uploadImageClient(file, 'projects');
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), result.url],
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (imageUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((url) => url !== imageUrl),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProject) {
        await update(editingProject.id, formData);
      } else {
        await create(formData as Omit<Project, 'id' | 'createdAt'>);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await remove(id);
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="admin-heading">Projects</h1>
        <p className="admin-text-muted mt-1">
          Manage your portfolio projects
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <motion.button
          onClick={() => handleOpenModal()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="admin-btn-primary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Project
        </motion.button>
      </div>

      {projects.length === 0 ? (
        <div className="admin-card text-center py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <svg className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--text-color)', opacity: 0.3 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-color)' }}>No projects yet</h3>
            <p className="admin-text-muted mb-6">Get started by adding your first project</p>
            <motion.button
              onClick={() => handleOpenModal()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="admin-btn-primary inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Project
            </motion.button>
          </motion.div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -4 }}
            className="admin-card overflow-hidden"
          >
            {project.images && project.images[0] && (
              <div className="relative h-48 -m-6 mb-4">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-color)' }}>
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="px-2 py-1 text-xs font-bold rounded-lg" style={{
                    backgroundColor: 'color-mix(in srgb, var(--accent-color) 20%, transparent)',
                    color: 'var(--accent-color)'
                  }}>
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm admin-text mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags?.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-lg admin-text-muted"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <motion.button
                  onClick={() => handleOpenModal(project)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 py-2 text-sm font-bold rounded-lg transition-colors"
                  style={{
                    color: 'var(--primary-color)',
                    backgroundColor: 'color-mix(in srgb, var(--primary-color) 10%, transparent)'
                  }}
                >
                  Edit
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(project.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-3 py-2 text-sm font-bold rounded-lg transition-colors"
                  style={{
                    color: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)'
                  }}
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="admin-modal-overlay"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="admin-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="admin-modal-header">
                <h2 className="admin-modal-title">
                  {editingProject ? 'Edit Project' : 'Add Project'}
                </h2>
                <motion.button
                  onClick={handleCloseModal}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-xl transition-colors"
                  style={{
                    color: 'var(--text-color)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              <form onSubmit={handleSubmit} className="admin-modal-body space-y-4">
                <div>
                  <label className="admin-label">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="admin-input"
                    placeholder="Project Title"
                  />
                </div>

                <div>
                  <label className="admin-label">Short Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="admin-input"
                    placeholder="Brief description for the card"
                  />
                </div>

                <div>
                  <label className="admin-label">Long Description</label>
                  <textarea
                    value={formData.longDescription}
                    onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                    rows={5}
                    className="admin-input"
                    placeholder="Detailed description (optional)"
                  />
                </div>

                <div>
                  <label className="admin-label">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="admin-input"
                    placeholder="e.g., Web Development"
                  />
                </div>

                <div>
                  <label className="admin-label">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags?.join(', ')}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tags: e.target.value.split(',').map((t) => t.trim()),
                      })
                    }
                    className="admin-input"
                    placeholder="React, TypeScript, Next.js"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="admin-label">Live URL</label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="admin-input"
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <label className="admin-label">GitHub URL</label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="admin-input"
                      placeholder="https://github.com/user/repo"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="admin-label">Order</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="admin-input"
                    />
                  </div>

                  <div className="flex items-center pt-7">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded focus:ring-2"
                      style={{ accentColor: 'var(--primary-color)' }}
                    />
                    <label htmlFor="featured" className="ml-2 admin-label mb-0">
                      Featured Project
                    </label>
                  </div>
                </div>

                <div>
                  <label className="admin-label">Images</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="admin-input"
                  />
                  {uploading && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-sm font-medium" style={{ color: 'var(--primary-color)' }}>
                      Uploading image...
                    </motion.p>
                  )}
                  {formData.images && formData.images.length > 0 && (
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {formData.images.map((url, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="relative group"
                        >
                          <img
                            src={url}
                            alt={`Project ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg border-2"
                            style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                          />
                          <motion.button
                            type="button"
                            onClick={() => handleRemoveImage(url)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-1 right-1 p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-white"
                            style={{ backgroundColor: '#ef4444' }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </motion.button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </form>

              <div className="admin-modal-footer">
                <motion.button
                  type="button"
                  onClick={handleCloseModal}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="admin-btn-secondary"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={uploading}
                  whileHover={{ scale: uploading ? 1 : 1.02 }}
                  whileTap={{ scale: uploading ? 1 : 0.98 }}
                  className="admin-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? 'Uploading...' : editingProject ? 'Update Project' : 'Create Project'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
