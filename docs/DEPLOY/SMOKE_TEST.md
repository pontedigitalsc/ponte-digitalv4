# Smoke Test — Ponte Digital (Go-Live Empresa Zero)

## Instruções

Executar na URL pública após o deploy. Marcar cada item como ✅ OK, ⚠️ WARNING ou ❌ FAIL.

---

### 1. INFRAESTRUTURA BÁSICA

- [ ] `https://<url>/` — Landing page abre (status 200)
- [ ] `https://<url>/api/health` — Health check responde JSON
- [ ] `https://<url>/robots.txt` — Robots servido corretamente
- [ ] `https://<url>/sitemap.xml` — Sitemap servido corretamente
- [ ] `https://<url>/manifest.webmanifest` — Manifest servido
- [ ] `https://<url>/icon.svg` — Favicon canônico (SVG P100B) retorna 200
- [ ] `https://<url>/rota-inexistente` — 404 personalizada (não tela branca)
- [ ] HTTPS ativo (sem erro de certificado)
- [ ] Headers de segurança presentes (CSP, HSTS, X-Frame-Options)

### 2. PRIMEIRA EXPERIÊNCIA (ANÔNIMO)

- [ ] Landing carrega sem erros no console
- [ ] Botão "Começar" ou CTA inicia diagnóstico
- [ ] `/conversa` — Página de conversa carrega
- [ ] Cookie `conv_token` criado ao acessar `/conversa`
- [ ] Primeira pergunta aparece na conversa
- [ ] Resposta é registrada (POST para `/api/conversa`)
- [ ] É possível responder múltiplas perguntas
- [ ] Barra de progresso avança conforme responde
- [ ] Última pergunta → "Finalizar" aparece
- [ ] Resumo cognitivo é gerado ao finalizar

### 3. CRIAÇÃO DE CONTA

- [ ] `/criar-conta` — Página carrega
- [ ] Formulário valida campos obrigatórios
- [ ] Criação de conta com e-mail/senha funciona
- [ ] Redireciona para `/login` após criar
- [ ] Usuário recém-criado consegue fazer login
- [ ] Login redireciona para `/experience/login` → `/dashboard`
- [ ] Empresa vinculada ao usuário (dados do seed)

### 4. DASHBOARD

- [ ] `/dashboard` — Dashboard carrega sem erros
- [ ] Sidebar renderiza com todos os módulos
- [ ] Nome do usuário aparece no layout
- [ ] Métricas do dashboard são carregadas (fetch para engine)
- [ ] Nenhum erro 500 ou 404 no carregamento
- [ ] Estado vazio para listas sem dados

### 5. MÓDULOS

- [ ] `/crm` — Pipeline de leads abre
- [ ] `/clientes` — Lista de clientes abre (vazia)
- [ ] `/financeiro` — Transações abre
- [ ] `/tarefas` — Tarefas abre
- [ ] `/historico` — Histórico abre
- [ ] `/implantacoes` — Implantações abre
- [ ] `/configuracoes` — Configurações abre
- [ ] `/conhecimento` — Biblioteca de conhecimento abre
- [ ] `/aprendizados` — Aprendizados abre
- [ ] `/centro-decisao` — Centro de decisão abre
- [ ] `/assistente` — Assistente IA abre

### 6. ASSISTENTE IA

- [ ] Chat carrega sem erros
- [ ] É possível enviar mensagem
- [ ] Assistente responde (mesmo com NoopProvider → vazio)
- [ ] Se Groq configurado: respostas com conteúdo real
- [ ] Histórico da conversa persiste
- [ ] Rate limit respeitado (429 após muitas requisições)

### 7. SEGURANÇA

- [ ] `/dashboard` sem sessão → redirect para `/login`
- [ ] `/api/clientes` sem sessão → 401 JSON
- [ ] Cookie `conv_token` tem `secure` e `httpOnly`
- [ ] CSP bloqueia scripts inline não autorizados
- [ ] Rate limit: `/api/assistente` bloqueia após excesso
- [ ] Rate limit: `/api/conversa` bloqueia após excesso

### 8. PERFORMANCE

- [ ] Landing carrega em < 3s (primeira visita)
- [ ] Dashboard carrega em < 5s
- [ ] Conversa responde em < 2s por pergunta
- [ ] Assistente responde em < 10s (depende do provider)
- [ ] Build sem warnings críticos

### 9. LOGS

- [ ] Nenhum erro 500 nos logs do Vercel
- [ ] Nenhum erro 404 não intencional
- [ ] Nenhum erro de conexão com banco
- [ ] Prisma Client gerado sem warnings
- [ ] Proxy (middleware) sem falhas

### 10. BANCO

- [ ] Conexão Supabase ativa
- [ ] Tabelas do Prisma existem no banco
- [ ] Seed aplicado: empresa "Ponte Digital" existe
- [ ] Usuário admin `kelven@pontedigital.com.br` existe
- [ ] Sessões Supabase são criadas no login

---

## Resultado

| Seção | Total | ✅ OK | ⚠️ WARNING | ❌ FAIL |
|-------|-------|-------|-------------|--------|
| 1. Infraestrutura | 10 | | | |
| 2. Primeira Experiência | 10 | | | |
| 3. Criação de Conta | 6 | | | |
| 4. Dashboard | 5 | | | |
| 5. Módulos | 11 | | | |
| 6. Assistente | 5 | | | |
| 7. Segurança | 6 | | | |
| 8. Performance | 5 | | | |
| 9. Logs | 5 | | | |
| 10. Banco | 5 | | | |
| **Total** | **68** | | | |

**Critério de aprovação:** ≥ 60/68 OK, zero ❌ FAIL em seções 1-4 e 7.
