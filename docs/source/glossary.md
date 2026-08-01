---
myst:
  html_meta:
    "description": "Terms and definitions used in the Cloudflare Turnstile integration with Volto documentation."
    "property=og:description": "Terms and definitions used in the Cloudflare Turnstile integration with Volto documentation."
    "property=og:title": "Glossary"
    "keywords": "Cloudflare, Turnstile, service, Volto, integration, documentation, glossary, term, definition"
---

This glossary provides terms and definitions relevant to {term}`Cloudflare Turnstile` integration with {term}`Plone`.

(glossary-label)=

# Glossary

```{glossary}
:sorted: true

Cloudflare Turnstile
    `Cloudflare Turnstile` is a `CAPTCHA-free` verification system designed to confirm that website visitors
    are real humans while blocking malicious bots. Unlike traditional CAPTCHAs, it operates transparently in
    the background, eliminating the need for users to solve puzzles or click images, thus improving user
    experience and site performance.

Plone
    [Plone](https://plone.org/) is an open-source content management system that is used to create, edit, and
    manage digital content, like websites, intranets and custom solutions. It comes with over 20 years of growth,
    optimisations, and refinements. The result is a system trusted by governments, universities, businesses, and
    other organisations all over the world.

Volto
    [Volto](https://github.com/plone/volto) is the default React-based frontend for {term}`Plone` 6.
    It communicates with the {term}`Plone` backend via exclusively through the {term}`plone.restapi` REST API.
    The {term}`volto-turnstile` {term}`add-on` integrates {term}`Cloudflare Turnstile` providing a React component
    for use within its forms into {term}`Volto` pages.

add-on
    An add-on in {term}`Plone` extends its core functionality.
    It is distributed as a Python package and installed via the {term}`Plone` Site Setup.
    {term}`collective.volto.turnstile` is a {term}`Plone` add-on.

    Its companion {term}`volto-turnstile` is a {term}`Volto` (JavaScript) add-on.

    In {term}`Volto`, an add-on is a JavaScript package.

    In {term}`Plone` core, an add-on is a Python package.

    -   [Plone core add-ons](https://github.com/collective/awesome-plone#readme)
    -   [Volto add-ons](https://github.com/collective/awesome-volto#readme)
    -   [Add-ons tagged with the trove classifier `Framework :: Plone` on PyPI](https://pypi.org/search/?c=Framework+%3A%3A+Plone)

plone.restapi
    [plone.restapi](https://6.docs.plone.org/plone.restapi/docs/source/) is the RESTful hypermedia API for {term}`Plone`.
    It enables {term}`Volto` and other clients to interact with {term}`Plone` content and configuration over HTTP using JSON.
    This {term}`add-on` registers its services and control panel adapters through ``plone.restapi``.
    It is used by {term}`collective.volto.turnstile` to expose the {term}`@cloudflare-turnstile-settings` endpoint to the {term}`Volto` frontend.

Control Panel
    Checkout the {term}`Cloudflare Turnstile Settings` term.

Cloudflare Turnstile Settings
    The `Cloudflare Turnstile Settings` configuration panel available in {term}`Plone`'s Site Setup under `Add-on Configuration`.
    It allows administrators to configure the {term}`Site Key` and {term}`Secret Key` fields stored in {term}`plone.registry`.

plone.registry
    A {term}`Plone` component that stores configuration values as named records.
    {term}`collective.volto.turnstile` uses it to persist the {term}`ICloudflareTurnstileSettings` interface fields ({term}`site_key` and {term}`secret_key`).

Registry
    The {term}`Plone` Registry is a key-value store for site configuration, managed by the {term}`plone.registry` package.
    Settings are declared through Zope schema interfaces and stored as typed records.
    In this {term}`add-on` the records are declared in {term}`ICloudflareTurnstileSettings` and stored under the ``turnstile`` prefix (e.g. ``turnstile.site_key``).
    They can be read using ``plone.api.portal.get_registry_record("turnstile.site_key")``.

GenericSetup
    A {term}`Plone` framework for managing configuration through filesystem-based import and export profiles.
    {term}`collective.volto.turnstile` uses a GenericSetup profile to register its registry records and control panel on installation.

collective.volto.turnstile
    `collective.volto.turnstile` is the {term}`Plone` {term}`add-on` that integrates {term}`Cloudflare Turnstile` sevice into a {term}`Plone` site.
    It provides a control panel to configure the {term}`Cloudflare Turnstile Settings` integration, a REST API endpoint to to add a new contact to
    a mailing list, and a browser layer ({term}`ICloudflareTurnstileLayer`) to scope its components.
    It is designed to work together with the {term}`volto-turnstile` {term}`Volto` {term}`add-on`.

    ```{tip}
    More infomation checkout the official [documentation](https://collectivevoltoturnstile.readthedocs.io/en/latest/).
    ```

volto-turnstile
    `volto-turnstile` is the {term}`Volto` {term}`add-on` that integrates {term}`Cloudflare Turnstile` sevice into a {term}`Plone` site via the {term}`collective.volto.turnstile` {term}`add-on`.
    It provides a control panel to configure the target municipality.

    ```{tip}
    More infomation checkout the official [documentation](https://volto-turnstile.readthedocs.io/en/latest/).
    ```

ICloudflareTurnstileLayer
    ``ICloudflareTurnstileLayer`` is a browser layer marker interface provided by this {term}`add-on`.
    It is applied to the request when the {term}`add-on` is installed, scoping all views, services, and adapters to sites where the {term}`add-on` is active.

ICloudflareTurnstileSettings
    ``ICloudflareTurnstileSettings`` is the Zope schema interface that declares the configuration fields for the {term}`Cloudflare Turnstile` {term}`add-on`.
    Currently it defines the fields ({term}`site_key` and {term}`secret_key`).
    It is used as the schema for both the {term}`Cloudflare Turnstile Settings` control panel and the {term}`Plone` {term}`Registry` records.

Site Key
site_key
    The `Site Key` using by the {term}`TurnstileWidget` component on the {term}`Volto` view.
    It is configured in the {term}`Cloudflare Turnstile Settings` control panel and used by the backend to communicate with the {term}`Cloudflare Turnstile` service.

Secret Key
secret_key
    The `Secret Key` of the {term}`Cloudflare Turnstile` widget.
    It is configured in the {term}`Cloudflare Turnstile Settings` control panel and used by the backend to communicate with the {term}`Cloudflare Turnstile` service.

@cloudflare-turnstile-settings
    A REST API endpoint exposed by {term}`collective.volto.turnstile` that provides the {term}`Cloudflare Turnstile Settings` to the {term}`Volto` frontend.
    Anonymous users cannot access the {term}`Plone` registry directly, so this dedicated endpoint is used instead.

    ```{note}
    Take a look to the {ref}`cloudflare-turnstile-settings-route` section.
    ```

@cloudflare-turnstile-sitekey
    A REST API endpoint exposed by {term}`collective.volto.turnstile` that allows {term}`Volto` can acces publicy to the {term}`Site Key` value.
    This endpoint is public (no authentication required) because the {term}`Site Key` must be accessible to anonymous users for the {term}`TurnstileWidget`
    component to work.

    ```{note}
    Take a look to the {ref}`cloudflare-turnstile-sitekey-route` section.
    ```

TurnstileWidget
    The {term}`volto-turnstile` {term}`add-on` provides a `React` component called `TurnstileWidget`, which you can use in your {term}`Volto` project
    to secure your form using the {term}`Cloudflare Turnstile` service.

```
