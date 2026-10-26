export type IntegrationChannel = 'whatsapp' | 'messenger'

export type IntegrationStatus = 'connected' | 'disconnected' | 'error'

export interface CompanyProfile {
  id: string
  name: string
  legalName?: string
  email: string
  phone: string
  website?: string
  address?: string
  timezone: string
  currency: string
}

export interface Integration {
  id: string
  channel: IntegrationChannel
  status: IntegrationStatus
  displayName?: string
  phoneNumber?: string
  connectedAt?: string
  lastSyncAt?: string
  errorMessage?: string
}

export interface SettingsOverview {
  company: CompanyProfile
  integrations: Integration[]
}

export interface CompanyProfileInput {
  name: string
  legalName?: string
  email: string
  phone: string
  website?: string
  address?: string
  timezone: string
  currency: string
}

export interface IntegrationInput {
  displayName: string
  phoneNumber: string
}
