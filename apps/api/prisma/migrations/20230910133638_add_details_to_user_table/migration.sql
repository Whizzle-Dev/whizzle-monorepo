-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "bankInformationId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "BankInformation" (
    "id" SERIAL NOT NULL,
    "bankName" TEXT,
    "bankAccountNumber" TEXT,

    CONSTRAINT "BankInformation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_bankInformationId_fkey" FOREIGN KEY ("bankInformationId") REFERENCES "BankInformation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
