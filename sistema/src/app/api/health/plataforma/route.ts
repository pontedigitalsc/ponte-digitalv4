import { NextResponse } from 'next/server'
import { requirePlataforma } from '@/lib/authorize'
import { handleApiError } from '@/lib/api-error'

export const runtime = 'nodejs'

// Saúde detalhada — exclusiva do Founder Principal (FOUNDER_VIEW_SYSTEM_HEALTH).
// Exige login e checa conectividade com o banco.
export async function GET() {
  try {
    await requirePlataforma('FOUNDER_VIEW_SYSTEM_HEALTH')

    const inicio = Date.now()
    const memoria = process.memoryUsage()
    const memoriaMB = {
      rss: Math.round(memoria.rss / 1024 / 1024),
      heapTotal: Math.round(memoria.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memoria.heapUsed / 1024 / 1024),
    }

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      ambiente: process.env.NODE_ENV ?? 'development',
      memoria: memoriaMB,
      tempoResposta: Date.now() - inicio,
    })
  } catch (err) {
    return handleApiError(err)
  }
}