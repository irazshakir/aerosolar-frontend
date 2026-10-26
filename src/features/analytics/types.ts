export type MetricFormat = 'number' | 'percent' | 'currency'

export interface AnalyticsMetric {
  id: string
  label: string
  value: number
  /** Percentage change against the previous period. */
  delta: number
  format: MetricFormat
  hint?: string
}

export type AnalyticsChannel = 'whatsapp' | 'messenger' | 'website' | 'instagram'

export interface ChannelPerformance {
  channel: AnalyticsChannel
  conversations: number
  leads: number
  conversionRate: number
  responseMinutes: number
}

export type ReportType = 'conversations' | 'leads' | 'revenue' | 'agent-performance'

export type ReportFormat = 'pdf' | 'csv'

export type ReportStatus = 'ready' | 'generating'

export type ReportPeriod = '7d' | '30d' | '90d' | 'quarter'

export interface AnalyticsReport {
  id: string
  name: string
  type: ReportType
  format: ReportFormat
  period: ReportPeriod
  periodStart: string
  periodEnd: string
  status: ReportStatus
  createdAt: string
  createdBy: string
}

export interface AnalyticsReportInput {
  name: string
  type: ReportType
  format: ReportFormat
  period: ReportPeriod
}
