/**
 * Custom React hooks for common functionality
 */

import { useState, useCallback } from 'react';
import { handleClientError } from '@/utils/errorHandler';

/**
 * Hook for handling async operations with loading and error states
 */
export function useAsync<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (asyncFn: () => Promise<T>): Promise<T | undefined> => {
      setLoading(true);
      setError(null);
      try {
        const result = await asyncFn();
        return result;
      } catch (err) {
        const handled = handleClientError(err, false);
        setError(new Error(handled.message));
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { execute, loading, error };
}

/**
 * Hook for form handling with validation
 */
export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = useCallback(
    (name: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [name]: e.target.value }));
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const setError = useCallback((name: keyof T, message: string) => {
    setErrors((prev) => ({ ...prev, [name]: message }));
  }, []);

  const setAllErrors = useCallback((newErrors: Partial<Record<keyof T, string>>) => {
    setErrors(newErrors);
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
  }, [initialValues]);

  return {
    values,
    errors,
    handleChange,
    setError,
    setAllErrors,
    reset,
    setValues,
  };
}

