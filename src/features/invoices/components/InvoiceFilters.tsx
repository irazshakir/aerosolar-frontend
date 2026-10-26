import { Select } from 'antd'
import type { ReactNode } from 'react'
import { FilterBar } from '@/components/ui/FilterBar'
import type { InvoiceStatus } from '@/features/invoices/types'

const statusOptions: { value: InvoiceStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'void', label: 'Void' },
]

interface InvoiceFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  status: InvoiceStatus | 'all'
  onStatusChange: (value: InvoiceStatus | 'all') => void
  onReset: () => void
  resetDisabled?: boolean
  extra?: ReactNode
}

export function InvoiceFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onReset,
  resetDisabled = false,
  extra,
}: InvoiceFiltersProps) {
  return (
    <FilterBar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search invoices by number, client, email…"
      onReset={onReset}
      resetDisabled={resetDisabled}
      extra={extra}
    >
      <Select<InvoiceStatus | 'all'>
        value={status}
        onChange={onStatusChange}
        options={statusOptions}
        style={{ width: 170 }}
        aria-label="Filter by invoice status"
      />
    </FilterBar>
  )
}
