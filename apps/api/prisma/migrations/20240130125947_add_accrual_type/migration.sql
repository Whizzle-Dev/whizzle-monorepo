-- CreateEnum
CREATE TYPE "AccrualType" AS ENUM ('PER_MONTH_START', 'PER_YEAR_START', 'FIXED_NUMBER_PER_YEAR', 'FIXED_NUMBER_PER_MONTH');

-- AlterTable
ALTER TABLE "LeaveCategory" ADD COLUMN     "accrualType" "AccrualType" NOT NULL DEFAULT 'FIXED_NUMBER_PER_YEAR';
