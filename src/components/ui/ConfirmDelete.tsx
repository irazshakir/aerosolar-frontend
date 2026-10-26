import { DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import { useState } from 'react'
import type { ReactNode } from 'react'

interface ConfirmDeleteProps {
  onConfirm: () => Promise<void> | void
  title?: string
  description?: ReactNode
  /** Custom trigger; falls back to a danger icon button. */
  children?: ReactNode
  buttonText?: string
  disabled?: boolean
}

export function ConfirmDelete({
  onConfirm,
  title = 'Delete this item?',
  description = 'This action cannot be undone.',
  children,
  buttonText,
  disabled = false,
}: ConfirmDeleteProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    try {
      await onConfirm()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popconfirm
      title={title}
      description={description}
      okText="Delete"
      cancelText="Cancel"
      okButtonProps={{ danger: true, loading }}
      onConfirm={handleConfirm}
      disabled={disabled}
    >
      {children ?? (
        <Button danger type="text" icon={<DeleteOutlined />} loading={loading} disabled={disabled}>
          {buttonText}
        </Button>
      )}
    </Popconfirm>
  )
}
