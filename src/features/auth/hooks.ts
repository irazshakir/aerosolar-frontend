import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { fetchSession, login, register } from '@/features/auth/api'
import type {
  AuthSession,
  AuthUser,
  LoginCredentials,
  RegisterPayload,
} from '@/features/auth/types'
import { useAuthStore } from '@/store/authStore'

export const authKeys = {
  all: ['auth'] as const,
  session: () => [...authKeys.all, 'session'] as const,
}

export function useLogin() {
  const setSession = useAuthStore((state) => state.setSession)

  return useMutation<AuthSession, unknown, LoginCredentials>({
    mutationFn: login,
    onSuccess: (session) => {
      setSession(session.user, session.accessToken)
    },
  })
}

/** Creates an account. No session is stored — the visitor signs in afterwards. */
export function useRegister() {
  return useMutation<AuthUser, unknown, RegisterPayload>({
    mutationFn: register,
  })
}

/**
 * Resolves the `idle` auth state on app boot: either restores a session from the
 * refresh cookie or marks the visitor as unauthenticated.
 */
export function useSessionBootstrap() {
  const status = useAuthStore((state) => state.status)
  const setSession = useAuthStore((state) => state.setSession)
  const setStatus = useAuthStore((state) => state.setStatus)

  const sessionQuery = useQuery({
    queryKey: authKeys.session(),
    queryFn: fetchSession,
    enabled: status === 'idle',
    staleTime: Infinity,
    retry: false,
  })

  useEffect(() => {
    if (status !== 'idle' || !sessionQuery.isFetched) {
      return
    }

    if (sessionQuery.data) {
      setSession(sessionQuery.data.user, sessionQuery.data.accessToken)
    } else {
      setStatus('unauthenticated')
    }
  }, [status, sessionQuery.isFetched, sessionQuery.data, setSession, setStatus])
}
