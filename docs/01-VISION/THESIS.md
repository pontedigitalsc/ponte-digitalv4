# Tese de Valor — Ponte Digital

*(Este arquivo consolida os conceitos já referenciados em outros documentos do repositório — Diagnóstico Vivo, Centro de Decisão, Patrimônios Empresariais, Escada Comunitária — para que existam num só lugar. O conteúdo estratégico completo por trás de cada seção deve ser preenchido/validado pelo fundador; o que está aqui é a estrutura mínima para não deixar `THESIS.md` inexistente, já que `00-START-HERE.md` manda lê-lo em primeiro lugar.)*

## Missão

> A Ponte Digital não cresce quando vende software. Ela cresce quando ajuda empresários. O software é apenas a forma mais profunda de continuar ajudando aqueles que decidiram atravessar a ponte conosco.

*(Adotada em 2026-07-14 — ver `04-DECISIONS/ADR/ADR-003-ecossistema-publico-vs-plataforma-cognitiva.md`.)*

## O que é a Ponte Digital

A Ponte Digital é uma plataforma de inteligência para empresários que possui um SaaS para quem deseja aprofundar essa parceria — não o contrário. Um sistema que se torna, ao longo do tempo, o que sabe mais sobre o negócio de um empresário do que qualquer outra ferramenta que ele usa — sem exigir que ele se torne um operador de ERP para isso. Ver o teste rápido em `01-VISION/PRINCIPLES.md`.

## Duas camadas, dois públicos

| | Ecossistema Público | Plataforma Cognitiva |
|---|---|---|
| Quem acessa | Qualquer Curioso/Apoiador, de graça | Fundadores (programa de validação) e futuros clientes |
| O que contém | Diagnóstico, histórico dos diagnósticos, recomendações periódicas, conteúdo, comunidade de apoiadores | CRM invisível, Agenda, Financeiro Essencial, Assistente da Ponte, Centro de Decisão, Perfil Cognitivo |
| Objetivo | Ajudar gratuitamente; construir confiança; alimentar o patrimônio cognitivo coletivo da Ponte | Operar a empresa diariamente |

Jornada completa (a Escada Comunitária) em `07-BUSINESS/JORNADA_APOIADOR.md`. **Importante:** esta é uma separação de posicionamento e propósito, não uma decisão de dividir o código em dois sistemas agora — ver ADR-003 para os limites explícitos dessa decisão.

## Os cinco Patrimônios Empresariais

Financeiro, Operacional, Comercial, Cognitivo e Humano. Toda funcionalidade nova deve fortalecer pelo menos um deles — é o terceiro critério do teste rápido em `PRINCIPLES.md`. A visualização formal desses cinco patrimônios está congelada nesta fase (ver `02-PRODUCT/MVP_SCOPE.md`), mas o conceito já orienta decisões de escopo hoje. **Não confundir** com as Camadas do Patrimônio Cognitivo da Ponte, abaixo — são sobre o negócio do empresário-cliente, não sobre o acervo de conhecimento da própria Ponte.

## Camadas do Patrimônio Cognitivo da Ponte (não confundir com os Patrimônios Empresariais acima)

Proposto junto com a Jornada do Apoiador (ADR-003): o conhecimento acumulado pela Ponte, não pelo empresário individual, existe em camadas:

```
Patrimônio Individual   → o que a Ponte sabe sobre UM empresário (Perfil Cognitivo)
Patrimônio Coletivo     → padrões observados entre vários empresários do mesmo segmento
Patrimônio do Sistema   → o que o Motor Cognitivo aprendeu de forma generalizável (congelado)
Base de Apoiadores      → a origem de tudo isso — cada Apoiador que completa um diagnóstico contribui, mesmo sem nunca virar cliente pagante
```

Este ciclo depende do Motor Cognitivo, que está **congelado** (`MVP_SCOPE.md`) — é visão de Fase 2/3, não uma estrutura que existe tecnicamente hoje. Detalhe do ciclo em `07-BUSINESS/JORNADA_APOIADOR.md`.

## Diagnóstico Vivo / Motor de Descoberta

O ponto de entrada que transforma um empresário genérico em um perfil com contexto real — e, desde 2026-07-14, também a porta de entrada do Ecossistema Público, com valor completo mesmo para quem nunca vira Fundador (ver ADR-003). Conteúdo operacional completo (perguntas, blocos, critérios de aceite) em `07-BUSINESS/DIAGNOSTIC.md`. É a sprint ativa — ver `05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md`.

## Centro de Decisão

A tela que traduz sinais da operação em prioridades acionáveis para o empresário — hoje alimentada por regras simples sobre `HistoricoSinal`, futuramente pelo Motor Cognitivo, sem trocar a experiência do empresário na troca (ver a regra de desacoplamento em `MVP_SCOPE.md`). Parte da Plataforma Cognitiva — acesso restrito a Fundadores.

## Escada Comunitária

A jornada de aprofundamento de parceria com a Ponte: Curioso → Apoiador → Fundador → Embaixador, substituindo o funil de vendas tradicional. Detalhamento completo, incluindo o que cada estágio significa e o que ainda está pendente de definição, em `07-BUSINESS/JORNADA_APOIADOR.md` (decidido em 2026-07-14, ver ADR-003).

## Perfil Cognitivo do Empresário — template de saída do Diagnóstico

*(A preencher: estrutura exata dos campos gerados automaticamente ao final do Diagnóstico, referenciada em `07-BUSINESS/DIAGNOSTIC.md`. Enquanto não estiver definida aqui, quem implementar o Diagnóstico deve tratar isso como pergunta em aberto — documentar em `KNOWN_ISSUES.md` e perguntar, não inventar um formato.)*

## Hipóteses centrais a validar com os 100 fundadores

*(A preencher pelo fundador — ver `07-BUSINESS/FOUNDERS.md`, seção "Hipóteses a validar com eles", que aponta para esta seção.)*

## Nota de auditoria (2026-07-13)

Uma árvore de documentação mais antiga (`ponte-digital/docs/`) referencia repetidamente um `TESE_DE_VALOR.md` (com seções como §8 e §10) que nunca foi encontrado. Este documento (`THESIS.md`) cumpre o mesmo papel conceitual, mas não tem a mesma numeração de seções — as remissões antigas continuam tecnicamente quebradas até alguém decidir migrar essas referências ou aposentar a árvore antiga. Ver `../../AUDITORIA_PATRIMONIO_INTELECTUAL.md` para o relatório completo.

## Relação com o resto do repositório

Este documento é visão de longo prazo — muda quase nunca (ver hierarquia em `00-START-HERE.md`). O escopo do dia a dia é decidido por `02-PRODUCT/CURRENT_PRODUCT.md` e `05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md`, que podem — e devem — implementar só uma fração simplificada do que está aqui, sem que isso seja tratado como contradição.
