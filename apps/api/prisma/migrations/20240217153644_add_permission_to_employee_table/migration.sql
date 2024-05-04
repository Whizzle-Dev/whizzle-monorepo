-- CreateEnum
CREATE TYPE "PermissionRole" AS ENUM ('ACCOUNT_OWNER', 'ADMIN', 'MANAGER', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "permissionRole" "PermissionRole" NOT NULL DEFAULT 'EMPLOYEE';
