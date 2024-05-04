-- CreateEnum
CREATE TYPE "LeaveAccrualStatus" AS ENUM ('ACCRUED', 'EXPIRED', 'CANCELLED');

-- AlterTable
ALTER TABLE "LeaveAccrual" ADD COLUMN     "cancelReason" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "status" "LeaveAccrualStatus" NOT NULL DEFAULT 'ACCRUED';
