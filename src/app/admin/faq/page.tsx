'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type FAQSection } from '@/types';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import SaveButton from '@/components/admin/SaveButton';
import SuccessMessage from '@/components/admin/SuccessMessage';

const faqSchema = z.object({
  id: z.string(),
  question: z.string().min(1, 'Question is required'),
  answer: z.string().min(10, 'Answer must be at least 10 characters'),
  order: z.number(),
});

const faqSectionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  faqs: z.array(faqSchema),
});

type FAQForm = z.infer<typeof faqSectionSchema>;

export default function FAQPage() {
  const { data: faqData, loading: loadingData } = useDocument<FAQSection>(
    COLLECTIONS.FAQ,
    'main'
  );
  const { set, loading: saving } = useFirestore<FAQSection>(COLLECTIONS.FAQ);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FAQForm>({
    resolver: zodResolver(faqSectionSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      faqs: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'faqs',
  });

  useEffect(() => {
    if (faqData) {
      reset({
        title: faqData.title || '',
        subtitle: faqData.subtitle || '',
        faqs: faqData.faqs || [],
      });
    }
  }, [faqData, reset]);

  const onSubmit = async (data: FAQForm) => {
    try {
      setSaveSuccess(false);
      await set('main', data, true);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const addFAQ = () => {
    append({
      id: `faq-${Date.now()}`,
      question: '',
      answer: '',
      order: fields.length,
    });
  };

  if (loadingData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">FAQ Management</h1>
        <p className="text-gray-600 mt-1">
          Manage frequently asked questions on your website
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Section Header</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Title *
              </label>
              <input
                {...register('title')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Frequently Asked Questions"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section Subtitle *
              </label>
              <input
                {...register('subtitle')}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Find answers to common questions about our services"
              />
              {errors.subtitle && (
                <p className="mt-1 text-sm text-red-600">{errors.subtitle.message}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* FAQs List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">FAQ Items</h2>
            <button
              type="button"
              onClick={addFAQ}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add FAQ
            </button>
          </div>

          {fields.map((field, index) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">
                  FAQ #{index + 1}
                </h3>
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
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Question *
                  </label>
                  <input
                    {...register(`faqs.${index}.question`)}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What services do you offer?"
                  />
                  {errors.faqs?.[index]?.question && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.faqs[index]?.question?.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Answer *
                  </label>
                  <textarea
                    {...register(`faqs.${index}.answer`)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="We offer a wide range of services including web development, mobile app development, and digital marketing..."
                  />
                  {errors.faqs?.[index]?.answer && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.faqs[index]?.answer?.message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {fields.length === 0 && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600 mb-4">No FAQs yet</p>
              <button
                type="button"
                onClick={addFAQ}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Your First FAQ
              </button>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <SuccessMessage show={saveSuccess} />
          <SaveButton saving={saving} />
        </div>
      </form>
    </div>
  );
}
