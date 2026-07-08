/**
 * Settings.
 * @module settings
 */

import type { ConfigType } from '@plone/registry';
import cloudSVG from 'volto-turnstile/icons/cloud.svg';

export default function install(config: ConfigType) {
  // Add the icon for the Cloudflare Turnstile settings control panel
  config.settings.controlPanelsIcons = {
    ...config.settings.controlPanelsIcons,
    'cloudflare-turnstile-settings': cloudSVG,
  };
  return config;
}
