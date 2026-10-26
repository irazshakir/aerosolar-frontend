import { Col, Form, Input, Row, Select } from 'antd'
import { FormDrawer } from '@/components/ui/FormDrawer'
import type { AnalyticsReportInput } from '@/features/analytics/types'

const typeOptions = [
  { value: 'conversations', label: 'Conversations' },
  { value: 'leads', label: 'Leads' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'agent-performance', label: 'Agent performance' },
]

const formatOptions = [
  { value: 'pdf', label: 'PDF' },
  { value: 'csv', label: 'CSV' },
]

const periodOptions = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
  { value: 'quarter', label: 'Current quarter' },
]

interface ReportFormDrawerProps {
  open: boolean
  initialValues?: Partial<AnalyticsReportInput>
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: AnalyticsReportInput) => Promise<void> | void
}

export function ReportFormDrawer({
  open,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: ReportFormDrawerProps) {
  return (
    <FormDrawer<AnalyticsReportInput>
      open={open}
      title="Generate report"
      initialValues={initialValues}
      submitting={submitting}
      onClose={onClose}
      onSubmit={onSubmit}
      submitText="Generate report"
    >
      <Form.Item
        name="name"
        label="Report name"
        rules={[
          { required: true, message: 'Give the report a name' },
          { max: 100, message: 'Keep the name under 100 characters' },
        ]}
      >
        <Input placeholder="e.g. Weekly conversations summary" autoFocus />
      </Form.Item>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="type"
            label="Report type"
            rules={[{ required: true, message: 'Pick a report type' }]}
          >
            <Select options={typeOptions} placeholder="Select type" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="format"
            label="Format"
            rules={[{ required: true, message: 'Pick a format' }]}
          >
            <Select options={formatOptions} placeholder="Select format" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="period"
        label="Period"
        rules={[{ required: true, message: 'Pick a period' }]}
      >
        <Select options={periodOptions} placeholder="Select period" />
      </Form.Item>
    </FormDrawer>
  )
}
