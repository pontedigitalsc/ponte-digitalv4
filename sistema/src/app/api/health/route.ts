import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Pistão leve, público — usado por Vercel/healthchecks do deploy.
// Não expõe nenhuma informação interna da plataforma.
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
}