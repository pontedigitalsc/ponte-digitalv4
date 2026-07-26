# Auditoria de APIs — Relatório v1

> Guardião da Engenharia — Assunto: APIs
> Data: julho/2026
> Nenhuma implementação foi feita. Apenas auditoria.

---

## Estado atual

### Catálogo completo (28 arquivos de rota, 44 handlers)

#### Domínio: Negócio (17 arquivos, 29 handlers)

| Rota | Handler | Importa | Auth | Validação | Consistente? |
|------|---------|---------|------|-----------|-------------|
| `GET /api/clientes` | `cliente.service` | Service | `requireUserApi` | Manual (query params) | ✅ |
| `POST /api/clientes` | `cliente.service` | Service | `requireUserApi` | Zod `clienteSchema` | ✅ |
| `GET /api/clientes/[id]` | `cliente.service` | Service | `requireUserApi` | — | ✅ |
| `PATCH /api/clientes/[id]` | `cliente.service` | Service | `requireUserApi` | Zod `partial()` | ✅ |
| `DELETE /api/clientes/[id]` | `cliente.service` | Service | `requireRole('GESTOR')` | — | ✅ |
| `GET /api/tarefas` | `tarefa.service` | Service | `requireUserApi` | Manual (query params) | ✅ |
| `POST /api/tarefas` | `tarefa.service` | Service | `requireUserApi` | Zod `tarefaSchema` | ✅ |
| `PATCH /api/tarefas/[id]` | `tarefa.service` | Service | `requireUserApi` | Zod `partial()` | ✅ |
| `DELETE /api/tarefas/[id]` | `tarefa.service` | Service | `requireRole('GESTOR')` | — | ✅ |
| `GET /api/leads` | `lead.service` | Service | `requireUserApi` | Manual (query params) | ✅ |
| `POST /api/leads` | `lead.service` | Service | `requireUserApi` | Zod `leadSchema` | ✅ |
| `GET /api/leads/[id]` | `lead.service` | Service | `requireUserApi` | — | ✅ |
| `PATCH /api/leads/[id]` | `lead.service` | Service | `requireUserApi` | Zod `partial()` | ✅ |
| `DELETE /api/leads/[id]` | `lead.service` | Service | `requireRole('GESTOR')` | — | ✅ |
| `POST /api/leads/[id]/converter` | `cliente.service` | Service | `requireUserApi` | Zod `partial()` | ✅ |
| `GET /api/transacoes` | `transacao.service` | Service | `requireUserApi` | Manual (query params) | ✅ |
| `POST /api/transacoes` | `transacao.service` | Service | `requireUserApi` | Zod `transacaoSchema` | ✅ |
| `PATCH /api/transacoes/[id]` | `transacao.service` | Service | `requireUserApi` | Zod `partial()` | ✅ |
| `DELETE /api/transacoes/[id]` | `transacao.service` | Service | `requireRole('GESTOR')` | — | ✅ |
| `GET /api/implantacoes` | `implantacao.service` | Service | `requireUserApi` | Manual (query params) | ✅ |
| `POST /api/implantacoes` | `implantacao.service` | Service | `requireUserApi` | Zod `implantacaoSchema` | ✅ |
| `PATCH /api/implantacoes/[id]` | `implantacao.service` | Service | `requireUserApi` | Zod `partial()` | ✅ |
| `DELETE /api/implantacoes/[id]` | `implantacao.service` | Service | `requireRole('GESTOR')` | — | ✅ |
| `PATCH /api/implantacoes/etapas/[id]` | `implantacao.service` | Service | `requireUserApi` | — | ✅ |
| `GET /api/historicos` | `historico.service` | Service | `requireUserApi` | Manual (query params) | ✅ |
| `POST /api/historicos` | `historico.service` | Service | `requireUserApi` | Zod `historicoSchema` | ✅ |
| `DELETE /api/historicos/[id]` | `historico.service` | Service | `requireUserApi` (não GESTOR) | — | ⚠ Diverge |
| `GET /api/configuracoes` | Prisma direto | — | `requireUserApi` | — | ❌ Violação |
| `PATCH /api/configuracoes` | Prisma direto | — | `requireUserApi` | Zod `configSchema` | ❌ Violação |

