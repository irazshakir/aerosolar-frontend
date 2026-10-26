import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { FormDrawer } from '@/components/ui/FormDrawer'
import type { ProposalInput } from '@/features/proposals/types'

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
  { value: 'expired', label: 'Expired' },
]

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'PKR', label: 'PKR' },
  { value: 'AED', label: 'AED' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
]

interface ProposalFormDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  initialValues?: Partial<ProposalInput>
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: ProposalInput) => Promise<void> | void
}

export function ProposalFormDrawer({
  open,
  mode,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: ProposalFormDrawerProps) {
  const isCreate = mode === 'create'

  return (
    <FormDrawer<ProposalInput>
      open={open}
      title={isCreate ? 'New proposal' : 'Edit proposal'}
      initialValues={initialValues}
      submitting={submitting}
      onClose={onClose}
      onSubmit={onSubmit}
      submitText={isCreate ? 'Create proposal' : 'Save changes'}
      width={560}
    >
      <Form.Item
        name="title"
        label="Proposal title"
        rules={[
          { required: true, message: 'Give the proposal a title' },
          { max: 120, message: 'Keep the title under 120 characters' },
        ]}
      >
        <Input placeholder="e.g. 25kW warehouse solar system" autoFocus />
      </Form.Item>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="clientName"
            label="Client"
            rules={[{ required: true, message: 'Enter the client name' }]}
          >
            <Input placeholder="e.g. Imran Sheikh" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="clientEmail"
            label="Client email"
            rules={[
              { required: true, message: 'Enter the client email' },
              { type: 'email', message: 'Enter a valid email address' },
            ]}
          >
            <Input placeholder="client@company.com" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={16}>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Enter the proposal amount' }]}
          >
            <InputNumber min={0} style={{ width: '100%' }} placeholder="0" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="currency"
            label="Currency"
            rules={[{ required: true, message: 'Pick a currency' }]}
          >
            <Select options={currencyOptions} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Pick a status' }]}
          >
            <Select options={statusOptions} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="validUntil"
            label="Valid until"
            rules={[{ required: true, message: 'Pick a validity date' }]}
            getValueProps={(value: string | undefined) => ({
              value: value ? dayjs(value) : undefined,
            })}
            normalize={(value: Dayjs | null) =>
              value ? value.format('YYYY-MM-DD') : undefined
            }
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="notes"
        label="Notes"
        rules={[{ max: 500, message: 'Keep notes under 500 characters' }]}
      >
        <Input.TextArea
          rows={3}
          showCount
          maxLength={500}
          placeholder="Scope, assumptions, or payment terms"
        />
      </Form.Item>
    </FormDrawer>
  )
}
