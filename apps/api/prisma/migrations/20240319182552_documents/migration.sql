-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastUpdatedById" INTEGER;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_lastUpdatedById_fkey" FOREIGN KEY ("lastUpdatedById") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
