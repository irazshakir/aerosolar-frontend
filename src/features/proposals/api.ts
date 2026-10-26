import { env } from '@/config/env'
import {
  mockCreateProposal,
  mockDeleteProposal,
  mockListProposals,
  mockSendProposal,
  mockUpdateProposal,
} from '@/features/proposals/mock'
import type {
  Proposal,
  ProposalInput,
  ProposalListParams,
  ProposalListResult,
} from '@/features/proposals/types'
import { endpoints } from '@/lib/api/endpoints'
import { http } from '@/lib/api/http'

export async function listProposals(params: ProposalListParams): Promise<ProposalListResult> {
  if (env.useMockApi) {
    return mockListProposals(params)
  }

  return http.get<ProposalListResult>(endpoints.proposals.list, { params })
}

export async function createProposal(input: ProposalInput): Promise<Proposal> {
  if (env.useMockApi) {
    return mockCreateProposal(input)
  }

  return http.post<Proposal>(endpoints.proposals.create, input)
}

export async function updateProposal(id: string, input: ProposalInput): Promise<Proposal> {
  if (env.useMockApi) {
    return mockUpdateProposal(id, input)
  }

  return http.put<Proposal>(endpoints.proposals.update(id), input)
}

export async function sendProposal(id: string): Promise<Proposal> {
  if (env.useMockApi) {
    return mockSendProposal(id)
  }

  return http.post<Proposal>(endpoints.proposals.send(id))
}

export async function deleteProposal(id: string): Promise<void> {
  if (env.useMockApi) {
    return mockDeleteProposal(id)
  }

  await http.delete<void>(endpoints.proposals.remove(id))
}
