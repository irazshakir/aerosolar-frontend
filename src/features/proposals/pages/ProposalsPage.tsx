import { EditOutlined, PlusOutlined, SendOutlined } from '@ant-design/icons'
import { App as AntApp, Button, Flex, Space, Typography } from 'antd'
import type { TableProps } from 'antd'
import dayjs from 'dayjs'
import { useState } from 'react'
import { ConfirmDelete } from '@/components/ui/ConfirmDelete'
import { DataTable } from '@/components/ui/DataTable'
import { EmptyState } from '@/components/ui/EmptyState'
import { StatusTag } from '@/components/ui/StatusTag'
import { ProposalFilters } from '@/features/proposals/components/ProposalFilters'
import { ProposalFormDrawer } from '@/features/proposals/components/ProposalFormDrawer'
import {
  useCreateProposal,
  useDeleteProposal,
  useProposals,
  useSendProposal,
  useUpdateProposal,
} from '@/features/proposals/hooks'
import type {
  Proposal,
  ProposalInput,
  ProposalListParams,
  ProposalStatus,
} from '@/features/proposals/types'
import { PageContainer } from '@/layouts/AppLayout/PageContainer'
import { getErrorMessage } from '@/lib/api/errors'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { formatCurrency, formatDate, formatRelative } from '@/lib/utils/format'

type Columns<T> = NonNullable<TableProps<T>['columns']>

const PAGE_SIZE_DEFAULT = 10

function createDefaults(): Partial<ProposalInput> {
  return {
    status: 'draft',
    currency: 'USD',
    validUntil: dayjs().add(14, 'day').format('YYYY-MM-DD'),
  }
}

export default function ProposalsPage() {
  const { message } = AntApp.useApp()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<ProposalStatus | 'all'>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT)
  const [sort, setSort] = useState<{ field: string; order: 'asc' | 'desc' }>({
    field: 'createdAt',
    order: 'desc',
  })

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Proposal | null>(null)

  const debouncedSearch = useDebouncedValue(search)

  const params: ProposalListParams = {
    page,
    pageSize,
    search: debouncedSearch || undefined,
    status,
    sort: sort.field,
    order: sort.order,
  }

  const proposalsQuery = useProposals(params)
  const createMutation = useCreateProposal()
  const updateMutation = useUpdateProposal()
  const sendMutation = useSendProposal()
  const deleteMutation = useDeleteProposal()

  const openCreate = () => {
    setEditing(null)
    setDrawerOpen(true)
  }

  const openEdit = (proposal: Proposal) => {
    setEditing(proposal)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditing(null)
  }

  const handleSubmit = async (values: ProposalInput) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, input: values })
        message.success('Proposal updated')
      } else {
        await createMutation.mutateAsync(values)
        message.success('Proposal created')
      }
      closeDrawer()
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleSend = async (proposal: Proposal) => {
    try {
      await sendMutation.mutateAsync(proposal.id)
      message.success('Proposal marked as sent')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleDelete = async (proposal: Proposal) => {
    try {
      await deleteMutation.mutateAsync(proposal.id)
      message.success('Proposal deleted')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleReset = () => {
    setSearch('')
    setStatus('all')
    setPage(1)
  }

  const columns: Columns<Proposal> = [
    {
      title: 'Proposal',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      sortOrder: sort.field === 'title' ? (sort.order === 'asc' ? 'ascend' : 'descend') : null,
      render: (_value, record) => (
        <Flex vertical gap={2} style={{ minWidth: 240 }}>
          <Typography.Text strong>{record.title}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {record.number}
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
      title: 'Valid until',
      dataIndex: 'validUntil',
      key: 'validUntil',
      width: 130,
      sorter: true,
      sortOrder:
        sort.field === 'validUntil' ? (sort.order === 'asc' ? 'ascend' : 'descend') : null,
      render: (value: string) => formatDate(value),
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
      sorter: true,
      sortOrder:
        sort.field === 'createdAt' ? (sort.order === 'asc' ? 'ascend' : 'descend') : null,
      render: (value: string) => (
        <Typography.Text type="secondary">{formatRelative(value)}</Typography.Text>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 250,
      align: 'right',
      render: (_value, record) => (
        <Space size={0}>
          <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(record)}>
            Edit
          </Button>
          {record.status === 'draft' ? (
            <Button
              type="text"
              icon={<SendOutlined />}
              loading={sendMutation.isPending && sendMutation.variables === record.id}
              onClick={() => void handleSend(record)}
            >
              Send
            </Button>
          ) : null}
          <ConfirmDelete
            title={`Delete "${record.title}"?`}
            description="The proposal and its history will be removed."
            onConfirm={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="Proposals"
      subtitle="Create proposals for clients and track them from draft to accepted."
      actions={
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          New proposal
        </Button>
      }
    >
      <DataTable<Proposal>
        columns={columns}
        data={proposalsQuery.data?.items}
        loading={proposalsQuery.isFetching}
        total={proposalsQuery.data?.total}
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
          <ProposalFilters
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
            title="No proposals match"
            description="Adjust the filters, or create your first proposal."
            action={
              <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
                New proposal
              </Button>
            }
          />
        }
      />

      <ProposalFormDrawer
        open={drawerOpen}
        mode={editing ? 'edit' : 'create'}
        initialValues={
          editing
            ? {
                title: editing.title,
                clientName: editing.clientName,
                clientEmail: editing.clientEmail,
                amount: editing.amount,
                currency: editing.currency,
                status: editing.status,
                validUntil: editing.validUntil,
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
