import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/app/router/ProtectedRoute'
import { ResultPage } from '@/components/feedback/ResultPage'
import { accountsRoutes } from '@/features/accounts/routes'
import { analyticsRoutes } from '@/features/analytics/routes'
import { authRoutes } from '@/features/auth/routes'
import { chatbotRoutes } from '@/features/chatbots/routes'
import { contactsRoutes } from '@/features/contacts/routes'
import { dashboardRoutes } from '@/features/dashboard/routes'
import { inboxRoutes } from '@/features/inbox/routes'
import { invoicesRoutes } from '@/features/invoices/routes'
import { profileRoutes } from '@/features/profile/routes'
import { productRoutes } from '@/features/products/routes'
import { proposalsRoutes } from '@/features/proposals/routes'
import { settingsRoutes } from '@/features/settings/routes'
import AppLayout from '@/layouts/AppLayout'
import AuthLayout from '@/layouts/AuthLayout'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: authRoutes,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <Navigate to="/dashboard" replace /> },
          ...dashboardRoutes,
          ...contactsRoutes,
          ...inboxRoutes,
          ...productRoutes,
          ...analyticsRoutes,
          ...settingsRoutes,
          ...proposalsRoutes,
          ...invoicesRoutes,
          ...accountsRoutes,
          ...chatbotRoutes,
          ...profileRoutes,
          { path: '*', element: <ResultPage status={404} /> },
        ],
      },
    ],
  },
])
