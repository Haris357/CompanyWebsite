'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { isValidEmail } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';
import Alert from '@mui/joy/Alert';
import Avatar from '@mui/joy/Avatar';
import IconButton from '@mui/joy/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WarningIcon from '@mui/icons-material/Warning';
import LockOpenIcon from '@mui/icons-material/LockOpen';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      await signIn(email, password, rememberMe);
      // Use window.location to force a full page reload with the new auth state
      window.location.href = '/admin/dashboard';
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#f9fafb',
      }}
    >
      {/* Animated Background Elements */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: 0.15 }}>
        <motion.div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            filter: 'blur(80px)',
            background: '#3b82f6',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '-50%',
            right: '-50%',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            filter: 'blur(80px)',
            background: '#8b5cf6',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </Box>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: 448, padding: '0 24px' }}
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  margin: '0 auto 16px',
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                }}
              >
                <LockOpenIcon sx={{ fontSize: 32 }} />
              </Avatar>
            </motion.div>
            <Typography level="h2" fontWeight="xl" sx={{ mb: 1, color: '#111827' }}>
              Admin Portal
            </Typography>
            <Typography level="body-sm" sx={{ color: '#6b7280' }}>
              Sign in to manage your website
            </Typography>
          </Box>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            sx={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '1rem',
              p: 4,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
          >
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert
                        variant="soft"
                        color="danger"
                        startDecorator={<WarningIcon />}
                      >
                        {error}
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email Field */}
                <FormControl>
                  <FormLabel sx={{ fontWeight: 600 }}>Email Address</FormLabel>
                  <Input
                    type="email"
                    placeholder="admin@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    startDecorator={<EmailIcon />}
                    required
                    autoComplete="email"
                    size="lg"
                  />
                </FormControl>

                {/* Password Field */}
                <FormControl>
                  <FormLabel sx={{ fontWeight: 600 }}>Password</FormLabel>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    startDecorator={<LockIcon />}
                    endDecorator={
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        variant="plain"
                        color="neutral"
                        size="sm"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    }
                    required
                    autoComplete="current-password"
                    size="lg"
                  />
                </FormControl>

                {/* Remember Me */}
                <Checkbox
                  label="Remember me for 30 days"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  sx={{ fontWeight: 500 }}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  loading={loading}
                  loadingPosition="start"
                  endDecorator={!loading && <ArrowForwardIcon />}
                  size="lg"
                  fullWidth
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb, #1e40af)',
                    },
                  }}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
              </Box>
            </form>
          </Box>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Typography level="body-xs" sx={{ textAlign: 'center', mt: 3, color: '#9ca3af' }}>
            Protected by enterprise-grade security
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
}
