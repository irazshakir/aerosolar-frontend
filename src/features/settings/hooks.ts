import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  connectIntegration,
  disconnectIntegration,
  fetchSettings,
  updateCompanyProfile,
} from '@/features/settings/api'
import type { CompanyProfileInput, IntegrationInput } from '@/features/settings/types'

export const settingsKeys = {
  all: ['settings'] as const,
  overview: () => [...settingsKeys.all, 'overview'] as const,
}

export function useSettings() {
  return useQuery({
    queryKey: settingsKeys.overview(),
    queryFn: fetchSettings,
  })
}

export function useUpdateCompanyProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CompanyProfileInput) => updateCompanyProfile(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: settingsKeys.all }),
  })
}

export function useConnectIntegration() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: IntegrationInput }) =>
      connectIntegration(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: settingsKeys.all }),
  })
}

export function useDisconnectIntegration() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => disconnectIntegration(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: settingsKeys.all }),
  })
}
