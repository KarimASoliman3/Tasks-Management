import { jwtDecode } from 'jwt-decode'

const API_BASE_URL = import.meta.env.VITE_BASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export interface JWTPayload {
  exp?: number
  iat?: number
  sub?: string
  aud?: string
  role?: string
  email?: string
  [key: string]: any
}

/**
 * Safely decode a JWT payload without verifying the signature.
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwtDecode<JWTPayload>(token)
  } catch {
    return null
  }
}

/**
 * Check if a token is expired.
 * @param bufferSeconds - seconds before actual expiry to treat token as expired (default 60s)
 */
export function isTokenExpired(token: string, bufferSeconds: number = 60): boolean {
  const payload = decodeToken(token)
  if (!payload?.exp) {
    // If no exp claim, assume valid to avoid locking users out
    return false
  }
  const expTimeMs = payload.exp * 1000
  return Date.now() >= expTimeMs - bufferSeconds * 1000
}

/**
 * Get token expiration date for cookie `expires` attribute.
 */
export function getTokenExpirationDate(token: string): Date | null {
  const payload = decodeToken(token)
  if (!payload?.exp) return null
  return new Date(payload.exp * 1000)
}

/**
 * Call Supabase refresh token endpoint.
 */
export async function refreshAccessToken(refreshToken: string) {
  if (!API_BASE_URL || !API_KEY) {
    return {
      error: true,
      msg: 'API configuration is missing',
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: API_KEY,
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        error: true,
        code: result?.code,
        error_code: result?.error_code,
        msg: result?.msg || result?.error_description || result?.error || 'Token refresh failed',
      }
    }

    return {
      error: false,
      access_token: result?.access_token,
      refresh_token: result?.refresh_token,
      user: result?.user,
    }
  } catch (error: any) {
    return {
      error: true,
      msg: error?.message || 'Network error during token refresh',
    }
  }
}

/**
 * Return a valid access token, refreshing if needed.
 * Returns `null` if the token is expired and cannot be refreshed.
 */
export async function getValidAccessToken(): Promise<string | null> {
  const accessToken = document.cookie.match(new RegExp('(^| )access_token=([^;]+)'))?.[2] || null
  const refreshToken = document.cookie.match(new RegExp('(^| )refresh_token=([^;]+)'))?.[2] || null

  if (!accessToken) return null

  if (!isTokenExpired(accessToken)) {
    return accessToken
  }

  // Access token expired — try to refresh
  if (!refreshToken) return null

  const result = await refreshAccessToken(refreshToken)

  if (result.error || !result.access_token) return null

  // Store new tokens
  const newAccessToken = result.access_token
  const newRefreshToken = result.refresh_token || refreshToken
  const expiryDate = getTokenExpirationDate(newAccessToken)

  const expiresAttr = expiryDate ? `; expires=${expiryDate.toUTCString()}` : ''
  document.cookie = `access_token=${newAccessToken}; path=/${expiresAttr}`
  document.cookie = `refresh_token=${newRefreshToken}; path=/${expiresAttr}`

  if (result.user) {
    localStorage.setItem('user', JSON.stringify(result.user))
  }

  return newAccessToken
}
