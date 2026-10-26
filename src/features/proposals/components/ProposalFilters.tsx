import { Select } from 'antd'
import type { ReactNode } from 'react'
import { FilterBar } from '@/components/ui/FilterBar'
import type { ProposalStatus } from '@/features/proposals/types'

const statusOptions: { value: ProposalStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'declined', label: 'Declined' },
  { value: 'expired', label: 'Expired' },
]

interface ProposalFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  status: ProposalStatus | 'all'
  onStatusChange: (value: ProposalStatus | 'all') => void
  onReset: () => void
  resetDisabled?: boolean
  extra?: ReactNode
}

export function ProposalFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onReset,
  resetDisabled = false,
  extra,
}: ProposalFiltersProps) {
  return (
    <FilterBar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search proposals by number, title, client…"
      onReset={onReset}
      resetDisabled={resetDisabled}
      extra={extra}
    >
      <Select<ProposalStatus | 'all'>
        value={status}
        onChange={onStatusChange}
        options={statusOptions}
        style={{ width: 170 }}
        aria-label="Filter by proposal status"
      />
    </FilterBar>
  )
}
