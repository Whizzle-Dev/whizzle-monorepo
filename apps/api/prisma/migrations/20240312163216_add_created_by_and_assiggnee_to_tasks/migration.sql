-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "assignedTo" INTEGER,
ADD COLUMN     "createdBy" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
