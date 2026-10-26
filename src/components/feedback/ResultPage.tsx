import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { homePath } from '@/config/navigation'
import { brand } from '@/theme/brand'

type ResultStatus = 403 | 404 | 500

const defaultCopy: Record<ResultStatus, { title: string; subTitle: string }> = {
  403: {
    title: 'Access denied',
    subTitle: 'You do not have permission to view this page.',
  },
  404: {
    title: 'Page not found',
    subTitle: 'The page you are looking for does not exist or has been moved.',
  },
  500: {
    title: 'Something went wrong',
    subTitle: `${brand.appName} hit an unexpected error. Please try again.`,
  },
}

interface ResultPageProps {
  status: ResultStatus
  title?: string
  subTitle?: string
  showHome?: boolean
}

export function ResultPage({ status, title, subTitle, showHome = true }: ResultPageProps) {
  const fallback = defaultCopy[status]

  return (
    <Result
      status={status}
      title={title ?? fallback.title}
      subTitle={subTitle ?? fallback.subTitle}
      extra={
        showHome ? (
          <Link to={homePath}>
            <Button type="primary">Back to dashboard</Button>
          </Link>
        ) : null
      }
    />
  )
}
