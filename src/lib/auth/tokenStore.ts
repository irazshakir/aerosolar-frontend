let accessToken: string | null = null

/** Access token lives in memory only — never persisted to storage. */
export function getAccessToken(): string | null {
  return accessToken
}

export function setAccessToken(token: string): void {
  accessToken = token
}

export function clearAccessToken(): void {
  accessToken = null
}
