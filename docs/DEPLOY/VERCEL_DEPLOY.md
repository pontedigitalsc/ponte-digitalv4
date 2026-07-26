# Deploy na Vercel — Ponte Digital

## 1. Conectar repositório

1. Acesse https://vercel.com/new
2. Importe o repositório GitHub da Ponte Digital
3. Selecione o diretório `sistema/` como root do projeto
4. Framework: Next.js (detectado automaticamente)

## 2. Configurar build

A Vercel detecta `vercel.json` automaticamente. Verifique:
- **Build Command:** `npm run build` (definido em `vercel.json`)
- **Install Command:** `npm ci && npx prisma generate` (definido em `vercel.json`)
- **Output Directory:** (automático, framework Next.js)

## 3. Variáveis de ambiente

Adicionar em **Production**, **Preview** e **Development**:

### Supabase
| Variável | Valor |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ooczikpgogmcqzvctyik.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |

### Banco
| Variável | Valor |
|----------|-------|
| `DATABASE_URL` | `postgresql://postgres.ooczikpgogmcqzvctyik:8fup8Pu1A8nsp8vz@aws-1-sa-east-1.pooler.supabase.com:5432/postgres` |
| `DIRECT_URL` | `postgresql://postgres.ooczikpgogmcqzvctyik:8fup8Pu1A8nsp8vz@aws-1-sa-east-1.pooler.supabase.com:5432/postgres` |

### IA
| Variável | Valor |
|----------|-------|
| `AI_PROVIDER` | `google` |
| `GOOGLE_API_KEY` | `AIza...` (gerar em aistudio.google.com/apikey) |
| `AI_MODEL` | `gemini-2.5-flash` |

### App
| Variável | Valor |
|----------|-------|
| `NEXT_PUBLIC_APP_URL` | Deixar vazio inicialmente — definir após deploy com a URL `.vercel.app` |

## 4. Executar deploy

1. Clique em **Deploy**
2. Aguardar build (2-3 minutos)
3. URL gerada: `https://<projeto>.vercel.app`

## 5. Pós-deploy

1. Atualizar `NEXT_PUBLIC_APP_URL` no Vercel com a URL `.vercel.app`
2. Fazer novo deploy (ou redeploy automático)
3. Validar health check: `https://<url>/api/health`

## 6. CI/CD

O workflow `.github/workflows/ci.yml` executa automaticamente:
- `npm ci` → `prisma generate` → `lint` → `typecheck` → `build`
- Deploy preview em pull requests (requer `VERCEL_TOKEN` no GitHub Secrets)

Para ativar previews automáticos em PRs:
```bash
# No GitHub, adicionar secret:
# VERCEL_TOKEN=<token_gerado_no_dashboard_vercel>
```
