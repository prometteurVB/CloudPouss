'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { validateLoginForm } from '@/utils/validation';
import { ROUTES } from '@/constants/routes';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateLoginForm(formData.emailOrMobile, formData.password);
    
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual login API call
      console.log('Login attempt:', formData);
      
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Extract user initial from email (first letter, uppercase)
      const email = formData.emailOrMobile;
      const userInitial = email.charAt(0).toUpperCase();
      
      // Store user initial in localStorage
      localStorage.setItem('userInitial', userInitial);
      localStorage.setItem('userEmail', email);
      
      // Redirect to authenticated home page after successful login
      router.push(ROUTES.AUTH_HOME);
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ submit: 'Invalid credentials. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'background.default',
      }}
    >
      {/* Left side - Image Section */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          width: { md: '66.666%' },
          position: 'relative',
          bgcolor: 'grey.100',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            minHeight: '100vh',
          }}
        >
          <Image
            src="/image/main.png"
            alt="CoudPouss Service"
            fill
            style={{ objectFit: 'cover' }}
            sizes="66.666vw"
            priority
          />
        </Box>
      </Box>

      {/* Right side - Login Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '33.333%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              padding: 4,
              width: '100%',
            }}
          >
            {/* Logo Section */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Typography variant="h4" sx={{ color: 'white' }}>
                  🏠
                </Typography>
              </Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                CoudPouss
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Empowering seniors with easy access to trusted help, care, and
                companionship whenever needed.
              </Typography>
            </Box>

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h5" fontWeight="600" gutterBottom>
                Welcome Back!
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Enter your email and password to login
              </Typography>

              <TextField
                fullWidth
                label="Email/ Mobile No"
                name="emailOrMobile"
                placeholder="Enter Email/ Mobile No"
                value={formData.emailOrMobile}
                onChange={handleChange}
                error={!!errors.emailOrMobile}
                helperText={errors.emailOrMobile}
                margin="normal"
                required
              />

              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {errors.submit && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  {errors.submit}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={loading}
                sx={{ mt: 3, mb: 2 }}
              >
                {loading ? 'Logging in...' : 'Log In'}
              </Button>

              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                  Don&apos;t have an account?{' '}
                  <Link
                    href={ROUTES.SIGNUP}
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    Sign up
                  </Link>
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <Link
                    href={ROUTES.RESET_PASSWORD}
                    sx={{ color: 'primary.main', textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

