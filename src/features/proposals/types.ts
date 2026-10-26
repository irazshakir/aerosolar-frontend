import type { ListParams, Paginated } from '@/types/api'

export type ProposalStatus = 'draft' | 'sent' | 'accepted' | 'declined' | 'expired'

export type CurrencyCode = 'USD' | 'PKR' | 'AED' | 'EUR' | 'GBP'

export interface Proposal {
  id: string
  number: string
  title: string
  clientName: string
  clientEmail: string
  amount: number
  currency: CurrencyCode
  status: ProposalStatus
  validUntil: string
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface ProposalInput {
  title: string
  clientName: string
  clientEmail: string
  amount: number
  currency: CurrencyCode
  status: ProposalStatus
  validUntil: string
  notes?: string
}

export interface ProposalListParams extends ListParams {
  status?: ProposalStatus | 'all'
}

export type ProposalListResult = Paginated<Proposal>
