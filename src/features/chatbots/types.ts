import type { ListParams, Paginated } from '@/types/api'

export type ChatbotStatus = 'active' | 'paused' | 'draft' | 'error'

export type ChatbotModel = 'gpt-4o' | 'gpt-4o-mini' | 'claude-3.5-sonnet' | 'llama-3.1-70b'

export interface Chatbot {
  id: string
  name: string
  description?: string
  status: ChatbotStatus
  model: ChatbotModel
  messages: number
  updatedAt: string
}

export interface ChatbotInput {
  name: string
  description?: string
  status: ChatbotStatus
  model: ChatbotModel
}

export interface ChatbotListParams extends ListParams {
  status?: ChatbotStatus | 'all'
}

export type ChatbotListResult = Paginated<Chatbot>
