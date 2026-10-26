import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createReport,
  deleteReport,
  fetchAnalyticsSummary,
  fetchChannelPerformance,
  fetchReports,
} from '@/features/analytics/api'
import type { AnalyticsReportInput } from '@/features/analytics/types'

export const analyticsKeys = {
  all: ['analytics'] as const,
  summary: () => [...analyticsKeys.all, 'summary'] as const,
  channels: () => [...analyticsKeys.all, 'channels'] as const,
  reports: () => [...analyticsKeys.all, 'reports'] as const,
}

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: analyticsKeys.summary(),
    queryFn: fetchAnalyticsSummary,
  })
}

export function useChannelPerformance() {
  return useQuery({
    queryKey: analyticsKeys.channels(),
    queryFn: fetchChannelPerformance,
  })
}

export function useReports() {
  return useQuery({
    queryKey: analyticsKeys.reports(),
    queryFn: fetchReports,
  })
}

export function useCreateReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: AnalyticsReportInput) => createReport(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: analyticsKeys.reports() }),
  })
}

export function useDeleteReport() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteReport(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: analyticsKeys.reports() }),
  })
}
