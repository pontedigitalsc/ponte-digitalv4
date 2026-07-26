# RFC-002 — Duplicação entre /api/patrimonio e /api/cognitive-heritage

## 1. Problema

Existem duas rotas HTTP que expõem exatamente as mesmas funções da `heritage-engine`, com contratos de resposta diferentes, validação diferente e nomenclatura diferente. Ambas não possuem nenhum consumidor no frontend, caracterizando código não apenas duplicado, mas também não utilizado.

## 2. Evidências

### Rotas envolvidas

| Aspecto | `/api/patrimonio` | `/api/cognitive-heritage` |
|---------|-------------------|--------------------------|
| Arquivo | `api/patrimonio/route.ts` | `api/cognitive-heritage/route.ts` |
| Linhas | 95 | 68 |
| Método | GET | GET |
| Auth | `requireUserApi` | `requireUserApi` |
| Validação | Manual (`CONSULTAS_VALIDAS.includes`) | Zod (`querySchema`) |
| Parâmetro | `consulta` (string) | `view` (enum) |
| Formato resposta | `{ data }` | `{ success, patrimonio }` |
| Logger | Não | Sim (`createLogger`) |

### Funções importadas (idênticas em ambas)

Ambas importam de `@/engine`:
- `obterEstadoPatrimonio`
- `obterConhecimentos`
- `avaliarEnvelhecimentoPatrimonio`
- `avaliarEsquecimento`
- `gerarSinteses`
- `obterMetricas`

### Consumidores

**Frontend (zero em ambas):**

- `grep -r "api/patrimonio"` em `app/`, `components/`, `hooks/` → **0 resultados** (exceto a própria definição da rota)
- `grep -r "cognitive-heritage"` em `app/`, `components/`, `hooks/` → **0 resultados** (exceto a própria definição da rota e engine/index.ts)

**Dependências internas das rotas:**
- `@/lib/authorize` — `requireUserApi`
- `@/lib/auth` — `getEmpresaDoUsuario` (apenas cognitive-heritage)
- `@/lib/api-error` — `handleApiError`
- `@/engine` — barrel (ambas)
- `zod` (apenas cognitive-heritage)
- `@/lib/logger` (apenas cognitive-heritage)

## 3. Estado Atual

```
Nenhum consumidor frontend
    ↓
    ├── /api/patrimonio (GET) ──→ heritage-engine (6 funções)
    └── /api/cognitive-heritage (GET) ──→ heritage-engine (6 funções)
    ↓
prismaSeguro (através das engines)
```

Ambas as rotas existem, funcionam, mas **nenhuma página, componente, hook ou serviço as chama**. Elas são acessíveis via HTTP, mas não há código que as invoque.

A `heritage-engine` é consumida internamente por outras engines (via `engine/index.ts` barrel), mas o **acesso HTTP** a essas funções não tem consumidor atualmente.

## 4. Impacto

### Curto prazo
- Nenhum. Código funciona, embora não utilizado.

### Médio prazo
- Manutenção duplicada: qualquer mudança nas funções da heritage-engine exigiria alterar duas rotas.
- Onboarding confuso: novo desenvolvedor encontra duas APIs fazendo a mesma coisa e não sabe qual usar.

### Longo prazo
- Se uma feature futura precisar expor o patrimônio cognitivo via API, escolherá uma das duas aleatoriamente, perpetuando a duplicação.
- Código morto acumulado aumenta a superfície de manutenção sem benefício.

## 5. Riscos

| Risco | Probabilidade | Impacto | Tipo |
|-------|--------------|---------|------|
| Feature futura usa a rota "errada" | Média | Baixo | Manutenibilidade |
| Bug corrigido em uma rota, esquecido na outra | Média | Médio | Qualidade |
| Remoção inadvertida de rota que era usada externamente | Baixa | Alto | Negócio |

## 6. Alternativas

### A — Remover ambas as rotas

Apagar `api/patrimonio/route.ts` e `api/cognitive-heritage/route.ts`.

**Vantagens:** Elimina código morto e duplicado. Zero manutenção futura.
**Desvantagens:** Se algum consumidor externo (outro serviço, script, integração) usa estas rotas, quebra silenciosamente.
**Riscos:** Baixo — nenhum consumidor encontrado na auditoria. Mas requer verificação adicional (ex: logs de produção, chamadas de integração externa).

