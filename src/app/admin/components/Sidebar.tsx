'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import BusinessIcon from '@mui/icons-material/Business';
import PaletteIcon from '@mui/icons-material/Palette';
import MenuIcon from '@mui/icons-material/Menu';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import FolderIcon from '@mui/icons-material/Folder';
import RateReviewIcon from '@mui/icons-material/RateReview';
import GroupIcon from '@mui/icons-material/Group';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import ChatIcon from '@mui/icons-material/Chat';
import EmailIcon from '@mui/icons-material/Email';
import WebIcon from '@mui/icons-material/Web';
import SearchIcon from '@mui/icons-material/Search';
import BoltIcon from '@mui/icons-material/Bolt';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navigationItems: NavItem[] = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: <DashboardIcon /> },
  { label: 'Sections', href: '/admin/sections', icon: <ViewModuleIcon /> },
  { label: 'Company Info', href: '/admin/company', icon: <BusinessIcon /> },
  { label: 'Theme Settings', href: '/admin/theme', icon: <PaletteIcon /> },
  { label: 'Navigation', href: '/admin/navigation', icon: <MenuIcon /> },
  { label: 'Hero Section', href: '/admin/hero', icon: <ImageIcon /> },
  { label: 'Services', href: '/admin/services', icon: <WorkIcon /> },
  { label: 'Projects', href: '/admin/projects', icon: <FolderIcon /> },
  { label: 'Testimonials', href: '/admin/testimonials', icon: <RateReviewIcon /> },
  { label: 'Team', href: '/admin/team', icon: <GroupIcon /> },
  { label: 'About', href: '/admin/about', icon: <InfoIcon /> },
  { label: 'FAQ', href: '/admin/faq', icon: <HelpIcon /> },
  { label: 'Social Media', href: '/admin/social-media', icon: <ChatIcon /> },
  { label: 'Contact', href: '/admin/contact', icon: <EmailIcon /> },
  { label: 'Footer', href: '/admin/footer', icon: <WebIcon /> },
  { label: 'SEO Settings', href: '/admin/seo', icon: <SearchIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <Box
      component="aside"
      sx={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 40,
        height: '100vh',
        width: 256,
        borderRight: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Logo/Brand */}
      <Box
        sx={{
          display: 'flex',
          height: 64,
          alignItems: 'center',
          borderBottom: '1px solid #e5e7eb',
          px: 3,
        }}
      >
        <Link href="/admin/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar
            sx={{
              background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
              fontWeight: 'bold',
            }}
          >
            <BoltIcon />
          </Avatar>
          <Typography level="h4" fontWeight="xl" sx={{ color: '#111827' }}>
            Admin
          </Typography>
        </Link>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', py: 2, px: 1.5 }}>
        <List sx={{ gap: 0.5 }}>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <ListItem key={item.href}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  selected={isActive}
                  sx={{
                    borderRadius: 'md',
                    fontWeight: 600,
                    color: isActive ? '#ffffff' : '#374151',
                    '&:hover': {
                      backgroundColor: isActive ? undefined : '#f3f4f6',
                    },
                    ...(isActive && {
                      background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb, #1e40af)',
                      },
                    }),
                  }}
                >
                  <ListItemDecorator sx={{ color: 'inherit' }}>
                    {item.icon}
                  </ListItemDecorator>
                  <ListItemContent>
                    {item.label}
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* View Site Link */}
      <Box sx={{ borderTop: '1px solid #e5e7eb', p: 2 }}>
        <Button
          component={Link}
          href="/"
          target="_blank"
          variant="outlined"
          color="neutral"
          fullWidth
          startDecorator={<OpenInNewIcon />}
          sx={{
            fontWeight: 600,
            borderColor: '#d1d5db',
            color: '#374151',
            '&:hover': {
              backgroundColor: '#f9fafb',
              borderColor: '#9ca3af',
            },
          }}
        >
          View Site
        </Button>
      </Box>
    </Box>
  );
}
