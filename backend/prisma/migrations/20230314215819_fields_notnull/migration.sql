/*
  Warnings:

  - Made the column `name` on table `palettes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `code` on table `threads` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "palettes" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "threads" ALTER COLUMN "code" SET NOT NULL;
