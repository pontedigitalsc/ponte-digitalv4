# Eventos de Domínio

## Regra de nomenclatura (para quando o catálogo formal for implementado)

Todo evento deve descrever um **fato de negócio**, nunca uma operação técnica de CRUD.

```
Errado:  ClienteAtualizado { status: "inativo" }
Certo:   ClienteNaoRetornou { diasSemContato: 47 }
```

## Realidade atual (aceita para a V4 Founder)

O sistema hoje usa `HistoricoSinal`, uma camada de sinal mais simples, com nomes técnicos (ex.: `clientes-sem-contato`) em vez de nomes semânticos formais. Isso é uma simplificação intencional — ver `ADR/ADR-001-historico-sinal-vs-domain-event.md` — e **não deve ser corrigido antes da Fase 2** (pós-validação com os 100 fundadores).

## O que HistoricoSinal já resolve, na prática

- É a base de dado para o futuro Centro de Decisão.
- Gera os sinais que hoje alimentam o Assistente/telas de alerta.

## O que fica para depois (congelado)

- Catálogo formal com nomenclatura semântica revisada.
- Emissão por todos os quatro sistemas (hoje só uma parte emite sinal).
- Consumo pelo Motor Cognitivo (que ainda não existe).
