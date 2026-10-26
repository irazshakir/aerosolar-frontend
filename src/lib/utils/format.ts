import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type DateInput = string | number | Date | null | undefined

const EMPTY = '—'

export function formatDate(value: DateInput, template = 'DD MMM YYYY'): string {
  if (value === null || value === undefined) {
    return EMPTY
  }
  return dayjs(value).format(template)
}

export function formatDateTime(value: DateInput): string {
  return formatDate(value, 'DD MMM YYYY, HH:mm')
}

export function formatRelative(value: DateInput): string {
  if (value === null || value === undefined) {
    return EMPTY
  }
  return dayjs(value).fromNow()
}

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return EMPTY
  }
  return new Intl.NumberFormat('en-US').format(value)
}

export function formatCurrency(value: number | null | undefined, currency = 'USD'): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return EMPTY
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatPercent(value: number | null | undefined, fractionDigits = 1): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return EMPTY
  }
  return `${value.toFixed(fractionDigits)}%`
}
