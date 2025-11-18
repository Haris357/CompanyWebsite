'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type CompanyInfo } from '@/types';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import SaveButton from '@/components/admin/SaveButton';
import SuccessMessage from '@/components/admin/SuccessMessage';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import ImageUpload from '@/components/admin/ImageUpload';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';

// Validation schema
const companyInfoSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  logo: z.string().optional(),
  tagline: z.string().min(1, 'Tagline is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  socialMedia: z.object({
    facebook: z.string().url('Invalid URL').optional().or(z.literal('')),
    twitter: z.string().url('Invalid URL').optional().or(z.literal('')),
    instagram: z.string().url('Invalid URL').optional().or(z.literal('')),
    linkedin: z.string().url('Invalid URL').optional().or(z.literal('')),
    youtube: z.string().url('Invalid URL').optional().or(z.literal('')),
    github: z.string().url('Invalid URL').optional().or(z.literal('')),
  }),
});

type CompanyInfoForm = z.infer<typeof companyInfoSchema>;

export default function CompanyInfoPage() {
  const { data: companyInfo, loading: loadingData } = useDocument<CompanyInfo>(
    COLLECTIONS.COMPANY_INFO,
    'main'
  );
  const { set, loading: saving } = useFirestore<CompanyInfo>(COLLECTIONS.COMPANY_INFO);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<CompanyInfoForm>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      name: '',
      logo: '',
      tagline: '',
      description: '',
      email: '',
      phone: '',
      address: '',
      socialMedia: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
        youtube: '',
        github: '',
      },
    },
  });

  const logoUrl = watch('logo');

  // Load existing data
  useEffect(() => {
    if (companyInfo) {
      reset({
        name: companyInfo.name || '',
        logo: companyInfo.logo || '',
        tagline: companyInfo.tagline || '',
        description: companyInfo.description || '',
        email: companyInfo.email || '',
        phone: companyInfo.phone || '',
        address: companyInfo.address || '',
        socialMedia: {
          facebook: companyInfo.socialMedia?.facebook || '',
          twitter: companyInfo.socialMedia?.twitter || '',
          instagram: companyInfo.socialMedia?.instagram || '',
          linkedin: companyInfo.socialMedia?.linkedin || '',
          youtube: companyInfo.socialMedia?.youtube || '',
          github: companyInfo.socialMedia?.github || '',
        },
      });
    }
  }, [companyInfo, reset]);

  const onSubmit = async (data: CompanyInfoForm) => {
    try {
      setSaveSuccess(false);
      await set('main', data, true);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving company info:', error);
    }
  };

  if (loadingData) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ maxWidth: 896 }}>
      <Box sx={{ mb: 4 }}>
        <Typography level="h2" fontWeight="xl" sx={{ mb: 1 }}>
          Company Information
        </Typography>
        <Typography level="body-md" sx={{ opacity: 0.7 }}>
          Update your company details, logo, and contact information
        </Typography>
      </Box>

      {saveSuccess && <SuccessMessage show={saveSuccess} />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Logo Upload */}
          <Card variant="outlined">
            <Typography level="title-md" fontWeight="bold" sx={{ mb: 2 }}>
              Company Logo
            </Typography>
            <ImageUpload
              value={logoUrl}
              onChange={(url) => setValue('logo', url)}
              folder="company-website/logo"
              label="Upload Logo"
              helperText="Recommended: Square image, PNG with transparent background"
              aspectRatio="aspect-square"
            />
          </Card>

          {/* Basic Information */}
          <Card variant="outlined">
            <Typography level="title-md" fontWeight="bold" sx={{ mb: 2 }}>
              Basic Information
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl required error={!!errors.name}>
                <FormLabel>Company Name</FormLabel>
                <Input
                  {...register('name')}
                  placeholder="Acme Inc."
                  size="lg"
                />
                {errors.name && (
                  <FormHelperText>{errors.name.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl required error={!!errors.tagline}>
                <FormLabel>Tagline</FormLabel>
                <Input
                  {...register('tagline')}
                  placeholder="Building the future, one solution at a time"
                  size="lg"
                />
                {errors.tagline && (
                  <FormHelperText>{errors.tagline.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl required error={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register('description')}
                  placeholder="Brief description of your company..."
                  minRows={4}
                  size="lg"
                />
                {errors.description && (
                  <FormHelperText>{errors.description.message}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Card>

          {/* Contact Information */}
          <Card variant="outlined">
            <Typography level="title-md" fontWeight="bold" sx={{ mb: 2 }}>
              Contact Information
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl required error={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register('email')}
                  type="email"
                  placeholder="contact@company.com"
                  startDecorator={<EmailIcon />}
                  size="lg"
                />
                {errors.email && (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl required error={!!errors.phone}>
                <FormLabel>Phone</FormLabel>
                <Input
                  {...register('phone')}
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  startDecorator={<PhoneIcon />}
                  size="lg"
                />
                {errors.phone && (
                  <FormHelperText>{errors.phone.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl required error={!!errors.address}>
                <FormLabel>Address</FormLabel>
                <Textarea
                  {...register('address')}
                  placeholder="123 Main St, City, State 12345"
                  minRows={2}
                  size="lg"
                  startDecorator={<LocationOnIcon />}
                />
                {errors.address && (
                  <FormHelperText>{errors.address.message}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Card>

          {/* Social Media */}
          <Card variant="outlined">
            <Typography level="title-md" fontWeight="bold" sx={{ mb: 2 }}>
              Social Media Links
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl error={!!errors.socialMedia?.facebook}>
                <FormLabel>Facebook</FormLabel>
                <Input
                  {...register('socialMedia.facebook')}
                  type="url"
                  placeholder="https://facebook.com/yourcompany"
                  startDecorator={<FacebookIcon />}
                  size="lg"
                />
                {errors.socialMedia?.facebook && (
                  <FormHelperText>{errors.socialMedia.facebook.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={!!errors.socialMedia?.twitter}>
                <FormLabel>Twitter</FormLabel>
                <Input
                  {...register('socialMedia.twitter')}
                  type="url"
                  placeholder="https://twitter.com/yourcompany"
                  startDecorator={<TwitterIcon />}
                  size="lg"
                />
                {errors.socialMedia?.twitter && (
                  <FormHelperText>{errors.socialMedia.twitter.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={!!errors.socialMedia?.instagram}>
                <FormLabel>Instagram</FormLabel>
                <Input
                  {...register('socialMedia.instagram')}
                  type="url"
                  placeholder="https://instagram.com/yourcompany"
                  startDecorator={<InstagramIcon />}
                  size="lg"
                />
                {errors.socialMedia?.instagram && (
                  <FormHelperText>{errors.socialMedia.instagram.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={!!errors.socialMedia?.linkedin}>
                <FormLabel>LinkedIn</FormLabel>
                <Input
                  {...register('socialMedia.linkedin')}
                  type="url"
                  placeholder="https://linkedin.com/company/yourcompany"
                  startDecorator={<LinkedInIcon />}
                  size="lg"
                />
                {errors.socialMedia?.linkedin && (
                  <FormHelperText>{errors.socialMedia.linkedin.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={!!errors.socialMedia?.youtube}>
                <FormLabel>YouTube</FormLabel>
                <Input
                  {...register('socialMedia.youtube')}
                  type="url"
                  placeholder="https://youtube.com/@yourcompany"
                  startDecorator={<YouTubeIcon />}
                  size="lg"
                />
                {errors.socialMedia?.youtube && (
                  <FormHelperText>{errors.socialMedia.youtube.message}</FormHelperText>
                )}
              </FormControl>

              <FormControl error={!!errors.socialMedia?.github}>
                <FormLabel>GitHub</FormLabel>
                <Input
                  {...register('socialMedia.github')}
                  type="url"
                  placeholder="https://github.com/yourcompany"
                  startDecorator={<GitHubIcon />}
                  size="lg"
                />
                {errors.socialMedia?.github && (
                  <FormHelperText>{errors.socialMedia.github.message}</FormHelperText>
                )}
              </FormControl>
            </Box>
          </Card>

          <SaveButton saving={saving} fullWidth />
        </Box>
      </form>
    </Box>
  );
}
