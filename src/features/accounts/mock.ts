import type {
  LedgerAccount,
  PnlLine,
  ProfitAndLoss,
} from '@/features/accounts/types'

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

const ledgers: LedgerAccount[] = [
  { id: 'ledger_1', code: '1000', name: 'Cash at bank', type: 'asset', balance: 84200 },
  { id: 'ledger_2', code: '1100', name: 'Accounts receivable', type: 'asset', balance: 31500 },
  { id: 'ledger_3', code: '1200', name: 'Prepaid expenses', type: 'asset', balance: 4200 },
  { id: 'ledger_4', code: '2000', name: 'Accounts payable', type: 'liability', balance: 12800 },
  { id: 'ledger_5', code: '2100', name: 'Sales tax payable', type: 'liability', balance: 6400 },
  { id: 'ledger_6', code: '3000', name: "Owner's equity", type: 'equity', balance: 48000 },
  { id: 'ledger_7', code: '4000', name: 'Subscription revenue', type: 'revenue', balance: 118400 },
  { id: 'ledger_8', code: '4100', name: 'WhatsApp automation revenue', type: 'revenue', balance: 18400 },
  { id: 'ledger_9', code: '4200', name: 'Consulting revenue', type: 'revenue', balance: 11700 },
  { id: 'ledger_10', code: '5000', name: 'Salaries & wages', type: 'expense', balance: 61200 },
  { id: 'ledger_11', code: '5100', name: 'Cloud & API usage', type: 'expense', balance: 14800 },
  { id: 'ledger_12', code: '5200', name: 'Marketing', type: 'expense', balance: 11600 },
  { id: 'ledger_13', code: '5300', name: 'Rent & utilities', type: 'expense', balance: 8600 },
]

const revenueLines: PnlLine[] = [
  { id: 'pnl_rev_1', label: 'Subscription revenue', amount: 118400 },
  { id: 'pnl_rev_2', label: 'WhatsApp automation', amount: 18400 },
  { id: 'pnl_rev_3', label: 'Consulting & audits', amount: 11700 },
]

const expenseLines: PnlLine[] = [
  { id: 'pnl_exp_1', label: 'Salaries & wages', amount: 61200 },
  { id: 'pnl_exp_2', label: 'Cloud & API usage', amount: 14800 },
  { id: 'pnl_exp_3', label: 'Marketing', amount: 11600 },
  { id: 'pnl_exp_4', label: 'Rent & utilities', amount: 8600 },
]

function sum(lines: PnlLine[]): number {
  return lines.reduce((total, line) => total + line.amount, 0)
}

const profitAndLoss: ProfitAndLoss = {
  periodStart: daysAgo(30),
  periodEnd: new Date().toISOString(),
  revenue: revenueLines,
  expenses: expenseLines,
  totalRevenue: sum(revenueLines),
  totalExpenses: sum(expenseLines),
  netProfit: sum(revenueLines) - sum(expenseLines),
}

export async function mockFetchLedgers(): Promise<LedgerAccount[]> {
  await delay()
  return ledgers.map((ledger) => ({ ...ledger }))
}

export async function mockFetchProfitAndLoss(): Promise<ProfitAndLoss> {
  await delay()

  return {
    ...profitAndLoss,
    revenue: profitAndLoss.revenue.map((line) => ({ ...line })),
    expenses: profitAndLoss.expenses.map((line) => ({ ...line })),
  }
}