#### Domínio: Lixeira (2 arquivos, 2 handlers)

| Rota | Importa | Auth | Validação | Consistente? |
|------|---------|------|-----------|-------------|
| `GET /api/lixeira/[tipo]` | 5 services | `requireUserApi` | Manual (type enum) | ✅ |
| `PATCH /api/lixeira/[tipo]/[id]` | 5 services | `requireRole('GESTOR')` | Manual (type enum) | ✅ |

#### Domínio: Cognitivo (6 arquivos, 8 handlers)

| Rota | Importa | Auth | Validação | Consistente? |
|------|---------|------|-----------|-------------|
| `GET /api/conversa` | `conversation-engine` | Cookie `conv_token` | — | ✅ |
| `POST /api/conversa` | `conversation-engine` | Cookie `conv_token` | Zod `conversaRespostaSchema` | ✅ |
| `POST /api/conversa/finalizar` | `conversation-engine`, `identity-engine` | Cookie `conv_token` | — | ✅ |
| `GET /api/patrimonio` | `heritage-engine` (6 fns) | `requireUserApi` | Manual (array includes) | ⚠ Duplicado |
| `GET /api/cognitive-heritage` | `heritage-engine` (6 fns) | `requireUserApi` | Zod `querySchema` | ❌ Duplicado |
| `GET /api/cognitivo/config` | `ritmo-engine` | `requireUserApi` | Manual (try/throw) | ⚠ Validação manual |
| `PATCH /api/cognitivo/config` | `ritmo-engine` | `requireUserApi` | Manual (try/throw) | ⚠ Validação manual |
| `POST /api/aprendizados` | `@/engine` (barrel) | `requireUserApi` | Zod `aprendizadoSchema` | ⚠ Barrel |
| `DELETE /api/aprendizados` | `@/engine` (barrel) | `requireUserApi` | Manual (query param check) | ⚠ Barrel |

#### Domínio: Auth (1 arquivo, 1 handler)

| Rota | Importa | Auth | Validação | Consistente? |
|------|---------|------|-----------|-------------|
| `POST /api/auth/criar-conta` | `conversation-engine`, `@/engine`, Supabase admin | Rate-limit por IP + cookie token | Zod `registerSchema` | ✅ |

#### Domínio: Infra (1 arquivo, 1 handler)

| Rota | Importa | Auth | Validação | Consistente? |
|------|---------|------|-----------|-------------|
| `GET /api/health` | Nada | Nenhuma | — | ✅ |

#### Domínio: Assistente (1 arquivo, 1 handler)

| Rota | Importa | Auth | Validação | Consistente? |
|------|---------|------|-----------|-------------|
| `POST /api/assistente` | Anthropic SDK, Prisma direto, `@/lib/*` | `requireUserApi` + `requireRecurso` + rate-limit | Zod `assistenteRequisicaoSchema` | ⚠ 353 linhas |

---

## Problemas encontrados

### P1 — DUPLICAÇÃO: `/api/patrimonio` e `/api/cognitive-heritage`

- **Arquivos:** `api/patrimonio/route.ts` (95 linhas) e `api/cognitive-heritage/route.ts` (68 linhas)
- **O que fazem:** Exatamente a mesma coisa — expõem funções da `heritage-engine` via GET autenticado
- **Diferenças:**
  - Patrimonio usa validação manual (`CONSULTAS_VALIDAS.includes`). Cognitive-heritage usa Zod.
  - Patrimonio retorna `{ data }`. Cognitive-heritage retorna `{ success, patrimonio }`.
  - Nomes de query params diferentes (`consulta` vs `view`).
