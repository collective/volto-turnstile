---
myst:
  html_meta:
    "description": "Cloudflare Turnstile integration with Volto how-to guides"
    "property=og:description": "Cloudflare Turnstile Volto how-to guides"
    "property=og:title": "Cloudflare Turnstile integration with Volto how-to guides"
    "keywords": "Cloudflare, Turnstile, service, Volto, integration, documentation, how-to, guides"
---

# Security access

The {term}`volto-turnstile` {term}`add-on` reusing the following roles and permissions from the
{term}`collective.volto.turnstile` {term}`add-on`:

## Roles

- ``Cloudflare Turnstile`` role (**NEW!!!**).

## Permissions

- ``volto.turnstile: Manage Cloudflare Turnstile Settings`` permission (**NEW!!!**) grants access to the following roles:

  - ``Cloudflare Turnstile`` role.

    ```{tip}
    If to grant this role to a user, this inherited the permissions that included, and there are details bellow:
    ```

- The ``Plone Site Setup: Overview`` permission grants access to the `Site Setup: Overview ` view to the following roles:

  - The ``Manager`` role.

  - The ``Site Administrator`` role.

  - The ``Cloudflare Turnstile`` role.
