import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const AccountsPage = lazy(() => import('@/features/accounts/pages/AccountsPage'))

export const accountsRoutes: RouteObject[] = [
  {
    path: '/accounts',
    element: <AccountsPage />,
  },
]
