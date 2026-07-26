# ADR-026: Esquecimento programado como função cognitiva

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O MOTOR_COGNITIVO.md (seção 10.3) define que o esquecimento é uma função cognitiva legítima — não um bug. O Forgetting Engine executa rotina noturna que revalida o conhecimento ativo e arquiva ou remove o que não for mais relevante.

Hoje o sistema nunca esquece: todo conhecimento acumulado permanece ativo indefinidamente. Isso degrada performance (volume cresce sem limite), qualidade (conhecimento antigo compete com o novo), e relevância (informação desatualizada polui o contexto).

## Decisão

1. O Forgetting Engine (um dos 16 submotores) executa rotina noturna de esquecimento programado.
2. Nenhum conhecimento fica ativo indefinidamente sem revalidação.
3. Políticas de esquecimento:
   - **Por tempo:** conhecimento não revalidado em N dias entra em processo de arquivamento.
   - **Por contradição:** conhecimento contradito por evidência mais forte é refutado.
   - **Por baixa relevância:** conhecimento com baixo score de prioridade (ADR-020) por período prolongado é arquivado.
   - **Por pedido do empresário:** o empresário pode explícitamente "desensinar" um conhecimento.
4. Conhecimento "esquecido" não é deletado — é movido para Archived (ADR-019) e removido do contexto ativo.
5. O empresário pode consultar conhecimento arquivado, mas ele não participa mais do ciclo cognitivo ativo.

## Alternativas consideradas

- Nunca esquecer — rejeitada: volume cresce sem limite, qualidade degrada, e conhecimento desatualizado polui decisões.
- Esquecimento manual (só quando o empresário pede) — rejeitada: o empresário não tem tempo nem contexto para gerenciar o que o Motor deve lembrar.

## Consequências

- Positivo: volume gerenciável de conhecimento ativo.
- Positivo: qualidade das decisões melhora — conhecimento desatualizado não participa do contexto.
- Positivo: o empresário confia mais — sabe que o Motor não está usando informação defasada.
- Negativo: risco de "esquecer" conhecimento que ainda é relevante mas não foi acessado. Mitigado por: (a) policies configuráveis por empresa, (b) arquivamento não é deleção, e (c) o empresário pode reativar conhecimento arquivado.
