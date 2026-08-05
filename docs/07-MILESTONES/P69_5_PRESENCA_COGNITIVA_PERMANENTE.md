# P69.5 — A Presença Cognitiva Permanente (Versão Fundacional)

**Data:** 5 de agosto de 2026
**STATUS:** IMPLEMENTADO (a abertura deixou de parecer um dashboard e virou continuidade da conversa).

> Ao abrir a Ponte Digital, o empresário deve sentir imediatamente:
> **"Minha empresa continuou sendo compreendida enquanto eu estava vivendo minha rotina."**

---

## 1. Problema

O P69 entregou a Agenda Inteligente, mas a abertura **ainda parecia um painel de sistema**: o
"Hoje vale conversarmos sobre..." era um aviso com cards, e cards parecem software — não um
conselheiro. A missão deste programa não é adicionar funcionalidades; é transformar a entrada
da Ponte na **experiência mais valiosa do produto**: o empresário não abre módulos, abre uma
conversa contínua.

**Novo princípio:** a Ponte nunca começa perguntando. Ela começa **mostrando que lembra**.

## 2. O que P69.5 entrega

### 2.1 A primeira tela deixou de ser um dashboard

A abertura agora diz, com as palavras do empresário:

> Bom dia, João.
> Enquanto você esteve trabalhando na empresa, algumas coisas continuaram chamando atenção.
> Hoje eu gostaria de conversar sobre os pontos abaixo — não porque sejam urgentes, mas porque
> podem influenciar decisões importantes nas próximas semanas.

### 2.2 Toda abertura contém cinco camadas

1. **CONTINUIDADE** — nunca "bem-vindo"; sempre "na nossa última conversa..." / "desde nossa
   última conversa..." (via `montarContinuidadeConversa`, P52/P65). O empresário sente memória
   imediatamente.
2. **OBSERVAÇÃO** — interpreta, não repete fato: *"O que mais me chamou atenção é que essa
   decisão está em aberto há alguns dias..."*.
3. **CONEXÃO** — liga fatos separados: decisão em aberto + hipótese que continua; ou mais de
   uma decisão empilhada ("talvez exista uma ordem mais segura").
4. **PRIORIDADE** — explica POR QUE conversar (nunca lista tarefas): *"essa decisão pode
   influenciar praticamente as próximas escolhas"*.
5. **CONVITE** — nunca "Conversar agora"; sempre *"Vamos pensar nisso juntos?"* / *"Podemos
   analisar isso agora, quando você quiser."* Parece conversa, não botão.

### 2.3 O empresário nunca vê um card

Os assuntos viram **pequenas conversas** — frases que a Ponte "tem pensado":

> Tenho pensado em uma coisa. Há uma decisão em aberto — "Contratar alguém" — que ainda não
> sabemos como terminou.

Sem cards genéricos, sem listas, sem KPIs como protagonistas, sem "você possui"/"existem"/
"foram encontrados", sem linguagem técnica. As opções aparecem como chips de resposta, e o CTA
final virou *"Vamos pensar nisso juntos."*.

### 2.4 Momentos (surpresa e expectativa)

Cada abertura tem um **momento** escolhido pelo sinal mais forte (determinístico):

- **REVISAR_DECISAO** — decisão antiga (≥ 14 dias): *"Existe uma decisão antiga que talvez
  valha revisitar."*
- **OPORTUNIDADE** — decisão aberta: *"Existe uma decisão importante que ainda não sabemos
  como terminou."*
- **DUVIDA** — hipótese de alto impacto ativa: *"Hoje fiquei com uma dúvida que vale
  conversarmos."*
- **EVOLUCAO** — memória emocional presente: *"Acho que você evoluiu em um ponto importante."*
- **NADA_URGENTE** — nada forte: *"Hoje não encontrei nenhum alerta importante. Isso é uma boa
  notícia."*

### 2.5 Quando não existe nada importante

A abertura **nunca fica vazia**. Sem decisões/hipóteses, a Ponte oferece a pergunta viva
(P52) ou uma reflexão estruturada: *"Mesmo assim fiquei pensando em uma pergunta que vem me
acompanhando: ..."* — a Ponte sempre tem algo inteligente para conversar.

### 2.6 O dashboard vira secundário

Ordem da home: **continuidade da conversa → agenda do dia → reflexões importantes → depois os
módulos** (CRM, financeiro, clientes ficam na navegação). O software desaparece; a conversa
fica na frente.

## 3. O que NÃO mudou / não foi criado

- **Nenhuma migration. Nenhuma rota nova. Nenhuma tela/módulo novo. Nenhuma funcionalidade
  nova** — apenas a reformulação da experiência de abertura existente.
- Não foi criado: sistema de tarefas, agenda manual, calendário, notificações genéricas,
  gamificação, "você está há X dias sem acessar".
- Tudo continua **determinístico (sem IA)**, coerente com "a IA é interface, não cérebro".

## 4. Arquivos

- `engine/motor-continuacao.ts` — **modificado:** agora `montarAberturaPermanente(empresaId,
  nome)`, produzindo as 5 camadas + momento + pequenas conversas + sempre-tem-o-que-dizer
  (mantém as decisões ≥ 3 dias, hipóteses ativas e evolução como critérios).
- `components/dashboard/abertura-do-dia.tsx` — **modificado:** renderização em narrativa
  contínua (sem cards de sistema): saudação com nome, momento, continuidade, observação,
  conexão, prioridade, pequenas conversas e convite final.
- `app/(dashboard)/dashboard/page.tsx` — integração com o nome do usuário para a saudação.

## 5. Critérios de aceite (P69.5)

- [x] A primeira tela não é mais um dashboard: é continuidade da conversa.
- [x] Toda abertura tem as 5 camadas (continuidade, observação, conexão, prioridade, convite).
- [x] A Ponte nunca começa perguntando — começa mostrando que lembra ("na nossa última conversa...").
- [x] O empresário não vê cards de sistema: assuntos são pequenas conversas.
- [x] Cada abertura tem um momento (oportunidade, risco, evolução, dúvida, revisar decisão, nada urgente).
- [x] Conexão liga fatos separados (decisão + hipótese; decisões empilhadas).
- [x] Quando não há nada importante, a abertura nunca fica vazia — oferece a pergunta viva/reflexão.
- [x] Convite parece conversa ("Vamos pensar nisso juntos?"), não botão.
- [x] Sem cards genéricos, listas, KPIs protagonistas, "você possui"/"existem"/"foram encontrados".
- [x] Ordem da home: conversa → agenda → reflexões → módulos (software fica atrás da conversa).
- [x] Sem migrations, sem rotas/telas/módulos/funcionalidades novas; determinístico, sem IA.
- [x] `tsc --noEmit` e `npm run build` limpos.