'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AvatarPonte } from '@/components/ui/avatar'

const SITUACOES = [
  { id: 'ideias', rotulo: 'Tenho muitas ideias, mas dificuldade de organizar' },
  { id: 'trabalho', rotulo: 'Trabalho muito, mas sinto que poderia evoluir mais' },
  { id: 'dependente', rotulo: 'Minha empresa depende muito de mim' },
  { id: 'decisao', rotulo: 'Tenho dificuldade de saber qual decisão tomar' },
  { id: 'clareza', rotulo: 'Sinto que falta clareza sobre o próximo passo' },
]

const PERGUNTAS_ABERTAS = [
  { id: 'papel', pergunta: 'Qual seu papel na empresa?', placeholder: 'Sócio, fundador, gestor...' },
  { id: 'peso', pergunta: 'O que mais pesa hoje?', placeholder: 'O que ocupa sua mente quando você para?' },
  { id: 'decisao', pergunta: 'Qual decisão está mais difícil?', placeholder: 'Aquela que você adia porque não tem certeza...' },
  { id: 'futuro', pergunta: 'O que você gostaria que sua empresa tivesse daqui alguns meses?', placeholder: 'Como ela estaria diferente?' },
]

function gerarApoiadorId(): string {
  const num = Math.floor(1 + Math.random() * 999999)
  return `AP-#${String(num).padStart(6, '0')}`
}

function gerarRevelacao(respostas: Record<string, string>): { forca: string; atencao: string; oportunidade: string } {
  const situacao = respostas.situacao ?? ''
  const peso = (respostas.peso ?? '').toLowerCase()

  const forcas: Record<string, string> = {
    ideias: 'Você tem visão. Empresários com muitas ideias geralmente enxergam possibilidades que outros não veem.',
    trabalho: 'Sua dedicação é sua maior força. Empresas crescem porque alguém se dedica profundamente a elas.',
    dependente: 'Você construiu algo que funciona por sua causa. Isso mostra capacidade de execução.',
    decisao: 'Reconhecer a dificuldade de decidir já é um sinal de maturidade. Muitos empresários decidem sem pensar.',
    clareza: 'Você sabe que falta clareza — e isso é mais do que a maioria percebe sobre si mesma.',
  }

  const atencaoPadrao = 'Existe uma concentração grande de decisões em você. Quando tudo passa por uma pessoa, a empresa fica limitada ao que uma pessoa consegue fazer.'
  const atencaoPorSituacao: Record<string, string> = {
    ideias: 'Muitas ideias sem organização geram dispersão. O risco não é falta de criatividade — é falta de foco.',
    trabalho: 'Trabalhar muito sem evoluir proporcionalmente pode indicar que o esforço está no lugar errado.',
    dependente: 'Se a empresa depende de você para tudo, ela não cresce além de você. Esse é o teto invisível.',
    decisao: 'Decisões adiadas custam mais caro do que decisões imperfeitas executadas no tempo certo.',
    clareza: 'Falta de clareza não se resolve com mais informação — se resolve com melhor direcionamento.',
  }

  return {
    forca: forcas[situacao] ?? 'Você demonstra grande capacidade de adaptação aos desafios da sua empresa.',
    atencao: atencaoPorSituacao[situacao] ?? atencaoPadrao,
    oportunidade: 'Existe espaço para transformar sua experiência em processo. Empresários que param para refletir sobre a própria empresa tomam decisões melhores — e a Ponte pode ajudar nisso.',
  }
}

function gerarDimensoes(): { label: string; valor: number; descricao: string }[] {
  return [
    { label: 'Clareza', valor: 35, descricao: 'Você sabe o que quer, mas o caminho ainda precisa ficar mais nítido.' },
    { label: 'Conhecimento', valor: 45, descricao: 'Você já identifica o que precisa mudar — isso é mais do que a maioria faz.' },
    { label: 'Capacidade de decisão', valor: 30, descricao: 'Reconhecer as decisões importantes é o primeiro passo.' },
    { label: 'Organização', valor: 25, descricao: 'A organização aparece como um ponto em construção.' },
    { label: 'Aprendizado', valor: 50, descricao: 'Você está aberto a enxergar sua empresa de fora.' },
  ]
}

type Etapa = 'situacao' | 'perguntas' | 'revelacao'

