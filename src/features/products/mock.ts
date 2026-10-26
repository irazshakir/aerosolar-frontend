import {
  describeBattery,
  describeInverter,
  describePanel,
  describeService,
  serviceCategoryLabel,
} from '@/features/products/catalog'
import type {
  Product,
  ProductCategory,
  ProductInput,
  ProductListParams,
  ProductListResult,
  ProductStatus,
} from '@/features/products/types'

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

const seed: Product[] = [
  // Panels
  {
    id: 'product_1',
    category: 'panels',
    name: 'Tiger Neo 580 W',
    sku: 'JKO-TN-580',
    brand: 'Jinko Solar',
    spec: '580 W · N-type TOPCon',
    unitPrice: 148,
    buyPrice: 121,
    stock: 240,
    status: 'active',
    ratedPower: 580,
    panel: {
      cellTechnology: 'N-type TOPCon',
      panelType: 'bifacial',
      efficiency: 22.5,
      dimensions: '2278 × 1134 × 35 mm',
      weight: 32.5,
      manufacturingCountry: 'China',
      voc: 51.2,
      vmp: 43.1,
      isc: 14.2,
      imp: 13.5,
      warranty: '12-year product / 30-year performance',
      datasheetUrl: 'https://example.com/datasheets/jinko-tiger-neo-580.pdf',
    },
    updatedAt: daysAgo(1),
  },
  {
    id: 'product_2',
    category: 'panels',
    name: 'Hi-MO 6 555 W',
    sku: 'LON-HM6-555',
    brand: 'Longi',
    spec: '555 W · HPBC mono',
    unitPrice: 126,
    buyPrice: 102,
    stock: 180,
    status: 'active',
    ratedPower: 555,
    updatedAt: daysAgo(3),
  },
  {
    id: 'product_3',
    category: 'panels',
    name: 'Vertex S+ 445 W',
    sku: 'TRN-VS445',
    brand: 'Trina Solar',
    spec: '445 W · N-type dual glass',
    unitPrice: 112,
    buyPrice: 92,
    stock: 96,
    status: 'active',
    ratedPower: 445,
    updatedAt: daysAgo(6),
  },
  {
    id: 'product_4',
    category: 'panels',
    name: 'TOPHiKu6 610 W',
    sku: 'CS-610MS',
    brand: 'Canadian Solar',
    spec: '610 W · bifacial',
    unitPrice: 165,
    buyPrice: 138,
    stock: 0,
    status: 'inactive',
    ratedPower: 610,
    updatedAt: daysAgo(12),
  },
  {
    id: 'product_5',
    category: 'panels',
    name: 'DeepBlue 4.0 545 W',
    sku: 'JA-DB545',
    brand: 'JA Solar',
    spec: '545 W · mono PERC',
    unitPrice: 118,
    buyPrice: 96,
    stock: 320,
    status: 'active',
    ratedPower: 545,
    updatedAt: daysAgo(9),
  },

  // Inverters
  {
    id: 'product_6',
    category: 'inverters',
    name: 'SUN2000 10KTL',
    sku: 'HUA-10KTL',
    brand: 'Huawei',
    spec: '10 kW · three-phase hybrid',
    unitPrice: 1450,
    stock: 14,
    status: 'active',
    inverter: {
      ratedOutputPower: 10,
      inverterType: 'hybrid',
      phaseType: 'three-phase',
      maxPvInputPower: 15,
      maxPvInputVoltage: 1100,
      mpptVoltageMin: 200,
      mpptVoltageMax: 1000,
      mpptCount: 2,
      maxPvInputCurrent: 30,
      batteryCompatible: true,
      batteryChemistries: ['lfp', 'lithium-ion'],
      batteryVoltageMin: 600,
      batteryVoltageMax: 980,
      maxChargingPower: 15,
      maxDischargingPower: 10,
      peakEfficiency: 98.4,
      ipRating: 'ip66',
      parallelCapable: true,
      warrantyYears: 10,
      manufacturingCountry: 'China',
      datasheetUrl: 'https://example.com/datasheets/huawei-sun2000-10ktl.pdf',
      description: 'Three-phase hybrid inverter with backup-ready battery input.',
    },
    updatedAt: daysAgo(2),
  },
  {
    id: 'product_7',
    category: 'inverters',
    name: 'MOD 6000TL3-X',
    sku: 'GRW-6KTL',
    brand: 'Growatt',
    spec: '6 kW · three-phase',
    unitPrice: 860,
    stock: 22,
    status: 'active',
    inverter: {
      ratedOutputPower: 6,
      inverterType: 'on-grid',
      phaseType: 'three-phase',
      maxPvInputPower: 9,
      maxPvInputVoltage: 1100,
      mpptVoltageMin: 160,
      mpptVoltageMax: 1000,
      mpptCount: 2,
      maxPvInputCurrent: 16,
      batteryCompatible: false,
      peakEfficiency: 98.1,
      ipRating: 'ip66',
      parallelCapable: false,
      warrantyYears: 5,
      manufacturingCountry: 'China',
    },
    updatedAt: daysAgo(5),
  },
  {
    id: 'product_8',
    category: 'inverters',
    name: 'S6-GR1P5K',
    sku: 'SOL-5K',
    brand: 'Solis',
    spec: '5 kW · single-phase',
    unitPrice: 640,
    stock: 8,
    status: 'active',
    inverter: {
      ratedOutputPower: 5,
      inverterType: 'on-grid',
      phaseType: 'single-phase',
      maxPvInputPower: 7.5,
      maxPvInputVoltage: 600,
      mpptVoltageMin: 90,
      mpptVoltageMax: 520,
      mpptCount: 2,
      maxPvInputCurrent: 16,
      batteryCompatible: false,
      peakEfficiency: 97.6,
      ipRating: 'ip65',
      warrantyYears: 5,
      manufacturingCountry: 'China',
    },
    updatedAt: daysAgo(7),
  },
  {
    id: 'product_9',
    category: 'inverters',
    name: 'SH10RT hybrid',
    sku: 'SUN-SH10RT',
    brand: 'Sungrow',
    spec: '10 kW · hybrid backup',
    unitPrice: 1620,
    stock: 5,
    status: 'active',
    inverter: {
      ratedOutputPower: 10,
      inverterType: 'hybrid',
      phaseType: 'three-phase',
      maxPvInputPower: 15,
      maxPvInputVoltage: 1000,
      mpptVoltageMin: 180,
      mpptVoltageMax: 950,
      mpptCount: 2,
      maxPvInputCurrent: 30,
      batteryCompatible: true,
      batteryChemistries: ['lfp'],
      batteryVoltageMin: 320,
      batteryVoltageMax: 800,
      maxChargingPower: 10,
      maxDischargingPower: 10,
      peakEfficiency: 98.2,
      ipRating: 'ip65',
      parallelCapable: false,
      warrantyYears: 10,
      manufacturingCountry: 'China',
    },
    updatedAt: daysAgo(11),
  },
  {
    id: 'product_10',
    category: 'inverters',
    name: 'GW5000-ES',
    sku: 'GDW-5KES',
    brand: 'GoodWe',
    spec: '5 kW · hybrid',
    unitPrice: 980,
    stock: 0,
    status: 'paused',
    inverter: {
      ratedOutputPower: 5,
      inverterType: 'hybrid',
      phaseType: 'single-phase',
      maxPvInputPower: 7.5,
      maxPvInputVoltage: 600,
      mpptCount: 2,
      maxPvInputCurrent: 16,
      batteryCompatible: true,
      batteryChemistries: ['lfp', 'lead-acid'],
      batteryVoltageMin: 40,
      batteryVoltageMax: 60,
      maxChargingPower: 5,
      maxDischargingPower: 5,
      peakEfficiency: 97.8,
      ipRating: 'ip65',
      warrantyYears: 5,
      manufacturingCountry: 'China',
      description: 'Single-phase hybrid with a generator input for backup.',
    },
    updatedAt: daysAgo(20),
  },

  // Batteries
  {
    id: 'product_11',
    category: 'batteries',
    name: 'US5000 48 V',
    sku: 'PYL-US5000',
    brand: 'Pylontech',
    spec: '4.8 kWh · 48 V · LiFePO₄ (LFP)',
    unitPrice: 1290,
    stock: 30,
    status: 'active',
    battery: {
      chemistry: 'lfp',
      nominalCapacity: 4.8,
      nominalVoltage: 48,
      usableCapacity: 4.56,
      cycleLife: 6000,
      batteryType: 'rack-mounted',
      communicationProtocols: ['can', 'rs485'],
      expandable: true,
      maxExpandableUnits: 16,
      warrantyYears: 10,
      manufacturingCountry: 'China',
    },
    updatedAt: daysAgo(1),
  },
  {
    id: 'product_12',
    category: 'batteries',
    name: '48NPFC100',
    sku: 'NAR-100AH',
    brand: 'Narada',
    spec: '4.8 kWh · 48 V · LiFePO₄ (LFP)',
    unitPrice: 1120,
    stock: 18,
    status: 'active',
    battery: {
      chemistry: 'lfp',
      nominalCapacity: 4.8,
      nominalVoltage: 48,
      batteryType: 'rack-mounted',
      cycleLife: 6000,
      expandable: true,
      maxExpandableUnits: 8,
      warrantyYears: 10,
      manufacturingCountry: 'China',
    },
    updatedAt: daysAgo(4),
  },
  {
    id: 'product_13',
    category: 'batteries',
    name: '51.2 V 100 Ah wall mount',
    sku: 'OSW-51100',
    brand: 'OSW',
    spec: '5.1 kWh · 51.2 V · LiFePO₄ (LFP)',
    unitPrice: 1050,
    stock: 12,
    status: 'active',
    battery: {
      chemistry: 'lfp',
      nominalCapacity: 5.1,
      nominalVoltage: 51.2,
      batteryType: 'wall-mounted',
      expandable: true,
      maxExpandableUnits: 4,
      warrantyYears: 10,
      manufacturingCountry: 'China',
    },
    updatedAt: daysAgo(8),
  },
  {
    id: 'product_14',
    category: 'batteries',
    name: 'Tubular 200 Ah',
    sku: 'PHX-T200',
    brand: 'Phoenix',
    spec: '2.4 kWh · 12 V · Lead-acid',
    unitPrice: 380,
    stock: 40,
    status: 'active',
    battery: {
      chemistry: 'lead-acid',
      nominalCapacity: 2.4,
      nominalVoltage: 12,
      depthOfDischarge: 50,
      batteryType: 'floor-standing',
      expandable: true,
      maxExpandableUnits: 6,
      warrantyYears: 3,
      manufacturingCountry: 'China',
    },
    updatedAt: daysAgo(15),
  },
  {
    id: 'product_15',
    category: 'batteries',
    name: '48 V 50 Ah compact',
    sku: 'AMP-4850',
    brand: 'Ampinvt',
    spec: '2.4 kWh · 48 V · LiFePO₄ (LFP)',
    unitPrice: 620,
    stock: 6,
    status: 'draft',
    battery: {
      chemistry: 'lfp',
      nominalCapacity: 2.4,
      nominalVoltage: 48,
      batteryType: 'wall-mounted',
      expandable: false,
      warrantyYears: 5,
      manufacturingCountry: 'China',
    },
    updatedAt: daysAgo(18),
  },

  // Services
  {
    id: 'product_16',
    category: 'services',
    name: 'Rooftop installation',
    sku: 'SRV-INST-10',
    brand: 'AeroSolar crew',
    spec: 'Residential · Per kW',
    unitPrice: 420,
    stock: 0,
    status: 'active',
    serviceCategory: 'installation',
    serviceSubcategory: 'residential',
    pricingType: 'per-kw',
    service: {
      description:
        'Full rooftop installation for homes, including mounting, DC/AC wiring, and commissioning.',
      customerTypes: ['residential'],
      systemTypes: ['on-grid', 'hybrid'],
      minSystemCapacity: 3,
      maxSystemCapacity: 25,
      serviceAreas: ['Lahore', 'Islamabad', 'Rawalpindi'],
      estimatedDuration: 3,
      durationUnit: 'days',
      warranty: 12,
      warrantyUnit: 'months',
      additionalTerms: 'Structure and panels are billed separately from the install labour.',
    },
    updatedAt: daysAgo(2),
  },
  {
    id: 'product_17',
    category: 'services',
    name: 'Commercial site survey',
    sku: 'SRV-SURVEY',
    brand: 'AeroSolar crew',
    spec: 'Site Inspection · Per Visit',
    unitPrice: 150,
    stock: 0,
    status: 'active',
    serviceCategory: 'site-survey',
    serviceSubcategory: 'site-inspection',
    pricingType: 'per-visit',
    service: {
      description: 'On-site inspection with roof measurements, shading study, and a written report.',
      customerTypes: ['commercial', 'industrial'],
      serviceAreas: ['Karachi', 'Lahore', 'Faisalabad'],
      estimatedDuration: 4,
      durationUnit: 'hours',
    },
    updatedAt: daysAgo(5),
  },
  {
    id: 'product_18',
    category: 'services',
    name: 'Annual maintenance contract',
    sku: 'SRV-AMC',
    brand: 'Certified partner',
    spec: 'Annual Maintenance Contract (AMC) · Fixed Price',
    unitPrice: 210,
    stock: 0,
    status: 'active',
    serviceCategory: 'maintenance',
    serviceSubcategory: 'annual-maintenance-contract',
    pricingType: 'fixed-price',
    service: {
      description: 'Quarterly preventive visits covering cleaning, torque checks, and a health report.',
      customerTypes: ['residential', 'commercial'],
      systemTypes: ['on-grid', 'hybrid', 'off-grid'],
      serviceAreas: ['Lahore', 'Multan', 'Sialkot'],
      estimatedDuration: 2,
      durationUnit: 'days',
      warranty: 6,
      warrantyUnit: 'months',
    },
    updatedAt: daysAgo(10),
  },
  {
    id: 'product_19',
    category: 'services',
    name: 'System health audit',
    sku: 'SRV-AUDIT',
    brand: 'Certified partner',
    spec: 'Performance Analysis · Fixed Price',
    unitPrice: 260,
    stock: 0,
    status: 'inactive',
    serviceCategory: 'monitoring',
    serviceSubcategory: 'performance-analysis',
    pricingType: 'fixed-price',
    service: {
      description: 'Thermal scan plus a twelve-month performance review of the installed system.',
      customerTypes: ['commercial', 'industrial'],
      minSystemCapacity: 10,
      maxSystemCapacity: 100,
      estimatedDuration: 1,
      durationUnit: 'days',
    },
    updatedAt: daysAgo(14),
  },
  {
    id: 'product_20',
    category: 'services',
    name: 'Emergency call-out',
    sku: 'SRV-CALL',
    brand: 'AeroSolar crew',
    spec: 'System Troubleshooting · Per Visit',
    unitPrice: 95,
    stock: 0,
    status: 'inactive',
    serviceCategory: 'repair',
    serviceSubcategory: 'system-troubleshooting',
    pricingType: 'per-visit',
    service: {
      description: 'Same-day fault finding for a system that has stopped producing or reporting.',
      customerTypes: ['residential', 'commercial'],
      systemTypes: ['on-grid', 'hybrid'],
      serviceAreas: ['Lahore', 'Islamabad'],
      estimatedDuration: 3,
      durationUnit: 'hours',
      additionalTerms: 'Parts are quoted after diagnosis and are not included in the call-out fee.',
    },
    updatedAt: daysAgo(23),
  },

  // Packages
  {
    id: 'product_21',
    category: 'packages',
    name: 'Home 5 kW bundle',
    sku: 'PKG-HOME5',
    brand: 'AeroSolar',
    spec: '12 panels · 5 kW inverter',
    unitPrice: 5400,
    stock: 9,
    status: 'active',
    updatedAt: daysAgo(3),
  },
  {
    id: 'product_22',
    category: 'packages',
    name: 'Home 10 kW hybrid',
    sku: 'PKG-HOME10',
    brand: 'SunVolt',
    spec: '18 panels · 10 kW hybrid · 4.8 kWh',
    unitPrice: 8900,
    stock: 4,
    status: 'active',
    updatedAt: daysAgo(6),
  },
  {
    id: 'product_23',
    category: 'packages',
    name: 'Commercial 25 kW',
    sku: 'PKG-COM25',
    brand: 'GreenGrid',
    spec: '46 panels · 25 kW inverter',
    unitPrice: 21400,
    stock: 2,
    status: 'active',
    updatedAt: daysAgo(7),
  },
  {
    id: 'product_24',
    category: 'packages',
    name: 'Off-grid cabin kit',
    sku: 'PKG-OFFGRID',
    brand: 'AeroSolar',
    spec: '6 panels · 3 kW inverter · 2 batteries',
    unitPrice: 3900,
    stock: 0,
    status: 'paused',
    updatedAt: daysAgo(17),
  },
  {
    id: 'product_25',
    category: 'packages',
    name: 'Starter backup kit',
    sku: 'PKG-BACKUP',
    brand: 'SunVolt',
    spec: '4 kW inverter · 4.8 kWh battery',
    unitPrice: 2750,
    stock: 6,
    status: 'draft',
    updatedAt: daysAgo(21),
  },
]

