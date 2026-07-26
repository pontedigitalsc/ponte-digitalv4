# Lessons Learned — Release Program v1.0

> **WP-5.5** — Release Program v1.0, Programa 5 (Encerramento)
> Data: 24/07/2026 | Status: ✅ Concluído

---

## Decisões Acertadas

### 1. Release Program estruturado em programas progressivos
Dividir a preparação para produção em 6 programas (0-5) permitiu entregas verificáveis a cada etapa, com critérios de aceite claros e sem retrabalho.

### 2. Auditoria global antes de qualquer alteração (Programa 1)
Mapear os 198 arquivos antes de modificar qualquer código evitou surpresas e permitiu priorizar correções com base em dados reais.

### 3. Documentação viva gerada a partir do código (Programa 2)
Criar 7 documentos de arquitetura (ARCHITECTURAL_INVENTORY, COGNITIVE_MAP, etc.) baseados no código real — não em idealizações — garante que a documentação reflita o sistema real.

### 4. Congelamento arquitetural
As 34 ADRs congeladas eliminam ambiguidade e permitem que qualquer agente ou desenvolvedor entenda as decisões sem depender de contexto tribal.

### 5. Hardening antes do Go-Live (Programa 3)
Corrigir segurança, performance e observabilidade antes de documentar operação foi a ordem correta — evita documentar problemas que seriam corrigidos depois.

### 6. Operação documentada antes do deploy (Programa 4)
Produzir checklist de segurança, runbook e plano de Go-Live antes do deploy real força o planejamento e reduz risco de erros manuais.

### 7. Multi-tenancy via código (Prisma) em vez de RLS
Para a fase V4 Founder, o tenant guard via código é mais simples de auditar e debuggar. RLS será adicionado em v1.1 quando houver mais empresas.

---

## Decisões Equivocadas

### 1. ValidationEngine como engine separada
Criar uma engine inteira para validação foi excesso de abstração. A validação deveria ter sido feita como funções isoladas nos services. Corrigido: ValidationEngine depreciada no RC.

### 2. Cache in-memory sem estratégia de distributed cache
O MemoryCacheProvider como singleton funciona para uma instância, mas o Vercel escala para múltiplas instâncias. Cada uma tem seu próprio cache, causando inconsistência. Correctivo: documentado como limitação, a ser resolvido com Redis em v1.1.

### 3. Misturar numeração de ADRs planejadas vs reais
O EXECUTION_PROGRAM.md original usava numeração de ADRs planejadas (ADR-001 a ADR-034 de funcionalidades) que não correspondia aos ADRs reais (que cobrem decisões arquiteturais). Correção: ADR_NAVIGATOR.md criado como mapeamento.

---

## Mudanças Importantes Durante o Release

| Mudança | Quando | Motivo |
|---------|--------|--------|
| ValidationEngine depreciada | WP-3.6 | Abstração desnecessária, lógica movida para services |
| Security headers adicionados | WP-3.1 | Auditoria revelou ausência de CSP |
| Paginação implementada | WP-3.2 | Performance insuficiente em listas de implantação |
| Health endpoint criado | WP-3.3 | Necessidade de monitoramento básico |
| OPS-* docs criados | WP-4.1 a WP-4.8 | Documentação operacional era inexistente |

---

## Boas Práticas Adotadas

1. **Prefixo consistente**: `OPS-*` para documentos operacionais
2. **Status tracking**: WPs com status (planejado/em andamento/concluído/bloqueado)
3. **Nunca modificar sem ler primeiro**: toda alteração começa com leitura
4. **`tsc --noEmit` como quality gate**: zero erros mantido durante todo o Release
5. **Backlog arquitetural vivo**: ARCH-001 a ARCH-018 documentam débitos técnicos
6. **Documentação como parte da definição de pronto**: cada WP inclui atualização documental

---

## Padrões Adotados

### Documentação
- `docs/09-ARCHITECTURE/*.md` — documentação viva gerada do código
- `docs/05-OPERATIONS/OPS-*.md` — documentação operacional
- Mermaid para diagramas (flowchart, sequence, class)

### Código
- API Routes → Services → Prisma (sem camada de repositórios)
- `handleApiError` com `ApiError` class
- `prismaSeguro` com tenant guard obrigatório
- Componentes shadcn/ui com Tailwind CSS 4

### Segurança
- `empresaId` obrigatório em todas as queries
- Session cookie httpOnly via Supabase SSR
- Validação de sessão em rotas protegidas

---

## Problemas Evitados

1. **Perda de dados** — auditoria preventiva de soft delete ausente (evitado por detecção precoce)
2. **Vazamento de dados** — tenant documentado como obrigatório antes de qualquer query
3. **Chaves expostas em produção** — checklist de rotação criado antes do deploy
4. **Regressão silenciosa** — `tsc --noEmit` + lint como barreira mínima
5. **Dívida técnica não documentada** — backlog arquitetural criado no Programa 2

---

## Lições Técnicas

### TypeScript
- `tsc --noEmit` é uma ferramenta subestimada — pega erros que o lint não pega
- `any` explícito é aceitável em pontos de integração (API, banco) desde que tipado na borda
- Módulos ESM com Next.js 16 funcionam bem, mas require atenção em imports dinâmicos

### Prisma
- `prismaSeguro` com wrapper de tenant guard é suficiente para fase atual
- Índices compostos (empresaId + status + data) melhoram drasticamente performance
- Migrações precisam ser testadas com dados reais antes do deploy

### Next.js 16
- App Router + Server Components reduzem JavaScript no cliente
- API Routes são suficientes — Server Actions adicionam complexidade sem benefício claro
- Middleware para auth SSR funciona bem, mas precisa de tratamento de erro robusto

### Supabase
- Auth SSR com cookies é confiável e bem documentado
- Pooler de conexão essencial para produção (evita esgotamento de conexões)
- PITR deve ser ativado antes do Go-Live (não ativado ainda — ARCH-017)

---

## Lições Arquiteturais

1. **Simplicidade > Pureza arquitetural**: a Ponte Digital não precisa de DDD puro, CQRS ou Event Sourcing na fase V4 Founder
2. **Documentação > Código comentado**: documentação viva em `docs/` é mais útil que comentários no código
3. **Backlog > Correção imediata**: nem todo problema precisa ser resolvido agora — documentar e priorizar é melhor que refatorar sem contexto
4. **ADR como fonte da verdade**: ter 34 decisões registradas elimina discussões intermináveis sobre "por que fizemos assim?"

---

## Lições Operacionais

1. **Operação documentada antes do deploy**: checklist de Go-Live evita erros manuais
2. **Runbook reduz tempo de incidente**: ter procedimentos escritos para cenários comuns acelera resposta
3. **CI/CD + Backup são P0**: não deveriam ter ficado para depois (ARCH-016, ARCH-017)
4. **Chaves e senhas precisam de rotação programada**: não apenas no início

---

## Recomendações Futuras

1. **Resolver CI/CD e Backup como primeira ação da v1.1** — são os dois únicos itens reprovados no RC
2. **Executar checklist de Go-Live por operador humano** antes de qualquer tráfego real
3. **Iniciar P1 — Foundation** (FK, tenant, soft delete, RLS, Zod) — são as maiores brechas técnicas
4. **Coletar métricas de uso real** com fundadores antes de planejar P2-P6
5. **Revisar este documento** ao final da operação assistida (primeiras 2 semanas pós-Go-Live)
6. **Estabelecer cultura de testes** (P6) — zero testes é o maior risco técnico atual
