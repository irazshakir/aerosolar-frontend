import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchConversationMessages,
  fetchConversations,
  markConversationRead,
  sendMessage,
} from '@/features/inbox/api'
import type { SendMessageInput } from '@/features/inbox/types'

export const inboxKeys = {
  all: ['inbox'] as const,
  conversations: () => [...inboxKeys.all, 'conversations'] as const,
  messages: (conversationId: string) => [...inboxKeys.all, 'messages', conversationId] as const,
}

export function useConversations() {
  return useQuery({
    queryKey: inboxKeys.conversations(),
    queryFn: fetchConversations,
  })
}

export function useConversationMessages(conversationId: string | undefined) {
  return useQuery({
    queryKey: inboxKeys.messages(conversationId ?? ''),
    queryFn: () => fetchConversationMessages(conversationId ?? ''),
    enabled: Boolean(conversationId),
  })
}

export function useSendMessage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: SendMessageInput) => sendMessage(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: inboxKeys.all }),
  })
}

export function useMarkConversationRead() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (conversationId: string) => markConversationRead(conversationId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: inboxKeys.conversations() }),
  })
}
