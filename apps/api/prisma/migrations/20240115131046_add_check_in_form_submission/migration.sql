-- AlterTable
ALTER TABLE "CheckInForm" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "CheckInFormSubmission" (
    "id" SERIAL NOT NULL,
    "checkInFormId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "submittedById" INTEGER NOT NULL,

    CONSTRAINT "CheckInFormSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CheckInFormSubmission" ADD CONSTRAINT "CheckInFormSubmission_checkInFormId_fkey" FOREIGN KEY ("checkInFormId") REFERENCES "CheckInForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckInFormSubmission" ADD CONSTRAINT "CheckInFormSubmission_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
