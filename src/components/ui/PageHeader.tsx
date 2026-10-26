import type { ReactNode } from 'react'
import { Flex, Typography } from 'antd'
import { typography } from '@/theme/tokens'

interface PageHeaderProps {
  title: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  /** Optional breadcrumb slot rendered above the title. */
  breadcrumbs?: ReactNode
}

export function PageHeader({ title, subtitle, actions, breadcrumbs }: PageHeaderProps) {
  return (
    <Flex vertical style={{ marginBottom: 20 }}>
      {breadcrumbs ? <div style={{ marginBottom: 12 }}>{breadcrumbs}</div> : null}
      <Flex justify="space-between" align="flex-end" gap={16} wrap>
        <div>
          <Typography.Title level={3} style={{ margin: 0, fontSize: typography.size.pageTitle }}>
            {title}
          </Typography.Title>
          {subtitle ? (
            <Typography.Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
              {subtitle}
            </Typography.Text>
          ) : null}
        </div>
        {actions ? (
          <Flex gap={8} wrap align="center">
            {actions}
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  )
}
