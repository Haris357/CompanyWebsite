'use client';

import { useAuth } from '@/hooks/useAuth';
import { useCollection } from '@/hooks/useFirestore';
import { COLLECTIONS } from '@/types';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import Skeleton from '@mui/joy/Skeleton';
import FolderIcon from '@mui/icons-material/Folder';
import WorkIcon from '@mui/icons-material/Work';
import RateReviewIcon from '@mui/icons-material/RateReview';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import PaletteIcon from '@mui/icons-material/Palette';
import MenuIcon from '@mui/icons-material/Menu';
import ImageIcon from '@mui/icons-material/Image';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import InfoIcon from '@mui/icons-material/Info';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  href: string;
}

function StatCard({ title, value, icon, href }: StatCardProps) {
  return (
    <Card
      component={Link}
      href={href}
      variant="outlined"
      sx={{
        textDecoration: 'none',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 'lg',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography level="body-sm" fontWeight="md" sx={{ opacity: 0.7, mb: 1 }}>
            {title}
          </Typography>
          <Typography level="h2" fontWeight="xl">
            {value}
          </Typography>
        </Box>
        <Avatar
          sx={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            width: 56,
            height: 56,
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </Card>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function QuickAction({ title, description, icon, href }: QuickActionProps) {
  return (
    <Card
      component={Link}
      href={href}
      variant="outlined"
      sx={{
        textDecoration: 'none',
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Avatar
          sx={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            flexShrink: 0,
          }}
        >
          {icon}
        </Avatar>
        <Box>
          <Typography level="title-md" fontWeight="bold" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Typography level="body-sm" sx={{ opacity: 0.7 }}>
            {description}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default function AdminDashboardPage() {
  const { user } = useAuth();

  // Fetch data for stats
  const { data: projects = [], loading: projectsLoading } = useCollection(COLLECTIONS.PROJECTS);
  const { data: testimonials = [], loading: testimonialsLoading } = useCollection(COLLECTIONS.TESTIMONIALS);
  const { data: teamMembers = [], loading: teamLoading } = useCollection(COLLECTIONS.TEAM);
  const { data: services } = useCollection(COLLECTIONS.SERVICES);
  const { data: faqs = [], loading: faqsLoading } = useCollection(COLLECTIONS.FAQ);

  const isLoading = projectsLoading || testimonialsLoading || teamLoading || faqsLoading;

  // Calculate stats
  const servicesCount = services?.[0]?.services?.length || 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card
          variant="outlined"
          sx={{
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Gradient Background */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: 0.1,
              background: 'radial-gradient(circle at top left, #3b82f6, transparent 50%), radial-gradient(circle at bottom right, #1d4ed8, transparent 50%)',
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography level="h1" fontWeight="xl" sx={{ mb: 1 }}>
              Welcome back, {user?.displayName || 'Admin'}! 👋
            </Typography>
            <Typography level="body-lg" sx={{ opacity: 0.7 }}>
              Here's what's happening with your website today.
            </Typography>
          </Box>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <Box>
        <Typography level="h3" fontWeight="xl" sx={{ mb: 3 }}>
          Overview
        </Typography>
        {isLoading ? (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} variant="outlined">
                <Skeleton variant="text" width="60%" height={20} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="40%" height={40} />
              </Card>
            ))}
          </Box>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
              <StatCard
                title="Projects"
                value={projects.length}
                href="/admin/projects"
                icon={<FolderIcon />}
              />

              <StatCard
                title="Services"
                value={servicesCount}
                href="/admin/services"
                icon={<WorkIcon />}
              />

              <StatCard
                title="Testimonials"
                value={testimonials.length}
                href="/admin/testimonials"
                icon={<RateReviewIcon />}
              />

              <StatCard
                title="Team Members"
                value={teamMembers.length}
                href="/admin/team"
                icon={<GroupIcon />}
              />
            </Box>
          </motion.div>
        )}
      </Box>

      {/* Quick Actions */}
      <Box>
        <Typography level="h3" fontWeight="xl" sx={{ mb: 3 }}>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 2 }}>
          <QuickAction
            title="Company Information"
            description="Update company details, logo, and contact info"
            href="/admin/company"
            icon={<BusinessIcon />}
          />

          <QuickAction
            title="Theme Settings"
            description="Customize colors, fonts, and overall styling"
            href="/admin/theme"
            icon={<PaletteIcon />}
          />

          <QuickAction
            title="Navigation Settings"
            description="Update website logo and navigation links"
            href="/admin/navigation"
            icon={<MenuIcon />}
          />

          <QuickAction
            title="Hero Section"
            description="Edit homepage hero section and call-to-action"
            href="/admin/hero"
            icon={<ImageIcon />}
          />

          <QuickAction
            title="Add New Project"
            description="Showcase your latest work in the portfolio"
            href="/admin/projects"
            icon={<AddIcon />}
          />

          <QuickAction
            title="Manage Services"
            description="Add or edit the services you offer"
            href="/admin/services"
            icon={<DescriptionIcon />}
          />

          <QuickAction
            title="SEO Settings"
            description="Optimize your website for search engines"
            href="/admin/seo"
            icon={<SearchIcon />}
          />

          <QuickAction
            title="Social Media Posts"
            description="Manage social media posts displayed on website"
            href="/admin/social-media"
            icon={<ChatIcon />}
          />
        </Box>
      </Box>

      {/* Getting Started Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card
          variant="outlined"
          sx={{
            backdropFilter: 'blur(12px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          }}
        >
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Avatar
              sx={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                flexShrink: 0,
                width: 48,
                height: 48,
              }}
            >
              <InfoIcon />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography level="title-lg" fontWeight="bold" sx={{ mb: 1 }}>
                Getting Started
              </Typography>
              <Typography level="body-sm" sx={{ mb: 2, opacity: 0.7 }}>
                Complete these steps to set up your website:
              </Typography>
              <Box component="ul" sx={{ display: 'flex', flexDirection: 'column', gap: 1, pl: 0, listStyle: 'none' }}>
                <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CheckCircleIcon color="success" fontSize="small" />
                  <Typography level="body-sm">1. Add company information and branding</Typography>
                </Box>
                <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScheduleIcon sx={{ opacity: 0.3 }} fontSize="small" />
                  <Typography level="body-sm">2. Customize theme colors and fonts</Typography>
                </Box>
                <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScheduleIcon sx={{ opacity: 0.3 }} fontSize="small" />
                  <Typography level="body-sm">3. Set up your hero section and navigation</Typography>
                </Box>
                <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScheduleIcon sx={{ opacity: 0.3 }} fontSize="small" />
                  <Typography level="body-sm">4. Add your services and projects</Typography>
                </Box>
                <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ScheduleIcon sx={{ opacity: 0.3 }} fontSize="small" />
                  <Typography level="body-sm">5. Configure SEO settings for better visibility</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
}
