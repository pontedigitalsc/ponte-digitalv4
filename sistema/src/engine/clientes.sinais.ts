import { compactarSinais } from './tipos'
import type { Cliente } from '@/types'
import type { Sinal } from './tipos'

/**
 * ─── SINAIS DE CLIENTES ───────────────────────────────────────────────────────
 *
 * Cada função aqui recebe uma lista de Cliente já buscada por um Service
 * (ClienteService.listarClientes ou equivalente) e observa fatos relevantes
 * sobre ela. Nenhuma função deste arquivo faz query — isso pertence à
 * camada de Service, não à camada de Sinais.
 */

/**
 * Cliente ativo sem contato agendado, ou com próximo contato já vencido.
 * Esta é exatamente a mesma regra que já existia embutida na query do
 * Dashboard antes desta refatoração — foi apenas extraída e isolada, não
 * reinventada.
 */
export function sinalClientesSemContato(clientes: Cliente[], agora: Date = new Date()): Sinal | null {
  const semContato = clientes.filter(
    (c) => c.status === 'ATIVO' && (c.proximoContato === null || c.proximoContato === undefined || new Date(c.proximoContato) < agora)
  )

  if (semContato.length === 0) return null

  return {
    id: 'clientes-sem-contato',
    dominio: 'clientes',
    urgencia: semContato.length >= 10 ? 'alta' : 'media',
    titulo: `${semContato.length} cliente${semContato.length !== 1 ? 's' : ''} sem contato recente`,
    descricao: 'Clientes ativos sem um próximo contato agendado, ou com contato já vencido.',
    origemDados: 'Cliente.status = ATIVO e Cliente.proximoContato nulo ou vencido',
    // Fato bruto, não a interpretação: se o critério de "sem contato"
    // mudar amanhã, estes dados ainda permitem recalcular corretamente.
    fatosBrutos: {
      dataReferencia: agora.toISOString(),
      clientes: semContato.map((c) => ({
        id: c.id,
        proximoContato: c.proximoContato ? new Date(c.proximoContato).toISOString() : null,
      })),
    },
    acaoSugerida: { label: 'Ver clientes', href: '/clientes?status=ATIVO' },
  }
}

/**
 * Cliente com status INADIMPLENTE — fato direto do cadastro, sem inferência.
 */
export function sinalClientesInadimplentes(clientes: Cliente[]): Sinal | null {
  const inadimplentes = clientes.filter((c) => c.status === 'INADIMPLENTE')

  if (inadimplentes.length === 0) return null

  return {
    id: 'clientes-inadimplentes',
    dominio: 'clientes',
    urgencia: 'alta',
    titulo: `${inadimplentes.length} cliente${inadimplentes.length !== 1 ? 's' : ''} inadimplente${inadimplentes.length !== 1 ? 's' : ''}`,
    descricao: 'Clientes marcados como inadimplentes no cadastro.',
    origemDados: 'Cliente.status = INADIMPLENTE',
    acaoSugerida: { label: 'Ver clientes', href: '/clientes?status=INADIMPLENTE' },
  }
}

/**
 * Agrega todos os sinais de Clientes. Cada Service de domínio expõe uma
 * função assim — é o que index.ts consome para agregar tudo.
 */
export function gerarSinaisClientes(clientes: Cliente[], agora: Date = new Date()): Sinal[] {
  return compactarSinais([
    sinalClientesSemContato(clientes, agora),
    sinalClientesInadimplentes(clientes),
  ])
}
