'use client';

import Button from '@mui/joy/Button';
import SaveIcon from '@mui/icons-material/Save';

interface SaveButtonProps {
  saving: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  children?: React.ReactNode;
  fullWidth?: boolean;
  variant?: 'solid' | 'soft' | 'outlined' | 'plain';
  size?: 'sm' | 'md' | 'lg';
}

export default function SaveButton({
  saving,
  onClick,
  type = 'submit',
  children = 'Save Changes',
  fullWidth = false,
  variant = 'solid',
  size = 'lg',
}: SaveButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      loading={saving}
      loadingPosition="start"
      startDecorator={!saving && <SaveIcon />}
      disabled={saving}
      variant={variant}
      color="primary"
      size={size}
      fullWidth={fullWidth}
      sx={{
        fontWeight: 700,
        background: variant === 'solid' ? 'linear-gradient(135deg, var(--joy-palette-primary-500), var(--joy-palette-primary-700))' : undefined,
        '&:hover': variant === 'solid' ? {
          background: 'linear-gradient(135deg, var(--joy-palette-primary-600), var(--joy-palette-primary-800))',
        } : undefined,
      }}
    >
      {saving ? 'Saving...' : children}
    </Button>
  );
}
