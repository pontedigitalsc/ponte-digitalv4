# Sprint Atual

## Nome

Diagnóstico Inteligente

## Objetivo

Criar o primeiro diagnóstico funcional: perguntas, respostas, geração automática do Perfil Cognitivo.

## Por que esta sprint, e não outra

CRM, Financeiro, Tarefas e Assistente IA já existem no código, mas continuam genéricos porque não há contexto sobre a empresa. O Diagnóstico é o que gera esse contexto — é a lacuna real identificada em duas auditorias de código, não uma preferência arbitrária.

## Hipóteses desta sprint

Em teste nesta sprint — ver registro completo em `08-KNOWLEDGE/HYPOTHESES.md`:
- **H1** — Empresários responderão diagnósticos e check-ins continuamente. Esta sprint entrega a primeira evidência real: taxa de conclusão e retorno mensal (ver `05-OPERATIONS/METRICS.md`).

## Critérios de aceite

- Perguntas dos 5 blocos cadastradas (Empresa, Operação, Gestão, Problemas, Objetivos) — ver `07-BUSINESS/DIAGNOSTIC.md` para o conteúdo completo.
- Respostas salvas por empresa.
- Perfil Cognitivo gerado automaticamente ao final do diagnóstico.
- Diagnóstico acessível e completável em até 5 minutos por um fundador real.

## Não implementar nesta sprint

- Motor Cognitivo
- Centro de Decisão (tela dedicada)
- Catálogo formal de `DomainEvent`
- Camada `server/actions / services / repositories`
- Qualquer item da lista de congelados em `02-PRODUCT/MVP_SCOPE.md`

## Não modificar nesta sprint

- Banco de dados fora do necessário para o Diagnóstico (não tocar em models de Financeiro, CRM, Tarefas)
- Autenticação
- `HistoricoSinal` / camada de sinal existente

## Em paralelo, mas fora desta sprint (não bloqueia, não expande escopo)

- Corrigir soft delete incompleto (ver `KNOWN_ISSUES.md`) — pequeno, pode ser feito por outra pessoa/sessão em paralelo.

Atualizar este arquivo a cada início de sprint.
