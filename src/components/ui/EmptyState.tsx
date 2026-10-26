import { Empty } from 'antd'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  title?: string
  description?: ReactNode
  action?: ReactNode
}

export function EmptyState({ title = 'Nothing here yet', description, action }: EmptyStateProps) {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <>
          <div style={{ fontWeight: 600 }}>{title}</div>
          {description ? <div style={{ marginTop: 4 }}>{description}</div> : null}
        </>
      }
    >
      {action}
    </Empty>
  )
}
