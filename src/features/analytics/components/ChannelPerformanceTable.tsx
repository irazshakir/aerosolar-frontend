import { Flex, Progress, Tag, Typography } from 'antd'
import type { TableProps } from 'antd'
import { DataTable } from '@/components/ui/DataTable'
import type { AnalyticsChannel, ChannelPerformance } from '@/features/analytics/types'
import { formatNumber, formatPercent } from '@/lib/utils/format'

type Columns<T> = NonNullable<TableProps<T>['columns']>

const channelMeta: Record<AnalyticsChannel, { label: string; color: string }> = {
  whatsapp: { label: 'WhatsApp', color: 'success' },
  messenger: { label: 'Messenger', color: 'processing' },
  website: { label: 'Website', color: 'geekblue' },
  instagram: { label: 'Instagram', color: 'magenta' },
}

const columns: Columns<ChannelPerformance> = [
  {
    title: 'Channel',
    dataIndex: 'channel',
    key: 'channel',
    width: 160,
    render: (channel: AnalyticsChannel) => {
      const meta = channelMeta[channel]
      return <Tag color={meta.color}>{meta.label}</Tag>
    },
  },
  {
    title: 'Conversations',
    dataIndex: 'conversations',
    key: 'conversations',
    align: 'right',
    render: (value: number) => formatNumber(value),
  },
  {
    title: 'Leads',
    dataIndex: 'leads',
    key: 'leads',
    align: 'right',
    render: (value: number) => formatNumber(value),
  },
  {
    title: 'Conversion rate',
    dataIndex: 'conversionRate',
    key: 'conversionRate',
    width: 190,
    render: (value: number) => (
      <Flex align="center" gap={10}>
        <Progress
          percent={value}
          size="small"
          showInfo={false}
          style={{ width: 90, margin: 0 }}
        />
        <Typography.Text>{formatPercent(value)}</Typography.Text>
      </Flex>
    ),
  },
  {
    title: 'Avg. response',
    dataIndex: 'responseMinutes',
    key: 'responseMinutes',
    width: 140,
    align: 'right',
    render: (value: number) => (
      <Typography.Text>{value.toFixed(1)} min</Typography.Text>
    ),
  },
]

interface ChannelPerformanceTableProps {
  data: ChannelPerformance[] | undefined
  loading?: boolean
}

export function ChannelPerformanceTable({ data, loading = false }: ChannelPerformanceTableProps) {
  return (
    <DataTable<ChannelPerformance>
      columns={columns}
      data={data}
      loading={loading}
      rowKey="channel"
      scrollX={760}
    />
  )
}
