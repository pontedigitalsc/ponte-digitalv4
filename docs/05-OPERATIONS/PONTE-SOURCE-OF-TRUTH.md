# PONTE-SOURCE-OF-TRUTH.md — Mapa da Ponte (Fonte da Verdade)

> **Documento criado na rodada P100C — Governança e Consolidação (16 de agosto de 2026).**
> Este é o mapa de navegação do projeto para qualquer desenvolvedor futuro.
> Se você chegou aqui sem saber por onde começar: comece por `docs/00-START-HERE.md`, depois volte a este arquivo.

---

## 0. O que é a Ponte?

A **Ponte Digital** é um produto que ajuda o empresário a **enxergar melhor a própria empresa** para decidir melhor — sem aumentar a carga operacional dele.

- Não é um ERP.
- Não é um CRM.
- Não é um chatbot.
- É um conselheiro que **captura sinais → conecta → contextualiza → identifica → explica → recomenda → humano decide → empresa age → resultado volta como aprendizado**.
- A ponte surge **pela relação** entre as partes da empresa, não pela infraestrutura. Forma de marca: **P100B "Clareza"**.

Narrativa única de experiência: **fragmentos → conexão → contexto → clareza → decisão → ação → aprendizado → evolução.**

Princípio central (§11 da P100C): a Ponte não deve **aumentar a carga operacional do empresário**. Ordem preferencial de captura de informação: informação já existente → evento natural da operação → integração → entrada simples → pergunta contextual → **formulário completou só como último recurso**.

---

## 1. Qual é o produto atual?

Fase **V4 Founder** — validação de produto com os primeiros Founders. Aprovado por evidência real, não por hipótese interna (P58). Estado detalhado em `docs/02-PRODUCT/CURRENT_PRODUCT.md`.

Capacidades entregues (em produção):
- **Landing** institucional que demonstra a filosofia (fragmentos → clareza → evolução).
- **Conversa (Primeira Sessão Estratégica)** — funil anônimo com token `conv_token`; gera hipóteses, Retrato Estratégico e Clareza Gerada; agenda retorno em 7 dias.
- **Criação de conta / Login** — Supabase; vincula conversa anônima e pendências (clareza/retorno).
- **Copiloto do dia a dia** — `/dashboard` (check-in diário), `/minha-empresa-hoje`, `/minha-jornada` (Memória Viva), `/memoria`, `/conhecimento`, `/aprendizados`, `/centro-decisao`, `/assistente` (IA contextual), `/explorar` (cenários hipotéticos).
- **Camada de plataforma (Founder)** — `/painel-do-fundador`, `/admin/descoberta` (caderno de campo P92), `/admin/founder-operacoes` (P90/P91), `/admin/radar-founders`, `/admin/diario-founder`, `/admin/diario-cientifico`, `/admin/cognitive-observatory`. Identidade `platformRole` (`FOUNDER_PRINCIPAL`/`FOUNDER`/`APOIADOR`) e membership `EmpresaUsuario` (P84/P85).
- **Fundação operacional (módulos legados preservados)** — `/crm`, `/clientes`, `/tarefas`, `/financeiro`, `/implantacoes`, `/atendimento` — mantidos no sidebar (grupo Operação), considerados legado oculto a não expandir.

O que é **futuro/conceitual** (não implementar agora): Motor Cognitivo completo, Domain Events formais, Repositories, migração para Server Actions, Inteligência Coletiva plena, recomendações avançadas. Somente com evidência (`docs/02-PRODUCT/MVP_SCOPE.md`, `docs/03-ENGINEERING/ARCHITECTURE.md`).

---

## 2. Qual é o repositório oficial?

| Item | Valor |
|---|---|
| **Diretório oficial (fonte da verdade)** | `C:\Users\Admin\Desktop\PONTE-DIGITAL-V4-FOUNDER\ponte-digital-organizado (1.3)\ponte-digital` |
| Remote (origin) | `git@github.com:pontedigitalsc/ponte-digitalv4.git` |
| Branch principal | `main` |
| Ferramenta de deploy | Vercel (Git integration no push para `main`) |
| Produção | `https://pontedigital.vercel.app` |

**Verificado na P100C (16/08/2026):** `git remote -v` aponta para `pontedigitalsc/ponte-digitalv4`; `git rev-parse HEAD` == `git rev-parse origin/main`; o build local bate com o deploy (P100B verificado em produção).

> ⚠️ **REGRA ABSOLUTA:** nenhuma desenvolvimento fora deste diretório. Pastas irmãs (abaixo) são **históricas/cópias** e NÃO são fonte de verdade.

---

