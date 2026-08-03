-- AlterTable
ALTER TABLE "empresas" ADD COLUMN     "numeroApoiador" INTEGER,
ADD COLUMN     "numeroFundador" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "empresas_numeroApoiador_key" ON "empresas"("numeroApoiador");

-- CreateIndex
CREATE UNIQUE INDEX "empresas_numeroFundador_key" ON "empresas"("numeroFundador");
