import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Card, Flex, Skeleton, Typography, theme } from 'antd'
import type { ReactNode } from 'react'
import { typography } from '@/theme/tokens'

interface StatCardProps {
  label: string
  value: ReactNode
  /** Percentage change against the previous period. */
  delta?: number
  deltaLabel?: string
  icon?: ReactNode
  hint?: ReactNode
  loading?: boolean
}

export function StatCard({
  label,
  value,
  delta,
  deltaLabel = 'vs last 30 days',
  icon,
  hint,
  loading = false,
}: StatCardProps) {
  const { token } = theme.useToken()
  const isPositive = (delta ?? 0) >= 0
  const deltaColor = isPositive ? token.colorSuccess : token.colorError

  return (
    <Card variant="outlined" style={{ height: '100%' }}>
      {loading ? (
        <Skeleton active paragraph={{ rows: 2 }} title={false} />
      ) : (
        <Flex vertical gap={12}>
          <Flex justify="space-between" align="center" gap={12}>
            <Typography.Text type="secondary">{label}</Typography.Text>
            {icon ? (
              <Flex
                align="center"
                justify="center"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: token.borderRadiusSM,
                  background: token.colorPrimaryBg,
                  color: token.colorPrimary,
                  fontSize: typography.size.bodyStrong,
                }}
              >
                {icon}
              </Flex>
            ) : null}
          </Flex>

          <Typography.Title level={3} style={{ margin: 0, fontSize: typography.size.metric }}>
            {value}
          </Typography.Title>

          <Flex align="center" gap={6} wrap>
            {typeof delta === 'number' ? (
              <Flex align="center" gap={4} style={{ color: deltaColor }}>
                {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                <Typography.Text strong style={{ color: deltaColor }}>
                  {Math.abs(delta)}%
                </Typography.Text>
              </Flex>
            ) : null}
            <Typography.Text type="secondary" style={{ fontSize: typography.size.caption }}>
              {deltaLabel}
            </Typography.Text>
          </Flex>

          {hint ? (
            <Typography.Text type="secondary" style={{ fontSize: typography.size.caption }}>
              {hint}
            </Typography.Text>
          ) : null}
        </Flex>
      )}
    </Card>
  )
}
