import { useQuery } from '@tanstack/react-query'
import { fetchLedgers, fetchProfitAndLoss } from '@/features/accounts/api'

export const accountKeys = {
  all: ['accounts'] as const,
  ledgers: () => [...accountKeys.all, 'ledgers'] as const,
  profitAndLoss: () => [...accountKeys.all, 'profit-and-loss'] as const,
}

export function useLedgers() {
  return useQuery({
    queryKey: accountKeys.ledgers(),
    queryFn: fetchLedgers,
  })
}

export function useProfitAndLoss() {
  return useQuery({
    queryKey: accountKeys.profitAndLoss(),
    queryFn: fetchProfitAndLoss,
  })
}
