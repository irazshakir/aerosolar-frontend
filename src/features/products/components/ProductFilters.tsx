import { Select } from 'antd'
import { FilterBar } from '@/components/ui/FilterBar'
import { productStatusOptions } from '@/features/products/catalog'
import type { ProductStatus } from '@/features/products/types'

interface ProductFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  status: ProductStatus | 'all'
  onStatusChange: (value: ProductStatus | 'all') => void
  brand: string
  onBrandChange: (value: string) => void
  brands: string[]
  /** Statuses offered by the current catalogue tab. */
  statuses: ProductStatus[]
  brandLabel: string
  searchPlaceholder: string
  onReset: () => void
  resetDisabled?: boolean
}

export function ProductFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  brand,
  onBrandChange,
  brands,
  statuses,
  brandLabel,
  searchPlaceholder,
  onReset,
  resetDisabled = false,
}: ProductFiltersProps) {
  const statusOptions: { value: ProductStatus | 'all'; label: string }[] = [
    { value: 'all', label: 'All statuses' },
    ...productStatusOptions.filter((option) => statuses.includes(option.value)),
  ]

  const brandOptions = [
    { value: 'all', label: `All ${brandLabel.toLowerCase()}s` },
    ...brands.map((option) => ({ value: option, label: option })),
  ]

  return (
    <FilterBar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder={searchPlaceholder}
      onReset={onReset}
      resetDisabled={resetDisabled}
    >
      <Select<ProductStatus | 'all'>
        value={status}
        onChange={onStatusChange}
        options={statusOptions}
        style={{ width: 160 }}
        aria-label="Filter by status"
      />
      <Select<string>
        value={brand}
        onChange={onBrandChange}
        options={brandOptions}
        style={{ width: 180 }}
        aria-label={`Filter by ${brandLabel.toLowerCase()}`}
      />
    </FilterBar>
  )
}
