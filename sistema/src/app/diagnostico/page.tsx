'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AvatarPonte } from '@/components/ui/avatar'

const PERGUNTAS = [
  { id: 'papel', pergunta: 'Quem é você na empresa?', placeholder: 'Sócio, fundador, gestor...' },
  { id: 'peso', pergunta: 'O que mais pesa hoje?', placeholder: 'O que ocupa sua mente quando você para?', dica: 'Ex: falta de tempo, equipe, dinheiro, decisões difíceis' },
  { id: 'decisao', pergunta: 'Qual decisão está mais difícil?', placeholder: 'Aquela que você adia porque não tem certeza...', dica: 'Ex: contratar, demitir, mudar de estratégia, investir' },
  { id: 'melhorar', pergunta: 'O que você sente que poderia melhorar?', placeholder: 'Se pudesse mudar algo hoje, o que seria?', dica: 'Ex: organização, foco, processos, equipe' },
  { id: 'futuro', pergunta: 'O que você gostaria que sua empresa tivesse daqui alguns meses?', placeholder: 'Como ela estaria diferente?', dica: 'Ex: mais estável, com equipe, menos dependente de você' },
]

function gerarApoiadorId(): string {
  const num = Math.floor(100000 + Math.random() * 900000)
  return `AP-${num}`
}

function gerarRevelacao(respostas: Record<string, string>): string[] {
  const linhas: string[] = [
    'Com poucas respostas já percebemos algo importante.',
    'Sua maior dificuldade parece não ser falta de esforço.',
  ]

  const peso = (respostas.peso ?? '').toLowerCase()
  if (peso.includes('tempo') || peso.includes('sozinho') || peso.includes('sobrecar')) {
    linhas.push('Você carrega muito sozinho. O padrão que aparece é de um empresário que cresceu, mas ainda opera como se fosse o início.')
  } else if (peso.includes('equipe') || peso.includes('pessoa') || peso.includes('funcion')) {
    linhas.push('A questão de equipe aparece forte. Talvez o verdadeiro desafio não seja encontrar pessoas, mas confiar que elas podem executar.')
  } else if (peso.includes('dinheiro') || peso.includes('financeiro') || peso.includes('faturamento')) {
    linhas.push('A preocupação financeira é legítima. Mas o padrão sugere que o problema não é quanto entra — é como você decide onde colocar o que tem.')
  } else {
    linhas.push('O padrão que aparece é de uma empresa que precisa transformar esforço em clareza.')
  }

  linhas.push('Isso não é um diagnóstico. É apenas o primeiro retrato baseado no pouco que conhecemos.')
  return linhas
}

function gerarDimensoes(respostas: Record<string, string>): { label: string; valor: number; descricao: string }[] {
  const peso = (respostas.peso ?? '').length
  const dec = (respostas.decisao ?? '').length
  const mel = (respostas.melhorar ?? '').length
  const fut = (respostas.futuro ?? '').length

  return [
    { label: 'Clareza', valor: Math.min(85, 35 + fut * 3), descricao: 'Você sabe o que quer, mesmo que o caminho ainda não esteja totalmente claro.' },
    { label: 'Conhecimento', valor: Math.min(85, 40 + mel * 2), descricao: 'Você já identifica o que precisa mudar — isso é mais do que a maioria dos empresários faz.' },
    { label: 'Capacidade de decisão', valor: Math.min(85, 30 + dec * 3), descricao: 'Você reconhece as decisões importantes. O próximo passo é ter mais segurança para tomá-las.' },
    { label: 'Organização', valor: Math.min(85, 25 + peso * 2), descricao: 'A organização aparece como um ponto em construção — algo que a Ponte pode ajudar.' },
    { label: 'Aprendizado', valor: Math.min(85, 45 + fut * 2), descricao: 'Você está aberto a enxergar sua empresa de fora. Essa disposição já é um diferencial.' },
  ]
}

export default function DiagnosticoPage() {
  const [etapa, setEtapa] = useState<'perguntas' | 'revelacao'>('perguntas')
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostas, setRespostas] = useState<Record<string, string>>({})
  const [valorInput, setValorInput] = useState('')
  const [apoiadorId] = useState(gerarApoiadorId)

  const avancar = () => {
    if (!valorInput.trim()) return
    const p = PERGUNTAS[perguntaAtual]
    setRespostas(r => ({ ...r, [p.id]: valorInput }))
    setValorInput('')
    if (perguntaAtual < PERGUNTAS.length - 1) {
      setPerguntaAtual(p => p + 1)
    } else {
      setEtapa('revelacao')
    }
  }

  if (etapa === 'revelacao') {
    const revelacao = gerarRevelacao(respostas)
    const dimensoes = gerarDimensoes(respostas)

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
        <div className="w-full max-w-lg space-y-8 animate-fade-in">
          <div className="text-center space-y-3">
            <AvatarPonte state="success" size="lg" />
            <p className="text-xs text-muted-foreground italic">— Retrato Inicial da Empresa —</p>
            <h1 className="text-xl font-semibold tracking-tight">
              Com poucas respostas já percebemos algo
            </h1>
          </div>

          {/* Revelação */}
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4 py-2">
            {revelacao.map((linha, i) => (
              <p key={i} className={i === 1 || i === 2 ? 'text-foreground font-medium' : ''}>{linha}</p>
            ))}
          </div>

          {/* Retrato Inicial */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Retrato Inicial da Empresa</p>
            <p className="text-[10px] text-muted-foreground/60 -mt-2">Isso não é uma avaliação. É apenas o primeiro retrato baseado no pouco que conhecemos.</p>
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
          <div className="text-center border rounded-xl bg-card p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Você é o</p>
            <p className="text-lg font-bold tracking-wider text-primary">Apoiador {apoiadorId}</p>
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
              className="block w-full rounded-xl bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors text-center"
            >
              Quero criar minha jornada
            </Link>
            <Link
              href="/criar-conta"
              className="block w-full rounded-xl border border-primary/30 bg-primary/5 px-6 py-4 text-sm text-primary hover:bg-primary/10 transition-colors text-center"
            >
              Quero ser Fundador — os primeiros 1000 empresários que estão construindo uma nova forma de pensar empresas
            </Link>
          </div>

          <p className="text-[10px] text-muted-foreground text-center">
            Apoiador #{apoiadorId} reservado. Ao criar conta, seu número será preservado.
          </p>
        </div>
      </div>
    )
  }

  const p = PERGUNTAS[perguntaAtual]

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30 p-4">
      <div className="w-full max-w-lg space-y-8">
        <div className="text-center space-y-3">
          <AvatarPonte state="breathing" size="md" />
          <p className="text-xs text-muted-foreground">Antes de qualquer coisa, quero entender um pouco sobre você.</p>
        </div>

        <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>{perguntaAtual + 1} de {PERGUNTAS.length}</span>
            <div className="flex gap-0.5">
              {PERGUNTAS.map((_, i) => (
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
            {p.dica && (
              <p className="text-[10px] text-muted-foreground/60">{p.dica}</p>
            )}
            <button
              onClick={avancar}
              disabled={!valorInput.trim()}
              className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {perguntaAtual < PERGUNTAS.length - 1 ? 'Continuar' : 'Ver meu retrato'}
            </button>
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground text-center">
          Suas respostas não são salvas. Este é apenas um momento de reflexão.
        </p>
      </div>
    </div>
  )
}
