# Plano de Implementação Controlada

> PROGRAMA 15 — Documento 10 de 10
> Sequência de implementação segura: ordem dos WPs, dependências, arquivos impactados, riscos, estratégia de rollback, critérios de aceite

---

## Relatório de execução final

- **Descobertas:** a implementação necessária é surpreendentemente pequena. A maior parte da infraestrutura já existe (conversa anônima, micro-reações, interpretações, Orchestrator, Experience Engine, Founder Activation Engine). O que precisa ser criado são ~5-6 componentes/endpoints novos. O grosso é modificação de código existente.
- **Pressupostos:** nenhum bloqueio arquitetural foi identificado. As mudanças são todas de fluxo e apresentação — não de domínio.
- **Lacunas:** o maior risco de implementação é quebrar o fluxo de conversa existente durante as modificações. A estratégia de rollback precisa ser robusta.
- **Riscos:** nenhum bloqueio arquitetural encontrado. Todos os riscos são mitigáveis via design.
- **Conflitos:** nenhum.
- **Impactos futuros:** este plano é a etapa final do PROGRAMA 15. Após a implementação dos 5 eixos, a primeira experiência estará completa e pronta para validação com usuários reais.
- **Confirmação de coerência:** TODO o PROGRAMA 15 foi construído sem violar a Constituição, ADRs, arquitetura consolidada ou escopo congelado. Nenhum novo schema, nenhuma nova engine, nenhuma nova migration.

---

## 1. Visão geral dos Work Packages

| WP | Nome | Esforço | Depende de | Risco |
|----|------|---------|------------|-------|
| 1 | Landing Page Pública | Pequeno | Nenhum | 🟢 Baixo |
| 2 | Resumo em Linguagem Natural | Médio | Nenhum | 🟡 Médio |
| 3 | Escopo Curado | Médio | WP-1 (pós-cadastro) | 🟡 Médio |
| 4 | Transição Apoiador → Fundador | Pequeno | WP-2 | 🟢 Baixo |
| 5 | Métricas e Monitoramento | Médio | WP-1, WP-2, WP-3 | 🟢 Baixo |
| 6 | Integração e Testes | Médio | WP-1 a WP-5 | 🟡 Médio |

**Ordem de execução:** WP-1 → WP-2 → WP-3 → WP-4 → WP-5 → WP-6

Dependências são fracas — WPs podem ser executados em paralelo (ex.: WP-2 e WP-3 são independentes). A ordem sugerida é a mais segura.

---

## 2. WP-1: Landing Page Pública

### 2.1 Objetivo

Criar a porta de entrada pública da Ponte Digital, sem exigir autenticação.

### 2.2 Descrição

Substituir o redirect atual da raiz (`/` → `/dashboard`) por uma landing page pública com:
- Headline: "Cansou de planilha?"
- Subtítulo: "Responda 5 perguntas sobre seu negócio e descubra o que está passando despercebido."
- CTA: "Descobrir agora" — inicia sessão anônima e redireciona para `/conversa`
- Design limpo, zero jargão, zero distrações

### 2.3 Arquivos impactados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `sistema/src/app/page.tsx` | **MODIFICAR** | Substituir redirect por landing page |
| `sistema/src/app/api/sessao/iniciar/route.ts` | **CRIAR** | GET: cria `conv_token`, seta cookie, redireciona para `/conversa` |
| `sistema/src/app/api/conversa/route.ts` | **MODIFICAR** | Se `GET` sem `conv_token`, retorna 400 (em vez de criar um automaticamente) |
| `sistema/src/lib/auth.ts` | **NENHUMA** | Landing page não usa auth |
| `sistema/src/app/conversa/page.tsx` | **NENHUMA** | Já funciona com `conv_token` de cookie |

### 2.4 Dependências

Nenhuma. WP-1 é autossuficiente.

### 2.5 Riscos

| Risco | Mitigação |
|-------|-----------|
| Cookie `conv_token` não é criado corretamente | Testar manualmente em 3 browsers |
| Landing page quebra layout mobile | Testar em 320px de largura |
| `GET /api/conversa` sem `conv_token` quebra fluxo existente | Manter compatibilidade: se cookie existe, funciona; se não, retorna 400 |

### 2.6 Estratégia de rollback

