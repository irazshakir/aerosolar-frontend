import type { ListParams, Paginated } from '@/types/api'

/** One catalogue tab per product group in the sidebar. */
export type ProductCategory = 'panels' | 'inverters' | 'batteries' | 'services' | 'packages'

export type ProductStatus = 'active' | 'inactive' | 'draft' | 'paused'

export type PanelType = 'monofacial' | 'bifacial'

export type InverterType = 'on-grid' | 'hybrid' | 'off-grid' | 'microinverter'

export type PhaseType = 'single-phase' | 'three-phase'

export type BatteryChemistry = 'lfp' | 'lithium-ion' | 'lead-acid' | 'gel' | 'agm' | 'other'

/** How a battery pack is mounted on site — battery catalogue only. */
export type BatteryType = 'wall-mounted' | 'rack-mounted' | 'floor-standing' | 'other'

export type CommunicationProtocol = 'can' | 'rs485' | 'other'

/** Service catalogue only: the headline group a service is filed under. */
export type ServiceCategory =
  | 'installation'
  | 'system-design'
  | 'site-survey'
  | 'net-metering'
  | 'maintenance'
  | 'cleaning'
  | 'repair'
  | 'monitoring'
  | 'electrical-work'
  | 'other'

/** Service catalogue only: the second-level option offered by each category. */
export type ServiceSubcategory =
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'agricultural'
  | 'solar-system-design'
  | 'load-assessment'
  | 'energy-audit'
  | 'rooftop-survey'
  | 'site-inspection'
  | 'feasibility-study'
  | 'application-documentation'
  | 'approval-assistance'
  | 'preventive-maintenance'
  | 'annual-maintenance-contract'
  | 'solar-panel-cleaning'
  | 'inverter-repair'
  | 'battery-repair'
  | 'system-troubleshooting'
  | 'remote-monitoring'
  | 'performance-analysis'
  | 'solar-wiring'
  | 'earthing'
  | 'protection-installation'
  | 'custom-service'

/** How a service is billed — the last option has no fixed price. */
export type ServicePricingType =
  | 'fixed-price'
  | 'per-kw'
  | 'per-panel'
  | 'per-visit'
  | 'hourly'
  | 'custom-quote'

export type CustomerType = 'residential' | 'commercial' | 'industrial' | 'agricultural'

export type SystemType = 'on-grid' | 'hybrid' | 'off-grid'

export type DurationUnit = 'hours' | 'days'

export type WarrantyUnit = 'months' | 'years'

export type IpRating = 'ip20' | 'ip54' | 'ip65' | 'ip66' | 'other'

/**
 * Engineering details captured behind the panel form's "Additional info"
 * section. Every field is optional because the whole section is optional.
 */
export interface PanelDetails {
  cellTechnology?: string
  panelType?: PanelType
  /** Percent, 0–100. */
  efficiency?: number
  dimensions?: string
  /** Kilograms. */
  weight?: number
  manufacturingCountry?: string
  /** Open-circuit voltage, volts. */
  voc?: number
  /** Maximum-power voltage, volts. */
  vmp?: number
  /** Short-circuit current, amps. */
  isc?: number
  /** Maximum-power current, amps. */
  imp?: number
  warranty?: string
  imageUrl?: string
  datasheetUrl?: string
}

export interface InverterDetails {
  /** Rated AC output, kW — main form field. */
  ratedOutputPower?: number
  /** Main form field. */
  inverterType?: InverterType
  /** Main form field. */
  phaseType?: PhaseType
  /** kW. */
  maxPvInputPower?: number
  /** Volts. */
  maxPvInputVoltage?: number
  /** Lower bound of the MPPT window, volts. */
  mpptVoltageMin?: number
  /** Upper bound of the MPPT window, volts. */
  mpptVoltageMax?: number
  mpptCount?: number
  /** Amps. */
  maxPvInputCurrent?: number
  batteryCompatible?: boolean
  batteryChemistries?: BatteryChemistry[]
  /** Volts. */
  batteryVoltageMin?: number
  /** Volts. */
  batteryVoltageMax?: number
  /** kW. */
  maxChargingPower?: number
  /** kW. */
  maxDischargingPower?: number
  /** Percent, 0–100. */
  peakEfficiency?: number
  ipRating?: IpRating
  parallelCapable?: boolean
  warrantyYears?: number
  manufacturingCountry?: string
  /** Ordered gallery — the first image is the cover. */
  images?: string[]
  datasheetUrl?: string
  description?: string
}

