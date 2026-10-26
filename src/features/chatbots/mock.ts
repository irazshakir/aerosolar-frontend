import type {
  Chatbot,
  ChatbotInput,
  ChatbotListParams,
  ChatbotListResult,
  ChatbotModel,
  ChatbotStatus,
} from '@/features/chatbots/types'

const MIN_LATENCY_MS = 300
const MAX_LATENCY_MS = 600

function latency(): number {
  return MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS)
}

function delay(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, latency())
  })
}

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
}

const seed: Chatbot[] = [
  {
    id: 'bot_1',
    name: 'Support assistant',
    description: 'First-line support for product and account questions.',
    status: 'active',
    model: 'gpt-4o',
    messages: 8421,
    updatedAt: daysAgo(1),
  },
  {
    id: 'bot_2',
    name: 'Billing helper',
    description: 'Answers invoices, plans, and payment method questions.',
    status: 'active',
    model: 'gpt-4o-mini',
    messages: 3120,
    updatedAt: daysAgo(2),
  },
  {
    id: 'bot_3',
    name: 'Onboarding bot',
    description: 'Guides new customers through the first workspace setup.',
    status: 'paused',
    model: 'claude-3.5-sonnet',
    messages: 1180,
    updatedAt: daysAgo(4),
  },
  {
    id: 'bot_4',
    name: 'Refund triage',
    description: 'Collects order details before a refund is reviewed.',
    status: 'draft',
    model: 'gpt-4o-mini',
    messages: 0,
    updatedAt: daysAgo(6),
  },
  {
    id: 'bot_5',
    name: 'Product FAQ',
    description: 'Syncs the help centre and answers feature questions.',
    status: 'error',
    model: 'llama-3.1-70b',
    messages: 2740,
    updatedAt: daysAgo(7),
  },
  {
    id: 'bot_6',
    name: 'Sales qualifier',
    description: 'Qualifies inbound demo requests before hand-off.',
    status: 'active',
    model: 'gpt-4o',
    messages: 1640,
    updatedAt: daysAgo(9),
  },
  {
    id: 'bot_7',
    name: 'Churn saver',
    description: 'Offers retention options when a cancellation is requested.',
    status: 'paused',
    model: 'claude-3.5-sonnet',
    messages: 720,
    updatedAt: daysAgo(11),
  },
  {
    id: 'bot_8',
    name: 'API copilot',
    description: 'Helps developers pick the right endpoint and payload.',
    status: 'active',
    model: 'gpt-4o',
    messages: 5390,
    updatedAt: daysAgo(13),
  },
  {
    id: 'bot_9',
    name: 'Careers assistant',
    description: 'Answers candidate questions about open roles.',
    status: 'draft',
    model: 'gpt-4o-mini',
    messages: 0,
    updatedAt: daysAgo(15),
  },
  {
    id: 'bot_10',
    name: 'Shipping tracker',
    description: 'Looks up delivery status from the order service.',
    status: 'active',
    model: 'llama-3.1-70b',
    messages: 9810,
    updatedAt: daysAgo(17),
  },
  {
    id: 'bot_11',
    name: 'Security FAQ',
    description: 'Explains SOC 2, data residency, and retention policies.',
    status: 'active',
    model: 'gpt-4o',
    messages: 4120,
    updatedAt: daysAgo(20),
  },
  {
    id: 'bot_12',
    name: 'Renewal reminder',
    description: 'Nudges owners before a subscription renews.',
    status: 'paused',
    model: 'gpt-4o-mini',
    messages: 2050,
    updatedAt: daysAgo(24),
  },
  {
    id: 'bot_13',
    name: 'Integration guide',
    description: 'Walks through connecting Slack, Teams, and HubSpot.',
    status: 'draft',
    model: 'claude-3.5-sonnet',
    messages: 0,
    updatedAt: daysAgo(28),
  },
  {
    id: 'bot_14',
    name: 'Feedback collector',
    description: 'Captures CSAT after a conversation is closed.',
    status: 'error',
    model: 'gpt-4o-mini',
    messages: 640,
    updatedAt: daysAgo(31),
  },
]

let chatbots: Chatbot[] = [...seed]

let sequence = seed.length

function nextId(): string {
  sequence += 1
  return `bot_${sequence}`
}

function matchesSearch(chatbot: Chatbot, search: string): boolean {
  const query = search.trim().toLowerCase()
  if (!query) {
    return true
  }

  return (
    chatbot.name.toLowerCase().includes(query) ||
    (chatbot.description ?? '').toLowerCase().includes(query)
  )
}

function compare(a: Chatbot, b: Chatbot, field: string): number {
  switch (field) {
    case 'name':
      return a.name.localeCompare(b.name)
    case 'messages':
      return a.messages - b.messages
    default:
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
  }
}

export async function mockListChatbots(params: ChatbotListParams): Promise<ChatbotListResult> {
  await delay()

  const page = params.page ?? 1
  const pageSize = params.pageSize ?? 10
  const status = (params.status ?? 'all') as ChatbotStatus | 'all'
  const search = params.search ?? ''
  const order = params.order ?? 'desc'

  let rows = chatbots.filter((chatbot) => matchesSearch(chatbot, search))

  if (status !== 'all') {
    rows = rows.filter((chatbot) => chatbot.status === status)
  }

  rows = [...rows].sort((a, b) => {
    const result = compare(a, b, params.sort ?? 'updatedAt')
    return order === 'asc' ? result : -result
  })

  const total = rows.length
  const start = (page - 1) * pageSize

  return {
    items: rows.slice(start, start + pageSize),
    total,
    page,
    pageSize,
  }
}

export async function mockCreateChatbot(input: ChatbotInput): Promise<Chatbot> {
  await delay()

  const chatbot: Chatbot = {
    id: nextId(),
    name: input.name,
    description: input.description,
    status: input.status,
    model: input.model,
    messages: 0,
    updatedAt: new Date().toISOString(),
  }

  chatbots = [chatbot, ...chatbots]
  return chatbot
}

export async function mockUpdateChatbot(id: string, input: ChatbotInput): Promise<Chatbot> {
  await delay()

  const existing = chatbots.find((chatbot) => chatbot.id === id)
  if (!existing) {
    throw new Error('That chatbot no longer exists.')
  }

  const updated: Chatbot = {
    ...existing,
    name: input.name,
    description: input.description,
    status: input.status,
    model: (input.model as ChatbotModel) ?? existing.model,
    updatedAt: new Date().toISOString(),
  }

  chatbots = chatbots.map((chatbot) => (chatbot.id === id ? updated : chatbot))
  return updated
}

export async function mockDeleteChatbot(id: string): Promise<void> {
  await delay()

  const exists = chatbots.some((chatbot) => chatbot.id === id)
  if (!exists) {
    throw new Error('That chatbot no longer exists.')
  }

  chatbots = chatbots.filter((chatbot) => chatbot.id !== id)
}
