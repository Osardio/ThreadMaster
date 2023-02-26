/*
  Warnings:

  - You are about to drop the column `number` on the `threads` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `canvas_colors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `canvas_names` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[size]` on the table `canvas_sizes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[manufacturer_uuid,series_uuid,code]` on the table `kits` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kit_uuid,palette_uuid]` on the table `kits_palettes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kit_uuid,order_number]` on the table `kits_threads` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kits_threads_uuid,kit_palette_uuid]` on the table `kits_threads_variants` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `manufacturers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `palettes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,manufacturer_uuid]` on the table `series` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[palette_uuid,code]` on the table `threads` will be added. If there are existing duplicate values, this will fail.
  - Made the column `name` on table `manufacturers` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "manufacturers" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "threads" DROP COLUMN "number",
ADD COLUMN     "code" VARCHAR;

-- CreateIndex
CREATE UNIQUE INDEX "canvas_colors_name_key" ON "canvas_colors"("name");

-- CreateIndex
CREATE UNIQUE INDEX "canvas_names_name_key" ON "canvas_names"("name");

-- CreateIndex
CREATE UNIQUE INDEX "canvas_sizes_size_key" ON "canvas_sizes"("size");

-- CreateIndex
CREATE UNIQUE INDEX "kits_manufacturer_uuid_series_uuid_code_key" ON "kits"("manufacturer_uuid", "series_uuid", "code");

-- CreateIndex
CREATE UNIQUE INDEX "kits_palettes_kit_uuid_palette_uuid_key" ON "kits_palettes"("kit_uuid", "palette_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "kits_threads_kit_uuid_order_number_key" ON "kits_threads"("kit_uuid", "order_number");

-- CreateIndex
CREATE UNIQUE INDEX "kits_threads_variants_kits_threads_uuid_kit_palette_uuid_key" ON "kits_threads_variants"("kits_threads_uuid", "kit_palette_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "manufacturers_name_key" ON "manufacturers"("name");

-- CreateIndex
CREATE UNIQUE INDEX "palettes_name_key" ON "palettes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "series_name_manufacturer_uuid_key" ON "series"("name", "manufacturer_uuid");

-- CreateIndex
CREATE UNIQUE INDEX "threads_palette_uuid_code_key" ON "threads"("palette_uuid", "code");
