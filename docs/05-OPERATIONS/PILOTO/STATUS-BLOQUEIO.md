# Bloqueio Arquitetural — WP-17.3 a WP-17.6

## Problema

Os WPs 17.3 (Execução da primeira entrada real), 17.4 (Medição de valor), 17.5 (Coleta de fricções) e 17.6 (Consolidação do aprendizado) exigem **empresas reais utilizando o sistema** para serem executados.

Não há empresas piloto disponíveis no contexto atual para executar estes WPs.

## Impacto

O Programa 17 permanece incompleto até que empresas reais sejam selecionadas e o piloto seja executado.

## O que já está preparado

- **WP-17.1**: Documento de seleção com critérios, riscos e protocolo de entrada em `WP-17.1-SELECAO.md`
- **WP-17.2**: Auditoria técnica completa realizada, correções críticas aplicadas (4 bugs corrigidos), checklist de prontidão e pontos de observação em `WP-17.2-PREPARACAO.md`
- **Métricas**: `obterMetricasPrimeiraExperiencia` disponível no observatório cognitivo

## O que falta (bloqueado)

| WP | Descrição | Dependente de |
|----|-----------|---------------|
| 17.3 | Execução com empresas reais | Empresas piloto selecionadas e ambiente pronto |
| 17.4 | Medição de valor | Dados de uso real |
| 17.5 | Coleta de fricções | Feedback de usuários reais |
| 17.6 | Consolidação do aprendizado | Resultados dos WPs 17.3-17.5 |

## Recomendação

Assim que houver pelo menos 1 empresa piloto disposta, executar:

1. Deploy do ambiente com as correções aplicadas
2. Acompanhamento da primeira experiência
3. Coleta de métricas via `obterMetricasPrimeiraExperiencia`
4. Entrevista de feedback pós-primeiro uso
5. Iteração conforme aprendizado
