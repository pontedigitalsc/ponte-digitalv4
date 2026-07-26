# Foundation — Princípios Inegociáveis

Este é o documento de fundação da Ponte Digital: o que não muda, independentemente da fase do produto, da sprint ativa, ou de qualquer pressão de prazo. `01-VISION/PRINCIPLES.md` é o resumo de consulta rápida deste arquivo — este aqui é a versão completa.

## O mantra

> Não crie um ERP completo. Crie um empresário mais tranquilo.

Todo recurso, tela ou automação deve ser avaliado contra esse mantra antes de qualquer discussão técnica.

## O teste de três perguntas (Matriz de Decisão)

Antes de qualquer funcionalidade nova entrar em qualquer sprint, ela precisa responder sim a estas três perguntas:

1. Ajuda o empresário a decidir melhor **nesta semana**?
2. Aumenta o conhecimento que a Ponte terá sobre a empresa **no futuro**?
3. Fortalece pelo menos um dos cinco Patrimônios Empresariais (Financeiro, Operacional, Comercial, Cognitivo, Humano — ver `01-VISION/THESIS.md`)?

*(Não confundir com as "Camadas do Patrimônio Cognitivo da Ponte", também em `THESIS.md` desde 2026-07-14 — são sobre o acervo de conhecimento da própria Ponte, não sobre o negócio do empresário-cliente.)*

Se a resposta for não às três, a ideia não entra — por mais interessante que pareça tecnicamente. Isso vale para fundadores, agentes de IA e qualquer pessoa propondo escopo.

## Princípios inegociáveis (não mudam nem na fase enxuta)

1. **Soft delete, audit trail e tenant guard em todo model.** Nenhuma exceção, nenhuma fase de produto justifica abrir mão disso — é a garantia mínima de que nenhuma mudança é destrutiva ou vaza dados entre empresas.
2. **O estágio da empresa é o teto da sofisticação técnica.** Enquanto a Ponte estiver em fase pré-validação (V4 Founder), nenhuma arquitetura deve ser mais sofisticada do que o problema real exige agora — mesmo que uma versão mais elaborada exista descrita em `ARCHITECTURE.md`.
3. **Nenhuma funcionalidade entra sem passar pela Matriz de Decisão.** Inclusive ideias boas — elas esperam no `05-OPERATIONS/BACKLOG.md` até a sprint certa.
4. **Todo pedido a um agente de código chega como especificação fechada.** Nunca como "continue o projeto" — ver `06-AI/TASK_TEMPLATE.md` e `06-AI/PROMPT_PATTERNS.md`.
5. **Toda mudança precisa ser reversível.** Ver item 1 — isso é consequência direta, não um princípio separado.
6. **Documentação é parte da entrega, não um extra.** `CHANGELOG.md` e `KNOWN_ISSUES.md` são atualizados a cada sprint concluída.
7. **O agente executa, o fundador decide.** Em caso de dúvida ou conflito entre documentos, o agente pergunta — nunca decide sozinho e nunca improvisa uma regra nova silenciosamente.

A versão operacional destes mesmos princípios, incluindo o que isso significa na prática para quem escreve código, está em `ENGINEERING_CONSTITUTION.md`.

## Relação com os outros documentos de visão

`THESIS.md` descreve o que a Ponte é e por que existe em termos de proposta de valor para o empresário. Este documento (`FOUNDATION.md`) descreve os princípios que restringem como qualquer versão dessa tese pode ser construída, em qualquer fase. Nenhum dos dois é checklist de sprint — isso é papel de `05-OPERATIONS/SPRINTS/SPRINT-001-DIAGNOSTICO.md`.