export default function DiagnosticoPage() {
  const [etapa, setEtapa] = useState<Etapa>('situacao')
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostas, setRespostas] = useState<Record<string, string>>({})
  const [valorInput, setValorInput] = useState('')
  const [apoiadorId] = useState(gerarApoiadorId)

  // Revelação
  const revelacao = gerarRevelacao(respostas)
  const dimensoes = gerarDimensoes()

  // Tela de revelação
  if (etapa === 'revelacao') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4">
        <div className="max-w-lg mx-auto space-y-8 py-8 animate-fade-in">
          <div className="text-center space-y-3">
            <AvatarPonte state="success" size="lg" />
            <p className="text-xs text-muted-foreground italic">— Primeiro Retrato da Sua Empresa —</p>
            <h1 className="text-xl font-semibold tracking-tight">
              Depois dessa conversa, percebemos algo
            </h1>
          </div>

          {/* 3 itens da revelação */}
          <div className="space-y-4">
            <div className="rounded-xl border-l-4 border-green-400/30 bg-card p-4 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">Uma força</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{revelacao.forca}</p>
            </div>
            <div className="rounded-xl border-l-4 border-amber-400/30 bg-card p-4 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">Um ponto de atenção</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{revelacao.atencao}</p>
            </div>
            <div className="rounded-xl border-l-4 border-primary/30 bg-card p-4 space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">Uma oportunidade</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{revelacao.oportunidade}</p>
            </div>
          </div>

          {/* Retrato Inicial */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="text-center space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Retrato Inicial da Empresa</p>
              <p className="text-[10px] text-muted-foreground/60">Isso não é uma avaliação. É apenas o primeiro retrato.</p>
            </div>
            <div className="space-y-3">
              {dimensoes.map((d) => (
                <div key={d.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{d.label}</span>
                    <span className="font-medium">{d.valor}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary">
                    <div className="h-1.5 rounded-full bg-primary/70 transition-all" style={{ width: `${d.valor}%` }} />
                  </div>
                  <p className="text-[10px] text-muted-foreground/60">{d.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Apoiador */}
          <div className="text-center border-2 border-dashed border-primary/20 rounded-xl bg-card p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Você é o</p>
            <p className="text-xl font-bold tracking-widest text-primary">Apoiador {apoiadorId}</p>
            <p className="text-[10px] text-muted-foreground">Você esteve aqui quando a Ponte estava sendo construída.</p>
          </div>

          {/* 3 caminhos */}
          <div className="space-y-2">
            <Link
              href="/diagnostico"
              className="block w-full rounded-xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-center"
            >
              Quero continuar explorando
            </Link>
            <Link
              href="/criar-conta"
              className="block w-full rounded-xl bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors text-center"
            >
              Quero criar minha jornada
            </Link>
            <div className="text-center pt-2">
              <Link
                href="/criar-conta"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                Quero ser Fundador — os primeiros 1000 empresários que estão construindo uma nova forma de pensar empresas
              </Link>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground text-center">
            Apoiador {apoiadorId} reservado. Ao criar conta, seu número será preservado.
          </p>
        </div>
      </div>
    )
  }

  // Tela de múltipla escolha
  if (etapa === 'situacao') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center space-y-3">
            <AvatarPonte state="breathing" size="md" />
            <p className="text-xs text-muted-foreground">Antes de qualquer coisa, quero entender um pouco sobre você.</p>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-medium text-center text-muted-foreground">
              Qual dessas situações mais parece sua realidade hoje?
            </h2>
            <div className="space-y-2">
              {SITUACOES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setRespostas(r => ({ ...r, situacao: s.id }))
                    setEtapa('perguntas')
                  }}
                  className="w-full text-left rounded-xl border border-border bg-background px-4 py-3 text-sm hover:border-primary/50 hover:bg-muted/30 transition-colors"
                >
                  {s.rotulo}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground text-center">
            Suas respostas não são salvas. É apenas um momento de reflexão.
          </p>
        </div>
      </div>
    )
  }

  // Perguntas abertas
  const p = PERGUNTAS_ABERTAS[perguntaAtual]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-3">
          <AvatarPonte state="thinking" size="md" />
          <p className="text-xs text-muted-foreground">Quero entender um pouco melhor.</p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{perguntaAtual + 1} de {PERGUNTAS_ABERTAS.length}</span>
            <div className="flex gap-0.5">
              {PERGUNTAS_ABERTAS.map((_, i) => (
                <div key={i} className={`h-1 w-6 rounded-full ${i <= perguntaAtual ? 'bg-primary/50' : 'bg-secondary'}`} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">{p.pergunta}</h2>
            <textarea
              value={valorInput}
              onChange={e => setValorInput(e.target.value)}
              placeholder={p.placeholder}
              className="w-full rounded-xl border bg-background p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[100px]"
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); avancar() } }}
            />
            <button
              onClick={avancar}
              disabled={!valorInput.trim()}
              className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {perguntaAtual < PERGUNTAS_ABERTAS.length - 1 ? 'Continuar' : 'Ver meu retrato'}
            </button>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground text-center">
          Suas respostas não são salvas. É apenas um momento de reflexão.
        </p>
      </div>
    </div>
  )

  function avancar() {
    if (!valorInput.trim()) return
    setRespostas(r => ({ ...r, [p.id]: valorInput }))
    setValorInput('')
    if (perguntaAtual < PERGUNTAS_ABERTAS.length - 1) {
      setPerguntaAtual(p => p + 1)
    } else {
      setEtapa('revelacao')
    }
  }
}
