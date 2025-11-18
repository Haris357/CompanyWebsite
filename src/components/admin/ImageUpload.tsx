'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { uploadImageClient, validateImageFile } from '@/lib/cloudinary';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/joy/Box';
import FormLabel from '@mui/joy/FormLabel';
import Alert from '@mui/joy/Alert';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import CircularProgress from '@mui/joy/CircularProgress';
import Typography from '@mui/joy/Typography';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';

interface ImageUploadProps {
  value?: string; // Current image URL
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
  helperText?: string;
  aspectRatio?: string; // e.g., "aspect-square", "aspect-video"
}

export default function ImageUpload({
  value,
  onChange,
  folder = 'company-website',
  label = 'Upload Image',
  helperText = 'PNG, JPG, WebP up to 10MB',
  aspectRatio = 'aspect-video',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = useCallback(
    async (file: File) => {
      setError(null);

      // Validate file
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setError(validation.error || 'Invalid file');
        return;
      }

      try {
        setUploading(true);
        const result = await uploadImageClient(file, folder);
        onChange(result.url);
      } catch (err: any) {
        setError(err.message || 'Failed to upload image');
      } finally {
        setUploading(false);
      }
    },
    [folder, onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleUpload(e.dataTransfer.files[0]);
      }
    },
    [handleUpload]
  );

  const handleRemove = () => {
    onChange('');
    setError(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {label && (
        <FormLabel sx={{ fontWeight: 700 }}>{label}</FormLabel>
      )}

      {value ? (
        // Image Preview
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ position: 'relative' }}
        >
          <Box
            sx={{
              position: 'relative',
              aspectRatio: aspectRatio.replace('aspect-', '').replace('video', '16/9').replace('square', '1/1'),
              width: '100%',
              overflow: 'hidden',
              borderRadius: '1rem',
              border: '2px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Image
              src={value}
              alt="Uploaded image"
              fill
              className="object-cover"
            />
          </Box>

          {/* Remove Button */}
          <IconButton
            onClick={handleRemove}
            color="danger"
            variant="solid"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Change Button */}
          <Button
            component="label"
            variant="soft"
            size="sm"
            sx={{
              position: 'absolute',
              bottom: 12,
              right: 12,
              backdropFilter: 'blur(12px)',
            }}
          >
            Change
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
              disabled={uploading}
            />
          </Button>
        </motion.div>
      ) : (
        // Upload Area
        <Box
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          sx={{
            position: 'relative',
            aspectRatio: aspectRatio.replace('aspect-', '').replace('video', '16/9').replace('square', '1/1'),
            width: '100%',
          }}
        >
          <Box
            component="label"
            htmlFor="image-upload"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%',
              border: '2px dashed',
              borderRadius: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backdropFilter: 'blur(12px)',
              borderColor: dragActive ? 'primary.500' : 'rgba(255, 255, 255, 0.2)',
              bgcolor: dragActive ? 'rgba(var(--joy-palette-primary-mainChannel) / 0.1)' : 'rgba(255, 255, 255, 0.05)',
              '&:hover': {
                borderColor: 'primary.500',
                bgcolor: 'rgba(var(--joy-palette-primary-mainChannel) / 0.1)',
              },
            }}
          >
            <AnimatePresence mode="wait">
              {uploading ? (
                <motion.div
                  key="uploading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <CircularProgress size="lg" />
                    <Typography level="body-sm" fontWeight="md">Uploading...</Typography>
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <CloudUploadIcon sx={{ fontSize: 48, opacity: 0.5 }} />
                    <Typography level="body-sm">
                      <Typography fontWeight="bold">Click to upload</Typography> or drag and drop
                    </Typography>
                    <Typography level="body-xs" sx={{ opacity: 0.6 }}>{helperText}</Typography>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>

            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
              disabled={uploading}
            />
          </Box>
        </Box>
      )}

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert
              variant="soft"
              color="danger"
              startDecorator={<WarningIcon />}
              sx={{ backdropFilter: 'blur(12px)' }}
            >
              {error}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
