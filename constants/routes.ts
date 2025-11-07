/**
 * Application routes constants
 */

export const ROUTES = {
  HOME: '/',
  AUTH_HOME: '/home',
  LOGIN: '/login',
  SIGNUP: '/signup',
  RESET_PASSWORD: '/reset-password',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  MY_REQUESTS: '/my-requests',
  SERVICES: '/services',
  BOOKINGS: '/bookings',
  HOME_ASSISTANCE: '/services/home-assistance',
  TRANSPORT: '/services/transport',
  PERSONAL_CARE: '/services/personal-care',
  TECH_SUPPORT: '/services/tech-support',
  CHAT: '/chat',
} as const;

export type Route = typeof ROUTES[keyof typeof ROUTES];

