# ADR-005: Experience Engine Monolítico — aceitar como simplificação da V4 Founder

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

`cognitive-experience-engine.ts` tem ~1500 linhas com todas as factories de experiência em um único arquivo: `construirDashboardExperience`, `construirFinanceiroExperience`, `construirCRMExperience`, `construirClientesExperience`, `construirClienteExperience`, `construirTarefasExperience`, `construirHistoricoExperience`, `construirImplantacoesExperience`, `construirConfiguracoesExperience`, `construirConhecimentoExperience`, `construirLearningExperience`, `construirSidebarExperience`, `construirAssistenteExperience`, `construirLoginExperience`, `construirHomeExperience`, `construirEvolutionExperience`, além dos builders internos de narrativa, insight, recomendação e foco.

Isso viola o princípio de arquivos pequenos e coesos. No entanto, todas as factories compartilham os mesmos tipos (`ExperienceBlock`, `Insight`, `Narrativa`, etc.) e os mesmos builders internos (`construirInsight`, `extrairInsights`, `construirNarrativa`, `factoryBuildBlocks`). Separar em 17 arquivos criaria 17 imports circulares em potencial e aumentaria a complexidade de navegação sem reduzir a complexidade real.

## Decisão

Manter o Experience Engine como arquivo único durante toda a V4 Founder. Aceitar que é um arquivo grande — mas coeso. Separar apenas quando:

1. Houver um segundo consumidor dos tipos de experiência (ex.: um app mobile que precisa de um experience engine separado).
2. O arquivo ultrapassar 2500 linhas **e** houver evidência de que o tamanho está causando bugs reais (não apenas desconforto estético).
3. Uma factory específica precisar de dependências que nenhuma outra factory usa.

## Alternativas consideradas

- Separar por domínio (uma factory por arquivo): rejeitada — 17 arquivos que compartilham 90% dos tipos e builders, com risco de duplicação e deriva entre implementações.
- Extrair apenas os builders compartilhados para um arquivo à parte: rejeitada — os builders já são funções internas; extraí-los não reduz o tamanho do arquivo principal nem melhora a legibilidade.

## Consequências

- Positivo: um único arquivo para entender toda a lógica de transformação experiência. Navegação por busca (grep) é trivial.
- Negativo: revisões de PR são maiores. Mitigação: revisar por factory, não pelo arquivo inteiro.
- Este ADR encerra a discussão sobre splitting prematuro.
