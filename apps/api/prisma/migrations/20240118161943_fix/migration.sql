/*
  Warnings:

  - You are about to drop the column `submittedAt` on the `CheckInFormSubmission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CheckInFormSubmission" DROP COLUMN "submittedAt",
ALTER COLUMN "answer" DROP NOT NULL;
