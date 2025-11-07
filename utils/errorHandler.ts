/**
 * Client-side error handling utilities
 */

import { handleError, formatErrorMessage } from '@/lib/errors';

/**
 * Handle and display error to user
 */
export function handleClientError(error: unknown, showToast: boolean = true) {
  const handled = handleError(error);
  
  if (showToast && typeof window !== 'undefined') {
    // You can replace this with your preferred toast/notification library
    console.error('Error:', handled);
  }
  
  return handled;
}

/**
 * Log error for debugging
 */
export function logError(error: unknown, context?: string) {
  const handled = handleError(error);
  
  if (context) {
    console.error(`[${context}]`, handled);
  } else {
    console.error(handled);
  }
  
  return handled;
}

/**
 * Handle async errors with try-catch wrapper
 */
export async function safeAsync<T>(
  asyncFn: () => Promise<T>,
  fallback?: T
): Promise<T | undefined> {
  try {
    return await asyncFn();
  } catch (error) {
    logError(error, 'safeAsync');
    return fallback;
  }
}

