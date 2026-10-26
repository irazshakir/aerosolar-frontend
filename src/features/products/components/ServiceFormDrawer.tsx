import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, InputNumber, Row, Select, Typography } from 'antd'
import { useState } from 'react'
import { FormDrawer } from '@/components/ui/FormDrawer'
import { ProductImageUpload } from '@/features/products/components/ProductImageUpload'
import type { ProductCatalogEntry } from '@/features/products/catalog'
import {
  customerTypeOptions,
  describeService,
  productStatusOptions,
  serviceAreaOptions,
  serviceCategoryOptions,
  serviceDurationUnitOptions,
  servicePricingTypeOptions,
  serviceSubcategoryOptions,
  systemTypeOptions,
  warrantyUnitOptions,
} from '@/features/products/catalog'
import type { ProductInput, ServiceDetails, ServicePricingType } from '@/features/products/types'

interface ServiceFormDrawerProps {
  open: boolean
  mode: 'create' | 'edit'
  meta: ProductCatalogEntry
  initialValues?: Partial<ProductInput>
  submitting?: boolean
  onClose: () => void
  onSubmit: (values: ProductInput) => Promise<void> | void
}

/** Drops blank optional fields so the saved payload stays clean. */
function compactService(service?: ServiceDetails): ServiceDetails | undefined {
  if (!service) {
    return undefined
  }

  const filled = Object.entries(service).filter(([, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0
    }
    return value !== undefined && value !== null && value !== ''
  })

  return filled.length > 0 ? (Object.fromEntries(filled) as ServiceDetails) : undefined
}

/** Services have no SKU of their own, so a reference code is minted once. */
function serviceReference(): string {
  return `SRV-${Date.now().toString(36).toUpperCase()}`
}

interface ServiceFieldsProps {
  meta: ProductCatalogEntry
  defaultShowMore: boolean
}

