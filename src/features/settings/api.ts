import { env } from '@/config/env'
import {
  mockConnectIntegration,
  mockDisconnectIntegration,
  mockFetchSettings,
  mockUpdateCompanyProfile,
} from '@/features/settings/mock'
import type {
  CompanyProfile,
  CompanyProfileInput,
  Integration,
  IntegrationInput,
  SettingsOverview,
} from '@/features/settings/types'
import { endpoints } from '@/lib/api/endpoints'
import { http } from '@/lib/api/http'

export async function fetchSettings(): Promise<SettingsOverview> {
  if (env.useMockApi) {
    return mockFetchSettings()
  }

  return http.get<SettingsOverview>(endpoints.settings.overview)
}

export async function updateCompanyProfile(
  input: CompanyProfileInput,
): Promise<CompanyProfile> {
  if (env.useMockApi) {
    return mockUpdateCompanyProfile(input)
  }

  return http.put<CompanyProfile>(endpoints.settings.company, input)
}

export async function connectIntegration(
  id: string,
  input: IntegrationInput,
): Promise<Integration> {
  if (env.useMockApi) {
    return mockConnectIntegration(id, input)
  }

  return http.post<Integration>(endpoints.settings.connect(id), input)
}

export async function disconnectIntegration(id: string): Promise<Integration> {
  if (env.useMockApi) {
    return mockDisconnectIntegration(id)
  }

  return http.post<Integration>(endpoints.settings.disconnect(id))
}
