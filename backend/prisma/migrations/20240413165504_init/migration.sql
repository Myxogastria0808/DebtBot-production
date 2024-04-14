-- CreateEnum
CREATE TYPE "Tag" AS ENUM ('LATEST', 'OLD');

-- CreateTable
CREATE TABLE "User" (
    "cockroachdbId" INT8 NOT NULL DEFAULT unique_rowid(),
    "discordId" STRING NOT NULL,
    "discordUsername" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("cockroachdbId")
);

-- CreateTable
CREATE TABLE "Debt" (
    "cockroachdbId" INT8 NOT NULL DEFAULT unique_rowid(),
    "money" INT4 NOT NULL,
    "isPayOff" BOOL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lendId" STRING NOT NULL,
    "borrowId" STRING NOT NULL,
    "id" INT8 NOT NULL,

    CONSTRAINT "Debt_pkey" PRIMARY KEY ("cockroachdbId")
);

-- CreateTable
CREATE TABLE "DebtRecordId" (
    "cockroachdbId" INT8 NOT NULL DEFAULT unique_rowid(),
    "id" INT8 NOT NULL,
    "tag" "Tag" NOT NULL,

    CONSTRAINT "DebtRecordId_pkey" PRIMARY KEY ("cockroachdbId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_discordId_key" ON "User"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "Debt_id_key" ON "Debt"("id");

-- CreateIndex
CREATE UNIQUE INDEX "DebtRecordId_id_key" ON "DebtRecordId"("id");

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_lendId_fkey" FOREIGN KEY ("lendId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_borrowId_fkey" FOREIGN KEY ("borrowId") REFERENCES "User"("discordId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Debt" ADD CONSTRAINT "Debt_id_fkey" FOREIGN KEY ("id") REFERENCES "DebtRecordId"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
