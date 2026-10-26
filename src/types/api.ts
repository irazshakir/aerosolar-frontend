/**
 * Response envelope FastAPI wraps payloads in: `{ "data": <payload>, "message"?: "..." }`.
 * The `lib/api/http.ts` helpers unwrap this automatically, so features only ever
 * see the inner payload type.
 */
export interface ApiEnvelope<T> {
  data: T
  message?: string
}

/**
 * Pagination shape handed to the UI (camelCase).
 * Produced by transforming the FastAPI wire shape {@link WirePaginated}.
 */
export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

/**
 * Raw FastAPI / Pydantic list payload as it arrives on the wire (snake_case).
 * Documented here as the backend contract; `http.ts` converts it to
 * {@link Paginated} via the snake_case -> camelCase transform.
 */
export interface WirePaginated<T> {
  items: T[]
  total: number
  page: number
  page_size: number
}

export type SortOrder = 'asc' | 'desc'

/**
 * Common list query params sent to the backend.
 * camelCase keys are converted to snake_case (`pageSize` -> `page_size`)
 * by `http.ts` before the request is sent.
 */
export interface ListParams {
  page?: number
  pageSize?: number
  search?: string
  sort?: string
  order?: SortOrder
  [filter: string]: unknown
}
