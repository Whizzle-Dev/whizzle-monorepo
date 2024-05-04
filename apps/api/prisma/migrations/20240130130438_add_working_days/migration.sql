-- AlterTable
ALTER TABLE "TimeOffRequest" ALTER COLUMN "workingDays" SET NOT NULL,
ALTER COLUMN "workingDays" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "VacationPolicy" ADD COLUMN     "workingDays" TEXT[];
