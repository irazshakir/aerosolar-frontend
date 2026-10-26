import type {
  AnalyticsMetric,
  AnalyticsReport,
  AnalyticsReportInput,
  ChannelPerformance,
  ReportPeriod,
} from '@/features/analytics/types'

const MIN_LATENCY_MS = 300
const MAX_LATENCY_MS = 600

function delay(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS))
  })
}

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
}

function periodStart(period: ReportPeriod): string {
  const days = period === '7d' ? 7 : period === '30d' ? 30 : 90
  return daysAgo(days)
}

const metrics: AnalyticsMetric[] = [
  {
    id: 'conversations',
    label: 'Conversations',
    value: 12840,
    delta: 12.4,
    format: 'number',
    hint: 'Across WhatsApp, Messenger, and web chat',
  },
  {
    id: 'new-leads',
    label: 'New leads',
    value: 1860,
    delta: 8.2,
    format: 'number',
    hint: 'Captured by the shared inbox team',
  },
  {
    id: 'conversion-rate',
    label: 'Conversion rate',
    value: 24.6,
    delta: 2.1,
    format: 'percent',
    hint: 'Leads converted into paying customers',
  },
  {
    id: 'attributed-revenue',
    label: 'Attributed revenue',
    value: 148500,
    delta: 6.8,
    format: 'currency',
    hint: 'Closed revenue traced back to chat',
  },
]

const channels: ChannelPerformance[] = [
  {
    channel: 'whatsapp',
    conversations: 8240,
    leads: 1180,
    conversionRate: 27.4,
    responseMinutes: 2.8,
  },
  {
    channel: 'messenger',
    conversations: 3120,
    leads: 420,
    conversionRate: 19.6,
    responseMinutes: 4.1,
  },
  {
    channel: 'website',
    conversations: 1100,
    leads: 210,
    conversionRate: 22.9,
    responseMinutes: 3.2,
  },
  {
    channel: 'instagram',
    conversations: 380,
    leads: 50,
    conversionRate: 13.2,
    responseMinutes: 6.5,
  },
]

let reports: AnalyticsReport[] = [
  {
    id: 'report_1',
    name: 'Weekly conversations summary',
    type: 'conversations',
    format: 'pdf',
    period: '7d',
    periodStart: periodStart('7d'),
    periodEnd: daysAgo(0),
    status: 'ready',
    createdAt: daysAgo(1),
    createdBy: 'Ayesha Khan',
  },
  {
    id: 'report_2',
    name: 'Lead conversion — September',
    type: 'leads',
    format: 'csv',
    period: '30d',
    periodStart: periodStart('30d'),
    periodEnd: daysAgo(0),
    status: 'ready',
    createdAt: daysAgo(4),
    createdBy: 'Bilal Ahmed',
  },
  {
    id: 'report_3',
    name: 'Revenue attribution Q3',
    type: 'revenue',
    format: 'pdf',
    period: 'quarter',
    periodStart: periodStart('quarter'),
    periodEnd: daysAgo(0),
    status: 'ready',
    createdAt: daysAgo(10),
    createdBy: 'Sana Malik',
  },
  {
    id: 'report_4',
    name: 'Agent performance review',
    type: 'agent-performance',
    format: 'csv',
    period: '30d',
    periodStart: periodStart('30d'),
    periodEnd: daysAgo(0),
    status: 'ready',
    createdAt: daysAgo(15),
    createdBy: 'Hassan Raza',
  },
]

let sequence = 4

function nextId(): string {
  sequence += 1
  return `report_${sequence}`
}

export async function mockFetchAnalyticsSummary(): Promise<AnalyticsMetric[]> {
  await delay()
  return metrics
}

export async function mockFetchChannelPerformance(): Promise<ChannelPerformance[]> {
  await delay()
  return channels
}

export async function mockFetchReports(): Promise<AnalyticsReport[]> {
  await delay()
  return [...reports].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )
}

export async function mockCreateReport(
  input: AnalyticsReportInput,
): Promise<AnalyticsReport> {
  await delay()

  const report: AnalyticsReport = {
    id: nextId(),
    name: input.name,
    type: input.type,
    format: input.format,
    period: input.period,
    periodStart: periodStart(input.period),
    periodEnd: new Date().toISOString(),
    status: 'ready',
    createdAt: new Date().toISOString(),
    createdBy: 'You',
  }

  reports = [report, ...reports]
  return report
}

export async function mockDeleteReport(id: string): Promise<void> {
  await delay()

  const exists = reports.some((report) => report.id === id)
  if (!exists) {
    throw new Error('That report no longer exists.')
  }

  reports = reports.filter((report) => report.id !== id)
}