### B — Manter uma, remover a outra (recomendada)

Manter `/api/patrimonio` (nome em português, consistente com o domínio), remover `/api/cognitive-heritage`. Padronizar resposta como `{ data }` e validação com Zod.

**Vantagens:** Elimina duplicação, mantém a rota disponível para uso futuro, nome consistente com o domínio em português.
**Desvantagens:** Se cognitive-heritage tem consumidor não detectado, quebra.
**Riscos:** Médio — cognitive-heritage não tem consumidor conhecido, mas o nome "cognitive-heritage" pode estar sendo usado em documentação ou integração externa não rastreável.

### C — Depreciar ambas, remover após 1 sprint

Marcar ambas como `@deprecated` na documentação e no código. Aguardar 1 sprint. Se ninguém reportar quebra, remover.

**Vantagens:** Período de segurança para detectar consumidores não rastreáveis por código.
**Desvantagens:** Manutenção de código morto por mais 2 semanas.
**Riscos:** Mínimos.

### D — Manter ambas como estão

Não fazer nada.

**Vantagens:** Zero esforço.
**Desvantagens:** Duplicação permanece. Código morto permanece.
**Riscos:** Duplicação pode ser copiada para novas rotas como "padrão aceito".

## 7. Recomendação Técnica

**Alternativa C — Depreciar ambas, remover após 1 sprint.**

Justificativa: embora a auditoria não tenha encontrado consumidores, a remoção imediata (alternativa A ou B) carrega risco de quebra de integração externa não detectada. A depreciação por 1 sprint é o procedimento padrão definido na Seção 7 da Constituição ("Como remover código").

Após o período de depreciação:

- Se nenhum consumidor reportar quebra → remover ambas (alternativa A).
- Se houver consumidor → manter `/api/patrimonio` (nome em português), remover `/api/cognitive-heritage`.

## 8. Impacto Arquitetural

| Item | Afeta? | Detalhe |
|------|--------|---------|
| Constituição | Não | Reforça princípios de código morto |
| ADR | Sim | Se a remoção for executada, registrar ADR "Remoção de rotas não utilizadas" |
| Governança | Sim | Checklist de PR deve incluir verificação de duplicação de rotas |
| Arquitetura Consolidada | Sim | Seção de APIs deve remover as rotas |
| Inventário | Sim | Remover do catálogo de APIs |
| APIs | Sim | Duas rotas removidas |
| Engine | Não | Heritage-engine não é afetada |
| Service | Não | — |
| Pipeline | Não | — |
| Banco | Não | Nenhuma migration |

## 9. Plano de Implementação

### Passo 1 — Depreciar (imediatamente)

Adicionar comentário no topo de ambos os arquivos:

```typescript
// @deprecated — Esta rota será removida em [data + 2 semanas].
// Use diretamente a heritage-engine via engine/ se necessário.
// Consumidores existentes: nenhum encontrado na auditoria de julho/2026.
```

### Passo 2 — Aguardar 1 sprint (2 semanas)

Monitorar logs de produção para chamadas a estas rotas.

### Passo 3 — Remover

Apagar:
- `sistema/src/app/api/patrimonio/route.ts`
- `sistema/src/app/api/cognitive-heritage/route.ts`

### Passo 4 — Validar

- `tsc --noEmit` sem erros
- Buscar qualquer import ou fetch pendente: `grep -r "api/patrimonio"` e `grep -r "cognitive-heritage"`
- `prisma validate` sem alterações

## 10. Rollback

Restaurar os arquivos via `git restore`. Como é apenas remoção de arquivos sem alteração de schema ou dependências compartilhadas, o rollback é trivial.

## 11. Critérios de Aceitação

- [ ] Comentário `@deprecated` adicionado em ambas as rotas
- [ ] Nenhum consumidor reportou quebra durante o período de depreciação (ou consumidores foram identificados e migrados)
- [ ] Arquivos removidos após período de depreciação
- [ ] `tsc --noEmit` passa
- [ ] Heritage-engine continua funcionando (não foi alterada)

## 12. Complexidade

**Baixa.** Remoção de código morto, sem alteração de comportamento ou schema.

**Estimativa:** 30 minutos para depreciação + 30 minutos para remoção após período.
