# MATRIZ DE CAPACIDADES EMPRESARIAIS — P33

## Mapeamento Página → Capacidade

### Versão Founder V1 (3-5 telas)

| Página | Rota | Capacidade Primária | Capacidade Secundária | Ação do Empresário |
|--------|------|--------------------|----------------------|-------------------|
| **Landing** | `/` | Observação | — | Descobrir algo sobre o próprio negócio |
| **Diagnóstico** | `/conversa` | Observação | Compreensão | Responder perguntas e receber revelação |
| **Centro Cognitivo** | `/dashboard` | Compreensão | Clareza | Ver retrato atual e próximo passo |
| **Assistente** | `/assistente` | Decisão | Execução | Conversar para decidir melhor |
| **Centro de Decisão** | `/centro-decisao` | Priorização | Decisão | Escolher o que fazer agora |
| **Conhecimento** | `/conhecimento` | Aprendizado | Incorporação | Revisar e aplicar conhecimento |
| **Aprendizados** | `/aprendizados` | Aprendizado | Incorporação | Ensinar preferências e regras |

### Páginas de Suporte

| Página | Rota | Capacidade | Justificativa |
|--------|------|-----------|--------------|
| Login | `/login` | Nenhuma | Necessário para acesso |
| Criar Conta | `/criar-conta` | Incorporação | Preserva conhecimento gerado |
| Configurações | `/configuracoes` | Nenhuma | Necessário para operação |
| Histórico | `/historico` | Aprendizado | Revisitar decisões passadas |

### Páginas Ocultadas (ERP)

| Página | Rota | Capacidade | Motivo do Desvio |
|--------|------|-----------|-----------------|
| ~~CRM~~ | ~~`/crm`~~ | Nenhuma (Execução pura) | Funcionalidade ERP sem diferencial cognitivo |
| ~~Financeiro~~ | ~~`/financeiro`~~ | Nenhuma (Execução pura) | Lançamento contábil, não aprendizado |
| ~~Clientes~~ | ~~`/clientes`~~ | Nenhuma (Execução pura) | CRUD sem valor cognitivo |
| ~~Tarefas~~ | ~~`/tarefas`~~ | Nenhuma (Execução pura) | Todo-list sem contexto de decisão |
| ~~Implantações~~ | ~~`/implantacoes`~~ | Nenhuma (Execução pura) | Gestão de projetos genérica |

## Ciclo de Capacidades

Cada sessão do empresário na Ponte Digital percorre:

```
Observação → Compreensão → Clareza → Priorização → Decisão → Execução → Aprendizado → Incorporação → Adaptação
```

### Fluxo típico do Founder V1

1. **Landing** → Empresário descobre a Ponte Digital (Observação)
2. **Diagnóstico** → Empresário responde perguntas sobre a empresa (Observação → Compreensão)
3. **Centro Cognitivo** → Empresário vê o retrato da empresa (Compreensão → Clareza)
4. **Centro de Decisão** → Empresário vê o que é prioritário (Clareza → Priorização)
5. **Assistente** → Empresário decide com ajuda (Priorização → Decisão → Execução)
6. **Conhecimento/Aprendizados** → Empresário incorpora aprendizado (Aprendizado → Incorporação)

## Critérios de Fortalecimento

Cada página é avaliada por:

1. **Problema resolvido**: Qual dor do empresário esta página trata?
2. **Decisão habilitada**: Esta página ajuda o empresário a decidir melhor?
3. **Trabalho manual reduzido**: Esta página elimina trabalho braçal?
4. **Conhecimento gerado**: Esta página produz conhecimento reutilizável?
5. **Frequência de uso**: O empresário usará isso semanalmente?
6. **Valor acumulado**: O uso repetido gera patrimônio?

### Resultado da Avaliação

| Página | Problema | Decisão | Trabalho | Conhecimento | Frequência | Valor | Média |
|--------|----------|---------|----------|-------------|-----------|-------|-------|
| Landing | 5 | 3 | 5 | 1 | 1 | 3 | 3.0 |
| Diagnóstico | 5 | 3 | 4 | 5 | 1 | 5 | 3.8 |
| Centro Cognitivo | 5 | 4 | 4 | 5 | 5 | 5 | 4.7 |
| Assistente | 5 | 5 | 4 | 4 | 5 | 4 | 4.5 |
| Centro Decisão | 5 | 5 | 3 | 3 | 4 | 4 | 4.0 |
| Conhecimento | 4 | 3 | 3 | 5 | 3 | 5 | 3.8 |
| Aprendizados | 4 | 3 | 3 | 5 | 2 | 5 | 3.7 |

## Capacidades não atendidas (dívida)

Nenhuma — todas as 9 capacidades são fortalecidas por pelo menos uma página.
