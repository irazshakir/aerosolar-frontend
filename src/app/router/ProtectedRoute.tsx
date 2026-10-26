import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { FullPageLoader } from '@/components/feedback/FullPageLoader'
import { useSessionBootstrap } from '@/features/auth/hooks'
import { useAuthStore } from '@/store/authStore'

/**
 * Gate for authenticated routes. `idle` means the session has not been restored
 * yet, so we show a loader instead of flashing the login screen.
 */
export function ProtectedRoute() {
  const status = useAuthStore((state) => state.status)
  const location = useLocation()

  useSessionBootstrap()

  if (status === 'idle') {
    return <FullPageLoader tip="Preparing your workspace…" minHeight="100vh" />
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
