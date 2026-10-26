import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const InboxPage = lazy(() => import('@/features/inbox/pages/InboxPage'))

export const inboxRoutes: RouteObject[] = [
  {
    path: '/inbox',
    element: <InboxPage />,
  },
]
