import type { AxiosRequestConfig } from 'axios'
import { apiClient } from '@/lib/api/client'
import { toCamelCaseDeep, toSnakeCaseDeep } from '@/lib/api/transform'

/**
 * Typed request helpers on top of the shared Axios instance.
 *
 * Responsibilities kept here (so feature `api.ts` files stay thin):
 * - serialize request params/bodies from camelCase to the backend's snake_case
 * - unwrap the `{ data, message? }` envelope
 * - convert the response payload back to camelCase domain shape
 *
 * Auth, 401 refresh/retry, and error normalization are handled by the
 * interceptors in `client.ts`; a rejected call here is always an `ApiError`.
 */

function looksLikeEnvelope(value: Record<string, unknown>): boolean {
  const keys = Object.keys(value)
  return keys.includes('data') && keys.every((key) => key === 'data' || key === 'message')
}

/** Accepts both `{ data, message? }` envelopes and bare payloads. */
function unwrapEnvelope(payload: unknown): unknown {
  if (payload !== null && typeof payload === 'object' && !Array.isArray(payload)) {
    const record = payload as Record<string, unknown>
    if (looksLikeEnvelope(record)) {
      return record.data
    }
  }
  return payload
}

async function request<TDomain>(config: AxiosRequestConfig): Promise<TDomain> {
  const response = await apiClient.request<unknown>({
    ...config,
    params: config.params === undefined ? undefined : toSnakeCaseDeep(config.params),
    data: config.data === undefined ? undefined : toSnakeCaseDeep(config.data),
  })

  return toCamelCaseDeep<TDomain>(unwrapEnvelope(response.data))
}

export const http = {
  get: <TDomain>(url: string, config?: AxiosRequestConfig): Promise<TDomain> =>
    request<TDomain>({ ...config, method: 'GET', url }),

  post: <TDomain>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<TDomain> =>
    request<TDomain>({ ...config, method: 'POST', url, data }),

  put: <TDomain>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<TDomain> =>
    request<TDomain>({ ...config, method: 'PUT', url, data }),

  patch: <TDomain>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<TDomain> =>
    request<TDomain>({ ...config, method: 'PATCH', url, data }),

  delete: <TDomain>(url: string, config?: AxiosRequestConfig): Promise<TDomain> =>
    request<TDomain>({ ...config, method: 'DELETE', url }),
}
