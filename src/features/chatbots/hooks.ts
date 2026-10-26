import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createChatbot, deleteChatbot, listChatbots, updateChatbot } from '@/features/chatbots/api'
import type { ChatbotInput, ChatbotListParams } from '@/features/chatbots/types'

export const chatbotKeys = {
  all: ['chatbots'] as const,
  list: (params: ChatbotListParams) => [...chatbotKeys.all, 'list', params] as const,
  detail: (id: string) => [...chatbotKeys.all, 'detail', id] as const,
}

export function useChatbots(params: ChatbotListParams) {
  return useQuery({
    queryKey: chatbotKeys.list(params),
    queryFn: () => listChatbots(params),
    placeholderData: keepPreviousData,
  })
}

export function useCreateChatbot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createChatbot,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: chatbotKeys.all }),
  })
}

export function useUpdateChatbot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ChatbotInput }) => updateChatbot(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: chatbotKeys.all }),
  })
}

export function useDeleteChatbot() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteChatbot,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: chatbotKeys.all }),
  })
}
