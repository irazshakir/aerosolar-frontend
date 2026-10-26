import { Card, Flex, Typography } from 'antd'
import { ActivityTable } from '@/features/dashboard/components/ActivityTable'
import { KpiGrid } from '@/features/dashboard/components/KpiGrid'
import { useDashboardKpis, useRecentActivity } from '@/features/dashboard/hooks'
import { PageContainer } from '@/layouts/AppLayout/PageContainer'

export default function DashboardPage() {
  const kpisQuery = useDashboardKpis()
  const activityQuery = useRecentActivity()

  return (
    <PageContainer
      title="Dashboard"
      subtitle="A quick read on conversations, chatbot health, and team activity."
    >
      <Flex vertical gap={24}>
        <KpiGrid kpis={kpisQuery.data} loading={kpisQuery.isPending} />

        <Card
          title="Recent activity"
          extra={<Typography.Text type="secondary">Last 7 days</Typography.Text>}
        >
          <ActivityTable data={activityQuery.data} loading={activityQuery.isPending} />
        </Card>
      </Flex>
    </PageContainer>
  )
}
