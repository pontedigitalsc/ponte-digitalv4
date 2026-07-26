# Changelog

## 2026-07-13 — Revisão de completude do Sistema Operacional de Engenharia

- Identificado e corrigido: `00-START-HERE.md` mandava ler `THESIS.md` e `CURRENT_PRODUCT.md` como passos 1 e 2 da leitura obrigatória, mas nenhum dos dois existia. Criados ambos, junto com `FOUNDATION.md` (citado por `PRINCIPLES.md` como fonte completa dos princípios) e `ARCHITECTURE.md` (citado por `CODE_PATTERNS.md` e `DOMAIN_EVENTS.md` como a arquitetura-alvo), que também nunca haviam sido criados.
- Criados `DATABASE.md` e `ROADMAP.md`, previstos na estrutura de pastas original mas nunca gerados.
- Corrigida referência quebrada em `STACK.md` (apontava para `ADR-001`, que trata de `HistoricoSinal`/`DomainEvent`, para justificar a decisão de API Routes vs Server Actions — um assunto diferente). Criado `ADR-002` para registrar essa decisão corretamente.
- Corrigida referência truncada (`ADR/ADR-001...`) em `KNOWN_ISSUES.md`.
- Removida recomendação de modelo específico ("DeepSeek V4 Flash Free") em `DECISIONS.md` e `CHANGELOG.md` — o nome citado sugere um tier rápido/leve, o que contradiz a própria instrução de usar "o modelo mais forte disponível" para tarefas de raciocínio estruturado. Mantido o princípio, sem fixar um produto que pode mudar de posicionamento a qualquer momento.
- Resolvido o known issue do README genérico: raiz do repositório agora aponta direto para `docs/00-START-HERE.md`.
- Atualizada a lista de leitura condicional em `00-START-HERE.md` para incluir `ARCHITECTURE.md`, `DATABASE.md` e `ROADMAP.md` quando a tarefa exigir.

## 2026-07-13 — Auditoria Final de Alinhamento

- Confirmado: Diagnóstico Inteligente é a lacuna prioritária real, não uma funcionalidade congelada mal rotulada.
- Confirmado: divergências de arquitetura (HistoricoSinal vs DomainEvent, API Routes vs Server Actions) são simplificações estratégicas aceitas, registradas em ADR-001.
- Identificado: soft delete incompleto em parte dos models — corrigir em paralelo, sem sprint dedicada.
- Identificado: uma execução de auditoria anterior apresentou texto corrompido e contradisse instruções explícitas (propôs refatoração arquitetural e catálogo de eventos apesar de instrução contrária) — descartada como base; auditorias de raciocínio estruturado devem ser repetidas com o modelo de melhor desempenho disponível no momento (ver `04-DECISIONS/DECISIONS.md`).
- Criado o Sistema Operacional de Engenharia (esta pasta `/docs`) para que qualquer agente saiba, em minutos, onde está e o que pode ou não fazer.

## 2026-07-14 — Reposicionamento: Ecossistema Público vs Plataforma Cognitiva

- Criado `ADR-003` registrando a separação entre Diagnóstico (Ecossistema Público, gratuito) e o resto da plataforma (Plataforma Cognitiva, restrita a Fundadores).
- Criado `07-BUSINESS/JORNADA_APOIADOR.md`, preenchendo pela primeira vez o conteúdo da Escada Comunitária (Curioso → Apoiador → Fundador → Embaixador), antes pendente em `THESIS.md` e `FOUNDERS.md`.
- `THESIS.md` atualizado: nova frase de missão, tabela das duas camadas, e as "Camadas do Patrimônio Cognitivo da Ponte" — com nota de desambiguação explícita para não confundir com os cinco Patrimônios Empresariais já existentes.
- `TERMINOLOGY.md` ganhou 5 termos novos (Ecossistema Público, Plataforma Cognitiva, Curioso, Apoiador, Embaixador) e atualizou as definições de Ponte Digital, Fundador e Diagnóstico Inteligente.
- `MVP_SCOPE.md` e `ROADMAP.md` anotados com a nova camada de cada pilar/jornada — sem alterar o escopo técnico da V4 Founder.
- `FOUNDERS.md` e `DIAGNOSTIC.md` atualizados com referências cruzadas para o novo modelo, sem alterar o conteúdo operacional já definido (perguntas do diagnóstico, o que se pede aos fundadores).
- Novo known issue registrado: sistema não modela usuário "Apoiador" fora do conceito de empresa/tenant — ver `05-OPERATIONS/KNOWN_ISSUES.md`.

*(Adicionar uma entrada por sprint concluída, sempre com data.)*
