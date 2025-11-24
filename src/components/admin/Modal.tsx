'use client';

import { ReactNode } from 'react';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
}

export default function AdminModal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'md'
}: AdminModalProps) {
  // Map 'xs' to 'sm' since MUI Joy ModalDialog doesn't support 'xs'
  const modalSize = maxWidth === 'xs' ? 'sm' : maxWidth;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        backdropFilter: 'blur(8px)',
      }}
    >
      <ModalDialog
        variant="outlined"
        size={modalSize}
        sx={{
          maxHeight: '90vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Box sx={{ position: 'sticky', top: 0, zIndex: 10, pb: 2 }}>
          <ModalClose />
          <Typography level="h4" component="h2" fontWeight="bold">
            {title}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Body - Scrollable */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            py: 2,
            px: 0.5,
            // Custom scrollbar styling
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'linear-gradient(to bottom, var(--joy-palette-primary-500), var(--joy-palette-primary-700))',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'linear-gradient(to bottom, var(--joy-palette-primary-700), var(--joy-palette-primary-500))',
            },
          }}
        >
          {children}
        </Box>

        {/* Footer */}
        {footer && (
          <>
            <Divider sx={{ my: 1 }} />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 1,
                pt: 2,
              }}
            >
              {footer}
            </Box>
          </>
        )}
      </ModalDialog>
    </Modal>
  );
}
