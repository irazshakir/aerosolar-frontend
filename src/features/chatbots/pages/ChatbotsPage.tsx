import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { App as AntApp, Button, Flex, Space, Typography } from 'antd'
import type { TableProps } from 'antd'
import { useState } from 'react'
import { ConfirmDelete } from '@/components/ui/ConfirmDelete'
import { DataTable } from '@/components/ui/DataTable'
import { EmptyState } from '@/components/ui/EmptyState'
import { StatusTag } from '@/components/ui/StatusTag'
import { ChatbotFilters } from '@/features/chatbots/components/ChatbotFilters'
import { ChatbotFormDrawer } from '@/features/chatbots/components/ChatbotFormDrawer'
import {
  useChatbots,
  useCreateChatbot,
  useDeleteChatbot,
  useUpdateChatbot,
} from '@/features/chatbots/hooks'
import type {
  Chatbot,
  ChatbotInput,
  ChatbotListParams,
  ChatbotStatus,
} from '@/features/chatbots/types'
import { PageContainer } from '@/layouts/AppLayout/PageContainer'
import { getErrorMessage } from '@/lib/api/errors'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { formatNumber, formatRelative } from '@/lib/utils/format'

type Columns<T> = NonNullable<TableProps<T>['columns']>

const PAGE_SIZE_DEFAULT = 10

const createDefaults: Partial<ChatbotInput> = {
  status: 'draft',
  model: 'gpt-4o-mini',
}

export default function ChatbotsPage() {
  const { message } = AntApp.useApp()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<ChatbotStatus | 'all'>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT)
  const [sort, setSort] = useState<{ field: string; order: 'asc' | 'desc' }>({
    field: 'updatedAt',
    order: 'desc',
  })

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Chatbot | null>(null)

  const debouncedSearch = useDebouncedValue(search)

  const params: ChatbotListParams = {
    page,
    pageSize,
    search: debouncedSearch || undefined,
    status,
    sort: sort.field,
    order: sort.order,
  }

  const chatbotsQuery = useChatbots(params)
  const createMutation = useCreateChatbot()
  const updateMutation = useUpdateChatbot()
  const deleteMutation = useDeleteChatbot()

  const openCreate = () => {
    setEditing(null)
    setDrawerOpen(true)
  }

  const openEdit = (chatbot: Chatbot) => {
    setEditing(chatbot)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditing(null)
  }

  const handleSubmit = async (values: ChatbotInput) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, input: values })
        message.success('Chatbot updated')
      } else {
        await createMutation.mutateAsync(values)
        message.success('Chatbot created')
      }
      closeDrawer()
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleDelete = async (chatbot: Chatbot) => {
    try {
      await deleteMutation.mutateAsync(chatbot.id)
      message.success('Chatbot deleted')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleReset = () => {
    setSearch('')
    setStatus('all')
    setPage(1)
  }

  const columns: Columns<Chatbot> = [
    {
      title: 'Chatbot',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sort.field === 'name' ? (sort.order === 'asc' ? 'ascend' : 'descend') : null,
      render: (_value, record) => (
        <Flex vertical gap={2} style={{ minWidth: 220 }}>
          <Typography.Text strong>{record.name}</Typography.Text>
          {record.description ? (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {record.description}
            </Typography.Text>
          ) : null}
        </Flex>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 110,
      render: (value: string) => <StatusTag status={value} />,
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
      width: 170,
      render: (value: string) => <Typography.Text code>{value}</Typography.Text>,
    },
    {
      title: 'Messages',
      dataIndex: 'messages',
      key: 'messages',
      width: 130,
      align: 'right',
      sorter: true,
      sortOrder: sort.field === 'messages' ? (sort.order === 'asc' ? 'ascend' : 'descend') : null,
      render: (value: number) => formatNumber(value),
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 160,
      sorter: true,
      sortOrder: sort.field === 'updatedAt' ? (sort.order === 'asc' ? 'ascend' : 'descend') : null,
      render: (value: string) => (
        <Typography.Text type="secondary">{formatRelative(value)}</Typography.Text>
      ),
    },
    {
      title: '',
      key: 'actions',
      width: 170,
      align: 'right',
      render: (_value, record) => (
        <Space size={0}>
          <Button type="text" icon={<EditOutlined />} onClick={() => openEdit(record)}>
            Edit
          </Button>
          <ConfirmDelete
            title={`Delete "${record.name}"?`}
            description="The chatbot and its settings will be removed."
            onConfirm={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="Chatbots"
      subtitle="Create, configure, and pause the assistants your team runs."
      actions={
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          New chatbot
        </Button>
      }
    >
      <DataTable<Chatbot>
        columns={columns}
        data={chatbotsQuery.data?.items}
        loading={chatbotsQuery.isFetching}
        total={chatbotsQuery.data?.total}
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
          <ChatbotFilters
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
            title="No chatbots match"
            description="Adjust the filters, or create your first chatbot."
            action={
              <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
                New chatbot
              </Button>
            }
          />
        }
      />

      <ChatbotFormDrawer
        open={drawerOpen}
        mode={editing ? 'edit' : 'create'}
        initialValues={
          editing
            ? {
                name: editing.name,
                description: editing.description,
                status: editing.status,
                model: editing.model,
              }
            : createDefaults
        }
        submitting={createMutation.isPending || updateMutation.isPending}
        onClose={closeDrawer}
        onSubmit={handleSubmit}
      />
    </PageContainer>
  )
}
