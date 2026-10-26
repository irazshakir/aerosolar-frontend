import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'))

export const profileRoutes: RouteObject[] = [
  {
    path: '/profile',
    element: <ProfilePage />,
  },
]
