import { SearchOutlined } from '@ant-design/icons'
import { Avatar, Badge, Empty, Flex, Input, Segmented, Spin, Typography, theme } from 'antd'
import { useState } from 'react'
import { ChannelTag } from '@/features/inbox/components/ChannelTag'
import type { Conversation, ConversationChannel } from '@/features/inbox/types'
import { formatRelative } from '@/lib/utils/format'

type ChannelFilter = 'all' | ConversationChannel

const channelOptions: { label: string; value: ChannelFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Messenger', value: 'messenger' },
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

interface ConversationListProps {
  conversations: Conversation[] | undefined
  loading?: boolean
  selectedId?: string
  onSelect: (conversation: Conversation) => void
}

export function ConversationList({
  conversations,
  loading = false,
  selectedId,
  onSelect,
}: ConversationListProps) {
  const { token } = theme.useToken()
  const [search, setSearch] = useState('')
  const [channel, setChannel] = useState<ChannelFilter>('all')

  const query = search.trim().toLowerCase()
  const visible = (conversations ?? []).filter((conversation) => {
    const matchesChannel = channel === 'all' || conversation.channel === channel
    const matchesSearch =
      !query ||
      conversation.contactName.toLowerCase().includes(query) ||
      conversation.contactHandle.toLowerCase().includes(query) ||
      conversation.lastMessage.toLowerCase().includes(query)

    return matchesChannel && matchesSearch
  })

  return (
    <Flex vertical style={{ height: '100%' }}>
      <Flex
        vertical
        gap={10}
        style={{ padding: 16, borderBottom: `1px solid ${token.colorBorderSecondary}` }}
      >
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Search conversations…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <Segmented<ChannelFilter>
          block
          value={channel}
          options={channelOptions}
          onChange={setChannel}
        />
      </Flex>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        {loading && !conversations ? (
          <Flex align="center" justify="center" style={{ padding: 48 }}>
            <Spin />
          </Flex>
        ) : visible.length === 0 ? (
          <Flex align="center" justify="center" style={{ padding: 48 }}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No conversations match" />
          </Flex>
        ) : (
          visible.map((conversation) => {
            const selected = conversation.id === selectedId

            return (
              <Flex
                key={conversation.id}
                role="button"
                tabIndex={0}
                gap={10}
                align="flex-start"
                onClick={() => onSelect(conversation)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onSelect(conversation)
                  }
                }}
                style={{
                  padding: '12px 16px',
                  cursor: 'pointer',
                  background: selected ? token.colorPrimaryBg : undefined,
                  borderBottom: `1px solid ${token.colorBorderSecondary}`,
                }}
              >
                <Avatar
                  size={38}
                  style={{
                    background: token.colorFillSecondary,
                    color: token.colorText,
                    flexShrink: 0,
                  }}
                >
                  {getInitials(conversation.contactName)}
                </Avatar>

                <Flex vertical gap={4} style={{ flex: 1, minWidth: 0 }}>
                  <Flex justify="space-between" align="center" gap={8}>
                    <Typography.Text strong ellipsis style={{ fontSize: 13 }}>
                      {conversation.contactName}
                    </Typography.Text>
                    <Typography.Text
                      type="secondary"
                      style={{ fontSize: 11, whiteSpace: 'nowrap' }}
                    >
                      {formatRelative(conversation.updatedAt)}
                    </Typography.Text>
                  </Flex>

                  <ChannelTag channel={conversation.channel} />

                  <Flex justify="space-between" align="center" gap={8}>
                    <Typography.Text type="secondary" ellipsis style={{ fontSize: 12 }}>
                      {conversation.lastMessage}
                    </Typography.Text>
                    <Badge count={conversation.unreadCount} size="small" />
                  </Flex>
                </Flex>
              </Flex>
            )
          })
        )}
      </div>
    </Flex>
  )
}
