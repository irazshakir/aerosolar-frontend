import { PlusOutlined } from '@ant-design/icons'
import { App as AntApp, Button, Card, Flex, Typography } from 'antd'
import type { TableProps } from 'antd'
import { useState } from 'react'
import { ConfirmDelete } from '@/components/ui/ConfirmDelete'
import { DataTable } from '@/components/ui/DataTable'
import { EmptyState } from '@/components/ui/EmptyState'
import { StatusTag } from '@/components/ui/StatusTag'
import { AnalyticsKpis } from '@/features/analytics/components/AnalyticsKpis'
import { ChannelPerformanceTable } from '@/features/analytics/components/ChannelPerformanceTable'
import { ReportFormDrawer } from '@/features/analytics/components/ReportFormDrawer'
import {
  useAnalyticsSummary,
  useChannelPerformance,
  useCreateReport,
  useDeleteReport,
  useReports,
} from '@/features/analytics/hooks'
import type {
  AnalyticsReport,
  AnalyticsReportInput,
  ReportPeriod,
  ReportType,
} from '@/features/analytics/types'
import { PageContainer } from '@/layouts/AppLayout/PageContainer'
import { getErrorMessage } from '@/lib/api/errors'
import { formatDate, formatRelative } from '@/lib/utils/format'

type Columns<T> = NonNullable<TableProps<T>['columns']>

const createDefaults: Partial<AnalyticsReportInput> = {
  type: 'conversations',
  format: 'pdf',
  period: '30d',
}

const reportTypeLabels: Record<ReportType, string> = {
  conversations: 'Conversations',
  leads: 'Leads',
  revenue: 'Revenue',
  'agent-performance': 'Agent performance',
}

const periodLabels: Record<ReportPeriod, string> = {
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  '90d': 'Last 90 days',
  quarter: 'Current quarter',
}

export default function AnalyticsPage() {
  const { message } = AntApp.useApp()

  const [drawerOpen, setDrawerOpen] = useState(false)

  const summaryQuery = useAnalyticsSummary()
  const channelsQuery = useChannelPerformance()
  const reportsQuery = useReports()
  const createMutation = useCreateReport()
  const deleteMutation = useDeleteReport()

  const handleGenerate = async (values: AnalyticsReportInput) => {
    try {
      await createMutation.mutateAsync(values)
      message.success('Report generated')
      setDrawerOpen(false)
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleDelete = async (report: AnalyticsReport) => {
    try {
      await deleteMutation.mutateAsync(report.id)
      message.success('Report deleted')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const columns: Columns<AnalyticsReport> = [
    {
      title: 'Report',
      dataIndex: 'name',
      key: 'name',
      render: (_value, record) => (
        <Flex vertical gap={2} style={{ minWidth: 220 }}>
          <Typography.Text strong>{record.name}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Created by {record.createdBy}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 160,
      render: (value: ReportType) => reportTypeLabels[value],
    },
    {
      title: 'Format',
      dataIndex: 'format',
      key: 'format',
      width: 100,
      render: (_value, record) => (
        <Typography.Text code>{record.format.toUpperCase()}</Typography.Text>
      ),
    },
    {
      title: 'Period',
      key: 'period',
      width: 230,
      render: (_value, record) => (
        <Flex vertical gap={2}>
          <Typography.Text>{periodLabels[record.period]}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {formatDate(record.periodStart)} – {formatDate(record.periodEnd)}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value: string) => <StatusTag status={value} />,
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
      render: (value: string) => (
        <Typography.Text type="secondary">{formatRelative(value)}</Typography.Text>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 100,
      align: 'right',
      render: (_value, record) => (
        <ConfirmDelete
          title={`Delete "${record.name}"?`}
          description="The generated file will be removed."
          onConfirm={() => handleDelete(record)}
        />
      ),
    },
  ]

  return (
    <PageContainer
      title="Analytics"
      subtitle="Measure conversations, leads, and revenue, then generate reports for the team."
      actions={
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setDrawerOpen(true)}>
          Generate report
        </Button>
      }
    >
      <Flex vertical gap={24}>
        <AnalyticsKpis metrics={summaryQuery.data} loading={summaryQuery.isPending} />

        <Card
          title="Channel performance"
          extra={<Typography.Text type="secondary">Last 30 days</Typography.Text>}
        >
          <ChannelPerformanceTable
            data={channelsQuery.data}
            loading={channelsQuery.isFetching}
          />
        </Card>

        <Card title="Recent reports">
          <DataTable<AnalyticsReport>
            columns={columns}
            data={reportsQuery.data}
            loading={reportsQuery.isFetching}
            rowKey="id"
            scrollX={900}
            empty={
              <EmptyState
                title="No reports yet"
                description="Generate a report to share performance with the team."
                action={
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setDrawerOpen(true)}
                  >
                    Generate report
                  </Button>
                }
              />
            }
          />
        </Card>
      </Flex>

      <ReportFormDrawer
        open={drawerOpen}
        initialValues={createDefaults}
        submitting={createMutation.isPending}
        onClose={() => setDrawerOpen(false)}
        onSubmit={handleGenerate}
      />
    </PageContainer>
  )
}
