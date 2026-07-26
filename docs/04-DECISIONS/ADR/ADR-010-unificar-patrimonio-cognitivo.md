# ADR-010: Unificar Patrimônio Cognitivo em agregado único

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

O Patrimônio Cognitivo da empresa está fragmentado em 5 agregados Prisma: `Evidencia`, `Hipotese`, `ConhecimentoValidado`, `MemoriaCognitiva`, `HistoricoSinal`. Cada um é uma tabela independente, sem transactional boundary comum. Isso significa que uma operação cognitiva (ex.: "observar um sinal → gerar hipótese → validar → armazenar como conhecimento") não é atômica — pode falhar no meio sem rollback.

Além disso, o código espalha lógica de ciclo de vida entre esses agregados: `cognitive-observatory.ts` escreve Evidencia, `cognitive-hypothesis-engine.ts` escreve Hipotese (lendo Evidencia separadamente), `cognitive-knowledge-governance-engine.ts` escreve ConhecimentoValidado (lendo Hipotese). Cada engine conversa com o banco independentemente, sem coordenação transacional.

A auditoria (P2) classifica isso como problema CRÍTICO.

## Decisão

1. Unificar `Evidencia`, `Hipotese`, `ConhecimentoValidado`, `MemoriaCognitiva` e `HistoricoSinal` em um único agregado chamado **PatrimonioCognitivo**.
2. O agregado usa discriminação por tipo (discriminator field `tipo`) para representar os diferentes estados do conhecimento.
3. O agregado é o transactional boundary: toda operação cognitiva (observar → hipotetizar → validar → conhecer) é atômica dentro dele.
4. A persistência pode ser:
   - **Tabela única** com coluna `tipo` (simples, V1), ou
   - **Event Store** com replay de eventos cognitivos (sofisticado, para quando houver necessidade de auditoria temporal).
   - A escolha entre os dois é uma decisão técnica da implementação, não uma decisão arquitetural.
5. As engines existentes são refatoradas para operar contra o agregado unificado, não contra tabelas individuais.

## Alternativas consideradas

- Manter 5 agregados separados com saga pattern para coordenação — rejeitada: complexidade desnecessária para a fase V4 Founder. Se todos os fragmentos pertencem ao mesmo ciclo de vida, devem estar no mesmo agregado.
- Unificar apenas no código (camada de aplicação) sem unificar o banco — rejeitada: o transactional boundary precisa estar no banco para ser real. Unificação só no código é fachada.

## Consequências

- Positivo: operações cognitivas passam a ser atômicas — ou a cadeia completa persiste, ou nada persiste.
- Positivo: elimina 5 agendamentos de rotina separados (Evidencia, Hipotese, etc.) — vira 1 agregado com 1 ciclo de vida.
- Positivo: score de Aggregates sobe de 3/15 para 12/15.
- Negativo: migração de dados necessária (5 tabelas → 1 ou Event Store). Migração com script de verificação (ler + validar + migrar + comparar).
- Negativo: models existentes que consultam tabelas individuais precisam ser atualizados para consultar o agregado unificado.
