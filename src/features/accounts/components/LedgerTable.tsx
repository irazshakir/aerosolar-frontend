import { Tag, Typography } from 'antd'
import type { TableProps } from 'antd'
import { DataTable } from '@/components/ui/DataTable'
import type { LedgerAccount, LedgerType } from '@/features/accounts/types'
import { formatCurrency } from '@/lib/utils/format'

type Columns<T> = NonNullable<TableProps<T>['columns']>

const typeMeta: Record<LedgerType, { label: string; color: string }> = {
  asset: { label: 'Asset', color: 'blue' },
  liability: { label: 'Liability', color: 'volcano' },
  equity: { label: 'Equity', color: 'purple' },
  revenue: { label: 'Revenue', color: 'success' },
  expense: { label: 'Expense', color: 'warning' },
}

const columns: Columns<LedgerAccount> = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
    width: 100,
    render: (value: string) => <Typography.Text code>{value}</Typography.Text>,
  },
  {
    title: 'Account',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 130,
    render: (value: LedgerType) => {
      const meta = typeMeta[value]
      return <Tag color={meta.color}>{meta.label}</Tag>
    },
  },
  {
    title: 'Balance',
    dataIndex: 'balance',
    key: 'balance',
    width: 160,
    align: 'right',
    render: (value: number) => (
      <Typography.Text strong>{formatCurrency(value)}</Typography.Text>
    ),
  },
]

interface LedgerTableProps {
  data: LedgerAccount[] | undefined
  loading?: boolean
}

export function LedgerTable({ data, loading = false }: LedgerTableProps) {
  return (
    <DataTable<LedgerAccount>
      columns={columns}
      data={data}
      loading={loading}
      rowKey="id"
      scrollX={620}
    />
  )
}
