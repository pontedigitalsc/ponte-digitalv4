# Prompt Patterns

## Não faça pedidos abertos

```
Ruim:   "Continue o projeto."
Ruim:   "Analise tudo e proponha melhorias."
Bom:    Um pedido no formato de TASK_TEMPLATE.md, com objetivo, arquivos,
        regras e critérios de aceite fechados.
```

## Para auditorias e análises

Peça sempre uma lista de perguntas específicas e um formato de saída fechado (ex.: "gere um relatório contendo apenas estas 6 seções, nesta ordem"). Pedidos abertos de análise tendem a gerar respostas mais longas, menos confiáveis e mais propensas a contradizer instruções explícitas.

## Para tarefas de raciocínio estruturado (auditoria, análise comparativa, revisão de arquitetura)

Prefira o modelo mais forte disponível no momento (não necessariamente o mais rápido) — essas tarefas cobram mais de seguir instrução à risca do que velocidade de edição de código.

## Sempre feche o loop

Depois que o agente responder, confira a resposta contra o pedido original antes de aceitar como verdade: ela respondeu exatamente o que foi pedido, na ordem pedida, sem propor o que foi explicitamente proibido?
