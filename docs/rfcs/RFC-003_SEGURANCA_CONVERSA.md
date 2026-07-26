# RFC-003 — Segurança da /api/conversa

## 1. Problema

As rotas `/api/conversa` e `/api/conversa/finalizar` não utilizam `requireUserApi()` ou qualquer mecanismo de autenticação de usuário logado. A única proteção é um cookie `conv_token` de 7 dias, armazenado sem vínculo com conta de usuário. Isto significa que qualquer pessoa com acesso ao cookie pode ler, continuar ou finalizar qualquer conversa associada àquele token.

Após a criação da conta (`POST /api/auth/criar-conta`), as rotas de conversa continuam acessíveis com o mesmo cookie — não há transição para autenticação de usuário.

## 2. Evidências

### Arquivos

- `sistema/src/app/api/conversa/route.ts` (105 linhas)
- `sistema/src/app/api/conversa/finalizar/route.ts` (38 linhas)

### Ausência de auth

- `api/conversa/route.ts` linha 43: `export async function GET(request: NextRequest)` — sem `requireUserApi`
- `api/conversa/route.ts` linha 80: `export async function POST(request: NextRequest)` — sem `requireUserApi`
- `api/conversa/finalizar/route.ts` linha 8: `export async function POST(request: NextRequest)` — sem `requireUserApi`

### Mecanismo atual de autenticação

- Cookie `conv_token`, definido em `garantirToken()` (linhas 11-27):
  - `httpOnly: true` — protegido contra XSS
  - `sameSite: 'lax'` — protegido contra CSRF em cenários comuns
  - `maxAge: 60 * 60 * 24 * 7` — expira em 7 dias
  - `path: '/'` — disponível em toda a aplicação

### Consumidores

| Consumidor | Arquivo | Uso |
|-----------|---------|-----|
| Página de conversa (onboarding) | `app/conversa/page.tsx` | GET para iniciar/retomar, POST para responder, POST para finalizar |
| Página de criar conta | `app/(auth)/criar-conta/page.tsx` | GET `api/conversa` para verificar se conversa existe |
| API de criar conta | `app/api/auth/criar-conta/route.ts` | Lê cookie `conv_token`, chama `obterRespostas` e `processarCadastro` |

### Fluxo atual completo

```
1. Usuário visita /conversa (não logado)
2. GET /api/conversa → cookie conv_token é criado, primeira pergunta retornada
3. Usuário responde perguntas via POST /api/conversa
4. POST /api/conversa/finalizar → interpretações geradas
5. Usuário é redirecionado para /criar-conta
6. Página /criar-conta faz GET /api/conversa para validar token ativo
7. POST /api/auth/criar-conta envia cookie conv_token, chama processarCadastro
8. Conta criada, usuário logado → rotas de conversa não são mais usadas
```

### ADRs relacionados

Nenhum ADR cobre o modelo de segurança da conversa.

### Constituição

Lei 8 — "Toda query multi-tenant inclui empresaId no where" — não se aplica (conversa é pré-tenant).
Lei 3 — "API nunca implementa regra de negócio" — não violada (conversa chama engine).

## 3. Estado Atual

```
Usuário não logado
    ↓
/conversa/page.tsx → fetch /api/conversa (cookie conv_token)
                          ↓
                    conversation-engine (sem tenant, sem usuário)
                          ↓
                    prismaSeguro.conversa (token-based, sem empresaId)
    ↓
/criar-conta/page.tsx → GET /api/conversa (valida token)
    ↓
POST /api/auth/criar-conta → lê cookie, chama processarCadastro
    ↓
Usuário logado → rotas de conversa não são mais chamadas
```

As conversas são armazenadas no modelo `conversa` sem `empresaId` (pré-tenant). O token é a única chave de acesso.

## 4. Impacto

### Curto prazo
- Risco baixo: cookie httpOnly + sameSite lax protegem contra ataques comuns.
- Risco moderado: cookie vale por 7 dias em toda a aplicação (`path: '/'`). Qualquer subrota pode ler o cookie.

