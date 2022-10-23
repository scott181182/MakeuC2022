-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "role" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Symptom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Symptom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SymptomReport" (
    "id" TEXT NOT NULL,
    "user" TEXT,
    "time" TIMESTAMP(3) NOT NULL,
    "symptom" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "SymptomReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "study" TEXT,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineAssignment" (
    "id" TEXT NOT NULL,
    "user" TEXT,
    "study" TEXT,
    "quantity" INTEGER NOT NULL,
    "directions" TEXT NOT NULL DEFAULT '',
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicineAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineCapture" (
    "id" TEXT NOT NULL,
    "user" TEXT,
    "time" TIMESTAMP(3) NOT NULL,
    "medicine" TEXT,

    CONSTRAINT "MedicineCapture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Study_participants" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Study_coordinators" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "SymptomReport_user_idx" ON "SymptomReport"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Medicine_study_key" ON "Medicine"("study");

-- CreateIndex
CREATE UNIQUE INDEX "MedicineAssignment_study_key" ON "MedicineAssignment"("study");

-- CreateIndex
CREATE INDEX "MedicineAssignment_user_idx" ON "MedicineAssignment"("user");

-- CreateIndex
CREATE INDEX "MedicineCapture_user_idx" ON "MedicineCapture"("user");

-- CreateIndex
CREATE INDEX "MedicineCapture_medicine_idx" ON "MedicineCapture"("medicine");

-- CreateIndex
CREATE UNIQUE INDEX "_Study_participants_AB_unique" ON "_Study_participants"("A", "B");

-- CreateIndex
CREATE INDEX "_Study_participants_B_index" ON "_Study_participants"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Study_coordinators_AB_unique" ON "_Study_coordinators"("A", "B");

-- CreateIndex
CREATE INDEX "_Study_coordinators_B_index" ON "_Study_coordinators"("B");

-- AddForeignKey
ALTER TABLE "SymptomReport" ADD CONSTRAINT "SymptomReport_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicine" ADD CONSTRAINT "Medicine_study_fkey" FOREIGN KEY ("study") REFERENCES "Study"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineAssignment" ADD CONSTRAINT "MedicineAssignment_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineAssignment" ADD CONSTRAINT "MedicineAssignment_study_fkey" FOREIGN KEY ("study") REFERENCES "Study"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineCapture" ADD CONSTRAINT "MedicineCapture_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineCapture" ADD CONSTRAINT "MedicineCapture_medicine_fkey" FOREIGN KEY ("medicine") REFERENCES "Medicine"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Study_participants" ADD CONSTRAINT "_Study_participants_A_fkey" FOREIGN KEY ("A") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Study_participants" ADD CONSTRAINT "_Study_participants_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Study_coordinators" ADD CONSTRAINT "_Study_coordinators_A_fkey" FOREIGN KEY ("A") REFERENCES "Study"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Study_coordinators" ADD CONSTRAINT "_Study_coordinators_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
