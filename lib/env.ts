/**
 * Environment variables configuration
 * 
 * Add these to your .env.local file:
 * 
 * NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
 * NEXT_PUBLIC_APP_URL=http://localhost:3000
 */

export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
} as const;

