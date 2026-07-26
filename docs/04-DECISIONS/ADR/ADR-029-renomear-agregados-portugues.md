# ADR-029: Renomear agregados de inglês para português

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O Glossário Oficial da Ontologia Cognitiva (`ONTOLOGIA_COGNITIVA.md`) estabelece a nomenclatura oficial dos conceitos em português. No entanto, o código e a documentação atuais usam termos em inglês para diversos agregados e bounded contexts:

| Atual | Oficial |
|---|---|
| `Outcome` | `Resultado` |
| `FeedbackAcao` | `Feedback` |
| `AcaoCognitiva` | `Decisao` |
| `KnowledgeContext` | `ContextoDeConhecimento` |
| `FeedbackContext` | `ContextoDeFeedback` |
| `DecisionContext` | `ContextoDeDecisao` |
| `HistoricoSinal` | `LogDeEventos` |
| `EventoAtivacao` | `MarcoDeJornada` |
| `Evidencia` (agregado) | `EvidenciaDeHipotese` (relação) |

## Decisão

1. Renomear todos os agregados, modelos Prisma e bounded contexts para português conforme o Glossário Oficial.
2. A renomeação ocorre **após** a unificação do Patrimônio Cognitivo (ADR-010) — não antes, para evitar duplo trabalho.
3. A renomeação segue o cronograma da Fase 3 (desacoplamento) da auditoria arquitetural.
4. `HistoricoSinal` é renomeado para `LogDeEventos` apenas quando o Event Bus (ADR-011) estiver operacional e a migração de eventos estiver concluída (Fase 6).
5. `EventoAtivacao` é renomeado para `MarcoDeJornada` imediatamente (nome conflita com o conceito formal de Evento).

## Alternativas consideradas

- Renomear agora — rejeitada: causaria conflitos com a unificação do Patrimônio Cognitivo (ADR-010) que ocorrerá primeiro.
- Manter inglês — rejeitada: o Glossário Oficial é a autoridade máxima de nomenclatura.

## Consequências

- Positivo: nomenclatura consistente com a Ontologia Cognitiva.
- Positivo: desenvolvedores brasileiros entendem o domínio sem tradução mental.
- Negativo: renomeação-postergada requer disciplina para não usar os nomes antigos nos novos artefatos.
