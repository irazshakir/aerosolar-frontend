import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'

const ChatbotsPage = lazy(() => import('@/features/chatbots/pages/ChatbotsPage'))

export const chatbotRoutes: RouteObject[] = [
  {
    path: '/chatbots',
    element: <ChatbotsPage />,
  },
]
