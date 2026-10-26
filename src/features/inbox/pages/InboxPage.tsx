import { App as AntApp, Card, Col, Row } from 'antd'
import { useState } from 'react'
import { ConversationList } from '@/features/inbox/components/ConversationList'
import { MessageThread } from '@/features/inbox/components/MessageThread'
import {
  useConversations,
  useConversationMessages,
  useMarkConversationRead,
  useSendMessage,
} from '@/features/inbox/hooks'
import type { Conversation } from '@/features/inbox/types'
import { PageContainer } from '@/layouts/AppLayout/PageContainer'
import { getErrorMessage } from '@/lib/api/errors'

const panelStyle = { height: 'calc(100vh - 230px)', minHeight: 540 }

export default function InboxPage() {
  const { message } = AntApp.useApp()

  const [selectedId, setSelectedId] = useState<string | null>(null)

  const conversationsQuery = useConversations()
  const conversations = conversationsQuery.data
  const activeConversation =
    conversations?.find((conversation) => conversation.id === selectedId) ?? conversations?.[0]

  const messagesQuery = useConversationMessages(activeConversation?.id)
  const markReadMutation = useMarkConversationRead()
  const sendMutation = useSendMessage()

  const handleSelect = (conversation: Conversation) => {
    setSelectedId(conversation.id)

    if (conversation.unreadCount > 0) {
      markReadMutation.mutate(conversation.id, {
        onError: (error) => message.error(getErrorMessage(error)),
      })
    }
  }

  const handleSend = async (body: string): Promise<boolean> => {
    if (!activeConversation) {
      return false
    }

    try {
      await sendMutation.mutateAsync({ conversationId: activeConversation.id, body })
      return true
    } catch (error) {
      message.error(getErrorMessage(error))
      return false
    }
  }

  return (
    <PageContainer
      title="Inbox"
      subtitle="WhatsApp and Messenger conversations in one shared queue."
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={9} xl={8}>
          <Card style={panelStyle} styles={{ body: { padding: 0, height: '100%' } }}>
            <ConversationList
              conversations={conversations}
              loading={conversationsQuery.isPending}
              selectedId={activeConversation?.id}
              onSelect={handleSelect}
            />
          </Card>
        </Col>

        <Col xs={24} lg={15} xl={16}>
          <Card style={panelStyle} styles={{ body: { padding: 0, height: '100%' } }}>
            <MessageThread
              conversation={activeConversation}
              messages={messagesQuery.data}
              loading={messagesQuery.isPending}
              sending={sendMutation.isPending}
              onSend={handleSend}
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  )
}
