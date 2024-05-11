/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `PrivateBetaAccessRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PrivateBetaAccessRequest_email_key" ON "PrivateBetaAccessRequest"("email");
