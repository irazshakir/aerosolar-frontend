import { useQuery } from '@tanstack/react-query'
import { fetchDashboardKpis, fetchRecentActivity } from '@/features/dashboard/api'

export const dashboardKeys = {
  all: ['dashboard'] as const,
  kpis: () => [...dashboardKeys.all, 'kpis'] as const,
  activity: () => [...dashboardKeys.all, 'activity'] as const,
}

export function useDashboardKpis() {
  return useQuery({
    queryKey: dashboardKeys.kpis(),
    queryFn: fetchDashboardKpis,
  })
}

export function useRecentActivity() {
  return useQuery({
    queryKey: dashboardKeys.activity(),
    queryFn: fetchRecentActivity,
  })
}
