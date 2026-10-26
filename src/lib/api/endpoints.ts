/**
 * Single source of truth for backend routes.
 *
 * Every feature `api.ts` imports from here — no route string is written inline.
 * When the FastAPI backend changes a path, edit it once in this file.
 *
 * Paths are relative to `VITE_API_BASE_URL` (which already ends in `/api`).
 * Every real endpoint the app will call is listed here, even if the mock branch
 * is still active, so the backend contract is visible at a glance.
 */
export const endpoints = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    me: '/auth/me',
  },
  dashboard: {
    kpis: '/dashboard/kpis',
    activity: '/dashboard/activity',
  },
  chatbots: {
    list: '/chatbots',
    create: '/chatbots',
    detail: (id: string) => `/chatbots/${id}`,
    update: (id: string) => `/chatbots/${id}`,
    remove: (id: string) => `/chatbots/${id}`,
  },
  contacts: {
    list: '/contacts',
    create: '/contacts',
    detail: (id: string) => `/contacts/${id}`,
    update: (id: string) => `/contacts/${id}`,
    remove: (id: string) => `/contacts/${id}`,
  },
  products: {
    // One collection for every catalogue tab — `category` is a query filter.
    list: '/products',
    create: '/products',
    detail: (id: string) => `/products/${id}`,
    update: (id: string) => `/products/${id}`,
    remove: (id: string) => `/products/${id}`,
  },
  inbox: {
    conversations: '/conversations',
    messages: (id: string) => `/conversations/${id}/messages`,
    send: (id: string) => `/conversations/${id}/messages`,
    read: (id: string) => `/conversations/${id}/read`,
  },
  analytics: {
    summary: '/analytics/summary',
    channels: '/analytics/channels',
    reports: '/analytics/reports',
    report: (id: string) => `/analytics/reports/${id}`,
  },
  settings: {
    overview: '/settings',
    company: '/settings/company',
    integrations: '/settings/integrations',
    integration: (id: string) => `/settings/integrations/${id}`,
    connect: (id: string) => `/settings/integrations/${id}/connect`,
    disconnect: (id: string) => `/settings/integrations/${id}/disconnect`,
  },
  proposals: {
    list: '/proposals',
    create: '/proposals',
    detail: (id: string) => `/proposals/${id}`,
    update: (id: string) => `/proposals/${id}`,
    remove: (id: string) => `/proposals/${id}`,
    send: (id: string) => `/proposals/${id}/send`,
  },
  invoices: {
    list: '/invoices',
    create: '/invoices',
    detail: (id: string) => `/invoices/${id}`,
    update: (id: string) => `/invoices/${id}`,
    remove: (id: string) => `/invoices/${id}`,
    pay: (id: string) => `/invoices/${id}/pay`,
  },
  accounts: {
    ledgers: '/accounts/ledgers',
    profitAndLoss: '/accounts/profit-and-loss',
  },
} as const

export type Endpoints = typeof endpoints
