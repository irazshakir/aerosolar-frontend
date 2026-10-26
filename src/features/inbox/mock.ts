import type {
  Conversation,
  Message,
  SendMessageInput,
} from '@/features/inbox/types'

const MIN_LATENCY_MS = 300
const MAX_LATENCY_MS = 600

function delay(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS))
  })
}

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60 * 1000).toISOString()
}

function hoursAgo(hours: number): string {
  return minutesAgo(hours * 60)
}

let conversations: Conversation[] = [
  {
    id: 'conv_1',
    contactName: 'Imran Sheikh',
    contactHandle: '+92 300 1112233',
    channel: 'whatsapp',
    status: 'open',
    assignee: 'Bilal Ahmed',
    unreadCount: 1,
    lastMessage: 'Can you share the proposal for the 25kW warehouse?',
    updatedAt: minutesAgo(3),
  },
  {
    id: 'conv_2',
    contactName: 'Fatima Noor',
    contactHandle: 'fatima.noor',
    channel: 'messenger',
    status: 'pending',
    assignee: 'Ayesha Khan',
    unreadCount: 0,
    lastMessage: "Thanks, I'll review the quote today.",
    updatedAt: minutesAgo(35),
  },
  {
    id: 'conv_3',
    contactName: 'Usman Ali',
    contactHandle: '+92 333 7788990',
    channel: 'whatsapp',
    status: 'open',
    assignee: 'Hassan Raza',
    unreadCount: 2,
    lastMessage: 'Can we schedule the survey this week?',
    updatedAt: minutesAgo(12),
  },
  {
    id: 'conv_4',
    contactName: 'Zara Ahmed',
    contactHandle: 'zara.ahmed',
    channel: 'messenger',
    status: 'closed',
    assignee: 'Sana Malik',
    unreadCount: 0,
    lastMessage: 'Invoice received, thank you.',
    updatedAt: hoursAgo(26),
  },
  {
    id: 'conv_5',
    contactName: 'Tariq Jameel',
    contactHandle: '+92 301 3344556',
    channel: 'whatsapp',
    status: 'open',
    assignee: 'Bilal Ahmed',
    unreadCount: 1,
    lastMessage: 'Do you offer installment plans?',
    updatedAt: hoursAgo(2),
  },
  {
    id: 'conv_6',
    contactName: 'Nida Aslam',
    contactHandle: 'nida.aslam',
    channel: 'messenger',
    status: 'closed',
    assignee: 'Sana Malik',
    unreadCount: 0,
    lastMessage: 'Not right now, maybe next quarter.',
    updatedAt: hoursAgo(52),
  },
]

