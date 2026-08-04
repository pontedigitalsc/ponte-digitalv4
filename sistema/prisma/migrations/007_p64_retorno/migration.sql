-- AlterTable
ALTER TABLE "conversas" ADD COLUMN     "retornoDisponivelEm" TIMESTAMP(3),
ADD COLUMN     "retornoConcluidoEm" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "conversas_empresaId_retornoDisponivelEm_idx" ON "conversas"("empresaId", "retornoDisponivelEm");
