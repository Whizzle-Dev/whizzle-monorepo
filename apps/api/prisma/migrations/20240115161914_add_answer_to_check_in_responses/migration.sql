/*
  Warnings:

  - Added the required column `answer` to the `CheckInFormSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CheckInFormSubmission" ADD COLUMN     "answer" TEXT NOT NULL;
