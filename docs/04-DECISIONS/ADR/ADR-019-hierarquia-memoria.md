# ADR-019: Hierarquia de memória do Motor Cognitivo

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O MOTOR_COGNITIVO.md (seção 10) define 4 níveis de memória: Working Memory, Short Term, Long Term, Archived — cada uma com políticas de retenção, condensação e expurgo. Hoje o sistema armazena todo conhecimento no mesmo nível, sem distinção de "quão recente" ou "quão relevante".

Isso significa que:
- Conhecimento de 1 ano atrás tem o mesmo peso que conhecimento de 1 hora atrás.
- Não há condensação — conhecimento duplicado ou conflitante não é resolvido.
- Nothing é esquecido — o volume de conhecimento cresce sem limite, degradando performance.

## Decisão

1. Implementar os 4 níveis de memória no Motor Cognitivo:

   | Nível | Retenção | Capacidade | Política de saída |
   |---|---|---|---|
   | Working Memory | Sessão atual (horas) | 100 itens | Descartado no fim da sessão |
   | Short Term | Últimos 30 dias | 1000 itens | Condensado para Long Term |
   | Long Term | 1 ano | 10000 itens | Arquivado se não acessado |
   | Archived | Permanente | Ilimitado | Apenas curadoria remove |

2. A condensação (Short → Long) aplica regras de sumarização e deduplicação.
3. O arquivamento (Long → Archived) é automático após 1 ano sem acesso.
4. Apenas `Archived` tem retenção permanente — todo nível inferior pode ser condensado ou removido.
5. Working Memory é volátil — não persiste entre sessões.

## Alternativas consideradas

- Manter memória plana (sem hierarquia) — rejeitada: sem distinção de nível, conhecimento antigo compete em igualdade com conhecimento recente, degradando a qualidade das decisões.
- Apenas 2 níveis (recente vs antigo) — rejeitada: a complexidade real do conhecimento empresarial exige mais granularidade.

## Consequências

- Positivo: conhecimento recente e relevante tem precedência sobre conhecimento antigo.
- Positivo: volume gerenciável — condensação e arquivamento impedem crescimento infinito.
- Negativo: Working Memory não persiste — se a sessão cai, o contexto imediato é perdido. Aceito: Working Memory é transiente por definição.
- Negativo: políticas de condensação e arquivamento precisam ser implementadas e testadas.
