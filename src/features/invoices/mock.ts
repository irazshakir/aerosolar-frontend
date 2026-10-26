import type {
  Invoice,
  InvoiceInput,
  InvoiceListParams,
  InvoiceListResult,
  InvoiceStatus,
} from '@/features/invoices/types'

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

function dateDaysAgo(days: number): string {
  return daysAgo(days).slice(0, 10)
}

function dateDaysFromNow(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
}

const seed: Invoice[] = [
  {
    id: 'invoice_1',
    number: 'INV-2048',
    clientName: 'Zara Ahmed',
    clientEmail: 'zara@greengrid.pk',
    amount: 8200,
    currency: 'USD',
    issueDate: dateDaysAgo(40),
    dueDate: dateDaysAgo(26),
    status: 'paid',
    notes: '40kW commercial rooftop — milestone 1.',
    createdAt: daysAgo(40),
    updatedAt: daysAgo(24),
  },
  {
    id: 'invoice_2',
    number: 'INV-2049',
    clientName: 'Hina Raza',
    clientEmail: 'hina@razaelectronics.pk',
    amount: 4500,
    currency: 'USD',
    issueDate: dateDaysAgo(30),
    dueDate: dateDaysAgo(16),
    status: 'paid',
    createdAt: daysAgo(30),
    updatedAt: daysAgo(14),
  },
  {
    id: 'invoice_3',
    number: 'INV-2050',
    clientName: 'Imran Sheikh',
    clientEmail: 'imran@sunvoltenergy.pk',
    amount: 12500,
    currency: 'USD',
    issueDate: dateDaysAgo(10),
    dueDate: dateDaysFromNow(4),
    status: 'sent',
    notes: '25kW warehouse installation — 50% advance.',
    createdAt: daysAgo(10),
    updatedAt: daysAgo(10),
  },
  {
    id: 'invoice_4',
    number: 'INV-2051',
    clientName: 'Fatima Noor',
    clientEmail: 'fatima@noortextiles.pk',
    amount: 3200,
    currency: 'USD',
    issueDate: dateDaysAgo(7),
    dueDate: dateDaysFromNow(7),
    status: 'sent',
    createdAt: daysAgo(7),
    updatedAt: daysAgo(7),
  },
  {
    id: 'invoice_5',
    number: 'INV-2052',
    clientName: 'Usman Ali',
    clientEmail: 'usman.ali@example.com',
    amount: 185000,
    currency: 'PKR',
    issueDate: dateDaysAgo(45),
    dueDate: dateDaysAgo(15),
    status: 'overdue',
    createdAt: daysAgo(45),
    updatedAt: daysAgo(20),
  },
  {
    id: 'invoice_6',
    number: 'INV-2053',
    clientName: 'Adeel Anwar',
    clientEmail: 'adeel@anwarlogistics.pk',
    amount: 5600,
    currency: 'USD',
    issueDate: dateDaysAgo(50),
    dueDate: dateDaysAgo(20),
    status: 'overdue',
    createdAt: daysAgo(50),
    updatedAt: daysAgo(25),
  },
  {
    id: 'invoice_7',
    number: 'INV-2054',
    clientName: 'Maryam Siddiqui',
    clientEmail: 'maryam@siddiquiinteriors.pk',
    amount: 2700,
    currency: 'USD',
    issueDate: dateDaysAgo(0),
    dueDate: dateDaysFromNow(14),
    status: 'draft',
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'invoice_8',
    number: 'INV-2055',
    clientName: 'Tariq Jameel',
    clientEmail: 'tariq@jameelfoods.pk',
    amount: 9800,
    currency: 'USD',
    issueDate: dateDaysAgo(3),
    dueDate: dateDaysFromNow(11),
    status: 'sent',
    createdAt: daysAgo(3),
    updatedAt: daysAgo(3),
  },
  {
    id: 'invoice_9',
    number: 'INV-2056',
    clientName: 'Saba Qureshi',
    clientEmail: 'saba@qureshipharma.pk',
    amount: 6200,
    currency: 'USD',
    issueDate: dateDaysAgo(0),
    dueDate: dateDaysFromNow(30),
    status: 'draft',
    createdAt: daysAgo(0),
    updatedAt: daysAgo(0),
  },
  {
    id: 'invoice_10',
    number: 'INV-2057',
    clientName: 'Faisal Shah',
    clientEmail: 'faisal@shahbuilders.pk',
    amount: 14400,
    currency: 'USD',
    issueDate: dateDaysAgo(60),
    dueDate: dateDaysAgo(46),
    status: 'paid',
    createdAt: daysAgo(60),
    updatedAt: daysAgo(44),
  },
  {
    id: 'invoice_11',
    number: 'INV-2058',
    clientName: 'Nida Aslam',
    clientEmail: 'nida@aslamassociates.pk',
    amount: 1200,
    currency: 'USD',
    issueDate: dateDaysAgo(25),
    dueDate: dateDaysAgo(11),
    status: 'void',
    notes: 'Cancelled after the scope was withdrawn.',
    createdAt: daysAgo(25),
    updatedAt: daysAgo(18),
  },
  {
    id: 'invoice_12',
    number: 'INV-2059',
    clientName: 'Bilal Hussain',
    clientEmail: 'bilal@hussainsons.pk',
    amount: 8900,
    currency: 'USD',
    issueDate: dateDaysAgo(5),
    dueDate: dateDaysFromNow(9),
    status: 'sent',
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
  },
]

