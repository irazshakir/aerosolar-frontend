import type {
  Contact,
  ContactInput,
  ContactListParams,
  ContactListResult,
  ContactSource,
  ContactStatus,
} from '@/features/contacts/types'

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

const seed: Contact[] = [
  {
    id: 'contact_1',
    name: 'Imran Sheikh',
    email: 'imran@sunvoltenergy.pk',
    phone: '+92 300 1112233',
    company: 'SunVolt Energy',
    source: 'whatsapp',
    status: 'qualified',
    owner: 'Bilal Ahmed',
    tags: ['solar', 'hot lead'],
    notes: 'Wants a 25kW rooftop system for a warehouse.',
    lastContactedAt: daysAgo(0.2),
    createdAt: daysAgo(18),
  },
  {
    id: 'contact_2',
    name: 'Fatima Noor',
    email: 'fatima@noortextiles.pk',
    phone: '+92 321 4455667',
    company: 'Noor Textiles',
    source: 'messenger',
    status: 'new',
    owner: 'Ayesha Khan',
    tags: ['inbound'],
    lastContactedAt: daysAgo(0.8),
    createdAt: daysAgo(1),
  },
  {
    id: 'contact_3',
    name: 'Usman Ali',
    phone: '+92 333 7788990',
    company: 'Ali Traders',
    source: 'whatsapp',
    status: 'contacted',
    owner: 'Hassan Raza',
    tags: ['follow up'],
    notes: 'Asked for an installation timeline and financing options.',
    lastContactedAt: daysAgo(1.4),
    createdAt: daysAgo(9),
  },
  {
    id: 'contact_4',
    name: 'Zara Ahmed',
    email: 'zara@greengrid.pk',
    phone: '+92 345 2233445',
    company: 'GreenGrid Solutions',
    source: 'website',
    status: 'customer',
    owner: 'Sana Malik',
    tags: ['solar', 'referral'],
    notes: 'Signed a 40kW commercial contract in September.',
    lastContactedAt: daysAgo(2),
    createdAt: daysAgo(64),
  },
  {
    id: 'contact_5',
    name: 'Bilal Hussain',
    email: 'bilal@hussainsons.pk',
    company: 'Hussain & Sons',
    source: 'manual',
    status: 'lost',
    owner: 'Bilal Ahmed',
    tags: ['price sensitive'],
    notes: 'Postponed the project to next fiscal year.',
    lastContactedAt: daysAgo(21),
    createdAt: daysAgo(48),
  },
  {
    id: 'contact_6',
    name: 'Hina Raza',
    email: 'hina@razaelectronics.pk',
    phone: '+92 300 9988776',
    company: 'Raza Electronics',
    source: 'whatsapp',
    status: 'customer',
    owner: 'Ayesha Khan',
    tags: ['solar', 'upsell'],
    lastContactedAt: daysAgo(3.5),
    createdAt: daysAgo(92),
  },
  {
    id: 'contact_7',
    name: 'Adeel Anwar',
    email: 'adeel@anwarlogistics.pk',
    company: 'Anwar Logistics',
    source: 'messenger',
    status: 'contacted',
    owner: 'Hassan Raza',
    tags: ['fleet'],
    lastContactedAt: daysAgo(4),
    createdAt: daysAgo(12),
  },
  {
    id: 'contact_8',
    name: 'Maryam Siddiqui',
    email: 'maryam@siddiquiinteriors.pk',
    phone: '+92 322 5566778',
    company: 'Siddiqui Interiors',
    source: 'website',
    status: 'qualified',
    owner: 'Sana Malik',
    tags: ['design', 'hot lead'],
    lastContactedAt: daysAgo(5.2),
    createdAt: daysAgo(26),
  },
  {
    id: 'contact_9',
    name: 'Tariq Jameel',
    phone: '+92 301 3344556',
    company: 'Jameel Foods',
    source: 'whatsapp',
    status: 'new',
    owner: 'Bilal Ahmed',
    tags: ['cold storage'],
    lastContactedAt: daysAgo(6),
    createdAt: daysAgo(6),
  },
  {
    id: 'contact_10',
    name: 'Saba Qureshi',
    email: 'saba@qureshipharma.pk',
    phone: '+92 344 1122334',
    company: 'Qureshi Pharma',
    source: 'manual',
    status: 'contacted',
    owner: 'Ayesha Khan',
    tags: ['compliance'],
    lastContactedAt: daysAgo(8),
    createdAt: daysAgo(22),
  },
  {
    id: 'contact_11',
    name: 'Faisal Shah',
    email: 'faisal@shahbuilders.pk',
    company: 'Shah Builders',
    source: 'messenger',
    status: 'qualified',
    owner: 'Hassan Raza',
    tags: ['construction'],
    notes: 'Needs a proposal for three residential sites.',
    lastContactedAt: daysAgo(9.5),
    createdAt: daysAgo(31),
  },
  {
    id: 'contact_12',
    name: 'Nida Aslam',
    email: 'nida@aslamassociates.pk',
    company: 'Aslam Associates',
    source: 'website',
    status: 'lost',
    owner: 'Sana Malik',
    tags: ['budget'],
    notes: 'Went with a lower-cost supplier.',
    lastContactedAt: daysAgo(14),
    createdAt: daysAgo(57),
  },
]

