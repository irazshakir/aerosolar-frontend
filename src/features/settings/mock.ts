import type {
  CompanyProfile,
  CompanyProfileInput,
  Integration,
  IntegrationInput,
  SettingsOverview,
} from '@/features/settings/types'

const MIN_LATENCY_MS = 300
const MAX_LATENCY_MS = 600

function delay(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS))
  })
}

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
}

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString()
}

let company: CompanyProfile = {
  id: 'company_1',
  name: 'AeroSolar',
  legalName: 'AeroSolar Technologies (Pvt) Ltd',
  email: 'hello@aerosolar.example',
  phone: '+92 21 3456 7890',
  website: 'https://aerosolar.example',
  address: 'Office 402, Clifton Block 5, Karachi, Pakistan',
  timezone: 'Asia/Karachi',
  currency: 'USD',
}

let integrations: Integration[] = [
  {
    id: 'int_whatsapp',
    channel: 'whatsapp',
    status: 'connected',
    displayName: 'AeroSolar Support',
    phoneNumber: '+92 300 1234567',
    connectedAt: daysAgo(45),
    lastSyncAt: minutesAgo(3),
  },
  {
    id: 'int_messenger',
    channel: 'messenger',
    status: 'disconnected',
  },
]

function cloneIntegration(integration: Integration): Integration {
  return { ...integration }
}

function findIntegration(id: string): Integration {
  const integration = integrations.find((item) => item.id === id)
  if (!integration) {
    throw new Error('That integration no longer exists.')
  }
  return integration
}

export async function mockFetchSettings(): Promise<SettingsOverview> {
  await delay()

  return {
    company: { ...company },
    integrations: integrations.map(cloneIntegration),
  }
}

export async function mockUpdateCompanyProfile(
  input: CompanyProfileInput,
): Promise<CompanyProfile> {
  await delay()

  company = {
    ...company,
    name: input.name,
    legalName: input.legalName,
    email: input.email,
    phone: input.phone,
    website: input.website,
    address: input.address,
    timezone: input.timezone,
    currency: input.currency,
  }

  return { ...company }
}

export async function mockConnectIntegration(
  id: string,
  input: IntegrationInput,
): Promise<Integration> {
  await delay()

  const existing = findIntegration(id)
  const now = new Date().toISOString()
  const updated: Integration = {
    ...existing,
    status: 'connected',
    displayName: input.displayName,
    phoneNumber: input.phoneNumber,
    connectedAt: existing.connectedAt ?? now,
    lastSyncAt: now,
    errorMessage: undefined,
  }

  integrations = integrations.map((integration) => (integration.id === id ? updated : integration))
  return cloneIntegration(updated)
}

export async function mockDisconnectIntegration(id: string): Promise<Integration> {
  await delay()

  const existing = findIntegration(id)
  const updated: Integration = {
    id: existing.id,
    channel: existing.channel,
    status: 'disconnected',
  }

  integrations = integrations.map((integration) => (integration.id === id ? updated : integration))
  return cloneIntegration(updated)
}
