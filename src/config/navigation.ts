import { createElement } from 'react'
import type { ReactNode } from 'react'
import {
  AppstoreOutlined,
  BankOutlined,
  BarChartOutlined,
  ContactsOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  InboxOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { brand } from '@/theme/brand'

export interface NavItem {
  key: string
  label: string
  path: string
  /** Top-level items only — submenu entries are text-only. */
  icon?: ReactNode
  children?: NavItem[]
  hidden?: boolean
}

export const navigation: NavItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    path: '/dashboard',
    icon: createElement(DashboardOutlined),
  },
  {
    key: 'contacts',
    label: 'Contacts',
    path: '/contacts',
    icon: createElement(ContactsOutlined),
  },
  {
    key: 'inbox',
    label: 'Inbox',
    path: '/inbox',
    icon: createElement(InboxOutlined),
  },
  {
    key: 'products',
    label: 'Products',
    path: '/products',
    icon: createElement(AppstoreOutlined),
    children: [
      { key: 'products-panels', label: 'Panels', path: '/products/panels' },
      { key: 'products-inverters', label: 'Inverters', path: '/products/inverters' },
      { key: 'products-batteries', label: 'Batteries', path: '/products/batteries' },
      { key: 'products-services', label: 'Services', path: '/products/services' },
      { key: 'products-packages', label: 'Packages', path: '/products/packages' },
    ],
  },
  {
    key: 'analytics',
    label: 'Analytics',
    path: '/analytics',
    icon: createElement(BarChartOutlined),
  },
  {
    key: 'settings',
    label: 'Settings',
    path: '/settings',
    icon: createElement(SettingOutlined),
  },
  {
    key: 'proposals',
    label: 'Proposals',
    path: '/proposals',
    icon: createElement(FileTextOutlined),
  },
  {
    key: 'invoices',
    label: 'Invoices',
    path: '/invoices',
    icon: createElement(FileDoneOutlined),
  },
  {
    key: 'accounts',
    label: 'Accounts',
    path: '/accounts',
    icon: createElement(BankOutlined),
  },
  {
    // Reached from the profile menu, so it is not part of the sidebar itself.
    key: 'profile',
    label: 'My profile',
    path: '/profile',
    icon: createElement(UserOutlined),
    hidden: true,
  },
]

/** Breadcrumb trail for a path, based on the navigation tree. */
export function getNavTrail(pathname: string): NavItem[] {
  for (const item of navigation) {
    if (item.path === pathname) {
      return [item]
    }
    const child = item.children?.find((candidate) => candidate.path === pathname)
    if (child) {
      return [item, child]
    }
  }
  return []
}

export function getPageTitle(pathname: string): string {
  const trail = getNavTrail(pathname)
  return trail.length > 0 ? (trail[trail.length - 1]?.label ?? brand.appName) : brand.appName
}

export const homePath = navigation[0]?.path ?? '/'
