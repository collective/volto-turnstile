import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TurnstileWidget from './TurnstileWidget';

// ---------------------------------------------------------------------------
// Mock @marsidev/react-turnstile so tests run without a real Cloudflare script
// ---------------------------------------------------------------------------
jest.mock('@marsidev/react-turnstile', () => {
  // require() must be used here because jest.mock() is hoisted before imports.
  const { forwardRef } = require('react');

  // Inner jest.fn() — called by React as (props, ref) thanks to forwardRef.
  // Exported as __mockImpl so tests can assert on calls and clear the spy.
  const mockImpl = jest.fn(function MockTurnstile(
    {
      siteKey,
      className,
      style,
      id,
      options,
      onSuccess,
      onExpire,
      onError,
      onBeforeInteractive,
      onAfterInteractive,
      onUnsupported,
      onTimeout,
      onWidgetLoad,
      as: Tag = 'div',
      injectScript,
      onLoadScript,
      rerenderOnCallbackChange,
      ...rest
    },
    ref,
  ) {
    return (
      <Tag
        ref={ref}
        data-testid="turnstile"
        data-site-key={siteKey}
        data-theme={options?.theme}
        data-size={options?.size}
        data-appearance={options?.appearance}
        data-execution={options?.execution}
        data-language={options?.language}
        data-tab-index={options?.tabIndex}
        data-action={options?.action}
        data-retry={options?.retry}
        data-refresh-expired={options?.refreshExpired}
        data-inject-script={String(injectScript)}
        className={className}
        style={style}
        id={id}
        {...rest}
      />
    );
  });

  return {
    // forwardRef ensures React passes (props, ref) to mockImpl and that the
    // ref is properly attached to the DOM element on mount/unmount.
    Turnstile: forwardRef(mockImpl),
    __mockImpl: mockImpl,
  };
});

