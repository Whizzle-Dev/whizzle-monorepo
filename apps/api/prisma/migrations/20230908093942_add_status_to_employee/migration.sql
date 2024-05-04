/*
  Warnings:

  - Added the required column `status` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EmployeeStatus" AS ENUM ('ACTIVE', 'INVITED', 'DISMISSED') ;

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "inviteCode" TEXT,
ADD COLUMN     "inviteDate" TIMESTAMP(3),
ADD COLUMN     "status" "EmployeeStatus";

UPDATE "Employee" SET "status" = 'ACTIVE';

-- Add NOT NULL constraint to "status" column
ALTER TABLE "Employee"
ALTER COLUMN "status" SET NOT NULL;
