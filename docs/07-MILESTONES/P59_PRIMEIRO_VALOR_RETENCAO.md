# P59 — Primeiro Valor e Retenção Founder V2

**Data:** 2 de agosto de 2026
**STATUS:** OFICIAL — V2 implementada (a V1 foi entregue no commit `ff511b1`).

> A Ponte não tenta impressionar. Ela **prova utilidade**.
> Pergunta central: _"Se a Ponte desaparecesse amanhã, o empresário sentiria falta?"_

---

## 1. Missão

Transformar a primeira experiência em algo memorável e repetível — **sem adicionar funcionalidades**.
Descobrir com os primeiros usuários: o que faz o empresário pensar "isso me ajudou", o que o faz
voltar, o que o faz confiar e o que o faz querer virar Founder.

## 1.1 V2 — profundidade da sessão e pertencimento

A V2 reforçou a tese "compreender profundamente a história da empresa para decidir melhor":

- **Nova pergunta no fluxo** (`empresa.dependencia`, estágio Tensão): *"Se você precisasse se afastar
  por 30 dias, o que aconteceria com a empresa?"* — expõe dependência do dono e pontos cegos
  (fluxo em `src/engine/fluxos/primeira-conversa.ts` + `ESTAGIO_POR_ETAPA` em `conversation-engine.ts`).
- **Retrato 6 partes não-genérico**: o subtítulo e o "primeiro movimento" usam a resposta sobre
  dependência (análogo ao multiplicador), em `src/engine/retrato-estrategico.ts` +
  `retrato-estrategico-card.tsx`. Nada de texto que sirva para qualquer empresa.
- **Landing** com CTA direto para a sessão (`/conversa`), sem fricção.
- **Área Founder completa** (`/fundador`): tese, como a Ponte aprende, patrimônio, evidências reais
  (apoiadores/founders/sessões), Inteligência Coletiva com gates, roadmap, "o que acreditamos"
  apresentado como hipóteses, CTA WhatsApp e caminho Apoiador → Founder.
- **Rota `/tornar-se-fundador` pública** (antes protegida por sessão) — o pertencimento passa a ser
  alcançável por qualquer pessoa no funil gratuito.

## 2. Etapa 1 — Protocolo Founder 1–10

Protocolo operacional de acompanhamento dos primeiros 10 empresários (`docs/05-OPERATIONS/PROTOCOLO_FOUNDER_1-10.md`):
- **Antes da Ponte:** como administra hoje, decisão mais difícil, maior pressão, o que quer melhorar.
- **Depois da primeira conversa:** o que chamou atenção, o que fez sentido, o que pareceu genérico, o que esperava receber.
- **Depois de 7 dias:** voltou a olhar a empresa? mudou a visão? alguma recomendação ajudou?

Execução **humana** (do founder), com registro por empresário. Critério final: 10 empresários + depoimentos reais.

## 3. Etapa 2 — Clareza Gerada como evidência (não score)

Após a conversa, a Ponte pergunta: _"Depois dessa conversa, qual foi a principal coisa que você
percebeu sobre sua empresa?"_ com categorias de impacto:

- Nova percepção
- Confirmação
- Mudança de decisão
- Nenhum impacto

A resposta e a categoria são gravadas no `SinalValor` de `CLAREZA_GERADA` (`metadata.reacao/categoria`),
via `POST /api/conversa/clareza` + componente de check-in na conversa. Anônimos respondem com
elegância; a evidência só é gravada quando há empresa vinculada.

## 4. Etapa 3 — Retrato Estratégico evoluído (6 partes)

O retrato gerado ao finalizar a primeira conversa passou a ter a estrutura:

1. **Onde sua empresa está hoje** — contexto.
2. **O que sua empresa já construiu** — forças/patrimônio.
3. **Onde existe risco de continuar igual** — pontos cegos.
4. **Qual decisão merece atenção agora** — prioridade.
5. **Primeiro movimento recomendado** — ação.
6. **Pergunta que continuaremos acompanhando** — continuidade (sempre aberto).

Implementação em `src/engine/retrato-estrategico.ts` (determinístico, sem IA) e exibição no
`RetratoEstrategicoCard` — retrocompatível com o fluxo existente.

## 5. Etapa 4 — Primeira Sessão Estratégica (linguagem)

A linguagem externa deixou de chamar "diagnóstico" e passou a chamar **Primeira Sessão Estratégica**
(diagnóstico parece avaliação; sessão parece acompanhamento).

- Landing: CTA "Iniciar minha Primeira Sessão Estratégica" + promessa _"Em alguns minutos vamos
  entender sua empresa e mostrar o que merece atenção."_
- Links de retorno atualizados ("Voltar à Primeira Sessão Estratégica").

## 6. Critérios de conclusão (parciais e pendentes)

- [x] Protocolo Founder 1–10 criado (documento operacional).
- [x] Clareza Gerada registrável como evidência pós-conversa (categorias + reação).
- [x] Retrato Estratégico em 6 partes (evolução da entrega).
- [x] Linguagem "Primeira Sessão Estratégica" no funil gratuito.
- [x] V2: pergunta de dependência (30 dias) + retrato não-genérico + Área Founder + rota pública de pertencimento.
- [ ] **10 empresários passaram pela experiência** (depende de humanos — pendência operacional).
- [ ] Sabemos qual parte gera mais valor / dúvida (depende dos registros do protocolo).
- [ ] Temos depoimentos reais e primeiras evidências de retorno (depende de humanos).

## 7. Documentos irmãos

- `PROTOCOLO_FOUNDER_1-10.md` (05-OPERATIONS) — o instrumento de acompanhamento.
- `P57A_DIAGNOSTICO_VALOR.md`, `P57B_FOUNDER_E_PERTENCIMENTO.md`, `P58_OPERATION_FREEZE_V1.md`.