// __mockImpl is the inner jest.fn() that React actually calls with (props, ref).
// Using it (instead of the forwardRef wrapper) lets us assert on call args
// and use mockClear().
const { __mockImpl: MockTurnstile } = jest.requireMock(
  '@marsidev/react-turnstile',
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const SITE_KEY = '1x00000000000000000000AA';

function renderWidget(props = {}) {
  return render(<TurnstileWidget siteKey={SITE_KEY} {...props} />);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('TurnstileWidget', () => {
  beforeEach(() => {
    MockTurnstile.mockClear();
  });

  // --- Rendering -----------------------------------------------------------

  describe('rendering', () => {
    it('renders without crashing', () => {
      renderWidget();
      expect(screen.getByTestId('turnstile')).toBeInTheDocument();
    });

    it('passes siteKey to the underlying Turnstile component', () => {
      renderWidget();
      expect(screen.getByTestId('turnstile')).toHaveAttribute(
        'data-site-key',
        SITE_KEY,
      );
    });

    it('uses a div container by default', () => {
      renderWidget();
      expect(screen.getByTestId('turnstile').tagName).toBe('DIV');
    });

    it('renders with a custom container tag via the `as` prop', () => {
      renderWidget({ as: 'section' });
      expect(screen.getByTestId('turnstile').tagName).toBe('SECTION');
    });
  });

  // --- Style props ---------------------------------------------------------

  describe('style props', () => {
    it('applies className to the container', () => {
      renderWidget({ className: 'my-turnstile' });
      expect(screen.getByTestId('turnstile')).toHaveClass('my-turnstile');
    });

    it('applies inline style to the container', () => {
      renderWidget({ style: { marginTop: '1rem', color: 'red' } });
      const el = screen.getByTestId('turnstile');
      expect(el).toHaveStyle({ marginTop: '1rem', color: 'red' });
    });

    it('applies the id attribute to the container', () => {
      renderWidget({ id: 'captcha-widget' });
      expect(screen.getByTestId('turnstile')).toHaveAttribute(
        'id',
        'captcha-widget',
      );
    });
  });

  // --- options prop ---------------------------------------------------------

  describe('options prop', () => {
    it('passes options.theme to Turnstile', () => {
      renderWidget({ options: { theme: 'dark' } });
      expect(screen.getByTestId('turnstile')).toHaveAttribute(
        'data-theme',
        'dark',
      );
    });

    it('passes options.size to Turnstile', () => {
      renderWidget({ options: { size: 'compact' } });
      expect(screen.getByTestId('turnstile')).toHaveAttribute(
        'data-size',
        'compact',
      );
    });

    it('passes options.appearance to Turnstile', () => {
      renderWidget({ options: { appearance: 'interaction-only' } });
      expect(screen.getByTestId('turnstile')).toHaveAttribute(
        'data-appearance',
        'interaction-only',
      );
    });

    it('passes options.execution to Turnstile', () => {
      renderWidget({ options: { execution: 'execute' } });
      expect(screen.getByTestId('turnstile')).toHaveAttribute(
        'data-execution',
        'execute',
      );
    });

    it('passes options.language to Turnstile', () => {
      renderWidget({ options: { language: 'es' } });
      expect(screen.getByTestId('turnstile')).toHaveAttribute(
        'data-language',
        'es',
      );
    });

    it('passes options.action to Turnstile', () => {
      renderWidget({ options: { action: 'login' } });
      expect(screen.getByTestId('turnstile')).toHaveAttribute(
        'data-action',
        'login',
      );
    });

    it('passes options.retry to Turnstile', () => {
      renderWidget({ options: { retry: 'never' } });
      expect(screen.getByTestId('turnstile')).toHaveAttribute(
        'data-retry',
        'never',
      );
    });

    it('passes options.refreshExpired to Turnstile', () => {
      renderWidget({ options: { refreshExpired: 'manual' } });
      expect(screen.getByTestId('turnstile')).toHaveAttribute(
        'data-refresh-expired',
        'manual',
      );
    });

    it('passes combined options correctly', () => {
      renderWidget({
        options: { theme: 'light', size: 'flexible', tabIndex: 1 },
      });
      const el = screen.getByTestId('turnstile');
      expect(el).toHaveAttribute('data-theme', 'light');
      expect(el).toHaveAttribute('data-size', 'flexible');
      expect(el).toHaveAttribute('data-tab-index', '1');
    });
  });

  // --- injectScript prop ---------------------------------------------------

  describe('injectScript prop', () => {
    it('passes injectScript=false to Turnstile', () => {
      renderWidget({ injectScript: false });
      expect(screen.getByTestId('turnstile')).toHaveAttribute(
        'data-inject-script',
        'false',
      );
    });
  });

  // --- Callback props ------------------------------------------------------

  describe('callback props', () => {
    it('passes onSuccess callback to Turnstile', () => {
      const onSuccess = jest.fn();
      renderWidget({ onSuccess });
      expect(MockTurnstile).toHaveBeenCalledWith(
        expect.objectContaining({ onSuccess }),
        null,
      );
    });

    it('passes onExpire callback to Turnstile', () => {
      const onExpire = jest.fn();
      renderWidget({ onExpire });
      expect(MockTurnstile).toHaveBeenCalledWith(
        expect.objectContaining({ onExpire }),
        null,
      );
    });

    it('passes onError callback to Turnstile', () => {
      const onError = jest.fn();
      renderWidget({ onError });
      expect(MockTurnstile).toHaveBeenCalledWith(
        expect.objectContaining({ onError }),
        null,
      );
    });

    it('passes onTimeout callback to Turnstile', () => {
      const onTimeout = jest.fn();
      renderWidget({ onTimeout });
      expect(MockTurnstile).toHaveBeenCalledWith(
        expect.objectContaining({ onTimeout }),
        null,
      );
    });

    it('passes onWidgetLoad callback to Turnstile', () => {
      const onWidgetLoad = jest.fn();
      renderWidget({ onWidgetLoad });
      expect(MockTurnstile).toHaveBeenCalledWith(
        expect.objectContaining({ onWidgetLoad }),
        null,
      );
    });

    it('passes onBeforeInteractive callback to Turnstile', () => {
      const onBeforeInteractive = jest.fn();
      renderWidget({ onBeforeInteractive });
      expect(MockTurnstile).toHaveBeenCalledWith(
        expect.objectContaining({ onBeforeInteractive }),
        null,
      );
    });

    it('passes onAfterInteractive callback to Turnstile', () => {
      const onAfterInteractive = jest.fn();
      renderWidget({ onAfterInteractive });
      expect(MockTurnstile).toHaveBeenCalledWith(
        expect.objectContaining({ onAfterInteractive }),
        null,
      );
    });

    it('passes onUnsupported callback to Turnstile', () => {
      const onUnsupported = jest.fn();
      renderWidget({ onUnsupported });
      expect(MockTurnstile).toHaveBeenCalledWith(
        expect.objectContaining({ onUnsupported }),
        null,
      );
    });

    it('passes onLoadScript callback to Turnstile', () => {
      const onLoadScript = jest.fn();
      renderWidget({ onLoadScript });
      expect(MockTurnstile).toHaveBeenCalledWith(
        expect.objectContaining({ onLoadScript }),
        null,
      );
    });
  });

  // --- scriptOptions prop --------------------------------------------------

  describe('scriptOptions prop', () => {
    it('passes scriptOptions to Turnstile', () => {
      const scriptOptions = { nonce: 'abc123', appendTo: 'body', defer: false };
      renderWidget({ scriptOptions });
      expect(MockTurnstile).toHaveBeenCalledWith(
        expect.objectContaining({ scriptOptions }),
        null,
      );
    });
  });

  // --- Additional HTML attributes (rest props) -----------------------------

  describe('rest props', () => {
    it('forwards additional HTML attributes to the container', () => {
      renderWidget({ 'aria-label': 'CAPTCHA widget', 'data-custom': 'value' });
      const el = screen.getByTestId('turnstile');
      expect(el).toHaveAttribute('aria-label', 'CAPTCHA widget');
      expect(el).toHaveAttribute('data-custom', 'value');
    });
  });

  // --- forwardRef ----------------------------------------------------------

  describe('forwardRef', () => {
    it('forwards the ref to the underlying Turnstile element', () => {
      const ref = createRef();
      render(<TurnstileWidget siteKey={SITE_KEY} ref={ref} />);
      expect(ref.current).not.toBeNull();
    });
  });
});
