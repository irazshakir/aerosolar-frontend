import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Typography } from 'antd'
import { useState } from 'react'
import { FormDrawer } from '@/components/ui/FormDrawer'
import { ProductImageUpload } from '@/features/products/components/ProductImageUpload'
import type { ProductCatalogEntry } from '@/features/products/catalog'
import {
  batteryChemistryOptions,
  describeInverter,
  inverterTypeOptions,
  ipRatingOptions,
  phaseTypeOptions,
  productStatusOptions,
  yesNoOptions,
} from '@/features/products/catalog'
import type { InverterDetails, ProductInput } from '@/features/products/types'

interface InverterFormDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  meta: ProductCatalogEntry
  initialValues?: Partial<ProductInput>
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: ProductInput) => Promise<void> | void
}

/** Drops blank optional fields so the saved payload stays clean. */
function compactInverter(inverter?: InverterDetails): InverterDetails | undefined {
  if (!inverter) {
    return undefined
  }

  const filled = Object.entries(inverter).filter(([, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0
    }
    // `false` is a real answer for the yes/no fields, so it must survive.
    return value !== undefined && value !== null && value !== ''
  })

  return filled.length > 0 ? (Object.fromEntries(filled) as InverterDetails) : undefined
}

interface InverterFieldsProps {
  meta: ProductCatalogEntry
  defaultShowMore: boolean
}

function InverterFields({ meta, defaultShowMore }: InverterFieldsProps) {
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
            <Input placeholder="e.g. SUN2000-10KTL" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name={['inverter', 'ratedOutputPower']}
            label="Rated output power"
            rules={[{ required: true, message: 'Enter the rated output power' }]}
          >
            <InputNumber<number>
              min={0}
              step={0.1}
              style={{ width: '100%' }}
              addonAfter="kW"
              placeholder="10"
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
            name={['inverter', 'inverterType']}
            label="Inverter type"
            rules={[{ required: true, message: 'Pick the inverter type' }]}
          >
            <Select
              options={inverterTypeOptions}
              placeholder="Select type"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={['inverter', 'phaseType']}
            label="Phase type"
            rules={[{ required: true, message: 'Pick the phase type' }]}
          >
            <Select
              options={phaseTypeOptions}
              placeholder="Select phase"
              style={{ width: '100%' }}
            />
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
            <Form.Item name={['inverter', 'maxPvInputPower']} label="Max PV input power">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="kW"
                placeholder="15"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['inverter', 'maxPvInputVoltage']} label="Max PV input voltage">
              <InputNumber<number>
                min={0}
                style={{ width: '100%' }}
                addonAfter="V"
                placeholder="1100"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['inverter', 'mpptVoltageMin']} label="MPPT voltage min">
              <InputNumber<number>
                min={0}
                style={{ width: '100%' }}
                addonAfter="V"
                placeholder="200"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['inverter', 'mpptVoltageMax']} label="MPPT voltage max">
              <InputNumber<number>
                min={0}
                style={{ width: '100%' }}
                addonAfter="V"
                placeholder="1000"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['inverter', 'mpptCount']} label="Number of MPPTs">
              <InputNumber<number>
                min={0}
                precision={0}
                style={{ width: '100%' }}
                placeholder="2"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['inverter', 'maxPvInputCurrent']} label="Max PV input current">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="A"
                placeholder="30"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['inverter', 'batteryCompatible']} label="Battery compatible">
              <Select
                allowClear
                options={yesNoOptions}
                placeholder="Select"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['inverter', 'parallelCapable']} label="Parallel operation">
              <Select
                allowClear
                options={yesNoOptions}
                placeholder="Select"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name={['inverter', 'batteryChemistries']} label="Supported battery chemistry">
          <Select
            mode="multiple"
            allowClear
            options={batteryChemistryOptions}
            placeholder="Select chemistries"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['inverter', 'batteryVoltageMin']} label="Battery voltage min">
              <InputNumber<number>
                min={0}
                style={{ width: '100%' }}
                addonAfter="V"
                placeholder="600"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['inverter', 'batteryVoltageMax']} label="Battery voltage max">
              <InputNumber<number>
                min={0}
                style={{ width: '100%' }}
                addonAfter="V"
                placeholder="980"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['inverter', 'maxChargingPower']} label="Max charging power">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="kW"
                placeholder="15"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['inverter', 'maxDischargingPower']} label="Max discharging power">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="kW"
                placeholder="10"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['inverter', 'peakEfficiency']} label="Peak efficiency">
              <InputNumber<number>
                min={0}
                max={100}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="%"
                placeholder="98.4"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['inverter', 'ipRating']} label="IP protection rating">
              <Select
                allowClear
                options={ipRatingOptions}
                placeholder="Select rating"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['inverter', 'warrantyYears']} label="Warranty">
              <InputNumber<number>
                min={0}
                precision={0}
                style={{ width: '100%' }}
                addonAfter="years"
                placeholder="10"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['inverter', 'manufacturingCountry']} label="Manufacturing country">
              <Input placeholder="e.g. China" allowClear />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name={['inverter', 'images']} label="Product images">
          <ProductImageUpload />
        </Form.Item>

        <Form.Item
          name={['inverter', 'datasheetUrl']}
          label="Datasheet URL"
          rules={[{ type: 'url', message: 'Enter a valid datasheet URL' }]}
        >
          <Input placeholder="https://example.com/inverter-datasheet.pdf" allowClear />
        </Form.Item>

        <Form.Item name={['inverter', 'description']} label="Description">
          <Input.TextArea rows={3} placeholder="Notes for the sales team…" allowClear />
        </Form.Item>
      </div>
    </>
  )
}

/**
 * Inverters need more than the generic catalogue fields, so they get their own
 * drawer: the rating and type stay visible while the electrical details live
 * behind the optional "Additional info" section.
 */
export function InverterFormDrawer({
  open,
  mode,
  meta,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: InverterFormDrawerProps) {
  const isCreate = mode === 'create'
  const noun = meta.itemLabel
  const hasInverterDetails =
    initialValues?.inverter !== undefined && Object.keys(initialValues.inverter).length > 0

  return (
    <FormDrawer<ProductInput>
      open={open}
      title={isCreate ? `New ${noun}` : `Edit ${noun}`}
      initialValues={initialValues}
      submitting={submitting}
      onClose={onClose}
      width={600}
      submitText={isCreate ? `Create ${noun}` : 'Save changes'}
      onSubmit={(values) => {
        const inverter = compactInverter(values.inverter)
        return onSubmit({ ...values, inverter, spec: describeInverter({ inverter }) })
      }}
    >
      <InverterFields meta={meta} defaultShowMore={hasInverterDetails} />
    </FormDrawer>
  )
}
