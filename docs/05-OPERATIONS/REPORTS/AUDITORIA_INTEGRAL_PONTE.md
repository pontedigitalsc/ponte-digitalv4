# AUDITORIA_INTEGRAL_PONTE — Inventário real do produto (P94)

> **Missão:** Auditoria Integral + Fechamento de Pendências + Evolução da Ponte.
> **Método:** somente leitura em todo o código (`sistema/`) e documentação (`docs/`). Nenhum
> arquivo alterado nesta fase. Quatro frentes de auditoria executadas em paralelo:
> banco/multi-tenancy/segurança · rotas/APIs/páginas · engines/serviços/IA · experiência.
> **Data:** 13/08/2026.

---

## 0. Síntese executiva

A Ponte Digital é, hoje, um conjunto de **CRUDs reais e bem-feitos** (atendimento, caixa,
clientes, tarefas, CRM, implantação) com uma **camada cognitiva sobreposta** que se manifesta
principalmente como texto (narrativas, insights, evidências, sinais). As conexões **existem
nos dados** — `Evidencia`, `SinalValor`, FKs cliente→transação→implantação — mas **a experiência
não as mostra**. O dashboard calcula o estado da empresa e **joga fora** (`centroDiario`/
`revisao` nunca renderizados). Sinais operacionais nascem e morrem na mesma request
(`HistoricoSinal` está vazio por desenho). Três módulos completos (`/crm`, `/tarefas`,
`/implantacoes`) **não têm link no sidebar**. A navegação é **inviável no celular** (sidebar fixa
sem drawer).

O gate do domínio operacional (OS/Orçamento/Workflow) permanece **bloqueado por decisão de
fase** — OBSERVADO = ∅ até a reunião com a Souza Mestrinho. A maior parte do que esta missão
pode entregar é **orquestração e apresentação** do que já existe — não arquitetura nova.

---

## 1. Inventário por classificação (A–H)

Legenda: **A** pronto · **B** parcial · **C** conceitual · **D** experimental · **E** legado ·
**F** quebrado · **G** duplicado · **H** pendente estratégico.

### 1.1 Banco de dados (62 models, schema 1984 linhas)

| Item | Onde | Estado | Observação |
|---|---|---|---|
| Núcleo operacional (Empresa, Usuario, EmpresaUsuario, Lead, Cliente, Contato, Implantacao, EtapaImplantacao, Tarefa, Historico, Transacao, ConfiguracaoEmpresa, Anotacao, Tag, OnboardingDecisao) | `prisma/schema.prisma` | **A** | FKs sólidas, tenant por `empresaId`, soft delete |
| Motor cognitivo (Evidencia, Hipotese, MemoriaCognitiva, AcaoCognitiva, Outcome, FeedbackAcao, ConhecimentoValidado, DecisaoSinal) | schema | **A** | Persistido via orquestrador |
| `HistoricoSinal` | schema | **H** | Model pronto, **zero escritas** — preparação para o futuro declarada em comentário |
| `SinalValor` | schema | **B** | Persistido (3 origens), consumido só em `/memoria` e painel interno |
| Conversacional (Conversa, ConversaHistorico, IdentidadeDigital, Aprendizado, RespostasConversa) | schema | **A** | Fluxo determinístico |
| Bus de eventos (Event, EventSubscription, DeadLetter, CicloConfiguracao, ConfiancaFonte) | schema | **B** | Engines existem; catálogo é cognitivo/comercial, **sem eventos operacionais** |
| Foundação cognitiva (IndexTransformacao, PilarTransformacao) | `engine/p40` | **C/D** | `calcularIndiceTransformacao*` **sem consumidor** |
| Caderno P92 (11 models + CategoriaOperacional) | schema | **A** | Em produção, `/admin/descoberta` |
| Founder (SolicitacaoFounder + historico, AuditoriaPlataforma) | schema | **A** | P90/P91 |
| Migrations 001–012 | `prisma/migrations` | **A** | Manuais após 002 (P3006 — shadow DB inviável) |
| `prisma-tenant-safe.ts` | `src/lib` | **F (risco)** | Wrapper existe **mas não está conectado em nenhum service** |
| RLS policies | `prisma/rls-policies.sql` | **B (risco)** | **Incompleta** — faltam policies em tabelas |
| Seed | `prisma/seed.ts` | **B** | Não cria vínculo `EmpresaUsuario` |

