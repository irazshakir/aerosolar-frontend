import { env } from '@/config/env'
import { endpoints } from '@/lib/api/endpoints'
import { http } from '@/lib/api/http'

export interface Kpi {
  id: string
  label: string
  value: number
  /** Percentage change against the previous period. */
  delta: number
  format: 'number' | 'percent' | 'currency'
  hint?: string
}

export type ActivityStatus = 'active' | 'paused' | 'draft' | 'error'

export interface ActivityItem {
  id: string
  actor: string
  action: string
  target: string
  status: ActivityStatus
  createdAt: string
}

const MOCK_LATENCY_MS = 450

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

const mockKpis: Kpi[] = [
  {
    id: 'conversations',
    label: 'Conversations',
    value: 12840,
    delta: 12.4,
    format: 'number',
    hint: 'Across all published chatbots',
  },
  {
    id: 'active-chatbots',
    label: 'Active chatbots',
    value: 24,
    delta: 4.2,
    format: 'number',
    hint: '6 drafts waiting for review',
  },
  {
    id: 'resolution-rate',
    label: 'Resolution rate',
    value: 86.3,
    delta: 2.8,
    format: 'percent',
    hint: 'Resolved without human hand-off',
  },
  {
    id: 'saved-cost',
    label: 'Saved cost',
    value: 48200,
    delta: -1.6,
    format: 'currency',
    hint: 'Estimated support cost avoided',
  },
]

const mockActivity: ActivityItem[] = [
  {
    id: 'act_1',
    actor: 'Ayesha Khan',
    action: 'published',
    target: 'Support assistant',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'act_2',
    actor: 'Bilal Ahmed',
    action: 'updated knowledge base of',
    target: 'Billing helper',
    status: 'active',
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: 'act_3',
    actor: 'Ayesha Khan',
    action: 'paused',
    target: 'Onboarding bot',
    status: 'paused',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: 'act_4',
    actor: 'Hassan Raza',
    action: 'created a draft for',
    target: 'Refund triage',
    status: 'draft',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: 'act_5',
    actor: 'System',
    action: 'flagged a failed sync on',
    target: 'Product FAQ',
    status: 'error',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
]

export async function fetchDashboardKpis(): Promise<Kpi[]> {
  if (env.useMockApi) {
    await delay(MOCK_LATENCY_MS)
    return mockKpis
  }

  return http.get<Kpi[]>(endpoints.dashboard.kpis)
}

export async function fetchRecentActivity(): Promise<ActivityItem[]> {
  if (env.useMockApi) {
    await delay(MOCK_LATENCY_MS + 150)
    return mockActivity
  }

  return http.get<ActivityItem[]>(endpoints.dashboard.activity)
}
