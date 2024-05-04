/*
  Warnings:

  - The `workingDays` column on the `TimeOffRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TimeOffRequest" DROP COLUMN "workingDays",
ADD COLUMN     "workingDays" TEXT[];
