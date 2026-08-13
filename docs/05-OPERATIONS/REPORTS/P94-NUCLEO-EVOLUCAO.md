# P94-NUCLEO-EVOLUCAO — Auditoria Integral + Núcleo de Evolução (relatório)

> Missão designada "**P94 — Auditoria Integral + Fechamento de Pendências + Evolução da
> Ponte**": auditar produto/arquitetura/experiência (Fases 1–3), apresentar o plano e
> implementar o **núcleo de evolução aprovado**: dashboard vivo, sinais operacionais
> persistidos, nav mobile + módulos órfãos, botões mortos do perfil cliente, Copiloto no
> admin descoberta, fixs P0, e entregáveis de substituição/rollback.
> Regra absoluta da rodada: **nada inventado** — o que não está registrado fica "não
> sabemos" (P80/P82). Entregas de auditoria completas em `AUDITORIA_INTEGRAL_PONTE.md`,
> `MAPA_EVOLUCAO_PONTE.md` e `PENDENCIAS_PRIORIZADAS.md`.

---

## 0. Resumo executivo

A rodada entregou, além dos 3 relatórios de auditoria (Fases 1–3), o núcleo de evolução
aprovado pelo usuário:

- **P1-1 Dashboard vivo** (`dashboard/page.tsx`): `CentroDiario` e `RevisaoEvolucao` agora
  renderizam dados reais persistidos (antes era um "centro diário" genérico).
- **P1-2 Sinais operacionais persistidos** (`engine/registro-sinais.ts`): registro
  idempotente (janela 12h, reativa `deletedAt`) + lista de sinais recentes por urgência,
  conectado no dashboard.
- **P0-1 Nav mobile + módulos órfãos**: app-shell (drawer + overlay), header (botão
  `lg:hidden` com `MenuIcon` SVG inline), sidebar (grupo "Operação": `/tarefas`,
  `/implantacoes`, `/crm`; drawer mobile; rótulos visíveis no mobile mesmo colapsada).
- **P1-4 Botões mortos do perfil cliente**: `ClientePerfil` agora abre modais reais —
  `TarefaModal`, novo `HistoricoModal`, `TransacaoModal` com `clienteIdInicial` — cada
  submit com `router.refresh()`, via `apiFetch`.
- **P1-6 Copiloto → admin descoberta**: novo `copiloto-visao-gerente.tsx` renderizado no
  `DescobertaDetalhe` — nível de intervenção Nv 0–4, contexto, carga cognitiva por
  processo, mapa de atrito e perguntas com gatilho real, todos determinísticos via
  `engine/copiloto-operacional`.
- **P0 Fixes:** notificação → `/minha-jornada` (2 engines), `/diagnostico` fora do público,
  sitemap completo (8 URLs públicas), **limite diário de IA no assistente**
  (`LIMITE_IA_DIARIO` aplicado por empresa com contagem no modelo `RespostasConversa`).
- **Validação:** typecheck limpo; testes (52) e build validados na rodada.

**Limites respeitados:** nenhum schema novo (migrations manuais pós-002 preservadas), tenant
wrapper/RLS **só documentado** (decisão do usuário), 16 APIs órfãs **não tocadas** (rodada
futura de limpeza), campo Souza Mestrinho segue OBSERVADO = ∅.

---

## 1. O que existia (antes)

| Item | Situação antes |
| --- | --- |
| Dashboard | `page.tsx` renderizava `CentroDiario`/`RevisaoEvolucao` com dados estáticos/genéricos, não o estado real do dia |
| Sinais operacionais | Não havia registro persistido de sinais operacionais (atrasos, picos, falhas) para o dashboard |
| Nav mobile (painel) | Sem drawer/overlay; módulos `/tarefas`, `/implantacoes`, `/crm` existiam mas **não apareciam** na sidebar (órfãos do menu) |
| Perfil cliente | Botões "Nova tarefa / Anotar / Registrar transação" **mortos** (sem handler/modal) — os dados existiam mas a tela não criava |
| Copiloto no admin | `DescobertaDetalhe` não mostrava a "visão do gerente" (motor P92 já existia, mas só no relatório) |
| Notificação "histórico" | CTAs de histórico apontavam para `/historico` (rota inexistente) |
| `/diagnostico` | Estava em `isPublicRoute` do proxy — rota que não deveria ser pública |
| Sitemap | Não listava as rotas públicas reais |
| Limite diário de IA | `LIMITE_IA_DIARIO` definido em `planos.ts` mas **nunca verificado** na rota do assistente |

