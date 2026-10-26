const DEV_API_FALLBACK = 'http://localhost:8000/api'

function readApiBaseUrl(): string {
  const value = import.meta.env.VITE_API_BASE_URL?.trim()
  if (value) {
    return value
  }

  if (import.meta.env.PROD) {
    throw new Error('VITE_API_BASE_URL must be set for production builds.')
  }

  return DEV_API_FALLBACK
}

export const env = {
  appName: import.meta.env.VITE_APP_NAME?.trim() || 'AeroSolar',
  apiBaseUrl: readApiBaseUrl(),
  /** Mock mode is on unless the flag is explicitly set to "false". */
  useMockApi: import.meta.env.VITE_USE_MOCK_API !== 'false',
} as const
