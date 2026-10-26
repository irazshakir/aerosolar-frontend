import type {
  BatteryChemistry,
  BatteryType,
  CommunicationProtocol,
  CustomerType,
  DurationUnit,
  InverterType,
  IpRating,
  PanelType,
  PhaseType,
  ProductCategory,
  ProductInput,
  ProductStatus,
  ServiceCategory,
  ServicePricingType,
  ServiceSubcategory,
  SystemType,
  WarrantyUnit,
} from '@/features/products/types'

export interface ProductCatalogEntry {
  /** Page heading — also the sidebar submenu label. */
  title: string
  /** Lowercase noun used in copy: "panel", "service", … */
  itemLabel: string
  description: string
  /** Header for the descriptive column, e.g. "Capacity". */
  specLabel: string
  /** Header for the manufacturer column — "Provider" for services. */
  brandLabel: string
  brands: string[]
  /** Statuses offered by the form and filter for this tab. */
  statuses: ProductStatus[]
  /** Services are quoted per job, so they have no stock level. */
  tracksStock: boolean
  namePlaceholder: string
  specPlaceholder: string
}

/**
 * Per-category copy and options. The five pages share one implementation, so
 * everything that differs between them lives here instead of being duplicated.
 */
export const productCatalog: Record<ProductCategory, ProductCatalogEntry> = {
  panels: {
    title: 'Panels',
    itemLabel: 'panel',
    description: 'Module inventory across brands, wattages, and warranty terms.',
    specLabel: 'Capacity',
    brandLabel: 'Brand',
    brands: ['Jinko Solar', 'Longi', 'Trina Solar', 'Canadian Solar', 'JA Solar'],
    statuses: ['active', 'inactive'],
    tracksStock: true,
    namePlaceholder: 'e.g. Tiger Neo 580 W',
    specPlaceholder: 'e.g. 580 W · N-type TOPCon',
  },
  inverters: {
    title: 'Inverters',
    itemLabel: 'inverter',
    description: 'Hybrid and on-grid inverters available for installations.',
    specLabel: 'Rating',
    brandLabel: 'Brand',
    brands: ['Huawei', 'Growatt', 'Solis', 'Sungrow', 'GoodWe'],
    statuses: ['active', 'draft', 'paused'],
    tracksStock: true,
    namePlaceholder: 'e.g. SUN2000 10KTL',
    specPlaceholder: 'e.g. 10 kW · Hybrid · Three Phase',
  },
  batteries: {
    title: 'Batteries',
    itemLabel: 'battery',
    description: 'Lithium and tubular storage stock with cycle-life details.',
    specLabel: 'Storage',
    brandLabel: 'Brand',
    brands: ['Pylontech', 'Narada', 'OSW', 'Phoenix', 'Ampinvt'],
    statuses: ['active', 'draft', 'paused'],
    tracksStock: true,
    namePlaceholder: 'e.g. US5000 48 V',
    specPlaceholder: 'e.g. 4.8 kWh · LiFePO4',
  },
  services: {
    title: 'Services',
    itemLabel: 'service',
    description: 'Installation, maintenance, and audit work sold as line items.',
    specLabel: 'Scope',
    brandLabel: 'Provider',
    brands: ['AeroSolar crew', 'Certified partner'],
    statuses: ['active', 'inactive'],
    tracksStock: false,
    namePlaceholder: 'e.g. Rooftop installation',
    specPlaceholder: 'e.g. Up to 10 kW · 2 technicians',
  },
  packages: {
    title: 'Packages',
    itemLabel: 'package',
    description: 'Bundled systems quoted to the customer as a single line item.',
    specLabel: 'Includes',
    brandLabel: 'Brand',
    brands: ['AeroSolar', 'SunVolt', 'GreenGrid'],
    statuses: ['active', 'draft', 'paused'],
    tracksStock: true,
    namePlaceholder: 'e.g. Home 5 kW bundle',
    specPlaceholder: 'e.g. 12 panels · 5 kW inverter · battery',
  },
}

export const productStatusOptions: { value: ProductStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'draft', label: 'Draft' },
  { value: 'paused', label: 'Paused' },
]

