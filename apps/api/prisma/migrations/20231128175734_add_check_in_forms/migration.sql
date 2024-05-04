-- CreateEnum
CREATE TYPE "CheckInFormRecurrence" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- CreateTable
CREATE TABLE "CheckInForm" (
    "id" SERIAL NOT NULL,
    "formElements" JSONB NOT NULL,
    "recurrence" "CheckInFormRecurrence" NOT NULL,
    "companyId" INTEGER NOT NULL,
    "createdBy" INTEGER NOT NULL,

    CONSTRAINT "CheckInForm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckInForm" ADD CONSTRAINT "CheckInForm_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckInForm" ADD CONSTRAINT "CheckInForm_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
