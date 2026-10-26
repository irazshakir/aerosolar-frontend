import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const ContactsPage = lazy(() => import('@/features/contacts/pages/ContactsPage'))

export const contactsRoutes: RouteObject[] = [
  {
    path: '/contacts',
    element: <ContactsPage />,
  },
]
