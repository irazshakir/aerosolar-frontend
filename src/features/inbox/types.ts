export type ConversationChannel = 'whatsapp' | 'messenger'

export type ConversationStatus = 'open' | 'pending' | 'closed'

export type MessageDirection = 'inbound' | 'outbound'

export interface Conversation {
  id: string
  contactName: string
  contactHandle: string
  channel: ConversationChannel
  status: ConversationStatus
  assignee?: string
  unreadCount: number
  lastMessage: string
  updatedAt: string
}

export interface Message {
  id: string
  conversationId: string
  direction: MessageDirection
  author: string
  body: string
  createdAt: string
}

export interface SendMessageInput {
  conversationId: string
  body: string
}
