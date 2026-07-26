import { NextRequest, NextResponse } from 'next/server'
import { requireUserApi } from '@/lib/authorize'
import { AuthenticationError } from '@/lib/app-errors'
import { handleApiError } from '@/lib/api-error'
import { experienceEngine } from '@/engine'
import { assertRateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
    assertRateLimit(`login:${ip}`, 'LOGIN')

    const usuario = await requireUserApi()

    const experience = await experienceEngine.obterLoginExperience(usuario.empresaId)
    return NextResponse.json({ redirect: experience.redirectAposLogin })
  } catch (err) {
    if (err instanceof AuthenticationError) {
      return NextResponse.json({ error: err.message, redirect: '/login' }, { status: 401 })
    }
    return handleApiError(err)
  }
}
