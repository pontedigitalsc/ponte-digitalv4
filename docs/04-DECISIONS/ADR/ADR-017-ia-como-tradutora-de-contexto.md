# ADR-017: IA como tradutora de contexto, não como fonte de conhecimento

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

Hoje a IA (modelo de linguagem, ex.: ChatGPT) é usada como fonte de interpretação — o sistema envia dados brutos para a IA e ela devolve respostas. Isso cria uma dependência perigosa: o conhecimento gerado pela IA não é reproduzível, auditável, ou deterministicamente correto.

O MOTOR_COGNITIVO.md define que a IA não é o cérebro da Ponte Digital. O cérebro é o Motor Cognitivo — determinístico, reproduzível, baseado em regras. A IA é apenas a voz: recebe Contexto Cognitivo pronto e traduz para linguagem natural.

## Decisão

1. A IA nunca consulta o banco de dados diretamente.
2. A IA nunca interpreta dados brutos — ela recebe Contexto Cognitivo já processado pelo Motor.
3. A IA nunca cria conhecimento — ela apenas traduz o conhecimento existente em linguagem natural.
4. O Contexto Cognitivo (ADR-021) é o único insumo que a IA recebe.
5. A IA não participa do ciclo de decisão — ela apenas comunica a decisão já tomada pelo Motor.
6. A IA não influencia o Motor — não há feedback loop da IA para o Motor (exceto quando o empresário valida ou rejeita uma recomendação).

## Alternativas consideradas

- Manter IA como fonte de conhecimento — rejeitada: o conhecimento gerado não é reproduzível, não é auditável, e depende de um modelo externo que muda sem aviso.
- Usar IA apenas como "segunda opinião" — rejeitada: confunde o empresário sobre quem decidiu o quê. O Motor decide, a IA comunica.

## Consequências

- Positivo: conhecimento reproduzível e auditável — independente de modelo de IA externo.
- Positivo: a IA pode ser substituída sem perda de conhecimento (trocar o modelo de linguagem não apaga o que o Motor aprendeu).
- Positivo: o Motor funciona sem IA — se a API de IA cair, o sistema continua operando (apenas sem tradução para linguagem natural).
- Negativo: toda comunicação com o empresário precisa ser formatada pelo Context Engine antes de chegar à IA — custo de processamento adicional.
- Negativo: a IA fica limitada ao que o Motor já sabe — não pode "descobrir" padrões que o Motor não identificou. Isso é intencional (Princípio 1: IA não é fonte de conhecimento).
