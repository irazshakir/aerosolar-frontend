import { env } from '@/config/env'
import {
  mockCreateInvoice,
  mockDeleteInvoice,
  mockListInvoices,
  mockMarkInvoicePaid,
  mockUpdateInvoice,
} from '@/features/invoices/mock'
import type {
  Invoice,
  InvoiceInput,
  InvoiceListParams,
  InvoiceListResult,
} from '@/features/invoices/types'
import { endpoints } from '@/lib/api/endpoints'
import { http } from '@/lib/api/http'

export async function listInvoices(params: InvoiceListParams): Promise<InvoiceListResult> {
  if (env.useMockApi) {
    return mockListInvoices(params)
  }

  return http.get<InvoiceListResult>(endpoints.invoices.list, { params })
}

export async function createInvoice(input: InvoiceInput): Promise<Invoice> {
  if (env.useMockApi) {
    return mockCreateInvoice(input)
  }

  return http.post<Invoice>(endpoints.invoices.create, input)
}

export async function updateInvoice(id: string, input: InvoiceInput): Promise<Invoice> {
  if (env.useMockApi) {
    return mockUpdateInvoice(id, input)
  }

  return http.put<Invoice>(endpoints.invoices.update(id), input)
}

export async function markInvoicePaid(id: string): Promise<Invoice> {
  if (env.useMockApi) {
    return mockMarkInvoicePaid(id)
  }

  return http.post<Invoice>(endpoints.invoices.pay(id))
}

export async function deleteInvoice(id: string): Promise<void> {
  if (env.useMockApi) {
    return mockDeleteInvoice(id)
  }

  await http.delete<void>(endpoints.invoices.remove(id))
}