let messages: Record<string, Message[]> = {
  conv_1: [
    {
      id: 'msg_1',
      conversationId: 'conv_1',
      direction: 'inbound',
      author: 'Imran Sheikh',
      body: 'Hi, I saw your solar package on Facebook.',
      createdAt: minutesAgo(70),
    },
    {
      id: 'msg_2',
      conversationId: 'conv_1',
      direction: 'outbound',
      author: 'Bilal Ahmed',
      body: 'Hi Imran! Happy to help. What size system are you considering?',
      createdAt: minutesAgo(66),
    },
    {
      id: 'msg_3',
      conversationId: 'conv_1',
      direction: 'inbound',
      author: 'Imran Sheikh',
      body: 'Around 25kW for our warehouse in Korangi.',
      createdAt: minutesAgo(61),
    },
    {
      id: 'msg_4',
      conversationId: 'conv_1',
      direction: 'outbound',
      author: 'Bilal Ahmed',
      body: 'Got it. A recent electricity bill would help us size it accurately.',
      createdAt: minutesAgo(22),
    },
    {
      id: 'msg_5',
      conversationId: 'conv_1',
      direction: 'inbound',
      author: 'Imran Sheikh',
      body: 'Can you share the proposal for the 25kW warehouse?',
      createdAt: minutesAgo(3),
    },
  ],
  conv_2: [
    {
      id: 'msg_6',
      conversationId: 'conv_2',
      direction: 'inbound',
      author: 'Fatima Noor',
      body: 'Hi, is the commercial package still available?',
      createdAt: hoursAgo(3),
    },
    {
      id: 'msg_7',
      conversationId: 'conv_2',
      direction: 'outbound',
      author: 'Ayesha Khan',
      body: "Yes. I've attached the latest quote for the 15kW system.",
      createdAt: hoursAgo(2.6),
    },
    {
      id: 'msg_8',
      conversationId: 'conv_2',
      direction: 'inbound',
      author: 'Fatima Noor',
      body: "Thanks, I'll review the quote today.",
      createdAt: minutesAgo(35),
    },
  ],
  conv_3: [
    {
      id: 'msg_9',
      conversationId: 'conv_3',
      direction: 'inbound',
      author: 'Usman Ali',
      body: "Hello, what's the installation timeline for a 10kW system?",
      createdAt: minutesAgo(50),
    },
    {
      id: 'msg_10',
      conversationId: 'conv_3',
      direction: 'outbound',
      author: 'Hassan Raza',
      body: 'Typically 2-3 weeks after the site survey.',
      createdAt: minutesAgo(40),
    },
    {
      id: 'msg_11',
      conversationId: 'conv_3',
      direction: 'inbound',
      author: 'Usman Ali',
      body: 'And what warranty do the inverters carry?',
      createdAt: minutesAgo(30),
    },
    {
      id: 'msg_12',
      conversationId: 'conv_3',
      direction: 'inbound',
      author: 'Usman Ali',
      body: 'Can we schedule the survey this week?',
      createdAt: minutesAgo(12),
    },
  ],
  conv_4: [
    {
      id: 'msg_13',
      conversationId: 'conv_4',
      direction: 'outbound',
      author: 'Sana Malik',
      body: 'Invoice INV-2048 has been emailed to you.',
      createdAt: hoursAgo(30),
    },
    {
      id: 'msg_14',
      conversationId: 'conv_4',
      direction: 'inbound',
      author: 'Zara Ahmed',
      body: 'Invoice received, thank you.',
      createdAt: hoursAgo(26),
    },
  ],
  conv_5: [
    {
      id: 'msg_15',
      conversationId: 'conv_5',
      direction: 'inbound',
      author: 'Tariq Jameel',
      body: "Hi, I'm interested in a 5kW home system.",
      createdAt: hoursAgo(4),
    },
    {
      id: 'msg_16',
      conversationId: 'conv_5',
      direction: 'outbound',
      author: 'Bilal Ahmed',
      body: 'Happy to help. Our 5kW package starts at $3,200 installed.',
      createdAt: hoursAgo(3.5),
    },
    {
      id: 'msg_17',
      conversationId: 'conv_5',
      direction: 'inbound',
      author: 'Tariq Jameel',
      body: 'Do you offer installment plans?',
      createdAt: hoursAgo(2),
    },
  ],
  conv_6: [
    {
      id: 'msg_18',
      conversationId: 'conv_6',
      direction: 'outbound',
      author: 'Sana Malik',
      body: 'Following up on the proposal we sent last month.',
      createdAt: hoursAgo(60),
    },
    {
      id: 'msg_19',
      conversationId: 'conv_6',
      direction: 'inbound',
      author: 'Nida Aslam',
      body: 'Not right now, maybe next quarter.',
      createdAt: hoursAgo(52),
    },
  ],
}

let sequence = 19

function nextMessageId(): string {
  sequence += 1
  return `msg_${sequence}`
}

function findConversation(id: string): Conversation {
  const conversation = conversations.find((item) => item.id === id)
  if (!conversation) {
    throw new Error('That conversation no longer exists.')
  }
  return conversation
}

export async function mockFetchConversations(): Promise<Conversation[]> {
  await delay()

  return [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  )
}

export async function mockFetchConversationMessages(
  conversationId: string,
): Promise<Message[]> {
  await delay()

  findConversation(conversationId)
  return [...(messages[conversationId] ?? [])].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  )
}

export async function mockSendMessage(input: SendMessageInput): Promise<Message> {
  await delay()

  const conversation = findConversation(input.conversationId)
  const message: Message = {
    id: nextMessageId(),
    conversationId: input.conversationId,
    direction: 'outbound',
    author: 'You',
    body: input.body,
    createdAt: new Date().toISOString(),
  }

  messages = {
    ...messages,
    [input.conversationId]: [...(messages[input.conversationId] ?? []), message],
  }

  conversations = conversations.map((item) =>
    item.id === conversation.id
      ? {
          ...item,
          lastMessage: input.body,
          updatedAt: message.createdAt,
          unreadCount: 0,
        }
      : item,
  )

  return message
}

export async function mockMarkConversationRead(conversationId: string): Promise<Conversation> {
  await delay()

  const conversation = findConversation(conversationId)
  const updated: Conversation = { ...conversation, unreadCount: 0 }

  conversations = conversations.map((item) => (item.id === conversationId ? updated : item))
  return updated
}
