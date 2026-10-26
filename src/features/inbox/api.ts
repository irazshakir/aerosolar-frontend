import { env } from '@/config/env'
import {
  mockFetchConversationMessages,
  mockFetchConversations,
  mockMarkConversationRead,
  mockSendMessage,
} from '@/features/inbox/mock'
import type { Conversation, Message, SendMessageInput } from '@/features/inbox/types'
import { endpoints } from '@/lib/api/endpoints'
import { http } from '@/lib/api/http'

export async function fetchConversations(): Promise<Conversation[]> {
  if (env.useMockApi) {
    return mockFetchConversations()
  }

  return http.get<Conversation[]>(endpoints.inbox.conversations)
}

export async function fetchConversationMessages(conversationId: string): Promise<Message[]> {
  if (env.useMockApi) {
    return mockFetchConversationMessages(conversationId)
  }

  return http.get<Message[]>(endpoints.inbox.messages(conversationId))
}

export async function sendMessage(input: SendMessageInput): Promise<Message> {
  if (env.useMockApi) {
    return mockSendMessage(input)
  }

  return http.post<Message>(endpoints.inbox.send(input.conversationId), {
    body: input.body,
  })
}

export async function markConversationRead(conversationId: string): Promise<Conversation> {
  if (env.useMockApi) {
    return mockMarkConversationRead(conversationId)
  }

  return http.patch<Conversation>(endpoints.inbox.read(conversationId))
}
