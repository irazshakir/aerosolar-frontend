import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Typography } from 'antd'
import { useState } from 'react'
import { FormDrawer } from '@/components/ui/FormDrawer'
import type { ProductCatalogEntry } from '@/features/products/catalog'
import { describePanel, panelTypeOptions, productStatusOptions } from '@/features/products/catalog'
import type { PanelDetails, ProductInput } from '@/features/products/types'

interface PanelFormDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  meta: ProductCatalogEntry
  initialValues?: Partial<ProductInput>
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: ProductInput) => Promise<void> | void
}

/** Drops blank optional fields so the saved payload stays clean. */
function compactPanel(panel?: PanelDetails): PanelDetails | undefined {
  if (!panel) {
    return undefined
  }

  const filled = Object.entries(panel).filter(
    ([, value]) => value !== undefined && value !== null && value !== '',
  )

  return filled.length > 0 ? (Object.fromEntries(filled) as PanelDetails) : undefined
}

interface PanelFieldsProps {
  meta: ProductCatalogEntry
  defaultShowMore: boolean
}

function PanelFields({ meta, defaultShowMore }: PanelFieldsProps) {
  const [showMore, setShowMore] = useState(defaultShowMore)

  const statusOptions = productStatusOptions.filter((option) =>
    meta.statuses.includes(option.value),
  )

  return (
    <>
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

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="brand"
            label="Manufacturer/Brand"
            rules={[{ required: true, message: 'Pick a manufacturer' }]}
          >
            <Select
              options={meta.brands.map((option) => ({ value: option, label: option }))}
              placeholder="Select manufacturer"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="sku"
            label="Model no"
            rules={[
              { required: true, message: 'Enter the model number' },
              { max: 40, message: 'Keep the model number under 40 characters' },
            ]}
          >
            <Input placeholder="e.g. JKO-TN-580" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="ratedPower"
            label="Rated power"
            rules={[{ required: true, message: 'Enter the rated power' }]}
          >
            <InputNumber<number>
              min={0}
              style={{ width: '100%' }}
              addonAfter="W"
              placeholder="580"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="stock"
            label="In stock"
            rules={[{ required: true, message: 'Enter the stock level' }]}
          >
            <InputNumber<number> min={0} precision={0} style={{ width: '100%' }} placeholder="0" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="buyPrice"
            label="Unit price (buy)"
            rules={[{ required: true, message: 'Enter the purchase price' }]}
          >
            <InputNumber<number>
              min={0}
              style={{ width: '100%' }}
              addonBefore="$"
              placeholder="0"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="unitPrice"
            label="Unit price (sell)"
            rules={[{ required: true, message: 'Enter the selling price' }]}
          >
            <InputNumber<number>
              min={0}
              style={{ width: '100%' }}
              addonBefore="$"
              placeholder="0"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="status"
        label="Product status"
        rules={[{ required: true, message: 'Pick a status' }]}
      >
        <Select options={statusOptions} placeholder="Select status" style={{ width: '100%' }} />
      </Form.Item>

      <Button
        type="dashed"
        block
        icon={showMore ? <MinusOutlined /> : <PlusOutlined />}
        onClick={() => setShowMore((current) => !current)}
      >
        {showMore ? 'Hide additional info' : 'Additional info'}
      </Button>

      {/* Keep the fields mounted so Ant Design submits them even when hidden. */}
      <div style={{ display: showMore ? undefined : 'none' }}>
        <Divider style={{ margin: '16px 0 12px' }}>Optional details</Divider>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
          Fill in only what you have — everything below is optional.
        </Typography.Paragraph>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['panel', 'cellTechnology']} label="Cell technology">
              <Input placeholder="e.g. N-type TOPCon" allowClear />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['panel', 'panelType']} label="Panel type">
              <Select
                allowClear
                options={panelTypeOptions}
                placeholder="Select type"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['panel', 'efficiency']} label="Efficiency (%)">
              <InputNumber<number>
                min={0}
                max={100}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="%"
                placeholder="22.5"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['panel', 'dimensions']} label="Dimensions">
              <Input placeholder="e.g. 2278 × 1134 × 35 mm" allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['panel', 'weight']} label="Weight">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="kg"
                placeholder="32.5"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['panel', 'manufacturingCountry']} label="Manufacturing country">
              <Input placeholder="e.g. China" allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['panel', 'voc']} label="Voc">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="V"
                placeholder="51.2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['panel', 'vmp']} label="Vmp">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="V"
                placeholder="43.1"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['panel', 'isc']} label="Isc">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="A"
                placeholder="14.2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['panel', 'imp']} label="Imp">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="A"
                placeholder="13.5"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name={['panel', 'warranty']} label="Warranty">
          <Input placeholder="e.g. 12-year product / 30-year performance" allowClear />
        </Form.Item>

        <Form.Item
          name={['panel', 'imageUrl']}
          label="Product image"
          rules={[{ type: 'url', message: 'Enter a valid image URL' }]}
        >
          <Input placeholder="https://example.com/panel.jpg" allowClear />
        </Form.Item>

        <Form.Item
          name={['panel', 'datasheetUrl']}
          label="Datasheet URL"
          rules={[{ type: 'url', message: 'Enter a valid datasheet URL' }]}
        >
          <Input placeholder="https://example.com/panel-datasheet.pdf" allowClear />
        </Form.Item>
      </div>
    </>
  )
}

/**
 * Panels carry far more data than the other catalogue items, so they get a
 * dedicated drawer: commercial fields stay visible while the electrical
 * details live behind the optional "Additional info" section.
 */
export function PanelFormDrawer({
  open,
  mode,
  meta,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: PanelFormDrawerProps) {
  const isCreate = mode === 'create'
  const noun = meta.itemLabel
  const hasPanelDetails =
    initialValues?.panel !== undefined && Object.keys(initialValues.panel).length > 0

  return (
    <FormDrawer<ProductInput>
      open={open}
      title={isCreate ? `New ${noun}` : `Edit ${noun}`}
      initialValues={initialValues}
      submitting={submitting}
      onClose={onClose}
      width={560}
      submitText={isCreate ? `Create ${noun}` : 'Save changes'}
      onSubmit={(values) => {
        const panel = compactPanel(values.panel)
        return onSubmit({ ...values, panel, spec: describePanel({ ...values, panel }) })
      }}
    >
      <PanelFields meta={meta} defaultShowMore={hasPanelDetails} />
    </FormDrawer>
  )
}
