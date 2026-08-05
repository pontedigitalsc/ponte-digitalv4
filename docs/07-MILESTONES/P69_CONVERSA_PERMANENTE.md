# P69 — Conversa Permanente

**Data:** 4 de agosto de 2026
**STATUS:** IMPLEMENTADO (nascimento do hábito e da relação contínua — Agenda Inteligente na abertura da Ponte).

> A Ponte Digital não é um lugar onde você entra para responder perguntas. É um lugar que
> acompanha continuamente a história da sua empresa e sempre mostra o que realmente merece
> sua atenção antes da próxima decisão.
>
> **A Ponte não depende do empresário lembrar dela. Ela lembra do empresário.**

---

## 1. Problema

Até o P69, a Ponte era um sistema de consultas: o empresário entrava quando lembrava e a
primeira tela era o painel (dashboard). A conversa parecia reiniciar a cada visita. Não havia
condução da continuidade.

O P69 muda o princípio: **a Ponte conduz a continuidade**. Ao abrir, o empresário não deveria
pensar "o que vou fazer dentro da Ponte?" — ele deveria encontrar "o que realmente merece
minha atenção hoje". Isso cria retenção por **utilidade**, não por obrigação.

## 2. Princípios absolutos

- **A Ponte nunca interrompe** sem uma razão legítima baseada na história daquela empresa.
- **Nunca envia notificação vazia.** Nunca diz "você está há X dias sem acessar" — isso é
  comportamento de aplicativo, não de conselheiro.
- **Nunca cria tarefa artificial**, agenda manual, calendário, sistema de tarefas, notificações
  genéricas ou gamificação.
- **Nunca há mais que 3 assuntos** na abertura, e a abertura inteira dura menos de um minuto.
- **Agenda nunca vazia por insistir:** se não há motivo, a Ponte mostra apenas a mensagem
  gentil de disponibilidade.

## 3. O que P69 entrega

### 3.1 Agenda Inteligente (`motor-continuacao.ts`)

Nova engine dedicada — a `AgendaInteligenteEngine` (implementada como `montarAgendaDoDia`).
Ela decide o que merece atenção **hoje**. Nunca por data — sempre por **contexto** (a história
daquela empresa). É **determinística** (sem IA): a decisão nasce de dados e memória reais,
coerente com "a IA é interface, não cérebro".

Critérios, em ordem de peso:

1. **Decisão acompanhada sem retorno (P68)** — decisões vivas (`PENDENTE`/`EM_ANDAMENTO`) sem
   atualização há ≥ 3 dias viram *"Há uma decisão importante que ainda não sabemos como
   terminou."* (prioridade Alta ≥ 7 dias / Média ≥ 3). Dias recentes são respeitados: logo
   após nascer a decisão ainda está sendo pensada — voltar antes seria insistência.
2. **Hipótese importante não validada (P65/P66)** — hipóteses ativas (impacto alto/médio)
   ainda não validadas: *"Eu continuo acreditando em algo sobre sua empresa... Você ainda
   sente isso?"* (Alta se impacto alto).
3. **Evolução** — passou tempo desde a última conversa (≥ 7 dias) e há o que retomar via
   `montarContinuidadeConversa`: a frase usa memória recente ("na última conversa você
   contou..."), **nunca** "você está há X dias sem acessar".

Cada item recebe prioridade **Alta/Média/Baixa**, ordena-se por ela e corta-se em no máximo 3.
Se nada resta, `vazia` = true e a mensagem gentil aparece:

> *"Hoje não encontrei nenhum ponto que mereça sua atenção imediata. Mas, se alguma decisão
> importante estiver acontecendo, estou aqui."*

### 3.2 Abertura da Ponte na tela (`abertura-do-dia.tsx`)

Novo componente que renderiza **"Hoje vale conversarmos sobre..."** — por padrão o **primeiro
bloco** da home, **antes de qualquer módulo** (o Ritual Diário foi movido para depois). Cada
item é um card clicável com: prioridade, o motivo legítimo, a pergunta e as opções de resposta
(apresentadas como chips — sem criar formulário). O rodapé traz o convite *"Tem alguma decisão
importante acontecendo hoje?"* e o CTA **"Conversar agora"** (`/conversa`).

### 3.3 Continuidade invisível

A abertura não mostra tudo que a Ponte acumula (decisões, hipóteses, mudanças, aprendizados) —
mostra apenas o que merece atenção **hoje**. É a base da retenção por utilidade: a Ponte
conecta a história na hora certa, sem virar painel.

## 4. O que NÃO mudou / não foi criado

- **Nenhuma migration. Nenhuma rota nova. Nenhuma tela/módulo novo.**
- Não foi criado: sistema de tarefas, agenda manual, calendário, notificações genéricas,
  gamificação ou qualquer "você está há X dias sem acessar".
- A arquitetura consolidada não foi alterada — apenas reutilizadas a Memória Viva (P65,
  `montarContinuidadeConversa`/hipóteses), o Conselheiro (P66), a Conversa Permanente (P67) e o
  Ciclo de Decisão (P68, `AcaoCognitiva`).

## 5. Arquivos

- `engine/motor-continuacao.ts` — **novo:** a `AgendaInteligenteEngine` (`montarAgendaDoDia`):
  escolhe os assuntos da abertura por contexto, prioriza, evita repetição (decisão >= 3 dias,
  hipótese ativa, evolução >= 7 dias), corta em 3 e devolve a mensagem de agenda vazia.
- `components/dashboard/abertura-do-dia.tsx` — **novo:** bloco de abertura "Hoje vale
  conversarmos sobre..." com cards clicáveis + convite + CTA "Conversar agora".
- `app/(dashboard)/dashboard/page.tsx` — integração: `montarAgendaDoDia` no `Promise.all` e o
  bloco renderizado como **primeiro** elemento da home.

## 6. Critérios de aceite (P69)

- [x] Ao abrir, a Ponte mostra "Hoje vale conversarmos sobre..." **antes** de qualquer módulo.
- [x] A agenda nasce de contexto/memória da empresa (decisões, hipóteses, evolução), não da data.
- [x] Toda razão é legítima (decisão sem retorno, hipótese não validada, o que retomar); nunca
      "você está há X dias sem acessar".
- [x] Sempre no máximo 3 assuntos; cada um com prioridade Alta/Média/Baixa.
- [x] Agenda vazia é possível — mostra apenas a mensagem gentil de disponibilidade (nunca insiste).
- [x] Abertura dura menos de um minuto e convida a conversar ("Tem alguma decisão acontecendo hoje?").
- [x] Sem migrations, sem rotas/telas/módulos novos, sem tarefas/calendário/gamificação.
- [x] Reutiliza P65 (memória/continuidade), P66 (hipóteses), P67 (conversa), P68 (decisão acompanhada).
- [x] `tsc --noEmit` e `npm run build` limpos.