export const panelTypeOptions: { value: PanelType; label: string }[] = [
  { value: 'monofacial', label: 'Monofacial' },
  { value: 'bifacial', label: 'Bifacial' },
]

export const inverterTypeOptions: { value: InverterType; label: string }[] = [
  { value: 'on-grid', label: 'On-Grid' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'off-grid', label: 'Off-Grid' },
  { value: 'microinverter', label: 'Microinverter' },
]

export const phaseTypeOptions: { value: PhaseType; label: string }[] = [
  { value: 'single-phase', label: 'Single Phase' },
  { value: 'three-phase', label: 'Three Phase' },
]

export const batteryChemistryOptions: { value: BatteryChemistry; label: string }[] = [
  { value: 'lfp', label: 'LiFePO₄ (LFP)' },
  { value: 'lithium-ion', label: 'Lithium-ion (Other)' },
  { value: 'lead-acid', label: 'Lead-acid' },
  { value: 'gel', label: 'Gel' },
  { value: 'agm', label: 'AGM' },
  { value: 'other', label: 'Other' },
]

export const batteryTypeOptions: { value: BatteryType; label: string }[] = [
  { value: 'wall-mounted', label: 'Wall-mounted' },
  { value: 'rack-mounted', label: 'Rack-mounted' },
  { value: 'floor-standing', label: 'Floor-standing' },
  { value: 'other', label: 'Other' },
]

export const communicationProtocolOptions: { value: CommunicationProtocol; label: string }[] = [
  { value: 'can', label: 'CAN' },
  { value: 'rs485', label: 'RS485' },
  { value: 'other', label: 'Other' },
]

export const ipRatingOptions: { value: IpRating; label: string }[] = [
  { value: 'ip20', label: 'IP20' },
  { value: 'ip54', label: 'IP54' },
  { value: 'ip65', label: 'IP65' },
  { value: 'ip66', label: 'IP66' },
  { value: 'other', label: 'Other' },
]

/** Shared dropdown for the inverter's yes/no engineering flags. */
export const yesNoOptions: { value: boolean; label: string }[] = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
]

export const serviceCategoryOptions: { value: ServiceCategory; label: string }[] = [
  { value: 'installation', label: 'Installation' },
  { value: 'system-design', label: 'System Design' },
  { value: 'site-survey', label: 'Site Survey' },
  { value: 'net-metering', label: 'Net Metering' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'cleaning', label: 'Cleaning' },
  { value: 'repair', label: 'Repair' },
  { value: 'monitoring', label: 'Monitoring' },
  { value: 'electrical-work', label: 'Electrical Work' },
  { value: 'other', label: 'Other' },
]

/** Second-level options — only shown once a service category is picked. */
export const serviceSubcategoryOptions: Record<
  ServiceCategory,
  { value: ServiceSubcategory; label: string }[]
> = {
  installation: [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'industrial', label: 'Industrial' },
    { value: 'agricultural', label: 'Agricultural' },
  ],
  'system-design': [
    { value: 'solar-system-design', label: 'Solar System Design' },
    { value: 'load-assessment', label: 'Load Assessment' },
    { value: 'energy-audit', label: 'Energy Audit' },
  ],
  'site-survey': [
    { value: 'rooftop-survey', label: 'Rooftop Survey' },
    { value: 'site-inspection', label: 'Site Inspection' },
    { value: 'feasibility-study', label: 'Feasibility Study' },
  ],
  'net-metering': [
    { value: 'application-documentation', label: 'Application & Documentation' },
    { value: 'approval-assistance', label: 'Approval Assistance' },
  ],
  maintenance: [
    { value: 'preventive-maintenance', label: 'Preventive Maintenance' },
    { value: 'annual-maintenance-contract', label: 'Annual Maintenance Contract (AMC)' },
  ],
  cleaning: [{ value: 'solar-panel-cleaning', label: 'Solar Panel Cleaning' }],
  repair: [
    { value: 'inverter-repair', label: 'Inverter Repair' },
    { value: 'battery-repair', label: 'Battery Repair' },
    { value: 'system-troubleshooting', label: 'System Troubleshooting' },
  ],
  monitoring: [
    { value: 'remote-monitoring', label: 'Remote Monitoring' },
    { value: 'performance-analysis', label: 'Performance Analysis' },
  ],
  'electrical-work': [
    { value: 'solar-wiring', label: 'Solar Wiring' },
    { value: 'earthing', label: 'Earthing' },
    { value: 'protection-installation', label: 'Protection Installation' },
  ],
  other: [{ value: 'custom-service', label: 'Custom Service' }],
}