### 1.2 Multi-tenancy / segurança

| Item | Onde | Estado | Risco |
|---|---|---|---|
| Tenant guard por `empresaId` manual nas queries | services | **B** | Correto em services auditados, mas depende de disciplina; wrapper `prisma-tenant-safe` desconectado |
| `requirePlataforma` / 5 permissões | `lib/plataforma.ts` | **A** | P84, robusto |
| Auth Supabase SSR | `middleware`, `lib/auth.ts` | **A** | Funciona |
| `LIMITE_IA_DIARIO` | `lib/planos.ts:22` (BASICO:0, PROFISSIONAL:50, ENTERPRISE:500) | **F** | **Nunca verificado em nenhuma rota** — limite de IA definido e ignorado |
| Rate limits | `lib/rate-limit*.ts` | **A** | Assistente 20/min, founder, etc. |

### 1.3 Rotas / páginas / APIs

| Item | Estado | Observação |
|---|---|---|
| Landing `/` (~24 componentes marketing) | **A** | P93, narrativa completa |
| `/conversa` (fluxo determinístico) | **A** | Onboarding real; alimenta evidencias/memórias |
| `/login`, `/criar-conta`, `/reset-password` | **A** | Funcional |
| 20 páginas de negócio autenticadas | **A** | CRUDs reais, dados reais |
| `/diagnostico` | **D** | **Protótipo 100% mock estático, público, sem backend, sem link** |
| `/historico` | **E** | Redireciona para `/minha-jornada`; notificação ainda aponta p/ ela (`cognitive-notification-engine.ts:124`) |
| `/dashboard` | **B** | Destino pós-login mas **sem item no sidebar** |
| `/crm`, `/tarefas`, `/implantacoes` | **B** | **Sem link no sidebar** — módulos funcionais invisíveis |
| `/painel-do-fundador`, `/admin/*` | **A** | Gate P84 correto |
| 16 endpoints REST órfãos (cluster cognitivo, relacao, sessao, historicos, patrimonio, POST descoberta, PATCH/DELETE implantacoes) | **E** | Frontend usa engines server-side; APIs paralelas sem uso |
| Sitemap | **F** | Só 3 URLs de ~30 |
| Not-found/error | **A** | Presentes |

### 1.4 Engines / serviços / IA

| Item | Estado | Observação |
|---|---|---|
| 120+ arquivos em `src/engine` | **A/B** | Maioria usada; poucos órfãos |
| `copiloto-operacional.ts` | **B (conceitual→produto)** | **Sem consumidor em produção** (só tests + landing). Motor pronto aguardando UI |
| `cognitive-experience-engine.ts` | **A** | ExperienceRenderer em 14 páginas |
| `cognitive-orchestrator.ts` | **A** | `obterEstadoCognitivoCompleto`, `processarConversa`, etc. |
| `descoberta-operacional.ts` | **A** | 15 testes |
| `founder-operacoes.ts` | **A** | 9 testes |
| `gerarSinais` (compositor) | **D** | Sem consumidor externo; geradores individuais sim |
| `p40/transformation-index.ts` | **D** | Órfão |
| `retry-policy.ts` | **E** | Barrel exporta só tipos; implementação não usada |
| Exports do orquestrador (processarNovaResposta, processarEvento, processarAcao, processarLogin, processarMudancaEmpresa) | **D** | Sem rota consumidora |
| `normalizarTexto` | **G** | Reimplementado em ≥8 arquivos |
| `clareza-engine` vs `clarity-engine` | **G** | Nomes quase idênticos, conceitos distintos — risco de troca |
| 3 caminhos de escrita de evidência | **G** | `atendimento.service`, `feedback-intelligence-engine`, `decision-engine` |
| Assistente (`/api/assistente`) | **A** | Gemini, SSE, contexto real; sem histórico persistido (por design) |
| Provedor IA | **A** | Só Gemini real; Groq compat órfão |

