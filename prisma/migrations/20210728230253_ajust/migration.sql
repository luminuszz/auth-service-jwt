/*
  Warnings:

  - You are about to drop the column `reportId` on the `transactions_report` table. All the data in the column will be lost.
  - Added the required column `reportName` to the `transactions_report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions_report" DROP COLUMN "reportId",
ADD COLUMN     "reportName" TEXT NOT NULL;