- **Evidência:** Ambos importam `obterEstadoPatrimonio`, `obterConhecimentos`, `avaliarEnvelhecimentoPatrimonio`, `avaliarEsquecimento`, `gerarSinteses`, `obterMetricas` de `@/engine`.
- **Risco:** Duas APIs fazendo a mesma coisa com contratos diferentes. Frontend pode consumir uma ou outra dependendo de qual foi descoberta primeiro. Manutenção duplicada.

### P2 — VIOLAÇÃO DE LEI 3: `/api/configuracoes` implementa regra de negócio

- **Arquivo:** `api/configuracoes/route.ts` (104 linhas)
- **O que faz:** Acessa `prismaSeguro` diretamente, implementa lógica de permissão (`temPermissao`), faz `upsert` no handler. Não passa por service.
- **Evidência:** `prisma.configuracaoEmpresa.findUnique`, `prisma.empresa.update`, `prisma.configuracaoEmpresa.upsert`, `prisma.usuario.update` — todos no handler.
- **Risco:** Lógica de negócio não testável sem HTTP. Se um dia precisar de regras mais complexas (validação de plano, limites por tenant), terá que refatorar o handler inteiro.

### P3 — DUAS FORMAS DE RATE LIMIT

- **`checarLimiteMutacao(usuario.id)`** — usado em CRUD (clientes, tarefas, leads, transacoes, implantacoes, configuracoes, historicos, lixeira). Retorna `NextResponse` ou `null`.
- **`assertRateLimit(chave, tipo)`** — usado em auth, conversa, assistente. Lança exceção.
- **Problema:** Duas APIs de rate limit com assinaturas diferentes (uma retorna response, outra lança erro). O desenvolvedor precisa saber qual usar em cada contexto.
- **Evidência:** Conviver em arquivos diferentes: `checarLimiteMutacao` está em `rate-limit.ts`, `assertRateLimit` está no mesmo arquivo mas importado separadamente.

### P4 — VALIDAÇÃO MANUAL EM COGNITIVO CONFIG

- **Arquivo:** `api/cognitivo/config/route.ts` (76 linhas)
- **O que faz:** Implementa `validarPatchBody()` com `typeof`, `includes`, try/throw manual em vez de Zod.
- **Evidência:** `if (!body \|\| typeof body !== 'object')`, `if (!obj.tipo \|\| typeof obj.tipo !== 'string')`, `throw new Error(...)`.
- **Risco:** Padrão inconsistente com o resto da base (que usa Zod). Erro de validação é `throw` em vez de `return NextResponse.json`.

### P5 — CONVERSA API SEM AUTH

- **Arquivos:** `api/conversa/route.ts` (105 linhas), `api/conversa/finalizar/route.ts` (38 linhas)
- **O que faz:** Não usa `requireUserApi`. Autenticação via cookie `conv_token`.
- **Evidência:** Nenhuma chamada a `requireUserApi()` ou `requireRole()`.
- **Contexto:** É intencional para onboarding (usuário não logado), mas não há proteção adicional quando o usuário já está logado. Qualquer um com o token (ou sniffing de cookie) acessa a conversa.

### P6 — ASSISTENTE: 353 LINHAS EM UM ARQUIVO

- **Arquivo:** `api/assistente/route.ts` (353 linhas)
- **O que contém:**
  - `buscarContexto()` — 14 queries Prisma em paralelo (118 linhas)
  - `formatarContextoParaPrompt()` — formatação de string (28 linhas)
  - `REGRAS_FORMULA` — 4 regras de resposta sem IA (24 linhas)
  - `tentarResponderPorFormula()` — classificador de pergunta (14 linhas)
  - `systemPrompt()` — prompt Anthropic (19 linhas)
  - Handler POST com streaming Anthropic (86 linhas)
- **Risco:** Um único arquivo faz: busca de dados, formatação, classificação de intenção, decisão de rota (fórmula vs IA), prompt engineering, streaming. Se qualquer parte mudar (formato do prompt, regras de fórmula, modelo Anthropic), o arquivo inteiro precisa ser alterado.

