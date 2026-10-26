import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const PanelsPage = lazy(() => import('@/features/products/pages/PanelsPage'))
const InvertersPage = lazy(() => import('@/features/products/pages/InvertersPage'))
const BatteriesPage = lazy(() => import('@/features/products/pages/BatteriesPage'))
const ServicesPage = lazy(() => import('@/features/products/pages/ServicesPage'))
const PackagesPage = lazy(() => import('@/features/products/pages/PackagesPage'))

export const productRoutes: RouteObject[] = [
  {
    // The sidebar group itself is not a page, so send visitors to its first tab.
    path: '/products',
    element: <Navigate to="/products/panels" replace />,
  },
  {
    path: '/products/panels',
    element: <PanelsPage />,
  },
  {
    path: '/products/inverters',
    element: <InvertersPage />,
  },
  {
    path: '/products/batteries',
    element: <BatteriesPage />,
  },
  {
    path: '/products/services',
    element: <ServicesPage />,
  },
  {
    path: '/products/packages',
    element: <PackagesPage />,
  },
]
