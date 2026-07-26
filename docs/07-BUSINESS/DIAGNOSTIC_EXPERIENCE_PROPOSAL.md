# Proposta: Estilo de Interação do Diagnóstico — PENDENTE DE APROVAÇÃO DO FUNDADOR

*Este documento NÃO altera `DIAGNOSTIC.md` — as perguntas dos 5 blocos e os critérios de aceite ali continuam sendo o conteúdo oficial. O que está aqui é uma proposta de **como** entregar essa experiência, ainda não decidida. Registrado como proposta, não como especificação, seguindo a mesma regra de `TERMINOLOGY.md` (nunca tratar como decidido o que não foi).*

## A proposta

Hoje o critério de aceite do diagnóstico já pede "completável em até 5 minutos" — a proposta não muda esse critério, muda o formato de entrega:

**Formato formulário (implícito hoje):** pergunta → resposta → próxima pergunta, sem retorno até o final.

**Formato proposto:** a cada resposta, uma reação curta e contextual antes da próxima pergunta — por exemplo, ao saber que o empresário não controla fluxo de caixa, responder algo como "isso costuma ser uma das principais causas de falta de dinheiro mesmo em empresas lucrativas — vou observar isso junto com as próximas respostas", antes de seguir para a pergunta seguinte.

E o relatório final deixaria de ser uma pontuação numérica e passaria a ser linguagem corrida, apontando 2-3 pontos de atenção específicos em vez de uma nota.

## Conceito relacionado: "SOMOD"

Nome proposto para o ciclo Observar → Mapear → Orientar → Decidir → Aprender, que descreveria o diagnóstico (e futuros check-ins) como um processo contínuo, não um evento único. **Isso se sobrepõe conceitualmente ao Motor Cognitivo e ao ciclo Observação→Hipótese→Experimento→Conhecimento já documentados e CONGELADOS em `02-PRODUCT/MVP_SCOPE.md`.** Antes de adotar um nome novo, vale decidir se é o mesmo conceito com outro nome, ou algo genuinamente diferente — não introduzir os dois em paralelo sem essa clareza.

## Por que isso é uma decisão do fundador, não uma implementação automática

1. Reação em tempo real a cada resposta é mais IA (custo, latência, mais uma fonte de erro) do que o "chat genérico" que hoje já existe parcialmente implementado — impacto de custo e de escopo real na sprint atual.
2. Entra em tensão direta com a regra de congelamento do Motor Cognitivo — precisa ficar claro que isso é uma camada de copywriting/UX sobre o diagnóstico simples de hoje, não uma reintrodução do Motor Cognitivo pela porta dos fundos.
3. "SOMOD" como conceito novo, se aprovado, deveria virar termo oficial em `01-VISION/TERMINOLOGY.md` — não usar em nenhum outro documento antes disso, para não repetir o problema de termo não-definido que a própria `TERMINOLOGY.md` pede para evitar.

## Se aprovado, onde isso deveria ir

- Critério de aceite atualizado em `DIAGNOSTIC.md` (formato de entrega).
- Termo "SOMOD" (se mantido) definido em `01-VISION/TERMINOLOGY.md`.
- Registrar como ADR em `04-DECISIONS/ADR/` se implicar em mudança de arquitetura do fluxo de perguntas (ex.: streaming de resposta da IA a cada pergunta em vez de só ao final).
