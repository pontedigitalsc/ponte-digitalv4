-- ═══════════════════════════════════════════════════════════════════════════════
-- Migration: fase0_emergencia
-- Description: Fase 0 — Emergency (P0 breaches)
--   - Soft Delete: add deletedAt to 23 tables
--   - Tenant Fields: add empresaId to contatos, etapas_implantacao, decisoes_sinais
--   - Foreign Keys: fix Historico, add @relation to Event/EventSubscription/DeadLetter
--   - Indexes: add composite [empresaId, deletedAt] indexes
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── WP-0.1: SOFT DELETE ──────────────────────────────────────────────────────
-- Add deletedAt column to tables that don't have it yet

ALTER TABLE "empresas" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "usuarios" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "contatos" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "etapas_implantacao" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "historicos" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "configuracoes_empresa" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "historico_sinais" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "evidencias" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "hipoteses" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "memoria_cognitiva" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "acoes_cognitivas" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "eventos_ativacao" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "outcomes" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "conhecimentos_validados" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "feedback_acoes" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "conversas" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "identidade_digital" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "conversas_historico" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "aprendizados" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "eventos" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "event_subscriptions" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "dead_letters" ADD COLUMN "deletedAt" TIMESTAMP(3);
ALTER TABLE "decisoes_sinais" ADD COLUMN "deletedAt" TIMESTAMP(3);

-- ─── WP-0.1.b: IMPLANTAÇÃO — (re-add deletedAt, already existed in schema but column might be missing)
ALTER TABLE "implantacoes" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);
ALTER TABLE "tarefas" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);
ALTER TABLE "transacoes" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);
ALTER TABLE "anotacoes" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);
ALTER TABLE "tags" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);
ALTER TABLE "onboarding_decisoes" ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);

-- ─── WP-0.2: TENANT FIELDS ───────────────────────────────────────────────────
-- Add empresaId to tables that lacked direct tenant isolation

ALTER TABLE "contatos" ADD COLUMN "empresaId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "contatos" ALTER COLUMN "empresaId" DROP DEFAULT;

ALTER TABLE "etapas_implantacao" ADD COLUMN "empresaId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "etapas_implantacao" ALTER COLUMN "empresaId" DROP DEFAULT;

ALTER TABLE "decisoes_sinais" ADD COLUMN "empresaId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "decisoes_sinais" ALTER COLUMN "empresaId" DROP DEFAULT;

-- ─── WP-0.3: FOREIGN KEYS ────────────────────────────────────────────────────

-- Historico: add missing FK for empresaId
ALTER TABLE "historicos" ADD CONSTRAINT "historicos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Event: add FK for tenantId (references Empresa.id)
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- EventSubscription: add FK for empresaId
ALTER TABLE "event_subscriptions" ADD CONSTRAINT "event_subscriptions_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DeadLetter: add FK for tenantId (references Empresa.id)
ALTER TABLE "dead_letters" ADD CONSTRAINT "dead_letters_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Contato: add FK for empresaId
ALTER TABLE "contatos" ADD CONSTRAINT "contatos_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- EtapaImplantacao: add FK for empresaId
ALTER TABLE "etapas_implantacao" ADD CONSTRAINT "etapas_implantacao_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- DecisaoSinal: add FK for empresaId
ALTER TABLE "decisoes_sinais" ADD CONSTRAINT "decisoes_sinais_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- ─── WP-0.4: INDEXES ─────────────────────────────────────────────────────────
-- Add composite [empresaId, deletedAt] indexes for efficient soft-delete filtering

CREATE INDEX IF NOT EXISTS "empresas_deletedAt_idx" ON "empresas"("deletedAt");
CREATE INDEX IF NOT EXISTS "usuarios_empresaId_deletedAt_idx" ON "usuarios"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "contatos_empresaId_deletedAt_idx" ON "contatos"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "implantacoes_empresaId_deletedAt_idx" ON "implantacoes"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "etapas_implantacao_empresaId_deletedAt_idx" ON "etapas_implantacao"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "tarefas_empresaId_deletedAt_idx" ON "tarefas"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "historicos_empresaId_deletedAt_idx" ON "historicos"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "transacoes_empresaId_deletedAt_idx" ON "transacoes"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "configuracoes_empresa_empresaId_deletedAt_idx" ON "configuracoes_empresa"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "historico_sinais_empresaId_deletedAt_idx" ON "historico_sinais"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "evidencias_empresaId_deletedAt_idx" ON "evidencias"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "hipoteses_empresaId_deletedAt_idx" ON "hipoteses"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "memoria_cognitiva_empresaId_deletedAt_idx" ON "memoria_cognitiva"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "acoes_cognitivas_empresaId_deletedAt_idx" ON "acoes_cognitivas"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "eventos_ativacao_empresaId_deletedAt_idx" ON "eventos_ativacao"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "outcomes_empresaId_deletedAt_idx" ON "outcomes"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "conhecimentos_validados_empresaId_deletedAt_idx" ON "conhecimentos_validados"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "feedback_acoes_empresaId_deletedAt_idx" ON "feedback_acoes"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "conversas_empresaId_deletedAt_idx" ON "conversas"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "identidade_digital_empresaId_deletedAt_idx" ON "identidade_digital"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "conversas_historico_empresaId_deletedAt_idx" ON "conversas_historico"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "aprendizados_empresaId_deletedAt_idx" ON "aprendizados"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "anotacoes_empresaId_deletedAt_idx" ON "anotacoes"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "tags_empresaId_deletedAt_idx" ON "tags"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "onboarding_decisoes_empresaId_deletedAt_idx" ON "onboarding_decisoes"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "decisoes_sinais_empresaId_deletedAt_idx" ON "decisoes_sinais"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "eventos_tenantId_deletedAt_idx" ON "eventos"("tenantId", "deletedAt");
CREATE INDEX IF NOT EXISTS "event_subscriptions_empresaId_deletedAt_idx" ON "event_subscriptions"("empresaId", "deletedAt");
CREATE INDEX IF NOT EXISTS "dead_letters_tenantId_deletedAt_idx" ON "dead_letters"("tenantId", "deletedAt");

-- Add empresaId indexes for tables that now have direct tenant fields
CREATE INDEX IF NOT EXISTS "contatos_empresaId_idx" ON "contatos"("empresaId");
CREATE INDEX IF NOT EXISTS "contatos_empresaId_clienteId_idx" ON "contatos"("empresaId", "clienteId");
CREATE INDEX IF NOT EXISTS "etapas_implantacao_empresaId_idx" ON "etapas_implantacao"("empresaId");
CREATE INDEX IF NOT EXISTS "etapas_implantacao_empresaId_implantacaoId_idx" ON "etapas_implantacao"("empresaId", "implantacaoId");
CREATE INDEX IF NOT EXISTS "decisoes_sinais_empresaId_idx" ON "decisoes_sinais"("empresaId");
CREATE INDEX IF NOT EXISTS "decisoes_sinais_empresaId_decisaoId_idx" ON "decisoes_sinais"("empresaId", "decisaoId");
CREATE INDEX IF NOT EXISTS "decisoes_sinais_empresaId_sinalId_idx" ON "decisoes_sinais"("empresaId", "sinalId");
