# Fundação Congelada — V1

**Marco oficial de congelamento da fundação da Ponte Digital.**

---

## 1. Identificação

| Campo | Valor |
|-------|-------|
| Data | 29 de julho de 2026 |
| Versão | 0.1.0 |
| Commit | `9129066` |
| Branch | `main` |
| Programa | 32 — Constituição da Ponte Digital |
| Autor | Founder + Agente de Código |

---

## 2. Declaração de Congelamento

A partir desta data, a fundação da Ponte Digital está oficialmente congelada.

Isso significa:

- A **Constituição** (13 documentos em `docs/06-CONSTITUTION/P32/`) não pode ser alterada sem emenda constitucional
- A **Teoria da Evolução Empresarial** é a base filosófica permanente
- Os **Cinco Patrimônios Cognitivos** são os únicos oficialmente reconhecidos
- As **Nove Capacidades** são o modelo oficial de desenvolvimento empresarial
- O **Capital Cognitivo** é a métrica oficial do patrimônio intelectual
- A **Regra de Ouro** ("A Ponte Digital não decide pela empresa") é inegociável

Mudanças estruturais na fundação só podem ocorrer através de:
1. **ADR** (Architecture Decision Record) em `docs/04-DECISIONS/ADR/`
2. **Emenda Constitucional** em `docs/06-CONSTITUTION/`

---

## 3. Programas Concluídos (21–32)

| Programa | Descrição | Status |
|----------|-----------|--------|
| 21 | Empresa Zero — modelo operacional, diário cognitivo, ciclo 30 dias | Concluído |
| 22 | Motor Cognitivo | Concluído |
| 23 | Experiência Cognitiva | Concluído |
| 24 | Certificação da Fundação | Concluído |
| 25 | Era da Observação | Concluído |
| 26 | Empresa que Aprende | Concluído |
| 27 | Polimento & Microinterações | Concluído |
| 28 | Sistema Visual Oficial | Concluído |
| 29 | Materialização & Auditoria | Concluído |
| 30 | Critérios & Matriz de Materialização | Concluído |
| 31 | Dashboard Evolutivo + Refinamento de Experiência (Fase Final) | Concluído |
| 31D | A Experiência da Evolução (Finalização) | Concluído |
| 32 | Constituição da Ponte Digital | Concluído |

---

## 4. Arquitetura Vigente

### 4.1 Stack

| Componente | Tecnologia |
|------------|-----------|
| Framework | Next.js 16.2.9 |
| Linguagem | TypeScript 5.x |
| Estilização | Tailwind CSS v4 |
| Banco | PostgreSQL via Prisma 7.8 |
| Autenticação | Supabase |
| IA | Google Gemini (via @google/generative-ai) |
| Deploy | Vercel (configurado) |
| Build | Turbopack |

### 4.2 Estrutura de Diretórios (sistema)

```
sistema/
├── src/
│   ├── app/           ← Rotas e páginas (App Router)
│   │   ├── api/       ← API routes
│   │   └── (dashboard)/, (auth)/, etc.
│   ├── components/    ← Componentes React
│   │   ├── cognitive/ ← Componentes cognitivos
│   │   ├── ui/        ← Componentes base (Radix UI)
│   │   └── ...
│   ├── engine/        ← Motores cognitivos
│   ├── lib/           ← Utilitários e configurações
│   ├── services/      ← Serviços de negócio
│   └── types/         ← Tipos TypeScript
├── prisma/
│   └── schema.prisma  ← Modelo de dados
└── public/            ← Assets estáticos
```

---

## 5. Motores Existentes

### 5.1 Motores Cognitivos (em `sistema/src/engine/`)

