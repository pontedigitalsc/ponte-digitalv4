// ─── SINAIS (engine existente) ─────────────────────────────────────────────────

export type UrgenciaSinal = 'baixa' | 'media' | 'alta'
export type DominioSinal = 'clientes' | 'tarefas' | 'financeiro'

export interface AcaoSugerida {
  label: string
  href: string
}

export interface Sinal {
  id: string
  dominio: DominioSinal
  urgencia: UrgenciaSinal
  titulo: string
  descricao: string
  origemDados: string
  acaoSugerida: AcaoSugerida
  fatosBrutos?: Record<string, unknown>
}

const PESO_URGENCIA: Record<UrgenciaSinal, number> = { alta: 3, media: 2, baixa: 1 }

export function ordenarPorUrgencia(sinais: Sinal[]): Sinal[] {
  return [...sinais].sort((a, b) => PESO_URGENCIA[b.urgencia] - PESO_URGENCIA[a.urgencia])
}

export function compactarSinais(sinais: (Sinal | null)[]): Sinal[] {
  return sinais.filter((s): s is Sinal => s !== null)
}

// ─── FLUXO DE CONVERSA ────────────────────────────────────────────────────────

// P52 — Estrutura de conselheiro em 5 estágios. A conversa não é uma lista de
// perguntas: é uma caminhada. Cada estágio tem um papel:
//   1. contexto         — movimento: quem é a empresa, como ela vive
//   2. realidade        — percepção vs fato: como a empresa funciona de verdade
//   3. tensao           — pontos cegos: o que trava, o que dói
//   4. evolucao         — aprendizado como patrimônio: o que já funciona
//   5. proximo_movimento— direção: para onde vamos a seguir
export type EstagioConselheiro =
  | 'contexto'
  | 'realidade'
  | 'tensao'
  | 'evolucao'
  | 'proximo_movimento'

export const ESTAGIOS_ORDEM: EstagioConselheiro[] = [
  'contexto',
  'realidade',
  'tensao',
  'evolucao',
  'proximo_movimento',
]

export const ESTAGIO_LABEL: Record<EstagioConselheiro, string> = {
  contexto: 'O contexto',
  realidade: 'A realidade',
  tensao: 'A tensão',
  evolucao: 'A evolução',
  proximo_movimento: 'O próximo movimento',
}

export interface Etapa {
  id: string
  pergunta: string
  tipo: 'texto' | 'selecao' | 'faixa'
  opcoes?: Opcao[]
  categoria?: string
  estagio?: EstagioConselheiro
}

export interface Opcao {
  valor: string
  rotulo: string
}

export interface Fluxo {
  id: string
  nome: string
  versao: number
  etapas: Etapa[]
}

// ─── CONVERSA ──────────────────────────────────────────────────────────────────

export interface EstadoConversa {
  token: string
  fluxo: string
  etapa?: string
  concluida: boolean
  respostas: Record<string, string | null>
}

export interface RespostaConversa {
  reacao: string
  proximaPergunta: Etapa | null
  progresso: Progresso
  concluida: boolean
}

export interface Progresso {
  blocoAtual: number
  totalBlocos: number
  etapaNoBloco: number
  totalEtapasNoBloco: number
  percentual: number
}

// ─── IDENTIDADE DIGITAL ───────────────────────────────────────────────────────

export interface Interpretacoes {
  pontoAtencao: string
  observacao: string
  alinhamento: string
}

export interface ResumoNatural {
  secao1: { titulo: string; paragrafo: string }
  secao2: { titulo: string; pontos: { evidencia: string; analise: string }[] }
  secao3: { titulo: string; paragrafo: string }
  secao4: { titulo: string; lacunas: string[] }
  secao5: { titulo: string; acao: string }
}

export interface IdentidadeDigitalData {
  dados: Record<string, string | null>
  interpretacoes: Interpretacoes
  versao: number
}
