'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type TestimonialsSection, type Testimonial } from '@/types';
import { uploadImageClient, validateImageFile } from '@/lib/cloudinary';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import SaveButton from '@/components/admin/SaveButton';
import SuccessMessage from '@/components/admin/SuccessMessage';

const testimonialSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  company: z.string().min(1, 'Company is required'),
  position: z.string().min(1, 'Position is required'),
  quote: z.string().min(10, 'Quote must be at least 10 characters'),
  avatar: z.string().min(1, 'Avatar is required'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  order: z.number(),
});

const testimonialsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  testimonials: z.array(testimonialSchema),
});

type TestimonialsForm = z.infer<typeof testimonialsSchema>;

export default function TestimonialsPage() {
  const { data: testimonialsData, loading: loadingData } = useDocument<TestimonialsSection>(
    COLLECTIONS.TESTIMONIALS,
    'main'
  );
  const { set, loading: saving } = useFirestore<TestimonialsSection>(COLLECTIONS.TESTIMONIALS);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [modalForm, setModalForm] = useState<Partial<Testimonial>>({
    id: '',
    name: '',
    company: '',
    position: '',
    quote: '',
    avatar: '',
    rating: 5,
    order: 0,
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<TestimonialsForm>({
    resolver: zodResolver(testimonialsSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      testimonials: [],
    },
  });

  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: 'testimonials',
  });

  useEffect(() => {
    if (testimonialsData) {
      reset({
        title: testimonialsData.title || '',
        subtitle: testimonialsData.subtitle || '',
        testimonials: testimonialsData.testimonials || [],
      });
    }
  }, [testimonialsData, reset]);

  const onSubmit = async (data: TestimonialsForm) => {
    try {
      setSaveSuccess(false);
      await set('main', data, true);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving testimonials:', error);
    }
  };

  const openAddModal = () => {
    setEditingIndex(null);
    setModalForm({
      id: `testimonial-${Date.now()}`,
      name: '',
      company: '',
      position: '',
      quote: '',
      avatar: '',
      rating: 5,
      order: fields.length,
    });
    setShowModal(true);
  };

  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setModalForm(fields[index]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingIndex(null);
    setModalForm({
      id: '',
      name: '',
      company: '',
      position: '',
      quote: '',
      avatar: '',
      rating: 5,
      order: 0,
    });
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateImageFile(file);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    try {
      setUploadingAvatar(true);
      const result = await uploadImageClient(file, 'testimonials');
      setModalForm((prev) => ({ ...prev, avatar: result.url }));
    } catch (error) {
      console.error('Error uploading avatar:', error);
      alert('Failed to upload avatar. Please try again.');
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleModalSave = () => {
    if (!modalForm.name || !modalForm.company || !modalForm.position || !modalForm.quote || !modalForm.avatar) {
      alert('Please fill in all required fields and upload an avatar');
      return;
    }

    if (modalForm.quote.length < 10) {
      alert('Quote must be at least 10 characters long');
      return;
    }

    if (editingIndex !== null) {
      // Update existing testimonial
      update(editingIndex, modalForm as Testimonial);
    } else {
      // Add new testimonial
      append(modalForm as Testimonial);
    }

    closeModal();
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className="w-5 h-5"
            style={{
              color: star <= rating ? '#fbbf24' : 'rgba(255, 255, 255, 0.2)',
              fill: star <= rating ? 'currentColor' : 'none'
            }}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        ))}
      </div>
    );
  };

  if (loadingData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="admin-heading">Testimonials Management</h1>
        <p className="admin-text-muted mt-1">
          Manage customer testimonials and reviews
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="admin-card"
        >
          <h2 className="admin-subheading mb-4">Section Header</h2>
          <div className="space-y-4">
            <div>
              <label className="admin-label">
                Section Title *
              </label>
              <input
                {...register('title')}
                type="text"
                className="admin-input"
                placeholder="What Our Clients Say"
              />
              {errors.title && (
                <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="admin-label">
                Section Subtitle *
              </label>
              <input
                {...register('subtitle')}
                type="text"
                className="admin-input"
                placeholder="Trusted by businesses around the world"
              />
              {errors.subtitle && (
                <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>{errors.subtitle.message}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Testimonials List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="admin-subheading">Testimonials</h2>
            <motion.button
              type="button"
              onClick={openAddModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="admin-btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Testimonial
            </motion.button>
          </div>

          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              className="admin-card"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <img
                    src={field.avatar}
                    alt={field.name}
                    className="w-16 h-16 rounded-full object-cover border-2"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
                  />
                  <div className="flex-1">
                    <h3 className="text-base font-bold" style={{ color: 'var(--text-color)' }}>{field.name}</h3>
                    <p className="text-sm admin-text-muted">
                      {field.position} at {field.company}
                    </p>
                    <div className="mt-2">{renderStars(field.rating)}</div>
                    <p className="mt-3 text-sm admin-text italic">"{field.quote}"</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  {index > 0 && (
                    <motion.button
                      type="button"
                      onClick={() => move(index, index - 1)}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg transition-colors"
                      style={{
                        color: 'var(--text-color)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                      }}
                      title="Move up"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </motion.button>
                  )}
                  {index < fields.length - 1 && (
                    <motion.button
                      type="button"
                      onClick={() => move(index, index + 1)}
                      whileHover={{ scale: 1.1, y: 2 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg transition-colors"
                      style={{
                        color: 'var(--text-color)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)'
                      }}
                      title="Move down"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.button>
                  )}
                  <motion.button
                    type="button"
                    onClick={() => openEditModal(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg transition-colors"
                    style={{
                      color: 'var(--primary-color)',
                      backgroundColor: 'color-mix(in srgb, var(--primary-color) 10%, transparent)'
                    }}
                    title="Edit"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => remove(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg transition-colors"
                    style={{
                      color: '#ef4444',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)'
                    }}
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}

          {fields.length === 0 && (
            <div className="admin-card text-center py-12">
              <svg className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--text-color)', opacity: 0.3 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <p className="admin-text-muted mb-4">No testimonials yet</p>
              <motion.button
                type="button"
                onClick={openAddModal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="admin-btn-primary"
              >
                Add Your First Testimonial
              </motion.button>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between admin-card">
          <SuccessMessage show={saveSuccess} />
          <SaveButton saving={saving} />
        </div>
      </form>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="admin-modal-overlay"
            onClick={closeModal}
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
                  {editingIndex !== null ? 'Edit Testimonial' : 'Add Testimonial'}
                </h2>
                <motion.button
                  onClick={closeModal}
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

              <div className="admin-modal-body space-y-4">
                {/* Avatar Upload */}
                <div>
                  <label className="admin-label">
                    Avatar Image *
                  </label>
                  <div className="flex items-start gap-4">
                    {modalForm.avatar && (
                      <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={modalForm.avatar}
                        alt="Avatar preview"
                        className="w-20 h-20 rounded-full object-cover border-2"
                        style={{ borderColor: 'var(--primary-color)' }}
                      />
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        disabled={uploadingAvatar}
                        className="admin-input"
                      />
                      {uploadingAvatar && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-2 text-sm font-medium"
                          style={{ color: 'var(--primary-color)' }}
                        >
                          Uploading avatar...
                        </motion.p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="admin-label">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={modalForm.name}
                    onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                    className="admin-input"
                    placeholder="John Doe"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="admin-label">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={modalForm.company}
                    onChange={(e) => setModalForm({ ...modalForm, company: e.target.value })}
                    className="admin-input"
                    placeholder="ABC Corporation"
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="admin-label">
                    Position *
                  </label>
                  <input
                    type="text"
                    value={modalForm.position}
                    onChange={(e) => setModalForm({ ...modalForm, position: e.target.value })}
                    className="admin-input"
                    placeholder="CEO"
                  />
                </div>

                {/* Quote */}
                <div>
                  <label className="admin-label">
                    Testimonial Quote *
                  </label>
                  <textarea
                    value={modalForm.quote}
                    onChange={(e) => setModalForm({ ...modalForm, quote: e.target.value })}
                    rows={4}
                    className="admin-input"
                    placeholder="This company provided excellent service..."
                  />
                  <p className="mt-1 text-sm admin-text-muted">
                    {modalForm.quote?.length || 0} characters (minimum 10)
                  </p>
                </div>

                {/* Rating */}
                <div>
                  <label className="admin-label mb-2">
                    Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        onClick={() => setModalForm({ ...modalForm, rating: star })}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="focus:outline-none"
                      >
                        <svg
                          className="w-8 h-8 transition-colors"
                          style={{
                            color: star <= (modalForm.rating || 0) ? '#fbbf24' : 'rgba(255, 255, 255, 0.2)',
                            fill: star <= (modalForm.rating || 0) ? 'currentColor' : 'none'
                          }}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      </motion.button>
                    ))}
                    <span className="ml-2 text-sm admin-text-muted">
                      {modalForm.rating} out of 5
                    </span>
                  </div>
                </div>
              </div>

              <div className="admin-modal-footer">
                <motion.button
                  type="button"
                  onClick={closeModal}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="admin-btn-secondary"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleModalSave}
                  disabled={uploadingAvatar}
                  whileHover={{ scale: uploadingAvatar ? 1 : 1.02 }}
                  whileTap={{ scale: uploadingAvatar ? 1 : 0.98 }}
                  className="admin-btn-primary"
                >
                  {editingIndex !== null ? 'Update Testimonial' : 'Add Testimonial'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
