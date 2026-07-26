# ADR-016: Submotores com responsabilidade única e comunicação exclusiva por eventos

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O MOTOR_COGNITIVO.md define 16 submotores (Observation, Signal, Hypothesis, Knowledge, Context, Decision, Learning, Memory, Priority, Trust, Relevance, Forgetting, Validation, Outcome, Ritmo, Confidence). Hoje, as engines existentes chamam-se umas às outras diretamente — não há isolamento entre elas.

Isso significa que:
- Um bug em uma engine pode contaminar o processamento de outra.
- Não há barreira clara entre responsabilidades — qualquer engine pode fazer qualquer coisa.
- Testar uma engine isoladamente exige mockar as outras, o que é frágil e trabalhoso.

## Decisão

1. Cada submotor do Motor Cognitivo tem responsabilidade única e bem definida (SRP).
2. Submotores comunicam-se exclusivamente por eventos via Event Bus (ADR-011).
3. Nenhum submotor pode:
   - Chamar função de outro submotor diretamente.
   - Acessar o banco de dados de outro submotor.
   - Depender do estado interno de outro submotor.
4. A única exceção é o Context Engine, que pode ler o estado de todos os submotores para produzir o Contexto Cognitivo (ADR-021).

## Alternativas consideradas

- Manter chamadas diretas — rejeitada: acoplamento forte, impossibilidade de testar isoladamente, risco de cascata de falhas.
- Criar barreiras físicas (subdiretórios, pacotes) sem mudar o padrão de comunicação — rejeitada: o isolamento real vem do barramento de eventos, não da estrutura de diretórios.

## Consequências

- Positivo: isolamento real entre submotores — cada um pode ser desenvolvido, testado e evoluído independentemente.
- Positivo: falha em um submotor não para os outros — o Event Bus isola o impacto.
- Negativo: complexidade de coordenação entre submotores via eventos exige design cuidadoso de contratos de evento.
- Negativo: latência adicional do barramento comparado a chamada direta — insignificante para in-memory (microssegundos).