export interface BatteryDetails {
  /** Main form field. */
  chemistry?: BatteryChemistry
  /** Nominal capacity, kWh — main form field. */
  nominalCapacity?: number
  /** Nominal voltage, volts — main form field. */
  nominalVoltage?: number
  /** Usable capacity, kWh. */
  usableCapacity?: number
  /** Amps. */
  maxChargingCurrent?: number
  /** Amps. */
  maxDischargingCurrent?: number
  /** kW. */
  maxChargingPower?: number
  /** kW. */
  maxDischargingPower?: number
  /** Percent, 0–100. */
  depthOfDischarge?: number
  /** Rated charge/discharge cycles. */
  cycleLife?: number
  /** Percent, 0–100. */
  roundTripEfficiency?: number
  /** Mounting style. */
  batteryType?: BatteryType
  /** Model numbers picked from the inverter catalogue. */
  compatibleInverterModels?: string[]
  communicationProtocols?: CommunicationProtocol[]
  expandable?: boolean
  /** How many extra units can be stacked onto the master pack. */
  maxExpandableUnits?: number
  /** Degrees Celsius. */
  operatingTemperatureMin?: number
  /** Degrees Celsius. */
  operatingTemperatureMax?: number
  warrantyYears?: number
  manufacturingCountry?: string
  /** Ordered gallery — the first image is the cover. */
  images?: string[]
  datasheetUrl?: string
  description?: string
}

/**
 * Scope details captured behind the service form's "Additional info" section.
 * Every field is optional because the whole section is optional.
 */
export interface ServiceDetails {
  /** Main form field, but it lives with the scope details it describes. */
  description?: string
  customerTypes?: CustomerType[]
  systemTypes?: SystemType[]
  /** kW. */
  minSystemCapacity?: number
  /** kW. */
  maxSystemCapacity?: number
  serviceAreas?: string[]
  /** Paired with `durationUnit`. */
  estimatedDuration?: number
  durationUnit?: DurationUnit
  /** Workmanship warranty, paired with `warrantyUnit`. */
  warranty?: number
  warrantyUnit?: WarrantyUnit
  /** Ordered gallery — the first image is the cover. */
  images?: string[]
  additionalTerms?: string
}

export interface Product {
  id: string
  category: ProductCategory
  name: string
  sku: string
  brand: string
  /** Capacity, rating, scope — the one line that describes the item. */
  spec: string
  unitPrice: number
  /** What the business pays per unit — panels only for now. */
  buyPrice?: number
  /** Only meaningful when the category tracks stock (services never do). */
  stock: number
  status: ProductStatus
  updatedAt: string
  /** Rated output in watts — panels only. */
  ratedPower?: number
  /** Panels only; absent when the optional details were never filled in. */
  panel?: PanelDetails
  /** Inverters only; absent when the optional details were never filled in. */
  inverter?: InverterDetails
  /** Batteries only; absent when the optional details were never filled in. */
  battery?: BatteryDetails
  /** Services only: the group and sub-group the service is filed under. */
  serviceCategory?: ServiceCategory
  serviceSubcategory?: ServiceSubcategory
  /** Services only: how the price is charged. */
  pricingType?: ServicePricingType
  /** Services only; absent when the optional details were never filled in. */
  service?: ServiceDetails
}

export interface ProductInput {
  name: string
  sku: string
  brand: string
  /** Derived from the category's structured fields instead. */
  spec?: string
  unitPrice: number
  buyPrice?: number
  stock: number
  status: ProductStatus
  ratedPower?: number
  panel?: PanelDetails
  inverter?: InverterDetails
  battery?: BatteryDetails
  serviceCategory?: ServiceCategory
  serviceSubcategory?: ServiceSubcategory
  pricingType?: ServicePricingType
  service?: ServiceDetails
}

export interface ProductListParams extends ListParams {
  category: ProductCategory
  status?: ProductStatus | 'all'
  brand?: string | 'all'
}

export type ProductListResult = Paginated<Product>
