import { ReloadOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Flex, Input } from 'antd'
import type { ReactNode } from 'react'

interface FilterBarProps {
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  /** Selects and other filter controls. */
  children?: ReactNode
  onReset?: () => void
  resetDisabled?: boolean
  extra?: ReactNode
}

export function FilterBar({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search…',
  children,
  onReset,
  resetDisabled = false,
  extra,
}: FilterBarProps) {
  return (
    <Flex gap={12} wrap align="center" justify="space-between" style={{ marginBottom: 16 }}>
      <Flex gap={12} wrap align="center" style={{ flex: 1, minWidth: 240 }}>
        {onSearchChange ? (
          <Input
            allowClear
            prefix={<SearchOutlined />}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            style={{ width: 280, maxWidth: '100%' }}
          />
        ) : null}
        {children}
        {onReset ? (
          <Button icon={<ReloadOutlined />} onClick={onReset} disabled={resetDisabled}>
            Reset
          </Button>
        ) : null}
      </Flex>
      {extra ? <Flex align="center">{extra}</Flex> : null}
    </Flex>
  )
}
