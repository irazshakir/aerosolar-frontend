export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthSession {
  user: AuthUser
  accessToken: string
}

export interface RegisterPayload {
  name: string
  organizationName: string
  phone: string
  email: string
  password: string
}

/** Form values carry the terms checkbox; the API payload does not. */
export interface RegisterFormValues extends RegisterPayload {
  acceptTerms: boolean
}
