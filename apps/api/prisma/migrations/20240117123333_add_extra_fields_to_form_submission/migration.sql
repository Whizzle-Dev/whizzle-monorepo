/*
  Warnings:

  - Added the required column `status` to the `CheckInFormSubmission` table without a default value. This is not possible if the table is not empty.
  - Added the required column `submittedAt` to the `CheckInFormSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CheckInFormSubmissionStatus" AS ENUM ('PENDING', 'SUBMITTED', 'EXPIRED');

-- AlterTable
ALTER TABLE "CheckInFormSubmission" ADD COLUMN     "status" "CheckInFormSubmissionStatus" NOT NULL,
ADD COLUMN     "submittedAt" TIMESTAMP(3) NOT NULL;
