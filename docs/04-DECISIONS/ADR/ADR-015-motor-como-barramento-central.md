# ADR-015: Motor Cognitivo como barramento central da plataforma

**Data:** 2026-07-18
**Status:** Aceita

## Contexto

Hoje os módulos da plataforma (CRM, Financeiro, Agenda, Assistente) comunicam-se entre si de forma ad-hoc — quando se comunicam. Não há um barramento central que coordene o fluxo de informações e decisões.

O MOTOR_COGNITIVO.md define que o Motor Cognitivo não é apenas mais um módulo — ele é o sistema nervoso central da plataforma. Todo dado relevante deve passar pelo Motor, e toda decisão deve ser contextualizada por ele.

## Decisão

1. O Motor Cognitivo é o barramento central de comunicação da plataforma.
2. Todos os módulo da plataforma (CRM, Financeiro, Agenda, Assistente, etc.) comunicam-se exclusivamente através do Motor Cognitivo.
3. Módulos existentes são encapsulados um por um — não há migração em massa.
4. O Motor é responsável por:
   - Receber sinais de todos os módulo.
   - Manter contexto cognitivo atualizado.
   - Distribuir decisões e recomendações de volta para os módulos.
5. Nenhum módulo pode consultar outro módulo diretamente — toda comunicação passa pelo Motor.

## Alternativas consideradas

- Manter comunicação ad-hoc entre módulos — rejeitada: sem barramento central, não há contexto cognitivo global, não há rastreabilidade de decisões, e cada módulo vira uma ilha de informação.
- Implementar barramento de dados genérico (ex.: Kafka) sem o Motor — rejeitada: o valor não está no transporte, está na interpretação — que é o papel do Motor Cognitivo.

## Consequências

- Positivo: visibilidade completa de todo fluxo de informação da plataforma.
- Positivo: rastreabilidade de decisões: toda decisão tem contexto documentado.
- Negativo: o Motor vira ponto central de acoplamento — o Event Bus (ADR-011) e a arquitetura de submotores (ADR-016) mitigam esse risco.
- Negativo: módulos legados precisam ser encapsulados — custo de migração distribuído ao longo das sprints.
