/**
 * Custom hook for integrating Cloudflare Turnstile widget
 * @module helpers/Utils/TurnstileWidget
 */
import { useRef, useState, useEffect } from 'react';
import config from '@plone/volto/registry';

/**
 * Custom hook to manage Turnstile widget state and behavior
 * @param {Object} options - Configuration options
 * @param {Function} options.onError - Optional custom error handler
 * @returns {Object} Turnstile widget state and handlers
 */
export const useTurnstileWidget = ({ onError } = {}) => {
  // Get the API path from the Volto configuration
  const apiPath = config.settings.apiPath;

  // Reference for the Turnstile widget
  const turnstileRef = useRef(null);

  // State for storing the Turnstile token
  const [turnstileToken, setTurnstileToken] = useState(null);

  // State for storing the Turnstile site key
  const [turnstileSiteKey, setTurnstileSiteKey] = useState(
    '1x00000000000000000000AA', // Test key - will be replaced by backend settings
  );

  // Fetch Turnstile site key from public endpoint
  useEffect(() => {
    const fetchTurnstileSiteKey = async () => {
      try {
        const response = await fetch(
          `${apiPath}/++api++/@cloudflare-turnstile-sitekey`,
        );
        if (response.ok) {
          const data = await response.json();
          if (data.site_key) {
            setTurnstileSiteKey(data.site_key);
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching Turnstile site key:', error);
        // Keep the default test key if fetch fails
      }
    };

    fetchTurnstileSiteKey();
  }, [apiPath]);

  /**
   * Handler for successful Turnstile validation
   * @param {string} token - The validation token
   */
  const handleSuccess = (token) => {
    setTurnstileToken(token);
  };

  /**
   * Handler for expired Turnstile token
   */
  const handleExpire = () => {
    setTurnstileToken(null);
  };

  /**
   * Handler for Turnstile errors
   */
  const handleError = () => {
    setTurnstileToken(null);
    if (onError) {
      onError();
    }
  };

  /**
   * Reset the Turnstile widget and token
   */
  const resetTurnstile = () => {
    turnstileRef.current?.reset?.();
    setTurnstileToken(null);
  };

  return {
    // Refs
    turnstileRef,
    // State
    turnstileToken,
    turnstileSiteKey,
    // Handlers
    handleSuccess,
    handleExpire,
    handleError,
    resetTurnstile,
  };
};
