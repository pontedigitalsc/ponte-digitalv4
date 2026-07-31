import type { Fluxo } from '@/engine/tipos'

export const PRIMEIRA_CONVERSA: Fluxo = {
  id: 'primeira-conversa',
  nome: 'Primeira Conversa',
  versao: 3,
  etapas: [
    // ─── ATO 1 — Conhecer a História ─────────────────────────────────────────
    { id: 'historia.nascer',   pergunta: 'Como sua empresa nasceu?',                                          tipo: 'texto' },
    { id: 'historia.comecar',  pergunta: 'O que fez você começar?',                                           tipo: 'texto' },
    { id: 'historia.momento',  pergunta: 'Qual momento mais marcou essa trajetória até hoje?',                 tipo: 'texto' },
    { id: 'historia.orgulho',  pergunta: 'Do que você mais se orgulha no negócio hoje?',                      tipo: 'texto' },
    { id: 'historia.mudanca',  pergunta: 'Se pudesse voltar no início, o que faria diferente?',                tipo: 'texto' },

    // ─── ATO 2 — Entender a Rotina ───────────────────────────────────────────
    { id: 'rotina.dia',        pergunta: 'Quando seu dia costuma começar?',                                   tipo: 'texto' },
    { id: 'rotina.pressao',    pergunta: 'Em que momento do dia você sente maior pressão?',                   tipo: 'texto' },
    { id: 'rotina.cabeca',     pergunta: 'O que mais ocupa sua cabeça hoje?',                                 tipo: 'texto' },
    { id: 'rotina.tranquilo',  pergunta: 'Quando foi a última vez que você terminou o dia tranquilo?',         tipo: 'texto' },
    { id: 'rotina.energia',    pergunta: 'O que mais consumiu sua energia esta semana?',                       tipo: 'texto' },

    // ─── ATO 3 — Entender a Empresa ──────────────────────────────────────────
    { id: 'empresa.clientes',      pergunta: 'Hoje, o que mais faz clientes voltarem?',                      tipo: 'texto' },
    { id: 'empresa.multiplicar',   pergunta: 'Qual tipo de cliente você gostaria de multiplicar?',           tipo: 'texto' },
    { id: 'empresa.crescer',       pergunta: 'O que normalmente impede sua empresa de crescer?',             tipo: 'texto' },
    { id: 'empresa.horalivre',     pergunta: 'Se tivesse uma hora livre por dia, onde investiria?',          tipo: 'texto' },
    { id: 'empresa.decisao',       pergunta: 'Quando precisa tomar uma decisão importante, como descobre se pode investir?', tipo: 'texto' },

    // ─── ATO 4 — Olhando para Frente ─────────────────────────────────────────
    { id: 'frente.surpresa',       pergunta: 'Algum cliente surpreendeu você esta semana?',                   tipo: 'texto' },
    { id: 'frente.funcionou',      pergunta: 'O que funcionou melhor do que esperava ultimamente?',           tipo: 'texto' },
    { id: 'frente.diferente',      pergunta: 'O que você faria diferente se pudesse voltar ao início da semana?', tipo: 'texto' },
    { id: 'frente.proximo',        pergunta: 'Qual o objetivo principal para os próximos 6 meses?',           tipo: 'texto' },
  ],
}

export const FLUXOS: Record<string, Fluxo> = {
  'primeira-conversa': PRIMEIRA_CONVERSA,
}