### 1.5 Experiência

| Item | Estado | Observação |
|---|---|---|
| Dashboard | **B** | Forte conceitualmente; **descarta `centroDiario` e `revisao`** que já calcula; sem números operacionais |
| Perfil do cliente (hub) | **B** | Melhor hub do sistema; **3 botões mortos**: "Nova tarefa", "Anotar contato", "Nova cobrança" |
| CRM kanban | **A** | Única visualização de fluxo real |
| Navegação mobile | **F** | Sidebar fixa `w-60`/`w-16` sem drawer — inviável em 360px |
| `ComoEstaHoje` | **B** | Input do usuário **não é salvo** — descartado |
| Cards de narrativa/insight/ação | **G** | Esqueletos quase idênticos |
| Estados vazios | **G** | `estado-vazio.tsx` existe + 6 cópias inline |
| Fluxo visual Cliente→Orçamento→Produção→Pagamento | **H** | **Não existe** (nem model de Orçamento/OS — bloqueado) |
| Conexões visuais entre módulos | **H** | Só via texto/evidências; nada visual |

---

## 2. Padrões dominantes

1. **"Adesivo cognitivo"**: todo CRUD tem um `ExperienceRenderer` por cima. A camada de
   compreensão existe, mas parece *colada* — não integrada.
2. **Sinais efêmeros**: `buscarSituacaoEmpresa` calcula sinais de clientes/tarefas/financeiro a
   cada request e descarta. `HistoricoSinal` vazio.
3. **Fonte única parcial**: `/atendimento` cria Histórico + Transação + Evidência + Outcome
   juntos — o padrão que deveria ser geral.
4. **Fragmentação da navegação**: `MODULO_MAP` (sidebar) desalinhado de `obterModulosLiberados`
   (engine) e das rotas reais.

---

## 3. O que NÃO está quebrado (regressão protegida)

- Autenticação, login, criação de conta, handoff (4 testes verdes).
- Permissões de plataforma (5 testes), founder-operacoes (9), descoberta (15), copiloto (14).
- `/conversa` inteiro — determinístico, sem IA, com persistência.
- Multi-tenant em serviços — correto nos caminhos auditados.
- Build e typecheck limpos (P93).

---

## 4. Classificação consolidada

| Classe | Itens principais | Prioridade |
|---|---|---|
| **F (quebrado)** | Navegação mobile (sidebar fixa); `LIMITE_IA_DIARIO` ignorado; tenant wrapper desconectado; RLS incompleta; sitemap | P0/P1 |
| **B (parcial)** | Dashboard descarta dados; botões mortos no perfil do cliente; `/crm` `/tarefas` `/implantacoes` sem link; `ComoEstaHoje` perde input; copiloto sem UI | P1/P2 |
| **D (experimental)** | `/diagnostico` mock público; `p40/transformation-index`; `gerarSinais` compositor | P2 |
| **E (legado)** | `/historico` morto; 16 APIs órfãs; `retry-policy`; `clareza-engine` vs `clarity-engine` | P2/P3 |
| **G (duplicado)** | `normalizarTexto` (8×); 3 caminhos de evidência; cards/estados vazios duplicados | P3/P4 |
| **H (pendente estratégico)** | Motor de Contexto; sinais persistentes; fluxo visual Cliente→Pagamento; Copiloto como centro de gravidade; domínio operacional (OS/Orçamento) — bloqueado até campo | P1 (estratégico) |

---

## 5. Conclusão

A Ponte **não é** um "sistema com módulos" no backend — os dados estão conectados. Ela **parece**
um sistema de módulos porque a experiência não materializa as conexões. A evolução de maior
retorno é **orquestração**: tornar o que já é computado (estado da empresa, sinais, contexto,
próximo movimento) visível, persistente e acionável — sem tocar em arquitetura, schema ou IA.
O domínio operacional real (Orçamento/OS/Workflow) permanece bloqueado pelo gate de campo até a
reunião com a Souza Mestrinho — decisão de fase a ser respeitada.