/** `priceSuffix` is rendered after the price input, e.g. "420 / kW". */
export const servicePricingTypeOptions: {
  value: ServicePricingType
  label: string
  priceSuffix?: string
}[] = [
  { value: 'fixed-price', label: 'Fixed Price', priceSuffix: 'flat' },
  { value: 'per-kw', label: 'Per kW', priceSuffix: '/ kW' },
  { value: 'per-panel', label: 'Per Panel', priceSuffix: '/ panel' },
  { value: 'per-visit', label: 'Per Visit', priceSuffix: '/ visit' },
  { value: 'hourly', label: 'Hourly', priceSuffix: '/ hour' },
  { value: 'custom-quote', label: 'Custom Quote' },
]

export const customerTypeOptions: { value: CustomerType; label: string }[] = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'agricultural', label: 'Agricultural' },
]

export const systemTypeOptions: { value: SystemType; label: string }[] = [
  { value: 'on-grid', label: 'On-Grid' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'off-grid', label: 'Off-Grid' },
]

export const serviceDurationUnitOptions: { value: DurationUnit; label: string }[] = [
  { value: 'hours', label: 'Hours' },
  { value: 'days', label: 'Days' },
]

export const warrantyUnitOptions: { value: WarrantyUnit; label: string }[] = [
  { value: 'months', label: 'Months' },
  { value: 'years', label: 'Years' },
]

/** Cities offered by the service-area picker; crews can still type their own. */
export const serviceAreaOptions: string[] = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Hyderabad',
  'Gujranwala',
  'Sialkot',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
]

/** One-line summary shown under a panel's name in the catalogue table. */
export function describePanel(values: Pick<ProductInput, 'ratedPower' | 'panel'>): string {
  return [
    values.ratedPower ? `${values.ratedPower} W` : undefined,
    values.panel?.cellTechnology,
    values.panel?.panelType,
  ]
    .filter((part): part is string => Boolean(part))
    .join(' · ')
}

/** One-line summary shown under an inverter's name in the catalogue table. */
export function describeInverter(values: Pick<ProductInput, 'inverter'>): string {
  const { ratedOutputPower, inverterType, phaseType } = values.inverter ?? {}

  return [
    ratedOutputPower ? `${ratedOutputPower} kW` : undefined,
    inverterTypeOptions.find((option) => option.value === inverterType)?.label,
    phaseTypeOptions.find((option) => option.value === phaseType)?.label,
  ]
    .filter((part): part is string => Boolean(part))
    .join(' · ')
}

/** One-line summary shown under a service's name in the catalogue table. */
export function describeService(
  values: Pick<ProductInput, 'serviceCategory' | 'serviceSubcategory' | 'pricingType'>,
): string {
  return [
    serviceSubcategoryOptions[values.serviceCategory ?? 'other']?.find(
      (option) => option.value === values.serviceSubcategory,
    )?.label,
    servicePricingTypeOptions.find((option) => option.value === values.pricingType)?.label,
  ]
    .filter((part): part is string => Boolean(part))
    .join(' · ')
}

/** Readable label for the service category column and filters. */
export function serviceCategoryLabel(category?: ServiceCategory): string {
  return serviceCategoryOptions.find((option) => option.value === category)?.label ?? '—'
}

/** One-line summary shown under a battery's name in the catalogue table. */
export function describeBattery(values: Pick<ProductInput, 'battery'>): string {
  const { nominalCapacity, nominalVoltage, chemistry } = values.battery ?? {}

  return [
    nominalCapacity ? `${nominalCapacity} kWh` : undefined,
    nominalVoltage ? `${nominalVoltage} V` : undefined,
    batteryChemistryOptions.find((option) => option.value === chemistry)?.label,
  ]
    .filter((part): part is string => Boolean(part))
    .join(' · ')
}
