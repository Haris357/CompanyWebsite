'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type TeamSection, type TeamMember } from '@/types';
import { uploadImageClient, validateImageFile } from '@/lib/cloudinary';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import SaveButton from '@/components/admin/SaveButton';
import SuccessMessage from '@/components/admin/SuccessMessage';

// Validation schemas
const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  position: z.string().min(1, 'Position is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatar: z.string().min(1, 'Avatar image is required'),
  socialMedia: z.object({
    linkedin: z.string().optional(),
    twitter: z.string().optional(),
    github: z.string().optional(),
  }),
  order: z.number(),
});

const teamSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  members: z.array(teamMemberSchema),
});

type TeamForm = z.infer<typeof teamSchema>;

// Modal component for adding/editing team members
interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (member: TeamMember) => void;
  member: TeamMember | null;
}

function MemberModal({ isOpen, onClose, onSave, member }: MemberModalProps) {
  const [formData, setFormData] = useState<TeamMember>({
    id: '',
    name: '',
    position: '',
    bio: '',
    avatar: '',
    socialMedia: {
      linkedin: '',
      twitter: '',
      github: '',
    },
    order: 0,
  });
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (member) {
      setFormData(member);
    } else {
      setFormData({
        id: `member-${Date.now()}`,
        name: '',
        position: '',
        bio: '',
        avatar: '',
        socialMedia: {
          linkedin: '',
          twitter: '',
          github: '',
        },
        order: 0,
      });
    }
    setErrors({});
    setUploadError('');
  }, [member, isOpen]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error || 'Invalid file');
      return;
    }

    try {
      setUploading(true);
      setUploadError('');
      const result = await uploadImageClient(file, 'team');
      setFormData((prev) => ({ ...prev, avatar: result.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length < 10) {
      newErrors.bio = 'Bio must be at least 10 characters';
    }
    if (!formData.avatar) {
      newErrors.avatar = 'Avatar image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="admin-modal-overlay"
      onClick={onClose}
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
            {member ? 'Edit Team Member' : 'Add Team Member'}
          </h2>
          <motion.button
            onClick={onClose}
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
          {/* Name */}
          <div>
            <label className="admin-label">
              Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="admin-input"
              placeholder="John Doe"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm font-medium"
                style={{ color: '#ef4444' }}
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="admin-label">
              Position *
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="admin-input"
              placeholder="Senior Developer"
            />
            {errors.position && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm font-medium"
                style={{ color: '#ef4444' }}
              >
                {errors.position}
              </motion.p>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="admin-label">
              Bio *
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="admin-input"
              placeholder="Brief biography about this team member..."
            />
            {errors.bio && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm font-medium"
                style={{ color: '#ef4444' }}
              >
                {errors.bio}
              </motion.p>
            )}
          </div>

          {/* Avatar Upload */}
          <div>
            <label className="admin-label">
              Avatar Image *
            </label>
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
            {uploadError && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm font-medium" style={{ color: '#ef4444' }}>
                {uploadError}
              </motion.p>
            )}
            {errors.avatar && (
              <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm font-medium" style={{ color: '#ef4444' }}>
                {errors.avatar}
              </motion.p>
            )}
            {formData.avatar && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-3">
                <img
                  src={formData.avatar}
                  alt="Avatar preview"
                  className="w-32 h-32 object-cover rounded-full border-2"
                  style={{ borderColor: 'var(--primary-color)' }}
                />
              </motion.div>
            )}
          </div>

          {/* Social Media */}
          <div className="border-t pt-4" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <h3 className="admin-subheading mb-3">Social Media Links (Optional)</h3>

            <div className="space-y-3">
              {/* LinkedIn */}
              <div>
                <label className="admin-label">LinkedIn URL</label>
                <input
                  type="url"
                  value={formData.socialMedia.linkedin || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, linkedin: e.target.value }
                  })}
                  className="admin-input"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              {/* Twitter */}
              <div>
                <label className="admin-label">Twitter URL</label>
                <input
                  type="url"
                  value={formData.socialMedia.twitter || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, twitter: e.target.value }
                  })}
                  className="admin-input"
                  placeholder="https://twitter.com/username"
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="admin-label">GitHub URL</label>
                <input
                  type="url"
                  value={formData.socialMedia.github || ''}
                  onChange={(e) => setFormData({
                    ...formData,
                    socialMedia: { ...formData.socialMedia, github: e.target.value }
                  })}
                  className="admin-input"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="admin-modal-footer">
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="admin-btn-secondary"
          >
            Cancel
          </motion.button>
          <motion.button
            onClick={handleSave}
            disabled={uploading}
            whileHover={{ scale: uploading ? 1 : 1.02 }}
            whileTap={{ scale: uploading ? 1 : 0.98 }}
            className="admin-btn-primary"
          >
            {member ? 'Update Member' : 'Add Member'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Team Management Page
export default function TeamPage() {
  const { data: teamData, loading: loadingData } = useDocument<TeamSection>(
    COLLECTIONS.TEAM,
    'main'
  );
  const { set, loading: saving } = useFirestore<TeamSection>(COLLECTIONS.TEAM);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<TeamForm>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      members: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'members',
  });

  useEffect(() => {
    if (teamData) {
      reset({
        title: teamData.title || '',
        subtitle: teamData.subtitle || '',
        members: teamData.members || [],
      });
    }
  }, [teamData, reset]);

  const onSubmit = async (data: TeamForm) => {
    try {
      setSaveSuccess(false);
      // Update order for all members
      const membersWithOrder = data.members.map((member, index) => ({
        ...member,
        order: index,
      }));
      await set('main', { ...data, members: membersWithOrder }, true);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving team:', error);
      alert('Failed to save team section. Please try again.');
    }
  };

  const handleAddMember = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleEditMember = (index: number) => {
    setEditingMember(watch(`members.${index}`));
    setIsModalOpen(true);
  };

  const handleSaveMember = (member: TeamMember) => {
    const members = watch('members');
    const existingIndex = members.findIndex((m) => m.id === member.id);

    if (existingIndex >= 0) {
      // Update existing member
      setValue(`members.${existingIndex}`, member);
    } else {
      // Add new member
      append({ ...member, order: fields.length });
    }
  };

  const handleDeleteMember = (index: number) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      remove(index);
    }
  };

  if (loadingData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="admin-heading">Team Management</h1>
        <p className="admin-text-muted mt-1">
          Manage your team members and their profiles
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
                placeholder="Our Team"
              />
              {errors.title && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm font-medium" style={{ color: '#ef4444' }}>
                  {errors.title.message}
                </motion.p>
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
                placeholder="Meet the people behind our success"
              />
              {errors.subtitle && (
                <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm font-medium" style={{ color: '#ef4444' }}>
                  {errors.subtitle.message}
                </motion.p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Team Members List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="admin-subheading">Team Members</h2>
            <motion.button
              type="button"
              onClick={handleAddMember}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="admin-btn-primary flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Team Member
            </motion.button>
          </div>

          {fields.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field, index) => {
                const member = watch(`members.${index}`);
                return (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    className="admin-card"
                  >
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <img
                        src={member.avatar || '/placeholder-avatar.png'}
                        alt={member.name}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      />

                      {/* Member Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold truncate" style={{ color: 'var(--text-color)' }}>
                          {member.name || 'Unnamed Member'}
                        </h3>
                        <p className="text-sm admin-text mb-2">{member.position || 'No position'}</p>
                        <p className="text-sm admin-text-muted line-clamp-2">{member.bio || 'No bio'}</p>

                        {/* Social Links */}
                        {(member.socialMedia?.linkedin || member.socialMedia?.twitter || member.socialMedia?.github) && (
                          <div className="flex items-center gap-2 mt-3">
                            {member.socialMedia.linkedin && (
                              <a
                                href={member.socialMedia.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-700"
                                title="LinkedIn"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                              </a>
                            )}
                            {member.socialMedia.twitter && (
                              <a
                                href={member.socialMedia.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-500"
                                title="Twitter"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                                </svg>
                              </a>
                            )}
                            {member.socialMedia.github && (
                              <a
                                href={member.socialMedia.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-700 hover:text-gray-900"
                                title="GitHub"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
                      <div className="flex items-center gap-2">
                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => move(index, index - 1)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            title="Move up"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                        )}
                        {index < fields.length - 1 && (
                          <button
                            type="button"
                            onClick={() => move(index, index + 1)}
                            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg"
                            title="Move down"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <motion.button
                          type="button"
                          onClick={() => handleEditMember(index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 text-sm font-bold rounded-lg transition-colors"
                          style={{ color: 'var(--primary-color)', backgroundColor: 'color-mix(in srgb, var(--primary-color) 10%, transparent)' }}
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          type="button"
                          onClick={() => handleDeleteMember(index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1.5 text-sm font-bold rounded-lg transition-colors"
                          style={{ color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        >
                          Delete
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-600 mb-4">No team members yet</p>
              <motion.button
                type="button"
                onClick={handleAddMember}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="admin-btn-primary"
              >
                Add Your First Team Member
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

      {/* Member Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <MemberModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveMember}
            member={editingMember}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
