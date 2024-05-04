-- AlterTable
ALTER TABLE "LeaveCategory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TimeOffRequest" ALTER COLUMN "workingDays" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "LeaveAccrual" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "accrualValue" DOUBLE PRECISION NOT NULL,
    "accrualDate" TIMESTAMP(3) NOT NULL,
    "timeOfRequestId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "LeaveAccrual_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LeaveAccrual" ADD CONSTRAINT "LeaveAccrual_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveAccrual" ADD CONSTRAINT "LeaveAccrual_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LeaveCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveAccrual" ADD CONSTRAINT "LeaveAccrual_timeOfRequestId_fkey" FOREIGN KEY ("timeOfRequestId") REFERENCES "TimeOffRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
