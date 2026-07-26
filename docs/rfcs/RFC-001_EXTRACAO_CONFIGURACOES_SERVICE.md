# RFC-001 — Extração de /api/configuracoes para camada Service

## 1. Problema

O arquivo `api/configuracoes/route.ts` implementa regras de negócio diretamente no handler HTTP, violando a Lei 3 da Constituição da Engenharia ("API nunca implementa regra de negócio"). As operações de atualização de empresa, configuração e perfil de usuário são feitas via `prismaSeguro` diretamente, sem passar por um service intermediário.

## 2. Evidências

- **Arquivo:** `sistema/src/app/api/configuracoes/route.ts` (104 linhas)
- **Linhas 21-23:** `prisma.configuracaoEmpresa.findUnique` — query no banco direto no handler
- **Linhas 58-65:** `temPermissao(usuario.role, 'GESTOR')` — regra de permissão inline
- **Linhas 67-75:** `prisma.empresa.update` — atualização direta no banco
- **Linhas 78-85:** `prisma.configuracaoEmpresa.upsert` — upsert direto no banco
- **Linhas 89-98:** `prisma.usuario.update` — atualização direta no banco
- **Constituição:** Lei 3 — "API nunca implementa regra de negócio"
- **ADRs:** Nenhum ADR cobre esta exceção

### Consumidores

- **Frontend:** `sistema/src/app/(dashboard)/configuracoes/configuracoes-content.tsx`
  - Linha 54: `fetch('/api/configuracoes')` (GET)
  - Linha 79: `fetch('/api/configuracoes', { method: 'PATCH' })` (PATCH)
- **Engine:** `cognitive-notification-engine.ts` linha 173 referencia `/configuracoes` como href (navegação, não API)
- **Engine:** `cognitive-action-composer.ts` linha 33 referencia `/configuracoes` como rota de navegação
- **Sidebar:** `components/layout/sidebar.tsx` linha 54 — link de navegação
- **Header:** `components/layout/header.tsx` linha 78-79 — links de navegação

A API tem **exatamente 1 consumidor HTTP**: `configuracoes-content.tsx`.

### Dependências internas

- `@/lib/authorize` — `requireUserApi`
- `@/lib/auth` — `getEmpresaDoUsuario`, `temPermissao`
- `@/lib/prisma-tenant-safe` — `prismaSeguro`
- `@/lib/rate-limit` — `checarLimiteMutacao`
- `@/lib/api-error` — `handleApiError`

## 3. Estado Atual

```
configuracoes-content.tsx
    ↓ fetch()
api/configuracoes/route.ts  ← contém: permissão, validação, 3 upserts, lógica de seção
    ↓
prismaSeguro (empresa, configuracaoEmpresa, usuario)
```

O handler contém 4 responsabilidades:
1. Validação de entrada (Zod `configSchema`)
2. Permissão condicional (seção empresa/configuracao exige GESTOR)
3. Três operações de banco distintas (empresa.update, configuracaoEmpresa.upsert, usuario.update)
4. Formatação de resposta

## 4. Impacto

### Curto prazo
- Nenhum. O código funciona. O impacto é apenas arquitetural.

### Médio prazo
- Se uma nova regra de configuração for adicionada (ex: validação de plano, limite por tenant), o handler crescerá mais.
- Testar a lógica de configuração exige chamada HTTP — não é testável unitariamente.

### Longo prazo
- A violação da Lei 3 se normaliza. Novos desenvolvedores copiam o padrão "prisma no handler" para outras rotas.
- A camada de serviço de configuração nunca existe — qualquer integração futura (webhook de pagamento, sincronização com Supabase) precisará replicar ou importar do handler.

## 5. Riscos

| Risco | Probabilidade | Impacto | Tipo |
|-------|--------------|---------|------|
| Handler cresce mais 50+ linhas na próxima feature de config | Média | Baixo | Manutenibilidade |
| Novo dev copia padrão "Prisma no handler" em outra rota | Média | Médio | Arquitetural |
| Teste de regressão silenciosa (upsert sem validação de campo) | Baixa | Médio | Qualidade |

## 6. Alternativas

### A — Extrair service (recomendada)

Criar `services/configuracao.service.ts` com funções dedicadas. Handler chama service.

**Vantagens:** Torna testável. Segue Lei 3. A camada de serviço pode ser reutilizada.
**Desvantagens:** Novo arquivo. Refatoração do handler.
**Riscos:** Mínimos — é extração pura, sem mudança de comportamento.

