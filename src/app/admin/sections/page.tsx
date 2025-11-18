'use client';

import { useState, useEffect } from 'react';
import { useDocument, useFirestore } from '@/hooks/useFirestore';
import { COLLECTIONS, type SectionVisibility } from '@/types';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Switch from '@mui/joy/Switch';
import CircularProgress from '@mui/joy/CircularProgress';
import SaveButton from '@/components/admin/SaveButton';
import SuccessMessage from '@/components/admin/SuccessMessage';

export default function SectionsPage() {
  const { data: sectionVisibility, loading } = useDocument<SectionVisibility>(
    COLLECTIONS.SECTION_VISIBILITY,
    'main'
  );
  const { update, create } = useFirestore<SectionVisibility>(COLLECTIONS.SECTION_VISIBILITY);

  const [formData, setFormData] = useState<Partial<SectionVisibility>>({
    hero: true,
    about: true,
    services: true,
    projects: true,
    team: true,
    testimonials: true,
    faq: true,
    socialMedia: true,
    contact: true,
  });

  const [saving, setSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (sectionVisibility) {
      setFormData(sectionVisibility);
    }
  }, [sectionVisibility]);

  const handleToggle = (section: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      if (sectionVisibility) {
        await update('main', formData);
      } else {
        await create({ id: 'main', ...formData } as SectionVisibility);
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving section visibility:', error);
      alert('Failed to save section visibility');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <CircularProgress size="lg" />
      </Box>
    );
  }

  const sections = [
    { key: 'hero', label: 'Hero Section', description: 'Main landing section with headline and CTA' },
    { key: 'about', label: 'About Section', description: 'Company information and stats' },
    { key: 'services', label: 'Services Section', description: 'Display available services' },
    { key: 'projects', label: 'Projects Section', description: 'Showcase portfolio projects' },
    { key: 'team', label: 'Team Section', description: 'Display team members' },
    { key: 'testimonials', label: 'Testimonials Section', description: 'Customer reviews and feedback' },
    { key: 'faq', label: 'FAQ Section', description: 'Frequently asked questions' },
    { key: 'socialMedia', label: 'Social Media Section', description: 'Social media posts and feeds' },
    { key: 'contact', label: 'Contact Section', description: 'Contact information and form' },
  ];

  return (
    <Box sx={{ maxWidth: 896 }}>
      <Box sx={{ mb: 4 }}>
        <Typography level="h2" fontWeight="xl" sx={{ mb: 1 }}>
          Section Visibility
        </Typography>
        <Typography level="body-md" sx={{ opacity: 0.7 }}>
          Control which sections appear on your website. Toggle sections on or off to customize your homepage.
        </Typography>
      </Box>

      {showSuccess && <SuccessMessage show={showSuccess} />}

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
          {sections.map((section) => (
            <Card
              key={section.key}
              variant="outlined"
              sx={{
                transition: 'all 0.2s',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md" fontWeight="bold">
                    {section.label}
                  </Typography>
                  <Typography level="body-sm" sx={{ mt: 0.5, opacity: 0.7 }}>
                    {section.description}
                  </Typography>
                </Box>
                <Switch
                  checked={Boolean(formData[section.key])}
                  onChange={() => handleToggle(section.key)}
                  color="primary"
                />
              </Box>
            </Card>
          ))}
        </Box>

        <SaveButton saving={saving} fullWidth />
      </form>
    </Box>
  );
}
