# Terminologia — Linguagem Ubíqua da Ponte Digital

Todo termo interno da Ponte Digital tem definição aqui. Quando um documento usar qualquer destes termos e o leitor não souber o significado, este é o único lugar autorizado para consultar — não inferir pelo contexto, não inventar.

Se um termo novo aparecer em qualquer documento sem estar definido aqui, registrar em `05-OPERATIONS/KNOWN_ISSUES.md` e perguntar ao fundador antes de usar.

---

## Termos de Produto

**Ponte Digital**
O sistema. Não é um ERP, não é um CRM, não é uma planilha inteligente. É uma plataforma de inteligência para empresários que possui um SaaS (a Plataforma Cognitiva) para quem deseja aprofundar essa parceria — não o contrário (ver `01-VISION/THESIS.md`, decisão de 2026-07-14). É o sistema que, ao longo do tempo, sabe mais sobre o negócio de um empresário do que qualquer outra ferramenta que ele usa — sem exigir que ele se torne um operador de software para isso.

**Ecossistema Público**
A camada gratuita da Ponte: Diagnóstico, histórico de diagnósticos, recomendações periódicas, conteúdo, comunidade de apoiadores. Objetivo: ajudar gratuitamente e alimentar o patrimônio cognitivo coletivo da Ponte, independente de conversão. Ver `07-BUSINESS/JORNADA_APOIADOR.md`.

**Plataforma Cognitiva**
A camada paga/restrita da Ponte: CRM invisível, Agenda, Financeiro Essencial, Assistente da Ponte, Centro de Decisão, Perfil Cognitivo. Acesso restrito a Fundadores e futuros clientes. Não confundir com "Motor Cognitivo" (termo de arquitetura, abaixo) nem com "Modelo Cognitivo do Empresário".

**Curioso**
Primeiro estágio da Escada Comunitária — ainda não fez o Diagnóstico. Ver `07-BUSINESS/JORNADA_APOIADOR.md`.

**Apoiador**
Segundo estágio da Escada Comunitária — completou o Diagnóstico Inteligente, acessa o Ecossistema Público de graça, não é cliente pagante. Cada Apoiador contribui para o patrimônio cognitivo coletivo da Ponte mesmo sem nunca virar Fundador. Ver `07-BUSINESS/JORNADA_APOIADOR.md`.

**Embaixador**
Quarto e último estágio da Escada Comunitária, acima de Fundador. Conteúdo exato `PENDENTE DE DEFINIÇÃO PELO FUNDADOR` — ver `07-BUSINESS/JORNADA_APOIADOR.md`.

**Empresário**
O usuário final da Ponte. Especificamente: dono de pequeno negócio (lavação, barbearia, oficina, estética e similares), com equipe pequena, operando no Brasil, com pouca ou nenhuma experiência com ferramentas de gestão sofisticadas. Não é um executivo de empresa média. Não é um profissional liberal sem funcionários. Ver `07-BUSINESS/ICP.md` para o perfil completo.

**Fundador (no contexto da Ponte)**
Tem dois significados distintos no repositório — atenção:
1. *O fundador da Ponte Digital*: a pessoa que criou e decide sobre o produto (o dono deste repositório).
2. *Os 100 Fundadores*: terceiro estágio da Escada Comunitária (`07-BUSINESS/JORNADA_APOIADOR.md`) — os primeiros usuários reais da Plataforma Cognitiva, que participam do programa de validação. Ver `07-BUSINESS/FOUNDERS.md`.
Quando o contexto não deixar claro qual é qual, usar "fundador da Ponte" e "fundador-cliente" para diferenciar.

**Diagnóstico Inteligente / Diagnóstico Vivo / Motor de Descoberta**
Os três nomes referem-se à mesma coisa: o fluxo de perguntas que um empresário responde ao entrar na Ponte pela primeira vez, gerando o Perfil Cognitivo. "Diagnóstico Inteligente" é o nome de produto (tela/funcionalidade). "Motor de Descoberta" é o nome arquitetural. "Diagnóstico Vivo" é o nome conceitual da Tese de Valor. Pertence ao Ecossistema Público, não à Plataforma Cognitiva (ver ADR-003) — sua missão primária é gerar valor gratuito e confiança, não apenas gerar contexto de venda. Ver conteúdo operacional em `07-BUSINESS/DIAGNOSTIC.md`.

**Perfil Cognitivo**
O conjunto estruturado de informações sobre um empresário gerado automaticamente ao final do Diagnóstico. É o contexto que alimenta o Centro de Decisão, o Assistente da Ponte, e futuramente o Motor Cognitivo. O formato exato dos campos é `PENDENTE DE DEFINIÇÃO PELO FUNDADOR` — ver seção correspondente em `01-VISION/THESIS.md`.

**Centro de Decisão**
A tela da Ponte que traduz sinais da operação em prioridades acionáveis para o empresário. Hoje alimentada por regras simples sobre `HistoricoSinal`. Futuramente alimentada pelo Motor Cognitivo — sem mudar a experiência do empresário na troca. Ver regra de desacoplamento em `02-PRODUCT/MVP_SCOPE.md`.

**CRM Invisível**
O módulo de CRM da Ponte, com uma premissa específica: não é um cadastro de clientes nem um pipeline de oportunidades para o empresário gerenciar ativamente. É uma lista de ações sugeridas, gerada a partir do comportamento real da operação. O empresário age, não administra. Ver `02-PRODUCT/FEATURE_MATRIX.md`.

