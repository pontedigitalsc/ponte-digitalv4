# GitHub Setup — Ponte Digital

## Status do Repositório

- **Branch principal:** `main`
- **Último commit:** `312d452` — `feat: Empresa Zero pronta para Go-Live com Google Gemini`
- **Arquivos:** 470 files, 93.533 insertions
- **Git:** inicializado, commit único, remote não configurado

## Estrutura Enviada

```
ponte-digital/
├── .gitignore          # Raiz — cobre .env, .next, node_modules, .vercel, IDE
├── AGENTS.md
├── docs/               # Documentação completa do projeto
│   ├── 00-START-HERE.md
│   ├── 01-VISION/
│   ├── 02-PRODUCT/
│   ├── 03-ENGINEERING/
│   ├── 04-DECISIONS/ADR/
│   ├── 05-OPERATIONS/
│   ├── 06-AI/
│   ├── 06-ROADMAP/
│   ├── 07-BUSINESS/
│   ├── 08-KNOWLEDGE/
│   ├── 09-ARCHITECTURE/
│   ├── DEPLOY/
│   ├── auditorias/
│   └── rfcs/
├── sistema/            # Código-fonte da aplicação Next.js
│   ├── .gitignore      # Cobertura adicional (.env, node_modules, .next)
│   ├── prisma/         # Schema + migrations + seed
│   ├── src/            # Código (app, components, engine, lib, services)
│   ├── next.config.ts
│   ├── vercel.json
│   └── package.json
└── README.md
```

## Arquivos Ignorados (não versionados)

- `.env` (credenciais Supabase + chaves IA)
- `.env.local`, `.env.development`, `.env.production`, `.env.test`
- `.vercel/`
- `node_modules/`
- `.next/` (build local)
- `coverage/`, `dist/`, `build/`, `out/`
- Arquivos IDE (`.idea/`, `.vscode/`, `*.swp`, `*.swo`)
- `*.tsbuildinfo`, `next-env.d.ts`
- `*.log`

## Checklist de Segurança

- [x] `.env` ignorado por `.gitignore` (raiz + sistema/)
- [x] Nenhum `.env` no staging area
- [x] `sistema/.git` aninhado removido
- [x] Sem chaves de IA ou Supabase no commit
- [x] `sistema/.env.example` incluso (template sem valores reais)

## Comandos para Publicar no GitHub

Como `gh` CLI não está disponível, execute os passos abaixo manualmente:

### 1. Instalar GitHub CLI (opcional, mas recomendado)

Baixar de: https://cli.github.com/

### 2. Autenticar

```bash
gh auth login
```

### 3. Criar repositório privado

```bash
gh repo create ponte-digital --private --description "Infraestrutura Cognitiva Empresarial"
```

### 4. Adicionar remote e fazer push

```bash
# Substitua SEU_USUARIO pelo seu nome de usuário do GitHub
git remote add origin git@github.com:SEU_USUARIO/ponte-digital.git
git push -u origin main
```

### 5. Alternativa manual (sem gh CLI)

1. Criar repositório em https://github.com/new
   - Nome: `ponte-digital`
   - Descrição: `Infraestrutura Cognitiva Empresarial`
   - Visibilidade: Private
   - Não iniciar com README, .gitignore ou licença

2. Conectar e fazer push:

```bash
git remote add origin https://github.com/SEU_USUARIO/ponte-digital.git
git push -u origin main
```

## Próximos Passos (Deploy Vercel)

Após o repositório estar no GitHub:

1. Acessar https://vercel.com/new
2. Importar repositório `ponte-digital`
3. Configurar:
   - **Root Directory:** `sistema`
   - **Framework:** Next.js
   - **Build Command:** `npx prisma generate && next build`
4. Adicionar variáveis de ambiente (ver `docs/DEPLOY/VERCEL_DEPLOY.md`)
5. Deploy
6. Executar smoke test (`docs/DEPLOY/SMOKE_TEST.md`)
