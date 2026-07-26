import { NextResponse } from 'next/server'
import { assertRateLimit } from '@/lib/rate-limit'
import { handleApiError } from '@/lib/api-error'

export async function GET(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    assertRateLimit(`sessao:${ip}`, 'CONVERSA')

    const token = crypto.randomUUID()
    const response = NextResponse.redirect(new URL('/conversa', request.url))
    response.cookies.set('conv_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    })
    return response
  } catch (err) {
    return handleApiError(err)
  }
}
