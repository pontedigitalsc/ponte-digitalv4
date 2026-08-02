# P54 — Experiência Founder V2: Auditoria Total de Valor e Missão

**1 de agosto de 2026**

Aumentar drasticamente o valor percebido em cada interação — sem adicionar módulos. O objetivo do P54 não é criar recursos novos: é garantir que **cada tela faça o empresário terminar pensando melhor do que quando entrou**. A auditoria percorreu conversa, visual, linguagem e recomendações e corrigiu tudo que ainda parecia ferramenta, jargão ou ficha de cadastro.

A pergunta que guiou cada mudança: **essa interação entrega valor antes de pedir alguma coisa?**

---

## Etapas e materialização

### E1 — Primeira conversa reestruturada (versão 5)
`engine/fluxos/primeira-conversa.ts` foi reescrito em 22 perguntas organizadas nos 5 estágios do conselheiro (contexto → realidade → tensão → evolução → próximo movimento), agora **começando pela empresa, não pelo empresário**:

- **Contexto:** qual é a empresa, o que ela faz, há quanto tempo existe, como está vivendo este momento — só então "quem é você dentro dessa história".
- As seleções estratégicas (`empresa.haquanto`, `empresa.momento`, `empresa.preocupacao`) ganharam respostas rápidas para reduzir esforço mental.
- Perguntas que entregam valor antes de pedir resposta (ex.: "Empresas que sabem explicar o que fazem em uma frase atraem melhor o que precisam. Como você explicaria a sua?").
- O mecanismo adaptativo não depende de índices de fluxo: `ESTAGIO_POR_ETAPA` em `conversation-engine.ts` foi atualizado com os novos IDs — a navegação por estágio continua funcionando.

### E2 — Perguntas que entregam valor antes de pedir resposta
Perguntas abertas foram reformuladas para ensinar ou provocar reflexão antes de solicitar a resposta — o empresário aprende algo sobre a própria empresa no ato de responder.

### E3 — Alternativas inteligentes com detalhe opcional
O `QuestionCard` (`components/conversa/question-card.tsx`) foi reescrito: a seleção **preenche o valor** (sem digitação), um campo opcional "Se quiser, conte mais..." permite profundidade quando o empresário quiser, e o botão Continuar só aparece com o valor mínimo preenchido. A página de conversa (`app/conversa/page.tsx`) abre com "Vamos começar entendendo a sua empresa" e reinicia a exibição a cada nova pergunta.

### E4 — Devolutiva que lembra do que foi vivido
`interpretacoes.ts` passou a ler a empresa real (nome, o que faz, há quanto tempo, momento atual, maior preocupação) para gerar observações, pontos de atenção e continuidade que **citam a empresa do empresário** — nunca respostas genéricas.

### E5–E6 — Identidade visual premium
`app/globals.css` e `tailwind.config.ts` ganharam tokens premium (fundo suave, cores institucionais, raio 0.75rem, sombras de card/lift/primary) e utilitárias `.card-premium`, `.card-premium-hover`, `.bg-ponte-gradient`, `.font-display`. Aplicadas na conversa, no Ritual Diário e nas Celebrações do dashboard — a Ponte não parece um sistema de administração.

### E7–E8 — Microcopy humano, zero jargão visível
Auditoria de termos técnicos expostos ao usuário: "leads/pipeline/funil/follow-up" → "negociações/oportunidades/retomar o contato" em dashboard, assistente, engines de ação, contexto, experiência, jornada, memória, workflows e centro de decisão. Botões e mensagens: "Salvar" → "Guardar", "Excluir" → "Remover"/"Remover desta história", empty states reescritos em primeira pessoa ("Ainda não conhecemos nenhum cliente que combine com..."). Microcopy centralizado em `constants/index.ts` (`MICROCOPY`).

### E9 — Reações mais naturais
`reacoes.ts`: reações para os novos IDs da conversa v5 e blocos de reação mais humanos ("Vamos avançar", "Falta muito pouco") — sem "jargão de robô".

