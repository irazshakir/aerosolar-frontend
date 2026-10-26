import { env } from '@/config/env'
import {
  mockCreateContact,
  mockDeleteContact,
  mockListContacts,
  mockUpdateContact,
} from '@/features/contacts/mock'
import type {
  Contact,
  ContactInput,
  ContactListParams,
  ContactListResult,
} from '@/features/contacts/types'
import { endpoints } from '@/lib/api/endpoints'
import { http } from '@/lib/api/http'

export async function listContacts(params: ContactListParams): Promise<ContactListResult> {
  if (env.useMockApi) {
    return mockListContacts(params)
  }

  return http.get<ContactListResult>(endpoints.contacts.list, { params })
}

export async function createContact(input: ContactInput): Promise<Contact> {
  if (env.useMockApi) {
    return mockCreateContact(input)
  }

  return http.post<Contact>(endpoints.contacts.create, input)
}

export async function updateContact(id: string, input: ContactInput): Promise<Contact> {
  if (env.useMockApi) {
    return mockUpdateContact(id, input)
  }

  return http.put<Contact>(endpoints.contacts.update(id), input)
}

export async function deleteContact(id: string): Promise<void> {
  if (env.useMockApi) {
    return mockDeleteContact(id)
  }

  await http.delete<void>(endpoints.contacts.remove(id))
}
