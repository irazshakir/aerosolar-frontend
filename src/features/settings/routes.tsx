import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const SettingsPage = lazy(() => import('@/features/settings/pages/SettingsPage'))

export const settingsRoutes: RouteObject[] = [
  {
    path: '/settings',
    element: <SettingsPage />,
  },
]
