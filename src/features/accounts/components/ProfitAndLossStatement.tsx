import { Card, Col, Divider, Flex, Row, Skeleton, Typography, theme } from 'antd'
import type { PnlLine, ProfitAndLoss } from '@/features/accounts/types'
import { formatCurrency, formatDate } from '@/lib/utils/format'

interface SummaryCardProps {
  label: string
  value: number
  color?: string
}

function SummaryCard({ label, value, color }: SummaryCardProps) {
  return (
    <Card>
      <Typography.Text type="secondary">{label}</Typography.Text>
      <Typography.Title level={4} style={{ margin: '6px 0 0', color }}>
        {formatCurrency(value)}
      </Typography.Title>
    </Card>
  )
}

interface PnlBreakdownProps {
  title: string
  lines: PnlLine[]
  total: number
  totalLabel: string
}

function PnlBreakdown({ title, lines, total, totalLabel }: PnlBreakdownProps) {
  return (
    <Card title={title} style={{ height: '100%' }}>
      <Flex vertical gap={10}>
        {lines.map((line) => (
          <Flex key={line.id} justify="space-between" gap={12}>
            <Typography.Text>{line.label}</Typography.Text>
            <Typography.Text>{formatCurrency(line.amount)}</Typography.Text>
          </Flex>
        ))}
      </Flex>
      <Divider style={{ margin: '12px 0' }} />
      <Flex justify="space-between" gap={12}>
        <Typography.Text strong>{totalLabel}</Typography.Text>
        <Typography.Text strong>{formatCurrency(total)}</Typography.Text>
      </Flex>
    </Card>
  )
}

interface ProfitAndLossStatementProps {
  data: ProfitAndLoss | undefined
  loading?: boolean
}

export function ProfitAndLossStatement({ data, loading = false }: ProfitAndLossStatementProps) {
  const { token } = theme.useToken()

  if (loading || !data) {
    return (
      <Card>
        <Skeleton active paragraph={{ rows: 8 }} />
      </Card>
    )
  }

  const profitColor = data.netProfit >= 0 ? token.colorSuccess : token.colorError

  return (
    <Flex vertical gap={16}>
      <Flex justify="space-between" align="center" gap={8} wrap>
        <Typography.Text type="secondary">Statement period</Typography.Text>
        <Typography.Text>
          {formatDate(data.periodStart)} – {formatDate(data.periodEnd)}
        </Typography.Text>
      </Flex>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <SummaryCard label="Revenue" value={data.totalRevenue} color={token.colorSuccess} />
        </Col>
        <Col xs={24} md={8}>
          <SummaryCard label="Expenses" value={data.totalExpenses} color={token.colorError} />
        </Col>
        <Col xs={24} md={8}>
          <SummaryCard label="Net profit" value={data.netProfit} color={profitColor} />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <PnlBreakdown
            title="Revenue"
            lines={data.revenue}
            total={data.totalRevenue}
            totalLabel="Total revenue"
          />
        </Col>
        <Col xs={24} lg={12}>
          <PnlBreakdown
            title="Expenses"
            lines={data.expenses}
            total={data.totalExpenses}
            totalLabel="Total expenses"
          />
        </Col>
      </Row>
    </Flex>
  )
}
