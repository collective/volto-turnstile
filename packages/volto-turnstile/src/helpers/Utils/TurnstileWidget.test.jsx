/**
 * Unit tests for useTurnstileWidget custom hook
 * @module helpers/Utils/TurnstileWidget
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { useTurnstileWidget } from './TurnstileWidget';

// Mock the @plone/volto/registry config
jest.mock('@plone/volto/registry', () => ({
  __esModule: true,
  default: {
    settings: {
      apiPath: '/api',
    },
  },
}));

describe('useTurnstileWidget', () => {
  let mockFetch;

  beforeEach(() => {
    // Mock global fetch
    mockFetch = jest.fn();
    global.fetch = mockFetch;

    // Default successful fetch response with no site_key
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    // Mock console.error to avoid cluttering test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('initialization', () => {
    it('initializes with default values', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      expect(result.current.turnstileRef).toBeDefined();
      expect(result.current.turnstileRef.current).toBeNull();
      expect(result.current.turnstileToken).toBeNull();
      expect(result.current.turnstileSiteKey).toBe('1x00000000000000000000AA');
    });

    it('returns all expected properties', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      expect(result.current).toHaveProperty('turnstileRef');
      expect(result.current).toHaveProperty('turnstileToken');
      expect(result.current).toHaveProperty('turnstileSiteKey');
      expect(result.current).toHaveProperty('handleSuccess');
      expect(result.current).toHaveProperty('handleExpire');
      expect(result.current).toHaveProperty('handleError');
      expect(result.current).toHaveProperty('resetTurnstile');
    });

    it('returns functions for all handlers', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      expect(typeof result.current.handleSuccess).toBe('function');
      expect(typeof result.current.handleExpire).toBe('function');
      expect(typeof result.current.handleError).toBe('function');
      expect(typeof result.current.resetTurnstile).toBe('function');
    });
  });

  describe('Turnstile site key fetching', () => {
    it('fetches site key from the public endpoint on mount', async () => {
      renderHook(() => useTurnstileWidget());

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          '/api/++api++/@cloudflare-turnstile-sitekey',
        );
      });
    });

    it('updates siteKey when fetch returns a valid site_key', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ site_key: 'real-site-key-from-backend' }),
      });

      const { result } = renderHook(() => useTurnstileWidget());

      await waitFor(() => {
        expect(result.current.turnstileSiteKey).toBe(
          'real-site-key-from-backend',
        );
      });
    });

    it('keeps default siteKey when response has no site_key', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({}),
      });

      const { result } = renderHook(() => useTurnstileWidget());

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      expect(result.current.turnstileSiteKey).toBe('1x00000000000000000000AA');
    });

    it('keeps default siteKey when fetch fails with non-ok response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
      });

      const { result } = renderHook(() => useTurnstileWidget());

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      expect(result.current.turnstileSiteKey).toBe('1x00000000000000000000AA');
    });

    it('keeps default siteKey and logs error when fetch throws', async () => {
      const networkError = new Error('Network failure');
      mockFetch.mockRejectedValue(networkError);

      const { result } = renderHook(() => useTurnstileWidget());

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      expect(result.current.turnstileSiteKey).toBe('1x00000000000000000000AA');
      // eslint-disable-next-line no-console
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching Turnstile site key:',
        networkError,
      );
    });
  });

  describe('handleSuccess', () => {
    it('sets the turnstile token when called', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      act(() => {
        result.current.handleSuccess('test-token-123');
      });

      expect(result.current.turnstileToken).toBe('test-token-123');
    });

    it('updates the token when called multiple times', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      act(() => {
        result.current.handleSuccess('first-token');
      });
      expect(result.current.turnstileToken).toBe('first-token');

      act(() => {
        result.current.handleSuccess('second-token');
      });
      expect(result.current.turnstileToken).toBe('second-token');
    });
  });

  describe('handleExpire', () => {
    it('clears the turnstile token when called', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      // First set a token
      act(() => {
        result.current.handleSuccess('test-token');
      });
      expect(result.current.turnstileToken).toBe('test-token');

      // Then expire it
      act(() => {
        result.current.handleExpire();
      });
      expect(result.current.turnstileToken).toBeNull();
    });

    it('does nothing when token is already null', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      expect(result.current.turnstileToken).toBeNull();

      act(() => {
        result.current.handleExpire();
      });

      expect(result.current.turnstileToken).toBeNull();
    });
  });

  describe('handleError', () => {
    it('clears the turnstile token when called', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      // First set a token
      act(() => {
        result.current.handleSuccess('test-token');
      });
      expect(result.current.turnstileToken).toBe('test-token');

      // Then trigger error
      act(() => {
        result.current.handleError();
      });
      expect(result.current.turnstileToken).toBeNull();
    });

    it('calls the custom onError callback when provided', () => {
      const mockOnError = jest.fn();
      const { result } = renderHook(() =>
        useTurnstileWidget({ onError: mockOnError }),
      );

      act(() => {
        result.current.handleError();
      });

      expect(mockOnError).toHaveBeenCalledTimes(1);
    });

    it('does not fail when onError callback is not provided', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      expect(() => {
        act(() => {
          result.current.handleError();
        });
      }).not.toThrow();
    });
  });

  describe('resetTurnstile', () => {
    it('clears the turnstile token', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      // Set a token first
      act(() => {
        result.current.handleSuccess('test-token');
      });
      expect(result.current.turnstileToken).toBe('test-token');

      // Reset
      act(() => {
        result.current.resetTurnstile();
      });

      expect(result.current.turnstileToken).toBeNull();
    });

    it('calls reset on the ref when ref.current exists', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      const mockReset = jest.fn();
      // Simulate a mounted Turnstile widget
      result.current.turnstileRef.current = {
        reset: mockReset,
      };

      act(() => {
        result.current.resetTurnstile();
      });

      expect(mockReset).toHaveBeenCalledTimes(1);
    });

    it('does not fail when ref.current is null', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      expect(result.current.turnstileRef.current).toBeNull();

      expect(() => {
        act(() => {
          result.current.resetTurnstile();
        });
      }).not.toThrow();
    });

    it('does not fail when ref.current has no reset method', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      // Simulate an invalid ref
      result.current.turnstileRef.current = {};

      expect(() => {
        act(() => {
          result.current.resetTurnstile();
        });
      }).not.toThrow();
    });
  });

  describe('integration scenarios', () => {
    it('handles complete success → expire → reset flow', () => {
      const { result } = renderHook(() => useTurnstileWidget());

      // Success
      act(() => {
        result.current.handleSuccess('token-1');
      });
      expect(result.current.turnstileToken).toBe('token-1');

      // Expire
      act(() => {
        result.current.handleExpire();
      });
      expect(result.current.turnstileToken).toBeNull();

      // New success
      act(() => {
        result.current.handleSuccess('token-2');
      });
      expect(result.current.turnstileToken).toBe('token-2');

      // Reset
      act(() => {
        result.current.resetTurnstile();
      });
      expect(result.current.turnstileToken).toBeNull();
    });

    it('handles success → error → reset flow with custom onError', () => {
      const mockOnError = jest.fn();
      const { result } = renderHook(() =>
        useTurnstileWidget({ onError: mockOnError }),
      );

      // Success
      act(() => {
        result.current.handleSuccess('token');
      });
      expect(result.current.turnstileToken).toBe('token');
      expect(mockOnError).not.toHaveBeenCalled();

      // Error
      act(() => {
        result.current.handleError();
      });
      expect(result.current.turnstileToken).toBeNull();
      expect(mockOnError).toHaveBeenCalledTimes(1);

      // Reset (should not call onError again)
      act(() => {
        result.current.resetTurnstile();
      });
      expect(mockOnError).toHaveBeenCalledTimes(1);
    });

    it('fetches siteKey and handles token lifecycle independently', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ site_key: 'backend-key' }),
      });

      const { result } = renderHook(() => useTurnstileWidget());

      // Wait for siteKey fetch
      await waitFor(() => {
        expect(result.current.turnstileSiteKey).toBe('backend-key');
      });

      // Token should still be independent
      expect(result.current.turnstileToken).toBeNull();

      // Token lifecycle works normally
      act(() => {
        result.current.handleSuccess('token');
      });
      expect(result.current.turnstileToken).toBe('token');

      // siteKey remains unchanged
      expect(result.current.turnstileSiteKey).toBe('backend-key');
    });
  });
});