### B — Manter como está

Não alterar o handler.

**Vantagens:** Zero esforço.
**Desvantagens:** Violação da Lei 3 permanece. Handler continua não testável.
**Riscos:** Normalização da violação em outras rotas.

### C — Mover para engine

Criar uma engine de configuração.

**Vantagens:** Segue o padrão cognitivo.
**Desvantagens:** Configuração não é capacidade cognitiva. Violaria a definição de engine (Seção 6 da Constituição: "representa uma capacidade cognitiva autônoma"). Seria uma engine falsa.
**Riscos:** Inflar o grafo cognitivo com engine não-cognitiva.

### D — Extrair lib

Mover a lógica para `lib/configuracao.ts`.

**Vantagens:** Reutilizável.
**Desvantagens:** Lib não deve conter regra de negócio com permissão (Lei 4: "Lib nunca conhece UI" — e neste caso, também não deve conhecer regras de permissão de domínio). Lib é para utilidades genéricas.
**Riscos:** Misturar responsabilidades na camada lib.

## 7. Recomendação Técnica

**Alternativa A — Extrair service.** É a única que segue a hierarquia arquitetural da Constituição (Seção 3): API chama service, service acessa Prisma.

## 8. Impacto Arquitetural

| Item | Afeta? | Detalhe |
|------|--------|---------|
| Constituição | Não | Reforça Lei 3 existente |
| ADR | Não | Nenhum ADR precisa ser criado — é refatoração de implementação, não decisão arquitetural |
| Governança | Não | Checklist de PR já exige "API não implementa regra" |
| Arquitetura Consolidada | Sim | Seção de APIs deve refletir novo service |
| Inventário | Sim | Novo service deve ser adicionado ao catálogo |
| APIs | Sim | Handler fica mais enxuto |
| Engine | Não | — |
| Service | Sim | Novo arquivo `services/configuracao.service.ts` |
| Pipeline | Não | — |
| Banco | Não | Nenhuma migration |

## 9. Plano de Implementação

### Passo 1 — Criar `services/configuracao.service.ts`

Três funções:
- `listarConfiguracoes(empresaId: string, usuarioId: string)` — retorna empresa, config, usuario
- `atualizarEmpresa(empresaId: string, dados: { nome?: string; logo?: string })` — update empresa
- `atualizarConfiguracao(empresaId: string, dados: Record<string, unknown>)` — upsert configuracaoEmpresa
- `atualizarPerfil(usuarioId: string, dados: { nome?: string; cargo?: string })` — update usuario

### Passo 2 — Refatorar `api/configuracoes/route.ts`

- Substituir `prismaSeguro` por chamadas ao novo service.
- Manter validação Zod, permissão e rate limit no handler.
- Remover todo acesso direto a Prisma.

### Passo 3 — Validar

- `tsc --noEmit` sem erros
- `prisma validate` sem alterações
- Testar GET e PATCH manualmente (não existem testes automáticos para esta rota)

### Passo 4 — Atualizar documentação

- Adicionar `services/configuracao.service.ts` ao inventário da Arquitetura Consolidada.

## 10. Rollback

Reverter o commit da refatoração. Como é extração pura (sem mudança de comportamento ou schema), o rollback é trivial: `git revert`.

## 11. Critérios de Aceitação

- [ ] `api/configuracoes/route.ts` não contém mais `prisma.` (acesso direto ao banco)
- [ ] Todas as queries de banco estão em `services/configuracao.service.ts`
- [ ] `temPermissao()` permanece no handler (é regra de autorização, não de domínio)
- [ ] GET `/api/configuracoes` retorna exatamente os mesmos campos de antes
- [ ] PATCH `/api/configuracoes` com seção `empresa` atualiza nome/logo
- [ ] PATCH `/api/configuracoes` com seção `configuracao` faz upsert
- [ ] PATCH `/api/configuracoes` com seção `perfil` atualiza nome/cargo
- [ ] PATCH `/api/configuracoes` com seção `empresa` sem role GESTOR retorna 403
- [ ] `prisma validate` passa
- [ ] `tsc --noEmit` passa

## 12. Complexidade

**Baixa.** Extração pura, sem mudança de comportamento, schema, ou contrato público.

**Estimativa:** 2-3 horas.
