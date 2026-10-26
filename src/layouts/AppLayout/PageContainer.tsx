import type { ReactNode } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { layout } from '@/theme/tokens'

interface PageContainerProps {
  title?: ReactNode
  subtitle?: ReactNode
  actions?: ReactNode
  children: ReactNode
  maxWidth?: number
}

/** Standard page wrapper: centered max width, consistent padding, optional header. */
export function PageContainer({
  title,
  subtitle,
  actions,
  children,
  maxWidth = layout.contentMaxWidth,
}: PageContainerProps) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth,
        margin: '0 auto',
        padding: layout.contentPadding,
      }}
    >
      {title ? <PageHeader title={title} subtitle={subtitle} actions={actions} /> : null}
      {children}
    </div>
  )
}
