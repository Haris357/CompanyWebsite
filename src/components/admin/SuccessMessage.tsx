'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Alert from '@mui/joy/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface SuccessMessageProps {
  show: boolean;
  message?: string;
  variant?: 'soft' | 'solid' | 'outlined' | 'plain';
}

export default function SuccessMessage({
  show,
  message = 'Changes saved successfully!',
  variant = 'soft',
}: SuccessMessageProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Alert
            variant={variant}
            color="success"
            startDecorator={<CheckCircleIcon />}
            sx={{
              backdropFilter: 'blur(12px)',
              fontWeight: 600,
            }}
          >
            {message}
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
