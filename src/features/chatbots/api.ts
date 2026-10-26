import { env } from '@/config/env'
import {
  mockCreateChatbot,
  mockDeleteChatbot,
  mockListChatbots,
  mockUpdateChatbot,
} from '@/features/chatbots/mock'
import type {
  Chatbot,
  ChatbotInput,
  ChatbotListParams,
  ChatbotListResult,
} from '@/features/chatbots/types'
import { endpoints } from '@/lib/api/endpoints'
import { http } from '@/lib/api/http'

export async function listChatbots(params: ChatbotListParams): Promise<ChatbotListResult> {
  if (env.useMockApi) {
    return mockListChatbots(params)
  }

  return http.get<ChatbotListResult>(endpoints.chatbots.list, { params })
}

export async function createChatbot(input: ChatbotInput): Promise<Chatbot> {
  if (env.useMockApi) {
    return mockCreateChatbot(input)
  }

  return http.post<Chatbot>(endpoints.chatbots.create, input)
}

export async function updateChatbot(id: string, input: ChatbotInput): Promise<Chatbot> {
  if (env.useMockApi) {
    return mockUpdateChatbot(id, input)
  }

  return http.put<Chatbot>(endpoints.chatbots.update(id), input)
}

export async function deleteChatbot(id: string): Promise<void> {
  if (env.useMockApi) {
    return mockDeleteChatbot(id)
  }

  await http.delete<void>(endpoints.chatbots.remove(id))
}