let contacts: Contact[] = [...seed]

let sequence = seed.length

function nextId(): string {
  sequence += 1
  return `contact_${sequence}`
}

function matchesSearch(contact: Contact, search: string): boolean {
  const query = search.trim().toLowerCase()
  if (!query) {
    return true
  }

  return [contact.name, contact.email, contact.phone, contact.company, contact.tags.join(' ')]
    .filter(Boolean)
    .some((value) => (value as string).toLowerCase().includes(query))
}

function compare(a: Contact, b: Contact, field: string): number {
  switch (field) {
    case 'name':
      return a.name.localeCompare(b.name)
    case 'createdAt':
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    default:
      return new Date(a.lastContactedAt).getTime() - new Date(b.lastContactedAt).getTime()
  }
}

export async function mockListContacts(params: ContactListParams): Promise<ContactListResult> {
  await delay()

  const page = params.page ?? 1
  const pageSize = params.pageSize ?? 10
  const status = (params.status ?? 'all') as ContactStatus | 'all'
  const source = (params.source ?? 'all') as ContactSource | 'all'
  const search = params.search ?? ''
  const order = params.order ?? 'desc'

  let rows = contacts.filter((contact) => matchesSearch(contact, search))

  if (status !== 'all') {
    rows = rows.filter((contact) => contact.status === status)
  }

  if (source !== 'all') {
    rows = rows.filter((contact) => contact.source === source)
  }

  rows = [...rows].sort((a, b) => {
    const result = compare(a, b, params.sort ?? 'lastContactedAt')
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

export async function mockCreateContact(input: ContactInput): Promise<Contact> {
  await delay()

  const now = new Date().toISOString()
  const contact: Contact = {
    id: nextId(),
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    source: input.source,
    status: input.status,
    owner: input.owner,
    tags: [],
    notes: input.notes,
    lastContactedAt: now,
    createdAt: now,
  }

  contacts = [contact, ...contacts]
  return contact
}

export async function mockUpdateContact(id: string, input: ContactInput): Promise<Contact> {
  await delay()

  const existing = contacts.find((contact) => contact.id === id)
  if (!existing) {
    throw new Error('That contact no longer exists.')
  }

  const updated: Contact = {
    ...existing,
    name: input.name,
    email: input.email,
    phone: input.phone,
    company: input.company,
    source: input.source,
    status: input.status,
    owner: input.owner,
    notes: input.notes,
  }

  contacts = contacts.map((contact) => (contact.id === id ? updated : contact))
  return updated
}

export async function mockDeleteContact(id: string): Promise<void> {
  await delay()

  const exists = contacts.some((contact) => contact.id === id)
  if (!exists) {
    throw new Error('That contact no longer exists.')
  }

  contacts = contacts.filter((contact) => contact.id !== id)
}
