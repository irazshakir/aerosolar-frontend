import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const ProposalsPage = lazy(() => import('@/features/proposals/pages/ProposalsPage'))

export const proposalsRoutes: RouteObject[] = [
  {
    path: '/proposals',
    element: <ProposalsPage />,
  },
]
