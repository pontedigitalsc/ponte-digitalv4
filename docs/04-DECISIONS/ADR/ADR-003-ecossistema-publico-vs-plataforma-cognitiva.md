# ADR-003: Separar Ecossistema Público (Diagnóstico) da Plataforma Cognitiva (produto pago)

**Data:** 2026-07-14
**Status:** Aceita

## Contexto

Até esta decisão, o Diagnóstico Inteligente era tratado como um dos 7 pilares da V4 Founder, no mesmo nível de CRM, Financeiro, Agenda e Assistente — todos parte de um único produto acessado pelos mesmos usuários (empresários cadastrados). O fundador decidiu inverter essa relação: a Ponte Digital não é "um SaaS que tem um diagnóstico" — é uma plataforma de inteligência para empresários, que tem um SaaS (a Plataforma Cognitiva) para quem aprofunda a parceria.

Isso separa o produto em duas camadas com públicos e objetivos diferentes:

- **Ecossistema Público** — Diagnóstico, histórico de diagnósticos, recomendações periódicas, conteúdo, comunidade de apoiadores. Objetivo: ajudar gratuitamente, e gerar patrimônio cognitivo coletivo mesmo a partir de quem nunca vira cliente pagante.
- **Plataforma Cognitiva** — CRM invisível, Agenda, Financeiro Essencial, Assistente da Ponte, Centro de Decisão, Perfil Cognitivo. Objetivo: operar a empresa diariamente. Acesso restrito a Fundadores e futuros clientes.

## Decisão

1. O Diagnóstico Inteligente passa a pertencer conceitualmente ao Ecossistema Público, não à Plataforma Cognitiva — sua missão primária deixa de ser "gerar contexto para vender o resto do produto" e passa a ser gerar valor gratuito, construir confiança, e alimentar o patrimônio cognitivo da Ponte (ver `07-BUSINESS/JORNADA_APOIADOR.md`).
2. A jornada do usuário muda de um funil de vendas (Lead → Contato → Venda → Cliente) para uma escada de aprofundamento (Curioso → Apoiador → Fundador → Embaixador) — ver detalhamento em `07-BUSINESS/JORNADA_APOIADOR.md`. Isso também passa a ser o conteúdo real da Escada Comunitária, referenciada em `THESIS.md` e `07-BUSINESS/FOUNDERS.md` e antes marcada como pendente.
3. `THESIS.md` ganha a frase de missão: "A Ponte Digital não cresce quando vende software. Ela cresce quando ajuda empresários. O software é apenas a forma mais profunda de continuar ajudando aqueles que decidiram atravessar a ponte conosco."

## O que esta decisão NÃO muda (para não confundir com re-arquitetura técnica)

- **Não** é uma decisão de dividir o código em dois apps agora. A V4 Founder continua sendo uma implementação única, no mesmo repositório (`sistema/`), pela mesma razão de sempre: o estágio da empresa é o teto da sofisticação técnica (`FOUNDATION.md`, princípio 2).
- **Não** cancela nem re-agenda a sprint ativa (`05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md`) — o Diagnóstico continua sendo construído exatamente como especificado ali. O que muda é a motivação estratégica registrada ao redor dele, não os critérios de aceite técnicos.
- **Não** decide, por si só, controle de acesso técnico entre "quem é Apoiador" e "quem é Fundador" — hoje o sistema só tem os papéis ADMIN/GESTOR/MEMBRO dentro de uma empresa já cadastrada. Modelar tecnicamente um usuário Apoiador (que ainda não é uma "empresa" no sentido do schema atual) é lacuna nova, registrada em `05-OPERATIONS/KNOWN_ISSUES.md`, não resolvida por este ADR.
- **Não** ativa o "flywheel" completo descrito pelo fundador (100 diagnósticos → hipóteses → padrões → Motor Cognitivo aprende → recomendações melhores para todos) — esse ciclo depende do Motor Cognitivo, que continua **congelado** em `MVP_SCOPE.md`. A decisão aqui é sobre posicionamento e jornada, não sobre destravar arquitetura congelada.

## Colisão de nome a evitar

O fundador propôs uma camada nova de "patrimônio" (Individual → Coletivo → Sistema → Base de Apoiadores). Isso **não é o mesmo conceito** que os cinco Patrimônios Empresariais já documentados (Financeiro, Operacional, Comercial, Cognitivo, Humano — `THESIS.md`, `FOUNDATION.md`). Os primeiros são sobre o negócio do empresário-cliente; os novos são sobre o próprio acervo de conhecimento da Ponte. Nomeados como "Camadas do Patrimônio Cognitivo da Ponte" em `THESIS.md`, com nota de desambiguação explícita — mesmo padrão já usado para a colisão `KnowledgeRegistry` (produto) vs. registro de padrões de negócio (`08-KNOWLEDGE/KNOWLEDGE_REGISTRY.md`).

## Alternativas consideradas

- Manter o Diagnóstico como parte só técnica da Plataforma Cognitiva, sem reposicionamento estratégico — rejeitada pelo fundador: não capturava o valor do diagnóstico como gerador de patrimônio cognitivo coletivo independente de conversão.
- Implementar a separação técnica (dois apps, dois modelos de acesso) imediatamente — rejeitada: seria sofisticação prematura para a fase V4 Founder, e não foi o que o fundador pediu (a decisão é de posicionamento/documentação agora, não de re-arquitetura).

## Consequências

- Positivo: a Tese de Valor ganha uma frase de missão clara, e o Diagnóstico ganha uma justificativa estratégica que não depende de conversão para fazer sentido.
- Positivo: a Escada Comunitária, que estava com conteúdo pendente há duas revisões, agora tem um primeiro rascunho real.
- Negativo / pendência criada: o sistema não modela hoje um usuário "Apoiador" fora do conceito de empresa/tenant — isso vira trabalho de engenharia real antes que a jornada completa (Curioso → Apoiador → Fundador → Embaixador) possa ser operada de fato, não só documentada. Registrado em `KNOWN_ISSUES.md`.
- Negativo / risco a monitorar: existe tensão entre "o Diagnóstico não serve para vender" (este ADR) e a sprint ativa, cujo critério de aceite original foi motivado por gerar contexto para o resto da plataforma. Os dois objetivos não se cancelam, mas quem for revisar a sprint deve saber que agora há dois motivos coexistindo, não um só.