---

## 2. Decisões de arquitetura

1. **Sinais persistidos, não derivados em memória.** O dashboard lê do banco o que a
   operação registrou (`registro-sinais.ts`), idempotente por janela de 12h e com reativação
   de `deletedAt` — evita duplicação e permite histórico.
2. **Nav mobile com acesso pleno à operação.** Drawer de navegação + grupo "Operação" com os
   módulos que estavam órfãos. Ícone hamburger **SVG inline** (`MenuIcon`) porque o barrel de
   tipos do `lucide-react` está truncado pelo tsc (bug documentado em `KNOWN_ISSUES.md`).
3. **Copiloto no admin = mesmo motor, nova superfície.** `copiloto-visao-gerente.tsx` é
   interface sobre `engine/copiloto-operacional` (puro, determinístico) — sem IA, sem novo
   domínio. Lacunas aparecem como "não sabemos".
4. **Limite diário de IA por empresa, contado no modelo real.** A contagem usa
   `RespostasConversa.perguntaId` prefixado `assistente-ai:` (só chamadas de modelo contam;
   fórmula usa `assistente:` e não consome o modelo). BASICO continua bloqueado por
   `requireRecurso` (limite 0); PROFISSIONAL 50/dia; ENTERPRISE 500/dia.
5. **Nada de schema novo.** A contagem de IA reutiliza tabela existente; os sinais usam o
   modelo `HistoricoSinal` já existente (campo Souza Mestrinho segue OBSERVADO = ∅).

---

## 3. O que foi construído

### 3.1 Dashboard vivo (P1-1) + sinais (P1-2)

| Peça | Caminho |
| --- | --- |
| `persistirSinaisOperacionais(empresaId, sinais)` | `sistema/src/engine/registro-sinais.ts` — idempotente (janela 12h, reativa `deletedAt`) |
| `listarSinaisRecentes(empresaId)` | mesma engine — limite 6, ordenado por urgência |
| Integração no dashboard | `sistema/src/app/(dashboard)/dashboard/page.tsx` — `CentroDiario` com `data={centroDiario}`, `RevisaoEvolucao` com `data={revisao}` |

### 3.2 Nav mobile + módulos órfãos (P0-1)

| Peça | Caminho |
| --- | --- |
| Estado do drawer + overlay | `sistema/src/components/layout/app-shell.tsx` (z-40, fecha no overlay) |
| Botão mobile (`lg:hidden`) | `sistema/src/components/layout/header.tsx` — `MenuIcon` SVG inline |
| Grupo "Operação" + drawer | `sistema/src/components/layout/sidebar.tsx` — `/tarefas`, `/implantacoes`, `/crm`; `mostrarRotulos = !collapsed || mobileAberto` |
| Base de módulos | `modulos` inclui `'implantacoes'` |

### 3.3 Botões mortos do perfil cliente (P1-4)

| Peça | Caminho |
| --- | --- |
| 3 modais ativos | `sistema/src/components/clientes/cliente-perfil.tsx` — `TarefaModal`, `HistoricoModal`, `TransacaoModal` |
| Novo modal de histórico | `sistema/src/components/clientes/historico-modal.tsx` — Dialog com tipo/título/detalhes, `TIPOS_MANUAIS` (7 tipos, sem SISTEMA), `historicoSchema` |
| Transação com cliente inicial | `sistema/src/components/financeiro/transacao-form.tsx` / `transacao-modal.tsx` — prop `clienteIdInicial` (espelha `TarefaForm`) |
| Envio | `apiFetch` (`@/lib/api-client`) + `router.refresh()` em cada submit |

### 3.4 Copiloto no admin descoberta (P1-6)

