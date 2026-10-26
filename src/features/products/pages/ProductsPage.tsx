import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { App as AntApp, Button, Flex, Space, Typography } from 'antd'
import type { TableProps } from 'antd'
import { useState } from 'react'
import { ConfirmDelete } from '@/components/ui/ConfirmDelete'
import { DataTable } from '@/components/ui/DataTable'
import { EmptyState } from '@/components/ui/EmptyState'
import { StatusTag } from '@/components/ui/StatusTag'
import { productCatalog, serviceCategoryLabel } from '@/features/products/catalog'
import { BatteryFormDrawer } from '@/features/products/components/BatteryFormDrawer'
import { InverterFormDrawer } from '@/features/products/components/InverterFormDrawer'
import { PanelFormDrawer } from '@/features/products/components/PanelFormDrawer'
import { ProductFilters } from '@/features/products/components/ProductFilters'
import { ProductFormDrawer } from '@/features/products/components/ProductFormDrawer'
import { ServiceFormDrawer } from '@/features/products/components/ServiceFormDrawer'
import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from '@/features/products/hooks'
import type {
  Product,
  ProductCategory,
  ProductInput,
  ProductListParams,
  ProductStatus,
  ServiceCategory,
} from '@/features/products/types'
import { PageContainer } from '@/layouts/AppLayout/PageContainer'
import { getErrorMessage } from '@/lib/api/errors'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { formatCurrency, formatNumber, formatRelative } from '@/lib/utils/format'
import { typography } from '@/theme/tokens'

type Columns<T> = NonNullable<TableProps<T>['columns']>

const PAGE_SIZE_DEFAULT = 10

/** Stock at or below this level is flagged in the table. */
const LOW_STOCK_THRESHOLD = 5

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

interface ProductsPageProps {
  category: ProductCategory
}

/**
 * Shared catalogue screen. The five sidebar entries render this with a
 * different `category`; everything category-specific comes from the catalog.
 */
