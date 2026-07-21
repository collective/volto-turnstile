---
myst:
  html_meta:
    "description": "Cloudflare Turnstile integration with Volto how-to guides"
    "property=og:description": "Cloudflare Turnstile integration with Volto how-to guides"
    "property=og:title": "Cloudflare Turnstile integration with Volto how-to guides"
    "keywords": "Plone, Cloudflare Turnstile integration with Volto, how-to, guides"
---

# General information

This part of the documentation contains how-to guides, including installation and usage.

## Features

- Add a new `Cloudflare Turnstile Settings` Volto control panel.

- Add a new `Turnstile Widget` component.

## Screenshot

**Add-on Configuration Access**

<img width="290" alt="Add-on Configuration" src="https://raw.githubusercontent.com/collective/volto-turnstile/refs/heads/main/docs/source/images/addon-configuration-cloudflare-turnstile-icon.png">

---

**Cloudflare Turnstile Settings control panel**

<img width="720" alt="Cloudflare Turnstile Settings" src="https://raw.githubusercontent.com/collective/volto-turnstile/refs/heads/main/docs/source/images/cloudflare-turnstile-settings.png">

## Backend integration

To use this product in Plone CMS, you needs to include the following add-on in your project: https://github.com/collective/collective.volto.turnstile

## Translations

This product has been translated into

- English

- Spanish

## Install it

To install your project, you must choose the method appropriate to your version of Volto.


### Volto 18 and later

Add `volto-turnstile` to your `package.json`:

```json
"addons": [
    "volto-turnstile": "*"
]
```

```json
"dependencies": {
    "volto-turnstile": "*"
}
```

#### Install from Github

If you trying to install from Github you need edit the `mrs.developer.json` file:

```json
{
  "volto-turnstile": {
    "develop": true,
    "output": "./packages/",
    "package": "volto-turnstile",
    "url": "git@github.com:collective/volto-turnstile.git",
    "https": "https://github.com/collective/volto-turnstile.git",
    "branch": "main"
  }
}
```

The `mrs.developer.json` is using by an NodeJS utility called `mrs.developer` that makes
it easy to work with NPM projects containing lots of packages, of which you only want to
develop some.

Also add `volto-turnstile` to your `package.json`:

```json
"addons": [
    "volto-turnstile": "*"
]
```

```json
"dependencies": {
    "volto-turnstile": "workspace:*",
}
```

---

### Volto 17 and earlier

Create a new Volto project (you can skip this step if you already have one):

```
npm install -g yo @plone/generator-volto
yo @plone/volto my-volto-project --addon volto-turnstile
cd my-volto-project
```

Add `volto-turnstile` to your package.json:

```JSON
"addons": [
    "volto-turnstile"
],

"dependencies": {
    "volto-turnstile": "*"
}
```

Download and install the new add-on by running:

```
yarn install
```

Start volto with:

```
yarn start
```

## Use it

Visit http://localhost:3000/ in a browser, login, and check the awesome new features.