let products: Product[] = [...seed]

let sequence = seed.length

/** Panels, inverters, batteries, and services get their one-line summary generated from the structured fields. */
function specFromInput(input: ProductInput, fallback: string): string {
  return (
    input.spec?.trim() ||
    describePanel(input) ||
    describeInverter(input) ||
    describeBattery(input) ||
    describeService(input) ||
    fallback
  )
}

function nextId(): string {
  sequence += 1
  return `product_${sequence}`
}

function matchesSearch(product: Product, search: string): boolean {
  const query = search.trim().toLowerCase()
  if (!query) {
    return true
  }

  const searchable = [
    product.name,
    product.sku,
    product.brand,
    product.spec,
    serviceCategoryLabel(product.serviceCategory),
  ]

  return searchable.some((value) => value.toLowerCase().includes(query))
}

function compare(a: Product, b: Product, field: string): number {
  switch (field) {
    case 'unitPrice':
      return a.unitPrice - b.unitPrice
    case 'stock':
      return a.stock - b.stock
    case 'updatedAt':
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
    default:
      return a.name.localeCompare(b.name)
  }
}

export async function mockListProducts(params: ProductListParams): Promise<ProductListResult> {
  await delay()

  const page = params.page ?? 1
  const pageSize = params.pageSize ?? 10
  const status = (params.status ?? 'all') as ProductStatus | 'all'
  const brand = params.brand ?? 'all'
  const order = params.order ?? 'asc'

  // Every query is scoped to one catalogue tab.
  let rows = products.filter((product) => product.category === params.category)
  rows = rows.filter((product) => matchesSearch(product, params.search ?? ''))

  if (status !== 'all') {
    rows = rows.filter((product) => product.status === status)
  }

  if (brand !== 'all') {
    rows = rows.filter((product) => product.brand === brand)
  }

  rows = [...rows].sort((a, b) => {
    const result = compare(a, b, params.sort ?? 'name')
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

export async function mockCreateProduct(
  category: ProductCategory,
  input: ProductInput,
): Promise<Product> {
  await delay()

  const product: Product = {
    id: nextId(),
    category,
    name: input.name,
    sku: input.sku,
    brand: input.brand,
    spec: specFromInput(input, '—'),
    unitPrice: input.unitPrice,
    buyPrice: input.buyPrice,
    stock: category === 'services' ? 0 : input.stock,
    status: input.status,
    ratedPower: input.ratedPower,
    panel: input.panel,
    inverter: input.inverter,
    battery: input.battery,
    serviceCategory: input.serviceCategory,
    serviceSubcategory: input.serviceSubcategory,
    pricingType: input.pricingType,
    service: input.service,
    updatedAt: new Date().toISOString(),
  }

  products = [product, ...products]
  return product
}

export async function mockUpdateProduct(id: string, input: ProductInput): Promise<Product> {
  await delay()

  const existing = products.find((product) => product.id === id)
  if (!existing) {
    throw new Error('That product no longer exists.')
  }

  const updated: Product = {
    ...existing,
    name: input.name,
    sku: input.sku,
    brand: input.brand,
    spec: specFromInput(input, existing.spec),
    unitPrice: input.unitPrice,
    buyPrice: input.buyPrice,
    stock: existing.category === 'services' ? 0 : input.stock,
    status: input.status,
    ratedPower: input.ratedPower,
    panel: input.panel,
    inverter: input.inverter,
    battery: input.battery,
    serviceCategory: input.serviceCategory,
    serviceSubcategory: input.serviceSubcategory,
    pricingType: input.pricingType,
    service: input.service,
    updatedAt: new Date().toISOString(),
  }

  products = products.map((product) => (product.id === id ? updated : product))
  return updated
}

export async function mockDeleteProduct(id: string): Promise<void> {
  await delay()

  const exists = products.some((product) => product.id === id)
  if (!exists) {
    throw new Error('That product no longer exists.')
  }

  products = products.filter((product) => product.id !== id)
}