let invoices: Invoice[] = [...seed]

let idSequence = seed.length
let numberSequence = 2059

function nextId(): string {
  idSequence += 1
  return `invoice_${idSequence}`
}

function nextNumber(): string {
  numberSequence += 1
  return `INV-${numberSequence}`
}

function matchesSearch(invoice: Invoice, search: string): boolean {
  const query = search.trim().toLowerCase()
  if (!query) {
    return true
  }

  return [invoice.number, invoice.clientName, invoice.clientEmail].some((value) =>
    value.toLowerCase().includes(query),
  )
}

function compare(a: Invoice, b: Invoice, field: string): number {
  switch (field) {
    case 'amount':
      return a.amount - b.amount
    case 'issueDate':
      return new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime()
    case 'dueDate':
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    default:
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  }
}

export async function mockListInvoices(params: InvoiceListParams): Promise<InvoiceListResult> {
  await delay()

  const page = params.page ?? 1
  const pageSize = params.pageSize ?? 10
  const status = (params.status ?? 'all') as InvoiceStatus | 'all'
  const search = params.search ?? ''
  const order = params.order ?? 'desc'

  let rows = invoices.filter((invoice) => matchesSearch(invoice, search))

  if (status !== 'all') {
    rows = rows.filter((invoice) => invoice.status === status)
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

export async function mockCreateInvoice(input: InvoiceInput): Promise<Invoice> {
  await delay()

  const now = new Date().toISOString()
  const invoice: Invoice = {
    id: nextId(),
    number: nextNumber(),
    clientName: input.clientName,
    clientEmail: input.clientEmail,
    amount: input.amount,
    currency: input.currency,
    issueDate: input.issueDate,
    dueDate: input.dueDate,
    status: input.status,
    notes: input.notes,
    createdAt: now,
    updatedAt: now,
  }

  invoices = [invoice, ...invoices]
  return invoice
}

export async function mockUpdateInvoice(id: string, input: InvoiceInput): Promise<Invoice> {
  await delay()

  const existing = invoices.find((invoice) => invoice.id === id)
  if (!existing) {
    throw new Error('That invoice no longer exists.')
  }

  const updated: Invoice = {
    ...existing,
    clientName: input.clientName,
    clientEmail: input.clientEmail,
    amount: input.amount,
    currency: input.currency,
    issueDate: input.issueDate,
    dueDate: input.dueDate,
    status: input.status,
    notes: input.notes,
    updatedAt: new Date().toISOString(),
  }

  invoices = invoices.map((invoice) => (invoice.id === id ? updated : invoice))
  return updated
}

export async function mockMarkInvoicePaid(id: string): Promise<Invoice> {
  await delay()

  const existing = invoices.find((invoice) => invoice.id === id)
  if (!existing) {
    throw new Error('That invoice no longer exists.')
  }

  const updated: Invoice = {
    ...existing,
    status: 'paid',
    updatedAt: new Date().toISOString(),
  }

  invoices = invoices.map((invoice) => (invoice.id === id ? updated : invoice))
  return updated
}

export async function mockDeleteInvoice(id: string): Promise<void> {
  await delay()

  const exists = invoices.some((invoice) => invoice.id === id)
  if (!exists) {
    throw new Error('That invoice no longer exists.')
  }

  invoices = invoices.filter((invoice) => invoice.id !== id)
}