### Médio prazo
- Se a plataforma crescer e a conversa de onboarding evoluir para um chat pós-login, a falta de autenticação de usuário será um problema de segurança e de produto (não será possível associar conversas históricas a usuários).

### Longo prazo
- Se houver múltiplos dispositivos ou sessões, o cookie não vincula conversa a dispositivo — qualquer um com o token acessa.

## 5. Riscos

| Risco | Probabilidade | Impacto | Tipo |
|-------|--------------|---------|------|
| Cookie lido por script em subrota vulnerável | Baixa (httpOnly) | Alto | Segurança |
| Token adivinhado (crypto.randomUUID) | Muito baixa | Alto | Segurança |
| Usuário finaliza conversa em dispositivo público, cookie permanece 7 dias | Média | Médio | Privacidade |
| Conversa não vinculada a usuário após cadastro | Alta | Baixo | Produto |

## 6. Alternativas

### A — Manter como está

Continuar usando apenas cookie `conv_token` para todas as rotas de conversa.

**Vantagens:** Zero alteração. Fluxo de onboarding funciona perfeitamente.
**Desvantagens:** Nenhuma proteção adicional. Conversa nunca vinculada a usuário.
**Riscos:** Atuais (baixo-médio).

### B — Adicionar `requireUserApi` opcional pós-registro (recomendada)

Modificar `GET /api/conversa` para detectar se o usuário está logado (via cookie de sessão do Supabase). Se estiver, usar `requireUserApi` e vincular a conversa ao `usuarioId`. Se não estiver, manter o fluxo atual com `conv_token`.

**Vantagens:** Conversas pós-registro ficam vinculadas ao usuário. Rota ganha proteção adicional sem quebrar onboarding anônimo.
**Desvantagens:** Lógica condicional no handler (dois fluxos no mesmo código).
**Riscos:** Baixo — é aditivo, não modifica fluxo existente.

### C — Separar rotas: `/api/conversa/anon` e `/api/conversa/auth`

Criar duas rotas distintas: uma para usuário não logado (cookie token), outra para usuário logado (`requireUserApi`).

**Vantagens:** Separação clara de responsabilidades. Cada rota tem seu modelo de auth.
**Desvantagens:** Duas rotas. Frontend precisa saber qual chamar. Mudança no contrato público.
**Riscos:** Médio — quebra consumidores existentes (conversa/page.tsx, criar-conta/page.tsx).

### D — Vincular conversa a usuário no momento do cadastro

No `POST /api/auth/criar-conta`, após criar o usuário, atualizar a conversa com `usuarioId` e `empresaId`. A partir deste momento, a conversa pode ser acessada tanto por cookie quanto por `requireUserApi`.

**Vantagens:** Conversa fica vinculada ao usuário sem mudar as rotas de conversa.
**Desvantagens:** A rota de conversa continua sem auth para conversas não vinculadas.
**Riscos:** Baixo — é aditivo, não quebra fluxo existente.

### E — Combinar B + D (recomendação final)

Adicionar `requireUserApi` condicional na rota (alternativa B) + vincular conversa ao usuário no cadastro (alternativa D).

**Vantagens:** Conversa anônima funciona como hoje. Conversa pós-cadastro fica vinculada e protegida. Não quebra consumidores existentes.
**Desvantagens:** Duas pequenas alterações em vez de uma.
**Riscos:** Mínimos.

## 7. Recomendação Técnica

**Alternativa E — Combinar B + D.**

Justificativa: É a única alternativa que:
1. Não quebra o fluxo de onboarding anônimo (passo crítico de produto — o empresário responde perguntas ANTES de criar conta).
2. Adiciona proteção sem custo para o usuário.
3. Vincula a conversa ao usuário no momento do cadastro, criando rastreabilidade.
4. Prepara o terreno para um eventual chat cognitivo pós-login (as conversas teriam dono).

## 8. Impacto Arquitetural

