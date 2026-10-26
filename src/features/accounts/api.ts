import { env } from '@/config/env'
import { mockFetchLedgers, mockFetchProfitAndLoss } from '@/features/accounts/mock'
import type { LedgerAccount, ProfitAndLoss } from '@/features/accounts/types'
import { endpoints } from '@/lib/api/endpoints'
import { http } from '@/lib/api/http'

export async function fetchLedgers(): Promise<LedgerAccount[]> {
  if (env.useMockApi) {
    return mockFetchLedgers()
  }

  return http.get<LedgerAccount[]>(endpoints.accounts.ledgers)
}

export async function fetchProfitAndLoss(): Promise<ProfitAndLoss> {
  if (env.useMockApi) {
    return mockFetchProfitAndLoss()
  }

  return http.get<ProfitAndLoss>(endpoints.accounts.profitAndLoss)
}
