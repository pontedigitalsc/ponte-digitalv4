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
  return `#${String(num).padStart(6, '0')}`
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

function gerarCarta(respostas: Record<string, string>, revelacao: { forca: string; atencao: string; oportunidade: string }): { observacao: string; padrao: string; movimento: string; continuidade: string } {
  const peso = (respostas.peso ?? '').toLowerCase()
  let observacao = 'Você dedicou tempo para pensar sobre sua empresa. Isso já é um movimento que poucos fazem.'
  if (peso.includes('tempo') || peso.includes('sozinho') || peso.includes('sobrecar')) {
    observacao = 'Você carrega muito sozinho. Notei que você descreve sua empresa como algo que depende diretamente de você.'
  } else if (peso.includes('equipe') || peso.includes('pessoa') || peso.includes('funcion')) {
    observacao = 'A questão de equipe aparece com força. Você parece sentir que a empresa depende de mais pessoas, mas isso ainda não aconteceu.'
  } else if (peso.includes('dinheiro') || peso.includes('financeiro') || peso.includes('faturamento')) {
    observacao = 'A preocupação financeira aparece no que você descreveu — mas ela parece ser a consequência, não a causa.'
  }

  return {
    observacao,
    padrao: revelacao.atencao,
    movimento: revelacao.oportunidade,
    continuidade: 'Hoje apareceu um padrão interessante. Quero observar isso junto com você durante esta semana. Na próxima conversa quero descobrir se algo mudou.',
  }
}

function gerarRetrato(situacao: string): { titulo: string; texto: string }[] {
  const porSituacao: Record<string, { titulo: string; texto: string }[]> = {
    ideias: [
      { titulo: 'Sua força', texto: 'Visão não falta. Você enxerga possibilidades que outros empresários nem notam.' },
      { titulo: 'Seu peso', texto: 'Muitas ideias sem uma ordem viram dispersão — e o esforço se divide em tudo ao mesmo tempo.' },
      { titulo: 'O primeiro passo', texto: 'Escolher uma única ideia para priorizar nesta semana já muda o jogo.' },
    ],
    trabalho: [
      { titulo: 'Sua força', texto: 'Dedicação é rara. Empresas crescem porque alguém se dedica profundamente a elas.' },
      { titulo: 'Seu peso', texto: 'Trabalhar muito sem evoluir na mesma medida costuma significar que o esforço está no lugar errado.' },
      { titulo: 'O primeiro passo', texto: 'Observar onde as horas realmente vão — por uma semana, só observando — costuma revelar o que trava.' },
    ],
    dependente: [
      { titulo: 'Sua força', texto: 'Você construiu algo que funciona pela sua capacidade de execução.' },
      { titulo: 'Seu peso', texto: 'Quando tudo passa por uma pessoa, a empresa fica limitada ao que essa pessoa consegue fazer. Esse é o teto invisível.' },
      { titulo: 'O primeiro passo', texto: 'Escolher uma única tarefa para dividir ou simplificar já alivia o peso de amanhã.' },
    ],
    decisao: [
      { titulo: 'Sua força', texto: 'Reconhecer a dificuldade de decidir é sinal de maturidade. Muitos decidem sem pensar.' },
      { titulo: 'Seu peso', texto: 'Decisões adiadas custam mais caro do que decisões imperfeitas executadas no tempo certo.' },
      { titulo: 'O primeiro passo', texto: 'Nomear a decisão mais difícil — em uma frase — já tira metade do peso dela.' },
    ],
    clareza: [
      { titulo: 'Sua força', texto: 'Perceber a falta de clareza já é mais do que a maioria percebe sobre si mesma.' },
      { titulo: 'Seu peso', texto: 'Falta de clareza não se resolve com mais informação — se resolve com melhor direcionamento.' },
      { titulo: 'O primeiro passo', texto: 'Definir o próximo passo concreto — mesmo pequeno — devolve a sensação de direção.' },
    ],
  }
  return porSituacao[situacao] ?? [
    { titulo: 'Sua força', texto: 'Você demonstra capacidade de adaptação aos desafios da sua empresa.' },
    { titulo: 'Seu peso', texto: 'Existe uma concentração grande de decisões em você — e a empresa sente isso.' },
    { titulo: 'O primeiro passo', texto: 'Escolher uma única coisa para observar durante uma semana é o menor movimento que muda a direção.' },
  ]
}

type Etapa = 'situacao' | 'perguntas' | 'revelacao' | 'retrato' | 'carta'

