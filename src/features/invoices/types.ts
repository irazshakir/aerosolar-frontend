import type { ListParams, Paginated } from '@/types/api'

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'void'

export type InvoiceCurrency = 'USD' | 'PKR' | 'AED' | 'EUR' | 'GBP'

export interface Invoice {
  id: string
  number: string
  clientName: string
  clientEmail: string
  amount: number
  currency: InvoiceCurrency
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface InvoiceInput {
  clientName: string
  clientEmail: string
  amount: number
  currency: InvoiceCurrency
  issueDate: string
  dueDate: string
  status: InvoiceStatus
  notes?: string
}

export interface InvoiceListParams extends ListParams {
  status?: InvoiceStatus | 'all'
}

export type InvoiceListResult = Paginated<Invoice>
