/*
  Warnings:

  - Added the required column `dueAt` to the `CheckInFormSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CheckInFormSubmission" ADD COLUMN     "dueAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
