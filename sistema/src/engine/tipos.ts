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

export interface CondicaoEtapa {
  // P65 — a conversa muda conforme o empresário responde.
  // `apenasSe`: só pergunta se a resposta à pergunta indicada contiver
  //   alguma das palavras (ex.: "crescer" abre "Crescer costuma significar...").
  // `pularSe`: pula se a resposta contiver alguma das palavras (ex.: quem
  //   mostra delegação não recebe pergunta básica sobre organização).
  apenasSe?: { perguntaId: string; palavras: string[] }
  pularSe?: { perguntaId: string; palavras: string[] }
}

export interface Etapa {
  id: string
  pergunta: string
  tipo: 'texto' | 'selecao' | 'faixa'
  opcoes?: Opcao[]
  categoria?: string
  estagio?: EstagioConselheiro
  // P70 — bloco da Primeira Sessão Estratégica (7 blocos de descoberta).
  // Cada bloco responde "o que eu consigo concluir agora?" e a Ponte
  // conversa entre blocos citando as palavras do empresário.
  bloco?: BlocoConversa
  // P54 — resposta rápida com campo opcional: "Se quiser, conte mais."
  permiteDetalhe?: boolean
  // P65 — adaptação: a etapa só aparece (ou é pulada) conforme respostas reais.
  condicao?: CondicaoEtapa
}

// ─── P70 — BLOCOS DA PRIMEIRA SESSÃO ESTRATÉGICA ─────────────────────────────
// A conversa deixou de ser um questionário em 5 estágios e virou uma
// descoberta em 7 blocos. Cada bloco constrói uma conclusão sobre a empresa;
// a soma dos blocos alimenta as hipóteses que originam o Retrato.
export type BlocoConversa =
  | 'momento'
  | 'decisao'
  | 'dependencia'
  | 'clientes'
  | 'dinheiro'
  | 'energia'
  | 'visao'

export const BLOCOS_ORDEM: BlocoConversa[] = [
  'momento',
  'decisao',
  'dependencia',
  'clientes',
  'dinheiro',
  'energia',
  'visao',
]

export const BLOCO_LABEL: Record<BlocoConversa, string> = {
  momento: 'O momento da sua empresa',
  decisao: 'Como você decide',
  dependencia: 'A dependência',
  clientes: 'Os clientes',
  dinheiro: 'O dinheiro',
  energia: 'A energia',
  visao: 'A visão',
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
