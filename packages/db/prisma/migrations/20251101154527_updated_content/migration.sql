/*
  Warnings:

  - The `type` column on the `Content` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `title` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT '';

-- DropEnum
DROP TYPE "public"."Type";
