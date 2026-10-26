import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Typography } from 'antd'
import { useState } from 'react'
import { FormDrawer } from '@/components/ui/FormDrawer'
import { ProductImageUpload } from '@/features/products/components/ProductImageUpload'
import type { ProductCatalogEntry } from '@/features/products/catalog'
import {
  batteryChemistryOptions,
  batteryTypeOptions,
  communicationProtocolOptions,
  describeBattery,
  productStatusOptions,
  yesNoOptions,
} from '@/features/products/catalog'
import { useProducts } from '@/features/products/hooks'
import type { BatteryDetails, ProductInput } from '@/features/products/types'

interface BatteryFormDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  meta: ProductCatalogEntry
  initialValues?: Partial<ProductInput>
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: ProductInput) => Promise<void> | void
}

/** Drops blank optional fields so the saved payload stays clean. */
function compactBattery(battery?: BatteryDetails): BatteryDetails | undefined {
  if (!battery) {
    return undefined
  }

  const filled = Object.entries(battery).filter(([, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0
    }
    // `false` is a real answer for the expandable flag, so it must survive.
    return value !== undefined && value !== null && value !== ''
  })

  return filled.length > 0 ? (Object.fromEntries(filled) as BatteryDetails) : undefined
}

interface BatteryFieldsProps {
  meta: ProductCatalogEntry
  defaultShowMore: boolean
}

function BatteryFields({ meta, defaultShowMore }: BatteryFieldsProps) {
  const [showMore, setShowMore] = useState(defaultShowMore)

  // Compatible models are picked from the inverter tab, so read the same catalogue.
  const invertersQuery = useProducts({
    category: 'inverters',
    page: 1,
    pageSize: 100,
    sort: 'name',
    order: 'asc',
  })

  const inverterOptions = (invertersQuery.data?.items ?? [])
    .filter((inverter) => inverter.sku)
    .map((inverter) => ({ value: inverter.sku, label: `${inverter.name} (${inverter.sku})` }))

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
            <Input placeholder="e.g. US5000" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name={['battery', 'chemistry']}
            label="Battery chemistry"
            rules={[{ required: true, message: 'Pick the battery chemistry' }]}
          >
            <Select
              options={batteryChemistryOptions}
              placeholder="Select chemistry"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={['battery', 'nominalCapacity']}
            label="Nominal capacity"
            rules={[{ required: true, message: 'Enter the nominal capacity' }]}
          >
            <InputNumber<number>
              min={0}
              step={0.1}
              style={{ width: '100%' }}
              addonAfter="kWh"
              placeholder="4.8"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name={['battery', 'nominalVoltage']}
            label="Nominal voltage"
            rules={[{ required: true, message: 'Enter the nominal voltage' }]}
          >
            <InputNumber<number>
              min={0}
              step={0.1}
              style={{ width: '100%' }}
              addonAfter="V"
              placeholder="48"
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
            <Form.Item name={['battery', 'usableCapacity']} label="Usable capacity">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="kWh"
                placeholder="4.6"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['battery', 'depthOfDischarge']} label="Depth of discharge">
              <InputNumber<number>
                min={0}
                max={100}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="%"
                placeholder="95"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['battery', 'maxChargingCurrent']} label="Max charging current">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="A"
                placeholder="50"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['battery', 'maxDischargingCurrent']} label="Max discharging current">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="A"
                placeholder="50"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['battery', 'maxChargingPower']} label="Max charging power">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="kW"
                placeholder="2.5"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['battery', 'maxDischargingPower']} label="Max discharging power">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="kW"
                placeholder="2.5"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['battery', 'cycleLife']} label="Cycle life">
              <InputNumber<number>
                min={0}
                precision={0}
                style={{ width: '100%' }}
                addonAfter="cycles"
                placeholder="6000"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['battery', 'roundTripEfficiency']} label="Round-trip efficiency">
              <InputNumber<number>
                min={0}
                max={100}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="%"
                placeholder="95"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['battery', 'batteryType']} label="Battery type">
              <Select
                allowClear
                options={batteryTypeOptions}
                placeholder="Select type"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['battery', 'expandable']} label="Expandable">
              <Select
                allowClear
                options={yesNoOptions}
                placeholder="Select"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['battery', 'maxExpandableUnits']} label="Max expandable units">
              <InputNumber<number>
                min={0}
                precision={0}
                style={{ width: '100%' }}
                placeholder="8"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['battery', 'warrantyYears']} label="Warranty">
              <InputNumber<number>
                min={0}
                precision={0}
                style={{ width: '100%' }}
                addonAfter="years"
                placeholder="10"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              name={['battery', 'operatingTemperatureMin']}
              label="Operating temperature min"
            >
              <InputNumber<number> style={{ width: '100%' }} addonAfter="°C" placeholder="-10" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name={['battery', 'operatingTemperatureMax']}
              label="Operating temperature max"
            >
              <InputNumber<number> style={{ width: '100%' }} addonAfter="°C" placeholder="55" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name={['battery', 'compatibleInverterModels']}
          label="Compatible inverter models"
          extra="Pick from the models listed under Inverters."
        >
          <Select
            mode="multiple"
            allowClear
            showSearch
            optionFilterProp="label"
            loading={invertersQuery.isFetching}
            options={inverterOptions}
            placeholder="Select inverter models"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name={['battery', 'communicationProtocols']} label="Communication protocol">
          <Select
            mode="multiple"
            allowClear
            options={communicationProtocolOptions}
            placeholder="Select protocols"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name={['battery', 'manufacturingCountry']} label="Manufacturing country">
          <Input placeholder="e.g. China" allowClear />
        </Form.Item>

        <Form.Item name={['battery', 'images']} label="Product images">
          <ProductImageUpload />
        </Form.Item>

        <Form.Item
          name={['battery', 'datasheetUrl']}
          label="Datasheet URL"
          rules={[{ type: 'url', message: 'Enter a valid datasheet URL' }]}
        >
          <Input placeholder="https://example.com/battery-datasheet.pdf" allowClear />
        </Form.Item>

        <Form.Item name={['battery', 'description']} label="Description">
          <Input.TextArea rows={3} placeholder="Notes for the sales team…" allowClear />
        </Form.Item>
      </div>
    </>
  )
}

/**
 * Batteries carry a long engineering spec, so they get a dedicated drawer: the
 * commercial fields stay visible while the storage details live behind the
 * optional "Additional info" section.
 */
export function BatteryFormDrawer({
  open,
  mode,
  meta,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: BatteryFormDrawerProps) {
  const isCreate = mode === 'create'
  const noun = meta.itemLabel
  const hasBatteryDetails =
    initialValues?.battery !== undefined && Object.keys(initialValues.battery).length > 0

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
        const battery = compactBattery(values.battery)
        return onSubmit({ ...values, battery, spec: describeBattery({ battery }) })
      }}
    >
      <BatteryFields meta={meta} defaultShowMore={hasBatteryDetails} />
    </FormDrawer>
  )
}
