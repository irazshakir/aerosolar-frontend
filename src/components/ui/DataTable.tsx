import { Flex, Table } from 'antd'
import type { TableProps } from 'antd'
import type { ReactNode } from 'react'
import { EmptyState } from '@/components/ui/EmptyState'

type Columns<T> = NonNullable<TableProps<T>['columns']>

export interface DataTableProps<T extends object> {
  columns: Columns<T>
  data: T[] | undefined
  loading?: boolean
  total?: number
  page?: number
  pageSize?: number
  onPageChange?: (page: number, pageSize: number) => void
  onSortChange?: (field: string, order: 'asc' | 'desc') => void
  toolbar?: ReactNode
  rowKey: keyof T | ((row: T) => string)
  empty?: ReactNode
  scrollX?: number | string
  virtual?: boolean
}

/**
 * Typed Ant Design Table wrapper with server-side pagination and sorting.
 * Never renders its own data fetching — the caller owns query state.
 */
export function DataTable<T extends object>({
  columns,
  data,
  loading = false,
  total,
  page,
  pageSize,
  onPageChange,
  onSortChange,
  toolbar,
  rowKey,
  empty,
  scrollX = 'max-content',
  virtual = false,
}: DataTableProps<T>) {
  const handleChange: TableProps<T>['onChange'] = (_pagination, _filters, sorter) => {
    if (!onSortChange) {
      return
    }

    const current = Array.isArray(sorter) ? sorter[0] : sorter
    if (!current?.order) {
      return
    }

    const field = typeof current.field === 'string' ? current.field : undefined
    if (!field) {
      return
    }

    onSortChange(field, current.order === 'descend' ? 'desc' : 'asc')
  }

  return (
    <Flex vertical gap={16}>
      {toolbar}
      <Table<T>
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey={rowKey as TableProps<T>['rowKey']}
        onChange={handleChange}
        scroll={{ x: scrollX, ...(virtual ? { y: 520 } : {}) }}
        virtual={virtual}
        locale={{
          emptyText: empty ?? (
            <EmptyState title="No results" description="Try adjusting your search or filters." />
          ),
        }}
        pagination={
          total === undefined
            ? false
            : {
                current: page,
                pageSize,
                total,
                showSizeChanger: true,
                showTotal: (count) => `${count} items`,
                onChange: onPageChange,
              }
        }
      />
    </Flex>
  )
}
