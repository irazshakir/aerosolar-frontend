import { env } from '@/config/env'
import type {
  AuthSession,
  AuthUser,
  LoginCredentials,
  RegisterPayload,
} from '@/features/auth/types'
import type { ApiError } from '@/lib/api/errors'
import { endpoints } from '@/lib/api/endpoints'
import { http } from '@/lib/api/http'

const MOCK_LATENCY_MS = 500
const MOCK_EXISTING_EMAIL = 'admin@aerosolar.example'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

function toDisplayName(email: string): string {
  const [localPart] = email.split('@')
  if (!localPart) {
    return 'AeroSolar Admin'
  }

  return localPart
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

/** Mock login: any valid email + 6 character password is accepted. */
export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  if (env.useMockApi) {
    await delay(MOCK_LATENCY_MS)
    return {
      user: {
        id: 'usr_mock_1',
        name: toDisplayName(credentials.email) || 'AeroSolar Admin',
        email: credentials.email,
        role: 'Owner',
      },
      accessToken: 'mock-access-token',
    }
  }

  return http.post<AuthSession>(endpoints.auth.login, credentials)
}

/**
 * Creates an account. The caller decides what happens next (this page sends the
 * visitor to `/login`), so no session is stored here.
 *
 * Mock: every payload succeeds except the seeded demo email, which returns the
 * same 409 the backend is expected to send for duplicates.
 */
export async function register(payload: RegisterPayload): Promise<AuthUser> {
  if (env.useMockApi) {
    await delay(MOCK_LATENCY_MS)

    if (payload.email.toLowerCase() === MOCK_EXISTING_EMAIL) {
      throw {
        status: 409,
        code: 'email_taken',
        message: 'An account with this email already exists.',
      } satisfies ApiError
    }

    return {
      id: 'usr_mock_2',
      name: payload.name,
      email: payload.email,
      role: 'Owner',
    }
  }

  return http.post<AuthUser>(endpoints.auth.register, payload)
}

/** Silent session restore from the httpOnly refresh cookie. */
export async function fetchSession(): Promise<AuthSession | null> {
  if (env.useMockApi) {
    return null
  }

  try {
    return await http.post<AuthSession>(endpoints.auth.refresh)
  } catch {
    return null
  }
}
