export type LedgerType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense'

export interface LedgerAccount {
  id: string
  code: string
  name: string
  type: LedgerType
  balance: number
}

export interface PnlLine {
  id: string
  label: string
  amount: number
}

export interface ProfitAndLoss {
  periodStart: string
  periodEnd: string
  revenue: PnlLine[]
  expenses: PnlLine[]
  totalRevenue: number
  totalExpenses: number
  netProfit: number
}
