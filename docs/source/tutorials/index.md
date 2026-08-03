---
myst:
  html_meta:
    "description": "Cloudflare Turnstile integration with Volto Tutorials"
    "property=og:description": "Cloudflare Turnstile integration with Volto Tutorials"
    "property=og:title": "Cloudflare Turnstile integration with Volto Tutorials"
    "keywords": "Cloudflare, Turnstile, service, Volto, integration, documentation, tutorials"
---

# Custom REST services

{term}`Plone` can expose specific endpoints for {term}`Volto`. These services encapsulate
the logic for communicating with {term}`Cloudflare Turnstile` and provide a standardised format
for the front end.

---

(cloudflare-turnstile-settings-route)=
## Cloudflare Turnstile settings route

Anonymous users can't access registry resources by default with {term}`plone.restapi` (there is a special permission).

To avoid enabling registry access to everyone, this package exposes a dedicated RestApi route with {term}`Cloudflare Turnstile Settings` (`@cloudflare-turnstile-settings`):

Get the information from the {term}`Cloudflare Turnstile Settings` via `curl` command:

```shell
curl -X GET http://localhost:8080/Plone/@controlpanels/cloudflare-turnstile-settings \
  -H "Accept: application/json" \
  --user admin:admin
```

This route returns a JSON object containing the {term}`Cloudflare Turnstile Settings` and data via `curl` command:

```json
{
  "@id": "http://localhost:8080/Plone/@controlpanels/cloudflare-turnstile-settings",
  "data": {
    "secret_key": null,
    "site_key": null
  },
  "group": "Add-on Configuration",
  "schema": {
    "fieldsets": [
      {
        "behavior": "plone",
        "fields": [
          "site_key",
          "secret_key"
        ],
        "id": "default",
        "title": "Default"
      }
    ],
    "properties": {
      "secret_key": {
        "description": "The Secret Key of the Cloudflare Turnstile service.",
        "factory": "Text line (String)",
        "title": "Secret Key",
        "type": "string"
      },
      "site_key": {
        "description": "The Site Key of the Cloudflare Turnstile service.",
        "factory": "Text line (String)",
        "title": "Site Key",
        "type": "string"
      }
    },
    "required": [
      "site_key",
      "secret_key"
    ],
    "type": "object"
  },
  "title": "Cloudflare Turnstile Settings"
}
```

Below is a `PATCH` operation to set up the {term}`site_key` and {term}`site_key` fields values of the
{term}`Cloudflare Turnstile Settings`:

```shell
curl -i -X PATCH http://localhost:8080/Plone/@controlpanels/cloudflare-turnstile-settings \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  --data '{"site_key": "70342m13z52v2qxt4t6op55629301108", "site_key": "204615m3a78w2fgt3t1nm34567890123", "list_id": "4702726"}' \
  --user admin:admin
```

This route returns a HTTP response:

```shell
HTTP/1.1 204 No Content
Connection: close
Date: Mon, 27 Jul 2026 10:45:28 GMT
Server: waitress
Via: waitress
X-Powered-By: Zope (www.zope.dev), Python (www.python.org)
```

That means you updated the values in the {term}`Cloudflare Turnstile Settings` control panel fields correctly.

```{note}
You can validate the update operation, going to ``Site setup > Add-on Settings > Cloudflare Turnstile Settings``.
```

---

(cloudflare-turnstile-sitekey-route)=
## Cloudflare Turnstile site_key route

Anonymous users can access to the {term}`Site Key` registry resource by default with {term}`plone.restapi` (there is a Public permission).

This package exposes a dedicated RestApi route with {term}`Site Key` (`@cloudflare-turnstile-sitekey`):

Get the information from the {term}`Site Key` via `curl` command:

```shell
curl -X GET http://localhost:8080/Plone/++api++/@cloudflare-turnstile-sitekey \
  -H "Accept: application/json"
```

This route returns a JSON object containing the {term}`Site Key` data via `curl` command:

```json
{
  "@id": "http://localhost:8080/Plone/@cloudflare-turnstile-sitekey",
  "site_key": "1x00000000000000000000AA"
}
```

This `route` can be implements in {term}`Volto` _integration_ for a form component.