export function ProductsPage({ category }: ProductsPageProps) {
  const { message } = AntApp.useApp()
  const meta = productCatalog[category]
  const isPanel = category === 'panels'
  const isInverter = category === 'inverters'
  const isBattery = category === 'batteries'
  const isService = category === 'services'
  /** Panels, inverters, and batteries store a model number instead of an internal SKU. */
  const usesModelNumber = isPanel || isInverter || isBattery

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<ProductStatus | 'all'>('all')
  const [brand, setBrand] = useState<string>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT)
  const [sort, setSort] = useState<{ field: string; order: 'asc' | 'desc' }>({
    field: 'name',
    order: 'asc',
  })

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)

  const debouncedSearch = useDebouncedValue(search)

  const params: ProductListParams = {
    category,
    page,
    pageSize,
    search: debouncedSearch || undefined,
    status,
    brand,
    sort: sort.field,
    order: sort.order,
  }

  const productsQuery = useProducts(params)
  const createMutation = useCreateProduct(category)
  const updateMutation = useUpdateProduct()
  const deleteMutation = useDeleteProduct()

  const createDefaults: Partial<ProductInput> = {
    status: 'active',
    stock: 0,
    brand: meta.brands[0],
  }

  const drawerInitialValues: Partial<ProductInput> = editing
    ? {
        name: editing.name,
        sku: editing.sku,
        brand: editing.brand,
        spec: editing.spec,
        unitPrice: editing.unitPrice,
        buyPrice: editing.buyPrice,
        stock: editing.stock,
        status: editing.status,
        ratedPower: editing.ratedPower,
        panel: editing.panel,
        inverter: editing.inverter,
        battery: editing.battery,
        serviceCategory: editing.serviceCategory,
        serviceSubcategory: editing.serviceSubcategory,
        pricingType: editing.pricingType,
        service: editing.service,
      }
    : createDefaults

  const openCreate = () => {
    setEditing(null)
    setDrawerOpen(true)
  }

  const openEdit = (product: Product) => {
    setEditing(product)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditing(null)
  }

  const handleSubmit = async (values: ProductInput) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, input: values })
        message.success(`${capitalize(meta.itemLabel)} updated`)
      } else {
        await createMutation.mutateAsync(values)
        message.success(`${capitalize(meta.itemLabel)} created`)
      }
      closeDrawer()
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleDelete = async (product: Product) => {
    try {
      await deleteMutation.mutateAsync(product.id)
      message.success(`${capitalize(meta.itemLabel)} deleted`)
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleReset = () => {
    setSearch('')
    setStatus('all')
    setBrand('all')
    setPage(1)
  }

  const searchPlaceholder = isService
    ? `Search services by name, category, or ${meta.brandLabel.toLowerCase()}…`
    : `Search ${meta.title.toLowerCase()} by name, ${usesModelNumber ? 'model no' : 'SKU'}, or ` +
      `${meta.brandLabel.toLowerCase()}…`

  const sortOrderFor = (field: string) =>
    sort.field === field ? (sort.order === 'asc' ? 'ascend' : 'descend') : null

  const columns: Columns<Product> = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sortOrderFor('name'),
      render: (_value, record) => (
        <Flex vertical gap={2} style={{ minWidth: 210 }}>
          <Typography.Text strong>{record.name}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: typography.size.small }}>
            {record.spec}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      title: isService ? 'Category' : usesModelNumber ? 'Model no' : 'SKU',
      dataIndex: isService ? 'serviceCategory' : 'sku',
      key: isService ? 'serviceCategory' : 'sku',
      width: isService ? 150 : 130,
      render: (value: string) =>
        isService ? (
          <Typography.Text>{serviceCategoryLabel(value as ServiceCategory)}</Typography.Text>
        ) : (
          <Typography.Text code>{value}</Typography.Text>
        ),
    },
    {
      title: meta.brandLabel,
      dataIndex: 'brand',
      key: 'brand',
      width: 140,
    },
    {
      title: isPanel ? 'Sell price' : isService ? 'Price' : 'Unit price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      width: 120,
      align: 'right',
      sorter: true,
      sortOrder: sortOrderFor('unitPrice'),
      render: (value: number, record) =>
        isService && record.pricingType === 'custom-quote' ? (
          <Typography.Text strong>Custom quote</Typography.Text>
        ) : (
          <Typography.Text strong>{formatCurrency(value)}</Typography.Text>
        ),
    },
    ...(meta.tracksStock
      ? ([
          {
            title: 'In stock',
            dataIndex: 'stock',
            key: 'stock',
            width: 100,
            align: 'right',
            sorter: true,
            sortOrder: sortOrderFor('stock'),
            render: (value: number) => (
              <Typography.Text type={value <= LOW_STOCK_THRESHOLD ? 'warning' : undefined} strong>
                {formatNumber(value)}
              </Typography.Text>
            ),
          },
        ] satisfies Columns<Product>)
      : []),
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (value: string) => <StatusTag status={value} />,
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 130,
      sorter: true,
      sortOrder: sortOrderFor('updatedAt'),
      render: (value: string) => (
        <Typography.Text type="secondary">{formatRelative(value)}</Typography.Text>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 160,
      align: 'right',
      render: (_value, record) => (
        <Space size={0}>
          <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(record)}>
            Edit
          </Button>
          <ConfirmDelete
            title={`Delete "${record.name}"?`}
            description={`This ${meta.itemLabel} will be removed from the catalogue.`}
            onConfirm={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title={meta.title}
      subtitle={meta.description}
      actions={
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          New {meta.itemLabel}
        </Button>
      }
    >
      <DataTable<Product>
        columns={columns}
        data={productsQuery.data?.items}
        loading={productsQuery.isFetching}
        total={productsQuery.data?.total}
        page={page}
        pageSize={pageSize}
        onPageChange={(nextPage, nextPageSize) => {
          setPage(nextPage)
          setPageSize(nextPageSize)
        }}
        onSortChange={(field, order) => {
          setSort({ field, order })
          setPage(1)
        }}
        rowKey="id"
        scrollX={meta.tracksStock ? 1080 : 980}
        toolbar={
          <ProductFilters
            search={search}
            onSearchChange={(value) => {
              setSearch(value)
              setPage(1)
            }}
            status={status}
            onStatusChange={(value) => {
              setStatus(value)
              setPage(1)
            }}
            brand={brand}
            onBrandChange={(value) => {
              setBrand(value)
              setPage(1)
            }}
            brands={meta.brands}
            statuses={meta.statuses}
            brandLabel={meta.brandLabel}
            searchPlaceholder={searchPlaceholder}
            onReset={handleReset}
            resetDisabled={search.length === 0 && status === 'all' && brand === 'all'}
          />
        }
        empty={
          <EmptyState
            title={`No ${meta.itemLabel}s match`}
            description="Adjust the filters, or add the first one."
            action={
              <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
                New {meta.itemLabel}
              </Button>
            }
          />
        }
      />

      {isService ? (
        <ServiceFormDrawer
          open={drawerOpen}
          mode={editing ? 'edit' : 'create'}
          meta={meta}
          initialValues={drawerInitialValues}
          submitting={createMutation.isPending || updateMutation.isPending}
          onClose={closeDrawer}
          onSubmit={handleSubmit}
        />
      ) : isPanel ? (
        <PanelFormDrawer
          open={drawerOpen}
          mode={editing ? 'edit' : 'create'}
          meta={meta}
          initialValues={drawerInitialValues}
          submitting={createMutation.isPending || updateMutation.isPending}
          onClose={closeDrawer}
          onSubmit={handleSubmit}
        />
      ) : isInverter ? (
        <InverterFormDrawer
          open={drawerOpen}
          mode={editing ? 'edit' : 'create'}
          meta={meta}
          initialValues={drawerInitialValues}
          submitting={createMutation.isPending || updateMutation.isPending}
          onClose={closeDrawer}
          onSubmit={handleSubmit}
        />
      ) : isBattery ? (
        <BatteryFormDrawer
          open={drawerOpen}
          mode={editing ? 'edit' : 'create'}
          meta={meta}
          initialValues={drawerInitialValues}
          submitting={createMutation.isPending || updateMutation.isPending}
          onClose={closeDrawer}
          onSubmit={handleSubmit}
        />
      ) : (
        <ProductFormDrawer
          open={drawerOpen}
          mode={editing ? 'edit' : 'create'}
          meta={meta}
          initialValues={drawerInitialValues}
          submitting={createMutation.isPending || updateMutation.isPending}
          onClose={closeDrawer}
          onSubmit={handleSubmit}
        />
      )}
    </PageContainer>
  )
}
