import { AimOutlined, DollarOutlined, MessageOutlined, TeamOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import type { ReactNode } from 'react'
import { StatCard } from '@/components/ui/StatCard'
import type { AnalyticsMetric } from '@/features/analytics/types'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/format'

const icons: Record<string, ReactNode> = {
  conversations: <MessageOutlined />,
  'new-leads': <TeamOutlined />,
  'conversion-rate': <AimOutlined />,
  'attributed-revenue': <DollarOutlined />,
}

function formatMetric(metric: AnalyticsMetric): string {
  switch (metric.format) {
    case 'percent':
      return formatPercent(metric.value)
    case 'currency':
      return formatCurrency(metric.value)
    default:
      return formatNumber(metric.value)
  }
}

interface AnalyticsKpisProps {
  metrics: AnalyticsMetric[] | undefined
  loading?: boolean
}

export function AnalyticsKpis({ metrics, loading = false }: AnalyticsKpisProps) {
  if (loading || !metrics) {
    return (
      <Row gutter={[16, 16]}>
        {[0, 1, 2, 3].map((key) => (
          <Col key={key} xs={24} sm={12} xl={6}>
            <StatCard label="Loading" value="" loading />
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <Row gutter={[16, 16]}>
      {metrics.map((metric) => (
        <Col key={metric.id} xs={24} sm={12} xl={6}>
          <StatCard
            label={metric.label}
            value={formatMetric(metric)}
            delta={metric.delta}
            icon={icons[metric.id]}
            hint={metric.hint}
          />
        </Col>
      ))}
    </Row>
  )
}