| Engine | Responsabilidade | Status |
|--------|-----------------|--------|
| cognitive-experience-engine | Orquestração geral da experiência cognitiva (2115 linhas) | Vigente |
| cognitive-orchestrator | Coordenação dos subsistemas cognitivos | Vigente |
| cognitive-capital-engine | Cálculo do Capital Cognitivo | Vigente |
| cognitive-curve-engine | Curva de evolução e narrativa | Vigente |
| cognitive-memory-engine | Memória e hipóteses | Vigente |
| cognitive-narrative-engine | Geração de narrativas | Vigente |
| cognitive-radar-engine | Radar de capacidades | Vigente |
| cognitive-before-after-engine | Comparação temporal | Vigente |
| cognitive-heatmap-engine | Mapa de calor cognitivo | Vigente |
| cognitive-brainstorm-engine | Geração de ideias | Vigente |
| cognitive-alert-engine | Alertas proativos | Vigente |
| cognitive-celebrations-engine | Celebrações e marcos | Vigente |
| cognitive-timeline-engine | Linha do tempo cognitiva | Vigente |
| cognitive-journey-engine | Jornada cognitiva | Vigente |
| cognitive-briefing-engine | Briefings cognitivos | Vigente |
| cognitive-health-engine | Saúde cognitiva | Vigente |
| cognitive-context-engine | Contexto cognitivo | Vigente |
| cognitive-heritage-facade | Fachada de patrimônio | Vigente |
| cognitive-milestone-engine | Marcos cognitivos | Vigente |
| cognitive-workflow-engine | Fluxos cognitivos | Vigente |
| cognitive-aging-engine | Envelhecimento cognitivo | Vigente |
| cognitive-confidence-drift-engine | Deriva de confiança | Vigente |
| cognitive-evolution-engine | Evolução cognitiva | Vigente |
| cognitive-routine-engine | Rotinas cognitivas | Vigente |
| company-maturity-engine | Maturidade da empresa | Vigente |
| adaptive-capacity-engine | Capacidade adaptativa | Vigente |
| clarity-engine | Clareza cognitiva | Vigente |
| decision-engine | Decisões e recomendações | Vigente |
| priority-engine | Priorização | Vigente |
| relevance-engine | Relevância temporal | Vigente |
| trust-engine | Confiança de fontes | Vigente |
| validation-engine | Validação cruzada | Vigente |
| hypothesis-engine | Hipóteses | Vigente |
| evidence-engine | Evidências | Vigente |
| knowledge-governance-engine | Governança do conhecimento | Vigente |
| forgetting-engine | Esquecimento e decay | Vigente |
| synthesis-engine | Síntese com score | Vigente |
| growth-opportunity-engine | Oportunidades de crescimento | Vigente |
| strategic-memory-engine | Memória estratégica | Vigente |
| founder-panel-engine | Painel do fundador | Vigente |
| centro-cognitivo-engine | Centro cognitivo | Vigente |
| aprendizado-service | Serviço de aprendizado | Vigente |
| conversation-engine | Motor de conversa | Vigente |
| adaptive-question-engine | Perguntas adaptativas | Vigente |
| question-answer-engine | Perguntas e respostas | Vigente |
| signal-engine | Sinais e sensores | Vigente |
| identity-engine | Identidade cognitiva | Vigente |
| founder-activation-engine | Ativação do fundador | Vigente |
| event-publisher / subscriber / store / monitor / catalog | Sistema de eventos | Vigente |
| dead-letter-queue | Filas mortas | Vigente |
| feedback-intelligence-engine | Inteligência de feedback | Vigente |
| action-intelligence-engine | Inteligência de ações | Vigente |
| outcome-intelligence-engine | Inteligência de resultados | Vigente |
| confidence-drift-engine | Deriva de confiança | Vigente |
| knowledge-aging-engine | Envelhecimento do conhecimento | Vigente |
| cognitive-bus | Barramento cognitivo | Vigente |
| ritmo-engine | Ritmo e ciclos | Vigente |
| cache / cache-provider | Cache | Vigente |
| rate-limit / rate-limit-config / rate-limit-provider | Rate limit | Vigente |
| feature-flags | Features flags | Vigente |

---

## 6. Patrimônios

1. **Patrimônio Operacional**
2. **Patrimônio Decisório**
3. **Patrimônio de Conhecimento**
4. **Patrimônio Evolutivo**
5. **Patrimônio Coletivo** (não implementado em código)

---

## 7. Capacidades (Modelo Oficial)

1. Observação
2. Compreensão
3. Clareza
4. Priorização
5. Decisão
6. Execução
7. Aprendizado
8. Evolução
9. Adaptação

---

## 8. Dashboards e Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Landing page |
| `/conversa` | Primeira Conversa (diagnóstico) |
| `/criar-conta` | Criação de conta |
| `/login` | Login |
| `/dashboard` | Dashboard principal (33 componentes) |
| `/conhecimento` | Conhecimento validado |
| `/centro-decisao` | Centro de Decisão |
| `/assistente` | Assistente |
| `/aprendizados` | Aprendizados |
| `/financeiro` | Financeiro |
| `/clientes` | Clientes |
| `/crm` | CRM |
| `/tarefas` | Tarefas |
| `/configuracoes` | Configurações |
| `/historico` | Histórico |
| `/implantacoes` | Implantações |
| `/admin/cognitive-observatory` | Observatório Cognitivo (admin) |

---

## 9. Princípios Congelados

- **Regra de Ouro:** A Ponte Digital nunca decide pela empresa
- **Lei da Clareza:** Toda informação deve responder a uma pergunta explícita
- **Lei da Simplicidade:** O que é simples por fora pode ser complexo por dentro
- **Lei da Transparência:** Toda afirmação deve ser sustentada por dados visíveis
- **Lei da Continuidade:** A experiência deve fluir sem rupturas
- **Lei da Propriedade:** Os dados e o conhecimento pertencem à empresa

---

## 10. O Que Não Está Congelado

- **Componentes específicos:** Podem ser substituídos, removidos ou adicionados
- **Engines:** Podem ser refatorados, unificados ou eliminados
- **Interface:** Pode ser redesenhada
- **Conteúdo dos cards:** Pode ser alterado
- **Implementação técnica:** Pode evoluir

O que está congelado é a **fundação conceitual**, não a implementação.

---

## 11. Foundation Database V1 (Pós-P37)

A partir de 29 de julho de 2026, a **Foundation Database V1** complementa o Foundation Freeze:

- O schema do banco está representado na baseline `001_foundation_database_v1`
- A política oficial de migrations está em `docs/07-MILESTONES/FOUNDATION_DATABASE_V1.md`
- Migrações antigas estão arquivadas em `prisma/migrations_archive/`
- Toda nova migration segue a política: nome sequencial, atômica, imutável após aplicada

Ver `docs/07-MILESTONES/FOUNDATION_DATABASE_V1.md` para o documento completo.

---

*Este documento marca o congelamento oficial da Fundação V1 da Ponte Digital. Qualquer mudança estrutural a partir deste ponto requer ADR ou Emenda Constitucional. O Foundation Database V1 (P37) complementa o congelamento com a consolidação da infraestrutura de dados.*