### P7 — NENHUMA ROTA USA CACHE

- Todas as rotas GET buscam dados do banco a cada requisição.
- Nenhuma usa `lib/cache.ts` (que existe e é consumido por 4 engines).
- **Evidência:** Nenhum import de `@/lib/cache` em nenhum `api/**/route.ts`.

### P8 — NENHUM ENDPOINT USA `correlationId` CONSISTENTEMENTE

- Logs são criados em algumas rotas (cognitive-heritage, criar-conta) com `createLogger`.
- A maioria das rotas não cria logger, não propaga `correlationId`.

### P9 — CONTRATO DE RESPOSTA INCONSISTENTE

- **`{ data: ... }`** — clientes, tarefas, leads, transacoes, implantacoes, historicos, configuracoes, cognitivo/config
- **`{ itens: ... }`** — lixeira
- **`{ resultado }`** — transacoes (resumo)
- **`{ success: true, patrimonio: ... }`** — cognitive-heritage
- **`{ data: ... }`** — patrimonio
- **`{ sucesso: true }`** — cognitivo/config (PATCH)
- **`{ error: ... }`** — vários formatos de erro (uns têm `detalhes`, outros não)
- **Risco:** Frontend precisa tratar 5+ formatos de resposta diferentes. Tipagem frágil.

---

## Riscos

### Curto prazo

| Risco | Probabilidade | Impacto | Descrição |
|-------|--------------|---------|-----------|
| Bug por rota consumida errada | Média | Alto | Duplicação patrimonio/cognitive-heritage pode fazer frontend consumir API errada |
| Vazamento de conversa | Baixa | Alto | Conversa sem auth além de cookie — vulnerável a XSS |
| Configuracoes sem migration de lógica | Média | Médio | Regra de negócio no handler impede teste unitário |

### Médio prazo

| Risco | Descrição |
|-------|-----------|
| Manutenção duplicada | Duas rotas de heritage exigem duas alterações para qualquer mudança |
| Onboarding de dev | 5 formatos de resposta diferentes = retrabalho em cada nova feature |
| Assistente monolítico | Refatorar o assistente para reuso (ex: mobile app) exige reescrever o arquivo inteiro |

### Longo prazo

| Risco | Descrição |
|-------|-----------|
| Ausência de middleware | Toda nova rota precisa lembrar de autenticar. Uma esquecida = falha de segurança |
| Zero cache em GET | 28 rotas GET, zero com cache. Escalabilidade limitada |
| Taxa de erro não observável | Sem correlationId, rastrear erro em produção é manual e lento |

---

## Dívidas técnicas priorizadas

### Alta prioridade

| Dívida | Arquivos | Esforço estimado | Benefício |
|--------|----------|-----------------|-----------|
| Unificar `/api/patrimonio` e `/api/cognitive-heritage` | 2 arquivos | Pequeno (1-2h) | Remove duplicação, padroniza contrato |
| Extrair `/api/configuracoes` para service | 2 arquivos (handler + novo service) | Médio (3-4h) | Torna testável, segue Lei 3 |
| Padronizar contrato de resposta | 28 arquivos | Grande (2-3 dias) | Contrato único para frontend |

### Média prioridade

| Dívida | Arquivos | Esforço estimado |
|--------|----------|-----------------|
| Extrair lógica do `/api/assistente` para service + lib | 1-2 arquivos + service | Médio (4-6h) |
| Substituir validação manual em cognitivo/config por Zod | 1 arquivo | Pequeno (1h) |
| Unificar `checarLimiteMutacao` e `assertRateLimit` | 2 funções em rate-limit.ts | Pequeno (1-2h) |

### Baixa prioridade

| Dívida | Esforço estimado |
|--------|-----------------|
| Adicionar correlationId nas rotas que não têm | 1-2 dias |
| Adicionar cache em rotas GET de leitura frequente | 2-3 dias |
| Criar middleware.ts para auth automática | 3-4 dias (alto impacto) |

