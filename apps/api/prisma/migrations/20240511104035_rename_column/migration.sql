/*
  Warnings:

  - You are about to drop the column `copmany` on the `PrivateBetaAccessRequest` table. All the data in the column will be lost.
  - Added the required column `company` to the `PrivateBetaAccessRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PrivateBetaAccessRequest" DROP COLUMN "copmany",
ADD COLUMN     "company" TEXT NOT NULL;
