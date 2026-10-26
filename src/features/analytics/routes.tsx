import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const AnalyticsPage = lazy(() => import('@/features/analytics/pages/AnalyticsPage'))

export const analyticsRoutes: RouteObject[] = [
  {
    path: '/analytics',
    element: <AnalyticsPage />,
  },
]
