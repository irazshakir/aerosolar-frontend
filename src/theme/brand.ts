/**
 * The only file a deployment needs to change to re-skin the product.
 * Everything else reads colours and naming from here (via `theme/`).
 */
export const brand = {
  appName: 'AeroSolar',
  shortName: 'AeroSolar',
  primaryColor: '#6C4DF6',
  logoUrl: '/solarPanel.svg',
  supportEmail: 'support@aerosolar.example',
  favicon: '/favicon.svg',
} as const

export type Brand = typeof brand
