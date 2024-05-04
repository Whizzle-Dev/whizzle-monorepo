-- AlterTable
ALTER TABLE "VacationPolicy" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "NationalHoliday" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "vacationPolicyId" INTEGER,
    "updatedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NationalHoliday_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "NationalHoliday" ADD CONSTRAINT "NationalHoliday_vacationPolicyId_fkey" FOREIGN KEY ("vacationPolicyId") REFERENCES "VacationPolicy"("id") ON DELETE SET NULL ON UPDATE CASCADE;
