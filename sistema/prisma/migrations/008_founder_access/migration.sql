-- CreateEnum
CREATE TYPE "PlatformRole" AS ENUM ('FOUNDER_PRINCIPAL');

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "platformRole" "PlatformRole";

-- CreateTable
CREATE TABLE "auditorias_plataforma" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT,
    "email" TEXT,
    "acao" TEXT NOT NULL,
    "modulo" TEXT,
    "contexto" TEXT,
    "empresaId" TEXT,
    "detalhes" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auditorias_plataforma_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "auditorias_plataforma_usuarioId_idx" ON "auditorias_plataforma"("usuarioId");
CREATE INDEX "auditorias_plataforma_criadoEm_idx" ON "auditorias_plataforma"("criadoEm");
CREATE INDEX "auditorias_plataforma_acao_idx" ON "auditorias_plataforma"("acao");
CREATE INDEX "usuarios_platformRole_idx" ON "usuarios"("platformRole");