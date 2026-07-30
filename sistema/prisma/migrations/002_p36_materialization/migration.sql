-- CreateEnum
CREATE TYPE "ImpactoHipotese" AS ENUM ('BAIXO', 'MEDIO', 'ALTO');

-- CreateEnum
CREATE TYPE "OrigemHipotese" AS ENUM ('ANALISE_EVIDENCIAS', 'PRIMEIRA_CONVERSA', 'ASSISTENTE_IA', 'SISTEMA', 'MANUAL');

-- CreateEnum
CREATE TYPE "OrigemResposta" AS ENUM ('PRIMEIRA_CONVERSA', 'ASSISTENTE_IA', 'FORMULARIO', 'MANUAL');

-- AlterTable
ALTER TABLE "hipoteses" ADD COLUMN     "contagemEvidencias" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "impacto" "ImpactoHipotese" NOT NULL DEFAULT 'MEDIO',
ADD COLUMN     "origem" "OrigemHipotese" NOT NULL DEFAULT 'ANALISE_EVIDENCIAS';

-- CreateTable
CREATE TABLE "respostas_conversa" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "token" TEXT,
    "perguntaId" TEXT NOT NULL,
    "pergunta" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "bloco" TEXT,
    "origem" "OrigemResposta" NOT NULL DEFAULT 'PRIMEIRA_CONVERSA',
    "ordem" INTEGER NOT NULL DEFAULT 0,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "respostas_conversa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "momentos_wow" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "frase" TEXT NOT NULL,
    "contexto" TEXT,
    "categoria" TEXT,
    "intensidade" INTEGER NOT NULL DEFAULT 1,
    "origem" TEXT NOT NULL,
    "metadata" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "momentos_wow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fricoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "contexto" TEXT NOT NULL,
    "duracaoSegundos" INTEGER,
    "cliquesExtras" INTEGER,
    "pagina" TEXT,
    "elemento" TEXT,
    "metadata" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "fricoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sinais_valor" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "metadata" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "sinais_valor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria_recomendacoes" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT NOT NULL,
    "recomendacaoId" TEXT,
    "tipo" TEXT NOT NULL,
    "resultado" TEXT,
    "justificativa" TEXT,
    "metadata" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "auditoria_recomendacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plataforma_snapshots" (
    "id" TEXT NOT NULL,
    "hipotesesValidadas" INTEGER NOT NULL DEFAULT 0,
    "hipotesesDescartadas" INTEGER NOT NULL DEFAULT 0,
    "conhecimentosReutilizados" INTEGER NOT NULL DEFAULT 0,
    "recomendacoesEficazes" INTEGER NOT NULL DEFAULT 0,
    "capacidadesFortalecidas" INTEGER NOT NULL DEFAULT 0,
    "precisaoRecomendacoes" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalEmpresas" INTEGER NOT NULL DEFAULT 0,
    "periodo" TEXT NOT NULL,
    "dataRef" TIMESTAMP(3) NOT NULL,
    "metadados" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plataforma_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "respostas_conversa_empresaId_criadaEm_idx" ON "respostas_conversa"("empresaId", "criadaEm");

-- CreateIndex
CREATE INDEX "respostas_conversa_empresaId_bloco_idx" ON "respostas_conversa"("empresaId", "bloco");

-- CreateIndex
CREATE INDEX "respostas_conversa_empresaId_perguntaId_idx" ON "respostas_conversa"("empresaId", "perguntaId");

-- CreateIndex
CREATE INDEX "respostas_conversa_token_idx" ON "respostas_conversa"("token");

-- CreateIndex
CREATE INDEX "respostas_conversa_empresaId_deletedAt_idx" ON "respostas_conversa"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "momentos_wow_empresaId_criadoEm_idx" ON "momentos_wow"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "momentos_wow_categoria_idx" ON "momentos_wow"("categoria");

-- CreateIndex
CREATE INDEX "momentos_wow_empresaId_deletedAt_idx" ON "momentos_wow"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "fricoes_empresaId_tipo_idx" ON "fricoes"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "fricoes_empresaId_contexto_criadoEm_idx" ON "fricoes"("empresaId", "contexto", "criadoEm");

-- CreateIndex
CREATE INDEX "fricoes_empresaId_criadoEm_idx" ON "fricoes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "fricoes_empresaId_deletedAt_idx" ON "fricoes"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "sinais_valor_empresaId_tipo_idx" ON "sinais_valor"("empresaId", "tipo");

-- CreateIndex
CREATE INDEX "sinais_valor_empresaId_criadoEm_idx" ON "sinais_valor"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "sinais_valor_empresaId_deletedAt_idx" ON "sinais_valor"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "auditoria_recomendacoes_empresaId_tipo_resultado_idx" ON "auditoria_recomendacoes"("empresaId", "tipo", "resultado");

-- CreateIndex
CREATE INDEX "auditoria_recomendacoes_empresaId_recomendacaoId_idx" ON "auditoria_recomendacoes"("empresaId", "recomendacaoId");

-- CreateIndex
CREATE INDEX "auditoria_recomendacoes_empresaId_criadoEm_idx" ON "auditoria_recomendacoes"("empresaId", "criadoEm");

-- CreateIndex
CREATE INDEX "auditoria_recomendacoes_empresaId_deletedAt_idx" ON "auditoria_recomendacoes"("empresaId", "deletedAt");

-- CreateIndex
CREATE INDEX "plataforma_snapshots_periodo_dataRef_idx" ON "plataforma_snapshots"("periodo", "dataRef");

-- CreateIndex
CREATE INDEX "plataforma_snapshots_criadoEm_idx" ON "plataforma_snapshots"("criadoEm");

-- CreateIndex
CREATE INDEX "hipoteses_empresaId_impacto_idx" ON "hipoteses"("empresaId", "impacto");

-- AddForeignKey
ALTER TABLE "respostas_conversa" ADD CONSTRAINT "respostas_conversa_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "momentos_wow" ADD CONSTRAINT "momentos_wow_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fricoes" ADD CONSTRAINT "fricoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sinais_valor" ADD CONSTRAINT "sinais_valor_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditoria_recomendacoes" ADD CONSTRAINT "auditoria_recomendacoes_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
