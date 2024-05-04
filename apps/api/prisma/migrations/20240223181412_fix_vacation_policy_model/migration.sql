/*
  Warnings:

  - You are about to drop the column `active` on the `VacationPolicy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "assignedVacationPolicyId" INTEGER;

-- AlterTable
ALTER TABLE "VacationPolicy" DROP COLUMN "active",
ADD COLUMN     "default" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_assignedVacationPolicyId_fkey" FOREIGN KEY ("assignedVacationPolicyId") REFERENCES "VacationPolicy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
