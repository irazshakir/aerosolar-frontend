import { Tag } from 'antd'

export type StatusKey =
  | 'active'
  | 'inactive'
  | 'paused'
  | 'draft'
  | 'error'
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'customer'
  | 'lost'
  | 'open'
  | 'pending'
  | 'closed'
  | 'connected'
  | 'disconnected'
  | 'sent'
  | 'accepted'
  | 'declined'
  | 'expired'
  | 'paid'
  | 'overdue'
  | 'void'
  | 'ready'
  | 'generating'

interface StatusMeta {
  label: string
  color: string
}

const statusMeta: Record<StatusKey, StatusMeta> = {
  active: { label: 'Active', color: 'success' },
  inactive: { label: 'Inactive', color: 'default' },
  paused: { label: 'Paused', color: 'warning' },
  draft: { label: 'Draft', color: 'default' },
  error: { label: 'Error', color: 'error' },
  new: { label: 'New', color: 'blue' },
  contacted: { label: 'Contacted', color: 'cyan' },
  qualified: { label: 'Qualified', color: 'geekblue' },
  customer: { label: 'Customer', color: 'success' },
  lost: { label: 'Lost', color: 'error' },
  open: { label: 'Open', color: 'processing' },
  pending: { label: 'Pending', color: 'warning' },
  closed: { label: 'Closed', color: 'default' },
  connected: { label: 'Connected', color: 'success' },
  disconnected: { label: 'Disconnected', color: 'default' },
  sent: { label: 'Sent', color: 'processing' },
  accepted: { label: 'Accepted', color: 'success' },
  declined: { label: 'Declined', color: 'error' },
  expired: { label: 'Expired', color: 'default' },
  paid: { label: 'Paid', color: 'success' },
  overdue: { label: 'Overdue', color: 'error' },
  void: { label: 'Void', color: 'default' },
  ready: { label: 'Ready', color: 'success' },
  generating: { label: 'Generating', color: 'processing' },
}

interface StatusTagProps {
  status: StatusKey | (string & {})
}

/** Single place where a domain status becomes a colour. */
export function StatusTag({ status }: StatusTagProps) {
  const meta = statusMeta[status as StatusKey] ?? { label: status, color: 'default' }

  return <Tag color={meta.color}>{meta.label}</Tag>
}
