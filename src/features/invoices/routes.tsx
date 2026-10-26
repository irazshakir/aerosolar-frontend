import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const InvoicesPage = lazy(() => import('@/features/invoices/pages/InvoicesPage'))

export const invoicesRoutes: RouteObject[] = [
  {
    path: '/invoices',
    element: <InvoicesPage />,
  },
]