## 3. Cópias e versões paralelas (classificadas na P100C)

Diretório pai: `C:\Users\Admin\Desktop\PONTE-DIGITAL-V4-FOUNDER\`

| Estrutura | Classificação | Observação |
|---|---|---|
| `ponte-digital-organizado (1.3)\ponte-digital` | **OFICIAL** | Único com `.git` ligado ao `origin/main` correto. FONTE DA VERDADE. |
| `ponte-digital-organizado (1.3)\evolucao-os` | **CÓPIA / HISTÓRICA** | Tem `.git` próprio apontando para o MESMO remote, mas HEAD `f3ed4d6` (era P70) com alterações locais não commitadas das engines de conversa (P66–P70). **Desatualizada e perigosa de usar.** |
| `ponte-digital-existent (1.3)` | **HISTÓRICA / CÓPIA** | Contém apenas `scratch-p86-check.ts`; sem `.git`. |
| `ponte-digital-operacional` | **HISTÓRICA / CÓPIA** | Contém apenas uma pasta `sistema`; sem `.git`. |
| `Versao antiga` | **HISTÓRICA** | Vazia; sem `.git`. |

**Importante:** mesmo que alguém trabalhe acidentalmente em `evolucao-os`, o conteúdo dele **não** está em `main` — commit e push de lá iriam criar conflito/divergência com a fonte. **Nunca desenvolver em `evolucao-os`.**
`archive/` dentro do repo oficial é documentação histórica — leitura opcional, nunca fonte.

---

## 4. Qual é a arquitetura atual?

Stack real (registro P100C):

- **Framework:** Next.js (App Router) + React + TypeScript — ver versão em `sistema/package.json`; docs oficiais da versão em `node_modules/next/dist/docs/` (AGENTS.md raiz).
- **Banco:** PostgreSQL via **Supabase** + **Prisma** (`sistema/prisma/schema.prisma`; 12 migrations `001`–`012`).
- **Camadas hoje (documentadas como aceitas):** `API Routes → services → Prisma` (ADR-002). Server Actions apenas pontuais (`clientes/[id]`).
- **Multi-tenancy:** guard de tenant por disciplina de `empresaId` no `where` + wrapper `prismaSeguro` (a maioria dos services já o importa). RLS do Supabase **não é** a barreira real nesta fase (decisão de escopo P94 — ver `KNOWN_ISSUES.md`). Nível plataforma (`admin/*`, descoberta, Founder) = agregados fora do tenant guard por decisão documentada.
- **IA:** interface apenas — o cérebro é determinístico (engines TS). Provider Anthropic (com fallback Gemini/Noop). `NoopProvider` lança erro explícito; falha → mensagem gentil (P55).
- **Auth:** Supabase (email/senha) + `proxy.ts` (papel do middleware) com rotas públicas declaradas; cookies `conv_token` para funil anônimo.
- **Rate limit:** em memória (in-memory), sem Redis/Upstash.
- **Componentes de marca:** `sistema/src/components/brand/ponte-logo.tsx` (`PonteSymbol`/`PonteLogo`/`PonteLogoHorizontal`/`PonteLogoStacked`).
- **Engines:** ~120 arquivos em `sistema/src/engine/` — determinísticos; mais em `sistema/src/services/` (10 services) e `sistema/src/lib/` (35 arquivos).

Documentação de arquitetura (viva): `docs/09-ARCHITECTURE/` (`ARCHITECTURAL_INVENTORY.md`, `COGNITIVE_MAP.md`, `EVENT_MAP.md`, `PIPELINE_MAP.md`, `DEPENDENCY_MAP.md`, `ADR_NAVIGATOR.md`). O `ARCHITECTURE.md` é alvo futuro — não é checklist obrigatório.

---

## 5. Quais módulos existem?

Inventário resumido de rotas (auditado na P100C):

### Públicas / marketing
`/` (landing), `/fundador`, `/tornar-se-fundador`, `/solicitar-founder`, `/conversa` (funil anônimo), `/login`, `/criar-conta`, `/reset-password`, `/reset-password/confirmar`.

### Autenticadas (grupo dashboard)
`/dashboard` · `/minha-empresa-hoje` · `/minha-jornada` · `/memoria` · `/conhecimento` · `/aprendizados` · `/centro-decisao` · `/explorar` · `/assistente` · `/clientes` · `/clientes/[id]` · `/crm` · `/tarefas` · `/financeiro` · `/implantacoes` · `/atendimento` · `/configuracoes` · `/historico` (redireciona → `/minha-jornada`).

### Plataforma (gate Founder)
`/painel-do-fundador` · `/admin/descoberta` · `/admin/descoberta/[id]` · `/admin/founder-operacoes` · `/admin/founder-operacoes/[id]` · `/admin/radar-founders` · `/admin/diario-founder` · `/admin/diario-cientifico` · `/admin/cognitive-observatory` · `/api/health/plataforma`.

### Legadas preservadas
`/diagnostico` (redireciona → `/`) · `/historico` (redireciona → `/minha-jornada`) · módulos operacionais (CRM/tarefas/financeiro) no sidebar como herança funcional.

---

## 6. Onde estão os principais engines?

Diretório-mãe: `sistema/src/engine/`.

| Engine | Função | Referência |
|---|---|---|
| `conversation-engine.ts` | Motor da conversa (criar/carregar/responder) | P67/P70 |
| `hipoteses-estrategicas.ts` | Gera/persiste hipóteses (determinístico) | P70 |
| `retrato-estrategico.ts` | Retrato Estratégico + Clareza | P70/P57A |
| `clareza-engine.ts` | Evidência de clareza com pendência p/ conta | P59 |
| `retorno-engine.ts` | Check-in de retorno 7 dias | P64 |
| `relacao-engine.ts` | Pergunta Viva, Reflexão, Memória Emocional | P52/P65 |
| `motor-continuacao.ts` | Agenda inteligente (o que merece atenção hoje) | P69 |
| `ritmo-engine.ts` / `ritual-engine.ts` / `momento-engine.ts` | Ritmo cognitivo 12s / ritual diário / momento | P70/P69.5 |
| `memoria-evolutiva-engine.ts` | Memória evolutiva | P65 |
| `conselheiro-engine.ts` | Conselheiro de decisões (P66) | P66/P68 |
| `inteligencia-coletiva.ts` | Conhecimento coletivo (gates) | P62 |
| `operacao-founder.ts` | Métricas de transformação Founder | P63 |
| `descoberta-operacional.ts` | Caderno de campo (P92) | P92 |
| `copiloto-operacional.ts` | Nível de intervenção 0–4 a partir do caderno | P82/COPILOTO |
| `founder-operacoes.ts` / `founder-activation-engine.ts` / `founder-panel-engine.ts` | Solicitações/ativação/painel Founder | P90/P91 |
| `cognitive-*` (várias) | Orquestração/fachadas de patrimônio (muitas experimentais) | P36+ |
| barramento: `event-publisher.ts` / `event-store.ts` / `event-subscriber.ts` / `cognitive-bus.ts` | Eventos (não Domain Events formais) | ADR-011 |
| `p36/`, `p40/` | Pilotos experimentais de detecção de valor | P36/P40 |

---

## 7. Onde estão os componentes de marca?

- **Componente react:** `sistema/src/components/brand/ponte-logo.tsx` — `PonteSymbol` (full 240×100 / micro 48×48 × 4 surfaces), `PonteLogo`, `PonteLogoHorizontal`, `PonteLogoStacked`.
- **Assets SVGs:** `sistema/public/brand/` (8 SVGs P100B + `preview.html`).
- **Favicons:** `sistema/src/app/icon.svg` (canônico, file convention) e `sistema/public/favicon.svg` (manifest/PWA). `favicon.ico` pré-P96 foi **removido** na P100C (resíduo).
- **Consumidores da marca:** `AvatarPonte` (`components/ui/avatar.tsx`), sidebar (`components/layout/sidebar.tsx`), nav/footer/hero/cards da landing (`components/marketing/`), auth layout, `Passagem` (seção da landing).
- **Regra:** nunca usar `✦`, símbolos antigos (A Travessia/P99/P100, construção de engenharia), nem estrela decorativa como marca. Forma oficial = P100B "Clareza".

---

## 8. Qual é o fluxo do Founder?

```
Visitante ──(landing/conversa)──▶ Conversa (funil anônimo)
   │                                   │
   │                              interesse
   ▼                                   ▼
Apoiador (conta criada, nº de pertencimento) ── solicitar founder ──▶ Fila
   │                                                                    │
   │                                                /admin/founder-operacoes
   ▼                                                                    ▼
Founder (nº Founder, status/observação/onboarding) ── ativação ──▶ Founder ativo
   │                                                                    │
   ▼                                                                    ▼
Pioneiro do ramo (primeira empresa da vertical — `empresaPioneiraId`)
```

Documentação de referência: `docs/07-MILESTONES/P57B_FOUNDER_E_PERTENCIMENTO.md`, `P84_FOUNDER_ACCESS.md`, `P85_PONTE_USA_A_PONTE.md`, `P90_FOUNDER_REQUEST`/`P91_FOUNDER_OPERATIONS` (via reports). Critérios e estados: ver `P100C-STATUS-DA-PONTE.md` seção "Founder / Pioneiro".

---

## 9. Qual é o fluxo da descoberta operacional?

Caderno de campo P92 — `/admin/descoberta` e `/admin/descoberta/[id]`.

```
Diagnóstico (estado NAO_INICIADO)
  → pergunta-âncora obrigatória (P82)
  → participantes
  → falas/respostas (taxonomia: conhecimento conhecido, informação fornecida, observação, hipótese, decisão, oportunidade, desconhecido)
  → processos COMO É (ProcessoDescoberta)
  → processos COMO PODERIA SER (ProcessoDesejadoDescoberta)
  → divergências (dito × observado; resolver → aprova/melhora/descarta)
  → oportunidades
  → relatório final (12 seções, texto puro)
  → estados: EM_DESCOBERTA → MAPEADO → EM_VALIDACAO → VALIDADO → EM_IMPLEMENTACAO → IMPLEMENTADO → EM_APRENDIZADO
```

Motor: `descoberta-operacional.ts` (15 testes). Copiloto operacional (`copiloto-operacional.ts`, 14 testes) lê o caderno e classifica Nv 0–4. **P80/P81/P82 continuam bloqueados até campo real (OBSERVADO = ∅)** — Souza Mestrinho Metais aguarda a reunião.

---

## 10. Onde está o Copiloto?

Conceitualmente, o Copiloto é **a camada que interpreta** (sinais → contexto → padrões → avaliação → raciocínio → decisão/ação → aprendizado), NÃO um "chatbot no sistema".

No código, as peças já existentes:
- Determinístico: `copiloto-operacional.ts` (Nv 0–4 a partir do caderno P92), `conselheiro-engine.ts`, `relacao-engine.ts`, `motor-continuacao.ts`.
- IA contextual: `/api/assistente` (chat com contexto da empresa) — a IA é interface, não cérebro.
- Experiência: `/conversa` conversa que pensa junto; `/dashboard` abertura inteligente; `/centro-decisao` decisões acompanhadas.

Documentos de arquitetura conceitual: `docs/03-ENGINEERING/OPERACIONAL/ARQUITETURA_DO_COPILOTO_OPERACIONAL.md`.

---

## 11. Onde ficam os sinais?

- **`HistoricoSinal`** (`historico_sinais`): memória operacional pura — registra sinais da operação (camada de ligação operação→cognição). Nomenclatura técnica (não semântica) — aceite documentado (ADR-001).
- **`SinalValor`** (`sinais_valor`): sinais de valor percebido (CLAREZA_GERADA, RETORNO_7_DIAS, CHECKIN_DIARIO, etc.).
- **`EventoAtivacao`**: marcos de ativação do Founder.
- **`RespostasConversa`**: cada pergunta/resposta imutável.
- Catalogação dos sinais em engines: `registro-sinais.ts`, `financeiro.sinais.ts`, `clientes.sinais.ts`, `tarefas.sinais.ts`.

---

## 12. Onde ficam as regras?

- **Regras de negócio determinísticas** (sem IA): em `sistema/src/engine/` (reações, interpretações, hipóteses, socráticas, sinais, ritmo) e `scripts/` (bootstrap).
- **Hipóteses de produto** (não são regras): `docs/08-KNOWLEDGE/HYPOTHESES.md` + `CURRENT_PRODUCT.md` §4.
- **Princípios imutáveis:** `docs/02-PRODUCT/CURRENT_PRODUCT.md` §5 (8 princípios) e `docs/01-VISION/PRINCIPLES.md`.
- **Decisões arquiteturais:** `docs/04-DECISIONS/ADR/` (34+ ADRs) e index `docs/09-ARCHITECTURE/ADR_NAVIGATOR.md`.
- **Regras operacionais do agente:** `AGENTS.md` (raiz) e `docs/06-AI/AGENTS.md`.

---

## 13. Memória operacional (mapa conceitual da P100C §13)

Mapeamento do que JÁ existe (sem nova arquitetura):

```
ENTRADA      → Conversa/check-in/atendimento/módulos (RespostasConversa, SinalValor, HistoricoSinal)
SINAL        → registro-sinais engines + EventoAtivacao
CONTEXTO     → hipóteses (Hipotese), IdentidadeDigital
RELAÇÃO      → DecisaoSinal (decisão ↔ sinal), relacao-engine (Pergunta Viva/Reflexão/Memória Emocional)
MEMÓRIA      → MemoriaCognitiva (timeline de entendimento por versão), Historico, MemoriaEmocional
RACIOCÍNIO   → engines determinísticas (hipóteses, conselheiro, continuidade, clareza)
DECISÃO      → AcaoCognitiva + Centro de Decisão (origem ASSISTENTE opcional)
AÇÃO         → AcaoCognitiva, Tarefa, atuação direta
RESULTADO    → FeedbackAcao, Outcome, resultadopara hipóteses
NOVO SINAL   → enriquecimento do próximo ciclo
```

---

## 14. O que NÃO deve ser alterado sem validação?

| Item | Motivo |
|---|---|
| **Schema/migrations Prisma** | Toda tabela é patrimônio; migrations 008–012 têm migração manual no Supabase (shadow DB P3006). Mudanças exigem migration cuidadosa + deploy. |
| **`prismaSeguro` / disciplina de `empresaId`** | Barreira real de isolamento multi-tenant nesta fase (P94). |
| **Auth/`proxy.ts` / rotas públicas** | Qualquer erro aqui derruba login/funil. |
| **Rate limit** | Proteção de produção; em memória (limites razoáveis). |
| **Identidade P100B** | Aprovada pelo Founder. Não redesenhar (P100C §9/§29). |
| **Núcleo determinístico** (`conversation-engine`, `hipoteses`, `retrato`, `clareza`, `retorno`, `relacao`, `motor-continuacao`) | São o cérebro; regressões quebram a experiência inteira. |
| **Funil anônimo (`conv_token`)** | É a porta de entrada; pendências (clareza/retorno) devem continuar vinculando na criação de conta. |
| **Motor Operacional P80/P81/P82** | Bloqueado até evidência de campo — NÃO inventar workflow. |
| **Módulos legados** (CRM/tarefas/financeiro/implantacoes/atendimento) | Preservar compatibilidade; não expandir e não remover sem decisão. |
| **Áreas de plataforma (admin*, Founder)** | Gate `requirePlataforma` é sensível — mudanças de permissão exigem revisão. |
| **Docs de fonte da verdade** (este arquivo, CURRENT_PRODUCT, KNOWN_ISSUES, ADRs) | Contradições = registrar e perguntar (Regra de Ouro), nunca corrigir sozinho. |

---

## 15. Conflitos/divergências registrados na auditoria P100C

Divergências catalogadas (sem alteração unilateral — ver `KNOWN_ISSUES.md` e `P100C-STATUS-DA-PONTE.md`):
1. **docs vs código:** `FOUNDATION_CANDIDATE_V2.md`/`FEATURE_MATRIX.md` dizem `/crm`, `/tarefas`, `/implantacoes` "sem link"— código atual (P94) já os linka no sidebar (Tipo C).
2. **`/api/patrimonio` × `/api/cognitive-heritage`:** doc `RFC-002` manda manter `/api/patrimonio`; `C1-C3-impact-reports` manda manter `/api/cognitive-heritage` — conflito documental (Tipo E) sem decisão.
3. **Soft delete:** KNOWN_ISSUES lista 7 models "sem deletedAt" — schema atual tem 58/62 com; apenas 4 logs de plataforma sem (por design). Nota desatualizada (Tipo C/D).
4. **RLS:** KNOWN_ISSUES diz 11/8 tabelas — arquivo atual cobre 31/31 (mas ~50% do schema); novas tabelas (008–012) fora do arquivo.
5. **`prismaSeguro`:** KNOWN_ISSUES diz "nenhum service importa" — hoje 9/10 services usam o wrapper (Nota desatualizada).
6. **`/register`:** presente na lista de públicas do `proxy.ts`, mas rota eliminada no P41 — resíduo.
7. **`/explorar`** ativo e linkado mas ausente do `sitemap.ts` (P0-6).
8. **`favicon.ico`:** físicamente servido (pré-P96, preto/branco) **sobrescrevendo** o canônico — **CORRIGIDO na P100C** (removido; `icon.svg` canônico confirmado).

---

## 16. Contratos para qualquer desenvolvedor futuro

1. **Fonte da verdade** = diretório oficial acima. Nunca `evolucao-os`/cópias.
2. **Order de leitura:** `00-START-HERE.md` → `CURRENT_PRODUCT.md` → este mapa → `GOVERNANCA-DE-DESENVOLVIMENTO.md` → sprint ativa.
3. **Regra de ouro:** nunca decidir sozinho; conflito → registrar em `KNOWN_ISSUES.md` e perguntar.
4. **Comparação DOCUMENTAÇÃO→INTENÇÃO vs CÓDIGO→REALIDADE** com classificação funcional/estado (ver P100C-STATUS).
5. **Entrega** = código alterado + documentação + testes + commit + push + resumo. Nunca ZIP como substituto.