/*
  Warnings:

  - Changed the type of `workingDays` on the `TimeOffRequest` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "TimeOffRequest" DROP COLUMN "workingDays",
ADD COLUMN     "workingDays" INTEGER NOT NULL;
