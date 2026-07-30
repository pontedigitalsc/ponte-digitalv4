# Founder Readiness Checklist

## Checklist de Prontidão para Aquisição dos Primeiros Founders

**Aprovado em:** 29 de julho de 2026 — Foundation V2.0  
**Próxima revisão:** A cada novo Founder onboarded

---

## Instruções

Cada item deve ser verificado antes de qualquer aquisição em escala. Um item falhado impede a abertura para novos Founders até que seja resolvido.

---

## Seção A — Infraestrutura

- [ ] **Build limpo** — `npm run build` passa sem erros (44s, Turbopack)
- [ ] **Typecheck limpo** — `npx tsc --noEmit` passa sem erros
- [ ] **Deploy automatizado** — Vercel com CI/CD funcional
- [ ] **Banco de dados íntegro** — `prisma migrate status` retorna "Database schema is up to date"
- [ ] **Migrações aplicáveis** — `prisma migrate deploy` funciona em ambiente vazio
- [ ] **Backup validado** — dump do banco pode ser restaurado
- [ ] **Health check** — `/api/health` responde 200
- [ ] **Environment completo** — todas as variáveis de ambiente documentadas e configuradas
- [ ] **Secrets não versionados** — `.env` com secrets removido do repositório público
- [ ] **domínio configurado** — DNS, SSL, redirects funcionando

---

## Seção B — Fundação

- [ ] **Constituição congelada** — 14 documentos em `docs/06-CONSTITUTION/`
- [ ] **Foundation V2.0 registrada** — `docs/07-MILESTONES/FOUNDATION_V2.md`
- [ ] **Foundation Database V1** — baseline limpa em `prisma/migrations/001_foundation_database_v1/`
- [ ] **Patrimônio Oficial catalogado** — `docs/07-MILESTONES/PATRIMONIO_OFICIAL_DA_PONTE.md`
- [ ] **Foundation Day registrado** — `docs/07-MILESTONES/FOUNDATION_DAY.md`
- [ ] **Critério de novos desenvolvimentos** — `docs/07-MILESTONES/CRITERIO_NOVOS_DESENVOLVIMENTOS.md`

---

## Seção C — Experiência Founder

- [ ] **Landing page alinhada** — mensagem coerente com a Constituição
- [ ] **Diagnóstico funcional** — `/conversa` roda completo até a revelação
- [ ] **Cadastro funcional** — criação de conta com Identidade Digital
- [ ] **Login funcional** — autenticação com Supabase
- [ ] **Primeiro acesso** — dashboard carrega com dados do diagnóstico
- [ ] **Atendimento em ≤5 segundos** — fluxo: busca → reconhecimento → confirmação
- [ ] **Caixa Inteligente funcional** — valores reais (não hardcoded)
- [ ] **Timeline Viva funcional** — eventos cognitivos + operacionais visíveis
- [ ] **Centro Diário funcional** — 5 perguntas respondidas com dados reais
- [ ] **Assistente funcional** — chat com contexto da empresa
- [ ] **Aprendizados funcionais** — conhecimento gerado automaticamente
- [ ] **Conversa natural** — sem jargão técnico, tom consistente

---

## Seção D — Experiência do Produto

- [ ] **Zero erros de acentuação** — verificar: ficará, estão, atenção, observação em toda a interface
- [ ] **Placeholders consistentes** — email, nome e outros campos com padrão único
- [ ] **Botões consistentes** — verbos de ação unificados (Salvar/Criar/Continuar)
- [ ] **Mensagens de erro consistentes** — padrão: "ação + Tente novamente + se persistir, contato"
- [ ] **Loading states** — todas as páginas com feedback visual de carregamento
- [ ] **Empty states** — todas as páginas com mensagem clara quando sem dados
- [ ] **Error boundaries** — todas as rotas com fallback elegante
- [ ] **Feedback de sucesso** — operações CRUD com confirmação visual
- [ ] **Navegação clara** — sidebar com links para todas as páginas acessíveis
- [ ] **Tratamento de erro 404** — página não encontrada com CTA

---

## Seção E — Confiabilidade

- [ ] **Links quebrados** — zero links internos quebrados
- [ ] **Rotas órfãs** — nenhuma rota acessível sem link na navegação
- [ ] **APIs não utilizadas** — nenhuma API sem consumidor frontend
- [ ] **Componentes mortos** — nenhum componente não importado
- [ ] **Docs desatualizados** — `COGNITIVE_MAP.md`, `ARCHITECTURAL_INVENTORY.md` revisados

---

## Seção F — Ready for Founder

- [ ] **Primeiro Founder consegue usar sem explicação técnica**
  - [ ] Entra na landing → entende a proposta
  - [ ] Faz o diagnóstico → recebe a revelação
  - [ ] Cria conta → acessa o dashboard
  - [ ] Registra atendimento → vê resultado imediato
  - [ ] Explora assistente → obtém resposta útil
  - [ ] Confere timeline → vê sua história

- [ ] **Suporte humano definido** — como o founder pede ajuda?
- [ ] **SLA definido** — prazo de resposta para problemas
- [ ] **Canal de feedback** — como o founder reporta problemas ou sugestões?
- [ ] **Política de dados** — o founder sabe que os dados são dele?

---

## Seção G — Pós-Aquisição

- [ ] **Métricas de uso definidas** — o que será monitorado nos primeiros 30 dias?
- [ ] **Roteiro de onboarding** — o founder sabe o que fazer na primeira semana?
- [ ] **Critério de sucesso do primeiro founder** — como saberemos que funcionou?
- [ ] **Plano de contingência** — o que fazer se o produto falhar com o primeiro founder?

---

## Resultado

| Seção | Itens | Aprovados | Falhados | Status |
|-------|-------|-----------|----------|--------|
| A — Infraestrutura | 10 | | | ⏳ |
| B — Fundação | 6 | | | ⏳ |
| C — Experiência | 12 | | | ⏳ |
| D — Produto | 10 | | | ⏳ |
| E — Confiabilidade | 5 | | | ⏳ |
| F — Ready for Founder | 10 | | | ⏳ |
| G — Pós-Aquisição | 5 | | | ⏳ |
| **Total** | **58** | **0** | **0** | **⏳ Pendente** |

**Critério de aprovação:** 100% dos itens obrigatórios aprovados.

---

**Este checklist é a porta de entrada para os primeiros Founders. Nenhum founder antes de todos os checks verdes.**
