import { Button, Card, Col, Form, Input, Row, Select, Typography } from 'antd'
import type { CompanyProfile, CompanyProfileInput } from '@/features/settings/types'

const timezoneOptions = [
  { value: 'Asia/Karachi', label: 'Asia/Karachi (PKT)' },
  { value: 'Asia/Dubai', label: 'Asia/Dubai (GST)' },
  { value: 'Europe/London', label: 'Europe/London (GMT)' },
  { value: 'America/New_York', label: 'America/New_York (ET)' },
  { value: 'UTC', label: 'UTC' },
]

const currencyOptions = [
  { value: 'USD', label: 'USD — US Dollar' },
  { value: 'PKR', label: 'PKR — Pakistani Rupee' },
  { value: 'AED', label: 'AED — UAE Dirham' },
  { value: 'EUR', label: 'EUR — Euro' },
  { value: 'GBP', label: 'GBP — British Pound' },
]

interface CompanyProfileFormProps {
  company: CompanyProfile
  saving?: boolean
  onSubmit: (values: CompanyProfileInput) => Promise<void> | void
}

export function CompanyProfileForm({
  company,
  saving = false,
  onSubmit,
}: CompanyProfileFormProps) {
  return (
    <Card title="Company profile">
      <Typography.Paragraph type="secondary" style={{ marginTop: -4 }}>
        These details appear on proposals, invoices, and shared reports.
      </Typography.Paragraph>

      <Form<CompanyProfileInput>
        layout="vertical"
        initialValues={company}
        requiredMark="optional"
        onFinish={(values) => {
          void onSubmit(values)
        }}
      >
        <Row gutter={12}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Display name"
              rules={[{ required: true, message: 'Enter the company name' }]}
            >
              <Input placeholder="e.g. AeroSolar" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item name="legalName" label="Legal name">
              <Input placeholder="e.g. AeroSolar Technologies (Pvt) Ltd" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col xs={24} md={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Enter a contact email' },
                { type: 'email', message: 'Enter a valid email address' },
              ]}
            >
              <Input placeholder="hello@company.com" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Enter a contact phone number' }]}
            >
              <Input placeholder="+92 21 3456 7890" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="website" label="Website">
          <Input placeholder="https://company.com" />
        </Form.Item>

        <Form.Item name="address" label="Address">
          <Input.TextArea rows={2} placeholder="Street, city, country" />
        </Form.Item>

        <Row gutter={12}>
          <Col xs={24} md={12}>
            <Form.Item
              name="timezone"
              label="Timezone"
              rules={[{ required: true, message: 'Pick a timezone' }]}
            >
              <Select options={timezoneOptions} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name="currency"
              label="Default currency"
              rules={[{ required: true, message: 'Pick a currency' }]}
            >
              <Select options={currencyOptions} />
            </Form.Item>
          </Col>
        </Row>

        <Button type="primary" htmlType="submit" loading={saving}>
          Save changes
        </Button>
      </Form>
    </Card>
  )
}
