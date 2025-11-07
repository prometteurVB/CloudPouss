/**
 * Common TypeScript types and interfaces
 */

export interface User {
  id: string;
  email: string;
  mobileNo?: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

export interface LoginCredentials {
  emailOrMobile: string;
  password: string;
}

export interface SignupData {
  email: string;
  mobileNo?: string;
  password: string;
  confirmPassword: string;
  name?: string;
}

export interface ResetPasswordData {
  email: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    fields?: Record<string, string>;
  };
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  price?: number;
}

export interface Booking {
  id: string;
  serviceId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  scheduledDate?: string;
  createdAt: string;
}

