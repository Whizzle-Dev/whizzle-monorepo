/*
  Warnings:

  - Added the required column `workingDays` to the `TimeOffRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeOffRequest" ADD COLUMN     "workingDays" INTEGER NOT NULL;
