-- DropForeignKey
ALTER TABLE "TimeOffRequestApprover" DROP CONSTRAINT "TimeOffRequestApprover_requestId_fkey";

-- AlterTable
ALTER TABLE "TimeOffRequestApprover" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TimeOffRequestApprover" ADD CONSTRAINT "TimeOffRequestApprover_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "TimeOffRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
