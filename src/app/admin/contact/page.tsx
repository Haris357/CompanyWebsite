'use client';

import { useState, useEffect } from 'react';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type ContactSection } from '@/types';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Chip from '@mui/joy/Chip';
import SaveButton from '@/components/admin/SaveButton';
import SuccessMessage from '@/components/admin/SuccessMessage';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';

export default function ContactPage() {
  const { data: contact, loading } = useDocument<ContactSection>(COLLECTIONS.CONTACT, 'main');
  const { update, create } = useFirestore<ContactSection>(COLLECTIONS.CONTACT);

  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mapUrlError, setMapUrlError] = useState('');
  const [formData, setFormData] = useState<Partial<ContactSection>>({
    title: '',
    subtitle: '',
    email: '',
    phone: '',
    address: '',
    mapEmbedUrl: '',
    showContactForm: true,
  });

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const validateMapUrl = (url: string): boolean => {
    if (!url) {
      setMapUrlError('');
      return true;
    }

    // Check if it's a valid Google Maps embed URL
    const isValidGoogleMapsUrl = url.includes('google.com/maps/embed') || url.includes('maps.google.com/maps');

    if (!isValidGoogleMapsUrl) {
      setMapUrlError('Please enter a valid Google Maps embed URL');
      return false;
    }

    setMapUrlError('');
    return true;
  };

  const handleMapUrlChange = (url: string) => {
    setFormData({ ...formData, mapEmbedUrl: url });
    validateMapUrl(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate map URL before submitting
    if (formData.mapEmbedUrl && !validateMapUrl(formData.mapEmbedUrl)) {
      alert('Please fix the Google Maps URL error before saving');
      return;
    }

    setSaving(true);

    try {
      if (contact) {
        await update('main', formData);
      } else {
        await create({ id: 'main', ...formData } as ContactSection);
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving contact section:', error);
      alert('Failed to save contact section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ maxWidth: 896 }}>
      <Box sx={{ mb: 4 }}>
        <Typography level="h2" fontWeight="xl" sx={{ mb: 1 }}>
          Contact Section
        </Typography>
        <Typography level="body-md" sx={{ opacity: 0.7 }}>
          Manage contact information and Google Maps integration
        </Typography>
      </Box>

      {showSuccess && <SuccessMessage show={showSuccess} />}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Card variant="outlined">
            <Typography level="title-md" fontWeight="bold" sx={{ mb: 2 }}>
              Section Content
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl required>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Get In Touch"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  size="lg"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Subtitle</FormLabel>
                <Input
                  placeholder="We'd love to hear from you"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  size="lg"
                />
              </FormControl>
            </Box>
          </Card>

          <Card variant="outlined">
            <Typography level="title-md" fontWeight="bold" sx={{ mb: 2 }}>
              Contact Information
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  startDecorator={<EmailIcon />}
                  size="lg"
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  startDecorator={<PhoneIcon />}
                  size="lg"
                />
              </FormControl>

              <FormControl required>
                <FormLabel>Address</FormLabel>
                <Textarea
                  placeholder="123 Main Street, City, State 12345"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  minRows={3}
                  size="lg"
                  startDecorator={<LocationOnIcon />}
                />
              </FormControl>
            </Box>
          </Card>

          <Card variant="outlined">
            <Typography level="title-md" fontWeight="bold" sx={{ mb: 2 }}>
              Google Maps Integration
            </Typography>

            <FormControl error={!!mapUrlError}>
              <FormLabel>Google Maps Embed URL</FormLabel>
              <Input
                type="url"
                placeholder="https://www.google.com/maps/embed?pb=..."
                value={formData.mapEmbedUrl}
                onChange={(e) => handleMapUrlChange(e.target.value)}
                startDecorator={<MapIcon />}
                size="lg"
                color={mapUrlError ? 'danger' : 'neutral'}
              />
              <FormHelperText>
                {mapUrlError || 'Get an embed URL from Google Maps: Share → Embed a map → Copy HTML iframe src'}
              </FormHelperText>
            </FormControl>

            {formData.mapEmbedUrl && (
              <Box sx={{ mt: 2, borderRadius: 'md', overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                <iframe
                  src={formData.mapEmbedUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Box>
            )}
          </Card>

          <Card variant="outlined">
            <Typography level="title-md" fontWeight="bold" sx={{ mb: 2 }}>
              Form Settings
            </Typography>

            <Checkbox
              label="Show Contact Form"
              checked={formData.showContactForm}
              onChange={(e) => setFormData({ ...formData, showContactForm: e.target.checked })}
            />
            <FormHelperText sx={{ ml: 4 }}>
              Enable or disable the contact form on your website
            </FormHelperText>
          </Card>

          <SaveButton saving={saving} fullWidth />
        </Box>
      </form>

      {/* Preview Section */}
      <Card variant="outlined" sx={{ mt: 4 }}>
        <Typography level="title-lg" fontWeight="bold" sx={{ mb: 3 }}>
          Preview
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography level="body-sm" fontWeight="bold">Email:</Typography>
            <Typography level="body-sm" sx={{ opacity: 0.7 }}>
              {formData.email || 'Not set'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography level="body-sm" fontWeight="bold">Phone:</Typography>
            <Typography level="body-sm" sx={{ opacity: 0.7 }}>
              {formData.phone || 'Not set'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography level="body-sm" fontWeight="bold">Address:</Typography>
            <Typography level="body-sm" sx={{ opacity: 0.7 }}>
              {formData.address || 'Not set'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography level="body-sm" fontWeight="bold">Contact Form:</Typography>
            <Chip
              color={formData.showContactForm ? 'success' : 'neutral'}
              size="sm"
              variant="soft"
            >
              {formData.showContactForm ? 'Enabled' : 'Disabled'}
            </Chip>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
