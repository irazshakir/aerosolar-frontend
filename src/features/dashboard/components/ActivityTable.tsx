import { Typography } from 'antd'
import type { TableProps } from 'antd'
import { DataTable } from '@/components/ui/DataTable'
import { StatusTag } from '@/components/ui/StatusTag'
import type { ActivityItem } from '@/features/dashboard/api'
import { formatRelative } from '@/lib/utils/format'

type Columns<T> = NonNullable<TableProps<T>['columns']>

const columns: Columns<ActivityItem> = [
  {
    title: 'Actor',
    dataIndex: 'actor',
    key: 'actor',
    width: 180,
    render: (actor: string) => <Typography.Text strong>{actor}</Typography.Text>,
  },
  {
    title: 'Activity',
    key: 'activity',
    render: (_value, record) => (
      <span>
        <Typography.Text type="secondary">{record.action}</Typography.Text>{' '}
        <Typography.Text>{record.target}</Typography.Text>
      </span>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (status: string) => <StatusTag status={status} />,
  },
  {
    title: 'When',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 160,
    render: (value: string) => <Typography.Text type="secondary">{formatRelative(value)}</Typography.Text>,
  },
]

interface ActivityTableProps {
  data: ActivityItem[] | undefined
  loading?: boolean
}

export function ActivityTable({ data, loading = false }: ActivityTableProps) {
  return (
    <DataTable<ActivityItem>
      columns={columns}
      data={data}
      loading={loading}
      rowKey="id"
      scrollX={720}
      empty={<Typography.Text type="secondary">No activity recorded yet.</Typography.Text>}
    />
  )
}
