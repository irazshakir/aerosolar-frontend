import { Col, Form, Input, Row, Select } from 'antd'
import { FormDrawer } from '@/components/ui/FormDrawer'
import type { ChatbotInput } from '@/features/chatbots/types'

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'draft', label: 'Draft' },
]

const modelOptions = [
  { value: 'gpt-4o', label: 'GPT-4o' },
  { value: 'gpt-4o-mini', label: 'GPT-4o mini' },
  { value: 'claude-3.5-sonnet', label: 'Claude 3.5 Sonnet' },
  { value: 'llama-3.1-70b', label: 'Llama 3.1 70B' },
]

interface ChatbotFormDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  initialValues?: Partial<ChatbotInput>
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: ChatbotInput) => Promise<void> | void
}

export function ChatbotFormDrawer({
  open,
  mode,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: ChatbotFormDrawerProps) {
  const isCreate = mode === 'create'

  return (
    <FormDrawer<ChatbotInput>
      open={open}
      title={isCreate ? 'New chatbot' : 'Edit chatbot'}
      initialValues={initialValues}
      submitting={submitting}
      onClose={onClose}
      onSubmit={onSubmit}
      submitText={isCreate ? 'Create chatbot' : 'Save changes'}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          { required: true, message: 'Give the chatbot a name' },
          { max: 80, message: 'Keep the name under 80 characters' },
        ]}
      >
        <Input placeholder="e.g. Support assistant" autoFocus />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ max: 240, message: 'Keep the description under 240 characters' }]}
      >
        <Input.TextArea
          rows={3}
          showCount
          maxLength={240}
          placeholder="What is this chatbot for?"
        />
      </Form.Item>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Pick a status' }]}
          >
            <Select options={statusOptions} placeholder="Select status" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="model"
            label="Model"
            rules={[{ required: true, message: 'Pick a model' }]}
          >
            <Select options={modelOptions} placeholder="Select model" />
          </Form.Item>
        </Col>
      </Row>
    </FormDrawer>
  )
}