function ServiceFields({ meta, defaultShowMore }: ServiceFieldsProps) {
  const form = Form.useFormInstance<ProductInput>()
  const [showMore, setShowMore] = useState(defaultShowMore)

  const serviceCategory = Form.useWatch('serviceCategory', form)
  const pricingType = Form.useWatch('pricingType', form)

  const isCustomQuote = pricingType === 'custom-quote'
  const subcategoryOptions = serviceCategory ? serviceSubcategoryOptions[serviceCategory] : []
  const priceSuffix = servicePricingTypeOptions.find(
    (option) => option.value === pricingType,
  )?.priceSuffix

  const statusOptions = productStatusOptions.filter((option) =>
    meta.statuses.includes(option.value),
  )

  const handleCategoryChange = () => {
    // The previous sub-category belongs to the old group, so clear it.
    form.setFieldValue('serviceSubcategory', undefined)
  }

  const handlePricingTypeChange = (value: ServicePricingType) => {
    // A custom quote has no price, so drop whatever was typed before.
    if (value === 'custom-quote') {
      form.setFieldValue('unitPrice', undefined)
    }
  }

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
            name="serviceCategory"
            label="Service category"
            rules={[{ required: true, message: 'Pick a service category' }]}
          >
            <Select
              options={serviceCategoryOptions}
              placeholder="Select category"
              style={{ width: '100%' }}
              onChange={handleCategoryChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="serviceSubcategory"
            label="Sub-category"
            rules={[{ required: true, message: 'Pick a sub-category' }]}
          >
            <Select
              options={subcategoryOptions}
              disabled={!serviceCategory}
              placeholder={serviceCategory ? 'Select sub-category' : 'Pick a category first'}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name={['service', 'description']}
        label="Description"
        rules={[
          { required: true, message: 'Describe the service' },
          { max: 500, message: 'Keep the description under 500 characters' },
        ]}
      >
        <Input.TextArea
          rows={3}
          placeholder="What the crew does, what is included, and what the customer gets…"
          allowClear
        />
      </Form.Item>

      <Row gutter={12}>
        <Col span={12}>
          <Form.Item
            name="pricingType"
            label="Pricing type"
            rules={[{ required: true, message: 'Pick how the service is billed' }]}
          >
            <Select
              options={servicePricingTypeOptions}
              placeholder="Select pricing type"
              style={{ width: '100%' }}
              onChange={handlePricingTypeChange}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="unitPrice"
            label="Price"
            rules={isCustomQuote ? [] : [{ required: true, message: 'Enter a price' }]}
            extra={isCustomQuote ? 'Quoted per job — no fixed price needed.' : undefined}
          >
            <InputNumber<number>
              min={0}
              disabled={isCustomQuote}
              style={{ width: '100%' }}
              addonBefore="$"
              addonAfter={priceSuffix}
              placeholder={isCustomQuote ? 'Quoted per job' : '0'}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="status"
        label="Service availability"
        rules={[{ required: true, message: 'Pick the availability' }]}
      >
        <Select
          options={statusOptions}
          placeholder="Select availability"
          style={{ width: '100%' }}
        />
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

        <Form.Item name={['service', 'customerTypes']} label="Customer type">
          <Select
            mode="multiple"
            allowClear
            options={customerTypeOptions}
            placeholder="Select customer types"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item name={['service', 'systemTypes']} label="System type">
          <Select
            mode="multiple"
            allowClear
            options={systemTypeOptions}
            placeholder="Select system types"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['service', 'minSystemCapacity']} label="Minimum system capacity">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="kW"
                placeholder="3"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['service', 'maxSystemCapacity']} label="Maximum system capacity">
              <InputNumber<number>
                min={0}
                step={0.1}
                style={{ width: '100%' }}
                addonAfter="kW"
                placeholder="25"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name={['service', 'serviceAreas']} label="Service areas">
          <Select
            mode="tags"
            allowClear
            options={serviceAreaOptions.map((city) => ({ value: city, label: city }))}
            placeholder="Select or type a city"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['service', 'estimatedDuration']} label="Estimated duration">
              <InputNumber<number> min={0} style={{ width: '100%' }} placeholder="2" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['service', 'durationUnit']} label="Duration unit">
              <Select
                allowClear
                options={serviceDurationUnitOptions}
                placeholder="Hours or days"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name={['service', 'warranty']} label="Workmanship warranty">
              <InputNumber<number> min={0} style={{ width: '100%' }} placeholder="12" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={['service', 'warrantyUnit']} label="Warranty unit">
              <Select
                allowClear
                options={warrantyUnitOptions}
                placeholder="Months or years"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name={['service', 'images']} label="Image">
          <ProductImageUpload />
        </Form.Item>

        <Form.Item name={['service', 'additionalTerms']} label="Additional terms">
          <Input.TextArea
            rows={3}
            placeholder="Payment terms, exclusions, permits needed…"
            allowClear
          />
        </Form.Item>
      </div>
    </>
  )
}

/**
 * Services are billed by scope instead of stock, so they get their own drawer:
 * category, pricing, and availability stay visible while the scope details live
 * behind the optional "Additional info" section.
 */
export function ServiceFormDrawer({
  open,
  mode,
  meta,
  initialValues,
  submitting = false,
  onClose,
  onSubmit,
}: ServiceFormDrawerProps) {
  const isCreate = mode === 'create'
  const noun = meta.itemLabel
  const hasServiceDetails =
    initialValues?.service !== undefined && Object.keys(initialValues.service).length > 0

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
        // `sku` and `brand` are not form fields, so they come from the record.
        return onSubmit({
          ...values,
          sku: initialValues?.sku ?? serviceReference(),
          brand: initialValues?.brand ?? meta.brands[0] ?? '',
          stock: 0,
          // A custom quote is priced per job, so it carries no amount.
          unitPrice: values.pricingType === 'custom-quote' ? 0 : values.unitPrice,
          service: compactService(values.service),
          spec: describeService(values),
        })
      }}
    >
      <ServiceFields meta={meta} defaultShowMore={hasServiceDetails} />
    </FormDrawer>
  )
}
