/**
 * Wire <-> domain casing transform.
 *
 * The FastAPI backend speaks `snake_case` JSON (Pydantic default). The frontend
 * speaks `camelCase`. This module is the single boundary where the two meet, so
 * every feature DTO can stay idiomatic TypeScript with no per-field mapping code.
 *
 * Only object *keys* are converted. Values — including strings that contain
 * underscores — are passed through untouched.
 */

type UnknownRecord = Record<string, unknown>

function isPlainObject(value: unknown): value is UnknownRecord {
  if (value === null || typeof value !== 'object') {
    return false
  }
  const prototype = Object.getPrototypeOf(value) as unknown
  return prototype === Object.prototype || prototype === null
}

/** `createdAt` -> `created_at` */
export function camelToSnakeKey(key: string): string {
  return key.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`)
}

/** `created_at` -> `createdAt` */
export function snakeToCamelKey(key: string): string {
  return key.replace(/_([a-z0-9])/g, (_match, char: string) => char.toUpperCase())
}

/**
 * Recursively converts snake_case keys to camelCase.
 * Use for every response payload coming back from the backend.
 */
export function toCamelCaseDeep<T = unknown>(input: unknown): T {
  if (Array.isArray(input)) {
    return input.map((item) => toCamelCaseDeep(item)) as unknown as T
  }

  if (isPlainObject(input)) {
    const result: UnknownRecord = {}
    for (const [key, value] of Object.entries(input)) {
      result[snakeToCamelKey(key)] = toCamelCaseDeep(value)
    }
    return result as T
  }

  return input as T
}

/**
 * Recursively converts camelCase keys to snake_case.
 * Use for request params and request bodies before they leave the client.
 */
export function toSnakeCaseDeep<T = unknown>(input: unknown): T {
  if (Array.isArray(input)) {
    return input.map((item) => toSnakeCaseDeep(item)) as unknown as T
  }

  if (isPlainObject(input)) {
    const result: UnknownRecord = {}
    for (const [key, value] of Object.entries(input)) {
      result[camelToSnakeKey(key)] = toSnakeCaseDeep(value)
    }
    return result as T
  }

  return input as T
}
