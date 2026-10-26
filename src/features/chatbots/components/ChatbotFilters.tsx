import { Select } from 'antd'
import type { ReactNode } from 'react'
import { FilterBar } from '@/components/ui/FilterBar'
import type { ChatbotStatus } from '@/features/chatbots/types'

const statusOptions: { value: ChatbotStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'draft', label: 'Draft' },
  { value: 'error', label: 'Error' },
]

interface ChatbotFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  status: ChatbotStatus | 'all'
  onStatusChange: (value: ChatbotStatus | 'all') => void
  onReset: () => void
  resetDisabled?: boolean
  extra?: ReactNode
}

export function ChatbotFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  onReset,
  resetDisabled = false,
  extra,
}: ChatbotFiltersProps) {
  return (
    <FilterBar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search chatbots…"
      onReset={onReset}
      resetDisabled={resetDisabled}
      extra={extra}
    >
      <Select<ChatbotStatus | 'all'>
        value={status}
        onChange={onStatusChange}
        options={statusOptions}
        style={{ width: 170 }}
        aria-label="Filter by status"
      />
    </FilterBar>
  )
}
