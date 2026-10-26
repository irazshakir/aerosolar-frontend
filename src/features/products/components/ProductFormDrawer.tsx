import { Col, Form, Input, InputNumber, Row, Select } from 'antd'
import { FormDrawer } from '@/components/ui/FormDrawer'
import type { ProductCatalogEntry } from '@/features/products/catalog'
import { productStatusOptions } from '@/features/products/catalog'
import type { ProductInput } from '@/features/products/types'

interface ProductFormDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  meta: ProductCatalogEntry
  initialValues?: Partial<ProductInput>
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: ProductInput) => Promise<void> | void
}

export function ProductFormDrawer({
  open,
  mode,
  meta,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: ProductFormDrawerProps) {
  const isCreate = mode === 'create'
  const noun = meta.itemLabel
  const statusOptions = productStatusOptions.filter((option) =>
    meta.statuses.includes(option.value),
  )

  return (
    <FormDrawer<ProductInput>
      open={open}
      title={isCreate ? `New ${noun}` : `Edit ${noun}`}
      initialValues={initialValues}
      submitting={submitting}
      onClose={onClose}
      onSubmit={onSubmit}
      submitText={isCreate ? `Create ${noun}` : 'Save changes'}
    >
      <Row gutter={12}>
        <Col span={14}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Enter a name' },
              { max: 80, message: 'Keep the name under 80 characters' },
            ]}
          >
            <Input placeholder={meta.namePlaceholder} autoFocus />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name="sku"
            label="SKU"
            rules={[
              { required: true, message: 'Enter a SKU' },
              { max: 24, message: 'Keep the SKU under 24 characters' },
            ]}
          >
            <Input placeholder="e.g. JKO-TN-580" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="brand"
            label={meta.brandLabel}
            rules={[{ required: true, message: `Pick a ${meta.brandLabel.toLowerCase()}` }]}
          >
            <Select
              options={meta.brands.map((option) => ({ value: option, label: option }))}
              placeholder={`Select ${meta.brandLabel.toLowerCase()}`}
            />
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
        name="spec"
        label={meta.specLabel}
        rules={[{ required: true, message: `Describe the ${meta.specLabel.toLowerCase()}` }]}
      >
        <Input placeholder={meta.specPlaceholder} />
      </Form.Item>

      <Row gutter={12}>
        <Col span={meta.tracksStock ? 12 : 24}>
          <Form.Item
            name="unitPrice"
            label="Unit price"
            rules={[{ required: true, message: 'Enter a price' }]}
          >
            <InputNumber<number>
              min={0}
              style={{ width: '100%' }}
              addonBefore="$"
              placeholder="0"
            />
          </Form.Item>
        </Col>
        {meta.tracksStock ? (
          <Col span={12}>
            <Form.Item
              name="stock"
              label="In stock"
              rules={[{ required: true, message: 'Enter the stock level' }]}
            >
              <InputNumber<number>
                min={0}
                precision={0}
                style={{ width: '100%' }}
                placeholder="0"
              />
            </Form.Item>
          </Col>
        ) : null}
      </Row>
    </FormDrawer>
  )
}
