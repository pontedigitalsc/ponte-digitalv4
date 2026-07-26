# MVP Scope — V4 Founder

Este documento é a fronteira **estável** do que existe na V4 Founder. Diferente de `05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md` (que muda toda semana), este arquivo só muda quando a estratégia de escopo muda de verdade.

## Objetivo desta fase

Colocar 100 fundadores usando uma versão básica, mas funcional, da Ponte — para acumular evidências reais antes de investir em arquitetura cognitiva sofisticada.

## Escopo ativo (os 7 pilares)

*Desde 2026-07-14 (ADR-003), cada pilar também pertence a uma camada estratégica — Ecossistema Público (gratuito) ou Plataforma Cognitiva (restrito a Fundadores). Isso é posicionamento, não re-arquitetura: os 7 continuam implementados numa única aplicação (`sistema/`) durante a V4 Founder.*

1. Diagnóstico Inteligente (Motor de Descoberta) — **Ecossistema Público**
2. Centro de Decisão (hoje: regras simples, não IA) — Plataforma Cognitiva
3. CRM invisível (lista de ações, não cadastro) — Plataforma Cognitiva
4. Agenda como capacidade — Plataforma Cognitiva
5. Financeiro Essencial (cinco perguntas) — Plataforma Cognitiva
6. Marketing Assistido — Plataforma Cognitiva
7. Assistente da Ponte (hoje: chat com contexto limitado) — Plataforma Cognitiva

## Escopo congelado (não implementar, mas a arquitetura deve permitir adicionar depois sem retrabalho)

- Motor Cognitivo completo (Observação → Hipótese → Experimento → Conhecimento)
- Motor 4 — Conversação Contínua
- Modelo Cognitivo do Empresário (perfil adaptativo)
- Memória de Decisões estruturada e Espelho de Decisões
- KnowledgeRegistry e Patrimônios de Conhecimento
- Nível de Confiança do Empresário
- Camada de Sensibilidade Situacional
- Patrimônio Empresarial (5 dimensões) e suas visualizações
- Inteligência Coletiva (scope coletivo/institucional)
- Opportunity como estágio intermediário
- Catálogo formal de `DomainEvent` semânticos (hoje: `HistoricoSinal`, aceito como simplificação)
- Camada `server/actions → services → repositories` (hoje: API Routes + services, aceito como simplificação)

## Regra de desacoplamento

O Centro de Decisão já existe desde cedo, mas hoje é alimentado por regras simples. Quando o Motor Cognitivo entrar, ele troca só o motor por trás da mesma tela — a experiência do empresário não muda. Nenhuma implementação atual pode acoplar lógica de decisão direto na tela.

Detalhe sprint a sprint: ver `CURRENT_PRODUCT.md` e as sprints em `05-OPERATIONS/SPRINTS/`.
