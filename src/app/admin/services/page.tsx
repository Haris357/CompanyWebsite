'use client';

import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type ServicesSection } from '@/types';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import SaveButton from '@/components/admin/SaveButton';
import SuccessMessage from '@/components/admin/SuccessMessage';

const serviceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  icon: z.string().min(1, 'Icon is required (emoji or URL)'),
  order: z.number(),
  features: z.array(z.string()).optional(),
});

const servicesSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  services: z.array(serviceSchema),
});

type ServicesForm = z.infer<typeof servicesSchema>;

export default function ServicesPage() {
  const { data: servicesData, loading: loadingData } = useDocument<ServicesSection>(
    COLLECTIONS.SERVICES,
    'main'
  );
  const { set, loading: saving } = useFirestore<ServicesSection>(COLLECTIONS.SERVICES);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ServicesForm>({
    resolver: zodResolver(servicesSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      services: [],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'services',
  });

  useEffect(() => {
    if (servicesData) {
      reset({
        title: servicesData.title || '',
        subtitle: servicesData.subtitle || '',
        services: servicesData.services || [],
      });
    }
  }, [servicesData, reset]);

  const onSubmit = async (data: ServicesForm) => {
    try {
      setSaveSuccess(false);
      await set('main', data, true);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving services:', error);
    }
  };

  const addService = () => {
    append({
      id: `service-${Date.now()}`,
      title: '',
      description: '',
      icon: '⚡',
      order: fields.length,
      features: [],
    });
  };

  const addFeature = (serviceIndex: number) => {
    const currentFeatures = watch(`services.${serviceIndex}.features`) || [];
    setValue(`services.${serviceIndex}.features`, [...currentFeatures, '']);
  };

  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    const currentFeatures = watch(`services.${serviceIndex}.features`) || [];
    setValue(
      `services.${serviceIndex}.features`,
      currentFeatures.filter((_, i) => i !== featureIndex)
    );
  };

  if (loadingData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services Management</h1>
        <p className="text-gray-600 mt-1">
          Manage the services you offer on your website
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
                placeholder="Our Services"
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
                placeholder="What we offer to help your business grow"
              />
              {errors.subtitle && (
                <p className="mt-1 text-sm text-red-600">{errors.subtitle.message}</p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Services List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Services</h2>
            <button
              type="button"
              onClick={addService}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Service
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
                  Service #{index + 1}
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

              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      {...register(`services.${index}.title`)}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Web Development"
                    />
                    {errors.services?.[index]?.title && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.services[index]?.title?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Icon * (emoji/URL)
                    </label>
                    <input
                      {...register(`services.${index}.icon`)}
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl"
                      placeholder="⚡"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    {...register(`services.${index}.description`)}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Description of this service..."
                  />
                  {errors.services?.[index]?.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.services[index]?.description?.message}
                    </p>
                  )}
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Features (Optional)
                    </label>
                    <button
                      type="button"
                      onClick={() => addFeature(index)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                    >
                      + Add Feature
                    </button>
                  </div>
                  <div className="space-y-2">
                    {(watch(`services.${index}.features`) || []).map((_, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <input
                          {...register(`services.${index}.features.${featureIndex}` as const)}
                          type="text"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Feature description"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(index, featureIndex)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {fields.length === 0 && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600 mb-4">No services yet</p>
              <button
                type="button"
                onClick={addService}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Your First Service
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
