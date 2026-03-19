/**
 * Session-based media access tokens
 * Tokens are temporary and tied to user sessions
 * Each page load generates a new token that expires after the session ends
 */

interface SessionToken {
  token: string
  createdAt: number
  expiresAt: number
}

// Use global scope to persist token store across module reloads
// This is necessary for development environments with hot reloading
declare global {
  var sessionTokenStore: Map<string, SessionToken> | undefined
}

function getTokenStore(): Map<string, SessionToken> {
  globalThis.sessionTokenStore ??= new Map<string, SessionToken>()
  return globalThis.sessionTokenStore
}

// Token expiration: 30 minutes (token is still valid even after page refresh within this window)
const TOKEN_EXPIRATION_MS = 30 * 60 * 1000

/**
 * Generate a new session token for media access
 * Token is unique and time-limited
 */
export function generateSessionToken(): string {
  // Generate a cryptographically secure random token
  const randomBytes = new Uint8Array(32)
  if (typeof window === 'undefined') {
    // Server-side
    const crypto = require('crypto')
    const bytes = crypto.randomBytes(32)
    return Buffer.from(bytes).toString('hex')
  } else {
    // Client-side (shouldn't happen in this flow, but for completeness)
    crypto.getRandomValues(randomBytes)
    return Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('')
  }
}

/**
 * Register a token as valid
 * Used when rendering pages to create tokens
 */
export function registerSessionToken(token: string): void {
  const now = Date.now()
  const store = getTokenStore()
  store.set(token, {
    token,
    createdAt: now,
    expiresAt: now + TOKEN_EXPIRATION_MS,
  })
}

/**
 * Verify a session token is valid and not expired
 * Returns true if token is valid, false otherwise
 */
export function verifySessionToken(token: string): boolean {
  if (!token) return false

  const store = getTokenStore()
  const entry = store.get(token)

  if (!entry) return false

  // Check if token is expired
  const now = Date.now()
  const isExpired = now > entry.expiresAt
  if (isExpired) {
    store.delete(token)
    return false
  }

  return true
}

/**
 * Clean up expired tokens (run periodically)
 */
export function cleanupExpiredTokens(): void {
  const now = Date.now()
  const store = getTokenStore()
  const expiredTokens: string[] = []

  store.forEach((entry, token) => {
    if (now > entry.expiresAt) {
      expiredTokens.push(token)
    }
  })

  expiredTokens.forEach((token) => store.delete(token))
}

// Run cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupExpiredTokens, 5 * 60 * 1000)
}
