-- 011 — OPERAÇÕES FOUNDER (P91): painel de gestão das solicitações de Founder
-- ----------------------------------------------------
-- 1. adiciona colunas de operação na tabela de solicitações:
--    empresaId (vínculo quando ativada), onboardingTipo (RAPIDA/GRADUAL/COMPLETA),
--    contatoEm (primeiro contato), fundadorAtivadoEm (quando virou Founder).
-- 2. cria a tabela de histórico da solicitação (eventos de status, observação,
--    onboarding e ativação) — nível de plataforma, sem tenant, sem FK de usuário.

-- AlterTable
ALTER TABLE "solicitacoes_founder" ADD COLUMN "empresaId" TEXT,
ADD COLUMN "onboardingTipo" TEXT,
ADD COLUMN "contatoEm" TIMESTAMP(3),
ADD COLUMN "fundadorAtivadoEm" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "solicitacoes_founder_historico" (
    "id" TEXT NOT NULL,
    "solicitacaoFounderId" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "statusDe" TEXT,
    "statusPara" TEXT,
    "detalhes" JSONB,
    "criadoPorUsuarioId" TEXT,
    "criadoPorEmail" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "solicitacoes_founder_historico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "solicitacoes_founder_historico_solicitacaoFounderId_idx" ON "solicitacoes_founder_historico"("solicitacaoFounderId");
CREATE INDEX "solicitacoes_founder_historico_criadoEm_idx" ON "solicitacoes_founder_historico"("criadoEm");

-- AddForeignKey
ALTER TABLE "solicitacoes_founder_historico" ADD CONSTRAINT "solicitacoes_founder_historico_solicitacaoFounderId_fkey" FOREIGN KEY ("solicitacaoFounderId") REFERENCES "solicitacoes_founder"("id") ON DELETE CASCADE ON UPDATE CASCADE;