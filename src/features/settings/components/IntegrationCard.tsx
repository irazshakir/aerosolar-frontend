import { MessageOutlined, WhatsAppOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Popconfirm, Typography, theme } from 'antd'
import type { ReactNode } from 'react'
import { StatusTag } from '@/components/ui/StatusTag'
import type { Integration, IntegrationChannel } from '@/features/settings/types'
import { formatDate, formatRelative } from '@/lib/utils/format'

const channelMeta: Record<
  IntegrationChannel,
  { label: string; description: string; icon: ReactNode }
> = {
  whatsapp: {
    label: 'WhatsApp Business',
    description: 'Receive and reply to WhatsApp messages from the shared Inbox.',
    icon: <WhatsAppOutlined />,
  },
  messenger: {
    label: 'Facebook Messenger',
    description: 'Connect a Facebook page and route Messenger chats to the Inbox team.',
    icon: <MessageOutlined />,
  },
}

interface IntegrationCardProps {
  integration: Integration
  disconnecting?: boolean
  onConnect: () => void
  onDisconnect: () => Promise<void> | void
}

export function IntegrationCard({
  integration,
  disconnecting = false,
  onConnect,
  onDisconnect,
}: IntegrationCardProps) {
  const { token } = theme.useToken()
  const meta = channelMeta[integration.channel]
  const connected = integration.status === 'connected'

  return (
    <Card>
      <Flex justify="space-between" align="flex-start" gap={16} wrap>
        <Flex gap={14} align="flex-start">
          <Flex
            align="center"
            justify="center"
            style={{
              width: 44,
              height: 44,
              borderRadius: token.borderRadiusSM,
              background: token.colorPrimaryBg,
              color: token.colorPrimary,
              fontSize: 20,
              flexShrink: 0,
            }}
          >
            {meta.icon}
          </Flex>

          <Flex vertical gap={4} style={{ maxWidth: 560 }}>
            <Flex align="center" gap={8} wrap>
              <Typography.Text strong>{meta.label}</Typography.Text>
              <StatusTag status={integration.status} />
            </Flex>
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {meta.description}
            </Typography.Text>

            {connected ? (
              <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                {[integration.displayName, integration.phoneNumber].filter(Boolean).join(' · ')}
                {integration.connectedAt
                  ? ` · Connected ${formatDate(integration.connectedAt)}`
                  : ''}
                {integration.lastSyncAt
                  ? ` · Last sync ${formatRelative(integration.lastSyncAt)}`
                  : ''}
              </Typography.Text>
            ) : null}

            {integration.status === 'error' && integration.errorMessage ? (
              <Typography.Text type="danger" style={{ fontSize: 12 }}>
                {integration.errorMessage}
              </Typography.Text>
            ) : null}
          </Flex>
        </Flex>

        <Flex gap={8} wrap>
          {connected ? (
            <>
              <Button onClick={onConnect}>Edit</Button>
              <Popconfirm
                title={`Disconnect ${meta.label}?`}
                description="Incoming messages will stop until you reconnect this channel."
                okText="Disconnect"
                cancelText="Cancel"
                okButtonProps={{ danger: true, loading: disconnecting }}
                onConfirm={() => onDisconnect()}
              >
                <Button danger loading={disconnecting}>
                  Disconnect
                </Button>
              </Popconfirm>
            </>
          ) : (
            <Button type="primary" onClick={onConnect}>
              Connect
            </Button>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}
