-- CreateEnum
CREATE TYPE "Category" AS ENUM ('purchases', 'food', 'salary', 'car', 'leisure', 'studies');

-- AlterTable
ALTER TABLE "transctions" ADD COLUMN     "category" "Category";
