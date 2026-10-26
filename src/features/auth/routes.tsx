import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const SignUpPage = lazy(() => import('@/features/auth/pages/SignUpPage'))

export const authRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
  },
]
