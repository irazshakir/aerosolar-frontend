import { DeleteOutlined } from '@ant-design/icons'
import { App as AntApp, Button, Flex, Image, Typography, Upload } from 'antd'
import type { UploadProps } from 'antd'
import { useRef } from 'react'
import { typography } from '@/theme/tokens'

/** Catalogue galleries stay small so the saved payload stays light. */
const MAX_IMAGES = 6
const MAX_FILE_MB = 5

interface ProductImageUploadProps {
  value?: string[]
  onChange?: (value: string[]) => void
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error ?? new Error('Could not read that file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Drag-and-drop gallery for a product form. The form value is a plain
 * `string[]`; files are read as data URLs because there is no upload endpoint
 * yet — swap `readAsDataUrl` for an upload call once the backend has one.
 */
export function ProductImageUpload({ value, onChange }: ProductImageUploadProps) {
  const { message } = AntApp.useApp()
  const images = value ?? []

  // Files are read in parallel, so remember what was last emitted instead of
  // appending to the prop captured when each read started.
  const emitted = useRef<string[] | null>(null)

  const emit = (next: string[]) => {
    emitted.current = next
    onChange?.(next)
  }

  const beforeUpload: UploadProps['beforeUpload'] = async (file) => {
    if (!file.type.startsWith('image/')) {
      message.warning(`${file.name} is not an image`)
      return Upload.LIST_IGNORE
    }

    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      message.warning(`${file.name} is larger than ${MAX_FILE_MB} MB`)
      return Upload.LIST_IGNORE
    }

    try {
      const dataUrl = await readAsDataUrl(file)
      // Check the cap after reading so a whole dropped batch counts as one queue.
      const current = emitted.current ?? value ?? []
      if (current.length >= MAX_IMAGES) {
        message.warning(`Keep the gallery to ${MAX_IMAGES} images`)
        return Upload.LIST_IGNORE
      }

      emit([...current, dataUrl])
    } catch {
      message.error(`Could not read ${file.name}`)
    }

    // The image already lives in the form value, so keep it out of Upload's list.
    return Upload.LIST_IGNORE
  }

  const remove = (index: number) => {
    emit(images.filter((_image, position) => position !== index))
  }

  return (
    <Flex vertical gap={8}>
      <Upload.Dragger
        multiple
        accept="image/*"
        showUploadList={false}
        fileList={[]}
        beforeUpload={beforeUpload}
        disabled={images.length >= MAX_IMAGES}
      >
        <Flex vertical align="center" gap={2} style={{ padding: '8px 0' }}>
          <Typography.Text>Drop images here, or click to browse</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: typography.size.small }}>
            {images.length} of {MAX_IMAGES} · PNG or JPG, up to {MAX_FILE_MB} MB each
          </Typography.Text>
        </Flex>
      </Upload.Dragger>

      {images.length > 0 ? (
        <Flex gap={8} wrap>
          {images.map((src, index) => (
            <Flex key={index} vertical gap={2} style={{ width: 78 }}>
              <Image
                src={src}
                alt={`Product image ${index + 1}`}
                width={78}
                height={58}
                style={{ objectFit: 'cover', borderRadius: 6 }}
              />
              <Flex justify="space-between" align="center">
                <Typography.Text type="secondary" style={{ fontSize: typography.size.caption }}>
                  {index === 0 ? 'Cover' : `#${index + 1}`}
                </Typography.Text>
                <Button
                  type="text"
                  size="small"
                  danger
                  aria-label={`Remove image ${index + 1}`}
                  icon={<DeleteOutlined />}
                  onClick={() => remove(index)}
                />
              </Flex>
            </Flex>
          ))}
        </Flex>
      ) : null}
    </Flex>
  )
}
