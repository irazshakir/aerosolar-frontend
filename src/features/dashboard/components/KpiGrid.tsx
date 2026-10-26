import {
  CheckCircleOutlined,
  DollarOutlined,
  MessageOutlined,
  RobotOutlined,
} from '@ant-design/icons'
import { Col, Row } from 'antd'
import type { ReactNode } from 'react'
import { StatCard } from '@/components/ui/StatCard'
import type { Kpi } from '@/features/dashboard/api'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/format'

const icons: Record<string, ReactNode> = {
  conversations: <MessageOutlined />,
  'active-chatbots': <RobotOutlined />,
  'resolution-rate': <CheckCircleOutlined />,
  'saved-cost': <DollarOutlined />,
}

interface KpiGridProps {
  kpis: Kpi[] | undefined
  loading?: boolean
}

function formatValue(kpi: Kpi): string {
  switch (kpi.format) {
    case 'percent':
      return formatPercent(kpi.value)
    case 'currency':
      return formatCurrency(kpi.value)
    default:
      return formatNumber(kpi.value)
  }
}

export function KpiGrid({ kpis, loading = false }: KpiGridProps) {
  if (loading || !kpis) {
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
      {kpis.map((kpi) => (
        <Col key={kpi.id} xs={24} sm={12} xl={6}>
          <StatCard
            label={kpi.label}
            value={formatValue(kpi)}
            delta={kpi.delta}
            icon={icons[kpi.id]}
            hint={kpi.hint}
          />
        </Col>
      ))}
    </Row>
  )
}
