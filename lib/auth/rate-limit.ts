import { createAdminClient } from '@/lib/supabase/admin'

const IP_LIMIT = 5 // 5 attempts per 15 minutes
const EMAIL_LIMIT = 3 // 3 attempts per 15 minutes
const WINDOW_MINUTES = 15

/**
 * Check if a login attempt should be rate-limited
 * Enforces both IP-based and email-based limits
 */
export async function checkLoginRateLimit(
  ip: string,
  email: string
): Promise<{ allowed: boolean; reason?: string }> {
  const supabase = createAdminClient()
  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString()

  try {
    // Check IP rate limit
    const { count: ipCount, error: ipError } = await supabase
      .from('login_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('identifier', ip)
      .eq('attempt_type', 'ip')
      .gte('attempted_at', windowStart)

    if (ipError) {
      console.error('Rate limit check error:', ipError)
      // Fail open on database errors - allow login to proceed
      return { allowed: true }
    }

    if ((ipCount || 0) >= IP_LIMIT) {
      return {
        allowed: false,
        reason: `Too many login attempts from this IP. Try again in ${WINDOW_MINUTES} minutes.`,
      }
    }

    // Check email rate limit
    const { count: emailCount, error: emailError } = await supabase
      .from('login_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('identifier', email.toLowerCase())
      .eq('attempt_type', 'email')
      .gte('attempted_at', windowStart)

    if (emailError) {
      console.error('Rate limit check error:', emailError)
      // Fail open on database errors
      return { allowed: true }
    }

    if ((emailCount || 0) >= EMAIL_LIMIT) {
      return {
        allowed: false,
        reason: `Too many login attempts for this email. Try again in ${WINDOW_MINUTES} minutes.`,
      }
    }

    return { allowed: true }
  } catch (err) {
    console.error('Rate limit check error:', err)
    // Fail open on any errors
    return { allowed: true }
  }
}

/**
 * Record a failed login attempt
 * Tracks both IP and email for rate limiting
 * Cleans up old records to prevent table bloat
 */
export async function recordLoginAttempt(ip: string, email: string): Promise<void> {
  const supabase = createAdminClient()

  try {
    // Record both IP and email attempts
    await supabase.from('login_attempts').insert([
      { identifier: ip, attempt_type: 'ip' },
      { identifier: email.toLowerCase(), attempt_type: 'email' },
    ])

    // Clean up old records (older than 1 hour) to prevent table bloat
    // This runs with each failed login attempt
    await supabase
      .from('login_attempts')
      .delete()
      .lt('attempted_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())
  } catch (err) {
    // Silently fail on recording - don't block login due to database issues
    console.error('Error recording login attempt:', err)
  }
}
