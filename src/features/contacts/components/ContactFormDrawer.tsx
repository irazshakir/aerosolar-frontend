import { Col, Form, Input, Row, Select } from 'antd'
import { FormDrawer } from '@/components/ui/FormDrawer'
import type { ContactInput } from '@/features/contacts/types'

const sourceOptions = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'messenger', label: 'Messenger' },
  { value: 'website', label: 'Website' },
  { value: 'manual', label: 'Manual' },
]

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'customer', label: 'Customer' },
  { value: 'lost', label: 'Lost' },
]

const ownerOptions = [
  { value: 'Ayesha Khan', label: 'Ayesha Khan' },
  { value: 'Bilal Ahmed', label: 'Bilal Ahmed' },
  { value: 'Hassan Raza', label: 'Hassan Raza' },
  { value: 'Sana Malik', label: 'Sana Malik' },
]

interface ContactFormDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  initialValues?: Partial<ContactInput>
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: ContactInput) => Promise<void> | void
}

export function ContactFormDrawer({
  open,
  mode,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: ContactFormDrawerProps) {
  const isCreate = mode === 'create'

  return (
    <FormDrawer<ContactInput>
      open={open}
      title={isCreate ? 'New contact' : 'Edit contact'}
      initialValues={initialValues}
      submitting={submitting}
      onClose={onClose}
      onSubmit={onSubmit}
      submitText={isCreate ? 'Create contact' : 'Save changes'}
    >
      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="name"
            label="Full name"
            rules={[
              { required: true, message: 'Enter a name' },
              { max: 80, message: 'Keep the name under 80 characters' },
            ]}
          >
            <Input placeholder="e.g. Imran Sheikh" autoFocus />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="company" label="Company">
            <Input placeholder="e.g. SunVolt Energy" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: 'email', message: 'Enter a valid email address' }]}
          >
            <Input placeholder="name@company.com" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="phone" label="Phone">
            <Input placeholder="+92 300 1234567" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="source"
            label="Source"
            rules={[{ required: true, message: 'Pick a source' }]}
          >
            <Select options={sourceOptions} placeholder="Where did this lead come from?" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Pick a status' }]}
          >
            <Select options={statusOptions} placeholder="Select status" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="owner"
        label="Owner"
        rules={[{ required: true, message: 'Assign an owner' }]}
      >
        <Select options={ownerOptions} placeholder="Who is following up?" />
      </Form.Item>

      <Form.Item
        name="notes"
        label="Notes"
        rules={[{ max: 500, message: 'Keep notes under 500 characters' }]}
      >
        <Input.TextArea rows={4} showCount maxLength={500} placeholder="Context for the next follow-up" />
      </Form.Item>
    </FormDrawer>
  )
}
