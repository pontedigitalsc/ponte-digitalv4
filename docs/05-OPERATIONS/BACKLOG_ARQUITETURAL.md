# Backlog Arquitetural Permanente

Itens de arquitetura identificados durante o Release Program v1.0.
Nenhum deve ser implementado sem autorização explícita do Conselho Arquitetural.

## Itens

| ID | Categoria | Descrição | Impacto | Severidade | Programa | Status |
|----|-----------|-----------|---------|------------|----------|--------|
| ARCH-001 | Infraestrutura de Eventos | **EventPublisher**: emit ocorre antes da persistência. Avaliar inverter para: Persistir → Emitir. | Perda de evento se persistência falhar após emissão | ALTA | Programa 3 (Hardening) | Catalogado |
| ARCH-002 | Infraestrutura de Eventos | **EventSubscriber**: 5 handlers stub sem implementação (EmpresaCriada, HipoteseConfirmada, ConhecimentoValidado, AprendizadoRegistrado, ResultadoObservado). Avaliar: implementar ou remover. | Falsa sensação de funcionalidade | MÉDIA | Programa 3 (Hardening) | Catalogado |
| ARCH-003 | Infraestrutura de Eventos | **DeadLetterQueue**: dualidade memória + banco. `listar()` retorna apenas da memória. Decidir arquitetura definitiva. | Inconsistência de dados | MÉDIA | Programa 3 (Hardening) | Catalogado |
| ARCH-004 | Engine Layer | **ValidationEngine**: engine completamente morta. 0 consumidores em toda a base. Avaliar remoção definitiva. | Código morto ocupando espaço | BAIXA | Programa 3 (Hardening) | Catalogado |
| ARCH-005 | Segurança | **prismaSeguro**: em produção apenas loga (não lança) quando empresaId está ausente. ADR-008 aceita isso para V4 Founder, mas risco de vazamento de dados entre empresas persiste. Avaliar se deve lançar erro também em produção. | Vazamento de dados entre empresas se service esquecer empresaId | CRÍTICA | Programa 3 (Hardening) | Catalogado |
| ARCH-006 | Segurança | **middleware.ts**: não existe validação global de sessão. Cada API route e dashboard layout faz validação manual com `requireUser()`/`requireUserApi()`. Avaliar criação de middleware global. | Exposição de rotas que esquecerem validação de auth | ALTA | Programa 3 (Hardening) | Catalogado |
| ARCH-007 | Segurança | **RLS Policies**: arquivo `prisma/rls-policies.sql` define políticas RLS mas nunca é executado automaticamente no deploy. Prisma conecta como superuser e bypassa RLS. Avaliar: (A) descartar RLS e usar apenas prismaSeguro, ou (B) implementar RLS com role dedicada. | Proteção zero no banco contra acesso direto | CRÍTICA | Programa 3 (Hardening) | Catalogado |
| ARCH-008 | Segurança | **Envio de Secrets**: arquivo `.env` com credenciais reais (`SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`) não está no `.gitignore`. `.gitignore` já corrigido (`.env` adicionado), mas avaliar rotação das chaves. | Exposição de credenciais admin-level em repositório | CRÍTICA | Programa 3 (Hardening) | Catalogado |
| ARCH-009 | Segurança | **CSP Header**: plataforma não possui Content-Security-Policy. Necessário para mitigar XSS e data exfiltration. | Sem proteção contra XSS | ALTA | Programa 3 (Hardening) | Catalogado |
| ARCH-010 | Resiliência | **EventPublisher**: emite antes de persistir. Se persistência falha após emissão, evento é perdido (já ARCH-001, confirmado). | Perda de evento | ALTA | Programa 3 (Hardening) | Catalogado |
| ARCH-011 | Resiliência | **DeadLetterProcessor**: stub vazio. Sem retry, replay ou reprocessamento de eventos com falha. Eventos na DLQ nunca são reprocessados. | Perda permanente de eventos | MÉDIA | Programa 3 (Hardening) | Catalogado |
| ARCH-012 | Resiliência | **Timeout handling**: nenhuma chamada externa (Anthropic, Supabase) possui timeout explícito. Em caso de lentidão, a requisição HTTP pode ficar pendente até o timeout do servidor web. | Requisições órfãs | MÉDIA | Programa 3 (Hardening) | Catalogado |
| ARCH-013 | Resiliência | **5 handlers stub** em event-subscriber.ts (EmpresaCriada, HipoteseConfirmada, ConhecimentoValidado, AprendizadoRegistrado, ResultadoObservado) — apenas logam, sem ação real (já ARCH-002, confirmado). | Falsa sensação de funcionalidade | MÉDIA | Programa 3 (Hardening) | Catalogado |
| ARCH-014 | Qualidade | **cognitive-experience-engine.ts** (~1898 linhas, 72KB): 30 casts `as any`, maior arquivo da base. Avaliar refatoração por tipo ou split em múltiplos arquivos. | Complexidade e risco de tipo inseguro | ALTA | Programa 3 (Hardening) | Catalogado |
| ARCH-015 | Database | **7 models sem atualizadoEm**: HistoricoSinal, MemoriaCognitiva, EventoAtivacao, ConversaHistorico, DecisaoSinal, Event, DeadLetter. Avaliar adição ou documentar como intencional. | Inconsistência de schema | MÉDIA | Programa 3 (Hardening) | Catalogado |
| ARCH-016 | Operação | **CI/CD**: nenhum pipeline de CI/CD existe (.github/ ausente). Deploy manual via Vercel. Avaliar criação de GitHub Actions. | Risco de regressão em deploy | ALTA | Programa 3 (Hardening) | Catalogado |
| ARCH-017 | Operação | **Backup**: nenhuma política de backup automático implementada. Nenhum script de restore. | Perda de dados irreversível | CRÍTICA | Programa 3 (Hardening) | Catalogado |
| ARCH-018 | Observabilidade | **Engine files silenciosas**: 25+ engines em src/engine/ não produzem logs. Falhas internas são invisíveis em produção. | Cegueira operacional | MÉDIA | Programa 3 (Hardening) | Catalogado |
