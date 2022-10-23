/*
  Warnings:

  - You are about to drop the column `time` on the `SymptomReport` table. All the data in the column will be lost.
  - You are about to drop the `Medicine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicineAssignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicineCapture` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `occurredOn` to the `SymptomReport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Medicine" DROP CONSTRAINT "Medicine_study_fkey";

-- DropForeignKey
ALTER TABLE "MedicineAssignment" DROP CONSTRAINT "MedicineAssignment_study_fkey";

-- DropForeignKey
ALTER TABLE "MedicineAssignment" DROP CONSTRAINT "MedicineAssignment_user_fkey";

-- DropForeignKey
ALTER TABLE "MedicineCapture" DROP CONSTRAINT "MedicineCapture_medicine_fkey";

-- DropForeignKey
ALTER TABLE "MedicineCapture" DROP CONSTRAINT "MedicineCapture_user_fkey";

-- AlterTable
ALTER TABLE "SymptomReport" DROP COLUMN "time",
ADD COLUMN     "occurredOn" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Medicine";

-- DropTable
DROP TABLE "MedicineAssignment";

-- DropTable
DROP TABLE "MedicineCapture";

-- CreateTable
CREATE TABLE "Therapeutic" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "study" TEXT,

    CONSTRAINT "Therapeutic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TherapeuticAssignment" (
    "id" TEXT NOT NULL,
    "user" TEXT,
    "study" TEXT,
    "quantity" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TherapeuticAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TherapeuticAssignmentStep" (
    "id" TEXT NOT NULL,
    "therapeuticAssignment" TEXT,
    "index" INTEGER NOT NULL,
    "direction" TEXT NOT NULL DEFAULT '',
    "therapeuticCapture" TEXT,

    CONSTRAINT "TherapeuticAssignmentStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TherapeuticCapture" (
    "id" TEXT NOT NULL,
    "user" TEXT,
    "occurredOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TherapeuticCapture_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Therapeutic_study_idx" ON "Therapeutic"("study");

-- CreateIndex
CREATE INDEX "TherapeuticAssignment_user_idx" ON "TherapeuticAssignment"("user");

-- CreateIndex
CREATE INDEX "TherapeuticAssignment_study_idx" ON "TherapeuticAssignment"("study");

-- CreateIndex
CREATE INDEX "TherapeuticAssignmentStep_therapeuticAssignment_idx" ON "TherapeuticAssignmentStep"("therapeuticAssignment");

-- CreateIndex
CREATE INDEX "TherapeuticAssignmentStep_therapeuticCapture_idx" ON "TherapeuticAssignmentStep"("therapeuticCapture");

-- CreateIndex
CREATE INDEX "TherapeuticCapture_user_idx" ON "TherapeuticCapture"("user");

-- AddForeignKey
ALTER TABLE "Therapeutic" ADD CONSTRAINT "Therapeutic_study_fkey" FOREIGN KEY ("study") REFERENCES "Study"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapeuticAssignment" ADD CONSTRAINT "TherapeuticAssignment_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapeuticAssignment" ADD CONSTRAINT "TherapeuticAssignment_study_fkey" FOREIGN KEY ("study") REFERENCES "Study"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapeuticAssignmentStep" ADD CONSTRAINT "TherapeuticAssignmentStep_therapeuticAssignment_fkey" FOREIGN KEY ("therapeuticAssignment") REFERENCES "TherapeuticAssignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapeuticAssignmentStep" ADD CONSTRAINT "TherapeuticAssignmentStep_therapeuticCapture_fkey" FOREIGN KEY ("therapeuticCapture") REFERENCES "TherapeuticCapture"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TherapeuticCapture" ADD CONSTRAINT "TherapeuticCapture_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
