import axios from 'axios'

export interface ApiError {
  status: number | null
  code: string
  message: string
  details?: unknown
}

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.'

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    typeof (error as ApiError).message === 'string'
  )
}

function extractMessage(payload: unknown): string | undefined {
  if (typeof payload === 'string' && payload.trim().length > 0) {
    return payload
  }

  if (typeof payload === 'object' && payload !== null) {
    const record = payload as Record<string, unknown>
    if (typeof record.message === 'string' && record.message.trim().length > 0) {
      return record.message
    }
  }

  return undefined
}

function extractCode(payload: unknown): string | undefined {
  if (typeof payload === 'object' && payload !== null) {
    const record = payload as Record<string, unknown>
    if (typeof record.code === 'string' && record.code.length > 0) {
      return record.code
    }
  }

  return undefined
}

/** Normalizes anything thrown by the API layer into a user-safe shape. */
export function toApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error
  }

  if (axios.isAxiosError(error)) {
    const payload = error.response?.data
    return {
      status: error.response?.status ?? null,
      code: extractCode(payload) ?? 'request_failed',
      message: extractMessage(payload) ?? FALLBACK_MESSAGE,
      details: payload,
    }
  }

  if (error instanceof Error) {
    return {
      status: null,
      code: 'unexpected_error',
      message: error.message || FALLBACK_MESSAGE,
    }
  }

  return { status: null, code: 'unexpected_error', message: FALLBACK_MESSAGE }
}

export function getErrorMessage(error: unknown): string {
  return toApiError(error).message
}
