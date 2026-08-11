-- 010 — FLUXO FOUNDER (P90): solicitações de participação como Founder
-- ----------------------------------------------------
-- 1. cria o enum de status do fluxo de solicitação.
-- 2. cria a tabela de solicitações (nível de plataforma, sem tenant —
--    aceita visitantes anônimos pré-cadastro, por isso sem empresaId).

-- CreateEnum
CREATE TYPE "StatusSolicitacaoFounder" AS ENUM ('PENDING', 'CONTACTED', 'IN_REVIEW', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "solicitacoes_founder" (
    "id" TEXT NOT NULL,
    "nomeEmpresa" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "segmento" TEXT NOT NULL,
    "cidadeRegiao" TEXT NOT NULL,
    "equipe" TEXT,
    "oQueEmpresaFaz" TEXT NOT NULL,
    "principalDesafio" TEXT NOT NULL,
    "gostariaEnxergar" TEXT NOT NULL,
    "motivacao" TEXT NOT NULL,
    "status" "StatusSolicitacaoFounder" NOT NULL DEFAULT 'PENDING',
    "origem" TEXT NOT NULL DEFAULT 'SITE',
    "usuarioId" TEXT,
    "observacaoAdmin" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "solicitacoes_founder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "solicitacoes_founder_status_idx" ON "solicitacoes_founder"("status");
CREATE INDEX "solicitacoes_founder_criadoEm_idx" ON "solicitacoes_founder"("criadoEm");
CREATE INDEX "solicitacoes_founder_usuarioId_idx" ON "solicitacoes_founder"("usuarioId");
