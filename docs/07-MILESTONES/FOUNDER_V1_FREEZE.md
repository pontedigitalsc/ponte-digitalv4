# FOUNDER V1 FREEZE — Congelamento Oficial da Ponte Digital

> **STATUS: PRODUCTION LIVE + FOUNDER V1 CONGELADO.**
> **Data:** 2 de agosto de 2026
> **Programa:** P56 — Produção Certificada + Fundação Histórica da Ponte Digital
> **Produção:** `https://ponte-digital.vercel.app` (commit `ca4a099`/`main`; saudável em `/api/health`)

---

## 1. Por que este congelamento

A Ponte Digital encerrou a fase de construção. Tudo que foi projetado, do P1 ao P55, está **no mundo real, em produção**. A partir deste marco, **nenhuma funcionalidade entra por opinião interna**: toda evolução nasce de uso real, conversas reais e aprendizados reais de Founders.

Este documento registra o que está **congelado** — o que existe hoje, o que se sabe limitado, e as regras pelas quais a plataforma pode evoluir.

---

## 2. Arquitetura congelada

| Camada | Estado congelado |
|--------|------------------|
| **Framework** | Next.js 16.2.9 (App Router), React 19, Tailwind 4 + shadcn/ui |
| **Backend** | API Routes + Server Components (54 rotas), proxy/middleware SSR |
| **Banco** | PostgreSQL via Supabase (pooler `aws-1-sa-east-1`), Prisma 7 |
| **Auth** | Supabase Auth (SSR, session cookie httpOnly) |
| **IA** | Google Gemini 2.5 Flash (provider plugável: google/groq/anthropic/noop) |
| **Multi-tenancy** | `prismaSeguro` tenant guard + soft delete + audit trail |
| **Deploy** | Vercel (equipe `ponte-digital1`, projeto `ponte-digital`) |
| **Cache** | In-memory por instância (TTL 5s–300s); Redis adiado até >100 Founders |

Arquitetura detalhada e ao vivo em `docs/09-ARCHITECTURE/`. Nenhuma mudança arquitetural entra sem ADR.

## 3. Funcionalidades existentes (congeladas como estão)

- **Experiência Founder:** primeira conversa (5 estágios do conselheiro), Centro Diário (5 perguntas essenciais), ritual diário, Linha da Vida, evolução do fundador em 4 dimensões, memória afetiva, índice de clareza, próximo melhor movimento.
- **Operação:** clientes, negociações (prospecção), tarefas, financeiro (caixa), atendimento, implantações.
- **Patrimônio:** históricos, aprendizados, recomendações com origem, perguntas que constroem empresas (Pergunta Aberta da Semana), Painel do Fundador.
- **IA resiliente:** `/api/assistente` com timeout 30s + `FALHA_GENTIL`; `/api/conversa` degrada com `.catch`.

Rotas e métodos completos: ver `docs/09-ARCHITECTURE/ARCHITECTURAL_INVENTORY.md` e a certidão `PRODUCTION_CERTIFIED_V1.md`.

## 4. Limitações conhecidas (registradas, não escondidas)

- **Região/latência:** cache em memória é por instância (não compartilhado entre instâncias Vercel). Adequado até ~100 Founders; Redis depois.
- **Escala de banco:** pooler Supabase com limite de conexões — adequado a <100 empresas.
- **Domínio custom `pontedigital.com.br`:** segue pendente (sob outra conta Vercel + DNS em hosting antigo); URL oficial é `ponte-digital.vercel.app`. Ver `KNOWN_ISSUES.md`.
- **Jornada interativa completa:** depende de um Founder humano para a validação de ponta a ponta real (Etapas 3/4 humanas) — coberta por smoke público + validação por código.
- **Itens comerciais:** e-mail corporativo, CNPJ, política de privacidade/LGPD, monitoramento/analytics/backup/habilidade e canal de suporte → registrados na certidão, decididos na fase operacional.

## 5. Princípios imutáveis (não mudam nunca)

1. **Evidência antes de opinião.**
2. **Simplicidade antes de complexidade.**
3. **Empresário antes de tecnologia.**
4. **Conhecimento como patrimônio.**
5. **Evolução baseada em realidade.**
6. **Soft delete, audit trail e tenant guard em todo model.**
7. **O agente executa, o fundador decide.**
8. **A Ponte não decide pelo empresário** (Regra de Ouro) — a IA é interface, não o cérebro.

Ver `docs/01-VISION/FOUNDATION.md` e `docs/06-CONSTITUTION/P32/` (fundação formal).

## 6. Regras de evolução

A partir de agora:

1. **Toda melhoria nasce de uso real** — um problema observado em uma empresa real usando a plataforma.
2. Toda funcionalidade proposta deve passar pela **Matriz de Decisão** (três perguntas) e pela **Árvore de Decisões de Produto**.
3. Fora do escopo atual (não implementar sem evidência): Motor Cognitivo completo, Domain Events formais, Repositories, migração para Server Actions, Inteligência Coletiva, sistemas avançados de recomendação.
4. Sempre: preservar multi-tenancy, permissões, validar entradas, soft delete, e documentar decisões (ADR).
5. **Produção = `main`. Publicar pela regra já validada** (`npx vercel deploy --prod --yes --scope ponte-digital1`).

---

## 7. Assinatura

- ✅ Produção publicada (`ca4a099`).
- ✅ Main = produção (sync).
- ✅ IA validada (resiliente, sem erro técnico à vista).
- ✅ Jornada Founder coberta por smoke + validação por código.
- ✅ Zero erros críticos.
- ✅ Tempo Founder V1 congelado por este documento.
- ✅ História oficial em `HISTORIA_DA_PONTE_DIGITAL.md`.
- ✅ Ponte pronta para o primeiro cliente real.

> Documentos que este congelamento governa: `docs/02-PRODUCT/CURRENT_PRODUCT.md`, `docs/01-VISION/FOUNDATION.md`, `docs/07-MILESTONES/CHANGELOG_OFICIAL.md`.