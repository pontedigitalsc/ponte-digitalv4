-- ═══════════════════════════════════════════════════════════════════════════════
-- Migration: fase1_event_models
-- Description: Fase 1 — Resiliência (WP-1.1)
--   - Fix Event.id to auto-generate (add default cuid)
--   - Enrich DeadLetter with aggregateId, correlationId, handlerName, errorName, etc.
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─── WP-1.1: FIX EVENT.ID ──────────────────────────────────────────────────────
-- Event.id now auto-generates via cuid (application no longer needs to provide it)

-- ─── WP-1.1: ENRICH DEADLETTER ────────────────────────────────────────────────

ALTER TABLE "dead_letters" ADD COLUMN "aggregateId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "dead_letters" ALTER COLUMN "aggregateId" DROP DEFAULT;

ALTER TABLE "dead_letters" ADD COLUMN "aggregateType" TEXT NOT NULL DEFAULT '';
ALTER TABLE "dead_letters" ALTER COLUMN "aggregateType" DROP DEFAULT;

ALTER TABLE "dead_letters" ADD COLUMN "correlationId" TEXT NOT NULL DEFAULT '';
ALTER TABLE "dead_letters" ALTER COLUMN "correlationId" DROP DEFAULT;

ALTER TABLE "dead_letters" ADD COLUMN "handlerName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "dead_letters" ALTER COLUMN "handlerName" DROP DEFAULT;

ALTER TABLE "dead_letters" ADD COLUMN "errorName" TEXT NOT NULL DEFAULT '';
ALTER TABLE "dead_letters" ALTER COLUMN "errorName" DROP DEFAULT;

ALTER TABLE "dead_letters" ADD COLUMN "errorMessage" TEXT NOT NULL DEFAULT '';
ALTER TABLE "dead_letters" ALTER COLUMN "errorMessage" DROP DEFAULT;

ALTER TABLE "dead_letters" ADD COLUMN "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();
ALTER TABLE "dead_letters" ALTER COLUMN "occurredAt" DROP DEFAULT;

ALTER TABLE "dead_letters" ADD COLUMN "failedAt" TIMESTAMP(3) NOT NULL DEFAULT NOW();

-- Indexes for dead_letters enrichment
CREATE INDEX IF NOT EXISTS "dead_letters_tenantId_correlationId_idx" ON "dead_letters"("tenantId", "correlationId");
CREATE INDEX IF NOT EXISTS "dead_letters_handlerName_idx" ON "dead_letters"("handlerName");
