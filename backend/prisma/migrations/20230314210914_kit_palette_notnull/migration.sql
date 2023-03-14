/*
  Warnings:

  - Made the column `order_number` on table `kits_palettes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "kits_palettes" ALTER COLUMN "order_number" SET NOT NULL;
