// ==================== CLIENT-SIDE CLOUDINARY FUNCTIONS ====================
// This file only contains client-side upload functions
// Server-side operations should be in API routes

// ==================== CLIENT-SIDE UPLOAD ====================

/**
 * Upload image to Cloudinary from client side using unsigned upload
 * Returns the secure URL of the uploaded image
 */
export async function uploadImageClient(
  file: File,
  folder: string = 'company-website'
): Promise<{
  url: string;
  publicId: string;
  width: number;
  height: number;
}> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
    formData.append('folder', folder);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    const data = await response.json();

    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
    };
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
}

/**
 * Upload multiple images to Cloudinary
 */
export async function uploadMultipleImagesClient(
  files: File[],
  folder: string = 'company-website'
): Promise<
  {
    url: string;
    publicId: string;
    width: number;
    height: number;
  }[]
> {
  try {
    const uploadPromises = files.map((file) => uploadImageClient(file, folder));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
}

// ==================== IMAGE TRANSFORMATION ====================

/**
 * Generate optimized image URL with transformations
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: 'scale' | 'fit' | 'fill' | 'crop' | 'thumb';
    quality?: 'auto' | number;
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    gravity?: 'auto' | 'face' | 'center';
  } = {}
): string {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
    gravity = 'auto',
  } = options;

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const transformations: string[] = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`c_${crop}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);
  transformations.push(`g_${gravity}`);

  const transformationString = transformations.join(',');

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformationString}/${publicId}`;
}

/**
 * Generate thumbnail URL
 */
export function getThumbnailUrl(
  publicId: string,
  size: number = 200
): string {
  return getOptimizedImageUrl(publicId, {
    width: size,
    height: size,
    crop: 'thumb',
    quality: 'auto',
    format: 'auto',
    gravity: 'face',
  });
}

/**
 * Generate responsive image URLs for srcset
 */
export function getResponsiveImageUrls(
  publicId: string,
  widths: number[] = [640, 768, 1024, 1280, 1536]
): { src: string; srcset: string } {
  const srcset = widths
    .map((width) => {
      const url = getOptimizedImageUrl(publicId, { width, quality: 'auto', format: 'auto' });
      return `${url} ${width}w`;
    })
    .join(', ');

  const src = getOptimizedImageUrl(publicId, {
    width: widths[Math.floor(widths.length / 2)],
    quality: 'auto',
    format: 'auto',
  });

  return { src, srcset };
}

// ==================== VIDEO UPLOAD ====================

/**
 * Upload video to Cloudinary from client side
 */
export async function uploadVideoClient(
  file: File,
  folder: string = 'company-website/videos'
): Promise<{
  url: string;
  publicId: string;
  duration: number;
}> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '');
    formData.append('folder', folder);
    formData.append('resource_type', 'video');

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Failed to upload video to Cloudinary');
    }

    const data = await response.json();

    return {
      url: data.secure_url,
      publicId: data.public_id,
      duration: data.duration,
    };
  } catch (error) {
    console.error('Error uploading video to Cloudinary:', error);
    throw error;
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Extract public ID from Cloudinary URL
 */
export function extractPublicId(cloudinaryUrl: string): string {
  const parts = cloudinaryUrl.split('/');
  const uploadIndex = parts.indexOf('upload');

  if (uploadIndex === -1) {
    throw new Error('Invalid Cloudinary URL');
  }

  // Get everything after 'upload' and any transformation parameters
  const afterUpload = parts.slice(uploadIndex + 1);

  // Skip transformation parameters (they contain commas or start with specific letters)
  const startIndex = afterUpload.findIndex(
    (part) => !part.includes('_') || part.split('_').length <= 2
  );

  const publicIdParts = afterUpload.slice(startIndex);
  const publicIdWithExtension = publicIdParts.join('/');

  // Remove file extension
  return publicIdWithExtension.replace(/\.[^/.]+$/, '');
}

/**
 * Validate file type
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload a JPEG, PNG, WebP, or GIF image.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 10MB. Please upload a smaller image.',
    };
  }

  return { valid: true };
}

/**
 * Validate video file
 */
export function validateVideoFile(file: File): { valid: boolean; error?: string } {
  const validTypes = ['video/mp4', 'video/webm', 'video/ogg'];
  const maxSize = 100 * 1024 * 1024; // 100MB

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload an MP4, WebM, or OGG video.',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 100MB. Please upload a smaller video.',
    };
  }

  return { valid: true };
}