| Peça | Caminho |
| --- | --- |
| Visão do gerente | `sistema/src/components/descoberta/copiloto-visao-gerente.tsx` — Nv 0–4 com motivos, contexto (texto puro), carga cognitiva por processo (badges BAIXA/MEDIA/ALTA), mapa de atrito, perguntas com gatilho real |
| Integração | `sistema/src/components/descoberta/descoberta-detalhe.tsx` — renderizado antes do grid; mapeia DTOs (processos/divergencias/oportunidades/historico) |
| Determinismo | `engine/copiloto-operacional` (sem banco, sem IA); lacunas = "não sabemos" |

### 3.5 Fixs P0

| Fix | Antes | Depois |
| --- | --- | --- |
| CTA de histórico | `cognitive-notification-engine.ts:124` → `/historico` | `/minha-jornada` |
| CTA de histórico (composer) | `cognitive-action-composer.ts:34` (CATEGORIA_HREF HISTORICO) | `/minha-jornada` |
| `/diagnostico` público | `src/proxy.ts:32` em `isPublicRoute` | Removido; página vira redirect para `/` |
| Sitemap | Não listava rotas públicas | `sitemap.ts` lista `/conversa`, `/fundador`, `/solicitar-founder`, `/tornar-se-fundador`, `/criar-conta`, `/login`, `/reset-password` com prioridades/frequências |
| Limite diário IA | `LIMITE_IA_DIARIO` sem uso | Aplicado na rota `/api/assistente` com contagem por empresa (`assistente-ai:` prefix) |

---

## 4. Validação

- **`npx tsc --noEmit`:** limpo (após todas as implementações, incluindo o fix do `Menu`).
- **Testes (52/52 verdes):** copiloto-operacional 14, descoberta-operacional 15,
  founder-operações 9, permissão-plataforma 5, handoff-conta 4, configuração-founder 5.
- **`npm run build`:** validado na rodada (regressão manual do conjunto).
- **Residual conhecido (não é bug):** no `HistoricoModal`, o reset do formulário usa o
  `clienteId` capturado no mount; o submit sempre sobrepõe com o prop atual
  (`clienteId ?? dados.clienteId`), então o registro nunca perde o vínculo correto. Sem
  campo visível de clienteId, não há impacto funcional.

---

## 5. O que NÃO foi feito (limites respeitados)

- **Nenhum schema novo** (`prisma/schema.prisma` intocado) — migrations manuais pós-002
  preservadas (shadow inviável).
- **Tenant wrapper/RLS: só documentado** (decisão do usuário) — ver `KNOWN_ISSUES.md` e
  `AUDITORIA_INTEGRAL_PONTE.md` seção Segurança.
- **16 APIs órfãs: não tocadas** — rodada futura de limpeza (fora do escopo aprovado).
- **Campo Souza Mestrinho: OBSERVADO = ∅** — gate de campo mantido (P80/P82).
- **`/conversa`, Founder, multi-tenant, Copiloto** preservados — nenhuma regressão.

---

## 6. Riscos e observações

- **Limite diário de IA:** a contagem é no `RespostasConversa` — se a rota falhar entre
  registrar e responder, pode haver contagem sem resposta (conservador, à favor do plano).
  Limite é por empresa (não por usuário) — coerente com o plano da empresa.
- **Barrel truncado do lucide-react:** `Menu` e outros ícones falham no tsc (bug de tooling,
  não de produto) — workaround SVG inline documentado em `KNOWN_ISSUES.md`.
- **Regressão manual pós-build:** conferir em produção o drawer mobile, os 3 modais do perfil
  cliente, a visão do gerente no admin descoberta e o bloqueio do limite diário (mensagem
  402/429 chega ao chat via `apiFetchStream`).

---

## 7. Acompanhamento (sugerido)

| Item | Próximo passo |
| --- | --- |
| Limite diário | Validar em produção: PROFISSIONAL atinge 50 → mensagem clara; confirmar que fórmula não conta |
| Sinalização no UI | Exibir ao usuário quantas conversas de IA restam no dia (dado já existe no `RespostasConversa`) |
| Módulos órfãos | Rodada futura: revisar as 16 APIs órfãs e limpar |
| Tenant wrapper/RLS | Conectar quando houver evidência de risco real (ver `KNOWN_ISSUES.md`) |
| Copiloto no admin | Alimentar caderno P92 com campo real (Souza Mestrinho) → a visão reflete exatamente o registrado |
