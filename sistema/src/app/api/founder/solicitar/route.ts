import { NextRequest, NextResponse } from 'next/server'
import { prismaSeguro as prisma } from '@/lib/prisma-tenant-safe'
import { founderSolicitacaoSchema, rotuloEquipeFounder, type FounderSolicitacaoInput } from '@/lib/validations'
import { handleApiError } from '@/lib/api-error'
import { assertRateLimit } from '@/lib/rate-limit'
import { getCurrentUser } from '@/lib/auth'
import { createLogger } from '@/lib/logger'

const log = createLogger('api', 'founder-solicitar')

const WHATSAPP_NUMERO = '5548991133397'

function montarResumoWhatsApp(dados: FounderSolicitacaoInput): string {
  const linhas: string[] = []
  linhas.push('RESUMO - PEDIDO FOUNDER | PONTE DIGITAL')
  linhas.push('')
  linhas.push(`EMPRESA: ${dados.nomeEmpresa}`)
  linhas.push(`RESPONSAVEL: ${dados.responsavel}`)
  linhas.push(`SEGMENTO: ${dados.segmento}`)
  linhas.push(`CIDADE/REGIAO: ${dados.cidadeRegiao}`)
  const equipe = rotuloEquipeFounder(dados.equipe)
  if (equipe) linhas.push(`EQUIPE: ${equipe}`)
  linhas.push('')
  linhas.push('O QUE A EMPRESA FAZ')
  linhas.push(dados.oQueEmpresaFaz)
  linhas.push('')
  linhas.push('PRINCIPAL DESAFIO')
  linhas.push(dados.principalDesafio)
  linhas.push('')
  linhas.push('O QUE GOSTARIA DE ENXERGAR')
  linhas.push(dados.gostariaEnxergar)
  linhas.push('')
  linhas.push('MOTIVACAO')
  linhas.push(dados.motivacao)
  return linhas.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? request.headers.get('x-real-ip') ?? 'unknown'
    assertRateLimit(`founder-solicitacao:${ip}`, 'FOUNDER_SOLICITACAO')

    const body = await request.json()
    const parsed = founderSolicitacaoSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Confira os campos marcados e tente novamente.', detalhes: parsed.error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    const dados = parsed.data

    // Usuário autenticado (opcional): vincula a solicitação à identidade.
    const usuario = await getCurrentUser().catch(() => null)

    const solicitacao = await prisma.solicitacaoFounder.create({
      data: {
        nomeEmpresa: dados.nomeEmpresa,
        responsavel: dados.responsavel,
        segmento: dados.segmento,
        cidadeRegiao: dados.cidadeRegiao,
        equipe: dados.equipe ?? null,
        oQueEmpresaFaz: dados.oQueEmpresaFaz,
        principalDesafio: dados.principalDesafio,
        gostariaEnxergar: dados.gostariaEnxergar,
        motivacao: dados.motivacao,
        status: 'PENDING',
        origem: 'SITE',
        usuarioId: usuario?.id ?? null,
      },
    })

    const resumo = montarResumoWhatsApp(dados)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(resumo)}`

    log.info('Solicitação Founder registrada', {
      details: { solicitacaoId: solicitacao.id, autenticado: usuario != null },
    })

    return NextResponse.json({
      data: { solicitacaoId: solicitacao.id, whatsappUrl, resumo },
    })
  } catch (err) {
    return handleApiError(err)
  }
}
