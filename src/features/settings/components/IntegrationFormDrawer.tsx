import { Form, Input, Typography } from 'antd'
import { FormDrawer } from '@/components/ui/FormDrawer'
import type { Integration, IntegrationInput } from '@/features/settings/types'

const channelLabels = {
  whatsapp: 'WhatsApp Business',
  messenger: 'Facebook Messenger',
}

interface IntegrationFormDrawerProps {
  open: boolean
  integration: Integration | null
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: IntegrationInput) => Promise<void> | void
}

export function IntegrationFormDrawer({
  open,
  integration,
  submitting = false,
  onClose,
  onSubmit,
}: IntegrationFormDrawerProps) {
  const connected = integration?.status === 'connected'

  return (
    <FormDrawer<IntegrationInput>
      open={open}
      title={integration ? `${connected ? 'Edit' : 'Connect'} ${channelLabels[integration.channel]}` : 'Connect channel'}
      initialValues={
        integration
          ? {
              displayName: integration.displayName,
              phoneNumber: integration.phoneNumber,
            }
          : undefined
      }
      submitting={submitting}
      onClose={onClose}
      onSubmit={onSubmit}
      submitText={connected ? 'Save connection' : 'Connect channel'}
    >
      <Typography.Paragraph type="secondary">
        Messages from this channel will land in the shared Inbox. You can disconnect it at any
        time without losing past conversations.
      </Typography.Paragraph>

      <Form.Item
        name="displayName"
        label="Display name"
        rules={[
          { required: true, message: 'Enter a display name' },
          { max: 80, message: 'Keep the name under 80 characters' },
        ]}
      >
        <Input placeholder="e.g. AeroSolar Support" autoFocus />
      </Form.Item>

      <Form.Item
        name="phoneNumber"
        label="Business number"
        rules={[
          { required: true, message: 'Enter the business number' },
          { max: 30, message: 'Keep the number under 30 characters' },
        ]}
      >
        <Input placeholder="+92 300 1234567" />
      </Form.Item>
    </FormDrawer>
  )
}