export default function DiagnosticoPage() {
  const [etapa, setEtapa] = useState<Etapa>('situacao')
  const [perguntaAtual, setPerguntaAtual] = useState(0)
  const [respostas, setRespostas] = useState<Record<string, string>>({})
  const [valorInput, setValorInput] = useState('')
  const [apoiadorId] = useState(gerarApoiadorId)

  const revelacao = gerarRevelacao(respostas)
  const carta = gerarCarta(respostas, revelacao)
  const retrato = gerarRetrato(respostas.situacao ?? '')

  // ETAPA CARTA — valor entregue, cadastro só depois
  if (etapa === 'carta') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4">
        <div className="max-w-lg mx-auto space-y-8 py-8 animate-fade-in">
          <div className="text-center space-y-3">
            <AvatarPonte state="success" size="lg" />
            <p className="text-xs text-muted-foreground italic">— Carta para sua empresa —</p>
            <h1 className="text-xl font-semibold tracking-tight">Olhando para sua empresa</h1>
          </div>

          <div className="rounded-xl border bg-card p-6 space-y-5 text-sm leading-relaxed">
            <div className="border-l-2 border-primary/30 pl-4 py-2">
              <p className="font-semibold text-foreground">O que mais me chamou atenção hoje</p>
              <p className="mt-1 text-muted-foreground italic">&ldquo;{carta.observacao}&rdquo;</p>
            </div>
            <div className="border-l-2 border-amber-500/30 pl-4 py-2">
              <p className="font-semibold text-foreground">Existe um padrão aparecendo</p>
              <p className="mt-1 text-muted-foreground">{carta.padrao}</p>
            </div>
            <div className="border-l-2 border-green-500/30 pl-4 py-2">
              <p className="font-semibold text-foreground">O menor movimento que pode melhorar sua próxima semana</p>
              <p className="mt-1 text-muted-foreground">{carta.movimento}</p>
            </div>
            <div className="mt-4 pt-4 border-t space-y-2">
              <p className="font-semibold">O que quero observar na próxima conversa</p>
              <p className="text-xs text-muted-foreground italic leading-relaxed">{carta.continuidade}</p>
            </div>
          </div>

          {/* FASE 5 — convite, não assinatura */}
          <div className="text-center space-y-3">
            <p className="text-sm font-medium">
              Gostaria que eu acompanhasse sua empresa daqui para frente?
            </p>
            <p className="text-xs text-muted-foreground">
              Criar sua jornada significa continuar essa conversa — e construir a história da sua empresa com a Ponte.
            </p>
          </div>

          <div className="space-y-2">
            <Link
              href="/criar-conta"
              className="block w-full rounded-xl bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors text-center"
            >
              Criar minha Jornada
            </Link>
            <Link
              href="/"
              className="block w-full rounded-xl border border-border bg-card px-6 py-4 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors text-center"
            >
              Continuar depois
            </Link>
            <div className="text-center pt-2">
              <Link
                href="/fundador"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
              >
                Conhecer o Founder
              </Link>
            </div>
          </div>

          <p className="text-[10px] text-muted-foreground text-center">
            Você é o Apoiador {apoiadorId}. Ao criar sua jornada, este número será preservado.
          </p>
        </div>
      </div>
    )
  }

  // ETAPA RETRATO — fotografia inicial
  if (etapa === 'retrato') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4">
        <div className="max-w-lg mx-auto space-y-8 py-8 animate-fade-in">
          <div className="text-center space-y-3">
            <AvatarPonte state="success" size="lg" />
            <p className="text-xs text-muted-foreground italic">— Retrato Inicial da Sua Empresa —</p>
            <h1 className="text-xl font-semibold tracking-tight">O primeiro retrato da sua empresa</h1>
          </div>

          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className="text-center space-y-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Retrato inicial</p>
              <p className="text-[10px] text-muted-foreground/60">Como sua empresa pensa hoje, onde existe força, onde existe peso.</p>
            </div>
            <div className="space-y-3">
              {retrato.map((r) => (
                <div key={r.titulo} className="rounded-lg border-l-2 border-primary/30 bg-secondary/30 pl-4 py-3">
                  <p className="text-xs font-medium text-foreground">{r.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.texto}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center border-2 border-dashed border-primary/20 rounded-xl bg-card p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Você é o</p>
            <p className="text-2xl font-bold tracking-widest text-primary">Apoiador {apoiadorId}</p>
            <p className="text-[10px] text-muted-foreground">Você esteve aqui quando a Ponte estava sendo construída.</p>
          </div>

          <button
            onClick={() => setEtapa('carta')}
            className="w-full rounded-xl bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
          >
            Quero receber minha carta
          </button>
        </div>
      </div>
    )
  }

  // ETAPA REVELAÇÃO — três observações
  if (etapa === 'revelacao') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 p-4">
        <div className="max-w-lg mx-auto space-y-8 py-8 animate-fade-in">
          <div className="text-center space-y-3">
            <AvatarPonte state="speaking" size="lg" />
            <p className="text-xs text-muted-foreground italic">— Primeira observação —</p>
            <h1 className="text-xl font-semibold tracking-tight">
              Depois dessa conversa, percebemos três coisas sobre sua empresa
            </h1>
          </div>

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

          <button
            onClick={() => setEtapa('retrato')}
            className="w-full rounded-xl bg-primary px-6 py-4 text-sm font-medium text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
          >
            Ver meu retrato inicial
          </button>
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
              {perguntaAtual < PERGUNTAS_ABERTAS.length - 1 ? 'Continuar' : 'Ver o que percebi'}
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
