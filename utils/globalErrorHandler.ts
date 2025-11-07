/**
 * Global error handler for unhandled errors
 */

if (typeof window !== 'undefined') {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // You can add error reporting service here (e.g., Sentry, LogRocket, etc.)
  });

  // Handle uncaught errors
  window.addEventListener('error', (event) => {
    console.error('Uncaught error:', event.error);
    // You can add error reporting service here
  });
}

