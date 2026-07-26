# Fluxo de Diagnóstico sem Fricção

> PROGRAMA 15 — Documento 3 de 10
> Fluxo de entrada sem atrito: entrada anônima, progressão de contexto, preservação de sessão, vínculo posterior

---

## Relatório de execução

- **Descobertas:** o fluxo de conversa anônima JÁ EXISTE no código — cookie `conv_token`, modelo `Conversa.empresaId?`, 7 dias de expiração. O que não existe é a landing page que inicia esse fluxo e a experiência sem login na raiz.
- **Pressupostos:** o atual fluxo de conversa anônima é a base correta. Não precisa ser refeito — apenas exposto corretamente (landing page pública).
- **Lacunas:** landing page inexistente, cookie expira em 7 dias (pode ser curto demais para alguns perfis), não há mecanismo de "recuperação de sessão" se o cookie for perdido.
- **Riscos:** alterar o cookie `conv_token` existente pode quebrar conversas em andamento. Qualquer mudança deve ser compatível com o fluxo atual de `GET/POST /api/conversa`.
- **Conflitos:** nenhum.
- **Impactos futuros:** este fluxo define o padrão de entrada para TODOS os futuros usuários. A fricção zero é a base da confiança.
- **Confirmação de coerência:** coerente com a Jornada Fundacional (Capítulos 2-3) e com o código existente (conversa anônima já implementada).

---

## 1. Princípios do fluxo sem fricção

1. **Valor antes de identidade:** o empresário recebe valor (diagnóstico, resumo) antes de qualquer barreira
2. **Progressão natural:** o nível de compromisso aumenta com o valor percebido, não com barreiras artificiais
3. **Preservação de contexto:** nada do que ele fez anonimamente é perdido ao criar conta
4. **Desistência sem custo:** ele pode sair quando quiser, sem perder o que conquistou (dentro do prazo)
5. **Segurança por design:** a sessão anônima é segura sem precisar de autenticação forte

---

## 2. Macrofluxo técnico

```
Visitante
    │
    ▼
[Landing page pública]  ← SEM auth, SEM cookie
    │
    ▼
[Clique em "Descobrir agora"]
    │
    ▼
[GET /api/sessao/iniciar]   ← NOVO endpoint
    ├─ Gera conv_token (UUID v4)
    ├─ Cria cookie httpOnly, sameSite=lax, path=/, maxAge=7d
    └─ Redireciona para /conversa
    │
    ▼
[/conversa]
    ├─ GET /api/conversa → carrega ou cria primeira pergunta
    ├─ POST /api/conversa → envia resposta, recebe micro-reação + próxima pergunta
    └─ POST /api/conversa/finalizar → gera resumo + interpretações
    │
    ▼
[Resumo em linguagem natural]
    │
    ▼
[Botão "Quero criar minha conta"] → /criar-conta
    │
    ▼
[POST /api/auth/criar-conta]
    ├─ Cria Supabase User
    ├─ Cria Empresa
    ├─ Vincula Conversa (empresaId)
    └─ Orchestrator → Identidade Digital → Ativação
```

---

## 3. Entrada anônima (o que muda)

### 3.1 Hoje

O fluxo atual no código:
1. Visitante acessa `/` → redireciona para `/dashboard`
2. `/dashboard` exige `requireUser()` → redireciona para `/login`
3. Visitante precisa criar conta ou fazer login
4. Se consegue acessar `/conversa`, o cookie `conv_token` é criado automaticamente pelo `GET /api/conversa`

### 3.2 Novo fluxo proposto

1. Visitante acessa `/` → vê landing page pública
2. Clica "Descobrir agora" → `GET /api/sessao/iniciar` → cria cookie → redireciona para `/conversa`
3. Fluxo de conversa existente continua idêntico
4. Ao final, resumo + opção de criar conta

### 3.3 O que precisa ser criado/modificado

| Item | Tipo | Descrição |
|------|------|-----------|
| Landing page | NOVO | `sistema/src/app/page.tsx` (hoje redireciona) |
| `GET /api/sessao/iniciar` | NOVO | Cria cookie e redireciona |
| Ajuste em `GET /api/conversa` | MODIFICADO | Se não houver `conv_token`, retorna erro 400 em vez de criar um automaticamente (quem cria é `/api/sessao/iniciar`) |

### 3.4 Sessão anônima — o que contém

| Dado | Onde | Observação |
|------|------|------------|
| `conv_token` | Cookie httpOnly | UUID v4, 7 dias |
| `Conversa` | Banco (Prisma) | `id`, `token`, `fluxo`, `etapa`, `respostas`, `concluida`, `empresaId: null` |
| `respostas` | `Conversa.respostas (Json)` | `{ perguntaId: resposta }` |
| `etapa` | `Conversa.etapa (String?)` | Etapa do fluxo |

Nada mais. Sem e-mail, sem nome, sem telefone, sem IP armazenado como identificador.

---

## 4. Progressão de contexto

### 4.1 Como o contexto evolui

| Estágio | Contexto disponível | Onde |
|---------|---------------------|------|
| Antes do clique | Nenhum | — |
| Durante diagnóstico | `respostas` parciais | `Conversa.respostas` |
| Final do diagnóstico | `respostas` completas + `interpretacoes` | `Conversa.respostas` + em memória |
| Pós-cadastro | Tudo acima + Identidade Digital | `IdentidadeDigital` + `Conversa.empresaId` |

### 4.2 Como o contexto é recuperado

