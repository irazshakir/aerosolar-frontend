import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { FormDrawer } from '@/components/ui/FormDrawer'
import type { InvoiceInput } from '@/features/invoices/types'

const statusOptions = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'void', label: 'Void' },
]

const currencyOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'PKR', label: 'PKR' },
  { value: 'AED', label: 'AED' },
  { value: 'EUR', label: 'EUR' },
  { value: 'GBP', label: 'GBP' },
]

const toDateValue = (value: string | undefined) => ({
  value: value ? dayjs(value) : undefined,
})

const fromDateValue = (value: Dayjs | null) => (value ? value.format('YYYY-MM-DD') : undefined)

interface InvoiceFormDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  initialValues?: Partial<InvoiceInput>
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: InvoiceInput) => Promise<void> | void
}

export function InvoiceFormDrawer({
  open,
  mode,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: InvoiceFormDrawerProps) {
  const isCreate = mode === 'create'

  return (
    <FormDrawer<InvoiceInput>
      open={open}
      title={isCreate ? 'New invoice' : 'Edit invoice'}
      initialValues={initialValues}
      submitting={submitting}
      onClose={onClose}
      onSubmit={onSubmit}
      submitText={isCreate ? 'Create invoice' : 'Save changes'}
      width={560}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="clientName"
            label="Client"
            rules={[{ required: true, message: 'Enter the client name' }]}
          >
            <Input placeholder="e.g. Zara Ahmed" autoFocus />
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
            rules={[{ required: true, message: 'Enter the invoice amount' }]}
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
            name="issueDate"
            label="Issue date"
            rules={[{ required: true, message: 'Pick an issue date' }]}
            getValueProps={toDateValue}
            normalize={fromDateValue}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="dueDate"
            label="Due date"
            rules={[{ required: true, message: 'Pick a due date' }]}
            getValueProps={toDateValue}
            normalize={fromDateValue}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Pick a status' }]}
      >
        <Select options={statusOptions} />
      </Form.Item>

      <Form.Item
        name="notes"
        label="Notes"
        rules={[{ max: 500, message: 'Keep notes under 500 characters' }]}
      >
        <Input.TextArea
          rows={3}
          showCount
          maxLength={500}
          placeholder="Line items, milestones, or payment terms"
        />
      </Form.Item>
    </FormDrawer>
  )
}
