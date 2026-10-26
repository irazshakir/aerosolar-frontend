import axios from 'axios'
import type { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { env } from '@/config/env'
import { endpoints } from '@/lib/api/endpoints'
import { clearAccessToken, getAccessToken, setAccessToken } from '@/lib/auth/tokenStore'
import { toApiError } from '@/lib/api/errors'
import { useAuthStore } from '@/store/authStore'

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

interface RefreshResponse {
  data: { accessToken: string }
}

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  timeout: 15_000,
  headers: { 'Content-Type': 'application/json' },
})

let refreshPromise: Promise<string | null> | null = null

/** Single-flight refresh so concurrent 401s trigger exactly one refresh call. */
function refreshAccessToken(): Promise<string | null> {
  refreshPromise ??= axios
    .post<RefreshResponse>(`${env.apiBaseUrl}${endpoints.auth.refresh}`, null, {
      withCredentials: true,
    })
    .then((response) => {
      const token = response.data.data.accessToken
      setAccessToken(token)
      return token
    })
    .catch(() => {
      clearAccessToken()
      return null
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

function redirectToLogin(): void {
  if (typeof window === 'undefined' || window.location.pathname.startsWith('/login')) {
    return
  }
  useAuthStore.getState().clearSession()
  window.location.assign('/login')
}

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryableRequestConfig | undefined
    const isUnauthorized = error.response?.status === 401
    const isAuthCall =
      original?.url?.includes(endpoints.auth.refresh) ||
      original?.url?.includes(endpoints.auth.login) ||
      original?.url?.includes(endpoints.auth.register)

    if (isUnauthorized && original && !original._retry && !isAuthCall) {
      original._retry = true
      const token = await refreshAccessToken()

      if (token) {
        original.headers.Authorization = `Bearer ${token}`
        return apiClient.request(original)
      }

      redirectToLogin()
    }

    return Promise.reject(toApiError(error))
  },
)
