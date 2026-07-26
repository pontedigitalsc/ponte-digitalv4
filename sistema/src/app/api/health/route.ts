import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
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
}
