import { Tag } from 'antd'
import type { ConversationChannel } from '@/features/inbox/types'

const channelMeta: Record<ConversationChannel, { label: string; color: string }> = {
  whatsapp: { label: 'WhatsApp', color: 'success' },
  messenger: { label: 'Messenger', color: 'processing' },
}

interface ChannelTagProps {
  channel: ConversationChannel
}

export function ChannelTag({ channel }: ChannelTagProps) {
  const meta = channelMeta[channel]

  return <Tag color={meta.color}>{meta.label}</Tag>
}
