import { Button, Drawer, Flex, Form } from 'antd'
import type { ReactNode } from 'react'

interface FormDrawerProps<T extends object> {
  open: boolean
  title: string
  initialValues?: Partial<T>
  submitting?: boolean
  onClose: () => void
  /** Rejections are reported by the caller; this component never renders errors. */
  onSubmit: (values: T) => Promise<void> | void
  children: ReactNode
  width?: number
  submitText?: string
  cancelText?: string
}

/**
 * Generic create/edit drawer. Children are plain Ant Design Form.Item fields so
 * each feature owns its own form fields without re-implementing drawer chrome.
 */
export function FormDrawer<T extends object>({
  open,
  title,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
  children,
  width = 480,
  submitText = 'Save',
  cancelText = 'Cancel',
}: FormDrawerProps<T>) {
  const [form] = Form.useForm<T>()

  const handleClose = () => {
    form.resetFields()
    onClose()
  }

  return (
    <Drawer
      open={open}
      title={title}
      width={width}
      onClose={handleClose}
      destroyOnHidden
      footer={
        <Flex justify="flex-end" gap={8}>
          <Button onClick={handleClose} disabled={submitting}>
            {cancelText}
          </Button>
          <Button type="primary" loading={submitting} onClick={() => form.submit()}>
            {submitText}
          </Button>
        </Flex>
      }
    >
      <Form<T>
        form={form}
        layout="vertical"
        initialValues={initialValues}
        requiredMark="optional"
        onFinish={(values) => {
          void onSubmit(values)
        }}
      >
        {children}
      </Form>
    </Drawer>
  )
}
