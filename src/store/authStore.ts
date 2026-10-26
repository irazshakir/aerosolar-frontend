import { create } from 'zustand'
import { clearAccessToken, setAccessToken } from '@/lib/auth/tokenStore'

export interface SessionUser {
  id: string
  name: string
  email: string
  role: string
}

export type AuthStatus = 'idle' | 'authenticated' | 'unauthenticated'

interface AuthState {
  user: SessionUser | null
  status: AuthStatus
  setSession: (user: SessionUser, accessToken: string) => void
  clearSession: () => void
  setStatus: (status: AuthStatus) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'idle',
  setSession: (user, accessToken) => {
    setAccessToken(accessToken)
    set({ user, status: 'authenticated' })
  },
  clearSession: () => {
    clearAccessToken()
    set({ user: null, status: 'unauthenticated' })
  },
  setStatus: (status) => set({ status }),
}))
