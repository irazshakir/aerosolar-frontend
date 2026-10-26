import { EditOutlined, PlusOutlined } from '@ant-design/icons'
import { App as AntApp, Button, Flex, Space, Typography } from 'antd'
import type { TableProps } from 'antd'
import { useState } from 'react'
import { ConfirmDelete } from '@/components/ui/ConfirmDelete'
import { DataTable } from '@/components/ui/DataTable'
import { EmptyState } from '@/components/ui/EmptyState'
import { StatusTag } from '@/components/ui/StatusTag'
import { ContactFilters } from '@/features/contacts/components/ContactFilters'
import { ContactFormDrawer } from '@/features/contacts/components/ContactFormDrawer'
import {
  useContacts,
  useCreateContact,
  useDeleteContact,
  useUpdateContact,
} from '@/features/contacts/hooks'
import type {
  Contact,
  ContactInput,
  ContactListParams,
  ContactSource,
  ContactStatus,
} from '@/features/contacts/types'
import { PageContainer } from '@/layouts/AppLayout/PageContainer'
import { getErrorMessage } from '@/lib/api/errors'
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue'
import { formatRelative } from '@/lib/utils/format'

type Columns<T> = NonNullable<TableProps<T>['columns']>

const PAGE_SIZE_DEFAULT = 10

const createDefaults: Partial<ContactInput> = {
  status: 'new',
  source: 'manual',
  owner: 'Ayesha Khan',
}

const sourceLabels: Record<ContactSource, string> = {
  whatsapp: 'WhatsApp',
  messenger: 'Messenger',
  website: 'Website',
  manual: 'Manual',
}

export default function ContactsPage() {
  const { message } = AntApp.useApp()

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<ContactStatus | 'all'>('all')
  const [source, setSource] = useState<ContactSource | 'all'>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DEFAULT)
  const [sort, setSort] = useState<{ field: string; order: 'asc' | 'desc' }>({
    field: 'lastContactedAt',
    order: 'desc',
  })

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [editing, setEditing] = useState<Contact | null>(null)

  const debouncedSearch = useDebouncedValue(search)

  const params: ContactListParams = {
    page,
    pageSize,
    search: debouncedSearch || undefined,
    status,
    source,
    sort: sort.field,
    order: sort.order,
  }

  const contactsQuery = useContacts(params)
  const createMutation = useCreateContact()
  const updateMutation = useUpdateContact()
  const deleteMutation = useDeleteContact()

  const openCreate = () => {
    setEditing(null)
    setDrawerOpen(true)
  }

  const openEdit = (contact: Contact) => {
    setEditing(contact)
    setDrawerOpen(true)
  }

  const closeDrawer = () => {
    setDrawerOpen(false)
    setEditing(null)
  }

  const handleSubmit = async (values: ContactInput) => {
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, input: values })
        message.success('Contact updated')
      } else {
        await createMutation.mutateAsync(values)
        message.success('Contact created')
      }
      closeDrawer()
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleDelete = async (contact: Contact) => {
    try {
      await deleteMutation.mutateAsync(contact.id)
      message.success('Contact deleted')
    } catch (error) {
      message.error(getErrorMessage(error))
    }
  }

  const handleReset = () => {
    setSearch('')
    setStatus('all')
    setSource('all')
    setPage(1)
  }

  const columns: Columns<Contact> = [
    {
      title: 'Contact',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      sortOrder: sort.field === 'name' ? (sort.order === 'asc' ? 'ascend' : 'descend') : null,
      render: (_value, record) => (
        <Flex vertical gap={2} style={{ minWidth: 200 }}>
          <Typography.Text strong>{record.name}</Typography.Text>
          <Typography.Text type="secondary" style={{ fontSize: 12 }}>
            {record.email ?? record.phone ?? 'No contact details'}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      width: 180,
      render: (value: string | undefined) => (
        <Typography.Text>{value ?? '—'}</Typography.Text>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      width: 120,
      render: (value: ContactSource) => sourceLabels[value],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (value: string) => <StatusTag status={value} />,
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
      width: 150,
    },
    {
      title: 'Last contact',
      dataIndex: 'lastContactedAt',
      key: 'lastContactedAt',
      width: 150,
      sorter: true,
      sortOrder:
        sort.field === 'lastContactedAt' ? (sort.order === 'asc' ? 'ascend' : 'descend') : null,
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
            description="The lead and its notes will be removed."
            onConfirm={() => handleDelete(record)}
          />
        </Space>
      ),
    },
  ]

  return (
    <PageContainer
      title="Contacts"
      subtitle="Every lead captured from WhatsApp, Messenger, and the website."
      actions={
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
          New contact
        </Button>
      }
    >
      <DataTable<Contact>
        columns={columns}
        data={contactsQuery.data?.items}
        loading={contactsQuery.isFetching}
        total={contactsQuery.data?.total}
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
          <ContactFilters
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
            source={source}
            onSourceChange={(value) => {
              setSource(value)
              setPage(1)
            }}
            onReset={handleReset}
            resetDisabled={search.length === 0 && status === 'all' && source === 'all'}
          />
        }
        empty={
          <EmptyState
            title="No leads match"
            description="Adjust the filters, or add your first contact."
            action={
              <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
                New contact
              </Button>
            }
          />
        }
      />

      <ContactFormDrawer
        open={drawerOpen}
        mode={editing ? 'edit' : 'create'}
        initialValues={
          editing
            ? {
                name: editing.name,
                email: editing.email,
                phone: editing.phone,
                company: editing.company,
                source: editing.source,
                status: editing.status,
                owner: editing.owner,
                notes: editing.notes,
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
