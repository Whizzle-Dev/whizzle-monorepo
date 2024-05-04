-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "columns" JSONB NOT NULL DEFAULT '[{ "name": "Todo", "value": "TODO" }, { "name": "In Progress", "value": "IN_PROGRESS" }, { "name": "Done", "value": "DONE"}]';