---

## Recomendações

### Alta prioridade

1. **Unificar `/api/patrimonio` e `/api/cognitive-heritage`.** Manter uma rota só (`/api/patrimonio`), remover a outra. Usar Zod para validação. Padronizar resposta como `{ data }`.

2. **Extrair `/api/configuracoes` para service.** Criar `services/configuracao.service.ts` com `listarConfiguracoes()` e `atualizarConfiguracao()`. Handler chama service, não acessa Prisma.

3. **Adicionar `requireUserApi` na rota `/api/conversa`** quando o usuário está logado. Detectar sessão ativa e exigir auth; manter cookie como fallback para usuários não logados.

### Média prioridade

4. **Extrair `buscarContexto()` e `REGRAS_FORMULA` do `/api/assistente`** para `services/assistente-contexto.service.ts` e `lib/assistente-formulas.ts`.

5. **Substituir `validarPatchBody()` manual** em `cognitivo/config` por schema Zod.

6. **Unificar `checarLimiteMutacao` e `assertRateLimit`** em uma única função com assinatura consistente.

### Baixa prioridade

7. **Adicionar `correlationId`** em todas as rotas que criam logger.

8. **Criar `middleware.ts`** com proteção automática de autenticação (não para substituir `requireUserApi`, mas como camada adicional de segurança).

---

## Evidências

| Arquivo | Linha | Problema |
|---------|-------|----------|
| `api/patrimonio/route.ts` | 4-12 | Importa 6 funções da heritage-engine |
| `api/cognitive-heritage/route.ts` | 7-14 | Importa as mesmas 6 funções |
| `api/patrimonio/route.ts` | 14-22 | Validação manual com `CONSULTAS_VALIDAS.includes` |
| `api/cognitive-heritage/route.ts` | 18-20 | Validação com Zod |
| `api/configuracoes/route.ts` | 21-23 | `prisma.configuracaoEmpresa.findUnique` direto no handler |
| `api/configuracoes/route.ts` | 58-65 | `temPermissao(usuario.role, 'GESTOR')` inline |
| `api/configuracoes/route.ts` | 67-98 | `prisma.empresa.update`, `prisma.configuracaoEmpresa.upsert`, `prisma.usuario.update` direto |
| `api/cognitivo/config/route.ts` | 16-42 | `validarPatchBody()` manual com try/throw |
| `api/conversa/route.ts` | 43-77, 80-104 | Nenhum `requireUserApi()` |
| `api/conversa/finalizar/route.ts` | 8-37 | Nenhum `requireUserApi()` |
| `api/assistente/route.ts` | 35-152 | `buscarContexto()` com 14 queries + 3 funções auxiliares no mesmo arquivo |
| `api/assistente/route.ts` | 198-242 | `REGRAS_FORMULA` + `tentarResponderPorFormula` no handler |

---

## Prioridade de implementação

```
1. Unificar patrimonio/cognitive-heritage   ─── urgente (duplicação ativa)
2. Extrair configuracoes para service       ─── urgente (violação Lei 3)
3. Proteger /api/conversa com auth          ─── importante (segurança)
4. Extrair assistente para service/lib      ─── importante (manutenibilidade)
5. Zod em cognitivo/config                  ─── médio (consistência)
6. Unificar rate-limit                      ─── médio (padronização)
7. Adicionar middleware.ts                  ─── longo prazo (infra)
```

---

## Documentação impactada

Se implementadas, estas mudanças afetam:
- `CONSTITUICAO_DA_ENGENHARIA.md` — Seção 3 (hierarquia) confirma que API cognitiva pode importar engine. Nenhuma alteração necessária.
- `ARQUITETURA_CONSOLIDADA_V1.md` — Seção de APIs deve refletir a unificação.
- `GOVERNANCA_PERMANENTE.md` — Checklist de PR deve incluir verificação de duplicação de rotas.
