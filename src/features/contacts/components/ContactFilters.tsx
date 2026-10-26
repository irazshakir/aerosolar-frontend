import { Select } from 'antd'
import type { ReactNode } from 'react'
import { FilterBar } from '@/components/ui/FilterBar'
import type { ContactSource, ContactStatus } from '@/features/contacts/types'

const statusOptions: { value: ContactStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'customer', label: 'Customer' },
  { value: 'lost', label: 'Lost' },
]

const sourceOptions: { value: ContactSource | 'all'; label: string }[] = [
  { value: 'all', label: 'All sources' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'messenger', label: 'Messenger' },
  { value: 'website', label: 'Website' },
  { value: 'manual', label: 'Manual' },
]

interface ContactFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  status: ContactStatus | 'all'
  onStatusChange: (value: ContactStatus | 'all') => void
  source: ContactSource | 'all'
  onSourceChange: (value: ContactSource | 'all') => void
  onReset: () => void
  resetDisabled?: boolean
  extra?: ReactNode
}

export function ContactFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  source,
  onSourceChange,
  onReset,
  resetDisabled = false,
  extra,
}: ContactFiltersProps) {
  return (
    <FilterBar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search leads by name, company, email…"
      onReset={onReset}
      resetDisabled={resetDisabled}
      extra={extra}
    >
      <Select<ContactStatus | 'all'>
        value={status}
        onChange={onStatusChange}
        options={statusOptions}
        style={{ width: 170 }}
        aria-label="Filter by lead status"
      />
      <Select<ContactSource | 'all'>
        value={source}
        onChange={onSourceChange}
        options={sourceOptions}
        style={{ width: 160 }}
        aria-label="Filter by lead source"
      />
    </FilterBar>
  )
}