Reverter `sistema/src/app/page.tsx` para o redirect original:
```ts
import { redirect } from 'next/navigation';
export default function Home() { redirect('/dashboard'); }
```

Remover `sistema/src/app/api/sessao/iniciar/route.ts`.

### 2.7 Critérios de aceite

- [ ] Landing page carrega em < 2s
- [ ] CTA "Descobrir agora" inicia sessão anônima
- [ ] Cookie `conv_token` é criado com httpOnly, path=/, maxAge=7d
- [ ] Redireciona para `/conversa` com cookie válido
- [ ] Funciona em mobile (320px+)
- [ ] Zero jargão técnico na página
- [ ] 1 única CTA principal

---

## 3. WP-2: Resumo em Linguagem Natural

### 3.1 Objetivo

Substituir a tela de revelação atual (3 cards técnicos: ponto de atenção, observação, alinhamento) por um resumo corrido em linguagem natural.

### 3.2 Descrição

Criar um gerador de texto no servidor que combina as interpretações existentes em um texto corrido de 5 seções (O que entendi → Me preocupa → Acertou → Ainda não sei → Próximo passo). Modificar `POST /api/conversa/finalizar` para retornar o resumo em texto. Atualizar o frontend para exibir o texto em vez dos 3 cards.

### 3.3 Arquivos impactados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `sistema/src/app/api/conversa/finalizar/route.ts` | **MODIFICAR** | Adicionar campo `resumoNatural` no retorno |
| `sistema/src/engine/interpretacoes.ts` | **MODIFICAR** | Adicionar função `gerarResumoNatural(interpretacoes, respostas)` |
| `sistema/src/components/conversa/revelacao-card.tsx` | **MODIFICAR** | Exibir texto corrido em vez de 3 cards, ou criar novo componente |
| `sistema/src/app/conversa/page.tsx` | **MODIFICAR** | Consumir `resumoNatural` da API e passar para o componente |
| `sistema/prisma/schema.prisma` | **NENHUMA** | `IdentidadeDigital.narrativa` (tipo `Json?`) já pode armazenar |

### 3.4 Dependências

Nenhuma. WP-2 modifica apenas a saída do finalizar conversa. O fluxo interno permanece idêntico.

### 3.5 Riscos

| Risco | Mitigação |
|-------|-----------|
| Template de texto parece genérico | Usar placeholders obrigatórios (nome do segmento, problema, objetivo) |
| Interpretações mudam de formato | Manter funções originais + adicionar `gerarResumoNatural` sem quebrar contratos |
| Resumo muito longo (> 350 palavras) | Limitar seções a 1 parágrafo cada |

### 3.6 Estratégia de rollback

Reverter `finalizar/route.ts` para retornar o formato de cards original. Manter `gerarResumoNatural` como função não utilizada.

### 3.7 Critérios de aceite

- [ ] Resumo tem 5 seções na ordem correta
- [ ] Resumo usa nome do segmento + número de funcionários + problema declarado
- [ ] Resumo não contém jargão técnico
- [ ] Resumo tem no máximo 350 palavras
- [ ] Próximo passo é uma ação executável em 1 dia
- [ ] Botão "Criar conta" ainda funciona
- [ ] Botão "Guardar e ver depois" ainda funciona
- [ ] Interpretações originais (caso necessárias internamente) permanecem disponíveis

---

## 4. WP-3: Escopo Curado

### 4.1 Objetivo

Garantir que o primeiro login na Plataforma Cognitiva mostre apenas o necessário para o nível de ativação do empresário.

### 4.2 Descrição

Adicionar lógica de filtro de módulos no Experience Engine. Modificar a sidebar para aceitar estado "bloqueado". Modificar o dashboard para mostrar apenas cards de prioridade. Criar componente `priority-card`.

### 4.3 Arquivos impactados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `sistema/src/engine/cognitive-experience-engine.ts` | **MODIFICAR** | Adicionar `obterModulosLiberados(empresaId): string[]` |
| `sistema/src/engine/tipos.ts` | **MODIFICAR** | Adicionar tipos `ModuloSistema` e `EstadoModulo` |
| `sistema/src/components/layout/sidebar.tsx` | **MODIFICAR** | Aceitar `modulosLiberados`, renderizar bloqueados como "Em breve" |
| `sistema/src/app/(dashboard)/dashboard/page.tsx` | **MODIFICAR** | Usar escopo reduzido para primeiros dias |
| `sistema/src/components/shared/priority-card.tsx` | **CRIAR** | Card simples com título, descrição, ação |
| `sistema/src/engine/founder-activation-engine.ts` | **NENHUMA** | Já tem níveis — apenas consultar |
| `sistema/src/app/(dashboard)/layout.tsx` | **MODIFICAR** | Passar `modulosLiberados` para sidebar |