**Agenda como Capacidade**
O módulo de agenda da Ponte, com uma premissa específica: não é uma grade de horários para o empresário preencher. É uma visualização de capacidade de atendimento/venda disponível — o quanto o negócio consegue absorver sem comprometer qualidade. Ainda não implementado. Ver `05-OPERATIONS/BACKLOG.md`.

**Financeiro Essencial**
O módulo financeiro da Ponte, estruturado em torno de cinco perguntas que qualquer empresário precisa conseguir responder sobre seu negócio. Não é contabilidade, não é DRE, não é conciliação bancária. As cinco perguntas são `PENDENTE DE DEFINIÇÃO PELO FUNDADOR`.

**Marketing Assistido**
Um dos sete pilares ativos da V4 Founder. Status atual: a confirmar. Definição detalhada `PENDENTE DE DEFINIÇÃO PELO FUNDADOR`.

**Assistente da Ponte**
O chat de IA dentro do produto, que conversa com o empresário sobre o negócio dele. Hoje implementado parcialmente, sem contexto do diagnóstico. Não confundir com o agente de código (que programa a Ponte) — são sistemas, públicos e regras completamente diferentes. Ver `06-AI/AGENTS.md` para o agente de código; governança do Assistente de produto está `PENDENTE DE DOCUMENTO DEDICADO`.

**Patrimônios Empresariais (os cinco)**
Financeiro, Operacional, Comercial, Cognitivo e Humano. São as cinco dimensões do negócio de um empresário que a Ponte deve fortalecer ao longo do tempo. Toda funcionalidade nova deve fortalecer pelo menos um deles (terceiro critério da Matriz de Decisão em `01-VISION/FOUNDATION.md`). A visualização formal dessas cinco dimensões está congelada até a Fase 2.

**Escada Comunitária**
Conceito de reconhecimento/progressão para os 100 fundadores que participam do programa de validação. Conteúdo completo `PENDENTE DE DEFINIÇÃO PELO FUNDADOR`. Ver `01-VISION/THESIS.md` e `07-BUSINESS/FOUNDERS.md`.

---

## Termos de Arquitetura

**HistoricoSinal**
Model do Prisma que registra sinais da operação de um empresário — eventos como "cliente sem contato há N dias". É a versão simplificada e aceita do futuro catálogo formal de `DomainEvent`. Não é dívida técnica: é decisão estratégica registrada em `04-DECISIONS/ADR/ADR-001-historico-sinal-vs-domain-event.md`.

**DomainEvent**
O conceito arquitetural futuro (Fase 2) que substituirá o `HistoricoSinal`. Diferença central: eventos com nomenclatura semântica de negócio (ex.: `ClienteNaoRetornou { diasSemContato: 47 }`), não nomenclatura técnica de operação (ex.: `clientes-sem-contato`). Ver `03-ENGINEERING/DOMAIN_EVENTS.md`.

**Motor Cognitivo**
O motor de raciocínio futuro (congelado, Fase 2/3) que implementará o ciclo Observação → Hipótese → Experimento → Conhecimento. Consome `DomainEvent` e alimenta o Centro de Decisão e o Modelo Cognitivo do Empresário. Ver `03-ENGINEERING/ARCHITECTURE.md`.

**Modelo Cognitivo do Empresário**
Perfil adaptativo de longo prazo do empresário, construído pelo Motor Cognitivo a partir de comportamento observado. Congelado. As respostas do Bloco 3 do Diagnóstico (Gestão) já podem ser coletadas hoje como base futura.

**KnowledgeRegistry**
Repositório de conhecimento acumulado sobre padrões de negócio observados pela Ponte ao longo do tempo — por segmento, por decisão, por resultado. Congelado até Fase 3.

**Tenant Guard**
Proteção técnica que garante que dados de uma empresa nunca vazem para outra. Implementado via middleware no Supabase Auth. Obrigatório em toda query, sem exceção. Ver `03-ENGINEERING/DATABASE.md`.

**V4 Founder**
O nome interno da fase atual do produto — a versão destinada ao programa dos 100 fundadores. "V4" não é um número de versão sequencial; é um nome de fase. Quando aparecer em documentos, significa "esta fase atual, pré-validação".

---

## Termos Operacionais

**Sprint**
Unidade de trabalho com escopo fechado, objetivo único e critérios de aceite definidos. O que está na sprint atual é soberano sobre qualquer sugestão de melhoria. Ver `05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md`.

**Congelado**
Status de funcionalidade ou padrão técnico que não deve ser implementado na fase atual, mas cuja arquitetura presente não pode impossibilitar. Diferente de "cancelado" (não vai ser feito nunca) e diferente de "backlog" (vai ser feito logo). Ver lista completa em `02-PRODUCT/MVP_SCOPE.md`.

**Soft Delete**
Padrão de exclusão lógica: nenhum dado de empresário é apagado fisicamente do banco. Registros excluídos recebem `deletedAt` e são filtrados nas queries, mas continuam existindo. Princípio inegociável — ver `01-VISION/FOUNDATION.md`.

**ADR (Architecture Decision Record)**
Registro formal de uma decisão arquitetural: o que foi decidido, por quê, quais alternativas foram consideradas, e quais consequências aceitas. Ver template em `04-DECISIONS/ADR/TEMPLATE.md`. Decisões registradas em ADR não devem ser reabertas por auditorias futuras sem novo contexto relevante.