### E10 — Primeira Pergunta Aberta (Painel do Fundador)
Recomendação do reconhecimento mantida: a primeira Pergunta Aberta é definida manualmente no Painel do Fundador (acesso ADMIN) — nada é seedado automaticamente, preservando a curadoria humana.

### E11 — Recomendações como orientação de conselheiro
`app/(dashboard)/centro-decisao/page.tsx` reestruturado na narrativa **O que percebemos / Por que importa / O que pode acontecer / Próximo passo**: motivo em destaque, riscos como consequência ("Se não for cuidado: ..."), desconhecidos honestos ("Ainda não sabemos: ...") e o próximo passo sempre visível.

### E12 — Auditoria de telas
Percorridas as telas centrais (conversa, dashboard, centro de decisão, CRM, atendimento, assistente, jornada, histórico). Corrigidos jargões, empty states e microcopy. Nenhuma tela nova adicionada.

### E13 — Auditoria técnica (débitos registrados, não corrigidos agora)
- `components/conversa/micro-reaction.tsx` — `MicroReaction` órfão (sem usos); mantido por enquanto, marcado para remoção.
- `app/diagnostico/page.tsx` — fluxo legado client-side que duplica o propósito da primeira conversa; coexistirá com a conversa v5 até decisão de remoção.
- Dois caminhos de primeira conversa (legado `/diagnostico` + engine `primeira-conversa.ts` v5); o caminho oficial é o engine.

---

## Arquitetura

Nenhum schema novo, nenhum módulo novo, nenhuma tela ERP nova. Tudo reutiliza o patrimônio existente.

- `engine/tipos.ts` — `Etapa.permiteDetalhe` (tipo)
- `engine/fluxos/primeira-conversa.ts` — versão 5 (22 perguntas, empresa primeiro)
- `engine/conversation-engine.ts` — `ESTAGIO_POR_ETAPA` atualizado
- `engine/reacoes.ts` — reações humanizadas
- `engine/interpretacoes.ts` — devolutiva com contexto da empresa
- `components/conversa/question-card.tsx` — seleção que preenche + detalhe opcional
- `app/conversa/page.tsx` — abertura pela empresa + reinício por pergunta
- `app/globals.css` + `tailwind.config.ts` — tokens premium + utilitárias
- `components/dashboard/ritual-diario.tsx` e `celebracao.tsx` — visual premium
- `engine/action-intelligence-engine.ts`, `decision-engine.ts`, `cognitive-context-engine.ts`, `cognitive-experience-engine.ts`, `cognitive-journey-engine.ts`, `cognitive-memory-engine.ts`, `cognitive-workflow-engine.ts` — linguagem empresarial nas strings visíveis
- `components/atendimento/atendimento-shell.tsx`, `components/clientes/cliente-form.tsx`, `components/tarefas/tarefa-item.tsx`, `components/financeiro/transacao-list.tsx`, `components/crm/lead-card.tsx`, `app/(dashboard)/historico/historico-content.tsx` — microcopy humano
- `constants/index.ts` — `MICROCOPY`
- `app/(dashboard)/centro-decisao/page.tsx` — narrativa de conselheiro

## Critérios de aprovação

- ✅ A conversa começa pela empresa e entrega valor antes de coletar dados (E1/E2)
- ✅ Perguntas estratégicas têm alternativas inteligentes com detalhe opcional (E3)
- ✅ A devolutiva cita a empresa real do empresário (E4)
- ✅ Identidade premium consistente na conversa e no dashboard (E5/E6)
- ✅ Nenhum jargão técnico visível ao usuário (E7/E8)
- ✅ Nenhuma tela parece ERP (E5/E7/E12)
- ✅ Recomendações lidas como orientação de conselheiro (E11)
- ✅ Auditoria registrada, débitos documentados (E12/E13)
- ✅ Build e TypeScript limpos
