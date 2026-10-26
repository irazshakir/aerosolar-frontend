import { env } from '@/config/env'
import {
  mockCreateReport,
  mockDeleteReport,
  mockFetchAnalyticsSummary,
  mockFetchChannelPerformance,
  mockFetchReports,
} from '@/features/analytics/mock'
import type {
  AnalyticsMetric,
  AnalyticsReport,
  AnalyticsReportInput,
  ChannelPerformance,
} from '@/features/analytics/types'
import { endpoints } from '@/lib/api/endpoints'
import { http } from '@/lib/api/http'

export async function fetchAnalyticsSummary(): Promise<AnalyticsMetric[]> {
  if (env.useMockApi) {
    return mockFetchAnalyticsSummary()
  }

  return http.get<AnalyticsMetric[]>(endpoints.analytics.summary)
}

export async function fetchChannelPerformance(): Promise<ChannelPerformance[]> {
  if (env.useMockApi) {
    return mockFetchChannelPerformance()
  }

  return http.get<ChannelPerformance[]>(endpoints.analytics.channels)
}

export async function fetchReports(): Promise<AnalyticsReport[]> {
  if (env.useMockApi) {
    return mockFetchReports()
  }

  return http.get<AnalyticsReport[]>(endpoints.analytics.reports)
}

export async function createReport(input: AnalyticsReportInput): Promise<AnalyticsReport> {
  if (env.useMockApi) {
    return mockCreateReport(input)
  }

  return http.post<AnalyticsReport>(endpoints.analytics.reports, input)
}

export async function deleteReport(id: string): Promise<void> {
  if (env.useMockApi) {
    return mockDeleteReport(id)
  }

  await http.delete<void>(endpoints.analytics.report(id))
}
