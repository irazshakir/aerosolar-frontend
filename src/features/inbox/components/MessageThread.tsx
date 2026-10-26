import { SendOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Input, Spin, Typography, theme } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { EmptyState } from '@/components/ui/EmptyState'
import { StatusTag } from '@/components/ui/StatusTag'
import { ChannelTag } from '@/features/inbox/components/ChannelTag'
import type { Conversation, Message } from '@/features/inbox/types'
import { formatDate } from '@/lib/utils/format'
import { radii } from '@/theme/tokens'

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

interface MessageComposerProps {
  conversationId: string
  sending: boolean
  onSend: (body: string) => Promise<boolean>
}

function MessageComposer({ conversationId, sending, onSend }: MessageComposerProps) {
  const { token } = theme.useToken()
  const [body, setBody] = useState('')

  const handleSend = async () => {
    const value = body.trim()
    if (!value || sending) {
      return
    }

    const sent = await onSend(value)
    if (sent && conversationId) {
      setBody('')
    }
  }

  return (
    <Flex
      vertical
      gap={8}
      style={{ padding: 16, borderTop: `1px solid ${token.colorBorderSecondary}` }}
    >
      <Input.TextArea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder="Write a reply…"
        autoSize={{ minRows: 2, maxRows: 4 }}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            void handleSend()
          }
        }}
      />
      <Flex justify="space-between" align="center" gap={12} wrap>
        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
          Enter to send · Shift + Enter for a new line
        </Typography.Text>
        <Button
          type="primary"
          icon={<SendOutlined />}
          loading={sending}
          disabled={body.trim().length === 0}
          onClick={() => void handleSend()}
        >
          Send
        </Button>
      </Flex>
    </Flex>
  )
}

interface MessageThreadProps {
  conversation: Conversation | undefined
  messages: Message[] | undefined
  loading?: boolean
  sending?: boolean
  onSend: (body: string) => Promise<boolean>
}

export function MessageThread({
  conversation,
  messages,
  loading = false,
  sending = false,
  onSend,
}: MessageThreadProps) {
  const { token } = theme.useToken()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [conversation?.id, messages?.length])

  if (!conversation) {
    return (
      <Flex align="center" justify="center" style={{ height: '100%', padding: 24 }}>
        <EmptyState
          title="Select a conversation"
          description="Pick a chat from the list to read the thread and reply."
        />
      </Flex>
    )
  }

  return (
    <Flex vertical style={{ height: '100%' }}>
      <Flex
        justify="space-between"
        align="center"
        gap={12}
        wrap
        style={{ padding: '14px 20px', borderBottom: `1px solid ${token.colorBorderSecondary}` }}
      >
        <Flex align="center" gap={12}>
          <Avatar size={40} style={{ background: token.colorPrimary, flexShrink: 0 }}>
            {getInitials(conversation.contactName)}
          </Avatar>
          <Flex vertical gap={2}>
            <Flex align="center" gap={8} wrap>
              <Typography.Text strong>{conversation.contactName}</Typography.Text>
              <ChannelTag channel={conversation.channel} />
            </Flex>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {conversation.contactHandle}
              {' · '}
              {conversation.assignee ? `Assigned to ${conversation.assignee}` : 'Unassigned'}
            </Typography.Text>
          </Flex>
        </Flex>
        <StatusTag status={conversation.status} />
      </Flex>

      <Flex vertical gap={12} style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
        {loading ? (
          <Flex align="center" justify="center" style={{ padding: 48 }}>
            <Spin />
          </Flex>
        ) : !messages || messages.length === 0 ? (
          <EmptyState
            title="No messages yet"
            description="Send the first reply to start this conversation."
          />
        ) : (
          messages.map((message) => {
            const outbound = message.direction === 'outbound'

            return (
              <Flex key={message.id} justify={outbound ? 'flex-end' : 'flex-start'}>
                <div
                  style={{
                    maxWidth: '72%',
                    padding: '10px 14px',
                    borderRadius: radii.md,
                    background: outbound ? token.colorPrimaryBg : token.colorFillQuaternary,
                  }}
                >
                  {!outbound ? (
                    <Typography.Text
                      type="secondary"
                      style={{ display: 'block', fontSize: 11, marginBottom: 2 }}
                    >
                      {message.author}
                    </Typography.Text>
                  ) : null}
                  <Typography.Paragraph style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                    {message.body}
                  </Typography.Paragraph>
                  <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                    {formatDate(message.createdAt, 'DD MMM, HH:mm')}
                  </Typography.Text>
                </div>
              </Flex>
            )
          })
        )}
        <div ref={bottomRef} />
      </Flex>

      <MessageComposer
        key={conversation.id}
        conversationId={conversation.id}
        sending={sending}
        onSend={onSend}
      />
    </Flex>
  )
}
