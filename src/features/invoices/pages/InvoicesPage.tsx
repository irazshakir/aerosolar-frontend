import {
  CheckCircleOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { App as AntApp, Button, Flex, Space, Typography } from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { ConfirmDelete } from '@/components/ui/ConfirmDelete'
import { DataTable } from '@/components/ui/DataTable'
import { EmptyState } from '@/components/ui/EmptyState'
import { StatusTag } from '@/components/ui/StatusTag'
import { InvoiceFilters } from '@/features/invoices/components/InvoiceFilters'
import { InvoiceFormDrawer } from '@/features/invoices/components/InvoiceFormDrawer'
import {
  useCreateInvoice,
  useDeleteInvoice,
  useInvoices,
  useMarkInvoicePaid,
  useUpdateInvoice,
} from '@/features/invoices/hooks'
import type {
  Invoice,
  InvoiceInput,
  InvoiceListParams,
  InvoiceStatus,
} from '@/features/invoices/types'
import { PageContainer } from '@/layouts/AppLayout/PageContainer'
import { getErrorMessage } from '@/lib/api/errors'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { formatCurrency, formatDate, formatRelative } from '@/lib/utils/format'

type Columns<T> = NonNullable<TableProps<T>['columns']>

const PAGE_SIZE_DEFAULT = 10

function createDefaults(): Partial<InvoiceInput> {
  return {
    status: 'draft',
    currency: 'USD',
    issueDate: dayjs().format('YYYY-MM-DD'),
    dueDate: dayjs().add(14, 'day').format('YYYY-MM-DD'),
  }
}

export default function InvoicesPage() {
  const { message } = AntApp.useApp()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<InvoiceStatus | 'all'>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT)
  const [sort, setSort] = useState<{ field: string; order: 'asc' | 'desc' }>({
    field: 'createdAt',
    order: 'desc',
  })

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Invoice | null>(null)

  const debouncedSearch = useDebouncedValue(search)

  const params: InvoiceListParams = {
    page,
    pageSize,
    search: debouncedSearch || undefined,
    status,
    sort: sort.field,
    order: sort.order,
  }

  const invoicesQuery = useInvoices(params)
  const createMutation = useCreateInvoice()
  const updateMutation = useUpdateInvoice()
  const paidMutation = useMarkInvoicePaid()
  const deleteMutation = useDeleteInvoice()

  const openCreate = () => {
    setEditing(null)
    setDrawerOpen(true)
  }

  const openEdit = (invoice: Invoice) => {
    setEditing(invoice)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditing(null)
  }

  const handleSubmit = async (values: InvoiceInput) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, input: values })
        message.success('Invoice updated')
      } else {
        await createMutation.mutateAsync(values)
        message.success('Invoice created')
      }
      closeDrawer()
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleMarkPaid = async (invoice: Invoice) => {
    try {
      await paidMutation.mutateAsync(invoice.id)
      message.success('Invoice marked as paid')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleDelete = async (invoice: Invoice) => {
    try {
      await deleteMutation.mutateAsync(invoice.id)
      message.success('Invoice deleted')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleReset = () => {
    setSearch('')
    setStatus('all')
    setPage(1)
  }

  const columns: Columns<Invoice> = [
    {
      title: 'Invoice',
      dataIndex: 'number',
      key: 'number',
      render: (_value, record) => (
        <Flex vertical gap={2} style={{ minWidth: 130 }}>
          <Typography.Text strong>{record.number}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            Created {formatRelative(record.createdAt)}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      title: 'Client',
      dataIndex: 'clientName',
      key: 'clientName',
      width: 210,
      render: (_value, record) => (
        <Flex vertical gap={2}>
          <Typography.Text>{record.clientName}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {record.clientEmail}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 140,
      align: 'right',
      sorter: true,
      sortOrder: sort.field === 'amount' ? (sort.order === 'asc' ? 'ascend' : 'descend') : null,
      render: (_value, record) => (
        <Typography.Text strong>
          {formatCurrency(record.amount, record.currency)}
        </Typography.Text>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value: string) => <StatusTag status={value} />,
    },
    {
      title: 'Issued',
      dataIndex: 'issueDate',
      key: 'issueDate',
      width: 130,
      sorter: true,
      sortOrder:
        sort.field === 'issueDate' ? (sort.order === 'asc' ? 'ascend' : 'descend') : null,
      render: (value: string) => formatDate(value),
    },
    {
      title: 'Due',
      dataIndex: 'dueDate',
      key: 'dueDate',
      width: 130,
      sorter: true,
      sortOrder: sort.field === 'dueDate' ? (sort.order === 'asc' ? 'ascend' : 'descend') : null,
      render: (value: string, record) => (
        <Typography.Text type={record.status === 'overdue' ? 'danger' : undefined}>
          {formatDate(value)}
        </Typography.Text>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 300,
      align: 'right',
      render: (_value, record) => (
        <Space size={0}>
          <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(record)}>
            Edit
          </Button>
          {record.status === 'sent' || record.status === 'overdue' ? (
            <Button
              type="text"
              icon={<CheckCircleOutlined />}
              loading={paidMutation.isPending && paidMutation.variables === record.id}
              onClick={() => void handleMarkPaid(record)}
            >
              Mark paid
            </Button>
          ) : null}
          <ConfirmDelete
            title={`Delete ${record.number}?`}
            description="The invoice and its payment history will be removed."
            onConfirm={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="Invoices"
      subtitle="Generate invoices for clients and keep track of what has been paid."
      actions={
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          New invoice
        </Button>
      }
    >
      <DataTable<Invoice>
        columns={columns}
        data={invoicesQuery.data?.items}
        loading={invoicesQuery.isFetching}
        total={invoicesQuery.data?.total}
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
        toolbar={
          <InvoiceFilters
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
            onReset={handleReset}
            resetDisabled={search.length === 0 && status === 'all'}
          />
        }
        empty={
          <EmptyState
            title="No invoices match"
            description="Adjust the filters, or create your first invoice."
            action={
              <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
                New invoice
              </Button>
            }
          />
        }
      />

      <InvoiceFormDrawer
        open={drawerOpen}
        mode={editing ? 'edit' : 'create'}
        initialValues={
          editing
            ? {
                clientName: editing.clientName,
                clientEmail: editing.clientEmail,
                amount: editing.amount,
                currency: editing.currency,
                issueDate: editing.issueDate,
                dueDate: editing.dueDate,
                status: editing.status,
                notes: editing.notes,
              }
            : createDefaults()
        }
        submitting={createMutation.isPending || updateMutation.isPending}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  )
}
