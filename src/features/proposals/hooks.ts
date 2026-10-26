import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createProposal,
  deleteProposal,
  listProposals,
  sendProposal,
  updateProposal,
} from '@/features/proposals/api'
import type { ProposalInput, ProposalListParams } from '@/features/proposals/types'

export const proposalKeys = {
  all: ['proposals'] as const,
  list: (params: ProposalListParams) => [...proposalKeys.all, 'list', params] as const,
  detail: (id: string) => [...proposalKeys.all, 'detail', id] as const,
}

export function useProposals(params: ProposalListParams) {
  return useQuery({
    queryKey: proposalKeys.list(params),
    queryFn: () => listProposals(params),
    placeholderData: keepPreviousData,
  })
}

export function useCreateProposal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProposal,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: proposalKeys.all }),
  })
}

export function useUpdateProposal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ProposalInput }) =>
      updateProposal(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: proposalKeys.all }),
  })
}

export function useSendProposal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => sendProposal(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: proposalKeys.all }),
  })
}

export function useDeleteProposal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteProposal(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: proposalKeys.all }),
  })
}
