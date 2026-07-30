-- CreateEnum
CREATE TYPE "TipoRegistroCientifico" AS ENUM ('OBSERVACAO', 'EVIDENCIA', 'HIPOTESE', 'EXPERIMENTO', 'VALIDACAO', 'CONHECIMENTO');

-- CreateEnum
CREATE TYPE "StatusConhecimentoColetivo" AS ENUM ('CANDIDATO', 'VALIDADO', 'REPLICADO', 'CONSOLIDADO');

-- CreateTable
CREATE TABLE "registros_cientificos" (
    "id" TEXT NOT NULL,
    "tipo" "TipoRegistroCientifico" NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "contexto" TEXT,
    "autoria" TEXT,
    "tags" TEXT[],
    "metadados" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "registros_cientificos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conhecimentos_coletivos" (
    "id" TEXT NOT NULL,
    "empresaOrigemId" TEXT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoria" TEXT,
    "evidencia" TEXT,
    "status" "StatusConhecimentoColetivo" NOT NULL DEFAULT 'CANDIDATO',
    "scoreConfianca" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "repeticoes" INTEGER NOT NULL DEFAULT 0,
    "metadados" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "conhecimentos_coletivos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "casos_reais" (
    "id" TEXT NOT NULL,
    "empresaId" TEXT,
    "titulo" TEXT NOT NULL,
    "contexto" TEXT NOT NULL,
    "problema" TEXT NOT NULL,
    "hipotese" TEXT,
    "acao" TEXT,
    "resultado" TEXT,
    "aprendizado" TEXT NOT NULL,
    "conhecimentoGerado" TEXT,
    "metadados" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "casos_reais_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "registros_cientificos_tipo_idx" ON "registros_cientificos"("tipo");

-- CreateIndex
CREATE INDEX "registros_cientificos_criadoEm_idx" ON "registros_cientificos"("criadoEm");

-- CreateIndex
CREATE INDEX "registros_cientificos_deletedAt_idx" ON "registros_cientificos"("deletedAt");

-- CreateIndex
CREATE INDEX "registros_cientificos_tipo_criadoEm_idx" ON "registros_cientificos"("tipo", "criadoEm");

-- CreateIndex
CREATE INDEX "conhecimentos_coletivos_status_idx" ON "conhecimentos_coletivos"("status");

-- CreateIndex
CREATE INDEX "conhecimentos_coletivos_categoria_idx" ON "conhecimentos_coletivos"("categoria");

-- CreateIndex
CREATE INDEX "conhecimentos_coletivos_scoreConfianca_idx" ON "conhecimentos_coletivos"("scoreConfianca");

-- CreateIndex
CREATE INDEX "conhecimentos_coletivos_criadoEm_idx" ON "conhecimentos_coletivos"("criadoEm");

-- CreateIndex
CREATE INDEX "conhecimentos_coletivos_deletedAt_idx" ON "conhecimentos_coletivos"("deletedAt");

-- CreateIndex
CREATE INDEX "casos_reais_empresaId_idx" ON "casos_reais"("empresaId");

-- CreateIndex
CREATE INDEX "casos_reais_criadoEm_idx" ON "casos_reais"("criadoEm");

-- CreateIndex
CREATE INDEX "casos_reais_deletedAt_idx" ON "casos_reais"("deletedAt");

-- AddForeignKey
ALTER TABLE "conhecimentos_coletivos" ADD CONSTRAINT "conhecimentos_coletivos_empresaOrigemId_fkey" FOREIGN KEY ("empresaOrigemId") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "casos_reais" ADD CONSTRAINT "casos_reais_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "empresas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
