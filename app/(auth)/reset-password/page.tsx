'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import Image from 'next/image';

type ResetStep = 'enter-email' | 'verify-otp' | 'set-password';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<ResetStep>('enter-email');
  const [formData, setFormData] = useState({
    emailOrMobile: '',
    otp: ['', '', '', ''],
    newPassword: '',
    reEnterPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...formData.otp];
    newOtp[index] = value;
    setFormData((prev) => ({ ...prev, otp: newOtp }));

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleContinue = () => {
    if (step === 'enter-email') {
      if (!formData.emailOrMobile) {
        setErrors({ emailOrMobile: 'Please enter email or mobile number' });
        return;
      }
      setStep('verify-otp');
    } else if (step === 'verify-otp') {
      if (formData.otp.some((digit) => !digit)) {
        setErrors({ otp: 'Please enter valid code' });
        return;
      }
      setStep('set-password');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.newPassword || !formData.reEnterPassword) {
      setErrors({ password: 'Please fill all password fields' });
      return;
    }
    
    if (formData.newPassword !== formData.reEnterPassword) {
      setErrors({ password: 'Passwords do not match' });
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement actual reset password API call
      console.log('Reset password:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(ROUTES.LOGIN);
    } catch (error) {
      console.error('Reset password error:', error);
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'enter-email':
        return (
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#2F6B8E', mb: 1 }}>
              Reset Password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Enter your Registered Email or Phone Number below to get reset your password.
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
              sx={{ mb: 3 }}
            />
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleContinue}
              sx={{
                bgcolor: '#2F6B8E',
                color: 'white',
                py: 1.5,
                mb: 2,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  bgcolor: '#25608A',
                },
              }}
            >
              Continue
            </Button>
            <Link
              href={ROUTES.LOGIN}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2F6B8E',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <ArrowBack sx={{ fontSize: 16, mr: 0.5 }} />
              Back to Login
            </Link>
          </Box>
        );

      case 'verify-otp':
        return (
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#2F6B8E', mb: 1 }}>
              Enter OTP
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              To continue Please enter the 4 Digit OTP sent to your Email or Phone Number.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 2 }}>
              {formData.otp.map((digit, index) => (
                <TextField
                  key={index}
                  id={`otp-${index}`}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' },
                  }}
                  sx={{
                    width: 60,
                    '& .MuiOutlinedInput-root': {
                      height: 60,
                    },
                  }}
                />
              ))}
            </Box>
            {errors.otp && (
              <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                {errors.otp}
              </Typography>
            )}
            <Link
              href="#"
              sx={{
                display: 'block',
                textAlign: 'center',
                mb: 3,
                color: '#2F6B8E',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Resend code
            </Link>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleContinue}
              sx={{
                bgcolor: '#2F6B8E',
                color: 'white',
                py: 1.5,
                mb: 2,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  bgcolor: '#25608A',
                },
              }}
            >
              Verify OTP
            </Button>
            <Link
              href={ROUTES.LOGIN}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2F6B8E',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <ArrowBack sx={{ fontSize: 16, mr: 0.5 }} />
              Back to Login
            </Link>
          </Box>
        );

      case 'set-password':
        return (
          <Box component="form" onSubmit={handleResetPassword}>
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#2F6B8E', mb: 1 }}>
              Set New Password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Your new password must be different from previously used passwords
            </Typography>
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter New Password"
              value={formData.newPassword}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Re-enter New Password"
              name="reEnterPassword"
              type={showReEnterPassword ? 'text' : 'password'}
              placeholder="Re-enter New Password"
              value={formData.reEnterPassword}
              onChange={handleChange}
              margin="normal"
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowReEnterPassword(!showReEnterPassword)} edge="end">
                      {showReEnterPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.submit && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {errors.submit}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                bgcolor: '#2F6B8E',
                color: 'white',
                py: 1.5,
                mb: 2,
                textTransform: 'none',
                fontSize: '1rem',
                '&:hover': {
                  bgcolor: '#25608A',
                },
              }}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
            <Link
              href={ROUTES.LOGIN}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2F6B8E',
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              <ArrowBack sx={{ fontSize: 16, mr: 0.5 }} />
              Back to Login
            </Link>
          </Box>
        );

      default:
        return null;
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

      {/* Right side - Reset Password Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '33.333%' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          overflowY: 'auto',
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

            {/* Step Content */}
            {renderStepContent()}
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}
