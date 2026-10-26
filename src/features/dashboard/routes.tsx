import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))

export const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
  },
]