### 4.4 Dependências

WP-1 (pós-cadastro) — mas a lógica de desbloqueio pode ser implementada independentemente.

### 4.5 Riscos

| Risco | Mitigação |
|-------|-----------|
| Sidebar quebra visualmente com estado bloqueado | Testar em 3 resoluções |
| Módulo bloqueado gera erro 404/403 ao clicar | Bloquear graciosamente com toast |
| Usuário antigo (com módulos já liberados) perde acesso | Consultar `EventoAtivacao` existente — se já tem eventos, liberar tudo |

### 4.6 Estratégia de rollback

Reverter `sidebar.tsx` para o estado original (todos os módulos sempre ativos). Remover `obterModulosLiberados` do Experience Engine.

### 4.7 Critérios de aceite

- [ ] Sidebar no primeiro login mostra ≤ 5 módulos ativos
- [ ] Módulos não liberados mostram "Em breve" ao passar o mouse
- [ ] Clique em módulo bloqueado mostra toast, não erro
- [ ] Dashboard mostra 2 cards de prioridade, não lista completa
- [ ] Retorno D1 com escopo curado > 40%
- [ ] Módulos são desbloqueados conforme `EventoAtivacao`

---

## 5. WP-4: Transição Apoiador → Fundador

### 5.1 Objetivo

Definir as mensagens e convites que acompanham a transição do empresário de visitante anônimo para usuário cadastrado.

### 5.2 Descrição

Criar mensagens contextuais para cada sinal de transição (concluiu diagnóstico, voltou ao resumo, tentou módulo bloqueado). Ajustar a Founder Activation Engine para reconhecer o primeiro acesso anônimo como evento de ativação.

### 5.3 Arquivos impactados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `sistema/src/engine/cognitive-experience-engine.ts` | **MODIFICAR** | Adicionar método `obterMensagemTransicao(contexto): string` |
| `sistema/src/engine/founder-activation-engine.ts` | **MODIFICAR** | Adicionar `PRIMEIRO_ACESSO_ANONIMO` como tipo de evento |
| `sistema/prisma/schema.prisma` | **NENHUMA** | `EventoAtivacao` já suporta novos `TipoEventoAtivacao` |
| `sistema/src/app/conversa/page.tsx` | **MODIFICAR** (mínimo) | Exibir mensagem de transição no final do resumo |

### 5.4 Dependências

WP-2 (resumo) — as mensagens de transição aparecem no contexto do resumo.

### 5.5 Riscos

| Risco | Mitigação |
|-------|-----------|
| Mensagens soam genéricas ou automatizadas | Templates com placeholders obrigatórios |
| Founder Activation Engine quebra com novo tipo de evento | Adicionar ao enum existente, não modificar lógica atual |

### 5.6 Estratégia de rollback

Reverter `founder-activation-engine.ts` removendo o novo evento. Manter `obterMensagemTransicao` como não utilizada.

### 5.7 Critérios de aceite

- [ ] Mensagem de transição aparece após resumo
- [ ] Mensagem menciona problema específico do empresário
- [ ] Mensagem não é de venda ("assine agora")
- [ ] Segundo acesso (cookie renovado) mostra mensagem diferente
- [ ] Founder Activation Engine aceita `PRIMEIRO_ACESSO_ANONIMO`

---

## 6. WP-5: Métricas e Monitoramento

### 6.1 Objetivo

Implementar coleta das métricas definidas no Documento 7 e criar painel de monitoramento.

### 6.2 Descrição

Adicionar eventos de métrica nos pontos de coleta (landing, conversa, resumo, cadastro, primeiro login). Criar painel no Cognitive Observatory para visualização. Configurar alertas para riscos.

