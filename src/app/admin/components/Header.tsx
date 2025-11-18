'use client';

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/joy/Box';
import Avatar from '@mui/joy/Avatar';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Divider from '@mui/joy/Divider';
import SettingsIcon from '@mui/icons-material/Settings';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Header() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        left: 256,
        right: 0,
        top: 0,
        zIndex: 30,
        height: 64,
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#ffffff',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
        }}
      >
        {/* Page Title */}
        <Box>
          <Typography level="h4" fontWeight="xl" sx={{ color: '#111827' }}>
            Welcome Back!
          </Typography>
          <Typography level="body-sm" sx={{ color: '#6b7280' }}>
            Manage your website content
          </Typography>
        </Box>

        {/* User Menu */}
        <Dropdown>
          <MenuButton
            variant="plain"
            sx={{
              borderRadius: 'md',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              '&:hover': {
                backgroundColor: '#f3f4f6',
                borderColor: '#d1d5db',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {/* Avatar */}
              <Avatar
                sx={{
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  fontWeight: 'bold',
                }}
              >
                {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'A'}
              </Avatar>

              {/* User Info */}
              <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'left' }}>
                <Typography level="body-sm" fontWeight="bold" sx={{ color: '#111827' }}>
                  {user?.displayName || 'Admin User'}
                </Typography>
                <Typography level="body-xs" sx={{ color: '#6b7280' }}>
                  {user?.email}
                </Typography>
              </Box>

              {/* Dropdown Arrow */}
              <KeyboardArrowDownIcon sx={{ color: '#6b7280' }} />
            </Box>
          </MenuButton>

          <Menu
            placement="bottom-end"
            sx={{
              minWidth: 256,
              borderRadius: 'md',
              border: '1px solid #e5e7eb',
              backgroundColor: '#ffffff',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Profile Section */}
            <Box sx={{ px: 2, py: 2 }}>
              <Typography level="body-sm" fontWeight="bold" sx={{ mb: 0.5, color: '#111827' }}>
                {user?.displayName || 'Admin User'}
              </Typography>
              <Typography level="body-xs" sx={{ color: '#6b7280', mb: 1 }}>
                {user?.email}
              </Typography>
              <Box
                sx={{
                  display: 'inline-flex',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 'md',
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  color: 'white',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                }}
              >
                Administrator
              </Box>
            </Box>

            <Divider />

            {/* Menu Items */}
            <MenuItem
              onClick={() => router.push('/admin/theme')}
            >
              <ListItemDecorator>
                <SettingsIcon />
              </ListItemDecorator>
              Settings
            </MenuItem>

            <MenuItem
              onClick={() => window.open('/', '_blank')}
            >
              <ListItemDecorator>
                <OpenInNewIcon />
              </ListItemDecorator>
              View Public Site
            </MenuItem>

            <Divider />

            {/* Sign Out */}
            <MenuItem
              onClick={handleSignOut}
              color="danger"
            >
              <ListItemDecorator>
                <LogoutIcon />
              </ListItemDecorator>
              Sign Out
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    </Box>
  );
}