- **Mesma sessão (cookie válido):** `GET /api/conversa` → lê cookie → busca `Conversa` por token → retorna etapa atual + respostas existentes
- **Nova sessão (cookie expirado):** o empresário vê a landing page novamente → recomeça
- **Pós-cadastro (cookie mantido):** `Conversa.empresaId` deixa de ser null → Identidade Digital é gerada

### 4.3 Recuperação parcial (cookie existe mas expirado)

Se o cookie expirou mas o empresário lembra do e-mail que usou (se informou), o sistema pode:
- Perguntar "Já esteve aqui antes? Informe seu e-mail e retomamos de onde parou"
- Buscar `Conversa` pelo `token` associado ao e-mail (se ele informou e-mail no resumo)

Critério: só perguntar e-mail se ele optou por "Guardar e ver depois" E informou e-mail voluntariamente.

---

## 5. Preservação de sessão

### 5.1 Duração da sessão anônima

| Prazo | Ação |
|-------|------|
| 7 dias (cookie) | Sessão ativa — pode retomar |
| 7-14 dias | Cookie expirado — sessão perdida |
| 14+ dias | Dados da Conversa podem ser limpos (GDPR/LGPD) |

### 5.2 O que acontece com a Conversa após expiração

- **Se não houve cadastro:** a `Conversa` com `empresaId: null` mais velha que 30 dias pode ser deletada (cron job)
- **Se houve cadastro:** a `Conversa` com `empresaId` populado é preservada como parte do patrimônio cognitivo

### 5.3 Extensão de sessão

Se o empresário volta no dia 6 (cookie perto de expirar) e interage, o cookie é renovado por mais 7 dias (`maxAge` resetado a cada requisição).

---

## 6. Vínculo posterior

### 6.1 O momento do vínculo

Quando o empresário clica em "Quero criar minha conta e continuar" e preenche o formulário:

```
POST /api/auth/criar-conta
Body: { nome, email, senha, nomeEmpresa }
Cookie: conv_token=xxx

Response: { redirect: "/dashboard" }
```

### 6.2 O que acontece no servidor

1. Lê `conv_token` do cookie
2. Cria usuário no Supabase Auth
3. Cria Empresa no banco
4. **Vincula a Conversa:** `prisma.conversa.updateMany({ where: { token }, data: { empresaId } })`
5. Executa `processarCadastro()` no Orchestrator
6. Limpa o cookie `conv_token` (não é mais necessário — agora temos Supabase session)

### 6.3 Preservação do patrimônio cognitivo

Tudo que foi acumulado anonimamente é transferido:
- `Conversa.respostas` → usado para gerar Identidade Digital
- `Conversa.interpretacoes` → armazenado em `IdentidadeDigital`
- Histórico de micro-reações → não é armazenado (eram efêmeras)

Nada é perdido. Nada é recomeçado.

---

## 7. Regras de segurança

| Regra | Justificativa |
|-------|---------------|
| `conv_token` é httpOnly | Nunca exposto ao JavaScript do frontend |
| `conv_token` é UUID v4 | Impossível de adivinhar |
| `conv_token` tem 7 dias de vida | Janela de exposição limitada |
| `Conversa.empresaId=null` não tem dados pessoais | LGPD — sem e-mail, nome ou telefone |
| `Conversa.respostas` contém apenas dados de negócio | Sem dados biométricos, sensíveis ou financeiros reais |
| Apenas 1 conversa por token | Não permite acumular múltiplas sessões anônimas |
| Rate limit em `/api/sessao/iniciar` | Evita criação massiva de tokens |

---

## 8. Pontos de corte

### 8.1 Quando o sistema corta a sessão anônima

| Condição | Ação |
|----------|------|
| Cookie expirado | Sessão perdida — precisa recomeçar |
| Conversa concluída + 30 dias sem cadastro | Conversa pode ser deletada |
| Conversa com `empresaId` populado | Sessão anônima encerrada — agora é usuário autenticado |
| Mais de 1 Conversa por token | Mantém a mais recente, arquiva as antigas |
| Abuso (muitas requisições em curto período) | Rate limit — bloqueio temporário |

### 8.2 Quando o sistema NÃO corta

| Condição | Motivo |
|----------|--------|
| Empresário parou no meio do diagnóstico | Conversa incompleta — pode retomar |
| Empresário viu o resumo e foi embora | Conversa concluída — pode voltar (7 dias) |
| Empresário criou conta a partir de outro dispositivo | A conversa original fica vinculada ao token, não ao dispositivo |

---

## 9. Dependências com o código existente

| Arquivo existente | Relação |
|-------------------|---------|
| `sistema/src/app/api/conversa/route.ts` | Preservar — apenas ajustar para aceitar `conv_token` criado externamente |
| `sistema/src/app/conversa/page.tsx` | Preservar — fluxo de UI da conversa |
| `sistema/src/app/(auth)/criar-conta/page.tsx` | Preservar — cadastro pós-conversa |
| `sistema/src/app/api/auth/criar-conta/route.ts` | Preservar — vincula conversa |
| `sistema/src/engine/conversation-engine.ts` | Preservar — lógica da conversa |
| `sistema/src/lib/auth.ts` | Preservar — requireUser para rotas protegidas |

| Novo arquivo | Descrição |
|--------------|-----------|
| `sistema/src/app/api/sessao/iniciar/route.ts` | Cria cookie conv_token e redireciona |
| `sistema/src/app/page.tsx` (substituir redirect) | Landing page pública |

---

*Documento concluído. Avançando para Documento 4.*