### 6.3 Arquivos impactados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `sistema/src/engine/cognitive-observatory.ts` | **MODIFICAR** | Adicionar métodos para métricas de primeira experiência |
| `sistema/src/app/(dashboard)/admin/cognitive-observatory/page.tsx` | **MODIFICAR** | Adicionar seção "Primeira Experiência" |
| `sistema/src/app/api/conversa/finalizar/route.ts` | **MODIFICAR** | Registrar evento de conclusão |
| `sistema/src/app/api/auth/criar-conta/route.ts` | **MODIFICAR** | Registrar evento de conversão |
| `sistema/src/app/api/sessao/iniciar/route.ts` | **MODIFICAR** | Registrar visita |

### 6.4 Dependências

WP-1, WP-2, WP-3 — precisa dos endpoints para registrar métricas.

### 6.5 Riscos

| Risco | Mitigação |
|-------|-----------|
| Coleta de métricas impacta performance | Assíncrono, sem bloquear resposta |
| Métricas sem privacidade | Coleta anônima e agregada |

### 6.6 Estratégia de rollback

Remover chamadas de métrica dos endpoints. Manter painel inerte.

### 6.7 Critérios de aceite

- [ ] Visitas na landing são registradas
- [ ] Conclusão de diagnóstico é registrada
- [ ] Conversão (cadastro) é registrada
- [ ] Retorno D1, D7, D30 são calculáveis
- [ ] Painel no Cognitive Observatory mostra métricas
- [ ] Alertas disparam quando gatilhos são atingidos

---

## 7. WP-6: Integração e Testes

### 7.1 Objetivo

Verificar o fluxo completo da primeira experiência e aprovar para lançamento.

### 7.2 Descrição

Testar o fluxo completo do início ao fim: landing → diagnóstico → resumo → cadastro → primeiro login curado → continuidade. Verificar todos os critérios de aprovação do Documento 9. Realizar ajustes finos.

### 7.3 Arquivos impactados

| Arquivo | Ação | Descrição |
|---------|------|-----------|
| `sistema/src/lib/validations/index.ts` | **REVISAR** | Validar schemas do fluxo |
| `sistema/src/app/conversa/page.tsx` | **REVISAR** | Ajustes finos de UX |
| `sistema/src/app/(auth)/criar-conta/page.tsx` | **REVISAR** | Ajustes finos de UX |

### 7.4 Dependências

WP-1 a WP-5 — teste de integração final.

### 7.5 Riscos

| Risco | Mitigação |
|-------|-----------|
| Fluxo quebra em cenário de borda | Testar 10 cenários diferentes (mobile, cookie expirado, retorno, abandono) |
| Performance degradada | Testar com carga simulada |

### 7.6 Estratégia de rollback

Rollback total de todos os WPs se o fluxo completo não passar nos critérios eliminatórios.

### 7.7 Critérios de aceite

**Eliminatórios (100% obrigatório):**
- [ ] F1-F15: funcionais OK
- [ ] T4: zero tentativas de venda
- [ ] T7: zero erros visíveis ao usuário
- [ ] S2: zero etapas com > 1 clique
- [ ] S3: 1 única CTA
- [ ] S4: zero interrupções
- [ ] L2: zero jargão técnico
- [ ] L4: ≤ 2 cards de prioridade

**Mínimos (pré-lançamento):**
- [ ] C1: taxa de clique no CTA > 30%
- [ ] C2: taxa de conclusão > 50%
- [ ] C6: escopo curado funcional
- [ ] T6: NPS > 30
- [ ] U4: conversão > 10%

---

## 8. Matriz de dependências entre WPs

```
WP-1 (Landing)
  │
  ├──→ WP-3 (Escopo Curado) — dependência fraca (pós-cadastro)
  │
  └──→ WP-5 (Métricas) — dependência (registrar visitas)
  
WP-2 (Resumo)
  │
  ├──→ WP-4 (Transição) — dependência (mensagens no resumo)
  │
  └──→ WP-5 (Métricas) — dependência (registrar conclusão)

WP-5 (Métricas) → WP-6 (Integração)

WP-3 (Escopo) → WP-6 (Integração)
WP-4 (Transição) → WP-6 (Integração)
WP-6 (Integração) → Lançamento
```

Caminho crítico: WP-1 → WP-5 → WP-6

WP-2 e WP-3 podem ser executados em paralelo com WP-1.

---

## 9. Tabela resumo de arquivos

### Arquivos NOVOS