| Item | Afeta? | Detalhe |
|------|--------|---------|
| Constituição | Não | Nenhuma Lei é violada ou precisa ser criada |
| ADR | Sim | Registrar decisão: "Modelo de segurança dual para conversa onboarding" |
| Governança | Sim | Checklist de segurança deve incluir verificação de rotas com dual auth |
| Arquitetura Consolidada | Sim | Seção de fluxos deve refletir o modelo de segurança da conversa |
| Inventário | Não | Nenhum novo módulo |
| APIs | Sim | `api/conversa/route.ts` — lógica condicional de auth |
| Engine | Não | `conversation-engine` não é alterada |
| Service | Não | — |
| Pipeline | Não | — |
| Banco | Sim (migration) | `conversa` tem `empresaId` (opcional) mas **não tem `usuarioId`**. Migration necessária. |

### Descoberta crítica no schema

O modelo `Conversa` (schema.prisma linha 808) **já possui** `empresaId String?` (opcional) e o comentário na linha 805 confirma: *"A conversa é anônima até ser vinculada a uma empresa no momento da criação da conta."*

**Mas não possui `usuarioId`.** Se a recomendação incluir vincular a usuário (alternativa D/E), será necessária uma migration para adicionar `usuarioId String?` opcional.

**Alternativa simplificada:** Se vincular apenas a `empresaId` (sem `usuarioId`), **nenhuma migration é necessária** — o campo já existe. A conversa ficaria vinculada à empresa, não ao usuário específico. Isto reduz a complexidade de Alta para Baixa.

## 9. Plano de Implementação

### Passo 0 — Schema (verificado)

O modelo `Conversa` já possui `empresaId String?` (opcional, schema.prisma linha 814). **Nenhuma migration necessária** para vincular a conversa à empresa. O campo `usuarioId` não será adicionado nesta RFC (adiar para quando houver necessidade de produto).

### Passo 1 — Adicionar auth condicional em `GET /api/conversa`

```typescript
// Tentar obter usuário logado (opcional — não falha se não estiver logado)
let usuario: Usuario | null = null
try {
  usuario = await requireUserApi()
} catch {
  // Usuário não logado — fluxo anônimo
}
```

Se `usuario` existir, usar `usuario.empresaId` e `usuario.id` nas operações da conversa.

### Passo 2 — Vincular conversa no cadastro

Em `POST /api/auth/criar-conta`, após criar o usuário e empresa. O campo `empresaId` já existe no schema `Conversa` como opcional (linha 814 do schema.prisma). A commentário no schema confirma: *"A conversa é anônima até ser vinculada a uma empresa no momento da criação da conta."*

```typescript
await prismaSeguro.conversa.updateMany({
  where: { token, concluida: false },
  data: { empresaId: empresa.id }
})
```

Nenhuma migration é necessária.

### Passo 3 — Validar

- Fluxo anônimo: `/conversa` → perguntas → finalizar → `/criar-conta` → conta criada
- Se usuário logado acessar `/api/conversa`, usar auth

## 10. Rollback

Reverter as alterações em `api/conversa/route.ts` e `api/auth/criar-conta/route.ts`. Se houver migration, reverter também.

## 11. Critérios de Aceitação

- [ ] Usuário não logado consegue iniciar e responder conversa (fluxo atual intacto)
- [ ] Usuário não logado consegue finalizar conversa (fluxo atual intacto)
- [ ] `POST /api/auth/criar-conta` vincula a conversa à empresa recém-criada (`empresaId`)
- [ ] Nenhuma migration é necessária (campo `empresaId` já existe no schema)
- [ ] `prisma validate` passa
- [ ] `tsc --noEmit` passa

## 12. Complexidade

**Baixa** (se vincular apenas `empresaId`, sem migration) ou **Média** (se adicionar `usuarioId` com migration).

**Estimativa:** 1-2 horas (apenas empresaId) ou 3-5 horas (com usuarioId + migration).

**Recomendação:** Implementar apenas o vínculo com `empresaId` (já existe no schema, sem migration). Adiar `usuarioId` para quando houver necessidade de produto (chat pós-login com histórico por usuário).
