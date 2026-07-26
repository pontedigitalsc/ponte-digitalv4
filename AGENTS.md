<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# Ponte Digital — Engineering Operating Rules

## Propósito deste arquivo

Este arquivo é o contrato obrigatório para qualquer agente de código trabalhando neste repositório.

A Ponte Digital não é desenvolvida apenas pelo código existente. O código representa o estado atual da implementação. A documentação representa: visão estratégica, decisões arquiteturais, princípios do produto, regras de negócio, prioridades atuais.

Nenhuma implementação deve ser feita baseada apenas na leitura do código. O agente deve sempre entender: "Por que isso existe?", "Qual problema resolve?", "Essa alteração fortalece ou enfraquece a visão da Ponte Digital?"

**Nota de organização:** existe mais de um arquivo com informação de "regras" neste repositório — este (raiz, o contrato geral) e `docs/06-AI/AGENTS.md` (a versão operacional, mais enxuta, focada em comportamento durante a execução de uma tarefa). Não são duplicatas — leia os dois.

---

## Princípio fundamental

Antes de modificar qualquer coisa: **entenda**. Depois: **planeje**. Só então: **implemente**. Nunca pule diretamente para código.

---

## Ordem obrigatória de leitura

Antes de qualquer alteração, sempre ler, nesta ordem:

1. **`docs/00-START-HERE.md`** — mapa da documentação, ordem de leitura, fontes da verdade.
2. **`docs/02-PRODUCT/CURRENT_PRODUCT.md`** — fase atual, funcionalidades permitidas, funcionalidades congeladas, hipóteses, prioridades.
3. **`docs/03-ENGINEERING/ARCHITECTURE.md`** — padrões técnicos, decisões arquiteturais, limites da implementação.
4. **`docs/06-AI/AGENTS.md`** — regras operacionais de comportamento do agente.
5. **`docs/05-OPERATIONS/SPRINTS/`** — confirmar qual sprint está ativa, objetivo, escopo, critérios de aceite.

---

## Fase zero — reconhecimento obrigatório

Antes de codificar qualquer coisa, mapear a estrutura real do projeto:

```
/
docs/
sistema/
  src/
    app/
    components/
    services/
    lib/
    engine/
  prisma/
```

Não assumir que arquivos existem. Pesquisar. Confirmar.

### Auditoria documental

Pesquisar todos os documentos em `docs/**`. Identificar: documentos duplicados, documentos conflitantes, documentos antigos, documentos faltantes, documento fonte da verdade. Caso existam conflitos: **não escolher sozinho — registrar o conflito** em `docs/05-OPERATIONS/KNOWN_ISSUES.md` e perguntar.

### Auditoria técnica

Antes de alterar código, mapear:

- **Aplicação:** framework, versões, estrutura, rotas, componentes.
- **Banco:** ler `sistema/prisma/schema.prisma` — models, relacionamentos, enums, índices, tenant fields, soft delete, auditoria.
- **Backend:** services, APIs, validações, autenticação, autorização.
- **Frontend:** páginas, componentes, hooks, estados, fluxos.
- **Segurança:** autenticação, tenant guard, RLS, permissões, isolamento de dados — ver `docs/03-ENGINEERING/SECURITY.md`.

---

## Regra de comparação

Sempre comparar:

```
DOCUMENTAÇÃO → INTENÇÃO
CÓDIGO       → REALIDADE
```

Toda divergência encontrada deve ser classificada:

- **Tipo A — Implementação correta:** código segue documentação.
- **Tipo B — Simplificação estratégica:** código diferente, mas permitido pela fase atual.
- **Tipo C — Débito técnico:** código viola uma decisão ou princípio.
- **Tipo D — Ausência:** documentação prevê algo inexistente.
- **Tipo E — Conflito documental:** documentos discordam entre si.

---

## Nunca fazer

- Criar funcionalidades fora da sprint.
- Alterar domínio sem atualizar documentação.
- Refatorar arquitetura sem ADR (`docs/04-DECISIONS/ADR/`).
- Criar abstrações sem necessidade.
- Implementar hipóteses como regras (ver `docs/02-PRODUCT/CURRENT_PRODUCT.md` seção 4).
- Transformar visão futura em requisito atual.
- Corrigir algo apenas porque é diferente da arquitetura ideal.

---

## Princípio da fase V4 Founder

A Ponte Digital está validando produto. Prioridade: usuário real > arquitetura perfeita; dados reais > suposições; aprendizado > complexidade.

Não implementar agora: Motor Cognitivo completo, Domain Events formais, Repositories, migração para Server Actions, Inteligência Coletiva, sistemas avançados de recomendação. Somente implementar quando existir evidência (ver `docs/02-PRODUCT/MVP_SCOPE.md`).

---

## Matriz de decisão de funcionalidades

Toda nova funcionalidade deve responder:

1. Qual problema do empresário resolve?
2. Ajuda ele a decidir melhor?
3. Reduz trabalho manual?
4. Gera conhecimento futuro?
5. Fortalece algum patrimônio da Ponte Digital?
6. Pode ser usada semanalmente?

Se não houver respostas claras: não implementar.

---

## Padrão para execução de tarefas

Toda tarefa deve começar com:

```
Objetivo:
Arquivos envolvidos:
Problema resolvido:
Critérios de aceite:
Impacto no produto:
Impacto arquitetural:
Documentação afetada:
Riscos:
Plano de implementação:
```

## Durante a implementação

Sempre: manter padrões existentes, preservar multi-tenancy, respeitar permissões, validar entradas, registrar decisões importantes.

Evitar: mudanças grandes, refactors amplos, mudanças de domínio, novas dependências.

## Banco de dados

Toda alteração deve avaliar: impacto nos tenants, migração necessária, dados existentes, compatibilidade futura. Nunca remover dados sem estratégia.

## Segurança

Toda alteração deve considerar: isolamento entre empresas, permissões, exposição de dados, autenticação. Nunca confiar apenas no frontend. Ver `docs/03-ENGINEERING/SECURITY.md`.

## IA e Motor Cognitivo

A IA não é o cérebro da Ponte Digital — é apenas interface. O patrimônio está em dados, contexto, decisões, aprendizado acumulado. Nunca criar lógica crítica diretamente no modelo de IA.

## Documentação é código

Toda decisão importante precisa gerar atualização documental:

- Nova arquitetura → ADR (`docs/04-DECISIONS/ADR/`)
- Novo comportamento → `docs/02-PRODUCT/CURRENT_PRODUCT.md`
- Novo aprendizado → `docs/08-KNOWLEDGE/`
- Nova regra → `docs/01-VISION/PRINCIPLES.md`

---

## Formato das respostas do agente

Antes de executar, apresentar:

- **Entendimento** — o que foi compreendido.
- **Análise** — o que existe hoje.
- **Plano** — o que será feito.
- **Alterações previstas** — arquivos.
- **Riscos** — possíveis impactos.

Somente depois, implementar.

---

## Regra final

A Ponte Digital não está construindo apenas software — está construindo patrimônio intelectual. Cada linha de código deve aumentar: conhecimento, confiabilidade, capacidade de evolução, valor da empresa.

O agente não deve apenas fazer funcionar. Deve ajudar a construir uma empresa de tecnologia que consiga evoluir por muitos anos.
