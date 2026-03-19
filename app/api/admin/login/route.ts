import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { checkLoginRateLimit, recordLoginAttempt } from '@/lib/auth/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      )
    }

    // Get IP address from request headers
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Check rate limits BEFORE attempting authentication
    const rateLimitResult = await checkLoginRateLimit(ip, email)
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: rateLimitResult.reason },
        { status: 429 }
      )
    }

    const cookieStore = await cookies()
    const response = NextResponse.json({ success: true })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
              response.cookies.set(name, value, options)
            })
          },
        },
      }
    )

    // Sign in with Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error || !data.user) {
      console.error('Auth error:', error?.message || 'No user returned')
      // Record failed attempt for rate limiting
      await recordLoginAttempt(ip, email)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Verify user has admin role
    // Check both locations: top-level JWT claim (modern) and user_metadata (legacy)
    const jwtPayload = data.session?.access_token
      ? JSON.parse(Buffer.from(data.session.access_token.split('.')[1], 'base64').toString())
      : null

    const isAdmin =
      data.user.user_metadata?.role === 'admin' ||
      jwtPayload?.role === 'admin'

    if (!isAdmin) {
      console.error('User does not have admin role:', {
        user_metadata: data.user.user_metadata,
        jwt_role: jwtPayload?.role
      })
      // Record failed attempt for rate limiting
      await recordLoginAttempt(ip, email)
      await supabase.auth.signOut()
      return NextResponse.json(
        { error: 'Unauthorized - admin access required' },
        { status: 403 }
      )
    }

    // Return response with cookies set
    response.headers.set('Content-Type', 'application/json')
    return response
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
