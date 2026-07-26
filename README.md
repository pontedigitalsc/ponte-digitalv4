# Ponte Digital — Infraestrutura Cognitiva Empresarial

> **Fase:** V4 Founder — validação de produto com empresários reais
> **Stack:** Next.js 16 + React 19 + Prisma 7 + PostgreSQL (Supabase) + Google Gemini
> **Status:** Go-Live — Empresa Zero ativa, publicando primeira versão

---

## Propósito

A Ponte Digital é uma infraestrutura cognitiva que aprende sobre o negócio do empresário e o ajuda a tomar decisões melhores. Não é um CRM, não é um ERP — é uma camada de inteligência que conecta dados, contexto e decisão.

---

## Acesso rápido

| Se você precisa | Vá para |
|----------------|---------|
| Entender o projeto | [`docs/00-START-HERE.md`](./docs/00-START-HERE.md) |
| Saber o que está sendo construído agora | [`docs/02-PRODUCT/CURRENT_PRODUCT.md`](./docs/02-PRODUCT/CURRENT_PRODUCT.md) |
| Ver a arquitetura atual | [`docs/09-ARCHITECTURE/ARCHITECTURAL_INVENTORY.md`](./docs/09-ARCHITECTURE/ARCHITECTURAL_INVENTORY.md) |
| Entender o motor cognitivo | [`docs/09-ARCHITECTURE/COGNITIVE_MAP.md`](./docs/09-ARCHITECTURE/COGNITIVE_MAP.md) |
| Navegar pelas decisões arquiteturais | [`docs/09-ARCHITECTURE/ADR_NAVIGATOR.md`](./docs/09-ARCHITECTURE/ADR_NAVIGATOR.md) |
| Índice mestre da plataforma | [`docs/09-ARCHITECTURE/KNOWLEDGE_INDEX.md`](./docs/09-ARCHITECTURE/KNOWLEDGE_INDEX.md) |

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS 4 + Radix UI + Recharts |
| Validação | Zod 4 + React Hook Form |
| Banco | PostgreSQL (Supabase) + Prisma 7 |
| Autenticação | Supabase Auth (SSR) |
| IA | Google Gemini (via AI Provider) |
| Cache | Supabase (pg-large-object) |
| Deploy | Vercel |

---

## Estrutura do projeto

```
/
├── docs/              → Documentação ativa (visão, produto, engenharia, operações)
│   ├── 00-START-HERE.md
│   ├── 01-VISION/     → Propósito, princípios, terminologia
│   ├── 02-PRODUCT/    → Escopo, roadmap, produto atual
│   ├── 03-ENGINEERING/→ Stack, arquitetura, segurança, banco
│   ├── 04-DECISIONS/  → ADRs e changelog
│   ├── 05-OPERATIONS/ → Sprints, backlog, métricas, painéis
│   ├── 06-AI/         → Regras e templates para agentes de IA
│   ├── 07-BUSINESS/   → ICP, pricing, diagnóstico, jornada
│   ├── 08-KNOWLEDGE/  → Aprendizados validados, decisões, hipóteses
│   └── 09-ARCHITECTURE/→ Documentação viva (mapas, fluxos, dependências)
├── sistema/           → Código da aplicação
│   ├── src/
│   │   ├── app/       → App Router (páginas + API routes)
│   │   ├── components/→ Componentes React
│   │   ├── hooks/     → Hooks customizados
│   │   ├── services/  → Lógica de domínio
│   │   ├── engine/    → Motor cognitivo (19 engines)
│   │   └── lib/       → Utilitários compartilhados
│   └── prisma/        → Schema + migrations
└── AGENTS.md          → Contrato obrigatório para agentes de código
```

---

## Como rodar localmente

```bash
# 1. Clone o repositório
git clone https://github.com/<SEU_USUARIO>/ponte-digital.git
cd ponte-digital/sistema

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais do Supabase e Google Gemini

# 4. Execute as migrações do banco
npx prisma migrate dev

# 5. Inicie o servidor de desenvolvimento
npm run dev
```

### Pré-requisitos

- Node.js 24+
- PostgreSQL (via Supabase)
- Conta no Google AI Studio (para chave Gemini)
- Projeto no Supabase (Auth + Database habilitados)

---

## Deploy

A Ponte Digital é implantada na Vercel. Consulte:

- [`docs/DEPLOY/VERCEL_DEPLOY.md`](./docs/DEPLOY/VERCEL_DEPLOY.md) — instruções completas de deploy
- [`docs/DEPLOY/GEMINI_SETUP.md`](./docs/DEPLOY/GEMINI_SETUP.md) — configuração do provedor de IA
- [`docs/DEPLOY/SMOKE_TEST.md`](./docs/DEPLOY/SMOKE_TEST.md) — checklist de verificação pós-deploy
- [`docs/05-OPERATIONS/OPS-CICD.md`](./docs/05-OPERATIONS/OPS-CICD.md) — pipeline CI/CD

---

## Licença

Este repositório é privado e contém propriedade intelectual da Ponte Digital.
Consulte o proprietário para obter termos de uso.

---

## Contato

- **Email:** kelven@pontedigital.com.br
- **Repositório:** [github.com/<SEU_USUARIO>/ponte-digital](https://github.com/<SEU_USUARIO>/ponte-digital)