| Arquivo | WP | Descrição |
|---------|----|-----------|
| `sistema/src/app/api/sessao/iniciar/route.ts` | WP-1 | Inicia sessão anônima |
| `sistema/src/components/shared/priority-card.tsx` | WP-3 | Card de prioridade |

### Arquivos MODIFICADOS

| Arquivo | WP | Descrição |
|---------|----|-----------|
| `sistema/src/app/page.tsx` | WP-1 | Landing page |
| `sistema/src/app/api/conversa/route.ts` | WP-1 | Validar conv_token |
| `sistema/src/app/api/conversa/finalizar/route.ts` | WP-2, WP-5 | Resumo natural + métricas |
| `sistema/src/engine/interpretacoes.ts` | WP-2 | Função gerarResumoNatural |
| `sistema/src/engine/cognitive-experience-engine.ts` | WP-3, WP-4 | obterModulosLiberados, obterMensagemTransicao |
| `sistema/src/engine/tipos.ts` | WP-3 | Tipos ModuloSistema, EstadoModulo |
| `sistema/src/components/layout/sidebar.tsx` | WP-3 | Estado bloqueado |
| `sistema/src/app/(dashboard)/dashboard/page.tsx` | WP-3 | Escopo reduzido |
| `sistema/src/app/(dashboard)/layout.tsx` | WP-3 | Passar modulosLiberados |
| `sistema/src/engine/founder-activation-engine.ts` | WP-4 | Novo tipo de evento |
| `sistema/src/engine/cognitive-observatory.ts` | WP-5 | Métricas de primeira experiência |
| `sistema/src/app/(dashboard)/admin/cognitive-observatory/page.tsx` | WP-5 | Painel |
| `sistema/src/app/api/auth/criar-conta/route.ts` | WP-5 | Registrar conversão |

### Total: 2 novos + 14 modificados = 16 arquivos

---

## 10. Bloqueios arquiteturais potenciais

### 10.1 Avaliação

Após análise detalhada de todos os 10 documentos e da codebase existente:

**Nenhum bloqueio arquitetural encontrado.**

Todas as mudanças propostas:
- Não criam novas engines
- Não criam novas APIs desnecessárias
- Não criam novos schemas
- Não criam novas migrations
- Não criam novos módulos
- Não alteram arquitetura consolidada
- Não alteram ADRs
- Não alteram a Constituição
- Não alteram o Modelo Cognitivo Universal
- Não alteram a lógica cognitiva já aprovada
- Implementam exclusivamente funcionalidades da Jornada Fundacional

### 10.2 Riscos arquiteturais monitorados

| Cenário | Risco | Ação se ocorrer |
|---------|-------|-----------------|
| Modificar `interpretacoes.ts` quebra outros consumidores | Baixo — verificar imports | Reverter e criar nova função separada |
| `EventoAtivacao` enum precisa de migration | Baixo — Prisma suporta adição de valores a enum sem migration destrutiva | Prisma: `ALTER TYPE` |
| Experience Engine fica muito acoplado a níveis de ativação | Médio — monitorar | Extrair lógica de módulos para serviço separado no futuro |

---

## 11. Critérios de aceite do PROGRAMA 15

O PROGRAMA 15 está completo quando:

- [ ] Todos os 10 documentos foram produzidos
- [ ] Nenhum bloqueio arquitetural não resolvido
- [ ] Todos os 5 eixos foram especificados em detalhes operacionais
- [ ] Os critérios de aprovação (Documento 9) estão definidos
- [ ] O plano de implementação (Documento 10) está completo e validado
- [ ] O programa está apto para transição para a fase de codificação

---

## 12. Próximos passos (após aprovação do Conselho)

1. **Aprovar o PROGRAMA 15** — revisão dos 10 documentos pelo Conselho
2. **Executar WP-1 a WP-6** na ordem definida
3. **Verificar critérios de aprovação** (Documento 9)
4. **Liberar a primeira experiência** para um grupo controlado de empresários
5. **Coletar métricas** (Documento 7) e ajustar com base nos dados reais
6. **Preparar PROGRAMA 16** — Segunda Experiência (Rotina Diária + Primeira Grande Vitória)

---

*Documento concluído. PROGRAMA 15 finalizado.*

*Total de 10 documentos produzidos em 25/07/2026.*
