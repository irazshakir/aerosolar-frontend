import type { ListParams, Paginated } from '@/types/api'

export type ContactStatus = 'new' | 'contacted' | 'qualified' | 'customer' | 'lost'

export type ContactSource = 'whatsapp' | 'messenger' | 'website' | 'manual'

export interface Contact {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  source: ContactSource
  status: ContactStatus
  owner: string
  tags: string[]
  notes?: string
  lastContactedAt: string
  createdAt: string
}

export interface ContactInput {
  name: string
  email?: string
  phone?: string
  company?: string
  source: ContactSource
  status: ContactStatus
  owner: string
  notes?: string
}

export interface ContactListParams extends ListParams {
  status?: ContactStatus | 'all'
  source?: ContactSource | 'all'
}

export type ContactListResult = Paginated<Contact>
