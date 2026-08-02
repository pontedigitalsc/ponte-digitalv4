import type { Fluxo } from '@/engine/tipos'

// P52 — A primeira conversa segue a estrutura de conselheiro em 5 estágios.
// As perguntas não mudaram (mesmos IDs, mesmo texto); o que mudou é a ordem
// e o estágio de cada uma. A conversa agora caminha:
//   Contexto → Realidade → Tensão → Evolução → Próximo Movimento
export const PRIMEIRA_CONVERSA: Fluxo = {
  id: 'primeira-conversa',
  nome: 'Primeira Conversa',
  versao: 4,
  etapas: [
    // ─── ESTÁGIO 1 — CONTEXTO: movimento, quem é e como vive a empresa ──────
    { id: 'historia.nascer',   pergunta: 'Como sua empresa nasceu?',                    tipo: 'texto', estagio: 'contexto' },
    { id: 'historia.comecar',  pergunta: 'O que fez você começar?',                     tipo: 'texto', estagio: 'contexto' },
    { id: 'historia.momento',  pergunta: 'Qual momento mais marcou essa trajetória até hoje?', tipo: 'texto', estagio: 'contexto' },
    { id: 'rotina.dia',        pergunta: 'Quando seu dia costuma começar?',             tipo: 'texto', estagio: 'contexto' },

    // ─── ESTÁGIO 2 — REALIDADE: percepção vs fato, como a empresa funciona ───
    { id: 'rotina.pressao',    pergunta: 'Em que momento do dia você sente maior pressão?', tipo: 'texto', estagio: 'realidade' },
    { id: 'rotina.energia',    pergunta: 'O que mais consumiu sua energia esta semana?', tipo: 'texto', estagio: 'realidade' },
    { id: 'rotina.cabeca',     pergunta: 'O que mais ocupa sua cabeça hoje?',           tipo: 'texto', estagio: 'realidade' },
    { id: 'rotina.tranquilo',  pergunta: 'Quando foi a última vez que você terminou o dia tranquilo?', tipo: 'texto', estagio: 'realidade' },
    { id: 'empresa.clientes',  pergunta: 'Hoje, o que mais faz clientes voltarem?',     tipo: 'texto', estagio: 'realidade' },

    // ─── ESTÁGIO 3 — TENSÃO: pontos cegos, o que trava e o que dói ──────────
    { id: 'empresa.crescer',   pergunta: 'O que normalmente impede sua empresa de crescer?', tipo: 'texto', estagio: 'tensao' },
    { id: 'empresa.decisao',   pergunta: 'Quando precisa tomar uma decisão importante, como descobre se pode investir?', tipo: 'texto', estagio: 'tensao' },
    { id: 'historia.mudanca',  pergunta: 'Se pudesse voltar no início, o que faria diferente?', tipo: 'texto', estagio: 'tensao' },
    { id: 'frente.diferente',  pergunta: 'O que você faria diferente se pudesse voltar ao início da semana?', tipo: 'texto', estagio: 'tensao' },

    // ─── ESTÁGIO 4 — EVOLUÇÃO: aprendizado como patrimônio ──────────────────
    { id: 'historia.orgulho',  pergunta: 'Do que você mais se orgulha no negócio hoje?', tipo: 'texto', estagio: 'evolucao' },
    { id: 'frente.funcionou',  pergunta: 'O que funcionou melhor do que esperava ultimamente?', tipo: 'texto', estagio: 'evolucao' },
    { id: 'frente.surpresa',   pergunta: 'Algum cliente surpreendeu você esta semana?',  tipo: 'texto', estagio: 'evolucao' },

    // ─── ESTÁGIO 5 — PRÓXIMO MOVIMENTO: direção ─────────────────────────────
    { id: 'frente.proximo',    pergunta: 'Qual o objetivo principal para os próximos 6 meses?', tipo: 'texto', estagio: 'proximo_movimento' },
    { id: 'empresa.multiplicar', pergunta: 'Qual tipo de cliente você gostaria de multiplicar?', tipo: 'texto', estagio: 'proximo_movimento' },
    { id: 'empresa.horalivre', pergunta: 'Se tivesse uma hora livre por dia, onde investiria?', tipo: 'texto', estagio: 'proximo_movimento' },
  ],
}

export const FLUXOS: Record<string, Fluxo> = {
  'primeira-conversa': PRIMEIRA_CONVERSA,
}
