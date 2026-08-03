---
myst:
  html_meta:
    "description": "Cloudflare Turnstile Volto concepts"
    "property=og:description": "Cloudflare Turnstile integration with Volto concepts"
    "property=og:title": "Cloudflare Turnstile integration with Volto concepts"
    "keywords": "Cloudflare, Turnstile, service, Volto, integration, documentation, concepts"
---

# Functional concepts

Functional concepts of integration with {term}`Cloudflare Turnstile` service in {term}`Plone` and {term}`Volto`.

Integrating {term}`Cloudflare Turnstile` into a {term}`Plone` and {term}`Volto` ecosystem involves bridging a Python-based
backend package ({term}`collective.volto.turnstile`) with a JavaScript/React frontend {term}`add-on` ({term}`volto-turnstile`).
This architecture ensures seamless Anti-spam protection for public-facing forms (such as contact forms and newsletter
subscriptions) while maintaining strict security boundaries.

---

## 1. Architectural overview

The integration relies on a decoupled client-server pattern typical of modern {term}`Volto` implementations:

* **Backend ({term}`collective.volto.turnstile`):** Manages administrative settings via a {term}`Plone` control panel
  ({term}`@cloudflare-turnstile-settings`), securely stores the {term}`Secret Key` in the {term}`Plone` Registry, and
  provides REST API endpoints to validate tokens submitted by the client with the Cloudflare's verification API.

* **Frontend ({term}`volto-turnstile`):** Provides React components (such as {term}`TurnstileWidget`) that render the
  widget in the browser using the public {term}`Site Key`, handle user interaction callbacks (`onSuccess`, `onExpire`,
  `onError`), and supply the resulting verification token in form payloads sent to backend services.

---

## 2. Core functional components

### A. Centralized configuration and security

* **Control Panel Integration:** Site administrators configure their {term}`Cloudflare Turnstile` credentials through a
  dedicated control panel in {term}`Plone`.

* **Public vs. Private Key Separation:**

* The {term}`Secret Key` remains on the backend, shielded from anonymous users to prevent unauthorized access
  or abuse.

* The {term}`Site Key` is exposes to the frontend so the widget can initialize correctly in the browser.



### B. Anonymous access & public exposure strategy

Because visitors interacting with public forms (like a newsletter subscription or contact page) are anonymous,
endpoints or settings required for frontend rendering must be handles:

* **Endpoint Accessibility:** Direct API calls from anonymous frontend sessions to administrative control panel endpoints
  (`@controlpanels`) trigger a `401 Unauthorized` error by design in {term}`Plone`.

* **Resolution Pattern:** To prevent authorization errors in public components like footers or public forms, the public {term}`Site Key`
   should either be bundles securely into frontend runtime configurations (`config.settings`) or exposed via a dedicated unauthenticated
   public service endpoint provided by the backend {term}`add-on`.

### C. Frontend lifecycle and state management

The integration relies on reactive state management within {term}`Volto` components:

1. **Initialization:** The {term}`TurnstileWidget` mounts in the `DOM` using a fallback or pre-configured site key while fetching dynamic
   configuration when permissions granted by the widget.

2. **Token Generation:** When a user passes the {term}`Cloudflare Turnstile` challenge, the widget generates a unique, short-lived cryptographic token.

3. **State Binding:** The `onSuccess(token)` callback updates the local component state (`turnstileToken`), enabling submission buttons
   that were previously incapacitated.

4. **Submission & Verification:** Form actions package the user input along with the `turnstileToken`. The backend intercepts this token,
   validates it securely server-side with {term}`Cloudflare Turnstile` using the {term}`Secret Key`, and either processes or rejects the request based on
   the verification outcome.
