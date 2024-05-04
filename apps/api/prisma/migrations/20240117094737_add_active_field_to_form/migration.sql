/*
  Warnings:

  - Added the required column `active` to the `CheckInForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CheckInForm" ADD COLUMN     "active" BOOLEAN NOT NULL;
