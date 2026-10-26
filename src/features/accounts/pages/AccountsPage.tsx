import { Card, Flex, Tabs, Typography } from 'antd'
import { LedgerTable } from '@/features/accounts/components/LedgerTable'
import { ProfitAndLossStatement } from '@/features/accounts/components/ProfitAndLossStatement'
import { useLedgers, useProfitAndLoss } from '@/features/accounts/hooks'
import { PageContainer } from '@/layouts/AppLayout/PageContainer'
import { formatCurrency } from '@/lib/utils/format'

export default function AccountsPage() {
  const ledgersQuery = useLedgers()
  const pnlQuery = useProfitAndLoss()

  const ledgers = ledgersQuery.data ?? []
  const totalBalance = ledgers.reduce((total, ledger) => total + ledger.balance, 0)

  return (
    <PageContainer
      title="Accounts"
      subtitle="Review ledger balances and current profit & loss statements."
    >
      <Tabs
        items={[
          {
            key: 'ledgers',
            label: 'Ledgers',
            children: (
              <Flex vertical gap={16}>
                <Card>
                  <Typography.Text type="secondary">Total balance across ledgers</Typography.Text>
                  <Typography.Title level={4} style={{ margin: '6px 0 0' }}>
                    {formatCurrency(totalBalance)}
                  </Typography.Title>
                </Card>
                <LedgerTable data={ledgers} loading={ledgersQuery.isLoading} />
              </Flex>
            ),
          },
          {
            key: 'profit-and-loss',
            label: 'Profit & loss',
            children: (
              <ProfitAndLossStatement
                data={pnlQuery.data}
                loading={pnlQuery.isLoading}
              />
            ),
          },
        ]}
      />
    </PageContainer>
  )
}
