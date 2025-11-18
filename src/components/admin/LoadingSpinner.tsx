'use client';

import CircularProgress from '@mui/joy/CircularProgress';
import Box from '@mui/joy/Box';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function LoadingSpinner({ size = 'lg' }: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 'md',
    md: 'lg',
    lg: 'lg'
  } as const;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
      }}
    >
      <CircularProgress
        size={sizeMap[size]}
        variant="soft"
        color="primary"
        sx={{
          '--CircularProgress-size': size === 'lg' ? '64px' : size === 'md' ? '48px' : '32px',
        }}
      />
    </Box>
  );
}
