/**
 * Raw design tokens. No Ant Design imports here — `antdTheme.ts` maps these
 * values onto the Ant Design token contract.
 */

export const palette = {
  brand500: '#6C4DF6',
  brand600: '#5B3EE0',
  brand50: '#F1EEFF',

  gray25: '#FCFCFD',
  gray50: '#F9FAFB',
  gray100: '#F2F4F7',
  gray200: '#EAECF0',
  gray300: '#D0D5DD',
  gray400: '#98A2B3',
  gray500: '#667085',
  gray600: '#475467',
  gray900: '#101828',

  white: '#FFFFFF',
  canvas: '#F7F8FA',
  tableHeader: '#FAFAFB',

  success: '#12B76A',
  warning: '#F79009',
  error: '#F04438',
  info: '#6C4DF6',
} as const

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

export const radii = {
  sm: 8,
  md: 10,
  lg: 14,
  xl: 16,
  pill: 999,
} as const

export const layout = {
  sidebarWidth: 248,
  sidebarCollapsedWidth: 72,
  headerHeight: 56,
  contentPadding: 20,
  contentMaxWidth: 1440,
  authCardMaxWidth: 420,
  mobileBreakpoint: 992,
} as const

/**
 * Compact type scale. Dashboard screens are dense by design: a 13px base keeps
 * wide tables readable while still fitting most of their columns on screen.
 */
export const typography = {
  fontFamily:
    "'Inter Variable', Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  baseSize: 13,
  headingWeight: 600,
  size: {
    caption: 11,
    small: 12,
    body: 13,
    bodyStrong: 14,
    sectionTitle: 15,
    pageTitle: 20,
    metric: 24,
  },
} as const
