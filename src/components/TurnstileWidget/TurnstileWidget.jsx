import { forwardRef } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

/**
 * TurnstileWidget wraps the Cloudflare Turnstile challenge widget
 * from `@marsidev/react-turnstile` for use in Plone/Volto views and forms.
 *
 * Style-related props
 * -------------------
 * @param {string}  [className]          - CSS class applied to the container element.
 * @param {object}  [style]              - Inline CSS styles for the container element.
 * @param {string}  [id]                 - `id` attribute of the container element.
 *
 * Widget appearance / render options (`options` object)
 * ------------------------------------------------------
 * @param {object}  [options]
 * @param {'light'|'dark'|'auto'}                   [options.theme='auto']        - Widget colour theme.
 * @param {'normal'|'compact'|'flexible'|'invisible'} [options.size='normal']     - Widget size.
 * @param {'always'|'execute'|'interaction-only'}   [options.appearance='always'] - When to show the widget.
 * @param {'render'|'execute'}                      [options.execution='render']  - When to run the challenge.
 * @param {string|TurnstileLangCode}                [options.language]            - BCP 47 language code override.
 * @param {number}                                  [options.tabIndex=0]          - Tab index of the iframe.
 * @param {string}                                  [options.action]              - Customer widget identifier for analytics.
 * @param {string}                                  [options.cData]               - Arbitrary customer data forwarded to callbacks.
 * @param {'auto'|'never'}                          [options.retry='auto']        - Automatic retry behaviour on failure.
 * @param {number}                                  [options.retryInterval=8000]  - Ms between automatic retries.
 * @param {'auto'|'manual'|'never'}                 [options.refreshExpired='auto']   - How to handle token expiry.
 * @param {'auto'|'manual'|'never'}                 [options.refreshTimeout='auto']   - How to handle widget timeout.
 * @param {boolean}                                 [options.responseField=true]      - Inject hidden `<input>` with token.
 * @param {string}                                  [options.responseFieldName='cf-turnstile-response'] - Name of that input.
 * @param {boolean}                                 [options.feedbackEnabled=true]    - Allow Cloudflare feedback on failure.
 *
 * Script injection options (`scriptOptions` object)
 * --------------------------------------------------
 * @param {object}          [scriptOptions]
 * @param {string}          [scriptOptions.nonce]      - Nonce for the injected script element.
 * @param {boolean}         [scriptOptions.defer=true] - Set the `defer` attribute on the script.
 * @param {boolean}         [scriptOptions.async=true] - Set the `async` attribute on the script.
 * @param {'head'|'body'}   [scriptOptions.appendTo='head'] - Where to inject the script.
 * @param {string}          [scriptOptions.id='cf-turnstile-script'] - `id` of the script element.
 * @param {string}          [scriptOptions.crossOrigin] - `crossOrigin` attribute for the script.
 *
 * Required prop
 * -------------
 * @param {string}  siteKey - Cloudflare Turnstile site key (required).
 *
 * Lifecycle callbacks
 * -------------------
 * @param {(token: string) => void}   [onSuccess]            - Called with the token after a successful challenge.
 * @param {() => void}                [onExpire]             - Called when the token expires.
 * @param {(errorCode: string) => void} [onError]            - Called on network error or failed challenge.
 * @param {() => void}                [onBeforeInteractive]  - Called before the user is prompted.
 * @param {() => void}                [onAfterInteractive]   - Called after the interactive challenge is solved.
 * @param {() => void}                [onUnsupported]        - Called when the browser is not supported.
 * @param {() => void}                [onTimeout]            - Called when the widget times out.
 * @param {(widgetId: string) => void} [onWidgetLoad]        - Called with the widget ID after the widget renders.
 * @param {() => void}                [onLoadScript]         - Called when the Turnstile script finishes loading.
 *
 * Misc
 * ----
 * @param {React.ElementType} [as='div']                      - HTML tag used for the container element.
 * @param {boolean}           [injectScript=true]             - Auto-inject the Turnstile script.
 * @param {boolean}           [rerenderOnCallbackChange=false] - Re-render the widget when callbacks change.
 * @param {React.Ref}         ref                             - Forwarded ref exposing the TurnstileInstance API
 *                                                             (`reset`, `execute`, `getResponse`, `isExpired`, …).
 */
const TurnstileWidget = forwardRef(function TurnstileWidget(
  {
    siteKey,
    className,
    style,
    id,
    options,
    scriptOptions,
    onSuccess,
    onExpire,
    onError,
    onBeforeInteractive,
    onAfterInteractive,
    onUnsupported,
    onTimeout,
    onWidgetLoad,
    as,
    injectScript,
    onLoadScript,
    rerenderOnCallbackChange,
    ...rest
  },
  ref,
) {
  return (
    <Turnstile
      ref={ref}
      siteKey={siteKey}
      className={className}
      style={style}
      id={id}
      options={options}
      scriptOptions={scriptOptions}
      onSuccess={onSuccess}
      onExpire={onExpire}
      onError={onError}
      onBeforeInteractive={onBeforeInteractive}
      onAfterInteractive={onAfterInteractive}
      onUnsupported={onUnsupported}
      onTimeout={onTimeout}
      onWidgetLoad={onWidgetLoad}
      as={as}
      injectScript={injectScript}
      onLoadScript={onLoadScript}
      rerenderOnCallbackChange={rerenderOnCallbackChange}
      {...rest}
    />
  );
});

export default TurnstileWidget;

