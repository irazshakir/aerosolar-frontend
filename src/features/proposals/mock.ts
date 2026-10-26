import type {
  Proposal,
  ProposalInput,
  ProposalListParams,
  ProposalListResult,
  ProposalStatus,
} from '@/features/proposals/types'

const MIN_LATENCY_MS = 300
const MAX_LATENCY_MS = 600

function delay(): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, MIN_LATENCY_MS + Math.random() * (MAX_LATENCY_MS - MIN_LATENCY_MS))
  })
}

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

const seed: Proposal[] = [
  {
    id: 'proposal_1',
    number: 'PROP-1042',
    title: '25kW warehouse solar system',
    clientName: 'Imran Sheikh',
    clientEmail: 'imran@sunvoltenergy.pk',
    amount: 18500,
    currency: 'USD',
    status: 'sent',
    validUntil: daysFromNow(14),
    notes: 'Includes panels, inverters, mounting, and installation.',
    createdAt: daysAgo(2),
    updatedAt: daysAgo(1),
  },
  {
    id: 'proposal_2',
    number: 'PROP-1041',
    title: 'WhatsApp automation rollout',
    clientName: 'Fatima Noor',
    clientEmail: 'fatima@noortextiles.pk',
    amount: 6400,
    currency: 'USD',
    status: 'accepted',
    validUntil: daysFromNow(7),
    createdAt: daysAgo(6),
    updatedAt: daysAgo(2),
  },
  {
    id: 'proposal_3',
    number: 'PROP-1040',
    title: 'Commercial rooftop — 40kW',
    clientName: 'Zara Ahmed',
    clientEmail: 'zara@greengrid.pk',
    amount: 32500,
    currency: 'USD',
    status: 'accepted',
    validUntil: daysFromNow(3),
    createdAt: daysAgo(14),
    updatedAt: daysAgo(5),
  },
  {
    id: 'proposal_4',
    number: 'PROP-1039',
    title: 'Home solar — 10kW',
    clientName: 'Usman Ali',
    clientEmail: 'usman.ali@example.com',
    amount: 2150000,
    currency: 'PKR',
    status: 'declined',
    validUntil: daysFromNow(-2),
    createdAt: daysAgo(20),
    updatedAt: daysAgo(8),
  },
  {
    id: 'proposal_5',
    number: 'PROP-1038',
    title: 'Retail chain energy audit',
    clientName: 'Adeel Anwar',
    clientEmail: 'adeel@anwarlogistics.pk',
    amount: 4200,
    currency: 'USD',
    status: 'sent',
    validUntil: daysFromNow(10),
    createdAt: daysAgo(4),
    updatedAt: daysAgo(1),
  },
  {
    id: 'proposal_6',
    number: 'PROP-1037',
    title: 'Cold storage solar — 60kW',
    clientName: 'Tariq Jameel',
    clientEmail: 'tariq@jameelfoods.pk',
    amount: 48000,
    currency: 'USD',
    status: 'draft',
    validUntil: daysFromNow(21),
    notes: 'Pending a site survey before final pricing.',
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  },
  {
    id: 'proposal_7',
    number: 'PROP-1036',
    title: 'Fleet charging feasibility',
    clientName: 'Adeel Anwar',
    clientEmail: 'adeel@anwarlogistics.pk',
    amount: 9600,
    currency: 'USD',
    status: 'expired',
    validUntil: daysFromNow(-10),
    createdAt: daysAgo(40),
    updatedAt: daysAgo(12),
  },
  {
    id: 'proposal_8',
    number: 'PROP-1035',
    title: 'Interior studio energy retrofit',
    clientName: 'Maryam Siddiqui',
    clientEmail: 'maryam@siddiquiinteriors.pk',
    amount: 5400,
    currency: 'USD',
    status: 'sent',
    validUntil: daysFromNow(5),
    createdAt: daysAgo(8),
    updatedAt: daysAgo(3),
  },
  {
    id: 'proposal_9',
    number: 'PROP-1034',
    title: 'Pharma warehouse backup',
    clientName: 'Saba Qureshi',
    clientEmail: 'saba@qureshipharma.pk',
    amount: 22000,
    currency: 'USD',
    status: 'draft',
    validUntil: daysFromNow(30),
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
  {
    id: 'proposal_10',
    number: 'PROP-1033',
    title: 'Residential sites — phase 1',
    clientName: 'Faisal Shah',
    clientEmail: 'faisal@shahbuilders.pk',
    amount: 12600,
    currency: 'USD',
    status: 'accepted',
    validUntil: daysFromNow(2),
    createdAt: daysAgo(24),
    updatedAt: daysAgo(7),
  },
]

let proposals: Proposal[] = [...seed]

let idSequence = seed.length
let numberSequence = 1042

function nextId(): string {
  idSequence += 1
  return `proposal_${idSequence}`
}

function nextNumber(): string {
  numberSequence += 1
  return `PROP-${numberSequence}`
}

function matchesSearch(proposal: Proposal, search: string): boolean {
  const query = search.trim().toLowerCase()
  if (!query) {
    return true
  }

  return [proposal.number, proposal.title, proposal.clientName, proposal.clientEmail].some(
    (value) => value.toLowerCase().includes(query),
  )
}

function compare(a: Proposal, b: Proposal, field: string): number {
  switch (field) {
    case 'title':
      return a.title.localeCompare(b.title)
    case 'amount':
      return a.amount - b.amount
    case 'validUntil':
      return new Date(a.validUntil).getTime() - new Date(b.validUntil).getTime()
    default:
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  }
}

export async function mockListProposals(
  params: ProposalListParams,
): Promise<ProposalListResult> {
  await delay()

  const page = params.page ?? 1
  const pageSize = params.pageSize ?? 10
  const status = (params.status ?? 'all') as ProposalStatus | 'all'
  const search = params.search ?? ''
  const order = params.order ?? 'desc'

  let rows = proposals.filter((proposal) => matchesSearch(proposal, search))

  if (status !== 'all') {
    rows = rows.filter((proposal) => proposal.status === status)
  }

  rows = [...rows].sort((a, b) => {
    const result = compare(a, b, params.sort ?? 'createdAt')
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

export async function mockCreateProposal(input: ProposalInput): Promise<Proposal> {
  await delay()

  const now = new Date().toISOString()
  const proposal: Proposal = {
    id: nextId(),
    number: nextNumber(),
    title: input.title,
    clientName: input.clientName,
    clientEmail: input.clientEmail,
    amount: input.amount,
    currency: input.currency,
    status: input.status,
    validUntil: input.validUntil,
    notes: input.notes,
    createdAt: now,
    updatedAt: now,
  }

  proposals = [proposal, ...proposals]
  return proposal
}

export async function mockUpdateProposal(
  id: string,
  input: ProposalInput,
): Promise<Proposal> {
  await delay()

  const existing = proposals.find((proposal) => proposal.id === id)
  if (!existing) {
    throw new Error('That proposal no longer exists.')
  }

  const updated: Proposal = {
    ...existing,
    title: input.title,
    clientName: input.clientName,
    clientEmail: input.clientEmail,
    amount: input.amount,
    currency: input.currency,
    status: input.status,
    validUntil: input.validUntil,
    notes: input.notes,
    updatedAt: new Date().toISOString(),
  }

  proposals = proposals.map((proposal) => (proposal.id === id ? updated : proposal))
  return updated
}

export async function mockSendProposal(id: string): Promise<Proposal> {
  await delay()

  const existing = proposals.find((proposal) => proposal.id === id)
  if (!existing) {
    throw new Error('That proposal no longer exists.')
  }

  const updated: Proposal = {
    ...existing,
    status: 'sent',
    updatedAt: new Date().toISOString(),
  }

  proposals = proposals.map((proposal) => (proposal.id === id ? updated : proposal))
  return updated
}

export async function mockDeleteProposal(id: string): Promise<void> {
  await delay()

  const exists = proposals.some((proposal) => proposal.id === id)
  if (!exists) {
    throw new Error('That proposal no longer exists.')
  }

  proposals = proposals.filter((proposal) => proposal.id !== id)
}
